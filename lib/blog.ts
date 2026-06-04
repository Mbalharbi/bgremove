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
    slug: "how-to-remove-background-without-photoshop",
    title: "How to Remove a Background Without Photoshop (Free, 2026 Guide)",
    date: "2026-06-04",
    excerpt: "Photoshop costs $660/year. You don't need it for background removal. Five free, browser-based methods that match Photoshop's quality.",
    readingMinutes: 9,
  },
  {
    slug: "how-to-remove-product-photo-background",
    title: "How to Remove Product Photo Backgrounds (Marketplace-Ready Guide)",
    date: "2026-06-04",
    excerpt: "Practical guide for ecommerce sellers: remove product photo backgrounds for Amazon, Shopify, Etsy, eBay. Free, browser-only workflow.",
    readingMinutes: 10,
  },
  {
    slug: "how-to-make-transparent-png",
    title: "How to Make a Transparent PNG: 2026 Complete Guide",
    date: "2026-06-04",
    excerpt: "Everything about transparent PNGs — what they are, when to use them, how to create them from JPGs, how to fix common issues.",
    readingMinutes: 11,
  },
  {
    slug: "remove-bg-alternative-guide",
    title: "Remove.bg Alternatives: 7 Free Options in 2026",
    date: "2026-06-04",
    excerpt: "Remove.bg's free tier is broken — one HD image per month. Here are seven legitimate alternatives, ranked honestly. Three are genuinely free with no caps.",
    readingMinutes: 9,
  },
  {
    slug: "background-remover-for-amazon-sellers",
    title: "Background Remover for Amazon Sellers: The Definitive 2026 Guide",
    date: "2026-06-04",
    excerpt: "Amazon's MAIN image policy requires pure white backgrounds. This guide covers the rules, the cheapest compliant workflow, and the most common mistakes.",
    readingMinutes: 12,
  },
  {
    slug: "how-to-remove-logo-background",
    title: "How to Remove a Background from a Logo (Free Guide)",
    date: "2026-06-04",
    excerpt: "Transform any logo (JPG with white background, screenshot, scan) into a transparent PNG. Free, browser-based, captures fine type and thin elements.",
    readingMinutes: 8,
  },
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
