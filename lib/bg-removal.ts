/**
 * Public background-removal API. Two engines:
 *   1. RMBG-1.4 (primary)   — high-quality general-purpose model (briaai/RMBG-1.4)
 *   2. MediaPipe (fallback) — fast people-focused model, used if RMBG fails to
 *      load or throws during inference.
 *
 * Both run 100% in the browser; image bytes never leave the device.
 *
 * Behaviour:
 *  - removeBackground(file) tries RMBG first, falls back to MediaPipe on error.
 *  - Caller can force a specific engine via opts.preferEngine.
 *  - getEngineUsed() reports which engine produced the most recent result.
 */

import {
  removeBackgroundRmbg,
  preloadRmbg,
  getRmbgPipeline,
} from "./bg-removal-rmbg";
import {
  removeBackgroundMediaPipe,
  preloadMediaPipe,
  getMediaPipeSegmenter,
} from "./bg-removal-mediapipe";
import {
  BG_REMOVAL_LIMITS,
  type Engine,
  type LoadStage,
  type RemoveOptions,
  type RemoveResult,
} from "./bg-removal-types";

export { BG_REMOVAL_LIMITS };
export type { Engine, LoadStage, RemoveOptions, RemoveResult };

/**
 * Remove the background from an image.
 *
 * Tries RMBG-1.4 first (broad, high-quality). If it fails for any reason
 * (model download, inference error, OOM), automatically falls back to
 * MediaPipe Selfie Segmenter. The caller sees a single Promise.
 *
 * Set `opts.preferEngine` to skip the orchestration and use one engine
 * directly. Useful for "people-only batch" toggles in the UI.
 */
export async function removeBackground(
  file: File | Blob,
  opts: RemoveOptions = {}
): Promise<RemoveResult> {
  if (file.size > BG_REMOVAL_LIMITS.maxFileBytes) {
    throw new Error(
      `Image is too large (${(file.size / 1024 / 1024).toFixed(1)} MB). Maximum is ${
        BG_REMOVAL_LIMITS.maxFileBytes / 1024 / 1024
      } MB.`
    );
  }

  // Caller wants a specific engine — honour it, no fallback.
  if (opts.preferEngine === "mediapipe-selfie") {
    return removeBackgroundMediaPipe(file, opts);
  }
  if (opts.preferEngine === "rmbg-1.4") {
    return removeBackgroundRmbg(file, opts);
  }

  // Default path: RMBG-1.4 primary, MediaPipe fallback.
  try {
    return await removeBackgroundRmbg(file, opts);
  } catch (rmbgErr) {
    if (typeof console !== "undefined") {
      console.warn(
        "[bg-removal] RMBG-1.4 failed, falling back to MediaPipe:",
        rmbgErr
      );
    }
    // Re-notify the UI that we're starting a fresh load for the fallback.
    opts.onProgress?.("loading-model");
    return removeBackgroundMediaPipe(file, opts);
  }
}

/**
 * Pre-warm both engines so the first user click has a head start.
 * RMBG is heavy (~44MB); MediaPipe is small (~4MB) and provides a fast
 * safety net.
 */
export function preloadSegmenter(): void {
  preloadRmbg();
  preloadMediaPipe();
}

/** Back-compat alias for the old MediaPipe-only API. */
export const getSegmenter = getMediaPipeSegmenter;
export { getRmbgPipeline, getMediaPipeSegmenter };

/** Validate a user-selected file before kicking off processing. */
export function validateImageFile(
  file: File
): { ok: true } | { ok: false; reason: string } {
  if (!file.type.startsWith("image/")) {
    return { ok: false, reason: "Please select an image file (JPG, PNG, or WebP)." };
  }
  if (file.size > BG_REMOVAL_LIMITS.maxFileBytes) {
    return {
      ok: false,
      reason: `File is too large. Maximum is ${
        BG_REMOVAL_LIMITS.maxFileBytes / 1024 / 1024
      } MB.`,
    };
  }
  return { ok: true };
}
