import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { SeoLanding } from "@/components/seo-landing";
import { webAppSchema, buildFaqSchema } from "@/lib/schema-locale";
import { SITE } from "@/lib/site";
const URL = `${SITE.url}/background-remover-for-zid/`;
const TITLE = "Free Background Remover for Zid Stores — Saudi Sellers";
const DESC = "Clean product photos for your Zid store. Free, unlimited, bulk-ready. Built for Saudi sellers competing on Zid's growing marketplace.";
const faqs = [
  { q: "Does this work with Zid's product upload?", a: "Yes. Zid accepts standard PNG and JPG. Upload your transparent PNG directly or composite onto a white/brand background first in Canva." },
  { q: "Best image size for Zid?", a: "Zid recommends 1000×1000 minimum. Our output goes up to 4096px — Retina-ready and supports product zoom features." },
  { q: "Can I bulk-process my catalogue?", a: "Yes. /bulk processes up to 20 images at once. Manageable for catalogues of 200+ SKUs across a few sessions." },
  { q: "Saudi-made tool?", a: "Yes. Built by a Saudi developer. The Arabic version (/ar) gives you the same workflow with native Arabic UI." },
  { q: "Does it handle Saudi-specific products (oud, abayas, dates)?", a: "Yes. The AI handles fabrics, glass perfume bottles, and packaged foods well. For very thin chains or sheer fabrics, use strong-contrast lighting for best results." },
  { q: "Is my catalogue data private?", a: "Yes. Pre-launch products and competitive imagery never reach our servers. Verify with DevTools Network tab during processing." },
  { q: "How does this compare to using Adobe Express on Zid?", a: "Adobe Express's BG remover is gated behind a subscription. BgRemove is free, runs locally, and produces results equivalent or better for most product types." },
];
export const metadata: Metadata = { title: TITLE, description: DESC, alternates: { canonical: URL } };
export default function Page() {
  return (<><JsonLd data={[webAppSchema({ bcp47: "en-US", url: URL, name: "BgRemove for Zid", description: DESC }), buildFaqSchema("en-US", faqs)]} />
    <SeoLanding eyebrow="Zid Stores (Saudi Arabia)" title="Background remover for Zid"
      description="Free background remover for Saudi Zid store owners. Built by a Saudi developer for the Saudi ecommerce community. Bulk processing, unlimited, runs in your browser."
      trustPills={[{ icon: "lock", label: "Pre-launch private" }, { icon: "zap", label: "Bulk 20 SKUs" }, { icon: "sparkles", label: "Free forever" }]}
      bullets={[
        { title: "Saudi-made", body: "Built by a Saudi developer for the Saudi seller community." },
        { title: "Zid-ready", body: "1000×1000 minimum — output up to 4096px for Retina." },
        { title: "Bulk mode", body: "20 SKUs per batch. Process 200+ SKUs in an evening." },
        { title: "Saudi categories", body: "Perfumes, abayas, oud, dates, electronics — all work." },
      ]}
      sections={[
        { heading: "Why Zid store owners need this", body: "Zid is growing fast in Saudi Arabia, but the competition is tightening. Visual quality of product photos is one of the highest-leverage conversion factors, and most small sellers can't justify the SAR 50-200 per item that local photographers charge.\n\nBgRemove closes that gap completely. Free, bulk-ready, runs in your browser. Built by a Saudi developer who understands the Saudi seller workflow — including the privacy concerns around competitive product imagery." },
        { heading: "Workflow for Zid sellers", body: "Photograph products at home with natural window light.\n\nDrop the batch into /bulk on BgRemove (or /ar/bulk for Arabic interface).\n\nEach image processes locally in 3-5 seconds.\n\nDownload the ZIP of transparent PNGs.\n\nIn Canva: build 1500×1500 template with white or brand-colour background.\n\nDrop each PNG. Export. Upload to Zid seller dashboard.\n\nTotal time for a 50-SKU catalogue: about 2 hours." },
        { heading: "Saudi-specific product categories", body: "Perfumes (oud, attar): glass bottles with reflections — AI handles them well, but watch for over-bright reflections from studio lights.\n\nAbayas and textiles: fabric edges cut cleanly. For sheer or beaded fabrics, use a strongly-contrasting background.\n\nDates and food: works well, especially with neutral packaging.\n\nGold jewellery: handles thin chains adequately, but for high-end items, verify the result and re-shoot if needed.\n\nElectronics: glossy surfaces are fine; matte products are even easier." },
      ]}
      faqs={faqs} faqTitle="Frequently asked questions"
      related={[
        { href: "/ar/", label: "النسخة العربية (Arabic version)" },
        { href: "/product-photo-background-remover/", label: "Product photo background remover" },
        { href: "/bulk/", label: "Bulk processing" },
        { href: "/background-remover-for-salla/", label: "For Salla stores" },
        { href: "/background-remover-for-noon/", label: "For Noon sellers" },
        { href: "/", label: "Back to background remover" },
      ]}
      relatedTitle="Related tools" ctaTitle="Build a professional Zid catalogue today"
      ctaSubtitle="Free, Saudi-made, bulk-ready." ctaButton="Start now" ctaHref="/" />
  </>);
}
