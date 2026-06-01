/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from "next";
import Link from "next/link";
import {
  EyeOff, ServerOff, Lock, Cpu, ArrowRight, Terminal, Wifi,
} from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/json-ld";
import { SITE } from "@/lib/site";

const PAGE_URL = `${SITE.url}/privacy-proof/`;

export const metadata: Metadata = {
  title: "Privacy Proof — How We Prove Your Images Never Leave Your Device",
  description:
    "BGRemovers processes images entirely in your browser using a local AI model. Open DevTools, watch the Network tab, see zero uploads. Here's exactly how it works — and how you can verify it yourself in 30 seconds.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "article",
    url: PAGE_URL,
    title: "Privacy Proof — Zero Image Uploads, Verifiable",
    description: "Open DevTools, watch the Network tab, see zero outgoing image data. Verifiable proof that BGRemovers never uploads.",
    images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: SITE.name }],
  },
};

const PROOFS = [
  { Icon: ServerOff, title: "We have no upload endpoint", body: "BGRemovers is a static site on Cloudflare. There is no backend API, no /api routes, no database. Even if we wanted to receive your image, we have nowhere to put it." },
  { Icon: Cpu, title: "The AI runs in your browser", body: "We use RMBG-1.4 via transformers.js (primary) with MediaPipe Selfie Segmenter (fallback). Both execute through WebAssembly + WebGPU on your own CPU/GPU. The model weights download once from a public CDN, then cache locally." },
  { Icon: EyeOff, title: "We physically cannot see your photos", body: "Open browser DevTools → Network tab → drop an image. You will see no outbound HTTP POST/PUT carrying image bytes. The only outbound traffic is the one-time model download and (optionally) anonymous page-view analytics." },
  { Icon: Lock, title: "We don't store anything either", body: "No cookies set by us beyond a theme preference. No localStorage of image data. When you close the tab, every pixel is freed from memory." },
];

const VERIFY_STEPS = [
  { n: 1, title: "Open DevTools", body: "On the BGRemovers page, press F12 (Windows/Linux) or ⌥⌘I (Mac) to open Chrome DevTools." },
  { n: 2, title: "Switch to the Network tab", body: "Click the Network tab. Hit the Clear button (🚫) to wipe previous entries. Leave the filter set to All." },
  { n: 3, title: "Drop an image", body: "Drag any photo onto the tool. Watch the Network list. You will see the model file download once (if it's not already cached), and after that — nothing. No POST request with image data." },
  { n: 4, title: "Try it offline (the killer proof)", body: "After the first load, disconnect Wi-Fi or enable Airplane mode. Drop another image. Background removal still works. Mathematically, no upload could possibly be happening." },
];

const VS_TABLE = [
  { feature: "Image upload to a third-party server", us: "Never", cloud: "Always (the entire model)" },
  { feature: "Stored on a server (even temporarily)", us: "Never", cloud: "Yes, for a retention window" },
  { feature: "Sent through a CDN edge that logs requests", us: "Only the model file", cloud: "Every image + every result" },
  { feature: "Subject to third-party data breaches", us: "Impossible by design", cloud: "Possible" },
  { feature: "Works fully offline after first load", us: "Yes", cloud: "No" },
  { feature: "Can the operator see your photo?", us: "No — we have no path to it", cloud: "Yes, in principle" },
];

