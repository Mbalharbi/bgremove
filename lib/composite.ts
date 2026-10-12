/**
 * Put a transparent cutout on a new background (most requested feature in
 * on-site feedback: 8 of 17 answers). The cutout itself is never modified,
 * so the visitor can switch backgrounds freely and still download the
 * transparent PNG.
 */

export type Background =
  | { kind: "none" }
  | { kind: "color"; color: string } // any CSS colour, e.g. "#ffffff"
  | { kind: "image"; url: string }; // object URL of a visitor-chosen photo

async function loadImage(src: string): Promise<HTMLImageElement> {
  const img = new Image();
  img.src = src;
  await img.decode();
  return img;
}

/** Returns a PNG of `cutout` drawn over `bg` at the cutout's own size. */
export async function compositeOnto(cutout: Blob, bg: Background): Promise<Blob> {
  if (bg.kind === "none") return cutout;
  const fgUrl = URL.createObjectURL(cutout);
  try {
    const fg = await loadImage(fgUrl);
    const w = fg.naturalWidth, h = fg.naturalHeight;
    const c = document.createElement("canvas");
    c.width = w;
    c.height = h;
    const ctx = c.getContext("2d")!;
    if (bg.kind === "color") {
      ctx.fillStyle = bg.color;
      ctx.fillRect(0, 0, w, h);
    } else {
      // "cover": fill the frame, crop the overflow, keep the photo's aspect.
      const im = await loadImage(bg.url);
      const s = Math.max(w / im.naturalWidth, h / im.naturalHeight);
      const dw = im.naturalWidth * s, dh = im.naturalHeight * s;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(im, (w - dw) / 2, (h - dh) / 2, dw, dh);
    }
    ctx.drawImage(fg, 0, 0);
    return await new Promise<Blob>((res, rej) => c.toBlob((b) => (b ? res(b) : rej(new Error("encode failed"))), "image/png"));
  } finally {
    URL.revokeObjectURL(fgUrl);
  }
}
