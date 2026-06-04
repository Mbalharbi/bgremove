import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { SeoLanding } from "@/components/seo-landing";
import { webAppSchema, buildFaqSchema } from "@/lib/schema-locale";
import { SITE } from "@/lib/site";
const URL = `${SITE.url}/background-remover-for-ebay/`;
const TITLE = "Free Background Remover for eBay Sellers — Higher CTR Listings";
const DESC = "Clean product photos for your eBay listings. Free, unlimited, no watermark. Build trust with consistent backgrounds across your inventory.";
const faqs = [
  { q: "Does eBay require white backgrounds?", a: "eBay doesn't enforce strict background rules, but listings with clean white or neutral backgrounds consistently outperform messy ones in click-through rate. eBay's Best Match algorithm rewards CTR." },
  { q: "Can I process old listings?", a: "Yes. Drop old listing photos into BgRemove, get a clean version, re-upload. Many sellers see immediate CTR improvements within days." },
  { q: "Bulk processing for high-volume sellers?", a: "Up to 20 photos at a time via /bulk. For a 500-item store, plan 25 batches across a few sessions. No per-image cost." },
  { q: "Does it work for vintage and used items?", a: "Yes. The AI focuses on the foreground subject — even worn or dirty backgrounds get removed cleanly. Great for vintage, refurbished, or second-hand sellers." },
  { q: "Will buyers see the difference?", a: "Yes. Studies of marketplace CTR consistently show that clean product photos beat messy ones by 30-100% in click-through. Buyers scan, and clean backgrounds signal professional sellers." },
  { q: "Is this against eBay's policies?", a: "No. eBay encourages high-quality photos. You're cleaning your own product photos, not misrepresenting the item. Just don't edit the product itself or remove flaws." },
  { q: "Can I add eBay store branding?", a: "Yes. Use the transparent PNG output and layer your store's brand colour or logo subtly in Canva. Consistent branding across listings builds trust." },
];
export const metadata: Metadata = { title: TITLE, description: DESC, alternates: { canonical: URL } };
export default function Page() {
  return (<><JsonLd data={[webAppSchema({ bcp47: "en-US", url: URL, name: "BgRemove for eBay", description: DESC }), buildFaqSchema("en-US", faqs)]} />
    <SeoLanding eyebrow="eBay Sellers" title="Background remover for eBay"
      description="Higher click-through, more sales. Free background remover built for eBay sellers — vintage, refurbished, new, dropshipping. Works for any item category."
      trustPills={[{ icon: "lock", label: "Inventory photos private" }, { icon: "zap", label: "Bulk: 20 listings" }, { icon: "sparkles", label: "Free" }]}
      bullets={[
        { title: "Higher CTR", body: "Clean photos beat messy ones by 30-100% in marketplace click-through." },
        { title: "Vintage-friendly", body: "Worn backgrounds remove cleanly. Item stays exactly as photographed." },
        { title: "Bulk-ready", body: "20 items at once via ZIP download." },
        { title: "Best Match boost", body: "eBay's algorithm rewards CTR. Better photos = better placement." },
      ]}
      sections={[
        { heading: "Why eBay sellers benefit from clean backgrounds", body: "eBay's Best Match algorithm — the default sort — weighs click-through rate heavily. Listings that get clicked rank higher. Clean product photography is the single biggest CTR lever for any marketplace listing.\n\nIn eBay's specific context, this matters more than Amazon's: eBay buyers see dozens of similar listings in search and scan for visual quality cues. A clean white-background photo signals 'professional seller' and gets the click. A photo on a busy kitchen counter signals 'casual lister' and gets skipped." },
        { heading: "Workflow for high-volume eBay sellers", body: "Photograph items in whatever conditions you have — even bad lighting works as long as the subject is identifiable.\n\nDrop a batch into /bulk on BgRemove.\n\nGet transparent PNGs back in a ZIP.\n\nIn Canva or Photoshop, drop a white or neutral background layer underneath each.\n\nExport at eBay's recommended 1600×1600px.\n\nUpload as primary listing photo. Keep the original 'as found' photo as a secondary image to show buyers exactly what they're getting (especially for used items)." },
        { heading: "Vintage and used-item sellers", body: "For vintage sellers, two photos per listing work best: a cleaned-up cover photo (background removed) for the search grid CTR, plus a raw as-found photo showing the item in context. This combines professional presentation with honest condition disclosure.\n\nBgRemove handles vintage items well because the AI focuses on the foreground subject. A 60-year-old typewriter on a dusty workbench cuts as cleanly as a new product in studio conditions." },
      ]}
      faqs={faqs} faqTitle="Frequently asked questions"
      related={[
        { href: "/product-photo-background-remover/", label: "Product photo background remover" },
        { href: "/bulk/", label: "Bulk processing" },
        { href: "/background-remover-for-amazon/", label: "For Amazon sellers" },
        { href: "/background-remover-for-etsy/", label: "For Etsy sellers" },
        { href: "/", label: "Back to background remover" },
      ]}
      relatedTitle="Related tools" ctaTitle="Boost your eBay listings"
      ctaSubtitle="Free, bulk, no watermark." ctaButton="Start now" ctaHref="/" />
  </>);
}
