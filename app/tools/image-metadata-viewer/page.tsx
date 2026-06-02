/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { JsonLd } from "@/components/json-ld";
import { ImageMetadataViewer } from "@/components/image-metadata-viewer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { SITE } from "@/lib/site";

const URL = `${SITE.url}/tools/image-metadata-viewer/`;
const TITLE = "Image Metadata Viewer — Inspect EXIF, GPS, and Privacy Risks";
const DESC = "Inspect EXIF metadata of any image in your browser. See camera, GPS, timestamps, author tags — and what to strip before sharing.";

export const metadata: Metadata = { title: TITLE, description: DESC, alternates: { canonical: URL } };

const FAQS = [
  { q: "What is image metadata?", a: "Photos carry hidden tags called EXIF that record the camera model, lens, exposure settings, capture time, and often GPS coordinates. Posting a photo without stripping metadata can leak your location and habits." },
  { q: "Does this tool upload my image?", a: "No. EXIF parsing happens entirely in your browser. The file never leaves your device." },
  { q: "How do I strip metadata?", a: "Run the image through our PNG/JPG converter — the re-encode drops most EXIF tags. For full sanitisation, use a dedicated tool like ExifTool." },
  { q: "Which formats are supported?", a: "JPEG EXIF is fully parsed. PNG and WebP currently show file-level metadata only (size, dimensions). XMP support is planned." },
  { q: "What is the GPS warning for?", a: "If your photo embeds latitude/longitude (very common on smartphones), publishing it can reveal where it was taken. Strip GPS before posting to social media or marketplaces." },
];

export default function Page() {
  return (
    <>
      <JsonLd data={[
        { "@context": "https://schema.org", "@type": "WebApplication", "@id": `${URL}#webapp`, name: "Image Metadata Viewer", url: URL, applicationCategory: "UtilitiesApplication", operatingSystem: "Any modern web browser", description: DESC, isAccessibleForFree: true, offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } },
        { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
      ]} />

      <PageHeader eyebrow="Metadata Viewer" title="Inspect image metadata" description="See what's hidden in your photo: camera, lens, GPS, timestamps. Parsed locally — your image stays on your device." />

      <section className="container max-w-3xl py-10">
        <ImageMetadataViewer />
      </section>

      <section className="container max-w-3xl py-12">
        <div className="prose prose-slate max-w-none dark:prose-invert">
          <h2>Why metadata matters</h2>
          <p>Every photo from a modern phone or camera embeds metadata — camera brand and model, lens used, exposure settings, capture time, and very often GPS coordinates pinpointing where the photo was taken. When you post a photo to Twitter, Marketplace, or send it to a stranger, all of that travels with the file unless you strip it first.</p>
          <h2>Common privacy risks</h2>
          <ul>
            <li><strong>GPS location</strong> — phones embed exact coordinates by default. Sharing photos from your home reveals your address.</li>
            <li><strong>Capture time</strong> — exact timestamps reveal patterns of when you were where.</li>
            <li><strong>Author/copyright tags</strong> — your name, registered with photo apps, can leak personal info.</li>
            <li><strong>Camera serial numbers</strong> — some EXIF fields include serial numbers that link separate photos to the same physical device.</li>
          </ul>
          <h2>How to strip metadata</h2>
          <p>Run the image through our <Link href="/tools/png-to-jpg/">PNG to JPG converter</Link> or <Link href="/tools/jpg-to-png/">JPG to PNG converter</Link>. The canvas re-encode drops most EXIF tags. For aggressive sanitisation (XMP, IPTC, etc.) use a desktop tool like ExifTool.</p>
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
            <li><Link href="/privacy-proof/" className="block rounded-lg border border-border bg-background p-3 text-sm hover:border-primary/40">Privacy Proof <ArrowRight className="ml-1 inline h-3 w-3" /></Link></li>
            <li><Link href="/" className="block rounded-lg border border-border bg-background p-3 text-sm hover:border-primary/40">Background remover <ArrowRight className="ml-1 inline h-3 w-3" /></Link></li>
          </ul>
        </div>
        <div className="mt-10 flex justify-center"><Button asChild variant="outline"><Link href="/">Back to all tools <ArrowRight className="h-4 w-4" /></Link></Button></div>
      </section>
    </>
  );
}
