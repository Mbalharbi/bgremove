import type { Metadata } from "next";
import Link from "next/link";
import { BlogPostLayout, articleSchema } from "@/components/blog-post-layout";
import { JsonLd } from "@/components/json-ld";
import { SITE } from "@/lib/site";

const SLUG = "transparent-png-from-photo";
const TITLE = "How to Make a Transparent PNG from Any Photo";
const DESCRIPTION =
  "A clear guide to turning any photo into a transparent PNG — what transparency means, why JPEG won't do, and the fastest browser-only workflow that doesn't require Photoshop.";
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
        readingMinutes={5}
        related={[
          { href: "/blog/remove-image-background-browser/", label: "Remove a background in your browser" },
          { href: "/transparent-png-maker/", label: "Transparent PNG maker (one-click tool)" },
          { href: "/logo-background-remover/", label: "Make your logo transparent" },
        ]}
      >
        <p className="lead">
          A &quot;transparent PNG&quot; is just a PNG image where the background
          pixels are see-through instead of being filled with a colour. Drop one
          into a slide, a video, a website, or a design — and only the subject
          appears. Here&apos;s how to make one in under a minute.
        </p>

        <h2>What &quot;transparent&quot; actually means</h2>
        <p>
          Every pixel in an image has a colour. PNG (and WebP) files have an
          extra channel called <em>alpha</em> that says how opaque each pixel
          is — 0 means fully see-through, 255 means fully solid. When alpha is
          0, the pixel underneath shows through.
        </p>
        <p>
          JPEG files don&apos;t have an alpha channel. That&apos;s why if you
          try to &quot;remove the background&quot; from a JPEG and save it back
          as JPEG, you end up with a white or black background where the
          transparency should be. Always save cutouts as PNG (or WebP, if file
          size matters and your destination supports it).
        </p>

        <h2>The fastest workflow</h2>
        <ol>
          <li>
            Open <Link href="/">bgremovers.org</Link>.
          </li>
          <li>Drag your photo onto the upload zone.</li>
          <li>
            The browser-based AI removes the background in 2-3 seconds and
            shows a before/after slider over a checkered preview (the
            checkerboard is the visual convention for transparency).
          </li>
          <li>
            Click <strong>Download PNG</strong>. You get a transparent PNG with
            the original dimensions.
          </li>
        </ol>

        <p>
          No account, no upload, no watermark, no monthly limit. The model
          downloads once (~4&nbsp;MB) and is cached forever in your browser.
        </p>

        <h2>Common mistakes</h2>
        <h3>Saving back as JPEG</h3>
        <p>
          The most common &quot;why doesn&apos;t my transparency work?&quot;
          question. JPEG strips alpha. If you compress your transparent PNG to
          save space, use the WebP format instead — it preserves alpha and
          shrinks file size by 30-50%. The{" "}
          <Link href="/tools/image-compressor/">image compressor</Link> on this
          site offers WebP as one of its three formats.
        </p>

        <h3>Putting the PNG on a coloured background and being surprised</h3>
        <p>
          A transparent PNG isn&apos;t magic — it just lacks a background. When
          you place it on a coloured slide or webpage, the colour shows through
          where the alpha is 0. If you need a specific background colour
          permanently baked into the file, do that in your design tool (or open
          the PNG in <a href="https://photopea.com" rel="noopener noreferrer">Photopea</a>{" "}
          and add a colour layer underneath).
        </p>

        <h3>Hair edges look soft and weird</h3>
        <p>
          Soft hair edges are real — they should have semi-transparent pixels
          (alpha values between 0 and 255). When you place the PNG on a
          background that contrasts strongly with the original, you&apos;ll
          sometimes see a faint &quot;halo&quot; of the old background around
          the hair. This is called <em>colour fringing</em>. Two fixes:
        </p>
        <ul>
          <li>
            Pick a new background colour that&apos;s close to the original
            (e.g. if the photo was taken on a white wall and you&apos;re placing
            it on a light grey slide, you&apos;ll never notice).
          </li>
          <li>
            Open the PNG in Photopea, add a 1-pixel inner stroke matching the
            new background colour, and the halo disappears.
          </li>
        </ul>

        <h2>When PNG is the wrong format</h2>
        <p>
          For logos and icons that need to scale to any size without pixelation,
          consider <strong>SVG</strong> instead. PNG is raster — it has fixed
          pixel dimensions. Scale it up too much and it gets blurry. SVG is
          vector — it stays sharp at any size. If your logo was originally a
          vector file, ask your designer for the SVG; if it was originally a
          photograph, PNG with transparency is your best bet.
        </p>
        <p>
          For animations and short clips, use <strong>WebP</strong> or{" "}
          <strong>AVIF</strong> animated formats — both support transparency and
          are far more efficient than animated GIF (which doesn&apos;t support
          partial transparency at all).
        </p>

        <h2>What to do next</h2>
        <p>
          If you have one cutout to make, the{" "}
          <Link href="/transparent-png-maker/">transparent PNG maker</Link>{" "}
          page is the one-click tool. If you have a batch (product catalogues,
          headshots for a directory, sticker packs), the{" "}
          <Link href="/bulk/">bulk processor</Link> handles up to 20 at once
          and packages them as a ZIP.
        </p>
      </BlogPostLayout>
    </>
  );
}
