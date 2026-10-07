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
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
}

interface KVNamespace {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, opts?: { expirationTtl?: number }): Promise<void>;
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
