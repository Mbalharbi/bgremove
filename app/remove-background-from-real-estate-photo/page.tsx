import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { SeoLanding } from "@/components/seo-landing";
import { webAppSchema, buildFaqSchema } from "@/lib/schema-locale";
import { SITE } from "@/lib/site";
const URL = `${SITE.url}/remove-background-from-real-estate-photo/`;
const TITLE = "Free Real Estate Background Remover — Agent Headshots, Property Cutouts";
const DESC = "Clean agent headshots, isolate property photos for marketing campaigns. Free, browser-only. Built for real estate agents and brokerages.";
const faqs = [
  { q: "Works for agent headshots?", a: "Yes. RMBG-1.4 excels at portraits. Clean transparent agent headshots for company websites, signage, business cards." },
  { q: "Property photos — isolate the building?", a: "Yes. For wide property shots, the AI separates the building from sky and ground. Useful for marketing collateral where you want to composite on a branded background." },
  { q: "Interior photos?", a: "Less common use, but works. Isolates furniture for staging proposals." },
  { q: "Bulk for an agency?", a: "Yes — process every agent's headshot in one batch for consistent agency branding." },
  { q: "Photo privacy for properties before listing?", a: "Yes. Critical for off-market listings or properties under negotiation. All processing local." },
  { q: "Will MLS accept these?", a: "MLS systems usually want photos showing context. Use BgRemove for marketing collateral, not MLS primary photos. Agent headshots, brochures, social media posts — perfect fit." },
  { q: "Combine with virtual staging?", a: "Yes. Get transparent property image, composite on a styled background for staging proposals. Same workflow." },
];
export const metadata: Metadata = { title: TITLE, description: DESC, alternates: { canonical: URL } };
export default function Page() {
  return (<><JsonLd data={[webAppSchema({ bcp47: "en-US", url: URL, name: "Real Estate BG Remover", description: DESC }), buildFaqSchema("en-US", faqs)]} />
    <SeoLanding eyebrow="Real Estate Agents & Agencies" title="Real estate background remover"
      description="Clean agent headshots, isolated property photos for marketing campaigns. Free, browser-only. Perfect for agencies needing consistent branding across agents and properties."
      trustPills={[{ icon: "lock", label: "Off-market listings private" }, { icon: "zap", label: "Bulk agency-wide" }, { icon: "sparkles", label: "Free" }]}
      bullets={[
        { title: "Portrait-optimized", body: "RMBG-1.4 is best-in-class for agent headshots." },
        { title: "Property cutouts", body: "Isolate buildings for branded marketing materials." },
        { title: "Agency-wide bulk", body: "Process every agent's headshot for consistent branding." },
        { title: "Marketing-ready", body: "Brochures, social media, signage — same workflow." },
      ]}
      sections={[
        { heading: "Why agents and agencies benefit", body: "Real estate is a relationship business — agent photos appear everywhere: brokerage websites, business cards, lawn signs, brochures, social media. Inconsistent agent headshots (different backgrounds, lighting, photographers) make a brokerage look uncoordinated.\n\nBgRemove fixes this for free. Every agent uploads their own selfie or phone-snap headshot. Run them all through BgRemove. Composite onto the agency's branded background. Suddenly every agent has consistent, professional branding without the $300-1000 per agent commercial photo session." },
        { heading: "Workflow for brokerages", body: "Collect agent headshots — phone selfies are fine.\n\nProcess via /bulk on BgRemove. Up to 20 agents per batch.\n\nDownload transparent PNGs.\n\nIn Canva: build agency-branded headshot template (logo, brand colours, agent name).\n\nDrop each PNG. Export.\n\nDistribute to agents for use on business cards, signage, social profiles.\n\nFor a 30-agent brokerage, total cost: zero. Replaces a $9000-30000 agency-wide photo session." },
        { heading: "Property marketing collateral", body: "For property marketing brochures, an isolated property photo on a branded background looks more polished than a raw photo with sky and ground. Use BgRemove on the hero exterior shot, layer on the brokerage's marketing template, ship the brochure.\n\nSame applies to social media posts — Instagram carousel ads, Facebook listings, LinkedIn property highlights. Isolated property + branded background = consistent visual identity across every campaign." },
      ]}
      faqs={faqs} faqTitle="Frequently asked questions"
      related={[
        { href: "/portrait-background-remover/", label: "Portrait background remover" },
        { href: "/remove-background-from-furniture/", label: "Furniture background remover (staging)" },
        { href: "/bulk/", label: "Bulk processing" },
        { href: "/", label: "Back to background remover" },
      ]}
      relatedTitle="Related tools" ctaTitle="Unify your agency's branding today"
      ctaSubtitle="Free, agency-wide bulk processing." ctaButton="Start now" ctaHref="/" />
  </>);
}
