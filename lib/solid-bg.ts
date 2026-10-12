/**
 * "Solid-colour background" removal for logos, text and screenshots.
 *
 * The AI model segments the *salient object*, which is the wrong question for
 * white text on a dark background (it erased half the text in a user report).
 * Here the user (or auto-detection) names the background colour and every
 * pixel close to it becomes transparent — nothing else is touched.
 *
 * Pure functions on RGBA buffers: no DOM, so they run in the browser, in a
 * worker, or under Node for benchmarking.
 */

export type RGB = [number, number, number];

export interface SolidKeyOptions {
  /** Background colour to remove. */
  color: RGB;
  /** Colour distance (0–441) at or below which a pixel is fully background. */
  tolerance: number;
  /** Extra distance over which alpha ramps from 0 to 255 (anti-aliased edges). */
  feather: number;
  /**
   * Only remove background-coloured pixels connected to the image border.
   * Keeps same-coloured areas inside the subject (e.g. black stripes on a
   * black-background photo) but also keeps enclosed holes such as the inside
   * of an "o" — so it's off by default (best for text).
   */
  connectedOnly: boolean;
}

export const DEFAULT_TOLERANCE = 40;
export const DEFAULT_FEATHER = 60;

const dist = (r: number, g: number, b: number, c: RGB) => {
  const dr = r - c[0], dg = g - c[1], db = b - c[2];
  return Math.sqrt(dr * dr + dg * dg + db * db);
};

/**
 * Guess the background from the image border: the median colour of a 2px
 * frame, plus how uniform the frame is (share of border pixels within 40 of
 * the median). Uniformity ≥ 0.9 suggests a solid background worth offering.
 */
export function estimateBorderColor(data: Uint8ClampedArray, w: number, h: number): { color: RGB; uniformity: number } {
  const rs: number[] = [], gs: number[] = [], bs: number[] = [];
  const push = (x: number, y: number) => {
    const i = (y * w + x) * 4;
    rs.push(data[i]); gs.push(data[i + 1]); bs.push(data[i + 2]);
  };
  const step = Math.max(1, Math.floor(Math.max(w, h) / 2000)); // cap work on huge images
  for (let x = 0; x < w; x += step) for (const y of [0, 1, h - 2, h - 1]) if (y >= 0 && y < h) push(x, y);
  for (let y = 2; y < h - 2; y += step) for (const x of [0, 1, w - 2, w - 1]) if (x >= 0 && x < w) push(x, y);
  const med = (a: number[]) => a.slice().sort((p, q) => p - q)[a.length >> 1];
  const color: RGB = [med(rs), med(gs), med(bs)];
  let near = 0;
  for (let k = 0; k < rs.length; k++) if (dist(rs[k], gs[k], bs[k], color) <= 40) near++;
  return { color, uniformity: rs.length ? near / rs.length : 0 };
}

/**
 * Remove the background colour. Returns a new RGBA buffer where background
 * pixels are transparent and edge pixels are partially transparent with the
 * background's colour taken out ("decontaminated"), so text doesn't keep a
 * dark fringe when placed on a light page.
 */
export function solidKey(src: Uint8ClampedArray, w: number, h: number, o: SolidKeyOptions): Uint8ClampedArray<ArrayBuffer> {
  const out = new Uint8ClampedArray(src.length);
  const n = w * h;
  const alpha = new Uint8Array(n);
  const lo = o.tolerance, span = Math.max(1, o.feather);

  for (let p = 0; p < n; p++) {
    const i = p * 4;
    const d = dist(src[i], src[i + 1], src[i + 2], o.color);
    alpha[p] = d <= lo ? 0 : d >= lo + span ? 255 : Math.round(((d - lo) / span) * 255);
  }

  if (o.connectedOnly) {
    // Flood fill from the border through not-fully-opaque pixels; anything
    // background-ish that the fill can't reach is part of the subject.
    const seen = new Uint8Array(n);
    const stack: number[] = [];
    const seed = (p: number) => {
      if (!seen[p] && alpha[p] < 255) { seen[p] = 1; stack.push(p); }
    };
    for (let x = 0; x < w; x++) { seed(x); seed((h - 1) * w + x); }
    for (let y = 0; y < h; y++) { seed(y * w); seed(y * w + w - 1); }
    while (stack.length) {
      const p = stack.pop()!;
      const x = p % w, y = (p - x) / w;
      if (x > 0) seed(p - 1);
      if (x < w - 1) seed(p + 1);
      if (y > 0) seed(p - w);
      if (y < h - 1) seed(p + w);
    }
    for (let p = 0; p < n; p++) if (!seen[p]) alpha[p] = 255;
  }

  const [br, bg, bb] = o.color;
  for (let p = 0; p < n; p++) {
    const i = p * 4, a = alpha[p];
    out[i + 3] = a;
    if (a === 0) continue;
    if (a === 255) {
      out[i] = src[i]; out[i + 1] = src[i + 1]; out[i + 2] = src[i + 2];
      continue;
    }
    // C = a·F + (1−a)·B  →  F = (C − (1−a)·B) / a
    const k = a / 255;
    out[i] = (src[i] - (1 - k) * br) / k;
    out[i + 1] = (src[i + 1] - (1 - k) * bg) / k;
    out[i + 2] = (src[i + 2] - (1 - k) * bb) / k;
  }
  return out;
}
