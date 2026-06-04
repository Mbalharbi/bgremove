import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { SeoLanding } from "@/components/seo-landing";
import { webAppSchema, buildFaqSchema } from "@/lib/schema-locale";
import { SITE } from "@/lib/site";

const URL = `${SITE.url}/background-remover-for-etsy/`;
const TITLE = "Free Background Remover for Etsy Sellers — Handmade-Friendly";
const DESC = "Clean product cutouts for your Etsy shop. Free, unlimited, no watermark. Built for handmade sellers, vintage finds, and small-batch artisans who can't afford Adobe.";

const faqs = [
  { q: "Does Etsy require white backgrounds?", a: "Etsy doesn't enforce strict background colour rules like Amazon does — but listings with consistent, clean backgrounds rank higher in Etsy search and convert better. Most successful Etsy shops use either a single solid colour (often white or neutral) or a consistent lifestyle aesthetic across listings." },
  { q: "Can I batch-process my whole shop?", a: "Yes. Use /bulk for up to 20 images at once. For a 100-listing shop with 5 images each, plan a few sessions across an evening. Free, no per-image cost." },
  { q: "Is this good for handmade jewellery and small items?", a: "Yes — the RMBG-1.4 model handles tiny detail well. Necklace chains, ring textures, earring posts, embroidery threads all cut cleanly. For very thin chains, shoot against a strongly-contrasting background for best results." },
  { q: "What about vintage photos that already have a worn background?", a: "Works well. The AI focuses on the foreground subject. Even busy or stained backgrounds get removed cleanly. This is especially useful for vintage sellers who can't re-shoot items in a studio." },
  { q: "Does it preserve fine textures (knit, embroidery, lace)?", a: "Yes. The model is trained on a wide dataset including textiles. Yarn fuzz, lace edges, and embroidery threads stay intact in most cases. For mission-critical photos, check the result and re-shoot with stronger contrast if needed." },
  { q: "How do I make my listings look consistent?", a: "Pick one background style — pure white, soft beige, warm wood texture, your shop's brand colour — and use it for every product. Transparent PNG output lets you swap backgrounds without re-shooting. Run all photos through BgRemove, then layer your chosen background in Canva." },
  { q: "Will this help my Etsy SEO?", a: "Indirectly: clean product photos increase your click-through rate from Etsy search results, which improves your listing's rank over time. Etsy's algorithm rewards listings that get clicks and conversions, and good photography is the single biggest leverage on both." },
];

export const metadata: Metadata = { title: TITLE, description: DESC, alternates: { canonical: URL } };

export default function Page() {
  return (
    <>
      <JsonLd data={[webAppSchema({ bcp47: "en-US", url: URL, name: "BgRemove for Etsy", description: DESC }), buildFaqSchema("en-US", faqs)]} />
      <SeoLanding
        eyebrow="Etsy Sellers"
        title="Background remover for Etsy"
        description="Clean product cutouts for handmade, vintage, and small-batch sellers. Free, unlimited, works on jewellery, textiles, vintage finds, art prints — anything you can photograph."
        trustPills={[
          { icon: "lock", label: "Your designs stay private" },
          { icon: "zap", label: "Bulk: 20 listings at a time" },
          { icon: "sparkles", label: "Free, no Adobe subscription" },
        ]}
        bullets={[
          { title: "Handmade-friendly", body: "Trained on textiles, jewellery, art — fine textures stay intact." },
          { title: "Vintage-friendly", body: "Removes worn or stained backgrounds without restoring the foreground." },
          { title: "Shop-coherent", body: "Same background style across every listing = higher CTR + better Etsy rank." },
          { title: "Bulk-ready", body: "100 listings × 5 photos = manageable in a few sessions." },
        ]}
        sections={[
          { heading: "Why Etsy sellers need consistent backgrounds", body: "Etsy doesn't mandate white backgrounds the way Amazon does. But Etsy's search algorithm rewards listings that convert, and conversion is dominated by click-through rate from the search grid. Clean, consistent product photos pull more clicks. More clicks = better placement in search = more visibility = more sales.\n\nThis tool lets you swap backgrounds without re-shooting. Shoot once in any conditions, run through BgRemove, drop your chosen background underneath in Canva. Repeat across your entire shop for instant visual coherence." },
          { heading: "For jewellery, textiles, and small items", body: "RMBG-1.4 was trained on a diverse dataset including fine textures. In testing, it handles:\n\n• Thin chain necklaces (best on contrasting backgrounds)\n• Embroidery and lace edges\n• Yarn and knit textures\n• Polished metals and faceted gems\n• Translucent fabrics (silk, organza)\n\nFor mission-critical product photos (your top sellers), always preview the cutout and re-shoot with stronger contrast if needed. The tool is excellent but not infallible on every edge case." },
          { heading: "Workflow for Etsy shop owners", body: "Shoot products in natural light against any background — kitchen counter, fabric sheet, vintage table.\n\nDrop the photos into /bulk on BgRemove. Up to 20 at once.\n\nDownload the ZIP of transparent PNGs.\n\nOpen Canva (free plan is fine). Create a template at Etsy's recommended 2000×2000px.\n\nDrop your chosen background — pure white, brand colour, or a textured surface from Canva's stock.\n\nDrop each transparent PNG on top. Adjust scale and position. Export.\n\nUpload to Etsy. Apply the same template to every listing for shop coherence." },
          { heading: "Vintage and second-hand sellers: a special case", body: "Vintage sellers often can't re-shoot items — the item is one-of-a-kind, the lighting was what it was, the original photo is what you have. BgRemove is especially valuable here: even worn, stained, or busy backgrounds remove cleanly, leaving the vintage piece intact.\n\nThis lets vintage sellers achieve the same shop coherence as artisan sellers who shoot in studio conditions. Drop every vintage photo through, replace the background with your shop's signature look (warm cream, distressed wood, neutral grey), and the entire shop reads as professionally curated." },
        ]}
        faqs={faqs}
        faqTitle="Frequently asked questions"
        related={[
          { href: "/product-photo-background-remover/", label: "Product photo background remover" },
          { href: "/bulk/", label: "Bulk processing" },
          { href: "/background-remover-for-shopify/", label: "For Shopify stores" },
          { href: "/background-remover-for-amazon/", label: "For Amazon sellers" },
          { href: "/blog/etsy-shopify-product-photos/", label: "Guide: marketplace product photos" },
          { href: "/", label: "Back to background remover" },
        ]}
        relatedTitle="Related tools and guides"
        ctaTitle="Make your Etsy shop visually coherent"
        ctaSubtitle="Free, no Adobe subscription needed."
        ctaButton="Start removing backgrounds"
        ctaHref="/"
      />
    </>
  );
}
