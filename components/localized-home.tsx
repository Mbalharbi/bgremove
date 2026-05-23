"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowRight,
  ChevronDown,
  Cpu,
  Download,
  ImagePlus,
  Lock,
  Sparkles,
  Zap,
} from "lucide-react";
import { BgRemover } from "@/components/bg-remover";
import { cn } from "@/lib/utils";

interface Step { title: string; description: string }
interface UseCase { title: string; description: string; href: string }
interface FAQ { q: string; a: string }

interface LocalizedHomeProps {
  /** Hero badge above the h1 (e.g. "100% free AI runs in your browser"). */
  badge: string;
  /** Hero h1. */
  title: string;
  /** Optional gradient-highlighted suffix to the h1. */
  titleHighlight?: string;
  /** Hero paragraph. */
  subtitle: string;
  /** Trust pills under the tool. */
  trustPills: { icon: "lock" | "zap" | "sparkles"; label: string }[];
  /** "How it works" section. */
  howTitle: string;
  howSubtitle: string;
  howStepLabel: string;
  steps: ReadonlyArray<Step>;
  /** "Use cases" section. */
  useCasesTitle: string;
  useCasesSubtitle: string;
  useCases: ReadonlyArray<UseCase>;
  /** FAQ section. */
  faqTitle: string;
  faqSubtitle: string;
  faqs: ReadonlyArray<FAQ>;
  /** CTA section. */
  ctaTitle: string;
  ctaSubtitle: string;
  ctaButton: string;
  /** Whether to render with RTL alignment (Arabic). */
  dir?: "ltr" | "rtl";
}

const STEP_ICONS = [ImagePlus, Cpu, Download];

function pickIcon(name: "lock" | "zap" | "sparkles") {
  if (name === "lock") return Lock;
  if (name === "zap") return Zap;
  return Sparkles;
}

export function LocalizedHome(props: LocalizedHomeProps) {
  const {
    badge, title, titleHighlight, subtitle, trustPills,
    howTitle, howSubtitle, howStepLabel, steps,
    useCasesTitle, useCasesSubtitle, useCases,
    faqTitle, faqSubtitle, faqs,
    ctaTitle, ctaSubtitle, ctaButton,
    dir = "ltr",
  } = props;
  const [open, setOpen] = React.useState<number | null>(0);
  const rtl = dir === "rtl";

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-radial-fade" />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_60%_40%_at_50%_0%,black,transparent)]" />
        <div className="container relative pt-12 pb-16 sm:pt-20 sm:pb-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              <span>{badge}</span>
            </div>
            <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              {title}
              {titleHighlight ? (
                <>
                  {" "}
                  <span className="bg-gradient-to-l from-primary to-emerald-400 bg-clip-text text-transparent">
                    {titleHighlight}
                  </span>
                </>
              ) : null}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
              {subtitle}
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-3xl animate-fade-in">
            <BgRemover />
          </div>

          <div className="mx-auto mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
            {trustPills.map((pill) => {
              const Icon = pickIcon(pill.icon);
              return (
                <div key={pill.label} className="inline-flex items-center gap-2">
                  <Icon className="h-4 w-4 text-primary" />
                  {pill.label}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="container py-16 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{howTitle}</h2>
          <p className="mt-4 text-muted-foreground text-pretty">{howSubtitle}</p>
        </div>
        <ol className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
          {steps.map((step, i) => {
            const Icon = STEP_ICONS[i];
            return (
              <li
                key={step.title}
                className="relative rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/40 hover:shadow-md"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <p className="font-mono text-xs uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
                  {howStepLabel} {i + 1}
                </p>
                <h3 className="mt-1 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
              </li>
            );
          })}
        </ol>
      </section>

      {/* USE CASES */}
      <section className="container py-16 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{useCasesTitle}</h2>
          <p className="mt-4 text-muted-foreground text-pretty">{useCasesSubtitle}</p>
        </div>
        <ul className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {useCases.map(({ title: uTitle, description, href }) => (
            <li key={uTitle}>
              <Link
                href={href}
                className="group flex h-full items-start gap-3 rounded-xl border border-border bg-card/60 p-4 transition-colors hover:border-primary/40 hover:bg-card"
              >
                <div className="flex-1">
                  <h3 className="flex items-center justify-between gap-2 font-semibold text-foreground">
                    <span>{uTitle}</span>
                    <ArrowRight className="h-4 w-4 shrink-0 translate-x-1 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100 group-hover:text-primary rtl:rotate-180" />
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{description}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* FAQ */}
      <section className="container py-16 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{faqTitle}</h2>
          <p className="mt-4 text-muted-foreground text-pretty">{faqSubtitle}</p>
        </div>
        <div className="mx-auto mt-10 max-w-3xl divide-y divide-border rounded-2xl border border-border bg-card">
          {faqs.map((item, i) => {
            const expanded = open === i;
            return (
              <div key={item.q} className="px-2">
                <button
                  type="button"
                  onClick={() => setOpen(expanded ? null : i)}
                  aria-expanded={expanded}
                  className={cn(
                    "flex w-full items-center justify-between gap-4 px-4 py-5 transition-colors hover:bg-muted/40 rounded-xl",
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
                  <div className="px-4 pb-5 text-sm text-muted-foreground animate-fade-in">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="container pb-16">
        <div className="mx-auto max-w-3xl rounded-2xl border border-primary/30 bg-primary/5 p-8 text-center sm:p-12">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{ctaTitle}</h2>
          <p className="mt-3 text-muted-foreground">{ctaSubtitle}</p>
          <Link
            href="#main"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-sm transition-all hover:bg-brand-dark hover:shadow-md hover:shadow-primary/20"
          >
            {ctaButton}
            <ArrowRight className="h-4 w-4 rtl:rotate-180" />
          </Link>
        </div>
      </section>
    </>
  );
}
