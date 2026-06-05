/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from "next";
import Link from "next/link";
import { Code2, Globe, Zap, Lock, Terminal, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { JsonLd } from "@/components/json-ld";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";

const URL = `${SITE.url}/api/`;
const TITLE = "BgRemove API — Free Background Removal API + JavaScript SDK";
const DESC =
  "Two ways to integrate background removal into your app: a free JS SDK (client-side, unlimited) or a REST API (100 images/day per IP, no key required).";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE,
    description: DESC,
    type: "website",
    url: URL,
    images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: SITE.name }],
  },
};

const FAQS = [
  {
    q: "Which should I use — the SDK or the REST API?",
    a: "Use the SDK if you can process in the user's browser (web apps, browser extensions, Electron). It's unlimited, faster (no upload), and more private. Use the REST API for server-side processing (Node.js backends, scheduled jobs, CLI tools).",
  },
  {
    q: "Is the JavaScript SDK truly unlimited?",
    a: "Yes. The SDK runs the RMBG-1.4 model entirely in the user's browser using their CPU/GPU. We don't see, count, or rate-limit anything. The only cost is the one-time 44 MB model download.",
  },
  {
    q: "What are the REST API limits?",
    a: "100 images per day per IP address. Counter resets at UTC midnight. No API key required — just call the endpoint. Need more? Contact us for self-hosted or higher tiers.",
  },
  {
    q: "Do you store the images sent to the REST API?",
    a: "No. Images are streamed through the Worker, sent to the model provider for inference, the result is returned to you, and nothing is persisted. We don't log image bytes.",
  },
  {
    q: "Can I use this in production?",
    a: "The SDK is production-ready and used by ecommerce stores, design tools, and content platforms. The REST API is in beta — fine for prototypes and low-volume production. For high-volume use, run the SDK in headless Chrome.",
  },
  {
    q: "What's the licensing?",
    a: "MIT-licensed for both SDK and any code we publish. The RMBG-1.4 model itself is licensed for non-commercial use; for commercial use at scale, check briaai's licensing terms.",
  },
];

