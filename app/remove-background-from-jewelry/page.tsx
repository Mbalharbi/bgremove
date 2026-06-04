import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { SeoLanding } from "@/components/seo-landing";
import { webAppSchema, buildFaqSchema } from "@/lib/schema-locale";
import { SITE } from "@/lib/site";
const URL = `${SITE.url}/remove-background-from-jewelry/`;
const TITLE = "Free Jewelry Background Remover — Rings, Necklaces, Earrings";
const DESC = "Remove backgrounds from jewelry photos for Etsy, Shopify, Instagram. Captures thin chains, faceted gems, gold details. Free, unlimited, bulk-ready.";
const faqs = [
  { q: "Can it cut thin necklace chains?", a: "Yes. RMBG-1.4 handles fine detail well. For very thin gold chains, shoot against a strongly-contrasting background (dark velvet for gold, light fabric for dark metals)." },
  { q: "Diamond and gem facets?", a: "Yes. Facets and translucent stones cut cleanly. For loose stones photographed at angle, the AI preserves through-stone visibility." },
  { q: "Earring posts and jump rings?", a: "Yes. The model captures tiny detail like jump rings and pearl earring posts. Verify on critical photos." },
  { q: "How does it handle gold reflections?", a: "Well — but avoid direct overhead lighting that creates specular highlights. Diffused softbox or window light gives cleanest results." },
  { q: "Photo privacy for unreleased designs?", a: "Yes. Critical for jewellery designers protecting original work. All processing local — designs never reach our servers." },
  { q: "Bulk for an Etsy jewellery shop?", a: "Yes — 20 pieces at once. Great for shop-coherent catalogue refresh." },
  { q: "Will this damage the perceived quality vs studio photography?", a: "No. For online listings, clean cutouts on consistent backgrounds rival studio look. For luxury brand campaign work, hire a photographer; for marketplace listings, this is excellent." },
];
export const metadata: Metadata = { title: TITLE, description: DESC, alternates: { canonical: URL } };
export default function Page() {
  return (<><JsonLd data={[webAppSchema({ bcp47: "en-US", url: URL, name: "Jewelry BG Remover", description: DESC }), buildFaqSchema("en-US", faqs)]} />
    <SeoLanding eyebrow="Jewelry Sellers" title="Remove backgrounds from jewelry photos"
      description="Clean cutouts for rings, necklaces, earrings, bracelets, gems. Free background remover that captures thin chains, faceted stones, and tiny metal detail. Perfect for Etsy, Shopify, Instagram."
      trustPills={[{ icon: "lock", label: "Designs private" }, { icon: "zap", label: "Bulk 20 pieces" }, { icon: "sparkles", label: "Free" }]}
      bullets={[
        { title: "Fine detail", body: "Chains, posts, jump rings, faceted stones all preserved." },
        { title: "All metals", body: "Gold, silver, platinum, rose gold — all cut cleanly." },
        { title: "Diamonds and gems", body: "Faceted stones and translucent gems handled well." },
        { title: "Design IP private", body: "Unreleased designs never leave your browser." },
      ]}
      sections={[
        { heading: "Why jewelry sellers benefit", body: "Jewelry photography is uniquely challenging. Pieces are small but require sharp detail. Backgrounds need to be perfectly clean — any clutter distracts from a $500 ring. Professional jewellery photographers charge $50-200 per piece.\n\nBgRemove gives you studio-grade cutouts in seconds. Combined with simple at-home lighting (a window and a white card reflector), it replaces expensive product photography for online sales." },
        { heading: "Best photo conditions for jewelry", body: "Window light + white card reflector = even diffused lighting, no harsh reflections.\n\nDark velvet background for gold and silver — strong contrast for clean cuts.\n\nLight white or cream background for dark metals (oxidized silver, black gold).\n\nClose-up at 1:1 macro distance if possible. Phones do this surprisingly well.\n\nMultiple angles — front, side, on-hand/on-neck where applicable." },
        { heading: "Beyond product pages: branded campaigns", body: "Transparent jewelry PNGs let you composite onto branded backgrounds — gradient brand colours, textured surfaces (marble, leather, velvet), holiday-season themes. Build the master template once, swap backgrounds for different campaigns. Single highest-leverage workflow for solo jewelry brands competing with established names." },
      ]}
      faqs={faqs} faqTitle="Frequently asked questions"
      related={[
        { href: "/background-remover-for-etsy/", label: "For Etsy sellers" },
        { href: "/background-remover-for-instagram/", label: "For Instagram brands" },
        { href: "/bulk/", label: "Bulk processing" },
        { href: "/", label: "Back to background remover" },
      ]}
      relatedTitle="Related tools" ctaTitle="Build a luxury jewelry catalogue at zero cost"
      ctaSubtitle="Free, design-IP-safe." ctaButton="Start now" ctaHref="/" />
  </>);
}
