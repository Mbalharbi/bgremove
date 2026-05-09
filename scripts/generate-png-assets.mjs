// Generates PNG versions of SVG assets at build time so social platforms,
// older browsers, and PWA installers get raster images.
//
// Reads SVG sources, rasterises with @resvg/resvg-js (pure WASM, no native deps),
// writes PNGs to /public/. Idempotent — safe to run repeatedly.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { Resvg } from "@resvg/resvg-js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const TASKS = [
  { src: "app/icon.svg", out: "public/favicon-16x16.png", width: 16 },
  { src: "app/icon.svg", out: "public/favicon-32x32.png", width: 32 },
  { src: "app/icon.svg", out: "public/icon-192.png", width: 192 },
  { src: "app/icon.svg", out: "public/icon-512.png", width: 512 },
  { src: "app/apple-icon.svg", out: "public/apple-touch-icon.png", width: 180 },
  { src: "public/og-image.svg", out: "public/og-image.png", width: 1200 },
];

let written = 0;
for (const task of TASKS) {
  const srcPath = resolve(root, task.src);
  const outPath = resolve(root, task.out);
  if (!existsSync(srcPath)) {
    console.warn(`[png-assets] skip — missing ${task.src}`);
    continue;
  }
  mkdirSync(dirname(outPath), { recursive: true });
  const svg = readFileSync(srcPath);
  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: task.width },
    background: "rgba(0,0,0,0)",
  });
  const png = resvg.render().asPng();
  writeFileSync(outPath, png);
  written++;
  console.log(`[png-assets] ${task.src} -> ${task.out} (${task.width}px)`);
}

console.log(`[png-assets] done — ${written} file(s) written`);
