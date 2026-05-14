import Link from "next/link";
import { ArrowRight, BookOpen, FileImage, GitCompare, Scissors, Sliders, Wand2 } from "lucide-react";

interface Group {
  title: string;
  description: string;
  Icon: React.ComponentType<{ className?: string }>;
  links: { href: string; label: string }[];
}

const GROUPS: Group[] = [
  {
    title: "Try the tools",
    description: "Free, browser-only, no signup.",
    Icon: Scissors,
    links: [
      { href: "/", label: "Background remover" },
      { href: "/bulk/", label: "Bulk remover (up to 20 images)" },
      { href: "/tools/image-compressor/", label: "Image compressor" },
      { href: "/tools/image-resizer/", label: "Image resizer with social presets" },
    ],
  },
  {
    title: "Built for a specific job",
    description: "Use-case landing pages with workflow tips.",
    Icon: Wand2,
    links: [
      { href: "/portrait-background-remover/", label: "Portrait & headshot remover" },
      { href: "/product-photo-background-remover/", label: "Product photo remover" },
      { href: "/logo-background-remover/", label: "Logo background remover" },
      { href: "/transparent-png-maker/", label: "Transparent PNG maker" },
      { href: "/screenshot-background-remover/", label: "Screenshot remover" },
    ],
  },
  {
    title: "How it compares",
    description: "Honest comparisons with the major alternatives.",
    Icon: GitCompare,
    links: [
      { href: "/vs/remove-bg/", label: "vs Remove.bg" },
      { href: "/vs/photoshop/", label: "vs Photoshop" },
      { href: "/vs/canva/", label: "vs Canva" },
      { href: "/vs/adobe-express/", label: "vs Adobe Express" },
    ],
  },
  {
    title: "Read the guides",
    description: "Practical how-tos and deep dives.",
    Icon: BookOpen,
    links: [
      { href: "/blog/remove-image-background-browser/", label: "Remove a background in your browser" },
      { href: "/blog/transparent-png-from-photo/", label: "Make a transparent PNG from any photo" },
      { href: "/blog/best-free-background-removers-2026/", label: "5 free background removers tested" },
      { href: "/blog/etsy-shopify-product-photos/", label: "Marketplace product photos in 60s" },
    ],
  },
];

export function HomeRelatedTools() {
  return (
    <section
      className="container py-16 sm:py-20"
      aria-labelledby="related-heading"
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2 id="related-heading" className="text-3xl font-bold tracking-tight sm:text-4xl">
          Everything you can do here
        </h2>
        <p className="mt-4 text-muted-foreground text-pretty">
          BgRemove is more than one button. Tools, use-case landing pages,
          honest comparisons, and practical guides — all browser-only, all free.
        </p>
      </div>

      <div className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2">
        {GROUPS.map(({ title, description, Icon, links }) => (
          <div
            key={title}
            className="rounded-2xl border border-border bg-card/60 p-5 transition-colors hover:border-primary/40 hover:bg-card"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-semibold text-foreground">{title}</h3>
                <p className="text-xs text-muted-foreground">{description}</p>
              </div>
            </div>
            <ul className="mt-4 space-y-1">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center justify-between gap-2 rounded-md px-2 py-1.5 text-sm text-foreground transition-colors hover:bg-primary/5"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 transition-all -translate-x-1 group-hover:translate-x-0 group-hover:opacity-100 group-hover:text-primary" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Aria-hidden visual divider with subtle icon */}
      <div className="mt-10 flex items-center justify-center text-muted-foreground" aria-hidden>
        <Sliders className="h-4 w-4" />
        <FileImage className="ml-2 h-4 w-4" />
      </div>
    </section>
  );
}
