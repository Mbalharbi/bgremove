import Link from "next/link";
import { ArrowRight, Check, Minus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface VsRow {
  feature: string;
  /** false | "partial" | true | string */
  bgremove: boolean | "partial" | string;
  competitor: boolean | "partial" | string;
}

interface VsPageLayoutProps {
  competitorName: string;
  competitorTagline: string;
  title: string;
  description: string;
  verdict: string;
  rows: VsRow[];
  children: React.ReactNode;
  related?: { href: string; label: string }[];
}

function cell(value: boolean | "partial" | string) {
  if (value === true) return <Check className="mx-auto h-5 w-5 text-primary" aria-label="Yes" />;
  if (value === false) return <X className="mx-auto h-5 w-5 text-muted-foreground/60" aria-label="No" />;
  if (value === "partial") return <Minus className="mx-auto h-5 w-5 text-accent" aria-label="Partial" />;
  return <span className="font-mono text-sm">{value}</span>;
}

export function VsPageLayout({
  competitorName,
  competitorTagline,
  title,
  description,
  verdict,
  rows,
  children,
  related,
}: VsPageLayoutProps) {
  return (
    <article>
      <header className="relative overflow-hidden border-b border-border">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-radial-fade" />
        <div className="container relative max-w-4xl py-12 sm:py-16">
          <p className="text-xs font-mono uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            Comparison
          </p>
          <h1 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
            {description}
          </p>

          {/* Verdict callout */}
          <div className="mt-8 rounded-2xl border border-primary/30 bg-primary/5 p-5 sm:p-6">
            <p className="text-xs font-mono uppercase tracking-wider text-primary">
              The honest verdict
            </p>
            <p className="mt-2 text-base text-foreground sm:text-lg">{verdict}</p>
            <Button asChild size="lg" className="mt-4">
              <Link href="/">
                Try BgRemove (free, no signup)
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <section className="container max-w-4xl py-10">
        {/* Comparison table */}
        <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="p-4 text-left font-semibold">Feature</th>
                <th className="p-4 text-center font-semibold text-emerald-700 dark:text-emerald-400">
                  BgRemove
                </th>
                <th className="p-4 text-center font-semibold">{competitorName}</th>
              </tr>
              <tr className="border-b border-border">
                <td colSpan={3} className="p-3 text-center text-xs text-muted-foreground italic">
                  {competitorTagline}
                </td>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={row.feature}
                  className={cn(
                    "border-b border-border last:border-0",
                    i % 2 === 1 && "bg-muted/20"
                  )}
                >
                  <td className="p-4 font-medium text-foreground">{row.feature}</td>
                  <td className="p-4 text-center bg-primary/5">{cell(row.bgremove)}</td>
                  <td className="p-4 text-center">{cell(row.competitor)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="prose prose-slate mt-12 max-w-none dark:prose-invert prose-headings:tracking-tight prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
          {children}
        </div>

        {related && related.length > 0 && (
          <div className="mt-12 rounded-2xl border border-border bg-card/60 p-6">
            <h2 className="mb-4 text-lg font-semibold">More comparisons & guides</h2>
            <ul className="grid gap-2 sm:grid-cols-2">
              {related.map((r) => (
                <li key={r.href}>
                  <Link
                    href={r.href}
                    className="block rounded-lg border border-border bg-background p-3 text-sm transition-colors hover:border-primary/40 hover:bg-primary/5"
                  >
                    {r.label} <ArrowRight className="ml-1 inline h-3 w-3" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </article>
  );
}

/**
 * Schema.org WebApplication "alternativeTo" snippet — helps AI assistants
 * understand BgRemove as an alternative to the named tool.
 */
export function comparisonSchema(opts: {
  competitorName: string;
  competitorUrl: string;
  pageUrl: string;
  bgremoveDescription: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "BgRemove",
    url: "https://bgremovers.org/",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any modern web browser",
    description: opts.bgremoveDescription,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    isAccessibleForFree: true,
    isSimilarTo: {
      "@type": "SoftwareApplication",
      name: opts.competitorName,
      url: opts.competitorUrl,
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": opts.pageUrl },
  };
}
