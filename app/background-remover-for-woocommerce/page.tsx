import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { SeoLanding } from "@/components/seo-landing";
import { webAppSchema, buildFaqSchema } from "@/lib/schema-locale";
import { SITE } from "@/lib/site";
const URL = `${SITE.url}/background-remover-for-woocommerce/`;
const TITLE = "Free Background Remover for WooCommerce — WordPress Stores";
const DESC = "Clean product images for your WooCommerce store. Free, unlimited, no watermark. Bulk-ready transparent PNGs for WordPress-based shops.";
const faqs = [
  { q: "Does WooCommerce work with PNG transparency?", a: "Yes. WooCommerce handles PNG with alpha channel natively. Transparent product images blend with any WordPress theme's background colour." },
  { q: "What's the recommended WooCommerce image size?", a: "WooCommerce best practice: at least 1200×1200 for product galleries with zoom. This tool outputs up to 4096px — future-proof for high-DPI displays." },
  { q: "Can I bulk-import after processing?", a: "Yes. Process up to 20 images at once, download the ZIP, then use WooCommerce's bulk image upload or a plugin like WP All Import to attach them to products." },
  { q: "Does it integrate with my WordPress theme?", a: "Indirectly — transparent PNGs work with any WordPress theme. Astra, Divi, Storefront, custom — all render PNG transparency correctly." },
  { q: "Is this faster than a WordPress plugin?", a: "Yes. WordPress BG-removal plugins typically call paid APIs (Remove.bg or similar), adding cost and latency. BgRemove processes locally in your browser — free and faster." },
  { q: "Will my product images stay confidential?", a: "Yes. Nothing uploads. Pre-launch products, exclusive items, and confidential designs stay in your browser." },
  { q: "Can I optimise for WooCommerce page speed?", a: "After removing the background, convert the PNG to WebP using /tools/webp-converter. Modern themes serve WebP automatically. Result: transparency in source, smallest file size on delivery." },
];
export const metadata: Metadata = { title: TITLE, description: DESC, alternates: { canonical: URL } };
export default function Page() {
  return (<><JsonLd data={[webAppSchema({ bcp47: "en-US", url: URL, name: "BgRemove for WooCommerce", description: DESC }), buildFaqSchema("en-US", faqs)]} />
    <SeoLanding eyebrow="WooCommerce Stores" title="Background remover for WooCommerce"
      description="Clean product images for your WordPress + WooCommerce store. Free, unlimited, theme-agnostic transparent PNGs. No plugin to install, no API key, no per-image cost."
      trustPills={[{ icon: "lock", label: "Pre-launch private" }, { icon: "zap", label: "Bulk 20 products" }, { icon: "sparkles", label: "Free, no plugin" }]}
      bullets={[
        { title: "Theme-agnostic", body: "Astra, Divi, Storefront, custom — transparent PNG works with all." },
        { title: "Future-proof", body: "Up to 4096px output — Retina-ready, exceeds WC recommendations." },
        { title: "No plugin needed", body: "Process in browser, drag into WordPress media library. Done." },
        { title: "WebP-optimisable", body: "Combine with /tools/webp-converter for smallest delivery file." },
      ]}
      sections={[
        { heading: "Why WooCommerce stores need clean product images", body: "Unlike Shopify, where themes typically enforce a consistent product card style, WooCommerce stores often inherit varied product photography quality from different sources — manufacturers, dropship suppliers, in-house phone shoots. The result: a catalogue that visually feels inconsistent.\n\nTransparent PNGs fix this. Run every product image through BgRemove, drop a consistent background underneath in any editor, upload to WordPress. Your catalogue now looks intentionally designed regardless of where the source photos came from." },
        { heading: "Workflow for WooCommerce store owners", body: "Gather product photos from all sources — manufacturer photos, supplier images, your own shoots.\n\nDrop a batch into /bulk on BgRemove. Process up to 20 at once.\n\nDownload the ZIP of transparent PNGs.\n\nIn Canva, Photoshop, or even GIMP: build a 2048×2048 template with your store's accent colour as background.\n\nDrop each transparent PNG, export.\n\nUpload to WordPress media library. Attach to products via WooCommerce admin or bulk-import tools." },
        { heading: "WordPress page speed: PNG → WebP after editing", body: "Transparent PNGs are larger than equivalent JPGs. For WooCommerce stores where page speed affects conversion and SEO ranking, follow up with our /tools/webp-converter to compress the final PNG to WebP. Modern themes (and most caching plugins like WP Rocket or Cloudflare) serve WebP automatically to supported browsers.\n\nBenchmark: a 2MB PNG product image typically becomes a 400KB WebP at visually identical quality. Multiply across a 100-product catalogue and you're saving 160MB of bandwidth per page load." },
      ]}
      faqs={faqs} faqTitle="Frequently asked questions"
      related={[
        { href: "/product-photo-background-remover/", label: "Product photo background remover" },
        { href: "/bulk/", label: "Bulk processing" },
        { href: "/tools/webp-converter/", label: "PNG → WebP converter" },
        { href: "/background-remover-for-shopify/", label: "For Shopify stores" },
        { href: "/", label: "Back to background remover" },
      ]}
      relatedTitle="Related tools" ctaTitle="Make your WooCommerce catalogue cohesive"
      ctaSubtitle="Free, no plugin, no API key." ctaButton="Start now" ctaHref="/" />
  </>);
}
