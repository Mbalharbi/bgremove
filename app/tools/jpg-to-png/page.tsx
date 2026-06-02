/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { JsonLd } from "@/components/json-ld";
import { ImageConverter } from "@/components/image-converter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { SITE } from "@/lib/site";

const URL = `${SITE.url}/tools/jpg-to-png/`;
const TITLE = "JPG to PNG Converter — Free, No Upload, Lossless";
const DESC = "Convert JPG to PNG in your browser. Free, unlimited, no watermark. Lossless re-encoding for editing.";

export const metadata: Metadata = { title: TITLE, description: DESC, alternates: { canonical: URL } };

const FAQS = [
  { q: "Does converting JPG to PNG improve quality?", a: "No — the JPG's existing compression artifacts are baked in. PNG is lossless, so converting preserves the JPG as-is without further degradation. Useful before editing, but not for 'restoring' the image." },
  { q: "Why would I convert JPG to PNG?", a: "Before editing in design tools (avoid compounding JPG losses), to preserve quality across many edits, or when an upload form only accepts PNG." },
  { q: "Will the PNG be bigger?", a: "Yes — typically 2-5x bigger because PNG is lossless. The trade-off is worth it for graphics, screenshots, or anything you plan to edit." },
  { q: "Does this support transparency?", a: "The source JPG has no transparency, so the resulting PNG will be a solid image. If you need transparency, use the background remover instead." },
  { q: "Is my image private?", a: "Yes — 100% browser conversion, no upload." },
];

export default function Page() {
  return (
    <>
      <JsonLd data={[
        { "@context": "https://schema.org", "@type": "WebApplication", "@id": `${URL}#webapp`, name: "JPG to PNG Converter", url: URL, applicationCategory: "UtilitiesApplication", operatingSystem: "Any modern web browser", description: DESC, isAccessibleForFree: true, offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } },
        { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
      ]} />

      <PageHeader eyebrow="JPG to PNG" title="Convert JPG to PNG for free" description="Browser-based JPG → PNG converter. Lossless re-encoding, no upload, no watermark." />

      <section className="container max-w-3xl py-10">
        <ImageConverter to="image/png" acceptMime="image/jpeg" outExt="png" />
      </section>

      <section className="container max-w-3xl py-12">
        <div className="prose prose-slate max-w-none dark:prose-invert">
          <h2>When to convert JPG to PNG</h2>
          <p>JPG is lossy — every save discards some detail. PNG is lossless — it keeps every pixel exactly as you save it. Convert JPG to PNG before opening a file in a design tool where you'll make multiple edits, so the editing process doesn't compound JPG artifacts.</p>
          <h2>What this converter actually does</h2>
          <p>The JPG is decoded into pixels in your browser, then re-encoded as a PNG. The resulting PNG faithfully represents the original JPG — including all its existing compression artifacts. The PNG itself won't add more loss.</p>
          <h2>Size trade-off</h2>
          <p>Expect the PNG to be 2-5x bigger than the original JPG. For a 500 KB JPG photo, the PNG might be 2 MB. This is normal — PNG stores every pixel exactly; JPG approximates them.</p>
          <h2>Need transparency too?</h2>
          <p>This converter doesn't add transparency (the source JPG doesn't have any). For a transparent PNG, use the <Link href="/transparent-png-maker/">transparent PNG maker</Link> — it removes the background using AI and outputs a true transparent PNG.</p>
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
            <li><Link href="/tools/webp-converter/" className="block rounded-lg border border-border bg-background p-3 text-sm hover:border-primary/40">WebP converter <ArrowRight className="ml-1 inline h-3 w-3" /></Link></li>
            <li><Link href="/transparent-png-maker/" className="block rounded-lg border border-border bg-background p-3 text-sm hover:border-primary/40">Transparent PNG maker <ArrowRight className="ml-1 inline h-3 w-3" /></Link></li>
            <li><Link href="/" className="block rounded-lg border border-border bg-background p-3 text-sm hover:border-primary/40">Background remover <ArrowRight className="ml-1 inline h-3 w-3" /></Link></li>
          </ul>
        </div>
        <div className="mt-10 flex justify-center"><Button asChild variant="outline"><Link href="/">Back to all tools <ArrowRight className="h-4 w-4" /></Link></Button></div>
      </section>
    </>
  );
}
