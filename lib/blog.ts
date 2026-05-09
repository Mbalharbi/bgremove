/**
 * Blog post index. Each entry maps to a real route at /app/blog/<slug>/page.tsx,
 * so adding a post = (1) creating the page file, (2) adding an entry here.
 *
 * The sitemap and /blog index page both read from `getAllPosts()`.
 */

export interface BlogPost {
  slug: string;
  title: string;
  date: string; // ISO YYYY-MM-DD
  excerpt: string;
  readingMinutes: number;
}

const POSTS: BlogPost[] = [
  {
    slug: "remove-image-background-browser",
    title: "How to Remove a Background from an Image in Your Browser",
    date: "2026-05-09",
    excerpt:
      "A practical 60-second guide to removing image backgrounds entirely in your browser using free, privacy-respecting AI. No accounts, no upload, no watermark.",
    readingMinutes: 6,
  },
  {
    slug: "transparent-png-from-photo",
    title: "How to Make a Transparent PNG from Any Photo",
    date: "2026-05-09",
    excerpt:
      "What transparent PNG actually means, why JPEG won't do, and the fastest browser-only workflow that doesn't require Photoshop.",
    readingMinutes: 5,
  },
  {
    slug: "best-free-background-removers-2026",
    title: "Best Free Background Removers in 2026: 5 Tools, Honestly Compared",
    date: "2026-05-09",
    excerpt:
      "An honest, hands-on comparison of five free background removers — Remove.bg, Adobe Express, Canva, Photopea, and BgRemove — covering quality, privacy, limits, and which one to pick when.",
    readingMinutes: 8,
  },
  {
    slug: "etsy-shopify-product-photos",
    title: "Remove Backgrounds from Etsy & Shopify Product Photos in 60 Seconds",
    date: "2026-05-09",
    excerpt:
      "A practical guide to clean white-background product photography for marketplaces. Covers the actual rules from Etsy, Shopify, Amazon, and how to batch-process a whole catalogue in your browser.",
    readingMinutes: 7,
  },
];

export function getAllPosts(): BlogPost[] {
  return POSTS.slice().sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostSlugs(): string[] {
  return POSTS.map((p) => p.slug);
}
