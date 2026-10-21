import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The rules of the road for using BgRemove. Plain language, no surprises.",
  alternates: { canonical: `${SITE.url}/terms` },
};

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Terms"
        title="Terms of Service"
        description="The agreement between you and BgRemove. We've kept it short and human."
      />
      <section className="container py-10">
        <div className="prose prose-slate max-w-none dark:prose-invert">
          <h2>The deal</h2>
          <p>
            {SITE.name} is a free, browser-based image tool provided as-is. By using it, you agree to
            these terms. If you don&apos;t, please don&apos;t use the site.
          </p>

          <h2>What you can do</h2>
          <ul>
            <li>Use BgRemove for personal projects.</li>
            <li>Process unlimited images.</li>
            <li>
              Use the output (transparent PNGs and re-encoded images), subject to the AI model
              licences described below — please read them before any commercial use.
            </li>
            <li>Embed or link to the site from your own pages.</li>
          </ul>

          <h2>What you can&apos;t do</h2>
          <ul>
            <li>Process images you don&apos;t have permission to use.</li>
            <li>Use the tool to generate or distribute illegal, harmful, or abusive content.</li>
            <li>Attempt to overload, scrape, or attack the service.</li>
            <li>Resell BgRemove as a hosted service without explicit permission.</li>
          </ul>

          <h2>Intellectual property</h2>
          <p>
            <strong>Your images stay yours.</strong> The tools on this website never send us a copy
            of your images, and we claim no rights to your inputs or outputs. Full stop.
          </p>
          <p>
            The BgRemove name, logo, and site code are owned by us. The AI models that run in your
            browser are made by third parties and come with their own licences:
          </p>
          <ul>
            <li>
              <strong>RMBG-1.4</strong> by BRIA AI — the main background-removal model. BRIA licenses
              it for non-commercial use; commercial use requires an agreement with BRIA (see{" "}
              <Link href="https://huggingface.co/briaai/RMBG-1.4">its model page</Link>).
            </li>
            <li>
              <strong>MediaPipe Selfie Segmenter</strong> by Google — the fallback model, under the
              Apache 2.0 licence.
            </li>
          </ul>

          <h2>No warranty</h2>
          <p>
            BgRemove is provided &quot;as is&quot; without warranties of any kind. We don&apos;t
            guarantee the tool will be available, error-free, or produce a particular result. Use
            it at your own risk.
          </p>

          <h2>Limitation of liability</h2>
          <p>
            To the fullest extent permitted by law, we are not liable for any indirect, incidental,
            or consequential damages arising from your use of the site, including loss of data, lost
            profits, or business interruption.
          </p>

          <h2>Changes</h2>
          <p>
            We may update these terms from time to time. Material changes will be noted on this page.
            Continued use after changes means you accept the updated terms.
          </p>

          <h2>Contact</h2>
          <p>
            Questions? Email <Link href={`mailto:${SITE.email}`}>{SITE.email}</Link>.
          </p>

          <p className="text-xs text-muted-foreground">
            Last updated: {new Date().toISOString().split("T")[0]}
          </p>
        </div>
      </section>
    </>
  );
}
