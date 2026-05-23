import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const src = fs.readFileSync(path.resolve("scripts/record-proof-video.mjs"), "utf8");
const overlayScript = src.match(/const overlayScript = `([\s\S]*?)`;/)[1];

(async () => {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 }, locale: "ar-SA" });
  const page = await ctx.newPage();
  await page.addInitScript(overlayScript);
  await page.goto("https://bgremovers.org/ar", { waitUntil: "networkidle" });
  await page.waitForTimeout(2500);
  await page.locator('input[type="file"]').first().setInputFiles("test-image.png");
  await page.waitForTimeout(9000);
  await page.screenshot({ path: "C:/Users/user/Desktop/proof-final.png", fullPage: false });
  await browser.close();
  console.log("done");
})();
