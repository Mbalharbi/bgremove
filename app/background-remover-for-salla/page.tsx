import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { SeoLanding } from "@/components/seo-landing";
import { webAppSchema, buildFaqSchema } from "@/lib/schema-locale";
import { SITE } from "@/lib/site";
const URL = `${SITE.url}/background-remover-for-salla/`;
const TITLE = "Free Background Remover for Salla Stores — Saudi Sellers";
const DESC = "Clean product photos for your Salla store. Free, unlimited, bulk-ready. Made by Saudi developers for the Saudi ecommerce community.";
const faqs = [
  { q: "Does this work with Salla's product image system?", a: "Yes. Salla accepts standard PNG and JPG. Drop your transparent PNG, or composite a branded background underneath in Canva first." },
  { q: "Is this tool Saudi-made?", a: "Yes — built by a Saudi developer specifically with Saudi sellers in mind. Free forever, processed entirely in your browser for privacy." },
  { q: "What's the optimal Salla product image size?", a: "Salla recommends 1000×1000 minimum. This tool outputs up to 4096px — gives you headroom for product page zoom features." },
  { q: "Can I bulk-process for a large Salla catalogue?", a: "Yes. /bulk handles 20 images at once. Perfect for established Salla stores with hundreds of SKUs." },
  { q: "Does it handle Arabic packaging well?", a: "Yes. The AI ignores text language and focuses on the foreground subject. Arabic, English, or mixed packaging all cut cleanly." },
  { q: "How does this compare to هي Photographer rates in Riyadh?", a: "Product photographers in Saudi typically charge SAR 30-100 per item. For a 200-product catalogue, that's SAR 6,000-20,000. BgRemove is free, runs locally, and produces equivalent results for white-background images." },
  { q: "Is my pre-launch product data secure?", a: "Yes. Nothing uploads. Critical for Saudi sellers competing in seasonal launches (White Friday, Ramadan, EID)." },
];
export const metadata: Metadata = { title: TITLE, description: DESC, alternates: { canonical: URL } };
export default function Page() {
  return (<><JsonLd data={[webAppSchema({ bcp47: "en-US", url: URL, name: "BgRemove for Salla", description: DESC }), buildFaqSchema("en-US", faqs)]} />
    <SeoLanding eyebrow="Salla Stores (Saudi Arabia)" title="Background remover for Salla"
      description="Free background remover for Saudi Salla store owners. Bulk processing, unlimited, no per-image cost. Built by Saudi developers for the Saudi ecommerce ecosystem."
      trustPills={[{ icon: "lock", label: "Pre-launch private" }, { icon: "zap", label: "Bulk 20 SKUs" }, { icon: "sparkles", label: "Free forever" }]}
      bullets={[
        { title: "Saudi-made", body: "Built by a Saudi developer for the Saudi ecommerce community." },
        { title: "Salla-ready", body: "1000×1000 minimum — we output up to 4096px." },
        { title: "Bulk mode", body: "20 SKUs per batch. Process 200-item catalogues in an evening." },
        { title: "Arabic packaging OK", body: "AI cuts cleanly regardless of label language." },
      ]}
      sections={[
        { heading: "Why Salla store owners benefit", body: "Salla's ecosystem is dominated by small-to-mid sellers competing in tight categories — perfumes, abayas, electronics, food, home goods. Visual quality of product photos is one of the biggest conversion levers, and most sellers can't afford a SAR 5,000 product photography session.\n\nBgRemove was built by a Saudi developer specifically with this gap in mind. It's free forever, runs in your browser (so unreleased products and competitive catalogues stay private), and produces studio-quality cutouts in 3 seconds per image." },
        { heading: "Workflow for Salla sellers", body: "Photograph products in any conditions — natural window light at home works well.\n\nOpen /ar or /bulk in your browser. Drop the SKU batch.\n\nEach image processes locally in 3-5 seconds. No upload, no server, no leak risk.\n\nDownload the ZIP of transparent PNGs.\n\nIn Canva (free Arabic interface available): build 1500×1500 template with white or brand-colour background.\n\nDrop each PNG, export, upload to Salla seller dashboard." },
        { heading: "Beyond product pages: campaigns and ads", body: "Transparent PNGs work for more than just product pages. White Friday campaigns, Ramadan banner ads, EID promotional creatives — same workflow. Drop the product on any campaign background, ship multiple variants per product, A/B test in Salla's promotional tools." },
      ]}
      faqs={faqs} faqTitle="Frequently asked questions"
      related={[
        { href: "/ar/", label: "النسخة العربية (Arabic version)" },
        { href: "/product-photo-background-remover/", label: "Product photo background remover" },
        { href: "/bulk/", label: "Bulk processing" },
        { href: "/background-remover-for-zid/", label: "For Zid stores" },
        { href: "/background-remover-for-noon/", label: "For Noon sellers" },
        { href: "/", label: "Back to background remover" },
      ]}
      relatedTitle="Related tools" ctaTitle="Build a professional Salla catalogue today"
      ctaSubtitle="Free, Saudi-made, bulk-ready." ctaButton="Start now" ctaHref="/" />
  </>);
}
