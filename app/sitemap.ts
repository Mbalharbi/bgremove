import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { getPostSlugs } from "@/lib/blog";

export const dynamic = "force-static";

interface StaticEntry {
  path: string;
  priority: number;
  freq: "daily" | "weekly" | "monthly";
}

const STATIC_PATHS: StaticEntry[] = [
  // Core
  { path: "", priority: 1.0, freq: "weekly" },
  { path: "bulk", priority: 0.9, freq: "weekly" },
  { path: "tools/image-compressor", priority: 0.8, freq: "weekly" },
  { path: "tools/image-resizer", priority: 0.8, freq: "weekly" },

  // Programmatic SEO landing pages
  { path: "portrait-background-remover", priority: 0.85, freq: "weekly" },
  { path: "product-photo-background-remover", priority: 0.85, freq: "weekly" },
  { path: "logo-background-remover", priority: 0.8, freq: "weekly" },
  { path: "transparent-png-maker", priority: 0.85, freq: "weekly" },
  { path: "screenshot-background-remover", priority: 0.8, freq: "weekly" },

  // Comparison pages (high commercial intent + AI assistant fodder)
  { path: "vs/remove-bg", priority: 0.85, freq: "weekly" },
  { path: "vs/photoshop", priority: 0.8, freq: "weekly" },
  { path: "vs/canva", priority: 0.8, freq: "weekly" },
  { path: "vs/adobe-express", priority: 0.8, freq: "weekly" },

  // Content
  { path: "blog", priority: 0.7, freq: "weekly" },

  // Static
  { path: "about", priority: 0.5, freq: "monthly" },
  { path: "privacy", priority: 0.4, freq: "monthly" },
  { path: "terms", priority: 0.4, freq: "monthly" },
  { path: "contact", priority: 0.4, freq: "monthly" },

  // Arabic locale (/ar/*) — mirrors the highest-value English routes.
  // Marketing/SEO surface, NOT every English page — keep crawl budget tight.
  { path: "ar", priority: 0.95, freq: "weekly" },
  { path: "ar/bulk", priority: 0.85, freq: "weekly" },
  { path: "ar/portrait-background-remover", priority: 0.8, freq: "weekly" },
  { path: "ar/product-photo-background-remover", priority: 0.8, freq: "weekly" },
  { path: "ar/logo-background-remover", priority: 0.75, freq: "weekly" },
  { path: "ar/transparent-png-maker", priority: 0.8, freq: "weekly" },
  { path: "ar/screenshot-background-remover", priority: 0.75, freq: "weekly" },
  { path: "ar/about", priority: 0.4, freq: "monthly" },
  { path: "ar/privacy", priority: 0.3, freq: "monthly" },

  // Portuguese (Brazil) — high-volume e-commerce market.
  { path: "pt", priority: 0.95, freq: "weekly" },
  { path: "pt/bulk", priority: 0.85, freq: "weekly" },
  { path: "pt/about", priority: 0.4, freq: "monthly" },
  { path: "pt/privacy", priority: 0.3, freq: "monthly" },

  // German — privacy-conscious EU audience, high Ad RPM.
  { path: "de", priority: 0.95, freq: "weekly" },
  { path: "de/bulk", priority: 0.85, freq: "weekly" },
  { path: "de/about", priority: 0.4, freq: "monthly" },
  { path: "de/privacy", priority: 0.3, freq: "monthly" },

  // Spanish — Spain + LATAM, largest single-language market after English.
  { path: "es", priority: 0.95, freq: "weekly" },
  { path: "es/bulk", priority: 0.85, freq: "weekly" },
  { path: "es/about", priority: 0.4, freq: "monthly" },
  { path: "es/privacy", priority: 0.3, freq: "monthly" },

  // Chinese (simplified) — Mainland may have CDN reachability issues,
  // but Taiwan/HK/Singapore + diaspora is huge.
  { path: "zh", priority: 0.95, freq: "weekly" },
  { path: "zh/bulk", priority: 0.85, freq: "weekly" },
  { path: "zh/about", priority: 0.4, freq: "monthly" },
  { path: "zh/privacy", priority: 0.3, freq: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map(
    ({ path, priority, freq }) => ({
      url: path ? `${SITE.url}/${path}/` : `${SITE.url}/`,
      lastModified: now,
      changeFrequency: freq,
      priority,
    })
  );

  const blogEntries: MetadataRoute.Sitemap = getPostSlugs().map((slug) => ({
    url: `${SITE.url}/blog/${slug}/`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...blogEntries];
}
