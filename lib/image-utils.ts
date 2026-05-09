/**
 * Pure browser image utilities. No server, no model.
 * Used by /tools/image-compressor and /tools/image-resizer.
 */

export type ImageFormat = "image/jpeg" | "image/png" | "image/webp";

export interface DecodedImage {
  bitmap: HTMLImageElement;
  width: number;
  height: number;
  url: string;
}

/** Decode a File into an HTMLImageElement. Caller owns the returned URL. */
export async function decodeImage(file: File | Blob): Promise<DecodedImage> {
  const url = URL.createObjectURL(file);
  const bitmap = await new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not decode image."));
    };
    img.src = url;
  });
  return { bitmap, width: bitmap.naturalWidth, height: bitmap.naturalHeight, url };
}

interface EncodeOptions {
  format: ImageFormat;
  /** 0..1 — only honored for JPEG and WebP. */
  quality?: number;
  width?: number;
  height?: number;
}

/** Re-encode an image at given dimensions/quality. */
export async function encodeImage(
  source: HTMLImageElement | HTMLCanvasElement,
  opts: EncodeOptions
): Promise<{ blob: Blob; width: number; height: number }> {
  const sourceWidth = source instanceof HTMLImageElement ? source.naturalWidth : source.width;
  const sourceHeight = source instanceof HTMLImageElement ? source.naturalHeight : source.height;
  const width = opts.width ?? sourceWidth;
  const height = opts.height ?? sourceHeight;

  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(width));
  canvas.height = Math.max(1, Math.round(height));
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas unavailable.");

  // For JPEG, fill white background since JPEG has no alpha.
  if (opts.format === "image/jpeg") {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(source, 0, 0, canvas.width, canvas.height);

  const quality =
    opts.format === "image/png" ? undefined : Math.max(0.05, Math.min(1, opts.quality ?? 0.85));

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("Encode failed."))),
      opts.format,
      quality
    );
  });

  return { blob, width: canvas.width, height: canvas.height };
}

export function extensionFor(format: ImageFormat): string {
  switch (format) {
    case "image/jpeg":
      return "jpg";
    case "image/png":
      return "png";
    case "image/webp":
      return "webp";
  }
}

export const SOCIAL_PRESETS = [
  { name: "Instagram square", width: 1080, height: 1080 },
  { name: "Instagram portrait", width: 1080, height: 1350 },
  { name: "Instagram story", width: 1080, height: 1920 },
  { name: "X / Twitter post", width: 1600, height: 900 },
  { name: "Facebook post", width: 1200, height: 630 },
  { name: "Facebook cover", width: 820, height: 312 },
  { name: "LinkedIn banner", width: 1584, height: 396 },
  { name: "LinkedIn post", width: 1200, height: 627 },
  { name: "YouTube thumbnail", width: 1280, height: 720 },
  { name: "Pinterest pin", width: 1000, height: 1500 },
  { name: "Twitch banner", width: 1200, height: 380 },
  { name: "Email header", width: 1200, height: 600 },
] as const;
