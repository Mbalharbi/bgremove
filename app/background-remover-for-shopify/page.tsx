import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { SeoLanding } from "@/components/seo-landing";
import { webAppSchema, buildFaqSchema } from "@/lib/schema-locale";
import { SITE } from "@/lib/site";

const URL = `${SITE.url}/background-remover-for-shopify/`;
const TITLE = "Free Background Remover for Shopify Stores — Bulk, No Watermark";
const DESC = "Make catalogue-ready product images for your Shopify store. Free, unlimited, bulk-ready transparent PNGs. Works with every theme, branded backgrounds, dropshipping workflows.";

const faqs = [
  { q: "Do transparent PNGs work well on Shopify?", a: "Yes. Shopify natively supports PNG transparency. Transparent product images blend with whatever background colour your theme uses — light, dark, branded, gradient. The same image file works across themes if you re-theme later." },
  { q: "What's the recommended Shopify product image size?", a: "Shopify suggests 2048×2048px for product images so they look sharp on Retina screens and zoom views. This tool outputs up to 4096×4096px, giving you headroom for future-proof catalogues without re-shooting." },
  { q: "How is this useful for dropshippers?", a: "Dropshippers usually inherit supplier photos that look identical to every other store. Run them through BgRemove, drop them on your brand-colour background, and your storefront looks intentionally designed instead of generic." },
  { q: "Can I process my whole catalogue at once?", a: "Yes. /bulk handles 20 images per batch, downloaded as a ZIP. For a 100-SKU catalogue, plan five batches over about 15 minutes total. No watermarks, no per-image cost." },
  { q: "Is this compatible with Oberlo / DSers / Spocket?", a: "Yes — those apps just give you a product image URL or upload. Run the image through BgRemove first, then upload the clean PNG to your Shopify product instead of the supplier's raw photo." },
  { q: "Does this affect my product page load speed?", a: "Transparent PNGs are larger than equivalent JPGs. For maximum speed, convert the final PNG to WebP using our /tools/webp-converter — Shopify serves WebP automatically to supported browsers. Best of both worlds: transparency in source, smallest file size on delivery." },
  { q: "What about Shopify Magic / AI background tools?", a: "Shopify Magic is gated behind specific plans and credit limits. BgRemove is free, unlimited, and runs locally — you control quality, never hit a credit wall, and your products stay private." },
];

export const metadata: Metadata = { title: TITLE, description: DESC, alternates: { canonical: URL } };

export default function Page() {
  return (
    <>
      <JsonLd data={[
        webAppSchema({ bcp47: "en-US", url: URL, name: "BgRemove for Shopify", description: DESC }),
        buildFaqSchema("en-US", faqs),
      ]} />
      <SeoLanding
        eyebrow="Shopify Stores"
        title="Background remover for Shopify"
        description="Catalogue-ready product cutouts for your Shopify store. Transparent PNGs that work with any theme, branded backgrounds, or dropshipping workflows. Free, unlimited, no Shopify Magic credit limits."
        trustPills={[
          { icon: "lock", label: "Pre-launch SKUs stay private" },
          { icon: "zap", label: "Bulk: 20 products at a time" },
          { icon: "sparkles", label: "Unlimited, no credit cap" },
        ]}
        bullets={[
          { title: "Theme-agnostic", body: "Transparent PNGs blend with light, dark, or branded themes — no re-shooting if you re-theme." },
          { title: "Up to 4096px", body: "Retina-ready output exceeds Shopify's 2048px recommendation." },
          { title: "Branded backgrounds", body: "Transparent base + your brand colour in Canva = premium storefront feel." },
          { title: "Dropshipper-friendly", body: "Re-process supplier photos so your store doesn't look like every other store." },
        ]}
        sections={[
          { heading: "How transparent PNGs fit Shopify themes", body: "Most Shopify themes ship with a light or white product card background. Transparent PNGs blend seamlessly. If you switch to a dark mode or branded colour theme later, the same product images keep working — no re-shoot, no re-export, no re-upload.\n\nThis future-proofs your catalogue. Re-themes are the most common reason stores stall: nobody wants to re-edit 200 product photos. Transparent PNG removes that blocker." },
          { heading: "Dropshipping workflow", body: "AliExpress, Spocket, DSers, or any supplier-image source.\n\nDownload the supplier's raw product photo.\n\nDrop it into BgRemove → 3 seconds, transparent PNG out.\n\nOpen in Canva. Drop your brand colour or gradient behind it.\n\nUpload to your Shopify product. Your store now looks consistently branded instead of generic dropshipper-looking.\n\nThis is the single highest-impact change you can make to a dropshipping store's perceived quality. It takes one minute per product. There's no excuse not to." },
          { heading: "Storefront tips for a coherent catalogue", body: "Consistent background across every product — pick once (white, brand colour, light gradient), use forever.\n\nLifestyle images go as image #2 onward. Image #1 should be clean: it's the one customers see in collection grids and search results.\n\nSame angle, lighting, and aspect ratio across products. A coherent catalogue converts better than a polished individual product." },
          { heading: "Optimise for page speed: PNG → WebP", body: "Transparent PNGs are 2-5x larger than the equivalent JPG. For a store with 100 products, that adds up. After removing the background, run the final PNG through our /tools/webp-converter — Shopify automatically serves WebP to browsers that support it (Chrome, Firefox, Edge, Safari 14+), which is over 95% of traffic.\n\nResult: transparency in the source file, smallest possible file on delivery." },
        ]}
        faqs={faqs}
        faqTitle="Frequently asked questions"
        related={[
          { href: "/product-photo-background-remover/", label: "Product photo background remover" },
          { href: "/bulk/", label: "Bulk processing" },
          { href: "/tools/webp-converter/", label: "PNG → WebP converter (smaller files)" },
          { href: "/background-remover-for-amazon/", label: "For Amazon sellers" },
          { href: "/blog/etsy-shopify-product-photos/", label: "Guide: marketplace product photos" },
          { href: "/", label: "Back to background remover" },
        ]}
        relatedTitle="Related tools and guides"
        ctaTitle="Upgrade your Shopify catalogue"
        ctaSubtitle="Free, unlimited, no credit caps."
        ctaButton="Start removing backgrounds"
        ctaHref="/"
      />
    </>
  );
}
