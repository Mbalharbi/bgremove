import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { SeoLanding } from "@/components/seo-landing";
import { webAppSchema, buildFaqSchema } from "@/lib/schema-locale";
import { SITE } from "@/lib/site";
const URL = `${SITE.url}/background-remover-for-tiktok-shop/`;
const TITLE = "Free Background Remover for TikTok Shop — Product Cards Done Right";
const DESC = "Clean transparent product images for your TikTok Shop. Free, unlimited, bulk-ready. Make product cards that stand out in algorithm-driven feeds.";
const faqs = [
  { q: "What's the TikTok Shop image requirement?", a: "TikTok Shop recommends square product images (1080×1080 minimum) with clean backgrounds. Transparent PNGs let you composite onto branded backgrounds that match your shop aesthetic — important for algorithm-driven discovery." },
  { q: "Can I use this for TikTok ad creatives too?", a: "Yes. Same transparent PNGs work for Spark Ads, TopView, and In-Feed Ad creatives. Use Canva or CapCut to layer them onto motion backgrounds." },
  { q: "Bulk processing for high-volume creators?", a: "Up to 20 products at once via /bulk. Perfect for affiliates with large catalogues or shops launching seasonal collections." },
  { q: "Does it work for fashion, beauty, and gadgets?", a: "Yes. RMBG-1.4 handles fashion items, cosmetics, electronics, and small consumer goods well — the top TikTok Shop categories." },
  { q: "Will my product photos be private?", a: "Yes. Everything runs in your browser. For creators launching original products or sourcing privately, this is critical — no leak risk." },
  { q: "How is this better than CapCut's built-in remover?", a: "CapCut's BG remover is limited to videos and basic still-image use. BgRemove gives you full transparent PNGs at up to 4096px, usable across TikTok Shop, ads, Spark, and external storefronts. No subscription, no daily limit." },
  { q: "Can I batch-export for affiliate links?", a: "Yes. Affiliates often need clean PNGs across multiple shop tags. One bulk run gives you the entire catalogue, reusable across every affiliate link variation." },
];
export const metadata: Metadata = { title: TITLE, description: DESC, alternates: { canonical: URL } };
export default function Page() {
  return (<><JsonLd data={[webAppSchema({ bcp47: "en-US", url: URL, name: "BgRemove for TikTok Shop", description: DESC }), buildFaqSchema("en-US", faqs)]} />
    <SeoLanding eyebrow="TikTok Shop Sellers" title="Background remover for TikTok Shop"
      description="Algorithm-friendly product cards for TikTok Shop. Free transparent PNGs that work across product pages, Spark Ads, and affiliate creator links. Built for fashion, beauty, gadgets, and viral product categories."
      trustPills={[{ icon: "lock", label: "Pre-launch private" }, { icon: "zap", label: "Bulk 20 products" }, { icon: "sparkles", label: "Free, no subscription" }]}
      bullets={[
        { title: "TikTok Shop ready", body: "1080×1080 minimum — we output up to 4096px." },
        { title: "Ad-friendly", body: "Same PNG works for Spark Ads, TopView, In-Feed creatives." },
        { title: "Affiliate-ready", body: "One bulk run, reusable across every affiliate tag." },
        { title: "Viral-category trained", body: "Fashion, beauty, gadgets — top TikTok Shop verticals all work." },
      ]}
      sections={[
        { heading: "Why TikTok Shop needs clean product cutouts", body: "TikTok Shop's discovery model is algorithm-driven: products surface in feeds based on engagement. Visual quality of the product card is the first lever. A photo on a messy background gets scrolled past; a clean transparent product composited onto a vibrant branded card gets the tap.\n\nThis matters more on TikTok than on traditional marketplaces because TikTok users are in passive discovery mode. They're not searching for your product — the algorithm is showing it to them. Visual stop-power is everything." },
        { heading: "Workflow for TikTok Shop sellers and affiliates", body: "Photograph products with any phone — TikTok creators usually have good cameras already.\n\nDrop the batch into /bulk on BgRemove.\n\nDownload the ZIP of transparent PNGs.\n\nOpen Canva or CapCut. Build a branded square template (1080×1080) with your shop's colour palette as the background.\n\nDrop each PNG onto the template. Adjust position, add small overlay text if needed (price, '50% off', etc).\n\nExport. Upload to TikTok Shop as the product image. Use the same template for ads and affiliate creatives." },
        { heading: "Beyond TikTok: cross-posting to Instagram and YouTube Shorts", body: "The transparent PNGs from BgRemove work everywhere. Same product image goes to Instagram Reels, YouTube Shorts, Pinterest. Build the master template once in Canva; recolour the background per platform; ship the campaign across all of them in a day. This is the highest-leverage workflow for solo TikTok Shop sellers competing with brand teams." },
      ]}
      faqs={faqs} faqTitle="Frequently asked questions"
      related={[
        { href: "/product-photo-background-remover/", label: "Product photo background remover" },
        { href: "/bulk/", label: "Bulk processing" },
        { href: "/background-remover-for-instagram/", label: "For Instagram sellers" },
        { href: "/background-remover-for-shopify/", label: "For Shopify stores" },
        { href: "/", label: "Back to background remover" },
      ]}
      relatedTitle="Related tools" ctaTitle="Build TikTok Shop product cards that stop scrolls"
      ctaSubtitle="Free, bulk, algorithm-friendly." ctaButton="Start now" ctaHref="/" />
  </>);
}
