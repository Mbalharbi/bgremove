import type { Metadata } from "next";
import Link from "next/link";
import { LandingPageLayout } from "@/components/landing-page-layout";
import { JsonLd } from "@/components/json-ld";
import { softwareAppSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";

const TITLE = "Free Portrait Background Remover - Clean Headshots in Seconds";
const DESCRIPTION =
  "Remove the background from any portrait, headshot, or selfie in your browser. Free, unlimited, no signup, no upload — perfect for LinkedIn, profile pictures, and ID photos.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE.url}/portrait-background-remover/` },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={softwareAppSchema({
          name: "BgRemove Portrait Background Remover",
          url: `${SITE.url}/portrait-background-remover/`,
          description:
            "Remove the background from any portrait or headshot in your browser, free.",
        })}
      />
      <LandingPageLayout
        eyebrow="Portrait & headshot tool"
        title="Remove the background from any portrait"
        description="Built for headshots, selfies, and profile pictures. The AI is trained on people, so portraits get the cleanest cutouts on the web — and your photo never leaves your device."
        related={[
          { href: "/", label: "Generic background remover" },
          { href: "/blog/remove-image-background-browser/", label: "How browser-based BG removal works" },
          { href: "/tools/image-resizer/", label: "Resize for LinkedIn / X / Facebook" },
          { href: "/blog/transparent-png-from-photo/", label: "Why transparent PNG (and not JPEG)" },
        ]}
      >
        <h2>Why a dedicated portrait tool?</h2>
        <p>
          The model behind BgRemove (MediaPipe Selfie Segmenter) was trained
          on a massive dataset of people — selfies, professional headshots,
          group photos, fitness shots. It cuts portraits with a precision
          that&apos;s noticeably better than general-purpose object segmentation
          models. Hair detail, jawline edges, glasses, and even partial body
          crops all hold up well.
        </p>

        <h2>What people use it for</h2>
        <ul>
          <li>
            <strong>LinkedIn headshots.</strong> Drop a phone selfie taken
            against any backdrop and put it on a clean white or company-coloured
            background.
          </li>
          <li>
            <strong>Slack, Discord, Notion avatars.</strong> Sharp circular
            avatars need clean cutouts to look professional.
          </li>
          <li>
            <strong>Dating app profiles.</strong> Replace a busy background
            with something neutral, or drop your cutout into a styled scene.
          </li>
          <li>
            <strong>Speaker bios and team pages.</strong> Consistent
            transparent-PNG headshots make a team page look intentional.
          </li>
          <li>
            <strong>ID and passport photos.</strong> Most countries require a
            specific background colour — start with a transparent PNG and add
            the right colour in a design tool.
          </li>
        </ul>

        <h2>Tips for the cleanest portrait cutout</h2>
        <ol>
          <li>
            <strong>Light from the front.</strong> Soft, frontal light avoids
            harsh shadows on the face and hair, which are the two areas the
            model has to work hardest on.
          </li>
          <li>
            <strong>Pick a contrasting background.</strong> Dark hair against
            a white wall, light hair against a dark wall. The model uses
            tonal contrast to find the edge.
          </li>
          <li>
            <strong>Crop above the shoulders.</strong> A standard headshot
            crop gives the model a familiar shape. Full-body and group shots
            still work but quality is more variable.
          </li>
          <li>
            <strong>Avoid hands near the face.</strong> The model sometimes
            mistakes a cheek-resting hand for the background. If possible,
            keep hands clearly separated or out of frame.
          </li>
          <li>
            <strong>Glasses are fine.</strong> The model handles eyewear
            well. Sunglasses occasionally bleed into the cutout — use the
            before/after slider to check.
          </li>
        </ol>

        <h2>Privacy: why this matters for portraits</h2>
        <p>
          A portrait is a piece of personal data. Cloud BG removers store
          your photos for some retention window (Remove.bg says 1 hour;
          others don&apos;t specify). For an internal team headshot or a
          family portrait, you probably don&apos;t want that — even at low
          risk.
        </p>
        <p>
          BgRemove processes your photo entirely in your browser. There is no
          upload step. We&apos;re not promising to delete your photos because
          we never receive them in the first place. Open DevTools, watch the
          Network tab while you upload — you&apos;ll see no outgoing image
          data.
        </p>

        <h2>After the cutout</h2>
        <p>
          For social platforms, drop the transparent PNG into the{" "}
          <Link href="/tools/image-resizer/">image resizer</Link> with a
          one-tap preset for the right dimensions (Instagram square, LinkedIn
          banner, X profile). For ID and passport photos, open the PNG in any
          design tool, add the required background colour as a layer
          underneath, and export.
        </p>
      </LandingPageLayout>
    </>
  );
}
