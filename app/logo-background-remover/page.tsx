import type { Metadata } from "next";
import { LandingPageLayout } from "@/components/landing-page-layout";
import { JsonLd } from "@/components/json-ld";
import { softwareAppSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";

const TITLE = "Logo Background Remover - Make Any Logo Transparent (Free)";
const DESCRIPTION =
  "Make your logo transparent so it works on any background. Browser-only processing means your unreleased branding stays private. Free, no signup, no watermark.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE.url}/logo-background-remover/` },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={softwareAppSchema({
          name: "BgRemove Logo Background Remover",
          url: `${SITE.url}/logo-background-remover/`,
          description:
            "Remove the background from any logo and download as a transparent PNG.",
        })}
      />
      <LandingPageLayout
        eyebrow="Branding & logos"
        title="Make any logo transparent"
        description="Drop a logo from a slide, a screenshot, or a PDF — get a transparent PNG that works on any background. The AI keeps edges clean even on text-heavy marks."
        related={[
          { href: "/transparent-png-maker/", label: "Generic transparent PNG maker" },
          { href: "/blog/transparent-png-from-photo/", label: "PNG vs SVG vs WebP for logos" },
          { href: "/", label: "Generic background remover" },
        ]}
      >
        <h2>Why your logo needs a transparent version</h2>
        <p>
          A logo on a white background looks fine on a white slide. The
          moment you drop it onto a coloured slide, a dark navbar, a
          photo background, or a video overlay, the white box around it
          becomes obvious — and looks unprofessional. A transparent
          version solves this once: place it anywhere, only the logo
          shows.
        </p>

        <h2>PNG vs SVG: which do you need?</h2>
        <p>
          For most uses, <strong>both</strong>. Here&apos;s how to think
          about it:
        </p>
        <ul>
          <li>
            <strong>PNG (raster):</strong> Fixed pixel dimensions. Best for
            slides, social posts, websites where the display size is
            predictable. Works everywhere.
          </li>
          <li>
            <strong>SVG (vector):</strong> Resolution-independent. Stays
            sharp at any size. Best for printing, large-format displays,
            and developer hand-off. Requires the original vector file from
            your designer — you can&apos;t cleanly convert a PNG back to
            SVG.
          </li>
        </ul>
        <p>
          If you only have a raster file (PNG or JPEG of your logo),
          BgRemove turns it into a transparent PNG that works in 99% of
          places. If you need SVG and don&apos;t have one, ask your
          designer or recreate it in a vector tool like Figma or
          Illustrator.
        </p>

        <h2>Tips for clean logo cutouts</h2>
        <ol>
          <li>
            <strong>Use the highest-resolution source you have.</strong> A
            logo screenshot from a slide will look sharper than one
            cropped from a thumbnail. Always start with the largest
            available file.
          </li>
          <li>
            <strong>Crop tight.</strong> Less background means fewer edge
            artefacts. Trim the empty space around the logo before
            uploading.
          </li>
          <li>
            <strong>Watch out for thin strokes and small text.</strong>{" "}
            The AI handles bold, solid logos best. Hair-thin scripts and
            6-pixel taglines occasionally lose detail — zoom in on the
            preview to check.
          </li>
          <li>
            <strong>Test on a real background.</strong> A cutout that
            looks fine on the checkered preview can show a faint halo on
            an actual coloured slide. Place the result over your intended
            background to spot fringing early.
          </li>
        </ol>

        <h2>Common scenarios</h2>
        <h3>I have a logo on a white background, need it on dark slides</h3>
        <p>
          Drop the white-background version here, download the transparent
          PNG, place on your dark slide. Done.
        </p>

        <h3>I have a logo with a coloured background, need it on different colours</h3>
        <p>
          Same workflow. The AI removes whatever&apos;s behind the logo
          mark itself.
        </p>

        <h3>I have a screenshot of a logo from a website</h3>
        <p>
          Crop tightly to the logo first (any image viewer can do this),
          then drop the crop in here. The tighter the crop, the cleaner
          the result.
        </p>

        <h3>The logo has a glow or shadow I want to keep</h3>
        <p>
          Glows and shadows are tricky — the AI may treat them as
          background. If keeping them matters, get the original vector
          file or recreate the effect in a design tool after cutout.
        </p>

        <h2>The privacy angle for branding</h2>
        <p>
          Pre-launch logos and unreleased rebrands are some of the most
          sensitive assets a company has. Uploading them to a third-party
          tool — even briefly — risks accidental indexing, leaks via
          employee accounts, or just sitting in someone else&apos;s
          retention window. BgRemove processes your logo entirely in
          your browser; there is no upload step.
        </p>
      </LandingPageLayout>
    </>
  );
}
