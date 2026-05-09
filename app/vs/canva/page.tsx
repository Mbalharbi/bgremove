import type { Metadata } from "next";
import Link from "next/link";
import { VsPageLayout, comparisonSchema, type VsRow } from "@/components/vs-page-layout";
import { JsonLd } from "@/components/json-ld";
import { SITE } from "@/lib/site";

const COMPETITOR = "Canva";
const PAGE_URL = `${SITE.url}/vs/canva/`;
const TITLE = "BgRemove vs Canva Background Remover: Free vs Pro-Only";
const DESCRIPTION =
  "Canva's background remover is locked behind Canva Pro ($14.99/mo). BgRemove is a free, browser-only standalone tool. Here's the honest tradeoff between integration and price.";

const ROWS: VsRow[] = [
  { feature: "Background remover access", bgremove: "free", competitor: "Pro only ($14.99/mo)" },
  { feature: "Account / signup required", bgremove: false, competitor: true },
  { feature: "Photos uploaded to a server", bgremove: false, competitor: true },
  { feature: "Output: transparent PNG", bgremove: true, competitor: true },
  { feature: "Bulk processing (free)", bgremove: "20 per batch", competitor: false },
  { feature: "Built-in design editor", bgremove: false, competitor: true },
  { feature: "Templates / stock library", bgremove: false, competitor: true },
  { feature: "Team collaboration", bgremove: false, competitor: true },
  { feature: "Speed per cutout", bgremove: "2-3s", competitor: "4-6s" },
  { feature: "Cost (10 cutouts / month)", bgremove: "$0", competitor: "$14.99" },
  { feature: "Cost (1000 cutouts / month)", bgremove: "$0", competitor: "$14.99" },
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
          competitorUrl: "https://www.canva.com",
          pageUrl: PAGE_URL,
          bgremoveDescription:
            "Free, browser-only background remover. No Canva Pro subscription needed.",
        })}
      />
      <VsPageLayout
        competitorName={COMPETITOR}
        competitorTagline="Canva — design platform · BG remover behind Canva Pro paywall"
        title="BgRemove vs Canva"
        description="Both can produce a transparent PNG. The difference: Canva's tool is one feature in a $14.99/month subscription; BgRemove is the only feature, and it's free forever."
        verdict="Pick Canva if you're already paying for Canva Pro and you want the cutout to flow straight into a slide deck or social post. Pick BgRemove if you just need the PNG and don't want to start a subscription for one feature."
        rows={ROWS}
        related={[
          { href: "/vs/remove-bg", label: "BgRemove vs Remove.bg" },
          { href: "/vs/photoshop", label: "BgRemove vs Photoshop" },
          { href: "/vs/adobe-express", label: "BgRemove vs Adobe Express" },
        ]}
      >
        <h2>The short version</h2>
        <p>
          Canva is a design platform. The background remover is a feature inside it,
          accessible only to Canva Pro subscribers ($14.99/month or $119.99/year). For an
          existing Canva Pro user, it&apos;s a one-click button inside the editor — the
          cutout drops straight into your design. Quality is comparable to Remove.bg.
        </p>
        <p>
          BgRemove is a standalone browser tool. It does one thing — produce a transparent
          PNG — for free, without a signup, without a subscription. You then take the PNG
          into whatever design tool you already use (Canva free tier, Figma, Keynote, Google
          Slides, anywhere).
        </p>

        <h2>Where Canva wins</h2>
        <ul>
          <li>
            <strong>Workflow integration.</strong> If your final destination is a Canva
            design, removing the background inside Canva saves the export-import step.
          </li>
          <li>
            <strong>Magic Edit and other AI tools.</strong> Canva Pro bundles many AI features
            (object removal, image expand, text generation). The background remover is just
            one of many.
          </li>
          <li>
            <strong>Templates and stock.</strong> Hundreds of thousands of templates and
            millions of stock photos. BgRemove does none of that.
          </li>
          <li>
            <strong>Team collaboration.</strong> Real-time multi-user editing on shared
            designs. Useful for marketing teams.
          </li>
        </ul>

        <h2>Where BgRemove wins</h2>
        <ul>
          <li>
            <strong>It&apos;s actually free.</strong> Canva&apos;s &quot;free&quot; tier
            doesn&apos;t include the background remover. BgRemove&apos;s free tier is the
            full product.
          </li>
          <li>
            <strong>No signup.</strong> Drop a photo, get a PNG, close the tab. No account,
            no email, no password.
          </li>
          <li>
            <strong>Privacy.</strong> Your photo never leaves your device. Canva uploads to
            their cloud.
          </li>
          <li>
            <strong>Tool-agnostic.</strong> The PNG works in Figma, Keynote, Notion, Slack,
            anywhere. You&apos;re not locked into a single design platform.
          </li>
          <li>
            <strong>Bulk processing.</strong> 20 images per batch with a ZIP download. Canva
            doesn&apos;t batch.
          </li>
        </ul>

        <h2>When to use each</h2>
        <p>
          <strong>Use Canva when:</strong> you&apos;re already a Canva Pro subscriber, your
          design lives entirely in Canva, you want the cutout in the same window as your
          template editor.
        </p>
        <p>
          <strong>Use <Link href="/">BgRemove</Link> when:</strong> you&apos;re on Canva&apos;s
          free tier (or not on Canva at all), you need the PNG for an external tool, you want
          batch processing, or you don&apos;t want to subscribe to a design platform just for
          one cutout.
        </p>

        <h2>The hybrid workflow</h2>
        <p>
          Many users do both: BgRemove for the cutout, then upload the transparent PNG to
          Canva&apos;s free tier as a custom asset. Canva&apos;s free tier accepts PNG with
          alpha — you just lose the &quot;Remove background&quot; button, which you don&apos;t
          need because you already removed it.
        </p>
        <p>
          This workflow gives you Canva&apos;s templates and design tools without the $14.99
          monthly subscription, as long as you don&apos;t need other Pro features
          (Brand Kit, Magic Resize, premium stock).
        </p>

        <h2>Privacy comparison</h2>
        <p>
          Canva uploads your image to their cloud, processes it server-side, and stores it
          in your account library. Standard SaaS terms apply. BgRemove processes everything
          in your browser; nothing is sent over the network.
        </p>

        <h2>Quality</h2>
        <p>
          For most use cases, the cutouts are visually identical. Canva uses an in-house
          model; BgRemove uses Google&apos;s MediaPipe Selfie Segmenter. Both handle
          portraits, product shots, and standard subjects well. For wispy hair on busy
          backgrounds, dedicated tools like Remove.bg still have a slight edge.
        </p>
      </VsPageLayout>
    </>
  );
}
