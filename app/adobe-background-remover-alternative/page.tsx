import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { SeoLanding } from "@/components/seo-landing";
import { webAppSchema, buildFaqSchema } from "@/lib/schema-locale";
import { SITE } from "@/lib/site";
const URL = `${SITE.url}/adobe-background-remover-alternative/`;
const TITLE = "Adobe Background Remover Alternative — Free, No CC Subscription";
const DESC = "Adobe Express and Photoshop BG remover require subscriptions ($120-660/year). BgRemove is free, in your browser, no Adobe account.";
const faqs = [
  { q: "Why an Adobe alternative?", a: "Adobe Express's BG remover requires Adobe Express Premium ($120/year). Photoshop's Remove Background is gated behind Creative Cloud ($660/year). BgRemove is free forever." },
  { q: "Quality comparison?", a: "Photoshop's tool is excellent for advanced manual editing. For automatic background removal, BgRemove's RMBG-1.4 is competitive with Adobe's automatic results." },
  { q: "Can I still use Adobe products?", a: "Yes. Use Photoshop or Express for fine editing; use BgRemove for the actual background removal step. Drop the transparent PNG into Photoshop/Express for further work." },
  { q: "What about Adobe's Firefly?", a: "Firefly is for generative AI fill, not BG removal. Different tool, different purpose." },
  { q: "Bulk processing?", a: "BgRemove: 20 images at once. Adobe Express: one at a time even on Premium." },
  { q: "Privacy?", a: "Adobe's BG remover uploads to their servers (and potentially uses your images for AI training, per their TOS). BgRemove runs locally." },
];
export const metadata: Metadata = { title: TITLE, description: DESC, alternates: { canonical: URL } };
export default function Page() {
  return (<><JsonLd data={[webAppSchema({ bcp47: "en-US", url: URL, name: "Adobe BG Remover Alternative", description: DESC }), buildFaqSchema("en-US", faqs)]} />
    <SeoLanding eyebrow="Adobe Alternative" title="Adobe background remover alternative"
      description="Photoshop's BG remover ($660/yr Creative Cloud) and Adobe Express ($120/yr Premium) require subscriptions. BgRemove is free, in browser, no Adobe account."
      trustPills={[{ icon: "lock", label: "No Adobe account" }, { icon: "zap", label: "Bulk 20" }, { icon: "sparkles", label: "Free" }]}
      bullets={[
        { title: "Save $660/yr", body: "Creative Cloud isn't needed for BG removal." },
        { title: "Photoshop-compatible", body: "Transparent PNG imports cleanly into Photoshop layers." },
        { title: "Express-compatible", body: "Same workflow with Adobe Express free tier." },
        { title: "Bulk batch", body: "20 at once vs Adobe's one-at-a-time." },
      ]}
      sections={[
        { heading: "Why the Adobe tax matters", body: "Adobe Creative Cloud is $660/year. Adobe Express Premium is $120/year. Both include background removal, but you pay for everything else: Premiere, Illustrator, Lightroom, Acrobat, fonts, stock.\n\nFor users who just need background removal — solo designers, small business owners, ecommerce sellers — the bundle pricing is overkill. BgRemove gives you the BG removal step for free; combine with free tools like Figma, Photopea, GIMP, or Canva for the rest." },
        { heading: "Workflow with Photoshop", body: "Process images in BgRemove first. Get transparent PNGs.\n\nOpen Photoshop. Drag PNGs in as layers.\n\nUse Photoshop's powerful refinement tools (Refine Edge, Select and Mask) for any cleanup.\n\nComposite with Photoshop's layer system, blend modes, adjustments.\n\nResult: BgRemove handles automatic cutout; Photoshop handles the artistry. You only need Photoshop for what it's uniquely good at — not for automatic BG removal." },
        { heading: "Workflow with Adobe Express", body: "Use BgRemove for the BG removal step (free).\n\nUpload transparent PNG to Adobe Express free tier.\n\nUse Express's templates, fonts, and design tools for composition.\n\nExport for social media or print.\n\nResult: Express free + BgRemove = workflow that's normally $120/year, completely free." },
      ]}
      faqs={faqs} faqTitle="Frequently asked questions"
      related={[
        { href: "/bgremovers-vs-adobe-express/", label: "Detailed: BgRemove vs Adobe Express" },
        { href: "/canva-background-remover-alternative/", label: "Canva alternative" },
        { href: "/", label: "Open the tool" },
      ]}
      relatedTitle="Related" ctaTitle="Skip the Adobe subscription"
      ctaSubtitle="Free BG removal, Adobe-compatible." ctaButton="Try free now" ctaHref="/" />
  </>);
}
