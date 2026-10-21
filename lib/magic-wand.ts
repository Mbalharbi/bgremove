/**
 * Magic-wand selection for the touch-up editor: pick every pixel whose colour
 * is close to the clicked one — the connected area by default, or the whole
 * image. Returns a per-pixel strength (0–255) with a soft band just past the
 * tolerance so edges don't come out jagged.
 */

/** Tolerance slider (1–100) → max colour distance (0–255 scale). */
const toThreshold = (tolerance: number) => Math.max(1, tolerance) * 1.28;
const SOFT_BAND = 1.35; // pixels up to 1.35× the threshold get partial strength

export function wandSelect(
  rgba: Uint8ClampedArray,
  w: number,
  h: number,
  sx: number,
  sy: number,
  tolerance: number,
  contiguous: boolean
): Uint8Array {
  const out = new Uint8Array(w * h);
  sx = Math.min(w - 1, Math.max(0, Math.floor(sx)));
  sy = Math.min(h - 1, Math.max(0, Math.floor(sy)));
  const s = (sy * w + sx) * 4;
  const r0 = rgba[s], g0 = rgba[s + 1], b0 = rgba[s + 2];
  const t = toThreshold(tolerance);
  const t2 = t * t * 3; // compare squared distances; /3 normalises to 0–255
  const soft2 = t2 * SOFT_BAND * SOFT_BAND;

  /** 255 inside, partial in the soft band, 0 outside. */
  const strength = (i: number) => {
    const p = i * 4;
    const dr = rgba[p] - r0, dg = rgba[p + 1] - g0, db = rgba[p + 2] - b0;
    const d2 = dr * dr + dg * dg + db * db;
    if (d2 <= t2) return 255;
    if (d2 >= soft2) return 0;
    const d = Math.sqrt(d2 / 3);
    return Math.round((255 * (t * SOFT_BAND - d)) / (t * SOFT_BAND - t));
  };

  if (!contiguous) {
    for (let i = 0; i < w * h; i++) out[i] = strength(i);
    return out;
  }

  // Flood fill: full-strength pixels spread to their neighbours; soft-band
  // pixels are kept but don't spread (so the selection can't leak).
  const seen = new Uint8Array(w * h);
  const stack = new Int32Array(w * h);
  let top = 0;
  const push = (j: number) => {
    if (seen[j]) return;
    seen[j] = 1;
    stack[top++] = j;
  };
  const seed = sy * w + sx;
  push(seed);
  while (top > 0) {
    const i = stack[--top];
    const v = strength(i);
    out[i] = v;
    if (v < 255) continue;
    const x = i % w;
    if (x > 0) push(i - 1);
    if (x < w - 1) push(i + 1);
    if (i >= w) push(i - w);
    if (i < w * (h - 1)) push(i + w);
  }
  return out;
}
