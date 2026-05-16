// Ping IndexNow with every URL in the built sitemap.xml.
//
// IndexNow is a single-shot protocol supported by Bing, Yandex, Naver, and
// Seznam. One POST gets all your URLs re-crawled within minutes instead of
// days. Google does NOT support IndexNow.
//
// Setup:
//   1. A 32-char hex key is generated once and saved as public/<key>.txt
//      (proves we own the domain — IndexNow fetches that URL to verify).
//   2. After every `next build`, this script reads out/sitemap.xml, extracts
//      every <loc>, and POSTs the list to api.indexnow.org/IndexNow.
//
// Runs as a `postbuild` script in package.json — fires automatically on
// every Cloudflare build/deploy. By the time the search engines actually
// fetch the URLs (queued, takes a few minutes), the deploy is live.

import { readFileSync } from "node:fs";

const KEY = "fe37e2397ca05cf57656c59624ac01bf";
const HOST = "bgremovers.org";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const SITEMAP_PATH = "out/sitemap.xml";

function log(msg) {
  process.stdout.write(`[indexnow] ${msg}\n`);
}

function extractUrls(xml) {
  return Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g)).map((m) => m[1].trim());
}

try {
  const xml = readFileSync(SITEMAP_PATH, "utf8");
  const urls = extractUrls(xml);
  if (urls.length === 0) {
    log("no URLs found in sitemap — skipping");
    process.exit(0);
  }

  log(`pinging ${urls.length} URLs from ${SITEMAP_PATH}`);

  const body = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  };

  const response = await fetch("https://api.indexnow.org/IndexNow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  });

  // IndexNow returns 200 (or 202 Accepted) when everything is fine, and
  // 422 if key validation hasn't propagated yet (first time). Both are
  // non-fatal — we don't want this to fail the build.
  if (response.ok) {
    log(`OK (HTTP ${response.status}) — ${urls.length} URLs submitted to Bing/Yandex/Naver/Seznam`);
  } else {
    const text = await response.text().catch(() => "");
    log(`non-OK response: HTTP ${response.status} ${response.statusText}${text ? ` — ${text.slice(0, 200)}` : ""}`);
    log(`(this is informational; the build is not failed)`);
  }
} catch (err) {
  log(`error: ${err instanceof Error ? err.message : String(err)}`);
  log(`(this is informational; the build is not failed)`);
  // Exit 0 so a transient IndexNow failure never breaks the deploy.
}