export default function ApiPage() {
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": `${URL}#page`,
            name: TITLE,
            description: DESC,
            url: URL,
            inLanguage: "en-US",
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQS.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          },
        ]}
      />

      <PageHeader
        eyebrow="API & SDK"
        title="Free Background Removal API"
        description="Two integrations to choose from: a client-side JavaScript SDK (unlimited, free) or a server-side REST API (100 images/day per IP, no key required)."
      />

      {/* CHOOSE YOUR PATH */}
      <section className="container max-w-5xl py-12">
        <div className="grid gap-6 md:grid-cols-2">
          {/* SDK card */}
          <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Code2 className="h-5 w-5" />
            </div>
            <h2 className="mt-3 text-xl font-semibold">JavaScript SDK</h2>
            <p className="mt-1 text-sm font-medium text-emerald-700 dark:text-emerald-400">
              ✓ Unlimited · ✓ No key · ✓ Client-side
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Drop a single <code>&lt;script&gt;</code> tag in your page. Runs RMBG-1.4 in your user's browser. Free forever — we never process anything on our side.
            </p>
            <Button asChild className="mt-5">
              <a href="#sdk">Read SDK docs <ArrowRight className="h-4 w-4" /></a>
            </Button>
          </div>

          {/* API card */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Terminal className="h-5 w-5" />
            </div>
            <h2 className="mt-3 text-xl font-semibold">REST API</h2>
            <p className="mt-1 text-sm font-medium text-muted-foreground">
              ✓ 100/day free · ✓ No signup · ✓ Server-side
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              POST an image, get a transparent PNG back. Rate-limited per IP at 100 images/day. No API key required.
            </p>
            <Button asChild variant="outline" className="mt-5">
              <a href="#rest">Read API docs <ArrowRight className="h-4 w-4" /></a>
            </Button>
          </div>
        </div>
      </section>

      {/* SDK SECTION */}
      <section id="sdk" className="container max-w-3xl py-12 scroll-mt-20">
        <h2 className="text-3xl font-bold tracking-tight">JavaScript SDK</h2>
        <p className="mt-2 text-muted-foreground">
          The SDK runs background removal in your user's browser — no upload to our servers, no rate limit, no API key. Free forever.
        </p>

        <h3 className="mt-8 text-xl font-semibold">1. Include the script</h3>
        <pre className="mt-3 overflow-x-auto rounded-xl border border-border bg-card p-4 text-sm">
{`<script src="https://bgremovers.org/sdk/v1.js"></script>`}
        </pre>

        <h3 className="mt-8 text-xl font-semibold">2. Remove a background</h3>
        <pre className="mt-3 overflow-x-auto rounded-xl border border-border bg-card p-4 text-sm">
{`<input type="file" id="file" accept="image/*">
<img id="result">

<script>
  document.getElementById('file').onchange = async (e) => {
    const file = e.target.files[0];
    const transparentPng = await BgRemove.removeBackground(file, {
      maxDimension: 4096,
      onProgress: (p) => console.log(p),
    });
    document.getElementById('result').src = URL.createObjectURL(transparentPng);
  };
</script>`}
        </pre>

        <h3 className="mt-8 text-xl font-semibold">3. Pre-warm for instant first use</h3>
        <pre className="mt-3 overflow-x-auto rounded-xl border border-border bg-card p-4 text-sm">
{`// Call once on page load to download the model in the background.
// The first user-triggered removeBackground() will then be near-instant.
BgRemove.preload();`}
        </pre>

        <h3 className="mt-8 text-xl font-semibold">API reference</h3>
        <div className="mt-3 overflow-x-auto rounded-xl border border-border bg-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="p-3 text-left font-semibold">Method</th>
                <th className="p-3 text-left font-semibold">Signature</th>
                <th className="p-3 text-left font-semibold">Returns</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="p-3 font-mono">removeBackground</td>
                <td className="p-3 font-mono text-xs">(file: File|Blob, opts?: object)</td>
                <td className="p-3 font-mono text-xs">Promise&lt;Blob&gt;</td>
              </tr>
              <tr className="border-b border-border">
                <td className="p-3 font-mono">preload</td>
                <td className="p-3 font-mono text-xs">()</td>
                <td className="p-3 font-mono text-xs">Promise&lt;void&gt;</td>
              </tr>
              <tr>
                <td className="p-3 font-mono">version</td>
                <td className="p-3 font-mono text-xs">string</td>
                <td className="p-3 font-mono text-xs">"1.0.0"</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="mt-8 text-xl font-semibold">Options</h3>
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
          <li><code className="text-foreground">maxDimension</code> — Cap longest edge in pixels. Default <code>4096</code>.</li>
          <li><code className="text-foreground">onProgress(p)</code> — Callback with <code>&#123;stage, progress?, device?&#125;</code>. Stages: <code>loading-runtime</code>, <code>loading-model</code>, <code>downloading</code>, <code>ready</code>.</li>
        </ul>
      </section>

      {/* REST API SECTION */}
      <section id="rest" className="container max-w-3xl py-12 scroll-mt-20">
        <h2 className="text-3xl font-bold tracking-tight">REST API</h2>
        <p className="mt-2 text-muted-foreground">
          For server-side processing. <strong>100 images per day per IP</strong>, no API key required, no signup.
        </p>

        <div className="mt-6 rounded-xl border border-yellow-500/40 bg-yellow-500/5 p-4 text-sm">
          <p className="font-semibold text-yellow-700 dark:text-yellow-300">Beta status</p>
          <p className="mt-1 text-muted-foreground">
            The REST API is in beta. Production traffic should prefer the JS SDK or include retry-with-backoff. Upstream model availability may vary.
          </p>
        </div>

        <h3 className="mt-8 text-xl font-semibold">Endpoint</h3>
        <pre className="mt-3 overflow-x-auto rounded-xl border border-border bg-card p-4 text-sm">
{`POST https://bgremovers.org/api/v1/remove-background`}
        </pre>

        <h3 className="mt-8 text-xl font-semibold">Request — multipart form-data</h3>
        <pre className="mt-3 overflow-x-auto rounded-xl border border-border bg-card p-4 text-sm">
{`curl -X POST https://bgremovers.org/api/v1/remove-background \\
  -F "image=@product.jpg" \\
  -o transparent.png`}
        </pre>

        <h3 className="mt-8 text-xl font-semibold">Request — JSON with URL</h3>
        <pre className="mt-3 overflow-x-auto rounded-xl border border-border bg-card p-4 text-sm">
{`curl -X POST https://bgremovers.org/api/v1/remove-background \\
  -H "Content-Type: application/json" \\
  -d '{"image_url":"https://example.com/photo.jpg"}' \\
  -o transparent.png`}
        </pre>

        <h3 className="mt-8 text-xl font-semibold">Request — raw bytes</h3>
        <pre className="mt-3 overflow-x-auto rounded-xl border border-border bg-card p-4 text-sm">
{`curl -X POST https://bgremovers.org/api/v1/remove-background \\
  -H "Content-Type: image/jpeg" \\
  --data-binary @product.jpg \\
  -o transparent.png`}
        </pre>

        <h3 className="mt-8 text-xl font-semibold">Node.js example</h3>
        <pre className="mt-3 overflow-x-auto rounded-xl border border-border bg-card p-4 text-sm">
{`import fs from "node:fs";

const form = new FormData();
form.append("image", new Blob([fs.readFileSync("photo.jpg")], { type: "image/jpeg" }));

const res = await fetch("https://bgremovers.org/api/v1/remove-background", {
  method: "POST",
  body: form,
});

if (!res.ok) {
  const err = await res.json();
  throw new Error(err.error.message);
}

const png = Buffer.from(await res.arrayBuffer());
fs.writeFileSync("transparent.png", png);

console.log("Daily remaining:", res.headers.get("X-RateLimit-Remaining"));`}
        </pre>

        <h3 className="mt-8 text-xl font-semibold">Python example</h3>
        <pre className="mt-3 overflow-x-auto rounded-xl border border-border bg-card p-4 text-sm">
{`import requests

with open("photo.jpg", "rb") as f:
    r = requests.post(
        "https://bgremovers.org/api/v1/remove-background",
        files={"image": f},
    )
r.raise_for_status()

with open("transparent.png", "wb") as f:
    f.write(r.content)

print("Remaining today:", r.headers.get("X-RateLimit-Remaining"))`}
        </pre>

        <h3 className="mt-8 text-xl font-semibold">Response</h3>
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
          <li><strong>Success (200):</strong> Binary PNG with alpha channel. <code>Content-Type: image/png</code>.</li>
          <li><strong>Headers:</strong> <code>X-RateLimit-Limit: 100</code>, <code>X-RateLimit-Remaining: N</code>.</li>
          <li><strong>Rate limit (429):</strong> JSON error <code>&#123;"error": &#123;"code": "rate_limit_exceeded", ...&#125;&#125;</code></li>
          <li><strong>Too large (413):</strong> Max 10 MB per image via REST API. Use SDK for larger.</li>
          <li><strong>Upstream error (502):</strong> Model temporarily unavailable. Retry with backoff.</li>
        </ul>

        <h3 className="mt-8 text-xl font-semibold">Health check</h3>
        <pre className="mt-3 overflow-x-auto rounded-xl border border-border bg-card p-4 text-sm">
{`GET https://bgremovers.org/api/v1/health

{
  "status": "ok",
  "version": "1.0.0",
  "daily_limit": 100,
  "rest_api_enabled": true
}`}
        </pre>
      </section>

      {/* WHY IT'S FREE */}
      <section className="container max-w-3xl py-12">
        <h2 className="text-3xl font-bold tracking-tight">Why is this free?</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-5">
            <Globe className="h-5 w-5 text-primary" />
            <h3 className="mt-3 font-semibold">SDK runs on your users' devices</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">No compute cost for us per image. Free is sustainable.</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <Zap className="h-5 w-5 text-primary" />
            <h3 className="mt-3 font-semibold">REST API uses open models</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">RMBG-1.4 is open source. We pay only for the Worker compute, which is on Cloudflare's free tier for the 100/day usage.</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <Lock className="h-5 w-5 text-primary" />
            <h3 className="mt-3 font-semibold">No image storage</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">We don't keep your images — no storage cost, no privacy risk.</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <Code2 className="h-5 w-5 text-primary" />
            <h3 className="mt-3 font-semibold">Open source</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">SDK and Worker code are public on GitHub. Audit it yourself.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container max-w-3xl py-12">
        <h2 className="text-3xl font-bold tracking-tight">FAQ</h2>
        <div className="mt-6 divide-y divide-border rounded-2xl border border-border bg-card">
          {FAQS.map((item) => (
            <div key={item.q} className="px-6 py-5">
              <h3 className="font-semibold">{item.q}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container max-w-3xl pb-16">
        <div className="rounded-2xl border border-primary/30 bg-primary/5 p-8 text-center sm:p-12">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Start integrating</h2>
          <p className="mt-3 text-muted-foreground">
            Pick the SDK for unlimited client-side use, or the REST API for server workflows. Both free.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <a href="#sdk">SDK quickstart <ArrowRight className="h-4 w-4" /></a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#rest">REST API docs <ArrowRight className="h-4 w-4" /></a>
            </Button>
          </div>
          <p className="mt-6 text-xs text-muted-foreground">
            <Link href="https://github.com/Mbalharbi/bgremove" className="underline">View source on GitHub</Link> ·{" "}
            <Link href="/privacy-proof/" className="underline">How we verify privacy</Link>
          </p>
        </div>
      </section>
    </>
  );
}
