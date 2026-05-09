# Launch Checklist — BgRemove

Working list for taking BgRemove from "deployed" to "people are actually using
it." Tackle in order; each block is roughly a day's work.

---

## Pre-launch (T-7 days)

### Branding & assets
- [ ] Replace `/public/og-image.png` with a hand-designed 1200×630 PNG (the
      generated SVG is functional but a real designer can do better)
- [ ] Replace `app/icon.svg` with finalised brand mark if different
- [ ] Generate proper `favicon.ico` (multi-resolution) at
      https://realfavicongenerator.net using `app/icon.svg` as source; drop
      into `/public/`
- [ ] Take a 30-second screen recording of the tool in action (for socials)
- [ ] Take five demo screenshots: hero, before/after, bulk page, mobile view,
      dark mode (for socials + Product Hunt)

### Copy review
- [ ] Read every page out loud — flag anything stilted
- [ ] Verify all `mailto:` links go to the real `hello@bgremovers.org`
- [ ] Verify FAQ answers match the actual product (especially file size
      limits, supported formats, browser compat)

### Technical pre-flight
- [ ] `npm run build` succeeds locally
- [ ] All 15 routes render without console errors in `npm run preview`
- [ ] Lighthouse mobile score ≥ 95 in Performance, Accessibility, Best
      Practices, SEO (run on the deployed Cloudflare URL, not localhost)
- [ ] Test BG removal on 5 real photos: 1 portrait, 1 product shot,
      1 group photo, 1 photo with hair detail, 1 high-res (≥3000px)
- [ ] Test bulk processing with 10–20 images
- [ ] Test on iPhone Safari, Chrome Android, desktop Chrome, desktop Firefox
- [ ] Verify dark mode works on every page
- [ ] Verify drag/drop works
- [ ] Verify paste-from-clipboard works

### SEO setup
- [ ] Google Search Console verified, sitemap submitted
- [ ] Bing Webmaster Tools imported from GSC
- [ ] Cloudflare Web Analytics enabled
- [ ] (Optional) GA4 wired up + verified in Realtime report
- [ ] Robots.txt accessible at `https://bgremovers.org/robots.txt`
- [ ] Sitemap accessible at `https://bgremovers.org/sitemap.xml`
- [ ] OG preview tested via https://www.opengraph.xyz/url/https%3A%2F%2Fbgremovers.org

### Social accounts
- [ ] Twitter / X: `@bgremovers`
- [ ] Mastodon: `@bgremovers@fosstodon.org`
- [ ] (Optional) Bluesky: `bgremovers.bsky.social`

---

## Launch day (T-0)

### Twitter / X thread
1. Single image (the screen recording)
2. Hook: "I built a free background remover that runs 100% in your browser.
   No signup, no upload, no watermark. Here's how it works 👇"
3. Reply 1: 30s demo of the homepage with a portrait
4. Reply 2: bulk processing (drag 20 images, get a ZIP)
5. Reply 3: the privacy angle ("your photos literally never reach my server")
6. Reply 4: link to https://bgremovers.org

### Hacker News (Show HN)
- Title: `Show HN: BgRemove – Browser-only background remover (no upload, no signup)`
- Body: 4 short paragraphs — what it does, the privacy architecture, the
  stack, what's next. Avoid superlatives. Be honest about limitations
  (Selfie Segmenter is portrait-tuned).
- Best time: Tuesday 9am ET
- Be present in comments for the first 4 hours

### Reddit
- [ ] r/InternetIsBeautiful — link + 2-line description
- [ ] r/SideProject — full backstory + tech stack
- [ ] r/webdev — tech-focused angle (MediaPipe + Next.js static export)
- [ ] r/Frontend — same
- [ ] r/selfhosted — privacy angle
- [ ] r/photography — practical angle (free portrait cutouts)
- [ ] r/Entrepreneur — business angle if monetised

### Product Hunt
- [ ] Submit at midnight PT (the day starts at 12:01am PT)
- [ ] Tagline: "Browser-native background remover. Free. Private. No signup."
- [ ] Gallery: 5 screenshots + 1 GIF + 1 video
- [ ] First comment from you within 5 minutes — explain the *why*
- [ ] Notify ~20 friends to upvote within the first hour (don't ask them to
      hard-vote — ask them to genuinely try it and leave honest feedback)

