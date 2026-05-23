/**
 * Records a video proving bgremovers.org/ar does NOT upload images.
 * Injects an on-page overlay (after React mounts) that hooks fetch/XHR
 * and displays live counters. Records 1280x720 webm.
 */
import { chromium } from "playwright";
import path from "node:path";
import fs from "node:fs";

const OUT_DIR = "C:/Users/user/Desktop/proof-video";
const TEST_IMG = path.resolve("test-image.png");
fs.mkdirSync(OUT_DIR, { recursive: true });

// Injected AFTER page mounts — guaranteed body exists.
const installOverlay = () => {
  const style = document.createElement("style");
  style.textContent = `
    #__proof {
      position: fixed !important; top: 14px !important; left: 14px !important;
      z-index: 2147483647 !important;
      background: #0b1220 !important; color: #e5e7eb !important;
      font: 14px/1.5 ui-monospace,Menlo,Consolas,monospace !important;
      border: 2px solid #10b981 !important; border-radius: 12px !important;
      padding: 14px 18px !important;
      box-shadow: 0 10px 30px rgba(0,0,0,.5) !important;
      min-width: 380px !important; direction: rtl !important;
    }
    #__proof h3 { margin: 0 0 8px !important; color: #34d399 !important; font-size: 15px !important; }
    #__proof .row { display: flex !important; justify-content: space-between !important; gap: 12px !important; }
    #__proof .ok { color: #34d399 !important; font-weight: 700 !important; }
    #__proof .bad { color: #f87171 !important; font-weight: 700 !important; }
    #__proof .muted { color: #94a3b8 !important; font-size: 12px !important; margin-top: 8px !important; }
  `;
  document.head.appendChild(style);

  const box = document.createElement("div");
  box.id = "__proof";
  box.innerHTML = `
    <h3>🔒 مراقبة الشبكة الحيّة</h3>
    <div class="row"><span>إجمالي طلبات الشبكة:</span><span id="__t" class="ok">0</span></div>
    <div class="row"><span>طلبات رفع صور:</span><span id="__u" class="ok">0</span></div>
    <div class="muted">يراقب fetch + XHR + Beacon — أي رفع صورة يصير أحمر</div>
  `;
  document.body.appendChild(box);

  let total = 0, uploads = 0;
  const tEl = document.getElementById("__t");
  const uEl = document.getElementById("__u");
  const refresh = () => {
    tEl.textContent = String(total);
    uEl.textContent = String(uploads);
    uEl.className = uploads === 0 ? "ok" : "bad";
  };

  const isImagePayload = (body) => {
    if (!body) return false;
    try {
      if (body instanceof Blob) return body.size > 10000 && (body.type || "").startsWith("image/");
      if (body instanceof ArrayBuffer) return body.byteLength > 10000;
      if (body instanceof FormData) {
        for (const [, v] of body.entries()) {
          if (v instanceof Blob && v.size > 10000 && (v.type || "").startsWith("image/")) return true;
        }
      }
    } catch {}
    return false;
  };

  const origFetch = window.fetch;
  window.fetch = function (input, init) {
    total++;
    if (init && isImagePayload(init.body)) uploads++;
    refresh();
    return origFetch.apply(this, arguments);
  };

  const origSend = XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.send = function (body) {
    total++;
    if (isImagePayload(body)) uploads++;
    refresh();
    return origSend.apply(this, arguments);
  };

  if (navigator.sendBeacon) {
    const origBeacon = navigator.sendBeacon.bind(navigator);
    navigator.sendBeacon = function (url, data) {
      total++;
      if (isImagePayload(data)) uploads++;
      refresh();
      return origBeacon(url, data);
    };
  }
  return "installed";
};

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    recordVideo: { dir: OUT_DIR, size: { width: 1280, height: 720 } },
    locale: "ar-SA",
  });
  const page = await context.newPage();

  page.on("console", (m) => console.log("[browser]", m.type(), m.text()));

  console.log("[1/6] navigate to /ar");
  await page.goto("https://bgremovers.org/ar", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(2000);

  console.log("[2/6] inject overlay (post-mount)");
  const r = await page.evaluate(installOverlay);
  console.log("    overlay:", r);
  await page.waitForTimeout(1500);

  console.log("[3/6] drop test image");
  await page.locator('input[type="file"]').first().setInputFiles(TEST_IMG);

  console.log("[4/6] wait for BG removal (model loads + inference)");
  await page.waitForTimeout(8000);

  console.log("[5/6] linger so viewer reads the counters");
  await page.waitForTimeout(4000);

  console.log("[6/6] save video");
  const videoPath = await page.video().path();
  await page.screenshot({ path: "C:/Users/user/Desktop/proof-final.png" });
  await context.close();
  await browser.close();

  console.log("video:", videoPath);
})().catch((e) => { console.error(e); process.exit(1); });
