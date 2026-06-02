"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, Sparkles, Lock, Zap, Check } from "lucide-react";
import { BgRemover } from "@/components/bg-remover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Generic SEO landing page used by all object/platform/comparison routes
 * across every locale. Renders: hero + tool widget + trust pills + 2-3
 * content sections + bullet list + FAQ + related links + back CTA.
 *
 * Pages just pass content as data — keeps individual route files <40 lines
 * and lets us mass-produce SEO landing pages without duplicating layout.
 */

export interface SeoSection { heading: string; body: string }
export interface SeoFaq { q: string; a: string }
export interface SeoRelated { href: string; label: string }

export interface SeoLandingProps {
  eyebrow: string;
  title: string;
  description: string;
  trustPills: { icon: "lock" | "zap" | "sparkles"; label: string }[];
  bullets?: { title: string; body: string }[];
  sections: SeoSection[];
  faqs: SeoFaq[];
  faqTitle: string;
  related?: SeoRelated[];
  relatedTitle: string;
  ctaTitle: string;
  ctaSubtitle: string;
  ctaButton: string;
  ctaHref: string;
  dir?: "ltr" | "rtl";
}

function icon(n: "lock" | "zap" | "sparkles") {
  if (n === "lock") return Lock;
  if (n === "zap") return Zap;
  return Sparkles;
}

export function SeoLanding(props: SeoLandingProps) {
  const {
    eyebrow, title, description, trustPills, bullets, sections,
    faqs, faqTitle, related, relatedTitle,
    ctaTitle, ctaSubtitle, ctaButton, ctaHref, dir = "ltr",
  } = props;
  const [open, setOpen] = React.useState<number | null>(0);
  const rtl = dir === "rtl";
  const textAlign = rtl ? "text-right" : "";

  return (
    <>
      {/* HERO */}
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
            {trustPills.map((p) => {
              const Icon = icon(p.icon);
              return (
                <div key={p.label} className="inline-flex items-center gap-2">
                  <Icon className="h-4 w-4 text-primary" />
                  {p.label}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* BULLETS */}
      {bullets && bullets.length > 0 && (
        <section className="container max-w-4xl pb-12">
          <ul className="grid gap-4 sm:grid-cols-2">
            {bullets.map((b) => (
              <li key={b.title} className="rounded-xl border border-border bg-card p-5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Check className="h-4 w-4" />
                </div>
                <h3 className={cn("mt-3 font-semibold", textAlign)}>{b.title}</h3>
                <p className={cn("mt-1.5 text-sm text-muted-foreground", textAlign)}>{b.body}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* CONTENT SECTIONS */}
      <section className="container max-w-3xl py-6">
        <div className={cn(
          "prose prose-slate max-w-none dark:prose-invert prose-headings:tracking-tight prose-a:text-primary prose-a:no-underline hover:prose-a:underline",
          textAlign,
        )}>
          {sections.map((s) => (
            <div key={s.heading}>
              <h2>{s.heading}</h2>
              {s.body.split("\n\n").map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="container max-w-3xl py-12">
        <h2 className={cn("text-2xl font-bold sm:text-3xl", textAlign)}>{faqTitle}</h2>
        <div className="mt-6 divide-y divide-border rounded-2xl border border-border bg-card">
          {faqs.map((item, i) => {
            const expanded = open === i;
            return (
              <div key={item.q} className="px-2">
                <button
                  type="button"
                  onClick={() => setOpen(expanded ? null : i)}
                  aria-expanded={expanded}
                  className={cn(
                    "flex w-full items-center justify-between gap-4 px-4 py-5 transition-colors hover:bg-muted/40",
                    rtl ? "text-right" : "text-left"
                  )}
                >
                  <span className="font-semibold text-foreground">{item.q}</span>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 shrink-0 text-muted-foreground transition-transform",
                      expanded && "rotate-180 text-primary"
                    )}
                  />
                </button>
                {expanded && (
                  <div className={cn("px-4 pb-5 text-sm text-muted-foreground animate-fade-in", textAlign)}>
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* RELATED */}
      {related && related.length > 0 && (
        <section className="container max-w-3xl pb-12">
          <div className="rounded-2xl border border-border bg-card/60 p-6">
            <h2 className={cn("mb-4 text-lg font-semibold", textAlign)}>{relatedTitle}</h2>
            <ul className="grid gap-2 sm:grid-cols-2">
              {related.map((r) => (
                <li key={r.href}>
                  <Link
                    href={r.href}
                    className={cn(
                      "block rounded-lg border border-border bg-background p-3 text-sm transition-colors hover:border-primary/40 hover:bg-primary/5",
                      textAlign,
                    )}
                  >
                    {r.label} <ArrowRight className="ml-1 inline h-3 w-3 rtl:rotate-180" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="container max-w-3xl pb-16">
        <div className="rounded-2xl border border-primary/30 bg-primary/5 p-8 text-center sm:p-12">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{ctaTitle}</h2>
          <p className="mt-3 text-muted-foreground">{ctaSubtitle}</p>
          <Button asChild size="lg" className="mt-6">
            <Link href={ctaHref}>{ctaButton} <ArrowRight className="h-4 w-4 rtl:rotate-180" /></Link>
          </Button>
        </div>
      </section>
    </>
  );
}