### Indie communities
- [ ] Indie Hackers post — focus on the "$0 monthly cost" angle
- [ ] WIP.co — share a screenshot
- [ ] LobsterIO / Lobste.rs — only if the angle is genuinely technical
- [ ] Designer News — submit if you have any visual polish to brag about

### Direct outreach
- [ ] Email 10 designer/developer newsletters: TLDR, Smashing, CSS-Tricks
      (formerly), Frontend Focus, Web Tools Weekly, Bytes.dev
- [ ] Pitch 5 YouTubers who cover free design tools (PiXimperfect, etc.)

---

## Week 1 — content engine

Write and publish at least **two** of these blog posts (see "Blog post titles"
below for the full list of 20). Aim for one per week minimum after launch.

- [ ] "How to remove the background from a portrait in 5 seconds (no Photoshop)"
- [ ] "Why your background remover should run in your browser (and how mine does)"

Each post should include:
- A clear screenshot/GIF in the first 200 words
- A practical step-by-step
- A natural CTA back to the tool
- Schema.org Article markup (add to `lib/schema.ts`)
- Internal links to /tools/* pages

---

## Month 1 — distribution

- [ ] Cross-post each blog to Dev.to, Hashnode, Medium (canonical URLs back
      to bgremovers.org)
- [ ] Reach out to listicles ("best free image tools" articles) — request
      inclusion. Use https://respond.so or similar
- [ ] Submit to 20 SaaS/tool directories: AlternativeTo, Slant.co,
      Producthunt collections, etc.
- [ ] Open-source one component as a showcase (e.g. the before/after slider)
      → link back to bgremovers.org in the README

---

## Blog post titles (20 SEO-optimised)

### Tutorials (high intent)
1. **How to remove a background from an image in your browser (no Photoshop, no signup)**
2. **Remove background from product photos for Etsy / Shopify in 60 seconds**
3. **Make a transparent PNG from any photo — the easy way**
4. **How to cut out a person from a photo without Photoshop**
5. **The fastest way to make a profile picture with a transparent background**

### Comparisons (commercial intent)
6. **Remove.bg vs free alternatives: 5 tools tested in 2026**
7. **The best free background remover for designers (browser-based)**
8. **BgRemove vs Photoshop: when to use each**

### Use-case (long-tail)
9. **How to remove the background from a logo (and why PNG, not JPG)**
10. **Resize and remove background for Instagram in one workflow**
11. **Free background remover for Etsy product photos**
12. **How to make YouTube thumbnails with transparent cutouts**
13. **Background removal for LinkedIn headshots (without paying for a studio)**

### Technical / explainer (link-magnet)
14. **How browser-based AI works: a non-technical guide**
15. **What is MediaPipe Selfie Segmenter, and why I used it**
16. **How to build a privacy-first web tool (no server required)**
17. **Why I deployed my AI tool to a static host instead of Vercel/AWS**

### Workflow / power-user
18. **Bulk-removing backgrounds from 100 product photos: the 10-minute method**
19. **The best image formats for transparency: PNG vs WebP vs SVG**
20. **A non-designer's workflow for clean product cutouts**

---

## Success metrics

Track weekly via Cloudflare Web Analytics + Search Console:

| Metric                    | Week 1 target | Month 1 target | Month 3 target |
| ------------------------- | ------------- | -------------- | -------------- |
| Daily uniques             | 100           | 500            | 2,000          |
| Sitemap-indexed pages     | 5             | 15             | 30+            |
| Organic search clicks     | 10            | 200            | 1,500          |
| Backlinks                 | 5             | 25             | 80             |
| AdSense application       | —             | —              | submitted      |

---

## When you have ~50 daily users

- [ ] Apply for AdSense (uncomment the AdSense block in `app/layout.tsx`,
      replace `ca-pub-XXXXXXXXXX`)
- [ ] Add cookie consent banner (required for EU/UK ads)
- [ ] Consider adding 1–2 affiliate links in blog posts (Adobe Stock,
      Photoshop trials) — but never on tool pages

## When you have ~500 daily users

- [ ] Add a /pricing page if you offer a Pro tier (e.g. larger file limits,
      bulk > 20, API access)
- [ ] Set up a simple email capture for product updates (no signup wall —
      just an opt-in form on /blog)
- [ ] Consider a desktop wrapper (Tauri / Electron) for offline/enterprise
      users
