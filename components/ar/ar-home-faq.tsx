"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface ArHomeFaqProps {
  items: ReadonlyArray<{ q: string; a: string }>;
}

export function ArHomeFaq({ items }: ArHomeFaqProps) {
  const [open, setOpen] = React.useState<number | null>(0);
  return (
    <section className="container py-16 sm:py-24" aria-labelledby="ar-faq-heading">
      <div className="mx-auto max-w-2xl text-center">
        <h2 id="ar-faq-heading" className="text-3xl font-bold tracking-tight sm:text-4xl">
          الأسئلة الشائعة
        </h2>
        <p className="mt-4 text-muted-foreground text-pretty">
          إجابات صريحة عن كيفية عمل الأداة، ما المجاني، وما الذي يبقى خاصاً.
        </p>
      </div>
      <div className="mx-auto mt-10 max-w-3xl divide-y divide-border rounded-2xl border border-border bg-card">
        {items.map((item, i) => {
          const expanded = open === i;
          return (
            <div key={item.q} className="px-2">
              <button
                type="button"
                onClick={() => setOpen(expanded ? null : i)}
                aria-expanded={expanded}
                className="flex w-full items-center justify-between gap-4 px-4 py-5 text-right transition-colors hover:bg-muted/40 rounded-xl"
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
                <div className="px-4 pb-5 text-sm text-muted-foreground animate-fade-in">{item.a}</div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
