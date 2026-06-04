import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { SeoLanding } from "@/components/seo-landing";
import { webAppSchema, buildFaqSchema } from "@/lib/schema-locale";
import { SITE } from "@/lib/site";
const URL = `${SITE.url}/remove-background-from-business-card/`;
const TITLE = "Free Business Card Background Remover — Digital Cards and Portfolios";
const DESC = "Clean up business card photos for digital portfolios, LinkedIn, contact-saving apps. Free, isolates the card from any background.";
const faqs = [
  { q: "Why isolate a business card?", a: "Digital business cards, portfolio sites, contact-saving apps (CamCard, ABBYY) all benefit from clean isolated card images." },
  { q: "Works for both sides of a card?", a: "Yes. Process each side individually. The AI handles standard rectangular cards well." },
  { q: "Preserves typography and embossing?", a: "Yes. Foreground design — typography, logos, embossed elements — stays intact. Only the background table or surface is removed." },
  { q: "Phone camera quality is OK?", a: "Yes. Even average phone photos work. For best results, photograph straight-down on a contrasting surface." },
  { q: "Privacy for contact info?", a: "Yes. Business cards often contain phone numbers, emails, addresses — all stays in your browser. Important for industries where contact privacy matters." },
  { q: "Combine with OCR?", a: "Yes. Clean-background business card → better OCR results for contact-saving apps. Some apps benefit significantly." },
  { q: "Bulk for networking events?", a: "Yes. After a conference with 30+ cards collected, batch-process via /bulk for archival or contact app upload." },
];
export const metadata: Metadata = { title: TITLE, description: DESC, alternates: { canonical: URL } };
export default function Page() {
  return (<><JsonLd data={[webAppSchema({ bcp47: "en-US", url: URL, name: "Business Card BG Remover", description: DESC }), buildFaqSchema("en-US", faqs)]} />
    <SeoLanding eyebrow="Business Cards" title="Business card background remover"
      description="Clean isolated business cards for digital portfolios, LinkedIn, and contact-saving apps. Free, browser-only, preserves typography and embossing detail."
      trustPills={[{ icon: "lock", label: "Contact info private" }, { icon: "zap", label: "Both sides supported" }, { icon: "sparkles", label: "Free" }]}
      bullets={[
        { title: "Card detail preserved", body: "Typography, logos, embossing all intact." },
        { title: "Phone photos OK", body: "Average smartphone camera is enough." },
        { title: "Portfolio-ready", body: "Clean cutouts for design portfolios and case studies." },
        { title: "OCR-friendly", body: "Better scan results for CamCard, ABBYY, contact apps." },
      ]}
      sections={[
        { heading: "When to use this", body: "Designers building portfolio sites showcasing business card work.\n\nFreelancers documenting client deliverables.\n\nDesign agencies producing case studies.\n\nNetworking professionals batch-processing cards from conferences.\n\nDesign students compiling their work into PDFs.\n\nIn all cases, isolated card images look more professional than card-on-desk photos." },
        { heading: "Workflow for designers and freelancers", body: "Photograph each business card on a high-contrast surface (dark cards on white, light cards on dark) for best AI detection.\n\nDrop into BgRemove.\n\nGet transparent PNG of just the card.\n\nIn Canva or Figma: composite onto a portfolio template — branded background, multiple card mockups, dimensions overlay.\n\nExport for portfolio site, LinkedIn case study, design Awwwards submission." },
        { heading: "Privacy for business contact data", body: "Business cards contain personal contact info: direct numbers, personal emails, sometimes home addresses for self-employed contractors. Uploading these to a cloud BG remover means sharing personal data of every person whose card you've processed.\n\nBgRemove processes locally. Your contacts' info stays in your browser. Important if you're compiling cards from a conference or batch-processing client contacts." },
      ]}
      faqs={faqs} faqTitle="Frequently asked questions"
      related={[
        { href: "/remove-background-from-document/", label: "Document background remover" },
        { href: "/transparent-png-maker/", label: "Transparent PNG maker" },
        { href: "/", label: "Back to background remover" },
      ]}
      relatedTitle="Related tools" ctaTitle="Process business cards right now"
      ctaSubtitle="Free, private, portfolio-ready." ctaButton="Start now" ctaHref="/" />
  </>);
}
