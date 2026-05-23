/**
 * Quick test of briaai/RMBG-1.4 on a real product photo (coffee mug).
 * Saves both the raw mask and the final transparent PNG so we can judge
 * cutout quality vs the current MediaPipe Selfie Segmenter.
 */
import { AutoModel, AutoProcessor, RawImage } from "@huggingface/transformers";
import sharp from "sharp";
import fs from "node:fs";

const INPUT = "test-mug.jpg";
const OUT_PNG = "C:/Users/user/Desktop/rmbg-result.png";
const OUT_MASK = "C:/Users/user/Desktop/rmbg-mask.png";

console.log("[1/4] loading RMBG-1.4 (first run downloads ~44MB)…");
const t0 = Date.now();
const model = await AutoModel.from_pretrained("briaai/RMBG-1.4", { device: "cpu", dtype: "fp32" });
const processor = await AutoProcessor.from_pretrained("briaai/RMBG-1.4", { config: { do_normalize: true, do_pad: false, do_rescale: true, do_resize: true, image_mean: [0.5, 0.5, 0.5], image_std: [1, 1, 1], resample: 2, rescale_factor: 1 / 255, size: { width: 1024, height: 1024 } } });
console.log(`  loaded in ${((Date.now() - t0) / 1000).toFixed(1)}s`);

console.log("[2/4] processing image…");
const image = await RawImage.fromURL(`file://${process.cwd().replace(/\\/g, "/")}/${INPUT}`);
const { pixel_values } = await processor(image);

const t1 = Date.now();
const { output } = await model({ input: pixel_values });
console.log(`  inference: ${((Date.now() - t1) / 1000).toFixed(1)}s`);

console.log("[3/4] composing transparent PNG…");
const mask = await RawImage.fromTensor(output[0].mul(255).to("uint8")).resize(image.width, image.height);

// Save mask as grayscale PNG for inspection
await sharp(mask.data, { raw: { width: mask.width, height: mask.height, channels: 1 } })
  .png().toFile(OUT_MASK);

// Read original RGB and composite alpha channel
const origRGB = await sharp(INPUT).removeAlpha().raw().toBuffer();
const rgba = Buffer.alloc(image.width * image.height * 4);
for (let i = 0; i < image.width * image.height; i++) {
  rgba[i * 4]     = origRGB[i * 3];
  rgba[i * 4 + 1] = origRGB[i * 3 + 1];
  rgba[i * 4 + 2] = origRGB[i * 3 + 2];
  rgba[i * 4 + 3] = mask.data[i];
}
await sharp(rgba, { raw: { width: image.width, height: image.height, channels: 4 } })
  .png().toFile(OUT_PNG);

console.log("[4/4] done");
console.log(" mask  →", OUT_MASK);
console.log(" final →", OUT_PNG);
console.log(` size: ${fs.statSync(OUT_PNG).size} bytes`);
