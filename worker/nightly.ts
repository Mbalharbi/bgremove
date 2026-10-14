/**
 * Nightly search-health job: our own site check + Google Search Console +
 * Bing Webmaster, stored in D1 and shown in the admin dashboard.
 *
 * The free Workers plan allows ~10 ms CPU and 50 subrequests per run, so the
 * job is a small state machine: every cron tick (every 5 min, 01:00–03:55
 * UTC) runs ONE step and saves its cursor in `meta`. The admin "run now"
 * button calls the same step repeatedly.
 *
 * Site check reads pages through the ASSETS binding (no subrequests) — the
 * same HTML Google receives.
 */

import type { D1Database, D1Stmt, Env } from "./index";

export interface NightlyDeps {
  todayKey: () => string;
  syncCloudflare: (env: Env, days: number) => Promise<unknown>;
  host: string;
}

type Phase = "cf" | "list" | "pages" | "links" | "final" | "gsc-analytics" | "gsc-inspect" | "bing" | "done";
const ORDER: Phase[] = ["cf", "list", "pages", "links", "final", "gsc-analytics", "gsc-inspect", "bing", "done"];
const PAGES_PER_STEP = 10;
const LINKS_PER_STEP = 40;
const INSPECT_PER_STEP = 20;

interface Job {
  day: string;
  phase: Phase;
  cursor: number;
  log: string[];
}

let ready: Promise<unknown> | null = null;
function ensure(db: D1Database) {
  ready ??= db.batch([
    db.prepare(`CREATE TABLE IF NOT EXISTS meta (k TEXT PRIMARY KEY, v TEXT)`),
    db.prepare(`CREATE TABLE IF NOT EXISTS health_urls (day TEXT, path TEXT, PRIMARY KEY (day, path))`),
    db.prepare(`CREATE TABLE IF NOT EXISTS health_pages (day TEXT, path TEXT, status INTEGER, title TEXT, canonical TEXT,
      noindex INTEGER, hreflang TEXT, links TEXT, PRIMARY KEY (day, path))`),
    db.prepare(`CREATE TABLE IF NOT EXISTS health_links (day TEXT, path TEXT, status INTEGER, PRIMARY KEY (day, path))`),
    db.prepare(`CREATE TABLE IF NOT EXISTS health_issues (day TEXT, severity TEXT, type TEXT, path TEXT, detail TEXT)`),
    db.prepare(`CREATE INDEX IF NOT EXISTS health_issues_day ON health_issues(day)`),
    db.prepare(`CREATE TABLE IF NOT EXISTS search_daily (src TEXT, day TEXT, clicks INTEGER, impressions INTEGER,
      ctr REAL, position REAL, PRIMARY KEY (src, day))`),
    db.prepare(`CREATE TABLE IF NOT EXISTS search_top (src TEXT, dim TEXT, key TEXT, clicks INTEGER, impressions INTEGER,
      position REAL, PRIMARY KEY (src, dim, key))`),
    db.prepare(`CREATE TABLE IF NOT EXISTS gsc_index (day TEXT, path TEXT, verdict TEXT, coverage TEXT, last_crawl TEXT,
      google_canonical TEXT, PRIMARY KEY (day, path))`),
    db.prepare(`CREATE TABLE IF NOT EXISTS bing_issues (day TEXT, url TEXT, http INTEGER, issues TEXT, PRIMARY KEY (day, url))`),
  ]).catch((e) => {
    ready = null;
    throw e;
  });
  return ready;
}

const getMeta = async <T,>(db: D1Database, k: string): Promise<T | null> => {
  const r = await db.prepare(`SELECT v FROM meta WHERE k = ?`).bind(k).first<{ v: string }>();
  return r ? (JSON.parse(r.v) as T) : null;
};
const setMeta = (db: D1Database, k: string, v: unknown) =>
  db.prepare(`INSERT INTO meta (k, v) VALUES (?, ?) ON CONFLICT(k) DO UPDATE SET v = excluded.v`).bind(k, JSON.stringify(v)).run();

// ── Site check helpers ──────────────────────────────────────────────────────

const attr = (tag: string, name: string) => tag.match(new RegExp(`${name}="([^"]*)"`, "i"))?.[1] ?? null;

