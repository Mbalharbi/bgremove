/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { JsonLd } from "@/components/json-ld";
import { ImageConverter } from "@/components/image-converter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { SITE } from "@/lib/site";

const URL = `${SITE.url}/tools/png-to-jpg/`;
const TITLE = "PNG to JPG Converter — Free, No Upload, In Your Browser";
const DESC = "Convert PNG to JPG in your browser. Free, unlimited, no signup, no watermark. Transparency is flattened to white.";

export const metadata: Metadata = { title: TITLE, description: DESC, alternates: { canonical: URL } };

const FAQS = [
  { q: "Does this PNG to JPG converter upload my files?", a: "No. Everything runs in your browser using canvas. Your files never reach our servers." },
  { q: "What happens to PNG transparency?", a: "JPG doesn't support transparency. We flatten transparent areas to white. If you need to keep transparency, stay with PNG." },
  { q: "Will my image quality drop?", a: "JPG is lossy by design, but at 85% quality the difference is imperceptible for photos. Use 95% for printing or archival." },
  { q: "Why convert PNG to JPG?", a: "JPG files are 5-10x smaller than equivalent PNGs for photographs. Use JPG for camera-style images, photos, and anywhere transparency isn't needed." },
  { q: "Are there file size or count limits?", a: "Single files up to 30 MB. No daily quota. Use the bulk remover for multi-file workflows." },
];

export default function Page() {
  return (
    <>
      <JsonLd data={[
        { "@context": "https://schema.org", "@type": "WebApplication", "@id": `${URL}#webapp`, name: "PNG to JPG Converter", url: URL, applicationCategory: "UtilitiesApplication", operatingSystem: "Any modern web browser", description: DESC, isAccessibleForFree: true, offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } },
        { "@context": "https://schema.org", "@type": "HowTo", name: "How to convert PNG to JPG", step: [
          { "@type": "HowToStep", position: 1, name: "Upload your PNG", text: "Drag, paste, or tap to upload any PNG file up to 30 MB." },
          { "@type": "HowToStep", position: 2, name: "Pick quality", text: "Choose 60/75/85/95% quality. 85% is the sweet spot for photos." },
          { "@type": "HowToStep", position: 3, name: "Download the JPG", text: "Your converted file downloads instantly. Transparency is flattened to white." },
        ] },
        { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
      ]} />

      <PageHeader eyebrow="PNG to JPG" title="Convert PNG to JPG for free" description="Browser-based PNG → JPG converter. Smaller files, instant download, no upload to our servers." />

      <section className="container max-w-3xl py-10">
        <ImageConverter to="image/jpeg" acceptMime="image/png" outExt="jpg" defaultQuality={0.85} />
      </section>

      <section className="container max-w-3xl py-12">
        <div className="prose prose-slate max-w-none dark:prose-invert">
          <h2>When to convert PNG to JPG</h2>
          <p>PNG is fantastic for graphics with transparency (logos, icons, screenshots of UI), but it's overkill for photographs. A camera photo saved as PNG can be 10-20 MB; the same image as JPG at 85% quality is often under 2 MB with no visible difference. If you're uploading photos to social media, ecommerce, or email, JPG saves bandwidth and loads faster.</p>
          <h2>What this converter does</h2>
          <p>The PNG is read into your browser's memory, decoded onto a canvas element, flattened against a white background (since JPG can't store transparency), and re-encoded as JPEG at your chosen quality. The whole pipeline runs on your device — no upload, no server-side processing.</p>
          <h2>Quality settings</h2>
          <ul>
            <li><strong>60%</strong> — Tiny files, slight artifacts. Good for previews or thumbnails.</li>
            <li><strong>75%</strong> — Solid web default. Visually fine for most uses.</li>
            <li><strong>85%</strong> — The sweet spot. Indistinguishable from original at normal viewing.</li>
            <li><strong>95%</strong> — Archival / printing quality. Bigger files but no visible loss.</li>
          </ul>
        </div>
      </section>

      <section className="container max-w-3xl py-12">
        <h2 className="text-2xl font-bold">FAQ</h2>
        <div className="mt-6 divide-y divide-border rounded-2xl border border-border bg-card">
          {FAQS.map((item) => (
            <div key={item.q} className="px-6 py-5">
              <h3 className="font-semibold">{item.q}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container max-w-3xl py-12">
        <div className="rounded-2xl border border-border bg-card/60 p-6">
          <h2 className="mb-4 text-lg font-semibold">Related tools</h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            <li><Link href="/tools/jpg-to-png/" className="block rounded-lg border border-border bg-background p-3 text-sm hover:border-primary/40">JPG to PNG <ArrowRight className="ml-1 inline h-3 w-3" /></Link></li>
            <li><Link href="/tools/webp-converter/" className="block rounded-lg border border-border bg-background p-3 text-sm hover:border-primary/40">WebP converter <ArrowRight className="ml-1 inline h-3 w-3" /></Link></li>
            <li><Link href="/tools/image-compressor/" className="block rounded-lg border border-border bg-background p-3 text-sm hover:border-primary/40">Image compressor <ArrowRight className="ml-1 inline h-3 w-3" /></Link></li>
            <li><Link href="/" className="block rounded-lg border border-border bg-background p-3 text-sm hover:border-primary/40">Background remover <ArrowRight className="ml-1 inline h-3 w-3" /></Link></li>
          </ul>
        </div>
        <div className="mt-10 flex justify-center"><Button asChild variant="outline"><Link href="/">Back to all tools <ArrowRight className="h-4 w-4" /></Link></Button></div>
      </section>
    </>
  );
}
