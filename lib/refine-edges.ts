/**
 * Edge refinement for the AI mask (hair, fur, fine detail).
 *
 * The model predicts its mask at 1024×1024; stretching that to the photo's
 * real size leaves soft, blurry edges. A guided filter (He et al.) re-aligns
 * the stretched mask to the edges in the photo itself. It is applied only
 * where the model was unsure (alpha 2–98 %), so solid areas never change.
 *
 * Benchmarked offline against reference mattes (bgremove-bench/scripts/
 * refine.py, 270 images: AIM-500, P3M, Figaro hair, text/logos):
 *   photos: edge error −7 %, better on 169/210 images;
 *   text & logos: edge error −40 %, better on 60/60.
 * Chosen settings: greyscale guide, radius 2 per 1024 px, eps 1e-4.
 *
 * Large images use the "fast guided filter": coefficients are computed at
 * ≤ WORK_MAX px and upsampled, which keeps memory small on phones.
 */

const EPS = 1e-4;
const RADIUS_PER_1024 = 2;
const WORK_MAX = 1600;
const LO = 5; // ≈ 0.02
const HI = 250; // ≈ 0.98

/** Mean over a (2r+1)² window; edges use the pixels that exist (separable, O(n)). */
function boxMean(src: Float32Array, w: number, h: number, r: number, tmp: Float32Array, out: Float32Array) {
  for (let y = 0; y < h; y++) {
    const row = y * w;
    let sum = 0;
    for (let x = 0; x <= Math.min(r, w - 1); x++) sum += src[row + x];
    for (let x = 0; x < w; x++) {
      const x0 = x - r, x1 = x + r;
      tmp[row + x] = sum / (Math.min(x1, w - 1) - Math.max(x0, 0) + 1);
      if (x1 + 1 < w) sum += src[row + x1 + 1];
      if (x0 >= 0) sum -= src[row + x0];
    }
  }
  for (let x = 0; x < w; x++) {
    let sum = 0;
    for (let y = 0; y <= Math.min(r, h - 1); y++) sum += tmp[y * w + x];
    for (let y = 0; y < h; y++) {
      const y0 = y - r, y1 = y + r;
      out[y * w + x] = sum / (Math.min(y1, h - 1) - Math.max(y0, 0) + 1);
      if (y1 + 1 < h) sum += tmp[(y1 + 1) * w + x];
      if (y0 >= 0) sum -= tmp[y0 * w + x];
    }
  }
}

const lumaAt = (rgba: Uint8ClampedArray, i: number) =>
  (0.299 * rgba[i * 4] + 0.587 * rgba[i * 4 + 1] + 0.114 * rgba[i * 4 + 2]) / 255;

/**
 * Refine `alpha` (w×h, 0–255, one byte per pixel) in place using the photo's
 * pixels `rgba` (w×h×4) as the guide. Returns false if nothing needed doing.
 */
export function refineEdges(rgba: Uint8ClampedArray, alpha: Uint8Array | Uint8ClampedArray, w: number, h: number): boolean {
  let unsure = false;
  for (let i = 0; i < alpha.length; i++) {
    if (alpha[i] > LO && alpha[i] < HI) {
      unsure = true;
      break;
    }
  }
  if (!unsure) return false;

  // Working resolution (fast guided filter for big photos).
  const k = Math.min(1, WORK_MAX / Math.max(w, h));
  const lw = Math.max(1, Math.round(w * k)), lh = Math.max(1, Math.round(h * k));
  const n = lw * lh;
  const rFull = Math.max(2, Math.round(RADIUS_PER_1024 * (Math.max(w, h) / 1024)));
  const r = Math.max(1, Math.round(rFull * k));

  // Guide (luma) and input (alpha) at the working size, by box-averaging.
  const I = new Float32Array(n), P = new Float32Array(n);
  if (k === 1) {
    for (let i = 0; i < n; i++) {
      I[i] = lumaAt(rgba, i);
      P[i] = alpha[i] / 255;
    }
  } else {
    const cnt = new Float32Array(n);
    for (let y = 0; y < h; y++) {
      const ly = Math.min(lh - 1, Math.floor(y * k));
      for (let x = 0; x < w; x++) {
        const j = ly * lw + Math.min(lw - 1, Math.floor(x * k));
        const i = y * w + x;
        I[j] += lumaAt(rgba, i);
        P[j] += alpha[i] / 255;
        cnt[j]++;
      }
    }
    for (let j = 0; j < n; j++) {
      I[j] /= cnt[j] || 1;
      P[j] /= cnt[j] || 1;
    }
  }

  const tmp = new Float32Array(n);
  const mI = new Float32Array(n), mP = new Float32Array(n), A = new Float32Array(n), B = new Float32Array(n);
  boxMean(I, lw, lh, r, tmp, mI);
  boxMean(P, lw, lh, r, tmp, mP);
  for (let i = 0; i < n; i++) A[i] = I[i] * P[i];
  boxMean(A, lw, lh, r, tmp, B); // B = mean(I·p)
  for (let i = 0; i < n; i++) A[i] = I[i] * I[i];
  boxMean(A, lw, lh, r, tmp, P); // P (no longer needed) = mean(I²)
  for (let i = 0; i < n; i++) {
    const a = (B[i] - mI[i] * mP[i]) / (P[i] - mI[i] * mI[i] + EPS);
    A[i] = a;
    B[i] = mP[i] - a * mI[i];
  }
  boxMean(A, lw, lh, r, tmp, mI); // mean a
  boxMean(B, lw, lh, r, tmp, mP); // mean b

  // q = mean_a · I + mean_b at full size, only where the model was unsure.
  for (let y = 0; y < h; y++) {
    // Bilinear sample of the coefficient maps (pixel centres aligned).
    const fy = Math.min(lh - 1, Math.max(0, (y + 0.5) * k - 0.5));
    const y0 = Math.floor(fy), y1 = Math.min(lh - 1, y0 + 1), wy = fy - y0;
    for (let x = 0; x < w; x++) {
      const i = y * w + x;
      const v = alpha[i];
      if (v <= LO || v >= HI) continue;
      let a: number, b: number;
      if (k === 1) {
        a = mI[i];
        b = mP[i];
      } else {
        const fx = Math.min(lw - 1, Math.max(0, (x + 0.5) * k - 0.5));
        const x0 = Math.floor(fx), x1 = Math.min(lw - 1, x0 + 1), wx = fx - x0;
        const i00 = y0 * lw + x0, i01 = y0 * lw + x1, i10 = y1 * lw + x0, i11 = y1 * lw + x1;
        a = (mI[i00] * (1 - wx) + mI[i01] * wx) * (1 - wy) + (mI[i10] * (1 - wx) + mI[i11] * wx) * wy;
        b = (mP[i00] * (1 - wx) + mP[i01] * wx) * (1 - wy) + (mP[i10] * (1 - wx) + mP[i11] * wx) * wy;
      }
      const q = a * lumaAt(rgba, i) + b;
      alpha[i] = Math.round(Math.min(1, Math.max(0, q)) * 255);
    }
  }
  return true;
}
