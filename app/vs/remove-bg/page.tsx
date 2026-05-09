import type { Metadata } from "next";
import Link from "next/link";
import { VsPageLayout, comparisonSchema, type VsRow } from "@/components/vs-page-layout";
import { JsonLd } from "@/components/json-ld";
import { SITE } from "@/lib/site";

const COMPETITOR = "Remove.bg";
const PAGE_URL = `${SITE.url}/vs/remove-bg/`;
const TITLE = "BgRemove vs Remove.bg: Free, Browser-Only Alternative (2026)";
const DESCRIPTION =
  "Honest comparison of BgRemove and Remove.bg. Both remove image backgrounds with AI, but the privacy model, free tier, and pricing are very different. Here's which to pick when.";

const ROWS: VsRow[] = [
  { feature: "Free tier", bgremove: "Unlimited, full-res", competitor: "0.25 MP preview" },
  { feature: "High-resolution downloads (free)", bgremove: true, competitor: false },
  { feature: "Watermark on free output", bgremove: false, competitor: false },
  { feature: "Account / signup required", bgremove: false, competitor: true },
  { feature: "Photos uploaded to a server", bgremove: false, competitor: true },
  { feature: "Photos stored / retained", bgremove: false, competitor: "1 hour" },
  { feature: "Bulk processing (free)", bgremove: "20 per batch", competitor: false },
  { feature: "API access", bgremove: false, competitor: true },
  { feature: "Photoshop plugin", bgremove: false, competitor: true },
  { feature: "Hair / fly-away detail", bgremove: "good", competitor: "best in class" },
  { feature: "Speed per image", bgremove: "2-3s", competitor: "5-8s" },
  { feature: "Cost (10 images / month)", bgremove: "$0", competitor: "$2.00" },
  { feature: "Cost (1000 images / month)", bgremove: "$0", competitor: "$70-200" },
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: { title: TITLE, description: DESCRIPTION, type: "article", url: PAGE_URL },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={comparisonSchema({
          competitorName: COMPETITOR,
          competitorUrl: "https://www.remove.bg",
          pageUrl: PAGE_URL,
          bgremoveDescription:
            "Free, browser-only background remover. No upload, no signup, no watermark.",
        })}
      />
      <VsPageLayout
        competitorName={COMPETITOR}
        competitorTagline="Remove.bg — Kaleido GmbH, Vienna · Founded 2018"
        title="BgRemove vs Remove.bg"
        description="Both use AI to remove image backgrounds. The differences are about privacy, where the model runs, and how generous the free tier really is."
        verdict="Pick Remove.bg if you need the absolute best hair-edge detail on a single high-stakes image and you're willing to pay. Pick BgRemove if you want truly unlimited free use, batch processing, and your photos to never leave your device."
        rows={ROWS}
        related={[
          { href: "/vs/canva", label: "BgRemove vs Canva" },
          { href: "/vs/photoshop", label: "BgRemove vs Photoshop" },
          { href: "/vs/adobe-express", label: "BgRemove vs Adobe Express" },
          { href: "/blog/best-free-background-removers-2026/", label: "5 free background removers compared" },
        ]}
      >
        <h2>The short version</h2>
        <p>
          Remove.bg pioneered the &quot;one-click background remover&quot; category in 2018.
          Their AI model is excellent — particularly on hair and fur — and their API is the de
          facto standard for tools that integrate background removal. Their free tier, however,
          downloads at 0.25 megapixels (preview quality only). Anything you actually want to use
          requires a paid credit (about $0.20 each in packs of 50, or a $9/month subscription).
        </p>
        <p>
          BgRemove is browser-only. The same class of AI model (Google&apos;s MediaPipe Selfie
          Segmenter) runs locally on your device. No upload, no signup, no per-image cost. The
          free tier is the only tier — it&apos;s genuinely unlimited and full-resolution.
        </p>

        <h2>Where Remove.bg wins</h2>
        <ul>
          <li>
            <strong>Edge quality on extreme cases.</strong> Wispy hair on a busy background is
            still where Remove.bg has the edge. Their model is more aggressive about preserving
            sub-pixel detail. For a one-off product shot or a campaign hero image, that matters.
          </li>
          <li>
            <strong>API and integrations.</strong> If you&apos;re building a Shopify app or a
            Photoshop plugin, Remove.bg has documented APIs and SDKs.
          </li>
          <li>
            <strong>Tool ecosystem.</strong> Their Photoshop plugin, Sketch plugin, and
            command-line app are mature.
          </li>
        </ul>

        <h2>Where BgRemove wins</h2>
        <ul>
          <li>
            <strong>Truly free, truly unlimited.</strong> No daily cap, no &quot;preview
            quality&quot; trick, no watermark, no signup wall.
          </li>
          <li>
            <strong>Privacy by architecture.</strong> Your photo never reaches our server. The AI
            runs in your browser. Open DevTools → Network tab and watch — there&apos;s no upload.
          </li>
          <li>
            <strong>Speed.</strong> 2-3 seconds vs 5-8 seconds for Remove.bg, after the first
            image. There&apos;s no upload + inference + download round-trip.
          </li>
          <li>
            <strong>Bulk processing free.</strong> Drop 20 images, get a ZIP. Remove.bg charges
            credits for each.
          </li>
          <li>
            <strong>$0 cost forever.</strong> No accidental subscription, no rate-limited
            cliff edge.
          </li>
        </ul>

        <h2>When to use each</h2>
        <p>
          <strong>Use Remove.bg when:</strong> you have one critical photo (a product hero, a
          marketing campaign visual, a portrait with very fine hair), you don&apos;t mind paying
          $0.20-1.00 per image, and you need that last 5% of edge quality.
        </p>
        <p>
          <strong>Use <Link href="/">BgRemove</Link> when:</strong> you have a batch of product
          photos, you&apos;re processing personal images (selfies, family photos), you&apos;re on a
          budget, you want privacy, or you&apos;re tired of free tiers that quietly cap you at
          three downloads.
        </p>

        <h2>Honest pricing comparison</h2>
        <p>
          For 10 images a month, the cost difference is minor (~$2). For a small e-commerce
          store doing 100-500 product photos a month, Remove.bg costs $20-100/month. For a
          serious user, it&apos;s $200+/month. BgRemove is $0 at every tier.
        </p>

        <h2>Privacy: the architectural difference</h2>
        <p>
          Remove.bg uploads your image to servers in Vienna, runs inference, returns the result,
          and (per their stated policy) deletes after 1 hour. That&apos;s a reasonable policy
          for most users. But it does mean your image briefly lives on a third party&apos;s
          infrastructure — relevant for unreleased product photos, sensitive personal content,
          or anyone subject to strict data-handling rules.
        </p>
        <p>
          BgRemove runs the AI inside your browser. No upload step exists in the architecture.
          You can verify this in any browser&apos;s DevTools.
        </p>

        <h2>Try BgRemove on the same photo you&apos;d use Remove.bg for</h2>
        <p>
          The fastest way to evaluate is to run the same photo through both. For portraits,
          selfies, and most product shots, you&apos;ll find the results visually identical at
          the resolutions you&apos;ll actually use. For wispy hair on a busy background,
          Remove.bg may have a small edge.
        </p>
      </VsPageLayout>
    </>
  );
}
