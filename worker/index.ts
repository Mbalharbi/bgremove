/**
 * Cloudflare Worker entrypoint for bgremovers.org.
 *
 * Three responsibilities:
 *
 *   1. **301 redirect www → apex.**
 *   2. **REST API at `/api/v1/*`** — proxies to Hugging Face Inference API
 *      for briaai/RMBG-1.4 with per-IP rate limiting (100 images/day).
 *      Returns a transparent PNG. CORS-enabled.
 *   3. Delegate everything else to the static-assets binding.
 *
 * Required wrangler.jsonc bindings:
 *   - assets.binding: ASSETS
 *   - kv_namespaces: RATE_LIMIT  (free tier — 1k writes/day is plenty)
 *   - vars: HF_TOKEN  (optional; if absent the API returns 503 + SDK suggestion)
 */

interface Env {
  ASSETS: { fetch: (req: Request) => Promise<Response> };
  RATE_LIMIT?: KVNamespace;
  HF_TOKEN?: string;
  /** Stores answers from the on-site feedback popup (components/feedback-dialog.tsx). */
  FEEDBACK?: KVNamespace;
  /** Bearer token for GET /api/feedback (export). Unset → export disabled. */
  FEEDBACK_ADMIN_KEY?: string;
  /** Anonymous usage counters (lib/track.ts → POST /api/event). */
  USAGE?: D1Database;
}

interface D1Result<T> {
  results: T[];
}
interface D1Stmt {
  bind(...v: unknown[]): D1Stmt;
  run(): Promise<unknown>;
  all<T = Record<string, unknown>>(): Promise<D1Result<T>>;
  first<T = Record<string, unknown>>(): Promise<T | null>;
}
interface D1Database {
  prepare(sql: string): D1Stmt;
  batch(stmts: D1Stmt[]): Promise<unknown>;
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
}

interface KVNamespace {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, opts?: { expirationTtl?: number }): Promise<void>;
  list(opts?: { prefix?: string; cursor?: string; limit?: number }): Promise<{
    keys: { name: string }[];
    list_complete: boolean;
    cursor?: string;
  }>;
}

const APEX_HOST = "bgremovers.org";
const WWW_HOST = "www.bgremovers.org";

// Per-IP rate limit. Free, generous, prevents abuse.
const DAILY_LIMIT = 100;
const SECONDS_IN_DAY = 86400;
const MAX_BYTES = 10 * 1024 * 1024; // 10 MB upload cap

// HuggingFace Inference API endpoint for RMBG-1.4. Requires HF_TOKEN.
const HF_INFERENCE_URL =
  "https://api-inference.huggingface.co/models/briaai/RMBG-1.4";

function corsHeaders(): Record<string, string> {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "86400",
  };
}

function jsonError(status: number, code: string, message: string, extra: Record<string, unknown> = {}) {
  return new Response(
    JSON.stringify({ error: { code, message, ...extra } }),
    {
      status,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders(),
      },
    }
  );
}

function todayKey(): string {
  // YYYY-MM-DD in UTC. Counter resets at UTC midnight.
  return new Date().toISOString().slice(0, 10);
}

async function checkAndIncrementRate(
  kv: KVNamespace | undefined,
  ip: string
): Promise<{ ok: true; remaining: number } | { ok: false; remaining: 0 }> {
  if (!kv) return { ok: true, remaining: DAILY_LIMIT }; // KV not bound → no limit
  const key = `rl:${todayKey()}:${ip}`;
  const cur = parseInt((await kv.get(key)) ?? "0", 10) || 0;
  if (cur >= DAILY_LIMIT) return { ok: false, remaining: 0 };
  await kv.put(key, String(cur + 1), { expirationTtl: SECONDS_IN_DAY + 60 });
  return { ok: true, remaining: DAILY_LIMIT - (cur + 1) };
}