function parsePage(html: string, host: string) {
  const title = html.match(/<title>([^<]*)<\/title>/i)?.[1]?.trim() ?? "";
  const canonTag = html.match(/<link[^>]+rel="canonical"[^>]*>/i)?.[0];
  const canonical = canonTag ? attr(canonTag, "href") : null;
  const noindex = /<meta[^>]+name="robots"[^>]+content="[^"]*noindex/i.test(html) ? 1 : 0;
  const hreflang = Array.from(html.matchAll(/<link[^>]+rel="alternate"[^>]+hrefLang="[^"]+"[^>]*>/gi))
    .map((m) => attr(m[0], "href"))
    .filter((h): h is string => !!h)
    .map((h) => h.replace(`https://${host}`, "") || "/");
  const links = Array.from(new Set(Array.from(html.matchAll(/href="(\/[^"#?]*)"/g)).map((m) => m[1])))
    .filter((h) => !h.startsWith("/_next/") && !/\.(png|svg|ico|json|xml|txt|webmanifest|js|css)$/i.test(h));
  return { title, canonical, noindex, hreflang, links };
}

async function assetStatus(env: Env, host: string, path: string): Promise<number> {
  const r = await env.ASSETS.fetch(new Request(`https://${host}${path}`, { method: "GET", redirect: "manual" }));
  return r.status;
}

// ── Google Search Console (service account, read-only) ──────────────────────

const b64url = (b: ArrayBuffer | Uint8Array | string) => {
  const bytes = typeof b === "string" ? new TextEncoder().encode(b) : new Uint8Array(b instanceof Uint8Array ? b : new Uint8Array(b));
  let s = "";
  bytes.forEach((x) => (s += String.fromCharCode(x)));
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};

/** Signed JWT for the service account (RS256). Exported for tests. */
export async function serviceAccountJwt(email: string, pem: string, scope: string, now = Math.floor(Date.now() / 1000)) {
  let key: CryptoKey;
  try {
    const der = Uint8Array.from(
      atob(pem.replace(/\\n/g, "\n").replace(/-----[^-]+-----/g, "").replace(/\s+/g, "")),
      (c) => c.charCodeAt(0)
    );
    key = await crypto.subtle.importKey("pkcs8", der, { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["sign"]);
  } catch {
    throw new Error('GSC_PRIVATE_KEY is not a valid private key — paste the whole "private_key" value from the JSON file, including the BEGIN/END lines.');
  }
  const head = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const body = b64url(JSON.stringify({ iss: email, scope, aud: "https://oauth2.googleapis.com/token", iat: now, exp: now + 3600 }));
  const sig = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", key, new TextEncoder().encode(`${head}.${body}`));
  return `${head}.${body}.${b64url(sig)}`;
}

async function googleToken(env: Env, db: D1Database): Promise<string> {
  const cached = await getMeta<{ token: string; exp: number }>(db, "gsc_token");
  if (cached && cached.exp > Date.now() + 60_000) return cached.token;
  const jwt = await serviceAccountJwt(env.GSC_CLIENT_EMAIL!, env.GSC_PRIVATE_KEY!, "https://www.googleapis.com/auth/webmasters.readonly");
  const r = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=${encodeURIComponent("urn:ietf:params:oauth:grant-type:jwt-bearer")}&assertion=${jwt}`,
  });
  const j = (await r.json()) as { access_token?: string; expires_in?: number; error_description?: string; error?: string };
  if (!j.access_token) throw new Error(`Google sign-in failed: ${j.error_description ?? j.error ?? r.status}`);
  await setMeta(db, "gsc_token", { token: j.access_token, exp: Date.now() + (j.expires_in ?? 3600) * 1000 });
  return j.access_token;
}

/** GSC property: GSC_SITE if set, else the domain property. */
const gscSite = (env: Env, host: string) => env.GSC_SITE || `sc-domain:${host}`;

async function gscQuery(env: Env, token: string, host: string, body: unknown) {
  const r = await fetch(
    `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(gscSite(env, host))}/searchAnalytics/query`,
    { method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify(body) }
  );
  const j = (await r.json()) as { rows?: { keys: string[]; clicks: number; impressions: number; ctr: number; position: number }[]; error?: { message: string } };
  if (j.error) throw new Error(`Search Console: ${j.error.message}`);
  return j.rows ?? [];
}

// ── Bing Webmaster (API key) ────────────────────────────────────────────────

async function bing<T>(env: Env, host: string, method: string): Promise<T[]> {
  const site = env.BING_SITE || `https://${host}/`;
  const r = await fetch(
    `https://ssl.bing.com/webmaster/api.svc/json/${method}?siteUrl=${encodeURIComponent(site)}&apikey=${encodeURIComponent(env.BING_API_KEY!)}`
  );
  const j = (await r.json()) as { d?: T[]; Message?: string; ErrorCode?: number };
  if (!j.d) throw new Error(`Bing ${method}: ${j.Message ?? r.status}`);
  return j.d;
}
const bingDate = (v: string) => {
  const ms = Number(v.match(/\d+/)?.[0] ?? 0);
  return new Date(ms).toISOString().slice(0, 10);
};

// ── The step runner ─────────────────────────────────────────────────────────

const next = (p: Phase): Phase => ORDER[ORDER.indexOf(p) + 1] ?? "done";

/** Runs one step of today's job. Returns the job state after the step. */
export async function runNightlyStep(env: Env, d: NightlyDeps, restart = false): Promise<Job> {
  const db = env.USAGE!;
  await ensure(db);
  const today = d.todayKey();
  let job = (await getMeta<Job>(db, "nightly")) ?? { day: "", phase: "done", cursor: 0, log: [] };
  if (job.day !== today || restart) job = { day: today, phase: "cf", cursor: 0, log: [] };
  const note = (s: string) => job.log.push(`${new Date().toISOString().slice(11, 19)} ${s}`);
  const advance = () => {
    job.phase = next(job.phase);
    job.cursor = 0;
  };

  try {
    switch (job.phase) {
      case "cf": {
        if (env.CF_ANALYTICS_TOKEN && env.CF_ACCOUNT_ID) await d.syncCloudflare(env, 3);
        note(env.CF_ANALYTICS_TOKEN ? "Cloudflare copy synced" : "Cloudflare copy skipped (not configured)");
        advance();
        break;
      }
      case "list": {
        const sm = await (await env.ASSETS.fetch(new Request(`https://${d.host}/sitemap.xml`))).text();
        const paths = Array.from(sm.matchAll(/<loc>([^<]+)<\/loc>/g)).map((m) => new URL(m[1]).pathname);
        await db.batch([
          db.prepare(`DELETE FROM health_urls WHERE day = ?`).bind(today),
          db.prepare(`DELETE FROM health_pages WHERE day = ?`).bind(today),
          db.prepare(`DELETE FROM health_links WHERE day = ?`).bind(today),
          db.prepare(`DELETE FROM health_issues WHERE day = ?`).bind(today),
        ]);
        const ins: D1Stmt[] = paths.map((p) => db.prepare(`INSERT OR IGNORE INTO health_urls (day, path) VALUES (?, ?)`).bind(today, p));
        for (let i = 0; i < ins.length; i += 50) await db.batch(ins.slice(i, i + 50));
        const robots = await (await env.ASSETS.fetch(new Request(`https://${d.host}/robots.txt`))).text();
        await setMeta(db, "robots_today", { day: today, blocksAll: /User-agent:\s*\*\s*[\r\n]+Disallow:\s*\/\s*$/im.test(robots) });
        note(`sitemap: ${paths.length} pages`);
        advance();
        break;
      }
      case "pages": {
        const batch = await db
          .prepare(`SELECT path FROM health_urls WHERE day = ? ORDER BY path LIMIT ? OFFSET ?`)
          .bind(today, PAGES_PER_STEP, job.cursor)
          .all<{ path: string }>();
        const rows: D1Stmt[] = [];
        for (const { path } of batch.results) {
          const r = await env.ASSETS.fetch(new Request(`https://${d.host}${path}`, { redirect: "manual" }));
          const html = r.status === 200 ? await r.text() : "";
          const p = parsePage(html, d.host);
          rows.push(
            db.prepare(`INSERT OR REPLACE INTO health_pages (day, path, status, title, canonical, noindex, hreflang, links)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`)
              .bind(today, path, r.status, p.title, p.canonical, p.noindex, JSON.stringify(p.hreflang), JSON.stringify(p.links))
          );
        }
        if (rows.length) await db.batch(rows);
        job.cursor += batch.results.length;
        if (batch.results.length < PAGES_PER_STEP) {
          note(`pages checked: ${job.cursor}`);
          advance();
        }
        break;
      }
      case "links": {
        // Unique internal link + hreflang targets that aren't sitemap pages already checked.
        const all = await db.prepare(`SELECT links, hreflang FROM health_pages WHERE day = ?`).bind(today).all<{ links: string; hreflang: string }>();
        const known = new Set((await db.prepare(`SELECT path FROM health_pages WHERE day = ? AND status = 200`).bind(today).all<{ path: string }>()).results.map((r) => r.path));
        const targets = Array.from(new Set(all.results.flatMap((r) => [...JSON.parse(r.links), ...JSON.parse(r.hreflang)] as string[])))
          .filter((t) => !known.has(t))
          .sort();
        const slice = targets.slice(job.cursor, job.cursor + LINKS_PER_STEP);
        const rows: D1Stmt[] = [];
        for (const t of slice) rows.push(db.prepare(`INSERT OR REPLACE INTO health_links (day, path, status) VALUES (?, ?, ?)`).bind(today, t, await assetStatus(env, d.host, t)));
        if (rows.length) await db.batch(rows);
        job.cursor += slice.length;
        if (job.cursor >= targets.length) {
          note(`extra link targets checked: ${targets.length}`);
          advance();
        }
        break;
      }
      case "final": {
        const pages = (await db.prepare(`SELECT * FROM health_pages WHERE day = ?`).bind(today).all<{
          path: string; status: number; title: string; canonical: string | null; noindex: number; hreflang: string; links: string;
        }>()).results;
        const bad = new Map((await db.prepare(`SELECT path, status FROM health_links WHERE day = ? AND status <> 200`).bind(today).all<{ path: string; status: number }>()).results.map((r) => [r.path, r.status]));
        const issues: [string, string, string, string][] = [];
        const titles = new Map<string, string[]>();
        for (const p of pages) {
          if (p.status !== 200) { issues.push(["critical", "sitemap-not-200", p.path, `HTTP ${p.status}`]); continue; }
          if (p.noindex) issues.push(["critical", "noindex", p.path, "page tells Google not to index it"]);
          if (!p.title) issues.push(["warning", "no-title", p.path, ""]);
          else titles.set(p.title, [...(titles.get(p.title) ?? []), p.path]);
          const selfUrl = `https://${d.host}${p.path}`;
          if (!p.canonical) issues.push(["warning", "no-canonical", p.path, ""]);
          else if (p.canonical.replace(/\/?$/, "/") !== selfUrl.replace(/\/?$/, "/")) issues.push(["info", "canonical-elsewhere", p.path, p.canonical]);
          for (const l of JSON.parse(p.links) as string[]) if (bad.has(l)) issues.push(["critical", "broken-link", p.path, `${l} → HTTP ${bad.get(l)}`]);
          for (const h of JSON.parse(p.hreflang) as string[]) if (bad.has(h)) issues.push(["critical", "broken-hreflang", p.path, `${h} → HTTP ${bad.get(h)}`]);
        }
        titles.forEach((paths, t) => { if (paths.length > 1) issues.push(["warning", "duplicate-title", paths.join(", "), t]); });
        const robots = await getMeta<{ blocksAll: boolean }>(db, "robots_today");
        if (robots?.blocksAll) issues.push(["critical", "robots-blocks-all", "/robots.txt", "Disallow: / for all crawlers"]);
        const ins = issues.map(([s, t, p, x]) => db.prepare(`INSERT INTO health_issues (day, severity, type, path, detail) VALUES (?, ?, ?, ?, ?)`).bind(today, s, t, p, x));
        for (let i = 0; i < ins.length; i += 50) await db.batch(ins.slice(i, i + 50));
        await setMeta(db, "health_summary", { day: today, pages: pages.length, issues: issues.length, critical: issues.filter((i) => i[0] === "critical").length });
        note(`site check: ${issues.length} issue(s)`);
        advance();
        break;
      }
      case "gsc-analytics": {
        if (!env.GSC_CLIENT_EMAIL || !env.GSC_PRIVATE_KEY) { note("Google skipped (not configured)"); advance(); break; }
        const token = await googleToken(env, db);
        const end = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
        const last = await db.prepare(`SELECT MAX(day) AS d FROM search_daily WHERE src = 'google'`).first<{ d: string | null }>();
        // First run: backfill the 16 months Search Console keeps; later: re-pull the last 5 days (data settles late).
        const start = last?.d
          ? new Date(Date.parse(last.d) - 4 * 86400000).toISOString().slice(0, 10)
          : new Date(Date.now() - 486 * 86400000).toISOString().slice(0, 10);
        const daily = await gscQuery(env, token, d.host, { startDate: start, endDate: end, dimensions: ["date"], rowLimit: 25000 });
        const s28 = new Date(Date.now() - 29 * 86400000).toISOString().slice(0, 10);
        const [q, pg, c] = await Promise.all(
          ["query", "page", "country"].map((dim) => gscQuery(env, token, d.host, { startDate: s28, endDate: end, dimensions: [dim], rowLimit: 25 }))
        );
        const st: D1Stmt[] = daily.map((r) =>
          db.prepare(`INSERT OR REPLACE INTO search_daily (src, day, clicks, impressions, ctr, position) VALUES ('google', ?, ?, ?, ?, ?)`)
            .bind(r.keys[0], r.clicks, r.impressions, r.ctr, r.position)
        );
        st.push(db.prepare(`DELETE FROM search_top WHERE src = 'google'`));
        for (const [dim, rows] of [["query", q], ["page", pg], ["country", c]] as const)
          for (const r of rows)
            st.push(db.prepare(`INSERT OR REPLACE INTO search_top (src, dim, key, clicks, impressions, position) VALUES ('google', ?, ?, ?, ?, ?)`)
              .bind(dim, r.keys[0].replace(`https://${d.host}`, "").slice(0, 200), r.clicks, r.impressions, r.position));
        for (let i = 0; i < st.length; i += 50) await db.batch(st.slice(i, i + 50));
        await setMeta(db, "error_gsc-analytics", null);
        note(`Google: ${daily.length} days, top lists refreshed`);
        advance();
        break;
      }
      case "gsc-inspect": {
        if (!env.GSC_CLIENT_EMAIL || !env.GSC_PRIVATE_KEY) { advance(); break; }
        const token = await googleToken(env, db);
        const batch = await db
          .prepare(`SELECT path FROM health_urls WHERE day = ? ORDER BY path LIMIT ? OFFSET ?`)
          .bind(today, INSPECT_PER_STEP, job.cursor)
          .all<{ path: string }>();
        const rows: D1Stmt[] = [];
        for (const { path } of batch.results) {
          const r = await fetch("https://searchconsole.googleapis.com/v1/urlInspection/index:inspect", {
            method: "POST",
            headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
            body: JSON.stringify({ inspectionUrl: `https://${d.host}${path}`, siteUrl: gscSite(env, d.host) }),
          });
          const j = (await r.json()) as {
            inspectionResult?: { indexStatusResult?: { verdict?: string; coverageState?: string; lastCrawlTime?: string; googleCanonical?: string } };
            error?: { message: string };
          };
          if (j.error) throw new Error(`URL Inspection: ${j.error.message}`);
          const s = j.inspectionResult?.indexStatusResult ?? {};
          rows.push(db.prepare(`INSERT OR REPLACE INTO gsc_index (day, path, verdict, coverage, last_crawl, google_canonical) VALUES (?, ?, ?, ?, ?, ?)`)
            .bind(today, path, s.verdict ?? null, s.coverageState ?? null, s.lastCrawlTime ?? null, s.googleCanonical ?? null));
        }
        if (rows.length) await db.batch(rows);
        job.cursor += batch.results.length;
        if (batch.results.length < INSPECT_PER_STEP) { note(`Google index status: ${job.cursor} pages`); advance(); }
        break;
      }
      case "bing": {
        if (!env.BING_API_KEY) { note("Bing skipped (not configured)"); advance(); break; }
        const traffic = await bing<{ Date: string; Impressions: number; Clicks: number }>(env, d.host, "GetRankAndTrafficStats");
        const issues = await bing<{ Url: string; HttpCode: number; Issues: number | string }>(env, d.host, "GetCrawlIssues");
        const st: D1Stmt[] = traffic.map((t) =>
          db.prepare(`INSERT OR REPLACE INTO search_daily (src, day, clicks, impressions, ctr, position) VALUES ('bing', ?, ?, ?, NULL, NULL)`)
            .bind(bingDate(t.Date), t.Clicks, t.Impressions)
        );
        st.push(db.prepare(`DELETE FROM bing_issues WHERE day = ?`).bind(today));
        for (const i of issues.slice(0, 200))
          st.push(db.prepare(`INSERT OR REPLACE INTO bing_issues (day, url, http, issues) VALUES (?, ?, ?, ?)`).bind(today, i.Url, i.HttpCode, String(i.Issues)));
        for (let k = 0; k < st.length; k += 50) await db.batch(st.slice(k, k + 50));
        await setMeta(db, "error_bing", null);
        note(`Bing: ${traffic.length} days, ${issues.length} crawl issue(s)`);
        advance();
        break;
      }
      case "done":
        break;
    }
  } catch (e) {
    // Record and move on so one failing source never blocks the others.
    note(`ERROR in ${job.phase}: ${(e as Error).message.slice(0, 200)}`);
    await setMeta(db, `error_${job.phase}`, { day: today, message: (e as Error).message.slice(0, 300) });
    advance();
  }
  await setMeta(db, "nightly", job);
  return job;
}

/** Everything the dashboard's "Search & site health" tab needs. */
export async function healthReport(env: Env, d: NightlyDeps) {
  const db = env.USAGE!;
  await ensure(db);
  const all = <T,>(sql: string, ...b: unknown[]) => db.prepare(sql).bind(...b).all<T>().then((r) => r.results);
  const latest = await db.prepare(`SELECT MAX(day) AS d FROM health_issues`).first<{ d: string | null }>();
  const lastRunDay = (await getMeta<{ day: string }>(db, "health_summary"))?.day ?? latest?.d ?? null;
  const prevDay = lastRunDay
    ? (await db.prepare(`SELECT MAX(day) AS d FROM health_pages WHERE day < ?`).bind(lastRunDay).first<{ d: string | null }>())?.d ?? null
    : null;
  const [issues, prevIssues, trend, google, bingDaily, top, index, prevIndex, bingIssues, job, summary, errGsc, errBing] = await Promise.all([
    lastRunDay ? all(`SELECT severity, type, path, detail FROM health_issues WHERE day = ? ORDER BY severity, type`, lastRunDay) : [],
    prevDay ? all<{ type: string; path: string }>(`SELECT type, path FROM health_issues WHERE day = ?`, prevDay) : [],
    all(`SELECT day, COUNT(*) AS n, SUM(severity = 'critical') AS critical FROM health_issues GROUP BY day ORDER BY day DESC LIMIT 90`),
    all(`SELECT day, clicks, impressions, ctr, position FROM search_daily WHERE src = 'google' ORDER BY day`),
    all(`SELECT day, clicks, impressions FROM search_daily WHERE src = 'bing' ORDER BY day`),
    all(`SELECT dim, key, clicks, impressions, position FROM search_top WHERE src = 'google' ORDER BY impressions DESC`),
    lastRunDay ? all<{ path: string; verdict: string; coverage: string; last_crawl: string }>(`SELECT path, verdict, coverage, last_crawl FROM gsc_index WHERE day = (SELECT MAX(day) FROM gsc_index)`) : [],
    all<{ path: string; verdict: string }>(`SELECT path, verdict FROM gsc_index WHERE day = (SELECT MAX(day) FROM gsc_index WHERE day < (SELECT MAX(day) FROM gsc_index))`),
    all(`SELECT url, http, issues FROM bing_issues WHERE day = (SELECT MAX(day) FROM bing_issues)`),
    getMeta<Job>(db, "nightly"),
    getMeta(db, "health_summary"),
    getMeta(db, "error_gsc-analytics"),
    getMeta(db, "error_bing"),
  ]);
  const prevKeys = new Set(prevIssues.map((i) => `${i.type}|${i.path}`));
  const prevVerdict = new Map(prevIndex.map((r) => [r.path, r.verdict]));
  return {
    lastRunDay,
    summary,
    job,
    issues: (issues as { severity: string; type: string; path: string; detail: string }[]).map((i) => ({ ...i, isNew: !!prevDay && !prevKeys.has(`${i.type}|${i.path}`) })),
    trend: (trend as { day: string }[]).reverse(),
    google: {
      configured: !!(env.GSC_CLIENT_EMAIL && env.GSC_PRIVATE_KEY),
      error: errGsc,
      daily: google,
      top,
      index: index.map((r) => ({ ...r, droppedOut: prevVerdict.get(r.path) === "PASS" && r.verdict !== "PASS" })),
    },
    bing: { configured: !!env.BING_API_KEY, error: errBing, daily: bingDaily, issues: bingIssues },
    host: d.host,
  };
}
