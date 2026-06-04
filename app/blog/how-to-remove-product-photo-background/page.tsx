/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from "next";
import Link from "next/link";
import { BlogPostLayout, articleSchema } from "@/components/blog-post-layout";
import { JsonLd } from "@/components/json-ld";
import { SITE } from "@/lib/site";

const SLUG = "how-to-remove-product-photo-background";
const TITLE = "How to Remove Product Photo Backgrounds (Marketplace-Ready Guide)";
const DESCRIPTION = "Practical guide for ecommerce sellers: remove product photo backgrounds for Amazon, Shopify, Etsy, eBay. Free, browser-only workflow.";
const DATE = "2026-06-04";

export const metadata: Metadata = {
  title: TITLE, description: DESCRIPTION,
  alternates: { canonical: `${SITE.url}/blog/${SLUG}/` },
  openGraph: { title: TITLE, description: DESCRIPTION, type: "article", publishedTime: DATE, url: `${SITE.url}/blog/${SLUG}/` },
};

export default function Post() {
  return (
    <>
      <JsonLd data={articleSchema({ title: TITLE, description: DESCRIPTION, slug: SLUG, date: DATE, siteUrl: SITE.url, authorName: SITE.name })} />
      <BlogPostLayout
        title={TITLE} description={DESCRIPTION} date={DATE} readingMinutes={10}
        related={[
          { href: "/blog/etsy-shopify-product-photos/", label: "Marketplace product photos guide" },
          { href: "/background-remover-for-amazon/", label: "For Amazon sellers" },
          { href: "/background-remover-for-shopify/", label: "For Shopify stores" },
          { href: "/bulk/", label: "Bulk processing" },
        ]}
      >
        <p className="lead">If you sell on Amazon, Shopify, Etsy, or eBay, clean white-background product photos are the single highest-leverage thing you can optimise. They're required by some platforms, rewarded by all of them, and the difference between professional and amateur listings.</p>

        <p>Here's the practical workflow we recommend for ecommerce sellers, from photographing the product to uploading to marketplace.</p>

        <h2>Why marketplace photos need clean backgrounds</h2>
        <p>Amazon requires it. The MAIN image policy (your first product photo) demands a pure white background — RGB 255, 255, 255 — with no watermarks, borders, or text. Listings that don't comply get suppressed in search and sometimes removed.</p>
        <p>Shopify, Etsy, and eBay don't enforce it, but they reward it through CTR. Marketplace listings with clean backgrounds consistently get 30-100% more clicks than the same product on a cluttered background. Higher CTR → better placement in search → more visibility → more sales.</p>
        <p>The ROI is enormous. A free 60-second background removal step can double a listing's CTR. For sellers with hundreds of SKUs, this compounds across the entire catalogue.</p>

        <h2>Step 1: Photograph the product</h2>
        <p>You don't need a studio. You don't need professional lighting. A phone camera with thoughtful setup beats a DSLR with bad setup. Here's what actually matters:</p>
        <ul>
          <li><strong>Natural light from a window.</strong> Side-lit (not back-lit) is best. Morning or late-afternoon light is softer than midday.</li>
          <li><strong>White card reflector on the opposite side.</strong> Killed shadows on the side away from the window. A piece of foam board or a white pillow works.</li>
          <li><strong>Contrast between product and background.</strong> Dark products on white, light products on dark. This makes the AI's job easier.</li>
          <li><strong>Multiple angles per product.</strong> Plan to shoot front, side, back, top, and detail shots. Marketplace listings allow 5-7 images each.</li>
          <li><strong>Clean the product first.</strong> Dust, smudges, water spots all show through clean cutouts. Wipe everything down before shooting.</li>
        </ul>
        <p>One efficient setup: put the product on a white sheet of paper or fabric, near a window, with a white card reflector opposite. Photograph from each angle. Total setup time: 5 minutes. Total shooting time per product: 2-3 minutes.</p>

        <h2>Step 2: Remove the background</h2>
        <p>Open <Link href="/">bgremovers.org</Link> in your browser. For a single product photo, drop it on the upload area. For multiple products, open <Link href="/bulk/">/bulk</Link> and drop up to 20 images at once.</p>
        <p>The first time you use the tool, your browser downloads the AI model (~44 MB) — about 10-15 seconds on a decent connection. After that, each image processes in 3-5 seconds locally. There's no upload to a server. Your product photos — including pre-launch products — never leave your device.</p>
        <p>Output is a transparent PNG at up to 4096×4096 pixels. Higher resolution than most marketplace requirements demand, giving you headroom for future Retina display requirements.</p>

        <h2>Step 3: Add the marketplace-required background</h2>
        <p>For Amazon's MAIN image (white background required) and most other marketplaces, you need to drop the transparent product onto a white layer.</p>
        <p>In Canva (free plan works):</p>
        <ol>
          <li>Create a new design at 2000×2000 pixels (good for all marketplaces; Amazon recommends 2000+ minimum).</li>
          <li>Set the background colour to pure white (#FFFFFF).</li>
          <li>Upload your transparent PNG.</li>
          <li>Drag onto the design. Centre it. Scale to fill ~85% of the frame (Amazon's recommended product coverage).</li>
          <li>Export as JPG (Amazon's preferred format for MAIN images, smaller file size than PNG).</li>
        </ol>
        <p>For Shopify or Etsy, where backgrounds can be branded colours: same workflow, just swap the white background for your brand colour or a soft gradient. This gives your listings visual coherence across products.</p>

        <h2>Step 4: Optimise for page speed</h2>
        <p>Large product images slow down product pages, which hurts conversion and SEO rank (especially on mobile). After background removal, convert your final image to WebP using <Link href="/tools/webp-converter/">our WebP converter</Link>.</p>
        <p>WebP files are typically 25-35% smaller than equivalent JPGs at visually identical quality. Modern Shopify themes and Cloudflare-enabled stores serve WebP automatically to browsers that support it (98%+ of traffic). For a 100-product store, this can save megabytes per page load.</p>

        <h2>Step 5: Upload to your marketplace</h2>
        <p>Most marketplaces have specific image upload requirements. Quick reference:</p>
        <ul>
          <li><strong>Amazon Seller Central:</strong> MAIN image must be white background, 2000+ pixels, JPG preferred, under 10MB. Additional images can be lifestyle or context shots.</li>
          <li><strong>Shopify:</strong> Recommend 2048×2048. Multiple images per product OK. WebP automatically served.</li>
          <li><strong>Etsy:</strong> First image is the cover (most important). Recommend 2000×2000 minimum. Up to 10 images per listing.</li>
          <li><strong>eBay:</strong> 1600×1600 recommended. Multiple images per listing. Avoid borders, watermarks, text overlays.</li>
        </ul>
        <p>Always use the highest-quality image for the primary listing photo — it's what customers see in search results and what determines click-through rate.</p>

        <h2>Bulk workflow for high-volume sellers</h2>
        <p>For sellers with 50+ SKUs, the bulk workflow saves hours:</p>
        <ol>
          <li>Photograph all products in one session (could be a day, could be a week of batches).</li>
          <li>Organise photos into batches of 20 in a folder.</li>
          <li>Open <Link href="/bulk/">/bulk</Link>. Drop the first batch.</li>
          <li>Each batch processes in about 60 seconds total.</li>
          <li>Download the ZIP. Move to next batch.</li>
          <li>Once all photos are processed, open Canva or Photoshop and apply your marketplace template across all of them.</li>
          <li>Export and bulk-upload to your marketplace.</li>
        </ol>
        <p>For 200 SKUs, total processing time is about 2 hours instead of the 20-40 hours it would take to do manually with Photoshop's Background Eraser.</p>

        <h2>The privacy angle for sellers</h2>
        <p>If you're launching new products, your unreleased SKU photos are competitive intelligence. Most cloud-based BG removers (Remove.bg, Erase.bg, Photoroom) upload every image to their servers, where it's stored for some retention window and potentially used to train their AI models.</p>
        <p>For most products this doesn't matter. For competitive product launches, original designs, or industries with active IP theft (fashion, jewelry, electronics), it absolutely does. BgRemove processes everything in your browser — your unreleased product photos never reach our servers. <Link href="/privacy-proof/">Verify this yourself</Link> with browser DevTools.</p>

        <h2>The bottom line</h2>
        <p>Clean product photos are the highest-leverage optimisation for any ecommerce listing. The full workflow — photograph, remove background, add marketplace-required background, optimise for speed, upload — takes 5-10 minutes per product. The result consistently outperforms studio-photographed products on cluttered backgrounds, at zero cost.</p>
        <p>Start with one product. Photograph it. Run it through <Link href="/">BgRemove</Link>. Compare the listing CTR after a week against your old photos. The numbers will speak for themselves.</p>
      </BlogPostLayout>
    </>
  );
}
