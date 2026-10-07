/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/ban-ts-comment, @typescript-eslint/no-unused-vars */
/**
 * Browser-only background removal using briaai/RMBG-1.4 via transformers.js.
 *
 * Quality: trained on a broad dataset of people, products, animals, plants,
 * and objects. Produces remove.bg-grade cutouts. ~44MB model, cached after
 * first download.
 *
 * Runs on WebGPU when available (3-5s per image) or WASM fallback (10-15s).
 * Like MediaPipe, ZERO image bytes ever leave the device.
 */

import type { LoadStage, RemoveOptions, RemoveResult } from "./bg-removal-types";

const MODEL_ID = "briaai/RMBG-1.4";

// Load transformers.js at runtime rather than bundling it. Two reasons we
// avoid the npm package: (1) it pulls onnxruntime-node, which webpack chokes
// on under Next.js static export, and (2) shipping ~1MB of JS in our bundle
// for a feature triggered by user action would tank initial load.
//
// Runtime, WASM and weights are all served from our own domain under /m/
// (see worker/index.ts) so the tool works where huggingface.co / jsdelivr
// are blocked or slow, e.g. mainland China.
const ASSET_BASE = "/m/";
const TRANSFORMERS_DIR = "transformers-3.0.2/";
const MODEL_DIR = "rmbg-1.4/";

// Minimal slice of the transformers.js namespace we actually use.
type TransformersNS = {
  env: {
    allowLocalModels: boolean;
    remoteHost: string;
    remotePathTemplate: string;
    backends: { onnx: { wasm: { wasmPaths: string } } };
  };
  AutoModel: { from_pretrained: (id: string, opts?: any) => Promise<any> };
  AutoProcessor: { from_pretrained: (id: string, opts?: any) => Promise<any> };
  RawImage: {
    fromBlob: (b: Blob) => Promise<any>;
    fromTensor: (t: any) => any;
  };
};

let modulePromise: Promise<TransformersNS> | null = null;
let modelPromise: Promise<{ model: any; processor: any; T: TransformersNS }> | null = null;

function loadTransformers(): Promise<TransformersNS> {
  if (modulePromise) return modulePromise;
  // Use webpackIgnore so Next.js doesn't try to bundle the CDN URL.
  const url = `${window.location.origin}${ASSET_BASE}${TRANSFORMERS_DIR}transformers.min.js`;
  modulePromise = (import(/* webpackIgnore: true */ url) as Promise<TransformersNS>).catch((err) => {
    modulePromise = null; // allow a retry after a network blip
    throw err;
  });
  return modulePromise;
}

type DeviceChoice = { device: "webgpu" | "wasm"; dtype: "fp16" | "fp32" | "q8" };

/**
 * Pick the runtime + weight precision. Measured on the same machine (1024px):
 *   WebGPU fp16 ≈ 1.2 s (88 MB) · WebGPU fp32 ≈ 1.4 s (176 MB)
 *   WebGPU q8 ≈ 19.5 s (int8 ops fall back to CPU) · WASM q8 ≈ 20 s (44 MB)
 * Masks from fp16 and q8 match fp32 at ≥ 99.95% IoU, so we take the smallest
 * file that is fast on each device.
 */
async function pickDevice(_T: TransformersNS): Promise<DeviceChoice> {
  try {
    // @ts-ignore - navigator.gpu may not exist in TS lib
    if (typeof navigator !== "undefined" && (navigator as any).gpu) {
      // @ts-ignore
      const adapter = await (navigator as any).gpu.requestAdapter();
      if (adapter) {
        return { device: "webgpu", dtype: adapter.features.has("shader-f16") ? "fp16" : "fp32" };
      }
    }
  } catch {
    /* fall through */
  }
  return { device: "wasm", dtype: "q8" };
}

