import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { JsonLd } from "@/components/json-ld";
import { QrGenerator } from "@/components/qr-generator";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { SITE } from "@/lib/site";

const URL = `${SITE.url}/tools/qr-code-generator/`;
const TITLE = "Free QR Code Generator — Customisable, No Signup";
const DESCRIPTION =
  "Generate QR codes for URLs, Wi-Fi, contact cards, and more. Free, no signup, no watermark, no tracking. Download as PNG.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
};

const FAQS = [
  { q: "Is this QR generator really free?", a: "Yes — completely free, no signup, no watermark, unlimited usage. Generate as many QR codes as you want." },
  { q: "What can I encode in a QR code?", a: "Any text or URL. Common uses: links, Wi-Fi credentials, contact cards (vCard), email addresses, phone numbers, plain text, or app deep links." },
  { q: "What size should I download?", a: "256px is fine for screen use and most prints. Use 512px for posters/menus, and 1024px for large prints, billboards, or scaling tolerance." },
  { q: "What does 'error correction' mean?", a: "QR codes can survive partial damage. Level L (~7%) is smallest; H (~30%) is most resilient but denser. Use H if you plan to add a logo overlay or print at small sizes." },
  { q: "Can I add my logo to the QR?", a: "Not in this generator yet — but high error-correction QR codes (level H) tolerate a logo placed in the centre using any image editor like Canva or Photoshop." },
];

export default function QrToolPage() {
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "@id": `${URL}#webapp`,
            name: "BgRemove QR Code Generator",
            url: URL,
            applicationCategory: "UtilitiesApplication",
            operatingSystem: "Any modern web browser",
            description: DESCRIPTION,
            isAccessibleForFree: true,
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          },
          {
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "How to generate a QR code",
            step: [
              { "@type": "HowToStep", position: 1, name: "Enter your text or URL", text: "Paste a link, Wi-Fi credentials, or any text into the input box." },
              { "@type": "HowToStep", position: 2, name: "Pick a size and style", text: "Choose 256/512/1024px and a colour scheme." },
              { "@type": "HowToStep", position: 3, name: "Download the PNG", text: "Click Download. Your QR code is ready for print or web." },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          },
        ]}
      />

      <PageHeader
        eyebrow="QR Code Generator"
        title="Free QR code generator"
        description="Make a customisable QR code for any URL, Wi-Fi credential, or text in seconds. Free, no signup, no watermark."
      />

      <section className="container py-10">
        <QrGenerator />
      </section>

      <section className="container max-w-3xl py-12">
        <div className="prose prose-slate max-w-none dark:prose-invert">
          <h2>What you can encode</h2>
          <ul>
            <li><strong>URLs</strong> — most common use. Web pages, app store links, social profiles.</li>
            <li><strong>Wi-Fi credentials</strong> — format: <code>WIFI:T:WPA;S:NETWORK_NAME;P:PASSWORD;;</code> — guests scan and join.</li>
            <li><strong>Contact cards (vCard)</strong> — business card replacement.</li>
            <li><strong>Email addresses</strong> — <code>mailto:hello@example.com</code></li>
            <li><strong>Phone numbers</strong> — <code>tel:+15551234567</code></li>
            <li><strong>Plain text</strong> — promo codes, instructions, anything up to ~4,000 characters.</li>
          </ul>

          <h2>Print vs. screen sizing</h2>
          <p>For a phone scanner held ~30 cm from the code, you want the QR printed at least <strong>2 × 2 cm</strong>. For wall posters scanned from 1-2 metres, aim for <strong>10 × 10 cm</strong> or larger. Always test before mass printing.</p>

          <h2>Error correction in practice</h2>
          <p>The four levels are L (7%), M (15%), Q (25%), H (30%). If you plan to place a logo or sticker in the centre of the QR, use <strong>H</strong> — it can lose up to 30% of the surface and still scan. For a clean digital-only QR, <strong>M</strong> (the default) is enough.</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="container max-w-3xl py-12">
        <h2 className="text-2xl font-bold sm:text-3xl">FAQ</h2>
        <div className="mt-6 divide-y divide-border rounded-2xl border border-border bg-card">
          {FAQS.map((item) => (
            <div key={item.q} className="px-6 py-5">
              <h3 className="font-semibold text-foreground">{item.q}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Related */}
      <section className="container max-w-3xl py-12">
        <div className="rounded-2xl border border-border bg-card/60 p-6">
          <h2 className="mb-4 text-lg font-semibold">Related free tools</h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            <li><Link href="/" className="block rounded-lg border border-border bg-background p-3 text-sm transition-colors hover:border-primary/40 hover:bg-primary/5">Background remover <ArrowRight className="ml-1 inline h-3 w-3" /></Link></li>
            <li><Link href="/tools/image-compressor/" className="block rounded-lg border border-border bg-background p-3 text-sm transition-colors hover:border-primary/40 hover:bg-primary/5">Image compressor <ArrowRight className="ml-1 inline h-3 w-3" /></Link></li>
            <li><Link href="/tools/image-resizer/" className="block rounded-lg border border-border bg-background p-3 text-sm transition-colors hover:border-primary/40 hover:bg-primary/5">Image resizer <ArrowRight className="ml-1 inline h-3 w-3" /></Link></li>
            <li><Link href="/transparent-png-maker/" className="block rounded-lg border border-border bg-background p-3 text-sm transition-colors hover:border-primary/40 hover:bg-primary/5">Transparent PNG maker <ArrowRight className="ml-1 inline h-3 w-3" /></Link></li>
          </ul>
        </div>

        <div className="mt-10 flex justify-center">
          <Button asChild variant="outline">
            <Link href="/">Back to all tools <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
      </section>
    </>
  );
}
