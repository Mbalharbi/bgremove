import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { SeoLanding } from "@/components/seo-landing";
import { webAppSchema, buildFaqSchema } from "@/lib/schema-locale";
import { SITE } from "@/lib/site";
const URL = `${SITE.url}/free-background-remover-no-signup/`;
const TITLE = "Free Background Remover — No Signup, No Watermark, No Upload";
const DESC = "Truly free background remover. No account, no watermark, no upload to servers. Just open the site, drop image, get result. Built on RMBG-1.4.";
const faqs = [
  { q: "Why no signup?", a: "The AI model runs in your browser. There's no server-side processing to gate behind an account. We don't need your email; we don't want your email." },
  { q: "Is there a hidden catch?", a: "No. The site is static, hosted on Cloudflare's free tier. The AI model (RMBG-1.4) is open-source. Our marginal cost per image is zero. Hence: actually free, forever." },
  { q: "No watermarks?", a: "Correct. We're not gating quality behind a paid tier. Output is the same whether you use it once or 10,000 times." },
  { q: "How do you make money?", a: "We don't, currently. Future: optional affiliate links for related design tools, optional ad placements. The BG removal tool itself stays free with no caps." },
  { q: "Is the quality limited compared to paid tools?", a: "No. Full-resolution output (up to 4096px), modern AI model, no watermarks. Same quality as paid Remove.bg." },
  { q: "Can I rely on this for business use?", a: "Yes. The site is statically hosted on Cloudflare — extremely reliable, low downtime. The model is cached locally after first download — works offline. Used by ecommerce sellers daily." },
];
export const metadata: Metadata = { title: TITLE, description: DESC, alternates: { canonical: URL } };
export default function Page() {
  return (<><JsonLd data={[webAppSchema({ bcp47: "en-US", url: URL, name: "Free BG Remover No Signup", description: DESC }), buildFaqSchema("en-US", faqs)]} />
    <SeoLanding eyebrow="No Signup Required" title="Free background remover — no signup"
      description="Just open the site and use it. No email, no account, no watermark, no upload. The simplest workflow possible for free AI background removal."
      trustPills={[{ icon: "lock", label: "No email needed" }, { icon: "zap", label: "Open and use" }, { icon: "sparkles", label: "Free forever" }]}
      bullets={[
        { title: "Zero friction", body: "No signup wall, no email verification, no daily quota." },
        { title: "Zero watermark", body: "Output is clean — same as paid tools." },
        { title: "Zero upload", body: "Images processed in your browser, never sent to a server." },
        { title: "Zero hidden cost", body: "No 'free trial' that converts to paid. Free forever." },
      ]}
      sections={[
        { heading: "Why no-signup matters", body: "Every signup wall is friction. Email verification, password creation, terms-of-service agreement, GDPR consent. By the time you're processing your image, you've spent 5 minutes setting up an account.\n\nBgRemove eliminates all of that. Open the site, drop image, get result. The fastest possible workflow.\n\nThis also means there's no account to remember, no password to manage, no email tied to your usage. If you forget about us and come back 2 years later, the workflow is identical — no 'forgot password' flow needed." },
        { heading: "How is this sustainable for us?", body: "The AI model runs in YOUR browser using YOUR CPU/GPU. We have zero marginal cost per image processed.\n\nThe site is static (HTML, CSS, JavaScript files) hosted on Cloudflare's free tier. Our fixed cost is essentially zero.\n\nWe don't pay licensing fees — the model (RMBG-1.4) is open-source.\n\nResult: we can keep the tool free forever without bait-and-switch. Future monetization will be optional affiliate links and ads, never gating the core tool." },
        { heading: "Reliability for business users", body: "Static hosting on Cloudflare is among the most reliable hosting on the internet. The model is cached in your browser after first use — even works offline after the first load.\n\nEcommerce sellers, designers, and small businesses use this daily. We don't have a billing system, but we do have uptime — and that's what actually matters when you're processing a product launch the day before going live." },
      ]}
      faqs={faqs} faqTitle="Frequently asked questions"
      related={[
        { href: "/best-free-background-remover/", label: "Best free BG remover 2026" },
        { href: "/privacy-proof/", label: "Privacy proof" },
        { href: "/remove-bg-alternative/", label: "Remove.bg alternative" },
        { href: "/", label: "Open the tool" },
      ]}
      relatedTitle="Related" ctaTitle="No signup needed"
      ctaSubtitle="Just drop image, get result." ctaButton="Open BgRemove" ctaHref="/" />
  </>);
}
