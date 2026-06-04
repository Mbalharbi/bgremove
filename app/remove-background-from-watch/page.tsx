import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { SeoLanding } from "@/components/seo-landing";
import { webAppSchema, buildFaqSchema } from "@/lib/schema-locale";
import { SITE } from "@/lib/site";
const URL = `${SITE.url}/remove-background-from-watch/`;
const TITLE = "Free Watch Background Remover — Luxury and Casual Timepieces";
const DESC = "Remove backgrounds from watch photos for Chrono24, eBay, your own shop. Captures bezel, crown, strap detail. Free, perfect for luxury and casual timepieces.";
const faqs = [
  { q: "Works on luxury watches (Rolex, Omega)?", a: "Yes. AI captures bezel detail, dial markers, and metal bracelet links accurately." },
  { q: "Glass dial reflections?", a: "Diffused light gives cleanest cuts. Avoid direct overhead lighting that creates dial glare." },
  { q: "Leather and metal straps?", a: "Both work. Leather texture and metal link detail preserved." },
  { q: "Chrono24 image requirements?", a: "Chrono24 recommends 1200×1200 minimum with clean backgrounds. We output up to 4096px." },
  { q: "Privacy for high-value listings?", a: "Critical. All processing local — watch serial numbers and unique identifiers stay private. Important for sellers concerned about catalog fraud." },
  { q: "Bulk for watch dealers?", a: "Yes — 20 watches per batch." },
  { q: "Will the result look authentic?", a: "Yes. The watch is unchanged — only the background is replaced. Authenticity verification (serials, hallmarks) remains intact." },
];
export const metadata: Metadata = { title: TITLE, description: DESC, alternates: { canonical: URL } };
export default function Page() {
  return (<><JsonLd data={[webAppSchema({ bcp47: "en-US", url: URL, name: "Watch BG Remover", description: DESC }), buildFaqSchema("en-US", faqs)]} />
    <SeoLanding eyebrow="Watch Dealers & Collectors" title="Remove backgrounds from watch photos"
      description="Clean cutouts for luxury and casual timepieces. For Chrono24, eBay, watch dealer sites, and Instagram brands. Captures bezel, dial detail, leather and metal straps."
      trustPills={[{ icon: "lock", label: "Serial numbers private" }, { icon: "zap", label: "Bulk 20 watches" }, { icon: "sparkles", label: "Free" }]}
      bullets={[
        { title: "Luxury detail", body: "Bezel, crown, dial markers, hallmarks preserved." },
        { title: "All straps", body: "Leather, metal bracelet, rubber, nylon — all cut cleanly." },
        { title: "Privacy critical", body: "Watch serials and unique IDs stay on your device." },
        { title: "Chrono24 ready", body: "1200×1200 minimum spec — we output up to 4096px." },
      ]}
      sections={[
        { heading: "Why watch dealers benefit", body: "Watch listings live on visual quality. Chrono24 buyers expect studio-grade photography on $5000+ pieces. Generic photography services can't tell a sub from a chronograph; specialized watch photographers charge $100-500 per piece.\n\nBgRemove handles watch-specific challenges: thin bezel markings, dial detail at scale, leather strap texture, polished steel reflections. For dealer-quality listings, this is the highest-leverage tool in the workflow." },
        { heading: "Best photo conditions", body: "Diffused light (softbox or window with diffuser) — avoids dial glare.\n\n45-degree angle to capture both dial and side profile.\n\nLay flat or use a small stand.\n\nMultiple angles: face, side (showing crown and pushers), back (showing caseback engraving), strap detail.\n\nClean the watch first — fingerprints and dust show through cutouts." },
        { heading: "Workflow for watch dealers", body: "Photograph each piece at 4-6 angles.\n\nDrop the batch (up to 20) into /bulk.\n\nDownload transparent PNGs.\n\nIn Canva: build a luxury-feel template — soft neutral gradient, subtle shadow under watch.\n\nDrop each PNG. Export at Chrono24-recommended dimensions.\n\nUpload to Chrono24, eBay Motors (Watches), your own site, Instagram.\n\nReplaces $500-2000 per dealer batch in commercial photography." },
      ]}
      faqs={faqs} faqTitle="Frequently asked questions"
      related={[
        { href: "/remove-background-from-jewelry/", label: "Jewelry background remover" },
        { href: "/background-remover-for-ebay/", label: "For eBay sellers" },
        { href: "/bulk/", label: "Bulk processing" },
        { href: "/", label: "Back to background remover" },
      ]}
      relatedTitle="Related tools" ctaTitle="Dealer-grade watch listings today"
      ctaSubtitle="Free, private, bulk-ready." ctaButton="Start now" ctaHref="/" />
  </>);
}
