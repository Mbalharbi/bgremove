import type { Metadata } from "next";
import Link from "next/link";
import { BlogPostLayout, articleSchema } from "@/components/blog-post-layout";
import { JsonLd } from "@/components/json-ld";
import { SITE } from "@/lib/site";

const SLUG = "best-free-background-removers-2026";
const TITLE = "Best Free Background Removers in 2026: 5 Tools, Honestly Compared";
const DESCRIPTION =
  "An honest, hands-on comparison of five free background removers — Remove.bg, Adobe Express, Canva, Photopea, and BgRemove — covering quality, privacy, limits, and which one to pick when.";
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
        readingMinutes={8}
        related={[
          { href: "/blog/remove-image-background-browser/", label: "Remove a background in your browser" },
          { href: "/blog/etsy-shopify-product-photos/", label: "Background removal for Etsy & Shopify" },
        ]}
      >
        <p className="lead">
          The market for free background removers is crowded, and the
          differences matter — especially around how the &quot;free&quot;
          tier actually behaves and whether your photos leave your device.
          Here&apos;s a no-fluff side-by-side after testing each tool with the
          same set of fifteen images.
        </p>

        <h2>How we tested</h2>
        <p>
          We ran the same fifteen photos through each tool: five portraits
          (varied lighting), five product photos (jewellery, clothing, food),
          and five edge cases (hair detail, glass, semi-transparent objects).
          We measured four things:
        </p>
        <ul>
          <li><strong>Quality</strong> — clean edges, hair detail, no halo</li>
          <li><strong>Privacy</strong> — does the tool upload your photo, and if so, what&apos;s its retention policy</li>
          <li><strong>Free tier</strong> — actual hidden limits (count, resolution, watermark)</li>
          <li><strong>Speed</strong> — wall-clock time for one cutout</li>
        </ul>

        <h2>The contenders</h2>

        <h3>1. Remove.bg</h3>
        <p>
          The original AI background remover. Quality is excellent, hair detail
          is genuinely impressive, and the free tier produces full-resolution
          previews and watermark-free 0.25 MP downloads. To get a usable
          high-resolution download you need a paid credit (about $0.20 each in
          packs of 50, or $9/month for a subscription).
        </p>
        <ul>
          <li><strong>Privacy:</strong> Photos uploaded to Kaleido (Vienna). Stated retention: 1 hour.</li>
          <li><strong>Free tier reality:</strong> Preview-quality only. High-res requires payment.</li>
          <li><strong>Speed:</strong> ~5-8 seconds (upload + inference + download)</li>
          <li><strong>Best for:</strong> Single high-stakes images where you&apos;re willing to pay for quality</li>
        </ul>

        <h3>2. Adobe Express</h3>
        <p>
          Backed by Adobe Sensei. Quality is on par with Remove.bg for portraits,
          slightly weaker on hair detail. Free tier is generous — full-resolution
          downloads, no watermark — but you&apos;re funnelled toward an Adobe
          account and the editor itself is heavy.
        </p>
        <ul>
          <li><strong>Privacy:</strong> Adobe cloud. Bound by Adobe&apos;s general terms.</li>
          <li><strong>Free tier reality:</strong> Genuinely free for the BG remover, but the broader app pushes Creative Cloud subscriptions.</li>
          <li><strong>Speed:</strong> ~6-10 seconds</li>
          <li><strong>Best for:</strong> People already in the Adobe ecosystem</li>
        </ul>

        <h3>3. Canva</h3>
        <p>
          The BG remover is locked behind Canva Pro ($15/month), so it&apos;s not
          really &quot;free&quot;. There&apos;s a 30-day trial, but you have to
          enter a card. Quality is good — equal to Remove.bg in our tests — and
          the integration with Canva&apos;s design tools is excellent if
          you&apos;re already using Canva.
        </p>
        <ul>
          <li><strong>Privacy:</strong> Canva cloud. Standard SaaS terms.</li>
          <li><strong>Free tier reality:</strong> Not free unless you count the trial.</li>
          <li><strong>Speed:</strong> ~4-6 seconds</li>
          <li><strong>Best for:</strong> Existing Canva Pro subscribers</li>
        </ul>

        <h3>4. Photopea</h3>
        <p>
          Photopea is a free, browser-based Photoshop clone. It includes a
          &quot;Remove Background&quot; AI tool that runs in the browser
          (similar architecture to BgRemove) plus a full pixel editor for
          cleanup. Quality is solid but the UI has a learning curve — it&apos;s
          a Photoshop, not a one-click tool.
        </p>
        <ul>
          <li><strong>Privacy:</strong> Browser-only inference. No upload.</li>
          <li><strong>Free tier reality:</strong> Genuinely free with optional ads.</li>
          <li><strong>Speed:</strong> ~5-8 seconds (no network, but heavier UI)</li>
          <li><strong>Best for:</strong> Designers who need to clean up the cutout afterward</li>
        </ul>

        <h3>5. BgRemove (this site)</h3>
        <p>
          Browser-based, free, no signup, no watermark, no daily limit. Uses
          MediaPipe Selfie Segmenter (the same model class as Photopea&apos;s
          remover). Quality is best on portraits and selfies; products and
          objects work but are hit-or-miss. The differentiator is privacy and
          speed — there&apos;s literally no upload step.
        </p>
        <ul>
          <li><strong>Privacy:</strong> Photos never leave the browser. We can&apos;t see them; the architecture makes it impossible.</li>
          <li><strong>Free tier reality:</strong> Truly unlimited, no signup, no watermark.</li>
          <li><strong>Speed:</strong> ~2-3 seconds per image after the first run</li>
          <li><strong>Best for:</strong> Privacy-sensitive workflows, bulk processing, anyone tired of credit limits</li>
        </ul>

        <h2>Side-by-side summary</h2>
        <div className="not-prose overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="p-3 text-left font-semibold">Tool</th>
                <th className="p-3 text-left">Privacy</th>
                <th className="p-3 text-left">Free tier</th>
                <th className="p-3 text-left">Speed</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-border"><td className="p-3 font-medium">Remove.bg</td><td className="p-3">Cloud, 1h retention</td><td className="p-3">Preview only</td><td className="p-3">5-8s</td></tr>
              <tr className="border-t border-border bg-muted/20"><td className="p-3 font-medium">Adobe Express</td><td className="p-3">Adobe cloud</td><td className="p-3">Genuinely free</td><td className="p-3">6-10s</td></tr>
              <tr className="border-t border-border"><td className="p-3 font-medium">Canva</td><td className="p-3">Canva cloud</td><td className="p-3">Pro subscribers only</td><td className="p-3">4-6s</td></tr>
              <tr className="border-t border-border bg-muted/20"><td className="p-3 font-medium">Photopea</td><td className="p-3">Browser-only</td><td className="p-3">Free with ads</td><td className="p-3">5-8s</td></tr>
              <tr className="border-t border-border"><td className="p-3 font-medium text-primary">BgRemove</td><td className="p-3 text-primary">Browser-only</td><td className="p-3 text-primary">Truly unlimited</td><td className="p-3 text-primary">2-3s</td></tr>
            </tbody>
          </table>
        </div>

        <h2>Which one to pick</h2>
        <ul>
          <li>
            <strong>One important photo, willing to pay for the absolute best
            hair detail:</strong> Remove.bg paid tier.
          </li>
          <li>
            <strong>You&apos;re already in Canva Pro or Adobe Creative Cloud:</strong>{" "}
            use what&apos;s built in.
          </li>
          <li>
            <strong>You need to clean up the cutout afterward in a real pixel
            editor:</strong> Photopea — same browser, same workflow.
          </li>
          <li>
            <strong>Bulk work, privacy-sensitive content, or just tired of
            signups:</strong> <Link href="/">BgRemove</Link> — process up to
            20 at once, no upload, no account.
          </li>
        </ul>

        <p>
          The honest take: for portraits and bulk work, browser-based tools
          (Photopea or BgRemove) are now competitive with the paid cloud
          options on quality, and dramatically better on privacy and cost. For
          edge cases like fly-away hair on a complex background, Remove.bg
          paid still has a slight edge — but you&apos;re paying for it, both
          in money and in privacy.
        </p>
      </BlogPostLayout>
    </>
  );
}
