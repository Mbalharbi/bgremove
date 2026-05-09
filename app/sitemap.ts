import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { getPostSlugs } from "@/lib/blog";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPaths: { path: string; priority: number; freq: "daily" | "weekly" | "monthly" }[] = [
    { path: "", priority: 1.0, freq: "weekly" },
    { path: "bulk", priority: 0.9, freq: "weekly" },
    { path: "tools/image-compressor", priority: 0.8, freq: "weekly" },
    { path: "tools/image-resizer", priority: 0.8, freq: "weekly" },
    { path: "blog", priority: 0.6, freq: "weekly" },
    { path: "about", priority: 0.5, freq: "monthly" },
    { path: "privacy", priority: 0.4, freq: "monthly" },
    { path: "terms", priority: 0.4, freq: "monthly" },
    { path: "contact", priority: 0.4, freq: "monthly" },
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map(({ path, priority, freq }) => ({
    url: path ? `${SITE.url}/${path}/` : `${SITE.url}/`,
    lastModified: now,
    changeFrequency: freq,
    priority,
  }));

  const blogEntries: MetadataRoute.Sitemap = getPostSlugs().map((slug) => ({
    url: `${SITE.url}/blog/${slug}/`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticEntries, ...blogEntries];
}