async function handleRemoveBackground(req: Request, env: Env): Promise<Response> {
  const ip =
    req.headers.get("cf-connecting-ip") ||
    req.headers.get("x-real-ip") ||
    "unknown";

  // Rate limit
  const rate = await checkAndIncrementRate(env.RATE_LIMIT, ip);
  if (!rate.ok) {
    return jsonError(
      429,
      "rate_limit_exceeded",
      `Daily limit of ${DAILY_LIMIT} images reached. Resets at UTC midnight.`,
      { limit: DAILY_LIMIT, reset_at: `${todayKey()}T23:59:59Z`, sdk_alternative: "https://bgremovers.org/sdk/v1.js" }
    );
  }

  // If no HF_TOKEN configured, respond honestly with SDK alternative
  if (!env.HF_TOKEN) {
    return jsonError(
      503,
      "api_not_configured",
      "REST API is in beta and not yet enabled. Use the free unlimited JavaScript SDK for client-side processing.",
      {
        sdk_url: "https://bgremovers.org/sdk/v1.js",
        sdk_docs: "https://bgremovers.org/api/",
      }
    );
  }

  // Validate content
  const ct = req.headers.get("content-type") || "";
  let imageBytes: ArrayBuffer | null = null;

  if (ct.startsWith("multipart/form-data")) {
    const form = await req.formData();
    const file = form.get("image");
    if (!file || !(file instanceof Blob)) {
      return jsonError(400, "missing_image", "Provide 'image' field in form-data.");
    }
    if (file.size > MAX_BYTES) {
      return jsonError(413, "too_large", `Image exceeds ${MAX_BYTES / 1024 / 1024} MB limit.`);
    }
    imageBytes = await file.arrayBuffer();
  } else if (ct.includes("application/json")) {
    const body = (await req.json()) as { image_base64?: string; image_url?: string };
    if (body.image_base64) {
      const b64 = body.image_base64.replace(/^data:image\/\w+;base64,/, "");
      imageBytes = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0)).buffer;
    } else if (body.image_url) {
      const r = await fetch(body.image_url);
      if (!r.ok) return jsonError(400, "fetch_failed", "Could not fetch image_url.");
      imageBytes = await r.arrayBuffer();
    } else {
      return jsonError(400, "missing_image", "Provide image_base64 or image_url in JSON body.");
    }
  } else if (ct.startsWith("image/")) {
    imageBytes = await req.arrayBuffer();
  } else {
    return jsonError(415, "unsupported_content_type", "Send multipart/form-data, application/json, or raw image/*.");
  }

  if (!imageBytes) return jsonError(400, "missing_image", "No image provided.");
  if (imageBytes.byteLength > MAX_BYTES) {
    return jsonError(413, "too_large", `Image exceeds ${MAX_BYTES / 1024 / 1024} MB limit.`);
  }

  // Call HuggingFace Inference API
  const hfRes = await fetch(HF_INFERENCE_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.HF_TOKEN}`,
      "Content-Type": "application/octet-stream",
    },
    body: imageBytes,
  });

  if (!hfRes.ok) {
    const errText = await hfRes.text().catch(() => "");
    return jsonError(
      502,
      "upstream_error",
      "Background removal model is temporarily unavailable. Try again in a moment.",
      { upstream_status: hfRes.status, upstream_message: errText.slice(0, 200) }
    );
  }

  const pngBytes = await hfRes.arrayBuffer();
  return new Response(pngBytes, {
    status: 200,
    headers: {
      "Content-Type": "image/png",
      "X-RateLimit-Limit": String(DAILY_LIMIT),
      "X-RateLimit-Remaining": String(rate.remaining),
      "Cache-Control": "no-store",
      ...corsHeaders(),
    },
  });
}

// ── Self-hosted AI model assets ─────────────────────────────────────────────
// The browser engines load their runtime + weights from /m/* on our own
// domain instead of huggingface.co / jsdelivr / storage.googleapis.com.
// Those hosts are blocked or slow in several countries (notably mainland
// China), which silently broke the tool there.
//
// The Worker fetches each file from its pinned upstream once per Cloudflare
// data center, stores it in the edge cache, and serves it from there. All
// upstreams are version-pinned, so responses are immutable. Only the files
// matched below can be requested — this is not an open proxy.

interface AssetSource {
  upstream: string;
  allow: RegExp;
}

const MODEL_ASSETS: Record<string, AssetSource> = {
  "rmbg-1.4": {
    // Pinned commit of briaai/RMBG-1.4 so the weights can never change under us.
    upstream: "https://huggingface.co/briaai/RMBG-1.4/resolve/2ceba5a5efaec153162aedea169f76caf9b46cf8/",
    // fp16 (WebGPU), fp32 (WebGPU without shader-f16), q8 (WASM) — see lib/bg-removal-rmbg.ts.
    allow: /^(config\.json|preprocessor_config\.json|onnx\/model(_fp16|_quantized)?\.onnx)$/,
  },
  "transformers-3.0.2": {
    upstream: "https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.0.2/dist/",
    allow: /^(transformers\.min\.js|ort-wasm[\w.-]*\.(wasm|mjs))$/,
  },
  "mediapipe-0.10.35": {
    upstream: "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.35/wasm/",
    allow: /^vision_wasm\w*\.(js|wasm)$/,
  },
  "selfie-segmenter": {
    upstream: "https://storage.googleapis.com/mediapipe-models/image_segmenter/selfie_segmenter/float16/1/",
    allow: /^selfie_segmenter\.tflite$/,
  },
};

const ASSET_TYPES: Record<string, string> = {
  wasm: "application/wasm",
  js: "text/javascript; charset=utf-8",
  mjs: "text/javascript; charset=utf-8",
  json: "application/json; charset=utf-8",
};

async function handleModelAsset(request: Request, url: URL, ctx: ExecutionContext): Promise<Response> {
  if (request.method !== "GET" && request.method !== "HEAD") {
    return new Response("Method not allowed", { status: 405 });
  }
  // /m/<source>/<file path>
  const [, , source, ...rest] = url.pathname.split("/");
  const file = rest.join("/");
  const asset = MODEL_ASSETS[source];
  if (!asset || !asset.allow.test(file)) return new Response("Not found", { status: 404 });

  const cache = (caches as unknown as { default: Cache }).default;
  const cacheKey = new Request(`${url.origin}/m/${source}/${file}`);
  const hit = await cache.match(cacheKey);
  if (hit) return hit;

  const upstream = await fetch(asset.upstream + file, { redirect: "follow" });
  if (!upstream.ok || !upstream.body) {
    return new Response("Upstream unavailable", { status: 502, headers: { "Cache-Control": "no-store" } });
  }
  const ext = file.split(".").pop() ?? "";
  const headers = new Headers({
    "Content-Type": ASSET_TYPES[ext] ?? "application/octet-stream",
    "Cache-Control": "public, max-age=31536000, immutable",
    "Access-Control-Allow-Origin": "*",
    "Cross-Origin-Resource-Policy": "cross-origin",
  });
  const len = upstream.headers.get("content-length");
  if (len) headers.set("Content-Length", len);

  // Fill the edge cache first, then serve from it. Streaming the body into the
  // cache (rather than tee-ing it to the visitor at the same time) keeps Worker
  // memory flat even for the 176 MB fp32 file and slow connections. The
  // datacenter→upstream copy takes a few seconds, once per data center.
  try {
    await cache.put(cacheKey, new Response(upstream.body, { headers }));
    const cached = await cache.match(cacheKey);
    if (cached) return cached;
  } catch {
    /* cache unavailable — fall through to a direct stream */
  }
  const direct = await fetch(asset.upstream + file, { redirect: "follow" });
  if (!direct.ok) return new Response("Upstream unavailable", { status: 502 });
  return new Response(direct.body, { headers });
}

// ── Feedback popup ──────────────────────────────────────────────────────────
// Answers are stored as one KV entry each: `fb:<ISO time>:<random>`.
// No IP is stored; a salted daily hash is used only for the per-day cap.

const FEEDBACK_DAILY_LIMIT = 5;
const FEEDBACK_MAX_BODY = 4 * 1024;
const FEEDBACK_LOCALES = ["en", "hi", "id", "pt", "es", "ar", "de", "zh"];
const FEEDBACK_USE_CASES = ["product", "portrait", "logo", "document", "social", "other"];
const FEEDBACK_NEEDS = [
  "change-bg", "touch-up", "better-edges", "faster", "hd", "resize", "passport", "mobile-app",
];

function jsonOk(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}

async function sha256Hex(text: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function handleFeedbackPost(req: Request, env: Env): Promise<Response> {
  if (!env.FEEDBACK) {
    return jsonError(503, "feedback_not_configured", "Feedback storage is not configured.");
  }
  // Same-origin only: the popup is the sole intended client.
  const origin = req.headers.get("origin");
  let originHost: string | null = null;
  try {
    originHost = origin ? new URL(origin).hostname : null;
  } catch {
    originHost = "invalid";
  }
  if (originHost && originHost !== APEX_HOST && originHost !== "localhost") {
    return jsonError(403, "forbidden_origin", "Feedback is accepted from bgremovers.org only.");
  }

  const raw = await req.text();
  if (raw.length > FEEDBACK_MAX_BODY) return jsonError(413, "too_large", "Feedback is too long.");
  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw);
  } catch {
    return jsonError(400, "invalid_json", "Body must be JSON.");
  }

  const pick = (v: unknown, allowed: string[]) =>
    typeof v === "string" && allowed.includes(v) ? v : null;
  const needs = Array.isArray(body.needs)
    ? Array.from(new Set(body.needs.filter((n): n is string => typeof n === "string" && FEEDBACK_NEEDS.includes(n))))
    : [];
  const rating =
    typeof body.rating === "number" && Number.isInteger(body.rating) && body.rating >= 1 && body.rating <= 5
      ? body.rating
      : null;
  const message = typeof body.message === "string" ? body.message.trim().slice(0, 500) : "";
  const entry = {
    at: new Date().toISOString(),
    locale: pick(body.locale, FEEDBACK_LOCALES) ?? "en",
    path: typeof body.path === "string" ? body.path.slice(0, 200) : "",
    useCase: pick(body.useCase, FEEDBACK_USE_CASES),
    needs,
    rating,
    message,
    country: (req as Request & { cf?: { country?: string } }).cf?.country ?? null,
    // How the visitor's last image was processed (see setLastRun in the popup).
    engine: pick(body.engine, ["rmbg-1.4", "mediapipe-selfie", "solid-colour"]),
    dtype: pick(body.dtype, ["fp16", "fp32", "q8"]),
    device: pick(body.device, ["webgpu", "wasm"]),
    edited: body.edited === true,
  };
  if (!entry.useCase && !needs.length && rating === null && !message) {
    return jsonError(400, "empty_feedback", "Pick at least one answer.");
  }

  // Per-IP daily cap without keeping the IP itself.
  const ip = req.headers.get("cf-connecting-ip") || "unknown";
  const rlKey = `fbrl:${todayKey()}:${(await sha256Hex(`${todayKey()}|${ip}`)).slice(0, 24)}`;
  const count = parseInt((await env.FEEDBACK.get(rlKey)) ?? "0", 10) || 0;
  if (count >= FEEDBACK_DAILY_LIMIT) {
    return jsonError(429, "rate_limit_exceeded", "Thanks — we already have your feedback for today.");
  }
  await env.FEEDBACK.put(rlKey, String(count + 1), { expirationTtl: SECONDS_IN_DAY + 60 });

  const id = `fb:${entry.at}:${crypto.randomUUID().slice(0, 8)}`;
  await env.FEEDBACK.put(id, JSON.stringify(entry));
  return jsonOk({ ok: true }, 201);
}

/** GET /api/feedback with `Authorization: Bearer <FEEDBACK_ADMIN_KEY>` → all entries as JSON. */
async function handleFeedbackExport(req: Request, env: Env): Promise<Response> {
  if (!env.FEEDBACK || !env.FEEDBACK_ADMIN_KEY) {
    return jsonError(404, "not_found", "Not found.");
  }
  if (req.headers.get("authorization") !== `Bearer ${env.FEEDBACK_ADMIN_KEY}`) {
    return jsonError(401, "unauthorized", "Missing or wrong admin key.");
  }
  const entries: unknown[] = [];
  let cursor: string | undefined;
  do {
    const page = await env.FEEDBACK.list({ prefix: "fb:", cursor });
    for (const k of page.keys) {
      const v = await env.FEEDBACK.get(k.name);
      if (v) entries.push(JSON.parse(v));
    }
    cursor = page.list_complete ? undefined : page.cursor;
  } while (cursor);
  return jsonOk({ count: entries.length, entries });
}

// ── Anonymous usage counters ────────────────────────────────────────────────
// One row per event in D1. No IP, no IDs; a salted daily hash of the IP is
// kept only in `event_rl` (today's rows) to cap abuse, and pruned daily.

const EVENT_TOOLS = ["remove", "bulk", "compress", "resize", "webp", "qr", "metadata"];
const EVENT_NAMES = ["upload", "success", "fail", "download", "edit_open", "edit_apply", "bg_change", "solid_apply"];
const EVENT_REASONS = ["too-large", "decode", "model-load", "memory", "gpu", "other"];
const EVENTS_PER_IP_PER_DAY = 400;

let schemaReady: Promise<unknown> | null = null;
function ensureSchema(db: D1Database) {
  schemaReady ??= db.batch([
    db.prepare(`CREATE TABLE IF NOT EXISTS events (
      day TEXT NOT NULL, tool TEXT NOT NULL, event TEXT NOT NULL,
      engine TEXT, dtype TEXT, device TEXT, ms INTEGER, count INTEGER,
      reason TEXT, locale TEXT, country TEXT, is_return INTEGER)`),
    db.prepare(`CREATE INDEX IF NOT EXISTS events_day ON events(day)`),
    db.prepare(`CREATE TABLE IF NOT EXISTS event_rl (day TEXT NOT NULL, h TEXT NOT NULL, n INTEGER NOT NULL, PRIMARY KEY (day, h))`),
  ]).catch((e) => {
    schemaReady = null;
    throw e;
  });
  return schemaReady;
}

async function handleEvent(req: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
  if (!env.USAGE) return new Response(null, { status: 204 });
  const raw = await req.text();
  if (raw.length > 1024) return new Response(null, { status: 413 });
  let b: Record<string, unknown>;
  try {
    b = JSON.parse(raw);
  } catch {
    return new Response(null, { status: 400 });
  }
  const pick = (v: unknown, allowed: string[]) => (typeof v === "string" && allowed.includes(v) ? v : null);
  const int = (v: unknown, max: number) =>
    typeof v === "number" && Number.isFinite(v) && v >= 0 ? Math.min(Math.round(v), max) : null;
  const tool = pick(b.tool, EVENT_TOOLS);
  const event = pick(b.event, EVENT_NAMES);
  if (!tool || !event) return new Response(null, { status: 400 });

  const db = env.USAGE;
  await ensureSchema(db);
  const day = todayKey();
  const ip = req.headers.get("cf-connecting-ip") || "unknown";
  const h = (await sha256Hex(`${day}|ev|${ip}`)).slice(0, 20);
  const rl = await db
    .prepare(`INSERT INTO event_rl (day, h, n) VALUES (?, ?, 1)
              ON CONFLICT(day, h) DO UPDATE SET n = n + 1 RETURNING n`)
    .bind(day, h)
    .first<{ n: number }>();
  if ((rl?.n ?? 0) > EVENTS_PER_IP_PER_DAY) return new Response(null, { status: 429 });

  await db
    .prepare(`INSERT INTO events (day, tool, event, engine, dtype, device, ms, count, reason, locale, country, is_return)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
    .bind(
      day, tool, event,
      pick(b.engine, ["rmbg-1.4", "mediapipe-selfie"]),
      pick(b.dtype, ["fp16", "fp32", "q8"]),
      pick(b.device, ["webgpu", "wasm"]),
      int(b.ms, 600000),
      int(b.count, 1000),
      pick(b.reason, EVENT_REASONS),
      pick(b.locale, FEEDBACK_LOCALES),
      (req as Request & { cf?: { country?: string } }).cf?.country ?? null,
      b.returning === true ? 1 : 0
    )
    .run();

  // Housekeeping, ~1% of writes: drop old rate-limit rows and events > 400 days.
  if (Math.random() < 0.01) {
    ctx.waitUntil(
      db.batch([
        db.prepare(`DELETE FROM event_rl WHERE day < ?`).bind(day),
        db.prepare(`DELETE FROM events WHERE day < date('now', '-400 days')`),
      ])
    );
  }
  return new Response(null, { status: 204 });
}

