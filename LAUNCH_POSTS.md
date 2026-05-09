# Launch Posts — copy-paste drafts

> Real backlinks + first traffic come from communities, listicle directories,
> and PR. Below are drafts you can paste with minimal editing. **Do not auto-post
> with bots** — Reddit, HN, and PH all ban accounts that look automated.

**Order matters.** Do them in this sequence over ~7 days:

1. AlternativeTo + listing directories (day 1) — passive backlinks
2. Reddit r/InternetIsBeautiful + r/SideProject (day 2) — first organic traffic
3. Show HN (Tuesday 9am ET) — peak HN front-page potential
4. Product Hunt (one specific Tuesday/Wednesday) — community + backlinks
5. X / LinkedIn (concurrent with PH) — your network
6. Newsletter pitches (week 2) — long-tail traffic

---

## 1) AlternativeTo — fastest wins

URL: <https://alternativeto.net/software/remove-bg/about/>

Click **"Add an alternative"**. Submit:

- **App name**: BgRemove
- **Website**: https://bgremovers.org
- **Tagline**: Free browser-only background remover. No upload, no signup.
- **License**: Freemium / Free
- **Platforms**: Web, Online
- **Description** (paste verbatim):

> BgRemove is a privacy-first alternative to Remove.bg. Drop any photo and get a transparent PNG in 2-3 seconds — entirely in your browser. The AI model (Google's MediaPipe Selfie Segmenter) runs locally via WebAssembly and GPU, so your images never leave your device. There's no signup, no daily limit, no preview-quality trick, and no watermark. Bulk processing for up to 20 images per batch is included free. Open Chrome DevTools while you upload — you'll see no outbound image data. Best for portraits, selfies, headshots, product photos, and screenshots.

Repeat for these pages too (each one is a separate AlternativeTo profile that gets indexed):

- <https://alternativeto.net/software/photoshop/about/> (filter by "background removal")
- <https://alternativeto.net/category/photos-and-graphics/background-removal/>
- <https://alternativeto.net/software/canva/about/>

---

## 2) Reddit — r/InternetIsBeautiful

**Title** (Reddit style: descriptive, no hype):

> BgRemove — a free background remover that runs 100% in your browser (no upload, no signup, no watermark)

**Body**:

> I built bgremovers.org because every "free" background remover I've used either watermarks the result, caps you at 3 images a day, or quietly uploads your photos to someone else's server.
>
> This one runs Google's MediaPipe Selfie Segmenter directly in your browser via WebAssembly. The model downloads once (~4 MB), then every subsequent image is processed locally in 2-3 seconds. Open DevTools → Network tab while you drop a photo — there's literally no outbound request with your image data.
>
> Free, unlimited, no signup, no watermark. Bulk mode handles up to 20 images per batch and gives you a ZIP. Built for portraits and selfies (the model is portrait-tuned), but works on most subjects.
>
> Source / repo if anyone's curious how it works under the hood: github.com/Mbalharbi/bgremove
>
> Happy to answer questions about the architecture, the privacy claims, or anything else.

**Image**: a 30-second screen recording of the before/after slider on a portrait. Show DevTools Network tab open with no outbound image request.

**Best post time**: Tuesday-Thursday, 9-11am ET.

---

## 3) Reddit — r/SideProject

**Title**:

> Built a free, browser-only background remover with Next.js + MediaPipe in a weekend (bgremovers.org)

**Body**:

> Wanted to share a side project that ended up being more useful than expected.
>
> **The frustration**: every "free" background remover quietly uploads your photo, caps you at 3 images, or watermarks. I wanted to know if I could do the whole thing browser-side.
>
> **The stack**:
> - Next.js 14 App Router (static export → Cloudflare Workers Static Assets)
> - MediaPipe Selfie Segmenter via @mediapipe/tasks-vision (runs in WebAssembly + WebGL on the user's device)
> - Tailwind + shadcn/ui
> - JSZip for bulk export
> - resvg for build-time PNG generation from SVG
>
> **Result**:
> - 25 prerendered static pages
> - 147 KB First Load JS on the homepage
> - Lighthouse: Perf 88-100 / A11y 96 / BP 100 / SEO 100
> - $0/month hosting (Cloudflare free tier)
> - Image processing in 2-3 seconds, fully client-side
>
> **What surprised me**: the privacy angle resonates with people way more than the speed or the price. "Open DevTools and watch — no upload happens" is more compelling than any feature comparison.
>
> Tool: bgremovers.org · Repo: github.com/Mbalharbi/bgremove
>
> Happy to answer anything about the architecture or the deploy.

---

## 4) Reddit — r/webdev

**Title**:

> Show /r/webdev: I built a 100% browser-side background remover with Next.js static export + MediaPipe WASM (bgremovers.org)

**Body**: tech-focused angle.

> Sharing a project that uses some interesting browser tech I hadn't combined before.
>
> **TL;DR**: A background-removal web app where the AI inference runs entirely in the user's browser, not on a server. No upload, no API calls with image data.
>
> **How it works**:
> 1. The user drops a photo → it gets read into an HTMLCanvasElement
> 2. The first time only, the browser downloads MediaPipe's Selfie Segmenter (~4 MB tflite model + WASM runtime). Cached forever after.
> 3. The model runs via @mediapipe/tasks-vision with GPU delegation (WebGL 2.0) — segmentation takes ~50-100ms on modern hardware
> 4. The mask is applied as alpha to the original pixel data → canvas.toBlob() → PNG download
>
> **Cool things I learned**:
> - Next.js 14's `output: 'export'` + Cloudflare Workers Static Assets is a beautiful combo. $0 hosting, edge-cached globally.
> - MediaPipe's WASM SIMD path is fast enough that you don't really need a server.
> - Selfie Segmenter is portrait-tuned but generalises surprisingly well to products and other subjects.
> - Adding `output: 'export'` to next.config breaks dynamic routes, but Next route handlers (`route.ts`) still work for things like /sitemap.xml and /feed.xml.
>
> **Stack**: Next.js 14, MediaPipe Tasks Vision, Tailwind, shadcn/ui, JSZip. Static export to Cloudflare Workers (assets-only, no compute).
>
> Live: bgremovers.org
> Source: github.com/Mbalharbi/bgremove
>
> Happy to dig into any of this.

---

## 5) Reddit — r/selfhosted

**Title**:

> Browser-only background remover — no server side, no upload, no telemetry on your images (bgremovers.org)

**Body**: privacy + self-hosted angle.

> Not strictly self-hosted, but I think this community will appreciate the architecture.
>
> Built a background-removal web app that does inference 100% in the browser. The AI model (MediaPipe Selfie Segmenter) downloads once on first use, then everything runs locally. No server endpoint with image data, no telemetry, no account.
>
> If you want to actually self-host: it's a Next.js static export. Drop the `out/` folder behind any static webserver (Caddy, nginx, Cloudflare Pages, GitHub Pages, your homelab). The MediaPipe model is fetched from a public CDN by default but you can self-host that too — just copy node_modules/@mediapipe/tasks-vision/wasm/* into your /public and update the URLs in lib/bg-removal.ts.
>
> Source: github.com/Mbalharbi/bgremove (MIT licensed)
> Hosted version: bgremovers.org
>
> Open to PRs / feedback.

---

## 6) Hacker News (Show HN)

**Title** (HN style: action + project name + parenthetical):

> Show HN: BgRemove – Browser-only background remover (no upload, no signup)

**Body**:

> Hi HN — I built bgremovers.org over a weekend because I was frustrated by free background removers that either watermark, cap usage, or quietly upload your photos to a server.
>
> The tool runs Google's MediaPipe Selfie Segmenter directly in the browser via WebAssembly. The model downloads once (~4 MB) and every subsequent image is processed locally. There's no signup, no usage cap, no watermark. Bulk mode handles 20 images at a time and packages the results as a ZIP.
>
> The privacy claim is verifiable: open DevTools → Network tab while you upload an image. You'll see no outbound request with image data, only the initial CDN fetch of the model on first use.
>
> Stack: Next.js 14 (static export), MediaPipe Tasks Vision (WebAssembly + WebGL/GPU), Tailwind, deployed to Cloudflare Workers Static Assets. $0/month hosting at typical traffic.
>
> Honest limitations: the model is portrait-tuned, so it's best on people. Wispy hair on busy backgrounds is where Remove.bg's paid tier still has a small edge. Products and screenshots work most of the time but quality is more variable.
>
> Source: https://github.com/Mbalharbi/bgremove
>
> Happy to answer architecture/deploy questions, especially around the static-export + Workers Static Assets combo (which I think is underrated for sites like this).

**Time to post**: Tuesday 9:00am ET. Be available in comments for the first 4 hours.

**Comments to expect** (and replies you might pre-draft):

- *"How does this differ from Photopea / Canva / Remove.bg?"* → Direct them to <https://bgremovers.org/blog/best-free-background-removers-2026/>
- *"What about Apple Photos / iOS background removal?"* → "iOS 16+ does this beautifully on a single tap. This is for cross-platform / web workflows where you need a PNG file."
- *"Why MediaPipe specifically?"* → "It's the smallest model that produces shippable quality, runs in WASM with GPU delegation, and Google maintains it. SAM/Segment-Anything is bigger and slower; rembg/U-2-Net are PyTorch (server-only)."
- *"Where's the paid tier?"* → "There isn't one. The unit economics work because there are no per-image server costs."

---

## 7) Product Hunt

**Pre-launch checklist** (do at least 3 days before):

- Make a "Coming soon" page on Product Hunt to gather subscribers: <https://www.producthunt.com/posts/new>
- Pick a launch day: Tuesday or Wednesday (best traffic, moderate competition)
- Schedule for **00:01 PT** of that day (Pacific midnight = peak first 8 hours)
- Have 5-10 friends ready to genuinely try the product and leave honest comments in the first 2 hours

**Submission fields**:

- **Name**: BgRemove
- **Tagline** (60 chars max): `100% browser-based background remover. Truly free.`
- **Description** (260 chars max):

  > Drop any photo and get a transparent PNG in 2 seconds. The AI runs in your browser — no upload, no signup, no watermark, no daily limit. Bulk mode handles 20 images at once. Built on Google's MediaPipe and deployed to Cloudflare Workers.

- **Topics**: AI, Productivity, Design Tools, Photography, Privacy
- **Gallery**: 5 images + 1 GIF
  1. Hero shot of homepage with the upload zone
  2. Before/after slider on a portrait
  3. Bulk processor with 8 images queued
  4. Mobile screenshot
  5. Dark mode
- **Maker comment** (post within 5 minutes of launch):

  > Hey Product Hunt 👋
  >
  > I built BgRemove because every free background remover I tried either watermarked the result, capped me at 3 images, or quietly uploaded my photos to a server.
  >
  > BgRemove runs the AI (Google's MediaPipe Selfie Segmenter) entirely in your browser via WebAssembly. There's no upload step in the architecture — your photos literally cannot reach my servers. Open Chrome DevTools while you use it; the Network tab is silent.
  >
  > Free, unlimited, no signup, no watermark. Bulk mode handles 20 images at once and gives you a ZIP.
  >
  > Limitations: the model is portrait-tuned, so it's best on people. Products and screenshots work but quality varies.
  >
  > Honest tradeoff vs Remove.bg paid: their hair edge detail is still slightly better on the absolute hardest cases. For 95% of real photos, BgRemove is indistinguishable.
  >
  > Code is open source: github.com/Mbalharbi/bgremove
  >
  > Happy to answer anything about the build or the architecture. Thanks for checking it out.

---

## 8) X / Twitter thread

Tweet 1 (image: 30s screen recording):

> I built a free background remover that runs 100% in your browser.
>
> No upload, no signup, no watermark.
>
> Open DevTools → Network tab → drop a photo. You'll see no outbound image data. The AI runs locally.
>
> bgremovers.org

Tweet 2 (reply, image: bulk processor):

> Bulk mode handles up to 20 images at once. Drag, click, get a ZIP. Free, no daily limit.
>
> The AI model downloads once (~4 MB), then everything is local.

Tweet 3 (reply, image: stack diagram or homepage screenshot):

> The stack:
>
> - Next.js 14 (static export)
> - @mediapipe Tasks Vision (WebAssembly + GPU)
> - Tailwind + shadcn
> - Cloudflare Workers Static Assets
>
> $0/month hosting at typical traffic. 25 prerendered pages.

Tweet 4 (reply):

> Why bother building this when Remove.bg exists?
>
> - Their free tier downloads at 0.25 MP (preview only)
> - $9/mo for actual use
> - Your photo briefly lives on their server (1h retention)
>
> BgRemove is genuinely free, unlimited, and the photo never leaves your browser.

Tweet 5 (reply):

> Honest limitations:
>
> - Model is portrait-tuned, so it's best on people
> - Wispy hair on busy backgrounds → Remove.bg paid still wins
> - Very small subjects in large frames are harder
>
> For 90% of real cutouts though, you can't tell the difference.

Tweet 6 (reply, link):

> Open source: https://github.com/Mbalharbi/bgremove
>
> Tool: https://bgremovers.org
>
> Built for everyone who's tired of free tiers that quietly cap you at 3 downloads.

---

## 9) Slant.co

URL: <https://www.slant.co/topics/630/~best-free-online-background-removers>

Click "Add Option". Fill:

- **Name**: BgRemove
- **Website**: https://bgremovers.org
- **Tagline**: Browser-only, free, unlimited, no signup
- **Pros** (one per line):
  > Photos never leave your device — AI runs in your browser
  > Genuinely free — no daily limit, no preview-quality trick, no watermark
  > Bulk processing of 20 images at once with ZIP download
  > Works on phone and desktop with same quality
  > Open source (MIT)
  > 2-3 second processing per image after first load
- **Cons**:
  > Model is portrait-tuned (best on people, variable on products and complex objects)
  > First load downloads ~4 MB of WASM + AI model
  > No API for integrations (yet)
  > Hair edge detail slightly behind Remove.bg paid tier on hardest cases

---

## 10) Newsletter pitches

For each of these, send a SHORT email (under 150 words) to the newsletter editor with:
- One-line hook
- 30-second screen recording link
- One sentence on why their audience cares
- Direct link to the tool

**Targets** (in priority order):

| Newsletter | Editor / submit | Audience |
|---|---|---|
| **TLDR** (Daily) | tldrnewsletter.com/submit | Tech generalists, ~3M readers |
| **Bytes.dev** | bytes.dev/contribute | JS/web devs |
| **Frontend Focus** | cooperpress.com/publications/frontend-focus | Frontend devs |
| **Web Tools Weekly** | webtoolsweekly.com | Designers + devs |
| **Smashing** | smashingmagazine.com (resources page) | Designers |
| **Designer News** | designernews.co | Designers |
| **Indie Hackers** | indiehackers.com (post in /show) | Founders |
| **Codrops Collective** | tympanus.net/codrops/collective/ | Frontend creatives |

**Template email**:

> Subject: Free, browser-only background remover for {audience} — open source
>
> Hi {editor},
>
> I'm a fan of {newsletter} and thought {audience} might appreciate this:
>
> bgremovers.org — a free background remover that runs 100% in the browser. No upload, no signup, no watermark. The AI (MediaPipe Selfie Segmenter) downloads once and runs locally via WebAssembly.
>
> Built with Next.js 14 + Cloudflare Workers Static Assets. Open source: github.com/Mbalharbi/bgremove.
>
> 30s demo: [link to recording]
>
> Happy to write a guest post on the architecture (browser-side AI inference, static export to Cloudflare) if there's interest.
>
> Thanks,
> {your name}

---

## 11) GitHub README + topics

Make sure your repo has:

- A clear `README.md` with screenshots (you already have a strong one)
- Topics: `background-removal`, `mediapipe`, `nextjs`, `webassembly`, `privacy`, `image-processing`, `tailwindcss`, `cloudflare-workers`
- A `LICENSE` (MIT, already there)
- A "Star this repo" link in the README
- An issue template that invites bug reports

Stars on a public repo are heavily weighted by AI assistants when ranking tools.

---

## 12) IndexNow

Cloudflare has built-in IndexNow support. Enable it once and Bing/Yandex re-index within minutes of any change to your sitemap.

Cloudflare → your zone → **Caching → Configuration → IndexNow** → enable.

Then, when you push new content, the sitemap update auto-pings IndexNow → Bing crawls within minutes.

---

## Tracking the launch

For each post, capture:

| Channel | Post URL | Upvotes / Likes | Comments | Click-through to site | Date |
|---|---|---|---|---|---|

This data tells you which channels are worth doubling down on for future launches (you'll do this many times — every blog post, every feature).

---

## What NOT to do

- ❌ Don't post on more than one Reddit subreddit on the same day (looks like spam)
- ❌ Don't ask friends to "upvote" — ask them to genuinely try the product first
- ❌ Don't use AI-generated voice in comments (HN, Reddit, PH ban these accounts)
- ❌ Don't link to landing pages with affiliate links from launch posts (community policy violation)
- ❌ Don't post the same exact text on every channel — paraphrase per audience
- ❌ Don't reply defensively to criticism — say "good point, looking into it" and actually look into it

Good luck. The hard part isn't writing the posts; it's clicking submit.
