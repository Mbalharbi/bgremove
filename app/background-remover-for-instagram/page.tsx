import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { SeoLanding } from "@/components/seo-landing";
import { webAppSchema, buildFaqSchema } from "@/lib/schema-locale";
import { SITE } from "@/lib/site";
const URL = `${SITE.url}/background-remover-for-instagram/`;
const TITLE = "Free Background Remover for Instagram — Reels, Stories, Posts";
const DESC = "Clean product cutouts for Instagram Reels, Stories, posts, and Shop. Free, unlimited, no watermark. Build a recognizable visual brand without Adobe.";
const faqs = [
  { q: "Can I use this for Instagram Shop?", a: "Yes. Instagram Shop accepts transparent PNGs natively. Composite onto a branded background for consistent shop aesthetics that match your feed." },
  { q: "What about Reels and Stories?", a: "Yes. Transparent PNGs work as overlays in Reels (via CapCut) and Stories (via Instagram's native editor). Same image works across all formats — build the asset once, reuse everywhere." },
  { q: "Bulk processing for a content batch?", a: "Up to 20 images at once via /bulk. Perfect for content creators planning a week or month of posts in one session." },
  { q: "Does it work for non-product content (selfies, fashion)?", a: "Yes. RMBG-1.4 was specifically optimized for portraits and fashion. Selfies, headshots, full-body fashion shots all cut cleanly." },
  { q: "Will the result look natural on Instagram?", a: "Yes. The AI preserves fine detail (hair, fabric edges, transparent items). Results look identical to what you'd get from a paid tool — no telltale signs of AI processing." },
  { q: "Can I add branded backgrounds for a cohesive feed?", a: "Yes. The transparent PNGs let you composite onto any consistent background — pastel solids, gradient brand colours, textured surfaces. The single biggest visual brand lever for solo creators." },
  { q: "How is this better than Instagram's native background blur?", a: "Instagram's blur is just a Gaussian blur — the background is still there, just defocused. BgRemove gives you a true transparent PNG, letting you replace the background entirely, not just blur it." },
];
export const metadata: Metadata = { title: TITLE, description: DESC, alternates: { canonical: URL } };
export default function Page() {
  return (<><JsonLd data={[webAppSchema({ bcp47: "en-US", url: URL, name: "BgRemove for Instagram", description: DESC }), buildFaqSchema("en-US", faqs)]} />
    <SeoLanding eyebrow="Instagram Creators" title="Background remover for Instagram"
      description="Cohesive feeds for Reels, Stories, and Instagram Shop. Free transparent PNGs — composite onto branded backgrounds for a recognizable visual brand."
      trustPills={[{ icon: "lock", label: "Photos private" }, { icon: "zap", label: "Batch a week of content" }, { icon: "sparkles", label: "Free, no Adobe" }]}
      bullets={[
        { title: "Cross-format", body: "Same PNG works for Reels, Stories, Posts, and Shop." },
        { title: "Portrait-optimized", body: "RMBG-1.4 excels at hair, skin, fabric edges." },
        { title: "Bulk-friendly", body: "Process a week of content in one /bulk session." },
        { title: "Cohesive branding", body: "Layer onto consistent backgrounds for instant feed coherence." },
      ]}
      sections={[
        { heading: "Why Instagram creators need transparent PNGs", body: "Instagram's algorithm rewards visual consistency in addition to engagement. Accounts with a recognizable, coherent aesthetic outperform random-feed accounts on follow rate, save rate, and share rate. The single biggest lever on visual coherence is consistent backgrounds across posts.\n\nProblem: shooting all your content against the same background is impractical. You're in different locations, different lighting, different vibes. Solution: shoot anywhere, run through BgRemove, composite onto your chosen branded background. Same workflow, same aesthetic, multiple shoot locations." },
        { heading: "Content workflow for creators", body: "Shoot a batch of content in one session — could be product flatlays, selfies, fashion looks, anything.\n\nDrop the batch into /bulk on BgRemove. Up to 20 images.\n\nDownload the ZIP of transparent PNGs.\n\nIn Canva: build a master template at 1080×1080 (square) or 1080×1350 (portrait) with your brand background.\n\nDrop each PNG, adjust positioning, export.\n\nFor Reels: import the still PNG into CapCut, animate over a motion background. For Stories: drop into Instagram's native editor.\n\nResult: a full week of cohesive content from one shoot session." },
        { heading: "Beyond personal feeds: brand collaborations", body: "Brand collaboration deliverables typically require specific brand background colours or themes. Transparent PNGs make compliance easy: shoot once, deliver to the brand as a clean transparent asset, let their team composite onto whatever background they need.\n\nFor sponsorships and UGC contracts, this also lets you negotiate higher rates — you're delivering professional-grade transparent assets, not just raw photos." },
      ]}
      faqs={faqs} faqTitle="Frequently asked questions"
      related={[
        { href: "/portrait-background-remover/", label: "Portrait background remover" },
        { href: "/product-photo-background-remover/", label: "Product photo background remover" },
        { href: "/bulk/", label: "Bulk processing" },
        { href: "/background-remover-for-tiktok-shop/", label: "For TikTok Shop" },
        { href: "/", label: "Back to background remover" },
      ]}
      relatedTitle="Related tools" ctaTitle="Build a cohesive Instagram feed"
      ctaSubtitle="Free, no Adobe subscription." ctaButton="Start now" ctaHref="/" />
  </>);
}
