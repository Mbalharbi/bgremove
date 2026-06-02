/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { JsonLd } from "@/components/json-ld";
import { WebpConverterTool } from "@/components/webp-converter-tool";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { SITE } from "@/lib/site";

const URL = `${SITE.url}/tools/webp-converter/`;
const TITLE = "WebP Converter — PNG/JPG ↔ WebP, Free, In Your Browser";
const DESC = "Convert PNG/JPG to WebP (or back) in your browser. Free, unlimited, no signup. WebP gives 25-35% smaller files than JPG at the same quality.";

export const metadata: Metadata = { title: TITLE, description: DESC, alternates: { canonical: URL } };

const FAQS = [
  { q: "Why convert to WebP?", a: "WebP is ~25-35% smaller than equivalent JPG and supports transparency like PNG. Modern browsers (Chrome, Firefox, Edge, Safari 14+) all support it. Great for web performance." },
  { q: "Will the WebP look different?", a: "At 80%+ quality, WebP is visually identical to the original. Lower quality settings show artifacts but at a smaller file size." },
  { q: "Does it support transparency?", a: "Yes. WebP supports transparency natively — when converting from PNG with transparency, the alpha channel is preserved." },
  { q: "Is everything private?", a: "Yes. 100% browser-based. No upload to any server." },
  { q: "What about older browsers?", a: "Internet Explorer doesn't support WebP. Safari 13 and below need a fallback. For maximum compatibility, keep a JPG/PNG version too." },
];

export default function Page() {
  return (
    <>
      <JsonLd data={[
        { "@context": "https://schema.org", "@type": "WebApplication", "@id": `${URL}#webapp`, name: "WebP Converter", url: URL, applicationCategory: "UtilitiesApplication", operatingSystem: "Any modern web browser", description: DESC, isAccessibleForFree: true, offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } },
        { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
      ]} />

      <PageHeader eyebrow="WebP Converter" title="WebP converter" description="Convert PNG/JPG ↔ WebP. 25-35% smaller files at the same visual quality." />

      <section className="container max-w-3xl py-10">
        <WebpConverterTool />
      </section>

      <section className="container max-w-3xl py-12">
        <div className="prose prose-slate max-w-none dark:prose-invert">
          <h2>Why WebP?</h2>
          <p>WebP, developed by Google, gives you smaller files than JPG (~25-35% smaller at the same visual quality) and supports transparency like PNG. Every modern browser supports it: Chrome, Firefox, Edge, and Safari 14+.</p>
          <h2>When to use WebP</h2>
          <ul>
            <li><strong>Web performance.</strong> Smaller files mean faster page loads and better Core Web Vitals.</li>
            <li><strong>Mobile apps.</strong> Less bandwidth, faster downloads, less battery.</li>
            <li><strong>Image-heavy sites.</strong> Galleries, ecommerce, blogs — anywhere bandwidth adds up.</li>
          </ul>
          <h2>When to stay with JPG/PNG</h2>
          <p>If you need to support Internet Explorer or old Safari versions, WebP isn't safe. Print workflows often still require TIFF or high-quality JPG. For permanent archival of important photos, lossless PNG is more conservative.</p>
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
            <li><Link href="/tools/png-to-jpg/" className="block rounded-lg border border-border bg-background p-3 text-sm hover:border-primary/40">PNG to JPG <ArrowRight className="ml-1 inline h-3 w-3" /></Link></li>
            <li><Link href="/tools/jpg-to-png/" className="block rounded-lg border border-border bg-background p-3 text-sm hover:border-primary/40">JPG to PNG <ArrowRight className="ml-1 inline h-3 w-3" /></Link></li>
            <li><Link href="/tools/image-compressor/" className="block rounded-lg border border-border bg-background p-3 text-sm hover:border-primary/40">Image compressor <ArrowRight className="ml-1 inline h-3 w-3" /></Link></li>
            <li><Link href="/" className="block rounded-lg border border-border bg-background p-3 text-sm hover:border-primary/40">Background remover <ArrowRight className="ml-1 inline h-3 w-3" /></Link></li>
          </ul>
        </div>
        <div className="mt-10 flex justify-center"><Button asChild variant="outline"><Link href="/">Back to all tools <ArrowRight className="h-4 w-4" /></Link></Button></div>
      </section>
    </>
  );
}
