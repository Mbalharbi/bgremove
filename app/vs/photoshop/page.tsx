import type { Metadata } from "next";
import Link from "next/link";
import { VsPageLayout, comparisonSchema, type VsRow } from "@/components/vs-page-layout";
import { JsonLd } from "@/components/json-ld";
import { SITE } from "@/lib/site";

const COMPETITOR = "Photoshop";
const PAGE_URL = `${SITE.url}/vs/photoshop/`;
const TITLE = "BgRemove vs Photoshop: One-Click Free Tool vs $23/Month Editor";
const DESCRIPTION =
  "Photoshop's Select Subject + Remove Background workflow is powerful but slow and expensive. BgRemove is a one-click browser tool that's free. Here's when each makes sense.";

const ROWS: VsRow[] = [
  { feature: "Cost", bgremove: "$0", competitor: "$22.99/mo" },
  { feature: "Install required", bgremove: false, competitor: true },
  { feature: "Cross-platform (works on iPad/phone)", bgremove: true, competitor: "iPad only" },
  { feature: "Time per image", bgremove: "2-3s", competitor: "10-30s" },
  { feature: "Skill required", bgremove: "none", competitor: "moderate" },
  { feature: "Pixel-level cleanup tools", bgremove: false, competitor: true },
  { feature: "Bulk processing", bgremove: "20 per batch", competitor: "scriptable" },
  { feature: "Photos stay on your device", bgremove: true, competitor: true },
  { feature: "Output: transparent PNG", bgremove: true, competitor: true },
  { feature: "Re-edit / undo / layer control", bgremove: false, competitor: true },
  { feature: "Hair / fur edge quality", bgremove: "good", competitor: "best with cleanup" },
  { feature: "Best for", bgremove: "fast cutouts", competitor: "compositing" },
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
          competitorUrl: "https://www.adobe.com/products/photoshop.html",
          pageUrl: PAGE_URL,
          bgremoveDescription:
            "Free, browser-only background remover. No install, no subscription, no signup.",
        })}
      />
      <VsPageLayout
        competitorName={COMPETITOR}
        competitorTagline="Adobe Photoshop — industrial pixel editor · Founded 1990"
        title="BgRemove vs Photoshop"
        description="Photoshop is the industry standard for image work. BgRemove is a one-click web tool. Comparing them is like comparing a chef's knife to a vegetable peeler — they're both useful, for very different jobs."
        verdict="Use Photoshop when you need to retouch, composite, paint, or do anything beyond removing the background. Use BgRemove when you just need a transparent PNG fast and don't want to launch Photoshop, fight with the layer mask, and pay $23/month for the privilege."
        rows={ROWS}
        related={[
          { href: "/vs/remove-bg", label: "BgRemove vs Remove.bg" },
          { href: "/vs/canva", label: "BgRemove vs Canva" },
          { href: "/blog/transparent-png-from-photo/", label: "How to make a transparent PNG" },
        ]}
      >
        <h2>The short version</h2>
        <p>
          Photoshop&apos;s &quot;Select Subject&quot; + &quot;Remove Background&quot; combo (in
          the Properties panel of any layer) does an excellent job — especially since the
          AI-assisted Subject Selection got rebuilt on Adobe Sensei in 2023. The result is
          comparable to Remove.bg or BgRemove on most photos.
        </p>
        <p>
          The catch: it costs $22.99/month, requires installing a multi-gigabyte app, and
          takes 10-30 seconds per image (open file, select layer, run Subject Select, tweak
          mask, export PNG). For a single fast cutout, BgRemove takes one drag-and-drop and
          two seconds.
        </p>

        <h2>Where Photoshop is non-negotiable</h2>
        <ul>
          <li>
            <strong>Cleanup after the cutout.</strong> If the AI gets the edge wrong, Photoshop
            lets you paint the mask, refine hair with the Refine Edge brush, or use luminosity
            masks for ultra-precise selection. BgRemove gives you the cutout — that&apos;s it.
          </li>
          <li>
            <strong>Compositing.</strong> Putting the subject on a new background with shadows,
            colour matching, and proper light wrapping is what Photoshop is built for.
          </li>
          <li>
            <strong>Anything beyond background removal.</strong> Retouching, dodging and
            burning, frequency separation, content-aware fill — none of that exists in a web
            tool.
          </li>
          <li>
            <strong>Print output.</strong> Photoshop handles CMYK, large-format raster files,
            and pre-press export.
          </li>
        </ul>

        <h2>Where BgRemove wins</h2>
        <ul>
          <li>
            <strong>Speed.</strong> Drag, drop, download. No app to launch, no project to save,
            no subscription to maintain.
          </li>
          <li>
            <strong>Cost.</strong> $0 forever vs $276/year. For occasional cutouts, the maths
            is obvious.
          </li>
          <li>
            <strong>Works on any device.</strong> Phone, tablet, ChromeBook, Linux,
            old laptop — anywhere with a modern browser.
          </li>
          <li>
            <strong>No install.</strong> Photoshop is 5+ GB. BgRemove is a 4 MB AI model that
            caches in your browser.
          </li>
          <li>
            <strong>Bulk processing.</strong> Drop 20 photos at once. Photoshop bulk requires
            recording an Action and writing a script.
          </li>
        </ul>

        <h2>When to pick each</h2>
        <p>
          <strong>Photoshop:</strong> you&apos;re a professional designer, photographer, or
          retoucher. You need pixel-level control. Background removal is just one step in a
          larger workflow. You already pay for Creative Cloud.
        </p>
        <p>
          <strong><Link href="/">BgRemove</Link>:</strong> you need a transparent PNG. That&apos;s
          the whole job. You don&apos;t want to think about it. Could be a profile picture, a
          product photo for a marketplace listing, an image for a slide, a meme.
        </p>

        <h2>The hybrid workflow</h2>
        <p>
          Many designers use BgRemove for the rough cutout (fast), then open the PNG in
          Photoshop only if cleanup is needed. This works well: 80% of cutouts need no
          cleanup at all, and the 20% that do can be polished in 1-2 minutes in Photoshop
          rather than 10-15 minutes building the mask from scratch.
        </p>
        <p>
          For free Photoshop-style cleanup, <a href="https://photopea.com" rel="noopener noreferrer">Photopea</a> is
          a browser-based clone that handles the same jobs.
        </p>

        <h2>Privacy</h2>
        <p>
          Both tools process locally — Photoshop on your desktop, BgRemove in your browser
          memory. Neither uploads your image. (Adobe Cloud sync, if enabled, is a separate
          feature.)
        </p>
      </VsPageLayout>
    </>
  );
}
