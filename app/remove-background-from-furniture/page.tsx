import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { SeoLanding } from "@/components/seo-landing";
import { webAppSchema, buildFaqSchema } from "@/lib/schema-locale";
import { SITE } from "@/lib/site";
const URL = `${SITE.url}/remove-background-from-furniture/`;
const TITLE = "Free Furniture Background Remover — Sofas, Chairs, Tables";
const DESC = "Remove backgrounds from furniture photos for Wayfair, Houzz, Facebook Marketplace, your own store. Handles upholstery texture, wood grain, glass tops.";
const faqs = [
  { q: "Works on upholstered furniture?", a: "Yes. Fabric texture, tufting, and edge detail all preserved." },
  { q: "Wood grain detail?", a: "Yes. Wood-grain texture stays intact through the cutout." },
  { q: "Glass tables and reflective surfaces?", a: "Works well in diffused light. Avoid direct overhead lighting that creates glare." },
  { q: "Large items in small rooms?", a: "Photograph from a low angle to capture the full piece. Crop closely before processing to give the AI a cleaner subject." },
  { q: "Bulk for furniture catalogues?", a: "Yes — 20 pieces at once via /bulk." },
  { q: "Inventory privacy for retailers?", a: "Yes. All processing local. Pre-launch collections stay private." },
  { q: "Will the result work for AR room placement features?", a: "Yes. Apps like IKEA Place and Wayfair View require clean transparent PNGs for AR composition. This tool produces compatible output." },
];
export const metadata: Metadata = { title: TITLE, description: DESC, alternates: { canonical: URL } };
export default function Page() {
  return (<><JsonLd data={[webAppSchema({ bcp47: "en-US", url: URL, name: "Furniture BG Remover", description: DESC }), buildFaqSchema("en-US", faqs)]} />
    <SeoLanding eyebrow="Furniture Retailers & Sellers" title="Remove backgrounds from furniture photos"
      description="Clean cutouts for sofas, chairs, tables, beds. Captures upholstery texture, wood grain, glass surfaces. For Wayfair, Houzz, Facebook Marketplace, your own store."
      trustPills={[{ icon: "lock", label: "Inventory private" }, { icon: "zap", label: "Bulk 20 pieces" }, { icon: "sparkles", label: "Free" }]}
      bullets={[
        { title: "Upholstery + texture", body: "Fabric, tufting, leather, suede — all preserved." },
        { title: "Wood + glass", body: "Wood grain stays sharp; glass cuts cleanly with diffused light." },
        { title: "AR-ready", body: "Output compatible with Wayfair View, IKEA Place AR tools." },
        { title: "Catalogue scale", body: "Bulk 20 pieces — full furniture line in a session." },
      ]}
      sections={[
        { heading: "Why furniture sellers benefit", body: "Furniture is sold heavily on visual quality. A sofa shot in a cluttered showroom looks cheap; the same sofa on a clean background looks premium. Marketplace listings with clean cutouts consistently outperform messy ones in click-through and conversion.\n\nThe AI handles furniture-specific challenges well: upholstery texture (tufting, seams, fabric weaves), wood grain detail, reflective surfaces (glass tops, polished metals). Results work for product pages, AR room-placement apps, and lifestyle composites." },
        { heading: "Workflow for furniture retailers", body: "Photograph furniture against any background — store floor, warehouse, workshop.\n\nDrop the batch into /bulk on BgRemove.\n\nDownload ZIP of transparent PNGs.\n\nIn Canva or Photoshop: composite onto a styled room background, or keep as clean transparent for AR features and Wayfair-style listings.\n\nUpload to your store, Wayfair seller portal, Houzz Pro, or Facebook Marketplace.\n\nFor full furniture collections (5-30 pieces per line), this saves $1000-5000 in commercial photography per launch." },
        { heading: "AR features: a hidden win", body: "AR apps like Wayfair View, IKEA Place, and Houzz View in My Room all require clean transparent PNG product assets to composite into AR previews. Sellers who provide AR-compatible assets get featured placement and significantly higher conversion. BgRemove output is directly usable in these workflows — same image works for product pages and AR." },
      ]}
      faqs={faqs} faqTitle="Frequently asked questions"
      related={[
        { href: "/remove-background-from-real-estate-photo/", label: "Real estate photos" },
        { href: "/bulk/", label: "Bulk processing" },
        { href: "/background-remover-for-shopify/", label: "For Shopify stores" },
        { href: "/", label: "Back to background remover" },
      ]}
      relatedTitle="Related tools" ctaTitle="Professional furniture listings today"
      ctaSubtitle="Free, AR-ready, bulk-friendly." ctaButton="Start now" ctaHref="/" />
  </>);
}
