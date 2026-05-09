import type { Metadata } from "next";
import Link from "next/link";
import { BlogPostLayout, articleSchema } from "@/components/blog-post-layout";
import { JsonLd } from "@/components/json-ld";
import { SITE } from "@/lib/site";

const SLUG = "etsy-shopify-product-photos";
const TITLE = "Remove Backgrounds from Etsy & Shopify Product Photos in 60 Seconds";
const DESCRIPTION =
  "A practical guide to clean white-background product photography for marketplaces. Covers the actual rules from Etsy, Shopify, Amazon, and how to batch-process a whole catalogue in your browser.";
const DATE = "2026-05-09";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE.url}/blog/${SLUG}/` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "article",
    publishedTime: DATE,
    url: `${SITE.url}/blog/${SLUG}/`,
  },
};

export default function Post() {
  return (
    <>
      <JsonLd
        data={articleSchema({
          title: TITLE,
          description: DESCRIPTION,
          slug: SLUG,
          date: DATE,
          siteUrl: SITE.url,
          authorName: SITE.name,
        })}
      />
      <BlogPostLayout
        title={TITLE}
        description={DESCRIPTION}
        date={DATE}
        readingMinutes={7}
        related={[
          { href: "/product-photo-background-remover/", label: "Product photo background remover" },
          { href: "/blog/transparent-png-from-photo/", label: "How to make a transparent PNG" },
          { href: "/bulk/", label: "Bulk background remover (up to 20 images)" },
        ]}
      >
        <p className="lead">
          Clean product photos sell more. Marketplaces have measured this for
          two decades — Amazon&apos;s own data shows that listings with
          consistent white-background hero images convert 25-30% better than
          mixed-background catalogues. Here&apos;s how to get there fast,
          without spending a weekend in Photoshop.
        </p>

        <h2>What the marketplaces actually require</h2>
        <p>
          Each marketplace has slightly different rules. The good news: if you
          aim for &quot;subject on pure white at high resolution&quot;, you
          satisfy almost all of them.
        </p>

        <h3>Amazon</h3>
        <ul>
          <li>Hero image: <strong>pure white background</strong> (RGB 255,255,255), product fills 85% of the frame</li>
          <li>Minimum 1000 px on the longest side; recommend 1600+ for zoom</li>
          <li>JPEG, PNG, GIF, or TIFF; sRGB or CMYK</li>
          <li>No text, watermarks, or logos on the hero</li>
        </ul>

        <h3>Shopify</h3>
        <ul>
          <li>No hard rules, but their guide recommends 2048×2048 px at 72&nbsp;DPI</li>
          <li>White or transparent background on the hero — transparent PNG works for product cards</li>
          <li>Maximum 20 MB per image</li>
        </ul>

        <h3>Etsy</h3>
        <ul>
          <li>2000 px on the shortest side recommended; minimum 570 px wide for the listing thumbnail</li>
          <li>No background requirement, but their own data favours clean-background hero shots</li>
          <li>Up to 10 photos per listing — usually one clean cutout + lifestyle shots</li>
        </ul>

        <h3>eBay</h3>
        <ul>
          <li>Minimum 500 px on the longest side</li>
          <li>White background required for new condition listings in many categories</li>
        </ul>

        <p>
          The common pattern: <strong>one clean white-background hero image,
          plus 4-9 lifestyle/detail shots</strong>. The hero is what wins the
          click; the rest is what closes the sale.
        </p>

        <h2>The 60-second workflow for a single product</h2>
        <ol>
          <li>
            Take the photo against any background — a kitchen counter, a
            window-lit table, anywhere with even light.
          </li>
          <li>
            Open <Link href="/product-photo-background-remover/">the product
            photo tool</Link>.
          </li>
          <li>Drop the photo in. Wait 2-3 seconds.</li>
          <li>Download the transparent PNG.</li>
          <li>
            Open the PNG in your design tool (or Photopea) and place it on a
            pure white 2000×2000 canvas. Save as JPEG at 85% quality.
          </li>
        </ol>

        <p>
          That&apos;s a marketplace-ready hero shot in under a minute, with no
          studio backdrop and no Photoshop subscription.
        </p>

        <h2>The 10-minute workflow for a 20-product catalogue</h2>
        <p>
          For a real product catalogue, single-image processing doesn&apos;t
          scale. Use the <Link href="/bulk/">bulk processor</Link>:
        </p>
        <ol>
          <li>
            Photograph all your products against the <em>same</em> background
            in the same lighting. Consistency makes batch processing reliable.
          </li>
          <li>
            Drag all 20 photos onto the bulk page. They queue automatically.
          </li>
          <li>
            Click <strong>Remove backgrounds</strong>. The tool processes them
            sequentially in the browser — about 30 seconds for 20 images on a
            modern laptop.
          </li>
          <li>
            Click <strong>Download ZIP</strong>. You get all 20 transparent
            PNGs in one archive.
          </li>
          <li>
            Use a batch image editor (Photopea&apos;s &quot;Place&quot; +
            actions, or even macOS Preview&apos;s scripted resize) to add a
            white background and resize to 2000×2000. Now you have 20
            marketplace-ready images.
          </li>
        </ol>

        <h2>Tips for clean cutouts on products</h2>
        <p>
          The AI is trained on people, so it works better on products with
          person-like shapes (clothing on a mannequin, jewellery on a
          headshot) than abstract objects. Five practical tips:
        </p>
        <ul>
          <li>
            <strong>Shoot against a contrasting background.</strong> Dark
            products on white, light products on dark. The contrast gives the
            model an obvious edge to follow.
          </li>
          <li>
            <strong>Even, soft lighting.</strong> Window light through a
            curtain, two cheap LED panels, or a $30 light tent — anything that
            avoids harsh shadows. Shadows confuse the cutout.
          </li>
          <li>
            <strong>Keep the product alone.</strong> No props in frame for the
            hero shot. Save those for lifestyle shots later.
          </li>
          <li>
            <strong>Watch out for reflective surfaces.</strong> Glass,
            polished metal, jewellery — the AI may cut into the reflection.
            Re-shoot with a matte backdrop where possible, or clean up in
            Photopea afterward.
          </li>
          <li>
            <strong>Crop tightly before processing.</strong> Less background
            in the input means less for the model to get wrong.
          </li>
        </ul>

        <h2>What to do after the cutout</h2>
        <p>
          Most marketplaces want JPEG with a white background, not PNG with
          transparency. Your post-processing pipeline is:
        </p>
        <ol>
          <li>Cutout → transparent PNG (this site, free)</li>
          <li>Add white background + resize to 2000×2000 (Photopea or design tool)</li>
          <li>Compress to JPEG at 85% quality (the <Link href="/tools/image-compressor/">image compressor</Link> handles this)</li>
        </ol>

        <p>
          The result: a 200-400 KB JPEG that loads fast on mobile, looks
          consistent across your catalogue, and follows every major
          marketplace&apos;s hero-image rule.
        </p>

        <h2>The privacy angle</h2>
        <p>
          One reason e-commerce sellers are switching to browser-based tools:
          unreleased product photos are commercially sensitive. Uploading them
          to a third-party service (even a reputable one with &quot;1-hour
          retention&quot;) is a small but real risk — especially for
          drop-shipped products where competitors actively scrape suppliers.
          Browser-only processing eliminates that risk entirely.
        </p>
      </BlogPostLayout>
    </>
  );
}
