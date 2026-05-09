import { Cpu, Download, ImagePlus } from "lucide-react";
import { HOW_IT_WORKS } from "@/lib/schema";

const ICONS = [ImagePlus, Cpu, Download];

export function HomeHowItWorks() {
  return (
    <section className="container py-16 sm:py-24" aria-labelledby="how-heading">
      <div className="mx-auto max-w-2xl text-center">
        <h2 id="how-heading" className="text-3xl font-bold tracking-tight sm:text-4xl">
          Three steps. Zero friction.
        </h2>
        <p className="mt-4 text-muted-foreground text-pretty">
          No accounts, no installs, no sending your photos to a stranger&apos;s
          server. Just a browser tab and a few seconds.
        </p>
      </div>
      <ol className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
        {HOW_IT_WORKS.map((step, i) => {
          const Icon = ICONS[i];
          return (
            <li
              key={step.title}
              className="relative rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/40 hover:shadow-md"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-6 w-6" />
              </div>
              <p className="font-mono text-xs uppercase tracking-wide text-primary">
                Step {i + 1}
              </p>
              <h3 className="mt-1 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
