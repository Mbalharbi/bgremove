# Deploying BgRemove

Step-by-step from a clean local checkout to a live Cloudflare Pages site at
**bgremovers.org**.

Estimated time: **30 minutes** end-to-end.

---

## 0. Prerequisites

- Node.js **20+** installed (`node --version`)
- A GitHub account
- A Cloudflare account (free tier works)
- The domain `bgremovers.org` (or any domain you own)

## 1. Local sanity check

```bash
npm install
npm run build
npm run preview          # serves /out at http://localhost:3000
```

Open http://localhost:3000 — you should see the BgRemove homepage. Drop in an
image to verify MediaPipe loads (first run downloads ~4 MB of model + WASM).

## 2. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: BgRemove MVP"
```

Create a new GitHub repo named `bgremove` (https://github.com/new). Then:

```bash
git branch -M main
git remote add origin https://github.com/<YOUR_USERNAME>/bgremove.git
git push -u origin main
```

## 3. Cloudflare Pages

1. Go to https://dash.cloudflare.com → **Workers & Pages** → **Create**
2. Click **Pages** → **Connect to Git** → select GitHub → authorise → pick the
   `bgremove` repo
3. **Build settings**:

   | Field                    | Value                            |
   | ------------------------ | -------------------------------- |
   | Project name             | `bgremove` (auto)                |
   | Production branch        | `main`                           |
   | Framework preset         | **Next.js (Static HTML Export)** |
   | Build command            | `npm run build`                  |
   | Build output directory   | `out`                            |
   | Root directory           | `/` (leave default)              |
   | Environment variables    | (none required)                  |

4. Under **Settings → Environment variables → Build**: set
   `NODE_VERSION = 20` (Cloudflare defaults to 18 which works but 20 is what we
   tested against).

5. Click **Save and Deploy**. First build takes ~2–3 minutes.

You'll get a temporary URL like `https://bgremove-abc.pages.dev`. Verify it
works — navigate to a few pages and try an image upload.

## 4. Custom domain: bgremovers.org

In Cloudflare Pages → your project → **Custom domains**:

1. Click **Set up a custom domain** → enter `bgremovers.org` → **Continue**
2. If the domain is on Cloudflare DNS: records are added automatically
3. If the domain is elsewhere: add a `CNAME` `bgremovers.org` →
   `bgremove-abc.pages.dev` (or use the apex flattening Cloudflare suggests)
4. Repeat for `www.bgremovers.org`
5. Wait 5–10 minutes for SSL certificates to provision

Then update `lib/site.ts`:

```ts
export const SITE = {
  name: "BgRemove",
  domain: "bgremovers.org",
  url: "https://bgremovers.org",
  // ... rest unchanged
};
```

```bash
git add lib/site.ts
git commit -m "Set production URL"
git push
```

Cloudflare auto-deploys on push (~2 minutes).

## 5. Google Search Console

1. Go to https://search.google.com/search-console
2. **Add property** → **Domain** → enter `bgremovers.org`
3. Verify by DNS — Cloudflare makes this one click if your domain is on
   Cloudflare DNS
4. Once verified: **Sitemaps** → submit `https://bgremovers.org/sitemap.xml`
5. **URL Inspection** for `https://bgremovers.org` → **Request Indexing**

## 6. Google Analytics 4 (optional)

1. https://analytics.google.com → **Admin** → **Create Property**
2. Property name: `BgRemove`. Industry: Technology. Reporting timezone: yours.
3. Set up a **Web data stream** for `bgremovers.org`
4. Copy the **Measurement ID** (`G-XXXXXXXXXX`)
5. In `lib/site.ts`, replace `G-PLACEHOLDER` with your real ID
6. In `app/layout.tsx`, **uncomment the two `<Script>` blocks** under the
   `GOOGLE ANALYTICS 4` comment
7. `git add . && git commit -m "Wire up GA4" && git push`
8. Verify within 30 minutes via GA4 → **Realtime** report

## 7. Bing Webmaster Tools

Go to https://www.bing.com/webmasters → **Import** from Google Search Console.
Bing pulls everything including the sitemap automatically.

## 8. Cloudflare Web Analytics (free, cookieless)

In Cloudflare → your domain → **Analytics & Logs** → **Web Analytics** →
**Enable**. No code change needed; Cloudflare injects the script at the edge.

This gives you a privacy-respecting backup of GA4 with no cookies — useful for
EU/UK visitors who block tracking.

## 9. Pre-launch checklist

See [LAUNCH_CHECKLIST.md](./LAUNCH_CHECKLIST.md) for the full launch playbook
(socials, Reddit, Product Hunt, etc.).

## 10. Continuous deployment

You're done. Every `git push origin main` triggers a fresh Cloudflare build
that auto-deploys to production. Pull-request previews are also enabled by
default — every PR gets its own `*.bgremove.pages.dev` URL.

## Troubleshooting

**"Module not found: Can't resolve '@/components/...'"**
Make sure `tsconfig.json` has `"baseUrl": "."` and `"paths": { "@/*": ["./*"] }`
(it does by default — only an issue if you've tampered with it).

**"Build failed: prebuild script error"**
The PNG generator needs `@resvg/resvg-js`, installed as a dev dep. If it's
missing, run `npm install`. If it fails on Cloudflare specifically, ensure
`NODE_VERSION=20` is set.

**"MediaPipe model fails to load on production"**
Check the browser console. The model + WASM are fetched from
`storage.googleapis.com` and `cdn.jsdelivr.net` — both are reliable but if
your users are behind a CDN-blocking firewall, consider self-hosting the
model. Copy `node_modules/@mediapipe/tasks-vision/wasm/*` into
`/public/mediapipe/wasm/` and update the URLs in `lib/bg-removal.ts`.

**"Lighthouse score is lower than 95"**
The biggest win is to compress the OG image (`/public/og-image.png` is
generated at 1200×630 PNG). Replace it with a hand-tuned PNG or convert to
WebP (~10× smaller). Also verify the GA4 script is loaded with
`afterInteractive` strategy (it is, by default).

**"My image won't upload"**
Max file size is 30 MB. Max dimension is 4096 px (longest edge). Larger images
are auto-resized — but extremely large files may run out of memory on
low-spec devices.
