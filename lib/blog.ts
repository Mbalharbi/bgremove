/**
 * Minimal blog index. Add posts by dropping objects into POSTS, or migrate
 * to MDX by:
 *  1) `npm install @next/mdx @mdx-js/loader gray-matter`
 *  2) Putting .mdx files under /content/blog/
 *  3) Reading them with `fs.readdirSync` here at build time
 *
 * For now this returns an empty list so /blog renders the "coming soon" state.
 */

export interface BlogPost {
  slug: string;
  title: string;
  date: string; // ISO YYYY-MM-DD
  excerpt: string;
}

const POSTS: BlogPost[] = [
  // Add posts here, or wire up MDX as described above.
];

export function getAllPosts(): BlogPost[] {
  return POSTS.slice().sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostSlugs(): string[] {
  return POSTS.map((p) => p.slug);
}
