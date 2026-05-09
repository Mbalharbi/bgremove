import type { Metadata } from "next";
import { LandingPageLayout } from "@/components/landing-page-layout";
import { JsonLd } from "@/components/json-ld";
import { softwareAppSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";

const TITLE = "Remove Background from Screenshots - Free Browser Tool";
const DESCRIPTION =
  "Cut subjects out of screenshots cleanly — for tutorials, support tickets, blog posts, or memes. Browser-only, no upload, no signup, no watermark.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE.url}/screenshot-background-remover/` },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={softwareAppSchema({
          name: "BgRemove Screenshot Background Remover",
          url: `${SITE.url}/screenshot-background-remover/`,
          description:
            "Remove the background from any screenshot — UI, app, or web — entirely in your browser.",
        })}
      />
      <LandingPageLayout
        eyebrow="Screenshots & UI"
        title="Cut subjects out of any screenshot"
        description="Whether you&apos;re writing a tutorial, building a portfolio, or making a meme — drop the screenshot in, get a transparent cutout to drop into your design."
        related={[
          { href: "/transparent-png-maker/", label: "Transparent PNG maker" },
          { href: "/blog/transparent-png-from-photo/", label: "Guide: when transparent PNG is the right choice" },
          { href: "/", label: "Generic background remover" },
        ]}
      >
        <h2>Common screenshot use cases</h2>
        <ul>
          <li>
            <strong>Tutorial blog posts.</strong> Cut out a UI element and
            place it on a coloured callout background to highlight a feature.
          </li>
          <li>
            <strong>Portfolio mock-ups.</strong> Put a screenshot of your work
            on a designed background instead of the raw browser chrome.
          </li>
          <li>
            <strong>Support tickets and bug reports.</strong> Highlight just
            the broken element by removing the rest of the page around it.
          </li>
          <li>
            <strong>Slide decks.</strong> Place an app screenshot on a slide
            without the white browser frame standing out against your slide
            background.
          </li>
          <li>
            <strong>Social posts and memes.</strong> Cut a person, character,
            or UI element from a screenshot and drop into a new scene.
          </li>
        </ul>

        <h2>Tips for screenshot cutouts</h2>
        <p>
          The AI behind BgRemove is trained on people, so cutting a person
          out of a video-call screenshot or stream still works well. UI
          elements (windows, buttons, modals) are harder — the model has no
          built-in concept of &quot;a Mac window&quot;. Practical workarounds:
        </p>
        <ol>
          <li>
            <strong>Crop tightly first.</strong> If you want just one button
            or one card from a complex UI screenshot, crop manually in any
            image viewer before dropping in here. The model has less to
            misinterpret.
          </li>
          <li>
            <strong>Use a contrasting wallpaper.</strong> When taking the
            screenshot, set your desktop background to something that
            contrasts strongly with the foreground window. The model finds
            window edges easier when the background is visually distinct.
          </li>
          <li>
            <strong>For UI elements specifically, consider Photopea
            instead.</strong> A free browser-based Photoshop clone with
            magic-wand and quick-select tools that handle hard UI edges
            better than a person-trained model.
          </li>
        </ol>

        <h2>Cutting people out of video-call screenshots</h2>
        <p>
          One of the cleanest use cases. Zoom or Meet screenshots already
          have a person against a (sometimes blurred) background — exactly
          what the model is trained on. Drop the screenshot in, get a clean
          headshot cutout in 2-3 seconds, place over any background.
        </p>
        <p>
          Use cases: speaker bios from podcast recordings, social posts
          announcing a new hire, event recaps with attendee headshots — all
          without scheduling a real headshot session.
        </p>

        <h2>The privacy point for screenshots</h2>
        <p>
          Screenshots often contain sensitive information — internal Slack
          channels, customer data, in-progress designs, account dashboards.
          Uploading those to a third-party background-removal service
          creates an unnecessary leak risk. Browser-only processing
          eliminates it: the screenshot is read into your browser&apos;s
          memory, processed by a local AI model, and never sent over the
          network.
        </p>
        <p>
          You can verify this yourself: open Chrome DevTools, switch to the
          Network tab, drop a screenshot in. You&apos;ll see no outgoing
          image data — only the initial download of the AI model from a
          public CDN.
        </p>
      </LandingPageLayout>
    </>
  );
}
