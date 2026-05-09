"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { FAQ_ITEMS } from "@/lib/schema";
import { cn } from "@/lib/utils";

export function HomeFaq() {
  const [open, setOpen] = React.useState<number | null>(0);
  return (
    <section className="container py-16 sm:py-24" aria-labelledby="faq-heading">
      <div className="mx-auto max-w-2xl text-center">
        <h2 id="faq-heading" className="text-3xl font-bold tracking-tight sm:text-4xl">
          Frequently asked questions
        </h2>
        <p className="mt-4 text-muted-foreground text-pretty">
          Honest answers about how it works, what&apos;s free, and what stays private.
        </p>
      </div>
      <div className="mx-auto mt-10 max-w-3xl divide-y divide-border rounded-2xl border border-border bg-card">
        {FAQ_ITEMS.map((item, i) => {
          const expanded = open === i;
          return (
            <div key={item.q} className="px-2">
              <button
                type="button"
                onClick={() => setOpen(expanded ? null : i)}
                aria-expanded={expanded}
                className="flex w-full items-center justify-between gap-4 px-4 py-5 text-left transition-colors hover:bg-muted/40 rounded-xl"
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
  );
}
