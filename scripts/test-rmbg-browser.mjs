/**
 * Real-world test of briaai/RMBG-1.4 in the browser (same env as production).
 * Spins up a tiny static page that loads transformers.js + RMBG-1.4 via CDN,
 * processes the test image, then exports the result PNG via DataURL → disk.
 */
import { chromium } from "playwright";
import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const INPUT = path.resolve("test-mug.jpg");
const OUT = "C:/Users/user/Desktop/rmbg-browser-result.png";

// Inline HTML — loads transformers.js, runs RMBG-1.4, returns dataURL via window.__result
const html = `
<!doctype html>
<meta charset="utf-8" />
<title>rmbg test</title>
<style>body{font:14px monospace;padding:20px;background:#0b1220;color:#e5e7eb;}</style>
<body>
<div id="status">loading…</div>
<script type="module">
  const log = (m) => { document.getElementById('status').textContent = m; console.log(m); };
  try {
    log('importing transformers.js…');
    const T = await import('https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.0.2/dist/transformers.min.js');
    T.env.allowLocalModels = false;

    log('loading RMBG-1.4 model…');
    const model = await T.AutoModel.from_pretrained('briaai/RMBG-1.4', {
      device: 'wasm',
      dtype: 'fp32',
      progress_callback: (p) => log('model: ' + (p.status || '') + ' ' + (p.file || '') + ' ' + (p.progress ? p.progress.toFixed(0) + '%' : '')),
    });
    const processor = await T.AutoProcessor.from_pretrained('briaai/RMBG-1.4', {
      config: {
        do_normalize: true, do_pad: false, do_rescale: true, do_resize: true,
        image_mean: [0.5,0.5,0.5], image_std: [1,1,1], resample: 2, rescale_factor: 1/255,
        size: { width: 1024, height: 1024 }
      }
    });

    log('fetching image…');
    const res = await fetch('/test-mug.jpg');
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const img = await T.RawImage.fromURL(url);

    log('processing…');
    const { pixel_values } = await processor(img);
    const t0 = performance.now();
    const { output } = await model({ input: pixel_values });
    const dt = (performance.now() - t0).toFixed(0);

    log('composing PNG ('+dt+'ms inference)…');
    const mask = await T.RawImage.fromTensor(output[0].mul(255).to('uint8')).resize(img.width, img.height);

    // Composite RGBA on canvas
    const c = document.createElement('canvas');
    c.width = img.width; c.height = img.height;
    const ctx = c.getContext('2d');
    const bmp = await createImageBitmap(blob);
    ctx.drawImage(bmp, 0, 0, img.width, img.height);
    const imgData = ctx.getImageData(0, 0, img.width, img.height);
    for (let i = 0; i < img.width * img.height; i++) imgData.data[i*4+3] = mask.data[i];
    ctx.putImageData(imgData, 0, 0);

    window.__result = c.toDataURL('image/png');
    log('DONE — inference '+dt+'ms, output '+img.width+'x'+img.height);
  } catch (e) {
    log('ERR: ' + e.message);
    window.__err = e.message;
  }
</script>
`;

// Tiny static server so transformers.js can fetch /test-mug.jpg same-origin
const server = http.createServer((req, res) => {
  if (req.url === "/" || req.url === "/index.html") {
    res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
    res.end(html);
  } else if (req.url === "/test-mug.jpg") {
    res.writeHead(200, { "content-type": "image/jpeg" });
    res.end(fs.readFileSync(INPUT));
  } else {
    res.writeHead(404); res.end();
  }
}).listen(7891);

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
page.on("console", (m) => console.log("[browser]", m.text()));
page.on("pageerror", (e) => console.log("[ERR]", e.message));

await page.goto("http://127.0.0.1:7891/", { waitUntil: "domcontentloaded" });

console.log("[*] waiting for model + inference (could take 1-3 minutes first time)…");
await page.waitForFunction(() => window.__result || window.__err, null, { timeout: 300000 });

const err = await page.evaluate(() => window.__err);
if (err) {
  console.error("FAILED:", err);
  process.exit(1);
}

const dataUrl = await page.evaluate(() => window.__result);
const b64 = dataUrl.split(",")[1];
fs.writeFileSync(OUT, Buffer.from(b64, "base64"));
console.log("[✓] saved:", OUT, fs.statSync(OUT).size, "bytes");

await browser.close();
server.close();
