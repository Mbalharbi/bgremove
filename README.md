# BgRemove

> Remove image backgrounds in seconds. **100% private. 100% free.**
> Photos are processed entirely in the browser — they never leave the device.

A free, browser-only background remover plus a small suite of image tools (bulk
removal, compressor, resizer). Built as a static-export Next.js 14 app, ready
to deploy to Cloudflare Pages.

[![Live demo](https://img.shields.io/badge/live-bgremovers.org-10b981)](https://bgremovers.org)

---

## Why this exists

Most "free" background removers either watermark the result, cap you at a few
images per day, or upload your photos to someone else's server. BgRemove uses
MediaPipe Selfie Segmenter running in your browser via WebAssembly + GPU
acceleration. The AI model loads once (~4 MB), caches locally, and processes
every subsequent image in 2–3 seconds without a single image byte ever leaving
the device.

## Stack

| Layer       | Choice                                                       |
| ----------- | ------------------------------------------------------------ |
| Framework   | **Next.js 14** App Router · static export                    |
| Language    | TypeScript (strict)                                          |
| Styling     | Tailwind CSS · shadcn/ui (Radix primitives)                  |
| AI model    | `@mediapipe/tasks-vision` (Selfie Segmenter, float16)        |
| Image work  | Canvas API · JSZip · `@resvg/resvg-js` (build-time icons)    |
| Theming     | `next-themes` (system / light / dark)                        |
| Fonts       | Inter + JetBrains Mono via `next/font/google` (self-hosted)  |
| Deploy      | Cloudflare Pages (static export)                             |

No server-side rendering. No API routes. No database. No accounts. No uploads.

## Local development

```bash
npm install
npm run dev          # http://localhost:3000
```

That's it — three commands including the implied `cd`.

### Other useful scripts

```bash
npm run build              # static export to /out
npm run preview            # serve /out locally on port 3000
npm run generate:assets    # regenerate PNG favicons + OG image from SVG sources
npm run lint
```

## Project layout

```
app/
  page.tsx                 # homepage (hero + how it works + comparison + FAQ)
  bulk/                    # /bulk — process up to 20 images, download as ZIP
  tools/
    image-compressor/      # /tools/image-compressor
    image-resizer/         # /tools/image-resizer (with social presets)
  about/  privacy/  terms/  contact/  blog/
  icon.svg                 # favicon (auto-served by Next)
  apple-icon.svg           # apple touch icon
  layout.tsx               # root layout, metadata defaults, GA placeholder
  sitemap.ts               # auto-generated sitemap.xml
  robots.ts                # auto-generated robots.txt

components/
  bg-remover.tsx           # orchestrates upload → process → preview → download
  bulk-remover.tsx         # queue + ZIP for /bulk
  image-compressor.tsx     # canvas-based compressor
  image-resizer.tsx        # canvas-based resizer
  upload-zone.tsx          # drag/drop + paste + click + preload-on-hover
  image-preview.tsx        # before/after slider
  download-button.tsx
  header.tsx  footer.tsx  logo.tsx  theme-toggle.tsx  page-header.tsx
  json-ld.tsx              # JSON-LD injector
  home/                    # hero, how-it-works, comparison, faq, use-cases
  ui/                      # shadcn primitives (Button, Card, Dialog, etc.)

lib/
  bg-removal.ts            # MediaPipe wrapper (lazy-loaded, cached)
  image-utils.ts           # canvas encode/decode helpers, social presets
  schema.ts                # JSON-LD: Organization, WebApplication, HowTo, FAQ
  site.ts                  # SITE constants (name, URL, GA ID placeholder)
  blog.ts                  # blog index (empty by default; see "Adding a blog post")
  utils.ts                 # cn(), formatBytes(), formatMs(), downloadBlob()

hooks/
  use-toast.ts

public/
  manifest.json            # PWA basics
  og-image.png             # auto-generated from /public/og-image.svg
  favicon-{16,32}x32.png   # auto-generated from app/icon.svg
  icon-{192,512}.png       # auto-generated from app/icon.svg
  apple-touch-icon.png     # auto-generated from app/apple-icon.svg

scripts/
  generate-png-assets.mjs  # SVG → PNG (runs as `prebuild`)
```

---

## Deploying to Cloudflare Pages

See [DEPLOY.md](./DEPLOY.md) for the full step-by-step. The short version:

```bash
git init && git add . && git commit -m "Initial commit"
git remote add origin https://github.com/USERNAME/bgremove.git
git push -u origin main
```

Then in **Cloudflare Pages → Connect to Git**:

| Setting               | Value                          |
| --------------------- | ------------------------------ |
| Framework preset      | `Next.js (Static HTML Export)` |
| Build command         | `npm run build`                |
| Build output dir      | `out`                          |
| Node version          | `20`                           |

Cloudflare will deploy on every push to `main`.

## Adding a custom domain (bgremovers.org)

1. **Cloudflare Pages → Custom domains → Add custom domain**: `bgremovers.org`
2. Add the `www` variant: `www.bgremovers.org`
3. If your domain is registered through Cloudflare, DNS records are added
   automatically. Otherwise add a `CNAME` pointing to the `*.pages.dev` URL.
4. Wait 5–10 minutes for SSL provisioning. Then update `lib/site.ts`:

   ```ts
   export const SITE = {
     name: "BgRemove",
     domain: "bgremovers.org",
     url: "https://bgremovers.org",
     ...
   }
   ```

5. Push the change → Cloudflare redeploys → live at https://bgremovers.org.

## Adding Google Analytics 4

1. Create a GA4 property at https://analytics.google.com
2. Create a Web Stream for `bgremovers.org` and copy the **Measurement ID**
   (looks like `G-ABC1234XYZ`).
3. Edit `lib/site.ts`:

   ```ts
   gaId: "G-ABC1234XYZ", // <-- paste here
   ```

4. Open `app/layout.tsx` and **uncomment** the two `<Script>` blocks under
   `GOOGLE ANALYTICS 4`. The block is clearly labelled.
5. Commit + push. Cloudflare deploys. GA starts collecting within 30 minutes.

> The GA snippet uses `anonymize_ip: true` and only loads `afterInteractive`,
> so it won't impact Lighthouse Performance scores.

## Applying for Google AdSense

You need traffic + content before AdSense will approve. Plan:

1. **Write 8–12 blog posts** (see [LAUNCH_CHECKLIST.md](./LAUNCH_CHECKLIST.md)
   for a starter list of 20 SEO titles).
2. **Get the site indexed** via Google Search Console:
   `https://search.google.com/search-console` → Add property → Verify by DNS
   → Submit `https://bgremovers.org/sitemap.xml`.
3. Wait for ~50–100 organic visits/day.
4. Apply at https://adsense.google.com (verify by adding their snippet).
5. After approval:
   - Edit `app/layout.tsx`, uncomment the AdSense `<Script>` block, replace
     `ca-pub-XXXXXXXXXX` with your publisher ID.
   - Search the codebase for `// AD SLOT:` comments — there are three (header
     banner, between content, footer). Replace each with an `<ins class="adsbygoogle">`
     block from your AdSense dashboard.
   - **EU/UK compliance**: implement a cookie consent banner before going
     live with ads (a placeholder hook is in `app/layout.tsx`).

## Adding a blog post

The blog skeleton is at `lib/blog.ts`. To add posts:

**Option A — quick**: hard-code into the array.

```ts
const POSTS: BlogPost[] = [
  {
    slug: "remove-background-from-portrait",
    title: "How to remove the background from a portrait in 5 seconds",
    date: "2026-01-15",
    excerpt: "A 60-second walkthrough...",
  },
];
```

Then create `app/blog/[slug]/page.tsx` to render a post by slug.

**Option B — proper MDX**:

```bash
npm install @next/mdx @mdx-js/loader gray-matter
```

Drop `.mdx` files into `content/blog/`, read them in `lib/blog.ts` with
`fs.readdirSync` + `gray-matter`. The sitemap auto-includes whatever
`getPostSlugs()` returns.

## Performance + accessibility

Targets met by the production build:

- ✅ Total bundle (homepage): **146 KB First Load JS** (target < 200 KB)
- ✅ MediaPipe model + WASM: **lazy-loaded** on first upload, cached after
- ✅ Self-hosted fonts via `next/font/google`
- ✅ All pages prerendered as static HTML (15 routes)
- ✅ Skip-to-content link, ARIA labels, keyboard navigation, focus rings
- ✅ Mobile-first (drag/drop on desktop, tap-to-upload on mobile)
- ✅ Toast notifications with auto-dismiss
- ✅ Dark mode via system preference (toggle in header)

Run a Lighthouse audit:

```bash
npm run build
npm run preview                    # serve /out
# In another terminal:
npx lighthouse http://localhost:3000 --view
```

## Contributing

PRs welcome. Keep it small, keep it accessible, keep it private (no analytics
on user images, ever).

## License

MIT — see [LICENSE](./LICENSE).
