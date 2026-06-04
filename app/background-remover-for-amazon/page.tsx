import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { SeoLanding } from "@/components/seo-landing";
import { webAppSchema, buildFaqSchema } from "@/lib/schema-locale";
import { SITE } from "@/lib/site";

const URL = `${SITE.url}/background-remover-for-amazon/`;
const TITLE = "Free Background Remover for Amazon Sellers — White Background, Bulk";
const DESC = "Make your Amazon MAIN images compliant (RGB 255,255,255 white background). Free, unlimited, bulk-ready. No upload, no signup, no per-image cost.";

const faqs = [
  { q: "What is Amazon's white background requirement?", a: "Amazon's MAIN image (the first product image in a listing) must have a pure white background (RGB 255,255,255), no watermarks, text, or borders, and the product must fill at least 85% of the frame. This tool gives you a clean transparent cutout — drop a white layer underneath in any design tool to meet the spec." },
  { q: "Can I bulk-process my whole catalog?", a: "Yes. Use /bulk to process up to 20 images at once, downloaded as a ZIP. Each image takes about 3-5 seconds. For 500 SKUs, plan ~15-20 minutes of total processing time spread across batches." },
  { q: "Is this against Amazon's TOS?", a: "No. Amazon actively encourages clean white-background MAIN images and provides guidelines for them. This tool makes meeting those guidelines easier and free. It doesn't manipulate the product itself — it only removes the background." },
  { q: "How does the quality compare to Remove.bg's paid plan?", a: "We use RMBG-1.4 (the same class of model Adobe ships in commercial products). On product photography, results are typically equal or better than Remove.bg's free tier, and the high-resolution output is free here — not gated behind a paid plan." },
  { q: "Will my unreleased products leak?", a: "No. Everything runs in your browser — images never reach our servers. Open DevTools → Network tab during processing to verify. This is critical for sellers working on Q4 launches or competitive product photography." },
  { q: "What about ADDITIONAL images (lifestyle, infographics)?", a: "Amazon allows colored or lifestyle backgrounds on images 2-7. Use a transparent PNG from this tool as your base layer in Canva or Photoshop, then composite onto any background you want." },
  { q: "Do you support FBA stickers, A+ content cutouts, and storefronts?", a: "The transparent PNG output works everywhere on Amazon: A+ Premium modules, Brand Story, Storefront banners, sponsored ad creatives. Same workflow, no extra steps." },
];

export const metadata: Metadata = { title: TITLE, description: DESC, alternates: { canonical: URL } };

export default function Page() {
  return (
    <>
      <JsonLd data={[
        webAppSchema({ bcp47: "en-US", url: URL, name: "BgRemove for Amazon Sellers", description: DESC }),
        buildFaqSchema("en-US", faqs),
      ]} />
      <SeoLanding
        eyebrow="Amazon Sellers"
        title="Background remover for Amazon"
        description="Make compliant white-background MAIN images for free. Drop a product photo, get a clean cutout in 3 seconds, layer it on #FFFFFF, upload to Seller Central. Works for FBA, A+ content, Brand Story, and sponsored ad creatives."
        trustPills={[
          { icon: "lock", label: "Pre-launch images stay on your device" },
          { icon: "zap", label: "Bulk: 20 SKUs at once" },
          { icon: "sparkles", label: "Free, no per-image cost" },
        ]}
        bullets={[
          { title: "Amazon MAIN compliant", body: "Transparent PNG → drop white layer in Canva → meets RGB 255,255,255 spec." },
          { title: "FBA-ready", body: "Built for high-volume sellers. 500 SKUs in ~20 minutes via bulk mode." },
          { title: "Bulk mode", body: "20 SKUs at once → ZIP download. Process your whole catalog in batches." },
          { title: "Leak-proof", body: "Unreleased Q4 products never touch a server. Verify with DevTools Network tab." },
        ]}
        sections={[
          { heading: "Why Amazon sellers need this", body: "Amazon's MAIN image policy is strict: pure white background (#FFFFFF), product fills ≥85% of frame, no text/watermarks/borders. Professional studio shoots cost $20-100 per product. Free tools watermark or rate-limit you. Remove.bg's free tier gives you one image per month at high res — useless for a 200-SKU catalog.\n\nWe built BgRemove because that gap is absurd. Amazon's compliance requirement is mechanical; AI does it in 3 seconds; there's no reason to pay $0.20 per image." },
          { heading: "Workflow for Amazon FBA sellers", body: "Photograph products on any background — kitchen counter, white paper, light tent, whatever you have.\n\nOpen /bulk in your browser. Drop the entire SKU batch.\n\nEach image processes in 3-5 seconds locally. Watch the progress bar; nothing uploads.\n\nDownload the ZIP of transparent PNGs.\n\nOpen each PNG in Canva (or Photoshop). Add a #FFFFFF rectangle underneath as a background layer.\n\nExport as JPG (Amazon prefers JPG for MAIN images under 10MB).\n\nUpload to Seller Central. Compliant in under 30 minutes for 100 SKUs." },
          { heading: "BgRemove vs Remove.bg for Amazon sellers", body: "Remove.bg: $0.20 per high-res image. 100 SKUs = $20. Account required. Images uploaded to their servers.\n\nBgRemove: Free for unlimited images. No account. Images processed locally — never leave your device.\n\nFor a seller doing 500 SKUs per quarter, that's $100/quarter saved, plus zero risk of pre-launch product images leaking. We don't even ship analytics that touch image data." },
          { heading: "Beyond MAIN images: A+ Content, Brand Story, Storefronts", body: "Transparent PNGs unlock more than just MAIN compliance. A+ Premium modules let you composite products onto lifestyle backgrounds. Brand Story banners need clean cutouts to layer over branded backgrounds. Sponsored Display ads benefit from products that visually 'pop' against marketplace clutter. Same workflow — drop image, get PNG, composite anywhere." },
        ]}
        faqs={faqs}
        faqTitle="Frequently asked questions"
        related={[
          { href: "/product-photo-background-remover/", label: "Product photo background remover" },
          { href: "/bulk/", label: "Bulk processing (20 at once)" },
          { href: "/background-remover-for-shopify/", label: "For Shopify stores" },
          { href: "/background-remover-for-etsy/", label: "For Etsy shops" },
          { href: "/blog/etsy-shopify-product-photos/", label: "Guide: product photos for marketplaces" },
          { href: "/", label: "Back to background remover" },
        ]}
        relatedTitle="Related tools and guides"
        ctaTitle="Process your Amazon catalog today"
        ctaSubtitle="Free, bulk, private. No account, no per-image cost."
        ctaButton="Start removing backgrounds"
        ctaHref="/"
      />
    </>
  );
}
