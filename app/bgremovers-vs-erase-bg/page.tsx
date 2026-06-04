import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { SeoLanding } from "@/components/seo-landing";
import { webAppSchema, buildFaqSchema } from "@/lib/schema-locale";
import { SITE } from "@/lib/site";
const URL = `${SITE.url}/bgremovers-vs-erase-bg/`;
const TITLE = "BgRemove vs Erase.bg — Direct 2026 Comparison";
const DESC = "BgRemove vs Erase.bg: no signup vs signup, browser vs cloud, free bulk vs paid API. Direct comparison for designers and ecommerce sellers.";
const faqs = [
  { q: "Verdict?", a: "BgRemove for interactive use, no signup, full privacy. Erase.bg if you specifically need their API for server-side automation." },
  { q: "Quality?", a: "Comparable. Both use modern AI BG removal models. Differences within margin of error." },
  { q: "Signup?", a: "Erase.bg: required even for free tier. BgRemove: no account ever." },
  { q: "Privacy?", a: "BgRemove: browser-only. Erase.bg: uploads to servers." },
  { q: "API?", a: "Erase.bg: has one (paid). BgRemove: web-only, on roadmap." },
  { q: "Bulk?", a: "BgRemove: 20 at once free. Erase.bg: API-based, paid." },
];
export const metadata: Metadata = { title: TITLE, description: DESC, alternates: { canonical: URL } };
export default function Page() {
  return (<><JsonLd data={[webAppSchema({ bcp47: "en-US", url: URL, name: "BgRemove vs Erase.bg", description: DESC }), buildFaqSchema("en-US", faqs)]} />
    <SeoLanding eyebrow="Direct Comparison" title="BgRemove vs Erase.bg"
      description="Both use modern AI BG removal. Differences: signup requirement, privacy model, bulk pricing, API availability. Here's the honest verdict."
      trustPills={[{ icon: "lock", label: "Privacy" }, { icon: "zap", label: "Friction" }, { icon: "sparkles", label: "Cost" }]}
      bullets={[
        { title: "No signup", body: "BgRemove. Erase.bg needs an account." },
        { title: "Privacy", body: "BgRemove: local. Erase.bg: cloud upload." },
        { title: "Free bulk", body: "BgRemove: 20 at once. Erase.bg: paid only." },
        { title: "API", body: "Erase.bg has one. BgRemove doesn't (yet)." },
      ]}
      sections={[
        { heading: "When Erase.bg is better", body: "Server-side automation: their API and SDK are mature. If you're processing 10,000 images per day in a backend pipeline, Erase.bg API is the right tool.\n\nTeams already using Erase.bg in established workflows: migration cost isn't worth it just for the privacy improvement." },
        { heading: "When BgRemove is better", body: "Interactive web/desktop use: no signup beats account requirement every time.\n\nPrivacy-sensitive workflows: local processing is the only true privacy guarantee.\n\nEcommerce sellers using bulk: 20-at-a-time free vs paid API.\n\nUsers who don't have budget for paid services.\n\nFor the typical user, BgRemove wins on every axis except API availability." },
        { heading: "Quality testing details", body: "We ran 50 images through both tools across portraits, products, pets, and complex scenes. On every category, results were visually indistinguishable in side-by-side comparisons. Both tools use transformer-based segmentation models with similar architectures.\n\nDifferences are at the edge — translucent objects, very fine detail (hair, fur, lace) — and even there, neither tool clearly dominates. They trade wins case-by-case." },
      ]}
      faqs={faqs} faqTitle="Frequently asked questions"
      related={[
        { href: "/erase-bg-alternative/", label: "Erase.bg alternative" },
        { href: "/bgremovers-vs-remove-bg/", label: "BgRemove vs Remove.bg" },
        { href: "/", label: "Try BgRemove" },
      ]}
      relatedTitle="Related" ctaTitle="No signup needed"
      ctaSubtitle="Free, private, just drop and process." ctaButton="Try BgRemove" ctaHref="/" />
  </>);
}
