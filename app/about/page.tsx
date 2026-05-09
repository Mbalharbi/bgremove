import type { Metadata } from "next";
import Link from "next/link";
import { Lock, Sparkles, Zap, Code2 } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About BgRemove - The Browser-Native Background Remover",
  description:
    "BgRemove is a free, browser-only background remover that processes your photos on your own device. No accounts, no uploads, no surveillance.",
  alternates: { canonical: `${SITE.url}/about` },
};

const PRINCIPLES = [
  {
    Icon: Lock,
    title: "Privacy by architecture",
    body: "We can't see your photos because they never reach us. The AI model lives in your browser.",
  },
  {
    Icon: Zap,
    title: "Speed first",
    body: "No upload queue, no rate limits. The only bottleneck is your device — usually 2-3 seconds per image.",
  },
  {
    Icon: Sparkles,
    title: "Free forever",
    body: "No watermark, no credits, no signup wall. Ads keep the lights on, but the tool itself stays free.",
  },
  {
    Icon: Code2,
    title: "Open standards",
    body: "Built on MediaPipe, Canvas, and WebAssembly — open web tech that works everywhere.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="A background remover that respects your photos"
        description="Most online tools upload your images to a server. We don't. BgRemove runs the AI model entirely in your browser, so your photos never leave your device — full stop."
      />
      <section className="container py-12">
        <div className="prose prose-slate max-w-none dark:prose-invert">
          <p className="text-lg text-pretty text-muted-foreground">
            BgRemove started with a simple frustration: every &quot;free&quot; background remover
            either watermarked the result, capped you at three images a day, or required uploading
            your photos to someone else&apos;s servers. We thought: the AI is small enough to run in a
            browser tab. Why not just do that?
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {PRINCIPLES.map(({ Icon, title, body }) => (
            <div
              key={title}
              className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/40"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <h2 className="mt-3 text-lg font-semibold">{title}</h2>
              <p className="mt-1.5 text-sm text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-primary/30 bg-primary/5 p-6 sm:p-8">
          <h2 className="text-xl font-semibold">Try it now</h2>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            Drop in a photo and see for yourself — no signup, no upload, no waiting.
          </p>
          <Button asChild size="lg" className="mt-4">
            <Link href="/">Open the tool →</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