/** GET /api/usage?days=30 (admin) → aggregates for the dashboard. */
async function handleUsage(req: Request, url: URL, env: Env): Promise<Response> {
  if (!env.USAGE || !env.FEEDBACK_ADMIN_KEY) return jsonError(404, "not_found", "Not found.");
  if (req.headers.get("authorization") !== `Bearer ${env.FEEDBACK_ADMIN_KEY}`) {
    return jsonError(401, "unauthorized", "Missing or wrong admin key.");
  }
  const db = env.USAGE;
  await ensureSchema(db);
  const days = Math.min(Math.max(parseInt(url.searchParams.get("days") ?? "30", 10) || 30, 1), 400);
  const since = new Date(Date.now() - (days - 1) * 86400000).toISOString().slice(0, 10);
  const q = <T,>(sql: string) => db.prepare(sql).bind(since).all<T>().then((r) => r.results);
  const [byToolEvent, perDay, engines, reasons, countries, locales, returning] = await Promise.all([
    q(`SELECT tool, event, COUNT(*) AS n, SUM(COALESCE(count, 1)) AS items FROM events WHERE day >= ? GROUP BY tool, event`),
    q(`SELECT day, event, COUNT(*) AS n FROM events WHERE day >= ? GROUP BY day, event ORDER BY day`),
    q(`SELECT COALESCE(engine,'?') AS engine, COALESCE(dtype,'?') AS dtype, COALESCE(device,'?') AS device,
              COUNT(*) AS n, CAST(AVG(ms) AS INTEGER) AS avg_ms
       FROM events WHERE day >= ? AND event = 'success' GROUP BY 1, 2, 3 ORDER BY n DESC`),
    q(`SELECT tool, COALESCE(reason,'?') AS reason, COUNT(*) AS n FROM events WHERE day >= ? AND event = 'fail' GROUP BY 1, 2 ORDER BY n DESC`),
    q(`SELECT COALESCE(country,'?') AS country, COUNT(*) AS n FROM events WHERE day >= ? AND event = 'success' GROUP BY 1 ORDER BY n DESC LIMIT 15`),
    q(`SELECT COALESCE(locale,'?') AS locale, COUNT(*) AS n FROM events WHERE day >= ? AND event = 'success' GROUP BY 1 ORDER BY n DESC`),
    q(`SELECT is_return, COUNT(*) AS n FROM events WHERE day >= ? AND event = 'upload' GROUP BY 1`),
  ]);
  return jsonOk({ days, since, byToolEvent, perDay, engines, reasons, countries, locales, returning });
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    // 301 redirect www → apex.
    if (url.hostname === WWW_HOST) {
      url.hostname = APEX_HOST;
      return Response.redirect(url.toString(), 301);
    }

    // Self-hosted AI model + runtime files.
    if (url.pathname.startsWith("/m/")) {
      return handleModelAsset(request, url, ctx);
    }

    // CORS preflight for the API.
    if (url.pathname.startsWith("/api/") && request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders() });
    }

    // Background removal endpoint.
    if (url.pathname === "/api/v1/remove-background") {
      if (request.method !== "POST") {
        return jsonError(405, "method_not_allowed", "Use POST.");
      }
      return handleRemoveBackground(request, env);
    }

    // Visitor country (from Cloudflare) — lets the feedback popup pick a
    // language when the browser's language isn't one we support.
    if (url.pathname === "/api/geo") {
      const country = (request as Request & { cf?: { country?: string } }).cf?.country ?? null;
      return jsonOk({ country });
    }

    // Anonymous usage counters.
    if (url.pathname === "/api/event" && request.method === "POST") {
      return handleEvent(request, env, ctx);
    }
    if (url.pathname === "/api/usage" && request.method === "GET") {
      return handleUsage(request, url, env);
    }

    // On-site feedback popup.
    if (url.pathname === "/api/feedback") {
      if (request.method === "POST") return handleFeedbackPost(request, env);
      if (request.method === "GET") return handleFeedbackExport(request, env);
      return jsonError(405, "method_not_allowed", "Use POST.");
    }

    // API health/info endpoint.
    if (url.pathname === "/api/v1/health") {
      return new Response(
        JSON.stringify({
          status: "ok",
          version: "1.0.0",
          daily_limit: DAILY_LIMIT,
          docs: "https://bgremovers.org/api/",
          sdk: "https://bgremovers.org/sdk/v1.js",
          rest_api_enabled: !!env.HF_TOKEN,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders() },
        }
      );
    }

    // Static assets.
    return env.ASSETS.fetch(request);
  },
};
