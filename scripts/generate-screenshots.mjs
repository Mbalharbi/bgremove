// Generate marketing/submission screenshots of every key page on the live
// site, at both desktop and mobile viewports, in both light and dark themes.
//
// Output: screenshots/<page-slug>-<viewport>-<theme>.png
//
// Run with: node scripts/generate-screenshots.mjs
// (Requires the production site at bgremovers.org to be reachable.)

import { mkdir, rm } from "node:fs/promises";
import { chromium } from "playwright";

const SITE = "https://bgremovers.org";
const OUT_DIR = "screenshots";

const PAGES = [
  { slug: "home", path: "/" },
  { slug: "portrait", path: "/portrait-background-remover/" },
  { slug: "product", path: "/product-photo-background-remover/" },
  { slug: "logo", path: "/logo-background-remover/" },
  { slug: "transparent-png", path: "/transparent-png-maker/" },
  { slug: "screenshot-remover", path: "/screenshot-background-remover/" },
  { slug: "bulk", path: "/bulk/" },
  { slug: "compressor", path: "/tools/image-compressor/" },
  { slug: "resizer", path: "/tools/image-resizer/" },
  { slug: "vs-remove-bg", path: "/vs/remove-bg/" },
  { slug: "vs-photoshop", path: "/vs/photoshop/" },
  { slug: "vs-canva", path: "/vs/canva/" },
  { slug: "blog-index", path: "/blog/" },
  { slug: "blog-comparison-post", path: "/blog/best-free-background-removers-2026/" },
  { slug: "about", path: "/about/" },
  { slug: "privacy", path: "/privacy/" },
];

const VIEWPORTS = {
  desktop: { width: 1440, height: 900, deviceScaleFactor: 1 },
  mobile: { width: 390, height: 844, deviceScaleFactor: 2 },
};

const THEMES = ["light", "dark"];

function log(msg) {
  process.stdout.write(`[screenshots] ${msg}\n`);
}

async function captureOne({ browser, page, viewport, theme, fullPage }) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    deviceScaleFactor: viewport.deviceScaleFactor,
    colorScheme: theme,
    // Make sure system fonts aren't a surprise; rely on next/font from the page.
    userAgent:
      "Mozilla/5.0 (BgRemove-Screenshot-Bot/1.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0 Safari/537.36",
  });
  const browserPage = await context.newPage();

  // Persist the theme choice via localStorage before navigation so next-themes
  // applies it before the first paint (avoids a flash of the wrong theme).
  await browserPage.addInitScript((t) => {
    try {
      window.localStorage.setItem("theme", t);
    } catch {}
  }, theme);

  const url = SITE + page.path;
  await browserPage.goto(url, { waitUntil: "networkidle", timeout: 30000 });

  // Wait a tick for fonts + any client-side mounts (theme toggle, animations).
  await browserPage.waitForLoadState("networkidle");
  await browserPage.waitForTimeout(800);

  // Hide cookie banners or focus rings that might be distracting (none today,
  // but cheap insurance for future).
  await browserPage.addStyleTag({
    content: `
      *, *::before, *::after { transition: none !important; animation: none !important; }
      ::-webkit-scrollbar { display: none; }
    `,
  });

  const outPath = `${OUT_DIR}/${page.slug}-${viewport.name}-${theme}${fullPage ? "-full" : ""}.png`;
  await browserPage.screenshot({
    path: outPath,
    fullPage,
    animations: "disabled",
  });

  await context.close();
  return outPath;
}

async function main() {
  // Fresh output dir for each run so stale shots from a removed page disappear.
  await rm(OUT_DIR, { recursive: true, force: true });
  await mkdir(OUT_DIR, { recursive: true });

  log(`launching headless chromium…`);
  const browser = await chromium.launch();

  let count = 0;
  const total = PAGES.length * Object.keys(VIEWPORTS).length * THEMES.length * 2;

  try {
    for (const page of PAGES) {
      for (const [vpName, viewport] of Object.entries(VIEWPORTS)) {
        for (const theme of THEMES) {
          // Capture both a viewport-sized shot (great for previews) and a
          // full-page shot (great for store listings showing depth).
          for (const fullPage of [false, true]) {
            const out = await captureOne({
              browser,
              page,
              viewport: { ...viewport, name: vpName },
              theme,
              fullPage,
            });
            count++;
            log(`(${count}/${total}) ${out}`);
          }
        }
      }
    }
  } finally {
    await browser.close();
  }

  log(`done — ${count} screenshots written to ${OUT_DIR}/`);
}

main().catch((err) => {
  process.stderr.write(`[screenshots] ERROR: ${err?.stack || err}\n`);
  process.exit(1);
});
