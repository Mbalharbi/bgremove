import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { getAllPosts } from "@/lib/blog";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog - Tutorials, Tips, and Updates",
  description:
    "Tutorials and tips on background removal, image editing, and getting the most out of free browser-based tools.",
  alternates: { canonical: `${SITE.url}/blog` },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Tutorials, tips, and product updates"
        description="Practical guides on background removal, image editing, and what you can build with browser-native AI tools."
      />
      <section className="container py-10">
        {posts.length === 0 ? (
          <div className="mx-auto max-w-xl rounded-2xl border border-dashed border-border bg-card/40 p-10 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Mail className="h-6 w-6" />
            </div>
            <h2 className="mt-5 text-xl font-semibold">First posts coming soon</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              We&apos;re writing the first batch right now — guides on getting the cleanest cutouts,
              workflow tips for designers, and how browser-based AI changes the game.
            </p>
            <Button asChild className="mt-5">
              <Link href="/">
                Try the tool while you wait
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        ) : (
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <li
                key={post.slug}
                className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/40"
              >
                <p className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <h2 className="mt-2 text-lg font-semibold">
                  <Link href={`/blog/${post.slug}/`} className="hover:text-primary">
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
