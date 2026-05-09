import type { Metadata } from "next";
import Link from "next/link";
import { LandingPageLayout } from "@/components/landing-page-layout";
import { JsonLd } from "@/components/json-ld";
import { softwareAppSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";

const TITLE = "Free Product Photo Background Remover for Etsy, Shopify, Amazon";
const DESCRIPTION =
  "Remove backgrounds from product photos in your browser. Process up to 20 at once for marketplace listings. No subscription, no upload, transparent PNG output.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE.url}/product-photo-background-remover/` },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={softwareAppSchema({
          name: "BgRemove Product Photo Background Remover",
          url: `${SITE.url}/product-photo-background-remover/`,
          description:
            "Remove backgrounds from e-commerce product photos for Etsy, Shopify, Amazon, and eBay listings.",
        })}
      />
      <LandingPageLayout
        eyebrow="E-commerce & marketplaces"
        title="Clean product photos for any marketplace"
        description="Drop a product photo, get a transparent PNG ready for Etsy, Shopify, Amazon, or eBay. Process a whole catalogue at once — your sourcing photos never leave your device."
        related={[
          { href: "/bulk/", label: "Bulk processor (up to 20 images)" },
          { href: "/blog/etsy-shopify-product-photos/", label: "Marketplace-ready product photos in 60s" },
          { href: "/tools/image-resizer/", label: "Resize to marketplace specs" },
          { href: "/tools/image-compressor/", label: "Compress to JPEG for upload" },
        ]}
      >
        <h2>The marketplace hero-image problem</h2>
        <p>
          Every major marketplace — Amazon, Etsy, Shopify, eBay — converts
          better with consistent, clean-background hero images. Amazon
          actively requires a pure white background on category-leading
          listings, and their internal data shows 25-30% conversion uplift
          for catalogues that follow the rule. The problem is that &quot;take
          a clean white-background photo&quot; usually means a $100+ light
          tent and a spare hour per product.
        </p>
        <p>
          Browser-based AI removes that overhead. Photograph against any
          background, drop the photo in here, get a transparent PNG, place it
          on white in your design tool. Twenty seconds per product instead of
          twenty minutes.
        </p>

        <h2>Bulk processing for catalogues</h2>
        <p>
          If you have a catalogue rather than a single product, the{" "}
          <Link href="/bulk/">bulk processor</Link> handles up to 20 images
          at once. Drop the whole batch, click <strong>Remove
          backgrounds</strong>, wait ~30 seconds, download a ZIP. For larger
          catalogues, run multiple batches — there&apos;s no daily limit.
        </p>

        <h2>Tips by product category</h2>
        <h3>Clothing & accessories</h3>
        <p>
          Lay flat on a contrasting background or use a mannequin. The model
          handles clothing on people best — a flat-lay on a textured table is
          harder.
        </p>

        <h3>Jewellery & metallic items</h3>
        <p>
          Reflections trick the model. Use a matte backdrop and diffused
          light. Expect to clean up edges in Photopea or a design tool for
          the highest-stakes shots.
        </p>

        <h3>Food & beverage</h3>
        <p>
          Plates and bowls work well; semi-transparent items like glassware
          are the hardest case. For drinks, photograph against a backdrop
          that&apos;s clearly different from the liquid colour.
        </p>

        <h3>Hard goods (electronics, tools, books)</h3>
        <p>
          The easiest category. Solid edges, no fly-aways, no transparency.
          Even a phone snap on your kitchen table will produce a clean
          cutout.
        </p>

        <h3>Soft goods (toys, candles, plants)</h3>
        <p>
          Generally good results. Wispy edges (plant leaves, fur on stuffed
          animals) lose some detail — but for thumbnail use, this is rarely
          noticeable.
        </p>

        <h2>Recommended workflow</h2>
        <ol>
          <li>Photograph all products against the same background and lighting.</li>
          <li>Drop the batch into <Link href="/bulk/">bulk</Link>.</li>
          <li>Download the ZIP of transparent PNGs.</li>
          <li>
            Open in your design tool of choice. Add a pure white (RGB
            255,255,255) layer behind each product.
          </li>
          <li>
            Run through the <Link href="/tools/image-resizer/">resizer</Link>{" "}
            for marketplace-specific dimensions (Amazon: 2000×2000; Shopify:
            2048×2048; Etsy: 2000×2000).
          </li>
          <li>
            Compress to JPEG at 85% quality with the{" "}
            <Link href="/tools/image-compressor/">compressor</Link> — typical
            output is 200-400 KB.
          </li>
        </ol>

        <h2>Privacy matters for unreleased products</h2>
        <p>
          Drop-shippers, indie brands, and pre-launch teams all have one
          thing in common: their product photos are commercially sensitive
          before the listing goes live. Uploading them to a third-party
          service — even a reputable one — creates a small but real risk of
          leakage. Browser-only processing eliminates the risk entirely
          because there&apos;s no upload step.
        </p>
      </LandingPageLayout>
    </>
  );
}