const FAQS = [
  { q: "How can I be 100% sure no image is being uploaded?", a: "Open Chrome DevTools (F12), switch to the Network tab, drop an image, and watch. You'll see the AI model download once (from a public CDN), and after that, no outbound request carries your image bytes. As a final test, disconnect from the internet after the first load — background removal will still work, which is mathematically only possible if it's running locally." },
  { q: "What does 'browser-only AI' actually mean?", a: "It means the neural network weights are downloaded to your browser once, then inference (the actual background-detection calculation) runs on your device's CPU or GPU via WebAssembly and WebGPU. Your image data never enters a JSON payload, FormData blob, or any other outbound network request." },
  { q: "Where does the AI model come from?", a: "Two engines run as primary + fallback. RMBG-1.4 (briaai/RMBG-1.4) loads from the Hugging Face CDN — 44 MB, cached forever after the first visit. The fallback, MediaPipe Selfie Segmenter, loads from Google's storage CDN — 4 MB. We're considering self-hosting both on Cloudflare to remove even those third-party dependencies." },
  { q: "Why does this matter for my business / portrait / passport photo?", a: "If you're processing a product photo before launch, an internal team headshot, a child's photo, an ID document, or anything else with privacy implications — cloud-based tools store your file on their servers for a retention window. That's a real risk vector (breaches, insider access, government requests). BGRemovers eliminates the risk by never having the file in the first place." },
  { q: "What about analytics / tracking?", a: "We use anonymous Cloudflare Web Analytics (no cookies, no IP tracking) to count page views and country distribution. We never see filenames, image contents, or any data associated with the tool itself — because those don't exist on our side." },
  { q: "Is the code open for inspection?", a: "Yes. The repository is public on GitHub. You can read every line of the background-removal code in lib/bg-removal*.ts and verify there is no fetch() or XMLHttpRequest carrying image data anywhere in the pipeline." },
];

