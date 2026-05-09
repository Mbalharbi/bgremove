import { Lock, Sparkles, Zap } from "lucide-react";
import { BgRemover } from "@/components/bg-remover";

export function HomeHero() {
  return (
    <section className="relative overflow-hidden">
      {/* Decorative background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-radial-fade" />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_60%_40%_at_50%_0%,black,transparent)]" />

      <div className="container relative pt-12 pb-16 sm:pt-20 sm:pb-24">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Now 100% free, browser-based AI</span>
          </div>
          <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Remove Image Backgrounds{" "}
            <span className="bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">
              in Seconds
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
            Free, unlimited, and 100% private — your photos are processed
            entirely in your browser. No uploads, no signup, no watermark.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl animate-fade-in">
          <BgRemover />
        </div>

        <div className="mx-auto mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
          <div className="inline-flex items-center gap-2">
            <Lock className="h-4 w-4 text-primary" />
            100% Browser-Based
          </div>
          <div className="inline-flex items-center gap-2">
            <Zap className="h-4 w-4 text-primary" />
            No Upload to Servers
          </div>
          <div className="inline-flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            Free Forever
          </div>
        </div>
      </div>
    </section>
  );
}
