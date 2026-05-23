import Link from "next/link";
import { ArrowRight, Lock, Sparkles, Zap } from "lucide-react";
import { BgRemover } from "@/components/bg-remover";
import { Button } from "@/components/ui/button";

interface ArLandingPageLayoutProps {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
  related?: { href: string; label: string }[];
}

/**
 * RTL/Arabic mirror of LandingPageLayout. Same structure, Arabic copy for
 * trust pills + related-links heading + back link. The BgRemover tool UI
 * remains English (single shared component) — only the marketing chrome
 * is localized.
 */
export function ArLandingPageLayout({
  eyebrow,
  title,
  description,
  children,
  related,
}: ArLandingPageLayoutProps) {
  return (
    <>
      <section className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-radial-fade" />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_60%_40%_at_50%_0%,black,transparent)]" />
        <div className="container relative pt-12 pb-12 sm:pt-20 sm:pb-16">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              <span>{eyebrow}</span>
            </div>
            <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              {title}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
              {description}
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-3xl animate-fade-in">
            <BgRemover />
          </div>

          <div className="mx-auto mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
            <div className="inline-flex items-center gap-2">
              <Lock className="h-4 w-4 text-primary" />
              يعمل في المتصفح بالكامل
            </div>
            <div className="inline-flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              لا رفع للخوادم
            </div>
            <div className="inline-flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              مجاني للأبد
            </div>
          </div>
        </div>
      </section>

      <section className="container max-w-3xl py-12">
        <div className="prose prose-slate max-w-none text-right dark:prose-invert prose-headings:tracking-tight prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
          {children}
        </div>

        {related && related.length > 0 && (
          <div className="mt-12 rounded-2xl border border-border bg-card/60 p-6">
            <h2 className="mb-4 text-lg font-semibold text-right">أدوات ودلائل ذات صلة</h2>
            <ul className="grid gap-2 sm:grid-cols-2">
              {related.map((r) => (
                <li key={r.href}>
                  <Link
                    href={r.href}
                    className="block rounded-lg border border-border bg-background p-3 text-sm transition-colors hover:border-primary/40 hover:bg-primary/5 text-right"
                  >
                    {r.label} <ArrowRight className="mr-1 inline h-3 w-3 rtl:rotate-180" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-12 flex justify-center">
          <Button asChild variant="outline">
            <Link href="/ar">
              العودة لجميع الأدوات <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
