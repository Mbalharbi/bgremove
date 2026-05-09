import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BlogPostLayoutProps {
  title: string;
  description: string;
  date: string; // ISO YYYY-MM-DD
  readingMinutes: number;
  children: React.ReactNode;
  related?: { href: string; label: string }[];
}

export function BlogPostLayout({
  title,
  description,
  date,
  readingMinutes,
  children,
  related,
}: BlogPostLayoutProps) {
  const displayDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article>
      <header className="relative overflow-hidden border-b border-border">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-radial-fade" />
        <div className="container relative max-w-3xl py-10 sm:py-16">
          <Link
            href="/blog/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            All posts
          </Link>
          <h1 className="mt-5 text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
            {description}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {displayDate}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {readingMinutes} min read
            </span>
          </div>
        </div>
      </header>

      <section className="container max-w-3xl py-10">
        <div className="prose prose-slate max-w-none dark:prose-invert prose-headings:tracking-tight prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
          {children}
        </div>

        <div className="mt-12 rounded-2xl border border-primary/30 bg-primary/5 p-6 sm:p-8">
          <h2 className="text-xl font-semibold">Try it yourself</h2>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            Drop any photo into BgRemove and get a transparent PNG in seconds —
            free, browser-only, no signup.
          </p>
          <Button asChild size="lg" className="mt-4">
            <Link href="/">
              Open the tool
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {related && related.length > 0 && (
          <div className="mt-12">
            <h2 className="text-lg font-semibold">Related guides</h2>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {related.map((r) => (
                <li key={r.href}>
                  <Link
                    href={r.href}
                    className="block rounded-lg border border-border bg-card/60 p-3 text-sm transition-colors hover:border-primary/40 hover:bg-card"
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

export function articleSchema(opts: {
  title: string;
  description: string;
  slug: string;
  date: string;
  siteUrl: string;
  authorName: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    datePublished: opts.date,
    dateModified: opts.date,
    author: { "@type": "Organization", name: opts.authorName },
    publisher: {
      "@type": "Organization",
      name: opts.authorName,
      logo: { "@type": "ImageObject", url: `${opts.siteUrl}/icon-512.png` },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${opts.siteUrl}/blog/${opts.slug}/`,
    },
    image: `${opts.siteUrl}/og-image.png`,
  };
}
