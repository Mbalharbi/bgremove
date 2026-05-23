/**
 * Browser-only background removal using MediaPipe Tasks Vision (Selfie Segmenter).
 *
 * - Model + WASM loaded once and cached via the browser's HTTP cache.
 * - Inference runs on GPU when available, falls back to CPU automatically.
 * - All processing happens in-browser; no image bytes leave the device.
 *
 * Selfie Segmenter is trained primarily on people; portraits and selfies
 * give the best results. Non-person subjects can still work but quality varies.
 */

import {
  ImageSegmenter,
  FilesetResolver,
  type ImageSegmenterResult,
} from "@mediapipe/tasks-vision";
import type { LoadStage, RemoveOptions, RemoveResult } from "./bg-removal-types";
import { BG_REMOVAL_LIMITS } from "./bg-removal-types";

const MEDIAPIPE_VERSION = "0.10.35";
const WASM_BASE_URL = `https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@${MEDIAPIPE_VERSION}/wasm`;
const MODEL_URL =
  "https://storage.googleapis.com/mediapipe-models/image_segmenter/selfie_segmenter/float16/1/selfie_segmenter.tflite";

const MAX_DIMENSION_DEFAULT = BG_REMOVAL_LIMITS.maxDimension;
const MAX_FILE_BYTES = BG_REMOVAL_LIMITS.maxFileBytes;

let segmenterPromise: Promise<ImageSegmenter> | null = null;

/**
 * Lazily initialise the segmenter. Subsequent calls return the cached instance.
 * Safe to call multiple times concurrently; only one network load happens.
 */
export async function getMediaPipeSegmenter(
  onProgress?: (stage: LoadStage) => void
): Promise<ImageSegmenter> {
  if (typeof window === "undefined") {
    throw new Error("Background removal is only available in the browser.");
  }

  if (segmenterPromise) return segmenterPromise;

  segmenterPromise = (async () => {
    try {
      onProgress?.("loading-wasm");
      const vision = await FilesetResolver.forVisionTasks(WASM_BASE_URL);

      onProgress?.("loading-model");
      const segmenter = await ImageSegmenter.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: MODEL_URL,
          delegate: "GPU",
        },
        runningMode: "IMAGE",
        outputCategoryMask: false,
        outputConfidenceMasks: true,
      });

      onProgress?.("ready");
      return segmenter;
    } catch (err) {
      // Reset so a future call can retry.
      segmenterPromise = null;
      onProgress?.("error");
      throw err;
    }
  })();

  return segmenterPromise;
}

/** Pre-warm the segmenter without processing an image. Useful on focus/hover. */
export function preloadMediaPipe(): void {
  void getMediaPipeSegmenter().catch(() => {
    /* user will see the error when they actually try to use it */
  });
}

/**
 * Decode a File or Blob into an HTMLImageElement.
 * Throws on unreadable input.
 */
async function loadImage(file: File | Blob): Promise<HTMLImageElement> {
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
    // Image object retains pixel data after load; URL can be released.
    URL.revokeObjectURL(url);
  }
}

/**
 * Remove the background from an image using MediaPipe (people-focused fallback).
 * Returns a PNG blob with transparency.
 */
export async function removeBackgroundMediaPipe(
  file: File | Blob,
  opts: RemoveOptions = {}
): Promise<RemoveResult> {
  if (file.size > MAX_FILE_BYTES) {
    throw new Error(
      `Image is too large (${(file.size / 1024 / 1024).toFixed(1)} MB). Maximum is ${MAX_FILE_BYTES / 1024 / 1024} MB.`
    );
  }

  const start = performance.now();
  const segmenter = await getMediaPipeSegmenter(opts.onProgress);

  const img = await loadImage(file);
  const maxDim = opts.maxDimension ?? MAX_DIMENSION_DEFAULT;

  let width = img.naturalWidth;
  let height = img.naturalHeight;
  let downscaled = false;
  if (Math.max(width, height) > maxDim) {
    const scale = maxDim / Math.max(width, height);
    width = Math.round(width * scale);
    height = Math.round(height * scale);
    downscaled = true;
  }

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) {
    throw new Error("Browser canvas is unavailable.");
  }
  ctx.drawImage(img, 0, 0, width, height);
  const imageData = ctx.getImageData(0, 0, width, height);

  let result: ImageSegmenterResult | undefined;
  try {
    result = segmenter.segment(canvas);
    const mask = result.confidenceMasks?.[0];
    if (!mask) {
      throw new Error("Segmentation returned no mask.");
    }
    const maskValues = mask.getAsFloat32Array();
    applyMask(imageData.data, maskValues, opts.edgeSharpness ?? 0.6);
    mask.close();
  } finally {
    result?.close?.();
  }

  ctx.putImageData(imageData, 0, 0);

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("Failed to encode PNG."))),
      "image/png"
    );
  });

  return {
    blob,
    width,
    height,
    processingMs: performance.now() - start,
    downscaled,
    engine: "mediapipe-selfie",
  };
}

/**
 * Apply a confidence mask as alpha. `sharpness` reshapes the mask:
 *   alpha' = clamp((alpha - 0.5) * (1 + 4*sharpness) + 0.5, 0, 1)
 * which keeps mid-confidence pixels (hair, fur edges) softer.
 */
function applyMask(
  pixels: Uint8ClampedArray,
  mask: Float32Array,
  sharpness: number
): void {
  const k = 1 + 4 * Math.max(0, Math.min(1, sharpness));
  for (let i = 0; i < mask.length; i++) {
    let v = (mask[i] - 0.5) * k + 0.5;
    if (v < 0) v = 0;
    else if (v > 1) v = 1;
    pixels[i * 4 + 3] = Math.round(v * 255);
  }
}

