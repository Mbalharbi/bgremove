/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from "next";
import Link from "next/link";
import { BlogPostLayout, articleSchema } from "@/components/blog-post-layout";
import { JsonLd } from "@/components/json-ld";
import { SITE } from "@/lib/site";

const SLUG = "background-remover-for-amazon-sellers";
const TITLE = "Background Remover for Amazon Sellers: The Definitive 2026 Guide";
const DESCRIPTION = "Amazon's MAIN image policy requires pure white backgrounds. This guide covers the rules, the cheapest compliant workflow, and the most common mistakes.";
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
        title={TITLE} description={DESCRIPTION} date={DATE} readingMinutes={12}
        related={[
          { href: "/background-remover-for-amazon/", label: "Amazon BG remover tool page" },
          { href: "/blog/how-to-remove-product-photo-background/", label: "How to remove product photo backgrounds" },
          { href: "/blog/etsy-shopify-product-photos/", label: "Etsy & Shopify product photos" },
          { href: "/bulk/", label: "Bulk processing (20 at once)" },
        ]}
      >
        <p className="lead">Amazon's product image policies are stricter than most marketplaces, and getting them wrong is expensive — listings get suppressed in search, and persistent violations can get accounts suspended. This guide covers what Amazon actually requires, the cheapest compliant workflow, and the mistakes that get sellers in trouble.</p>

        <h2>What Amazon actually requires</h2>
        <p>Amazon's MAIN image (the first product image in a listing — the one customers see in search results) has hard requirements:</p>
        <ul>
          <li><strong>Pure white background.</strong> RGB 255, 255, 255 — not off-white, not light grey, not cream.</li>
          <li><strong>Product fills at least 85% of the frame.</strong> No tiny products lost in white space.</li>
          <li><strong>No watermarks, text, borders, or logos on the image itself.</strong> Includes "free shipping" stamps, "best seller" badges, anything you've added.</li>
          <li><strong>The actual product only.</strong> No props, accessories not included in the purchase, models holding the product (unless apparel).</li>
          <li><strong>Minimum 1000 pixels on the longest side.</strong> 2000+ pixels recommended for zoom feature.</li>
          <li><strong>JPG, TIFF, PNG, or GIF format.</strong> JPG is preferred for file size.</li>
        </ul>
        <p>Additional images (positions 2-7 in your listing) can be lifestyle shots, infographics, comparison images, or use shots. The MAIN image is what's regulated.</p>

        <h2>What happens if you violate</h2>
        <p>Amazon's image-compliance enforcement runs through their listing quality algorithm. Consequences of non-compliance:</p>
        <ul>
          <li><strong>Search suppression.</strong> Non-compliant listings get pushed lower in search results. You'll see fewer impressions and sales without any explicit warning.</li>
          <li><strong>Featured Offer (Buy Box) loss.</strong> Quality issues can cost you the Buy Box on shared listings.</li>
          <li><strong>Listing removal.</strong> Egregious violations result in listings being removed pending fix.</li>
          <li><strong>Account-level risk.</strong> Persistent violations contribute to overall account health metrics.</li>
        </ul>
        <p>Most violations are silent — your listing just performs worse without telling you why. This makes compliance especially important even when you don't get a warning.</p>

        <h2>The cheapest compliant workflow</h2>
        <p>You don't need professional photography to comply. Here's the workflow that achieves Amazon's MAIN image specs for free:</p>

        <h3>Step 1: Photograph the product</h3>
        <p>Phone camera near a bright window. White card reflector opposite the window to fill shadows. Background can be anything — a white sheet of paper, the kitchen counter, even a magazine cover. The AI will remove it.</p>
        <p>Shoot from a slight angle (15-30 degrees above horizontal) so the product looks 3D, not flat. Include multiple angles: front, side, top, detail shots. You'll need 5-7 total images per listing for the full slot allocation.</p>

        <h3>Step 2: Remove the background</h3>
        <p>Open <Link href="/">bgremovers.org</Link> or, for multiple products, <Link href="/bulk/">/bulk</Link>. Drop your photos. The AI processes each in 3-5 seconds, producing a transparent PNG.</p>
        <p>For Amazon sellers specifically, the <Link href="/background-remover-for-amazon/">Amazon-specific landing page</Link> has a workflow checklist optimised for the MAIN image policy.</p>

        <h3>Step 3: Add the white background</h3>
        <p>Amazon requires the background to be pure white — RGB 255, 255, 255. A transparent PNG is not the same as a white background; you need to add the white explicitly.</p>
        <p>In Canva (free plan works):</p>
        <ol>
          <li>Create a new design at 2000×2000 pixels.</li>
          <li>Background colour: pure white (#FFFFFF). Confirm by checking the colour picker shows 255, 255, 255.</li>
          <li>Upload your transparent PNG.</li>
          <li>Drag onto the design. Centre and scale to fill ~85% of the frame.</li>
          <li>Export as JPG (Amazon prefers JPG for MAIN images — smaller file size).</li>
        </ol>

        <h3>Step 4: Upload to Seller Central</h3>
        <p>In Seller Central, navigate to your product, upload the JPG as the MAIN image. Amazon's image upload tool will run automatic checks and flag obvious violations (too small, wrong format).</p>
        <p>For additional images (slots 2-7), use lifestyle shots, infographics, comparison charts, or use cases. These don't require white backgrounds.</p>

        <h2>Common mistakes that get listings suppressed</h2>

        <h3>Mistake 1: "Off-white is close enough"</h3>
        <p>It's not. Amazon's algorithm specifically tests for RGB 255, 255, 255. Even slightly off-white (RGB 250, 250, 250) gets flagged. Always confirm with a colour picker.</p>

        <h3>Mistake 2: Drop shadows under the product</h3>
        <p>Many sellers add subtle drop shadows to make products "pop." Amazon's policy is ambiguous on this — some categories allow soft shadows, others don't. To be safe, deliver a clean cutout with no shadows on the MAIN image. Save shadow effects for lifestyle images in slots 2-7.</p>

        <h3>Mistake 3: Including props</h3>
        <p>If you're selling a coffee mug, the MAIN image should be just the mug — not the mug on a wooden table with coffee beans scattered around it. Save the styled shot for slot 2.</p>

        <h3>Mistake 4: Watermarks and brand badges</h3>
        <p>Adding your brand name or "Premium Quality" stamps to the image is a clear violation. Amazon's product listings have dedicated fields for brand name; don't put it on the image.</p>

        <h3>Mistake 5: Models holding the product</h3>
        <p>For apparel, models are expected. For non-apparel, the MAIN image should be just the product. A hand holding a phone case in the MAIN image is a violation; the same image works fine in slot 2 as a "scale reference."</p>

        <h2>Bulk processing for high-volume sellers</h2>
        <p>For sellers with 50+ SKUs, manual processing in Canva takes hours. The bulk workflow:</p>
        <ol>
          <li>Photograph all products. Organise into folders.</li>
          <li>Run batches through <Link href="/bulk/">/bulk</Link> — up to 20 at once.</li>
          <li>Download ZIPs of transparent PNGs.</li>
          <li>Use Canva's "magic resize" or build a single template, then process all PNGs through it. Canva Pro lets you bulk-apply templates.</li>
          <li>Bulk-upload to Seller Central via the inventory loader spreadsheet.</li>
        </ol>
        <p>For 200 SKUs, total processing time is about 2 hours instead of 20-40 hours.</p>

        <h2>Privacy: why this matters for sellers</h2>
        <p>For unreleased products, your photos are competitive intelligence. Q4 launches, new line drops, exclusive partnerships — all photographed before going live. Cloud-based BG removers upload every image to their servers, where they're stored for some retention window and (per most TOS) potentially used to train models.</p>
        <p>For most sellers this is theoretical risk. For competitive categories (fashion, electronics, beauty), it's real. BgRemove processes everything in your browser. Pre-launch product photos never reach our servers. <Link href="/privacy-proof/">Verify with DevTools</Link>.</p>

        <h2>Cost comparison: paid alternatives</h2>
        <ul>
          <li><strong>Remove.bg:</strong> $0.20 per HD image. 100-SKU catalogue = $20. 500 SKUs = $100. Per quarter, for an active seller doing catalogue refreshes, this adds up.</li>
          <li><strong>Professional product photographer:</strong> $20-100 per product, plus studio time. For a small seller, this is prohibitive.</li>
          <li><strong>Adobe Express Premium:</strong> $120/year for BG removal plus design templates.</li>
          <li><strong>BgRemove:</strong> Free, unlimited, no per-image cost.</li>
        </ul>
        <p>For most sellers, the savings from switching to BgRemove pay for inventory holding costs or marketing spend that has clearer ROI than yet another SaaS subscription.</p>

        <h2>The bottom line</h2>
        <p>Amazon's MAIN image policy is mechanically enforceable: white background, 85% coverage, no clutter. The free workflow — phone camera, BgRemove, Canva — produces compliant images for any product category. The result outperforms most studio shots on cluttered backgrounds, at zero cost.</p>
        <p>If you're an Amazon seller and you're paying for BG removal monthly, you're spending on the wrong thing. <Link href="/">Open BgRemove</Link>, photograph one product, and run the workflow end-to-end. The first time will take 10 minutes. After that, it's 60 seconds per product.</p>
      </BlogPostLayout>
    </>
  );
}