export default function PrivacyProofPage() {
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "TechArticle",
            "@id": `${PAGE_URL}#article`,
            headline: "Privacy Proof — How BGRemovers Proves Your Images Never Leave Your Device",
            description: "Verifiable browser-only image processing: open DevTools, watch the Network tab, see zero uploads.",
            url: PAGE_URL,
            inLanguage: "en-US",
            author: { "@type": "Organization", name: SITE.name, url: SITE.url },
            publisher: { "@type": "Organization", name: SITE.name, url: SITE.url, logo: { "@type": "ImageObject", url: `${SITE.url}/icon-512.png` } },
          },
          {
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "How to verify BGRemovers does not upload your images",
            description: "Use Chrome DevTools to confirm no image data leaves your device.",
            totalTime: "PT2M",
            step: VERIFY_STEPS.map((s) => ({ "@type": "HowToStep", position: s.n, name: s.title, text: s.body })),
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQS.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })),
          },
        ]}
      />

      <PageHeader
        eyebrow="Privacy Proof"
        title="Proof that your images never leave your device"
        description="Most “privacy-friendly” tools promise to delete your photos after processing. BGRemovers takes a different approach: we never receive them in the first place. Here's exactly how, and how you can verify it yourself."
      />

      {/* PROOFS */}
      <section className="container py-12">
        <div className="grid gap-4 sm:grid-cols-2">
          {PROOFS.map(({ Icon, title, body }) => (
            <div key={title} className="rounded-xl border border-primary/30 bg-card p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <h2 className="mt-3 text-lg font-semibold">{title}</h2>
              <p className="mt-1.5 text-sm text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* VERIFY IT YOURSELF */}
      <section className="container py-12">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold sm:text-3xl">Verify it yourself in 30 seconds</h2>
          <p className="mt-3 text-muted-foreground">
            We don't ask you to trust us — we'd rather you check. Anyone with a Chrome browser can prove that BGRemovers does not upload images, using nothing but a built-in developer tool.
          </p>

          <ol className="mt-10 space-y-6">
            {VERIFY_STEPS.map((s) => (
              <li key={s.n} className="flex gap-4 rounded-2xl border border-border bg-card p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">
                  {s.n}
                </div>
                <div>
                  <h3 className="text-base font-semibold">{s.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-10 rounded-2xl border border-primary/40 bg-primary/5 p-6">
            <div className="flex items-start gap-3">
              <Wifi className="h-5 w-5 shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">The offline test is the killer proof</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  No cloud tool can work without internet. After your first BGRemovers visit, the AI is cached locally. Disconnect Wi-Fi and try again. If it still works — and it will — there is mathematically no way an upload is happening.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="container py-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold sm:text-3xl">BGRemovers vs. cloud-based tools</h2>
          <p className="mt-3 text-muted-foreground">
            A real, line-by-line comparison of what happens to your image with browser-only vs. cloud-based background removers.
          </p>
          <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="p-4 text-left font-semibold">What happens to your image</th>
                    <th className="p-4 text-center font-semibold text-emerald-700 dark:text-emerald-400">BGRemovers (browser)</th>
                    <th className="p-4 text-center font-semibold">Cloud tools</th>
                  </tr>
                </thead>
                <tbody>
                  {VS_TABLE.map((row, i) => (
                    <tr key={row.feature} className={i % 2 === 1 ? "bg-muted/20 border-b border-border" : "border-b border-border last:border-0"}>
                      <td className="p-4 font-medium text-foreground">{row.feature}</td>
                      <td className="p-4 text-center bg-primary/5 text-emerald-700 dark:text-emerald-400 font-medium">{row.us}</td>
                      <td className="p-4 text-center text-muted-foreground">{row.cloud}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* TECH DEEP DIVE */}
      <section className="container py-12">
        <div className="mx-auto max-w-3xl prose prose-slate dark:prose-invert prose-headings:tracking-tight">
          <h2>The technical pipeline (for the curious)</h2>
          <p>Here's what actually happens, in order, when you drop an image on the tool:</p>
          <ol>
            <li><strong>You select a file.</strong> Your browser holds it as a binary blob in JavaScript memory. No network activity yet.</li>
            <li><strong>The blob is drawn into an HTML <code>&lt;canvas&gt;</code>.</strong> Pixels live in your tab's heap.</li>
            <li><strong>Inference runs locally.</strong> RMBG-1.4 (an ONNX model) runs through transformers.js on WebAssembly / WebGPU. The compute happens on your own CPU or GPU. Zero network calls.</li>
            <li><strong>The result canvas is encoded to a PNG blob.</strong> Still in your tab.</li>
            <li><strong>The PNG is offered as a download.</strong> The "download" is a <code>blob:</code> URL — a pointer to memory inside your browser, not a server resource.</li>
            <li><strong>You close the tab.</strong> Every pixel is garbage-collected. Nothing persists.</li>
          </ol>
          <p>This pipeline has no <code>fetch()</code> call that takes your image as a body, no <code>FormData.append('file', blob)</code>, no <code>XMLHttpRequest.send(blob)</code>. You can read every line of the source on{" "}
            <Link href="https://github.com/Mbalharbi/bgremove" target="_blank" rel="noopener">GitHub</Link>{" "}
            and verify this for yourself.
          </p>

          <h2>What about the AI model?</h2>
          <p>The model itself <em>does</em> come from a network — it's downloaded once from a public CDN (Hugging Face for RMBG-1.4, Google storage for the MediaPipe fallback) and then cached in your browser. After that single download, all inference is local. The CDN logs that <em>some browser</em> requested the file; it has no way to know what you do with it afterward.</p>

          <h2>What we don't do, ever</h2>
          <ul>
            <li>We don't run a backend that processes images.</li>
            <li>We don't proxy images through a Worker.</li>
            <li>We don't ship image data to an analytics provider.</li>
            <li>We don't send image data to ad networks.</li>
            <li>We don't write image data to localStorage, IndexedDB, or any other persistent store.</li>
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="container py-12">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold sm:text-3xl">Privacy FAQ</h2>
          <div className="mt-8 divide-y divide-border rounded-2xl border border-border bg-card">
            {FAQS.map((item) => (
              <div key={item.q} className="px-6 py-5">
                <h3 className="font-semibold text-foreground">{item.q}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container pb-16">
        <div className="mx-auto max-w-3xl rounded-2xl border border-primary/30 bg-primary/5 p-8 text-center sm:p-12">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Try it — and verify it</h2>
          <p className="mt-3 text-muted-foreground">
            Drop an image. Open DevTools. See for yourself that nothing gets uploaded.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/">Open the tool <ArrowRight className="h-4 w-4" /></Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="https://github.com/Mbalharbi/bgremove" target="_blank" rel="noopener">
                <Terminal className="h-4 w-4" /> Read the source
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
