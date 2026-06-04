import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { SeoLanding } from "@/components/seo-landing";
import { webAppSchema, buildFaqSchema } from "@/lib/schema-locale";
import { SITE } from "@/lib/site";
const URL = `${SITE.url}/canva-background-remover-alternative/`;
const TITLE = "Canva Background Remover Alternative — Free, No Subscription";
const DESC = "Canva BG Remover is gated behind Canva Pro ($120/year). BgRemove is free forever, same quality, no Pro subscription needed.";
const faqs = [
  { q: "Why is this needed?", a: "Canva's background remover is a Pro feature. If you don't pay $120/year for Canva Pro, you can't use it. BgRemove is free." },
  { q: "Can I still use Canva for design?", a: "Yes. Use Canva free plan for design, BgRemove for background removal. Drop the transparent PNG from BgRemove into Canva for composition." },
  { q: "Same quality as Canva's tool?", a: "Yes or better. Both use modern AI. BgRemove uses RMBG-1.4 — typically equivalent or better on complex edges." },
  { q: "Can I batch process?", a: "Yes — 20 images at once. Canva's BG remover is one-at-a-time even on Pro." },
  { q: "Will it work for Canva templates?", a: "Yes. Process image first in BgRemove, then drag the transparent PNG into your Canva design. Same result as if Canva had cut it itself." },
  { q: "Privacy difference?", a: "Canva's BG remover uploads to their servers. BgRemove runs locally in your browser." },
];
export const metadata: Metadata = { title: TITLE, description: DESC, alternates: { canonical: URL } };
export default function Page() {
  return (<><JsonLd data={[webAppSchema({ bcp47: "en-US", url: URL, name: "Canva BG Remover Alternative", description: DESC }), buildFaqSchema("en-US", faqs)]} />
    <SeoLanding eyebrow="Canva BG Remover Alternative" title="Canva background remover alternative"
      description="Canva's BG remover is gated behind $120/year Canva Pro. Get the same result for free — process image in BgRemove, drop the transparent PNG into your Canva design."
      trustPills={[{ icon: "lock", label: "No Canva Pro" }, { icon: "zap", label: "Bulk 20" }, { icon: "sparkles", label: "Free" }]}
      bullets={[
        { title: "No Pro needed", body: "Canva Pro: $120/year. BgRemove: free forever." },
        { title: "Bulk batch", body: "Canva: one-at-a-time. BgRemove: 20 at once." },
        { title: "Same quality", body: "RMBG-1.4 competitive with Canva's commercial tool." },
        { title: "Drop into Canva", body: "Transparent PNG imports cleanly into Canva designs." },
      ]}
      sections={[
        { heading: "Why use BgRemove + Canva together", body: "Canva is excellent for design and composition. Their BG remover is a paywall. Use the free Canva for design, BgRemove for background removal — same end result, $120/year saved.\n\nThis combination is the most efficient stack for solo designers, small business owners, and creators on a budget. Canva for layouts and typography; BgRemove for cutouts." },
        { heading: "Workflow with Canva", body: "Open the image you want to use in BgRemove.\n\nDrop, process, download as transparent PNG.\n\nOpen your Canva design.\n\nUpload the PNG to Canva's Uploads tab.\n\nDrag onto your design. Resize, position, layer.\n\nUse the rest of Canva's free features for composition.\n\nExport from Canva as usual." },
        { heading: "Bulk processing — Canva Pro can't do this", body: "Canva's BG remover, even on Pro, is one image at a time. For ecommerce sellers or content creators processing dozens of images per session, this is a major bottleneck.\n\nBgRemove's /bulk handles 20 images at once. For an Etsy seller refreshing 50 product photos, that's three batches and 15 minutes instead of an hour-long Canva session." },
      ]}
      faqs={faqs} faqTitle="Frequently asked questions"
      related={[
        { href: "/bgremovers-vs-canva/", label: "Detailed: BgRemove vs Canva" },
        { href: "/adobe-background-remover-alternative/", label: "Adobe alternative" },
        { href: "/bulk/", label: "Bulk processing" },
        { href: "/", label: "Open the tool" },
      ]}
      relatedTitle="Related" ctaTitle="Save $120/year on Canva Pro"
      ctaSubtitle="Free Canva-compatible workflow." ctaButton="Try free now" ctaHref="/" />
  </>);
}