export async function getRmbgPipeline(
  onProgress?: (stage: LoadStage) => void
): Promise<{ model: any; processor: any; T: TransformersNS }> {
  if (typeof window === "undefined") {
    throw new Error("RMBG-1.4 is only available in the browser.");
  }
  if (modelPromise) return modelPromise;

  modelPromise = (async () => {
    try {
      onProgress?.("loading-wasm");
      const T = await loadTransformers();
      T.env.allowLocalModels = false;
      // `${remoteHost}${remotePathTemplate}<file>` → /m/rmbg-1.4/onnx/model_quantized.onnx
      T.env.remoteHost = `${window.location.origin}${ASSET_BASE}`;
      T.env.remotePathTemplate = MODEL_DIR;
      T.env.backends.onnx.wasm.wasmPaths = `${window.location.origin}${ASSET_BASE}${TRANSFORMERS_DIR}`;

      onProgress?.("loading-model");
      const { device, dtype } = await pickDevice(T);

      const model = await T.AutoModel.from_pretrained(MODEL_ID, {
        // @ts-ignore — transformers.js accepts these
        device,
        // @ts-ignore
        dtype,
      });
      const processor = await T.AutoProcessor.from_pretrained(MODEL_ID, {
        // @ts-ignore — supplying explicit config because the model repo lacks one
        config: {
          do_normalize: true,
          do_pad: false,
          do_rescale: true,
          do_resize: true,
          image_mean: [0.5, 0.5, 0.5],
          image_std: [1, 1, 1],
          resample: 2,
          rescale_factor: 1 / 255,
          size: { width: 1024, height: 1024 },
        },
      });

      onProgress?.("ready");
      return { model, processor, T };
    } catch (err) {
      modelPromise = null;
      onProgress?.("error");
      throw err;
    }
  })();

  return modelPromise;
}

/** Pre-warm the RMBG pipeline. Safe to call repeatedly. */
export function preloadRmbg(): void {
  void getRmbgPipeline().catch(() => {
    /* user will see the error when they actually try to use it */
  });
}

async function blobToImage(file: File | Blob): Promise<HTMLImageElement> {
  const url = URL.createObjectURL(file);
  try {
    return await new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () =>
        reject(new Error("Could not decode this image. Try a different file."));
      img.src = url;
    });
  } finally {
    URL.revokeObjectURL(url);
  }
}

export async function removeBackgroundRmbg(
  file: File | Blob,
  opts: RemoveOptions = {}
): Promise<RemoveResult> {
  const start = performance.now();
  const { model, processor, T } = await getRmbgPipeline(opts.onProgress);

  // Decode into HTMLImageElement so we know the original dimensions.
  const img = await blobToImage(file);
  const maxDim = opts.maxDimension ?? 4096;

  let width = img.naturalWidth;
  let height = img.naturalHeight;
  let downscaled = false;
  if (Math.max(width, height) > maxDim) {
    const scale = maxDim / Math.max(width, height);
    width = Math.round(width * scale);
    height = Math.round(height * scale);
    downscaled = true;
  }

  // Draw the (possibly downscaled) source into a canvas for both the
  // RGB sample and the final RGBA composition.
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("Browser canvas is unavailable.");
  ctx.drawImage(img, 0, 0, width, height);

  // RMBG expects a RawImage; build one from the canvas.
  const blob = await new Promise<Blob>((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("encode failed"))), "image/png")
  );
  const rawImage = await T.RawImage.fromBlob(blob);

  const { pixel_values } = await processor(rawImage);
  const { output } = await model({ input: pixel_values });

  // Mask comes back at the model's working size (1024x1024). Resize to source.
  const mask = await T.RawImage.fromTensor(output[0].mul(255).to("uint8")).resize(width, height);

  // Composite alpha into the existing RGB pixels.
  const imageData = ctx.getImageData(0, 0, width, height);
  const pixels = imageData.data;
  const m = mask.data as Uint8Array;
  for (let i = 0; i < width * height; i++) pixels[i * 4 + 3] = m[i];
  ctx.putImageData(imageData, 0, 0);

  const outBlob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("Failed to encode PNG."))),
      "image/png"
    );
  });

  return {
    blob: outBlob,
    width,
    height,
    processingMs: performance.now() - start,
    downscaled,
    engine: "rmbg-1.4",
  };
}
