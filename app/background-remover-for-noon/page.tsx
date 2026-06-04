import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { SeoLanding } from "@/components/seo-landing";
import { webAppSchema, buildFaqSchema } from "@/lib/schema-locale";
import { SITE } from "@/lib/site";
const URL = `${SITE.url}/background-remover-for-noon/`;
const TITLE = "Free Background Remover for Noon Sellers — White Background, Bulk";
const DESC = "Compliant white-background product images for Noon (Saudi Arabia, UAE, Egypt). Free, unlimited, bulk-ready. Built for Gulf marketplace sellers.";
const faqs = [
  { q: "What is Noon's product image requirement?", a: "Noon requires a clean white background for primary product images (similar to Amazon's MAIN policy). This tool gives you a transparent cutout — add a white layer in Canva to comply." },
  { q: "Bulk processing for Gulf sellers?", a: "Yes. /bulk handles 20 images at once. Perfect for high-volume sellers in Saudi Arabia, UAE, and Egypt managing large catalogues." },
  { q: "Does it work for Arabic product labels?", a: "Yes. The AI removes background regardless of language on product labels. Arabic, English, or mixed packaging all cut cleanly." },
  { q: "Is my product data secure?", a: "100%. Pre-launch products and competitive imagery never leave your device. Critical for Gulf sellers competing in seasonal launches." },
  { q: "How does this compare to hiring a photo editor?", a: "Photo editing services in the region typically charge $5-20 per image. BgRemove is free, runs in your browser, and produces equivalent results in 3 seconds. For a 200-SKU catalogue, that's $1000-4000 saved." },
  { q: "Does it work for jewellery, perfumes, electronics?", a: "Yes. The model handles reflective surfaces (gold, perfume bottles, glossy electronics) well. For mission-critical images on luxury items, verify the result and re-shoot in better light if needed." },
  { q: "Can I use this for Noon's daily deals or seasonal launches?", a: "Absolutely. The transparent PNGs work for daily-deal banner creatives, seasonal campaign assets, and Noon's homepage promotional spots — same workflow, no extra steps." },
];
export const metadata: Metadata = { title: TITLE, description: DESC, alternates: { canonical: URL } };
export default function Page() {
  return (<><JsonLd data={[webAppSchema({ bcp47: "en-US", url: URL, name: "BgRemove for Noon", description: DESC }), buildFaqSchema("en-US", faqs)]} />
    <SeoLanding eyebrow="Noon Sellers (KSA, UAE, Egypt)" title="Background remover for Noon"
      description="Compliant white-background product images for Noon Saudi Arabia, UAE, and Egypt. Free, bulk-ready, unlimited. Built specifically for Gulf marketplace sellers."
      trustPills={[{ icon: "lock", label: "Pre-launch private" }, { icon: "zap", label: "Bulk: 20 at once" }, { icon: "sparkles", label: "Free, no per-image cost" }]}
      bullets={[
        { title: "Noon-compliant", body: "Transparent PNG + white layer = meets Noon's primary image spec." },
        { title: "Gulf marketplace ready", body: "Works for KSA, UAE, and Egypt Noon storefronts." },
        { title: "Bulk mode", body: "20 SKUs per batch. Process 500-item catalogues in an evening." },
        { title: "Arabic labels OK", body: "AI cuts cleanly regardless of language on product packaging." },
      ]}
      sections={[
        { heading: "Why Gulf sellers need this", body: "Noon's product image policy mirrors Amazon's: clean white background for the primary image, 85%+ product coverage, no watermarks. Professional product photography in Riyadh, Dubai, or Cairo costs SAR 50-200 per item — adds up fast for sellers with hundreds of SKUs.\n\nBgRemove removes that cost completely. Run your phone photos through the bulk tool, drop a white layer underneath in Canva, upload to Noon Seller Lab. Compliant catalogue in hours, not weeks." },
        { heading: "Workflow for Noon sellers", body: "Photograph products in any conditions — natural light from a window is enough.\n\nOpen /bulk in browser. Drop the SKU batch.\n\nEach image processes locally in 3-5 seconds. No upload to our servers, no leak risk for unreleased SKUs.\n\nDownload ZIP of transparent PNGs.\n\nIn Canva (free plan works): create 2000×2000 canvas, white background, drop product PNG.\n\nExport JPG, upload to Noon Seller Lab. Done." },
        { heading: "Beyond compliance: campaigns and storefronts", body: "Transparent PNGs unlock more than just primary images. Noon's daily deals banner format, seasonal campaign creatives (White Friday, Ramadan), and homepage promotional spots all benefit from clean product cutouts. Use the same PNG, layer different campaign backgrounds, ship multiple creative variants." },
      ]}
      faqs={faqs} faqTitle="Frequently asked questions"
      related={[
        { href: "/product-photo-background-remover/", label: "Product photo background remover" },
        { href: "/bulk/", label: "Bulk processing" },
        { href: "/background-remover-for-salla/", label: "For Salla stores (Saudi Arabia)" },
        { href: "/background-remover-for-zid/", label: "For Zid stores" },
        { href: "/background-remover-for-amazon/", label: "For Amazon sellers" },
        { href: "/", label: "Back to background remover" },
      ]}
      relatedTitle="Related tools" ctaTitle="Build a compliant Noon catalogue today"
      ctaSubtitle="Free, bulk, private." ctaButton="Start now" ctaHref="/" />
  </>);
}
