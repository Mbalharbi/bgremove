import type { Metadata } from "next";
import { LandingPageLayout } from "@/components/landing-page-layout";
import { JsonLd } from "@/components/json-ld";
import { softwareAppSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";

const TITLE = "Free Transparent PNG Maker - Browser-Only, No Signup";
const DESCRIPTION =
  "Turn any photo into a transparent PNG in seconds. Free, unlimited, 100% browser-based. Perfect for design tools, slide decks, web design, and social posts.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE.url}/transparent-png-maker/` },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={softwareAppSchema({
          name: "BgRemove Transparent PNG Maker",
          url: `${SITE.url}/transparent-png-maker/`,
          description:
            "Make a transparent PNG from any photo, free and entirely in your browser.",
        })}
      />
      <LandingPageLayout
        eyebrow="Transparent PNG tool"
        title="Make any photo into a transparent PNG"
        description="Drop a photo, get a transparent PNG. Designed to drop straight into Figma, Canva, Keynote, Google Slides, or any design tool that supports PNG with alpha."
        related={[
          { href: "/blog/transparent-png-from-photo/", label: "Guide: how transparent PNG works" },
          { href: "/portrait-background-remover/", label: "Portrait & headshot tool" },
          { href: "/product-photo-background-remover/", label: "Product photo tool" },
          { href: "/logo-background-remover/", label: "Logo transparent maker" },
        ]}
      >
        <h2>What you get</h2>
        <p>
          A PNG file with the original subject preserved and the background
          replaced by full transparency (alpha = 0). The output dimensions
          match your input (capped at 4096 pixels on the longest edge for
          performance). The file size is typically 100-500 KB for a phone
          photo.
        </p>

        <h2>Where transparent PNGs work</h2>
        <ul>
          <li>
            <strong>Design tools:</strong> Figma, Sketch, Adobe XD, Affinity
            Designer — all import PNG with alpha and let you place the
            cutout on any background.
          </li>
          <li>
            <strong>Slides:</strong> Keynote, Google Slides, PowerPoint —
            transparent PNG is the standard format for slide-ready images.
          </li>
          <li>
            <strong>Web:</strong> Any browser. Use{" "}
            <code>&lt;img src=&quot;cutout.png&quot;&gt;</code> over a
            coloured div, gradient, or background image.
          </li>
          <li>
            <strong>Social:</strong> Instagram, X, TikTok, LinkedIn — all
            accept PNG with alpha and preserve the transparency in posts
            (display backgrounds vary by platform).
          </li>
          <li>
            <strong>Word, Pages, Docs:</strong> Drop a PNG with alpha onto
            any document and it sits cleanly without a white box around it.
          </li>
        </ul>

        <h2>Where transparent PNG doesn&apos;t work</h2>
        <ul>
          <li>
            <strong>JPEG export:</strong> If you save your transparent PNG
            back as JPEG, the alpha is stripped and replaced with white
            (or whatever background colour the export tool uses). Always
            save as PNG to preserve transparency.
          </li>
          <li>
            <strong>Email signatures:</strong> Some email clients
            (especially older Outlook) struggle with PNG alpha and show a
            grey box around the image. For email, often safer to bake
            the background colour in.
          </li>
          <li>
            <strong>Animated formats:</strong> Animated GIF doesn&apos;t
            support smooth transparency. For animated cutouts, use WebP
            or AVIF.
          </li>
        </ul>

        <h2>How transparent PNGs are made</h2>
        <p>
          Every PNG pixel has four channels: red, green, blue, alpha. The
          alpha channel is a number from 0 to 255 saying &quot;how opaque
          is this pixel&quot;. 0 is fully see-through; 255 is fully solid.
          When you drop a PNG with alpha onto a coloured background, the
          alpha = 0 pixels disappear and the background colour shows
          through.
        </p>
        <p>
          Background-removal tools work by running an AI model that
          predicts which pixels are subject and which are background, then
          setting the alpha of the background pixels to 0. Edges get
          partial alpha values (e.g. 128 for a wispy hair pixel) so the
          subject blends smoothly into whatever new background it&apos;s
          placed on.
        </p>

        <h2>What if I want a coloured background?</h2>
        <p>
          A transparent PNG is the universal source. If you need a specific
          background colour permanently baked in, open the PNG in any image
          editor (Figma, Photopea, Pixlr) and add a coloured rectangle
          underneath. Then export as PNG (with the new background) or JPEG.
        </p>
        <p>
          For a one-shot &quot;subject on white&quot; output, the easiest
          path is: cutout here → open in Photopea → Image &gt; Canvas
          Color &gt; White → File &gt; Export As &gt; JPEG. Total time:
          under a minute.
        </p>
      </LandingPageLayout>
    </>
  );
}
