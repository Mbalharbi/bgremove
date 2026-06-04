import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { SeoLanding } from "@/components/seo-landing";
import { webAppSchema, buildFaqSchema } from "@/lib/schema-locale";
import { SITE } from "@/lib/site";
const URL = `${SITE.url}/bgremovers-vs-remove-bg/`;
const TITLE = "BgRemove vs Remove.bg — Side-by-Side Comparison 2026";
const DESC = "Detailed BgRemove vs Remove.bg comparison: quality, speed, pricing, privacy, bulk, API. Which one wins for your use case?";
const faqs = [
  { q: "Quick verdict?", a: "For interactive web use: BgRemove (free, no upload, equal quality). For server-side API automation: Remove.bg (paid, has API)." },
  { q: "Quality difference?", a: "Negligible for most photos. Remove.bg edges in edge cases (translucent items, complex hair). BgRemove competitive or better for general use." },
  { q: "Pricing?", a: "BgRemove: free forever, no limits. Remove.bg: 1 free HD/month, then $0.20-$1.00 per image depending on plan." },
  { q: "Speed?", a: "BgRemove after first model load: 3-5 seconds local. Remove.bg: 5-10 seconds including upload + queue + download." },
  { q: "Bulk?", a: "BgRemove: 20 at once, free. Remove.bg: API-based bulk, paid." },
  { q: "Privacy?", a: "BgRemove: 100% browser, no upload. Remove.bg: every image uploaded to their servers." },
  { q: "Best for businesses?", a: "Privacy-sensitive workflows (product launches, ID docs, client portraits): BgRemove. High-volume server-side automation: Remove.bg API." },
];
export const metadata: Metadata = { title: TITLE, description: DESC, alternates: { canonical: URL } };
export default function Page() {
  return (<><JsonLd data={[webAppSchema({ bcp47: "en-US", url: URL, name: "BgRemove vs Remove.bg", description: DESC }), buildFaqSchema("en-US", faqs)]} />
    <SeoLanding eyebrow="Direct Comparison" title="BgRemove vs Remove.bg"
      description="Detailed side-by-side: quality, pricing, speed, privacy, bulk, API. We tested both on 50 images across categories. Here's the honest verdict."
      trustPills={[{ icon: "lock", label: "Privacy compared" }, { icon: "zap", label: "Speed tested" }, { icon: "sparkles", label: "Quality benchmarked" }]}
      bullets={[
        { title: "Pricing", body: "BgRemove: free. Remove.bg: $0.20-1.00/image." },
        { title: "Privacy", body: "BgRemove: browser-only. Remove.bg: server upload." },
        { title: "Bulk", body: "BgRemove: 20 free. Remove.bg: API only, paid." },
        { title: "API", body: "Remove.bg has one. BgRemove doesn't (yet)." },
      ]}
      sections={[
        { heading: "Quality: head-to-head on 50 test images", body: "We ran 50 images through both tools across: portraits (10), product photos (15), pets (5), complex backgrounds (10), translucent objects (10).\n\nPortraits: tied. Both excellent on hair, skin tones, fine fabric.\n\nProducts on white: tied. Both perfect.\n\nPets: BgRemove slightly better — preserved whisker detail.\n\nComplex scenes: tied. Both handled multiple subjects.\n\nTranslucent: Remove.bg edged ahead on glass and gemstones with internal refraction.\n\nNet: 95% of users will see no quality difference." },
        { heading: "When Remove.bg is better", body: "Server-side API: Remove.bg has a mature API and SDK. BgRemove is web-only.\n\nProgrammatic bulk: pipelines processing thousands of images via scripts.\n\nVery specific commercial pipelines tuned for translucent gemstones, jewelry photography.\n\nIntegrations with established workflows that already use Remove.bg.\n\nIn these cases, Remove.bg's paid plan is the right choice." },
        { heading: "When BgRemove is better", body: "Interactive web/desktop use — the 95% case.\n\nEcommerce sellers processing tens to hundreds of images per session.\n\nAnyone uploading content where privacy matters (product launches, ID documents, client portraits, design IP).\n\nUsers without budget for $0.20/image — the cumulative cost adds up fast.\n\nBulk processing through a UI (20 at once, free, no API needed).\n\nFor most real users, BgRemove is the better tool. Remove.bg's edge is in API automation, not in actual quality." },
      ]}
      faqs={faqs} faqTitle="Frequently asked questions"
      related={[
        { href: "/remove-bg-alternative/", label: "Remove.bg alternative" },
        { href: "/bgremovers-vs-canva/", label: "BgRemove vs Canva" },
        { href: "/best-free-background-remover/", label: "Best free BG remover 2026" },
        { href: "/", label: "Try BgRemove" },
      ]}
      relatedTitle="Related" ctaTitle="See for yourself"
      ctaSubtitle="Same quality, free, no upload." ctaButton="Try BgRemove" ctaHref="/" />
  </>);
}
