import type { Metadata } from "next";
import Link from "next/link";
import { VsPageLayout, comparisonSchema, type VsRow } from "@/components/vs-page-layout";
import { JsonLd } from "@/components/json-ld";
import { SITE } from "@/lib/site";

const COMPETITOR = "Adobe Express";
const PAGE_URL = `${SITE.url}/vs/adobe-express/`;
const TITLE = "BgRemove vs Adobe Express: Browser-Only vs Adobe Cloud (2026)";
const DESCRIPTION =
  "Adobe Express has a free background remover backed by Adobe Sensei. BgRemove runs the AI in your browser. Comparing quality, privacy, and which one fits your workflow.";

const ROWS: VsRow[] = [
  { feature: "Cost", bgremove: "$0", competitor: "$0 (free tier)" },
  { feature: "Account / signup required", bgremove: false, competitor: true },
  { feature: "Adobe ID required", bgremove: false, competitor: true },
  { feature: "Photos uploaded to a server", bgremove: false, competitor: true },
  { feature: "Output: transparent PNG", bgremove: true, competitor: true },
  { feature: "Bulk processing (free)", bgremove: "20 per batch", competitor: false },
  { feature: "Speed per cutout", bgremove: "2-3s", competitor: "6-10s" },
  { feature: "Built-in design templates", bgremove: false, competitor: true },
  { feature: "Adobe Stock integration", bgremove: false, competitor: true },
  { feature: "Cross-app workflow (Photoshop, Illustrator)", bgremove: false, competitor: true },
  { feature: "AI hair / fur edge quality", bgremove: "good", competitor: "very good" },
  { feature: "Works without internet", bgremove: "after first load", competitor: false },
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
          competitorUrl: "https://www.adobe.com/express/",
          pageUrl: PAGE_URL,
          bgremoveDescription:
            "Free, browser-only background remover. No Adobe ID, no signup, no upload.",
        })}
      />
      <VsPageLayout
        competitorName={COMPETITOR}
        competitorTagline="Adobe Express — Adobe's free design app · BG remover by Sensei"
        title="BgRemove vs Adobe Express"
        description="Both have generous free background removers. The differences are about Adobe ecosystem lock-in, account requirements, and where the AI actually runs."
        verdict="Pick Adobe Express if you're already in the Adobe ecosystem and want stock + templates + design tools alongside the BG remover. Pick BgRemove if you just want a PNG without creating yet another account, especially for one-off or sensitive images."
        rows={ROWS}
        related={[
          { href: "/vs/photoshop", label: "BgRemove vs Photoshop" },
          { href: "/vs/canva", label: "BgRemove vs Canva" },
          { href: "/vs/remove-bg", label: "BgRemove vs Remove.bg" },
        ]}
      >
        <h2>The short version</h2>
        <p>
          Adobe Express is Adobe&apos;s answer to Canva — a free-tier design app with
          templates, stock, and AI tools including a background remover powered by Adobe
          Sensei. Quality is excellent and the free tier is genuinely usable (no
          watermark, full-resolution downloads).
        </p>
        <p>
          The catch is the Adobe ID requirement, the upload step (Adobe processes server-side),
          and the broader app being heavyweight if all you want is a transparent PNG. BgRemove
          is the standalone, account-free, browser-local alternative.
        </p>

        <h2>Where Adobe Express wins</h2>
        <ul>
          <li>
            <strong>Adobe Sensei quality.</strong> The AI behind Adobe Express is among the
            best in the industry — particularly on portraits and complex backgrounds.
            Marginal but real improvement over MediaPipe-based tools on hard cases.
          </li>
          <li>
            <strong>Design context.</strong> The cutout flows directly into Adobe&apos;s
            templates, brand kits, and Adobe Stock library.
          </li>
          <li>
            <strong>Cross-app workflow.</strong> Send to Photoshop, Illustrator, or Lightroom
            with one click if you have Creative Cloud.
          </li>
          <li>
            <strong>Genuinely free hi-res output.</strong> Unlike Canva (paywall) or Remove.bg
            (preview only on free), Adobe Express gives you full-resolution downloads at no
            cost — assuming you have an Adobe ID.
          </li>
        </ul>

        <h2>Where BgRemove wins</h2>
        <ul>
          <li>
            <strong>No account at all.</strong> Drop a photo, get a PNG. No Adobe ID, no
            email verification, no &quot;sign in to download&quot; surprise.
          </li>
          <li>
            <strong>Privacy by architecture.</strong> The image stays in your browser. Adobe
            Express uploads it (subject to Adobe&apos;s general data terms).
          </li>
          <li>
            <strong>Speed.</strong> 2-3s vs 6-10s, because there&apos;s no upload + queue.
          </li>
          <li>
            <strong>Bulk processing.</strong> 20 images per batch with ZIP download. Adobe
            Express has no native batch.
          </li>
          <li>
            <strong>Lighter footprint.</strong> A single web page vs a heavy SPA that
            constantly nudges you toward Creative Cloud upsells.
          </li>
          <li>
            <strong>Works offline after first load.</strong> The AI model caches in your
            browser. Adobe Express needs an internet connection every session.
          </li>
        </ul>

        <h2>When to use each</h2>
        <p>
          <strong>Adobe Express:</strong> you&apos;re in the Adobe ecosystem, you want
          templates + stock + design tools alongside the BG remover, you don&apos;t mind the
          Adobe ID, and you want the absolute best edge quality on a single hard image.
        </p>
        <p>
          <strong><Link href="/">BgRemove</Link>:</strong> you want the PNG without signing
          up for anything, you&apos;re processing sensitive or unreleased images, you need
          batch processing, or you just don&apos;t want to feed another platform your data.
        </p>

        <h2>Quality on real photos</h2>
        <p>
          For portraits, selfies, and product photos, the difference between Adobe Express
          and BgRemove is usually invisible at the resolutions you&apos;ll actually use.
          Adobe Sensei pulls ahead on:
        </p>
        <ul>
          <li>Wispy hair against a busy or low-contrast background</li>
          <li>Fur on animals (especially light fur on light backgrounds)</li>
          <li>Translucent objects (glass, smoke, fabric)</li>
          <li>Very small subjects in large frames</li>
        </ul>
        <p>
          For everything else — including 90% of real-world cutouts — they&apos;re tied. Run
          the same photo through both and compare; you&apos;ll see for yourself.
        </p>

        <h2>Privacy comparison</h2>
        <p>
          Adobe Express uploads your image to Adobe&apos;s cloud, processes it
          server-side, and may retain it as part of your project history. Bound by Adobe&apos;s
          general data and AI training policies. BgRemove processes the image entirely in
          your browser — there is no upload step.
        </p>
      </VsPageLayout>
    </>
  );
}
