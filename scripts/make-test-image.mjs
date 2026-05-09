// Generate a test portrait-style PNG so we can verify the BG removal flow.
import { writeFileSync } from "node:fs";
import { Resvg } from "@resvg/resvg-js";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">
  <rect width="600" height="600" fill="#3b82f6"/>
  <circle cx="300" cy="240" r="110" fill="#fde68a"/>
  <ellipse cx="300" cy="470" rx="180" ry="170" fill="#7c2d12"/>
  <circle cx="265" cy="225" r="10" fill="#1f2937"/>
  <circle cx="335" cy="225" r="10" fill="#1f2937"/>
  <path d="M 260 280 Q 300 305 340 280" stroke="#1f2937" stroke-width="6" fill="none" stroke-linecap="round"/>
</svg>`;

const png = new Resvg(Buffer.from(svg), { fitTo: { mode: "width", value: 600 } }).render().asPng();
writeFileSync("test-image.png", png);
console.log("wrote test-image.png");
