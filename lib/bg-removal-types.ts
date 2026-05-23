/**
 * Shared types for background removal engines (RMBG-1.4 primary, MediaPipe fallback).
 */

export type LoadStage =
  | "idle"
  | "loading-wasm"
  | "loading-model"
  | "ready"
  | "error";

export type Engine = "rmbg-1.4" | "mediapipe-selfie";

export interface RemoveResult {
  /** PNG with transparent background. */
  blob: Blob;
  /** Output image width (may differ from input if downscaled). */
  width: number;
  /** Output image height. */
  height: number;
  /** Wall-clock ms from start of `removeBackground` to PNG encode. */
  processingMs: number;
  /** Whether the source was downscaled to fit `maxDimension`. */
  downscaled: boolean;
  /** Which engine actually produced this result. */
  engine: Engine;
}

export interface RemoveOptions {
  maxDimension?: number;
  /** Only used by MediaPipe. RMBG produces its own crisp alpha. */
  edgeSharpness?: number;
  onProgress?: (stage: LoadStage) => void;
  /** Set "mediapipe-selfie" to force the fallback engine (e.g. for people-only batches). */
  preferEngine?: Engine;
}

export const BG_REMOVAL_LIMITS = {
  maxFileBytes: 30 * 1024 * 1024,
  maxDimension: 4096,
} as const;
