/**
 * BgRemove Client SDK v1
 *
 * Free, unlimited background removal that runs in the user's browser using
 * the same RMBG-1.4 pipeline as bgremovers.org. No API key, no rate limit,
 * no upload to any server — including ours.
 *
 * Usage:
 *   <script src="https://bgremovers.org/sdk/v1.js"></script>
 *   <script>
 *     const blob = await BgRemove.removeBackground(file);
 *     // blob is a transparent PNG ready to download, upload, or display
 *   </script>
 */
(function (global) {
  "use strict";

  // Runtime + weights are served by bgremovers.org itself (CORS-enabled), so
  // the SDK works where huggingface.co / jsdelivr are blocked.
  const ASSET_BASE = "https://bgremovers.org/m/";
  const TRANSFORMERS_DIR = "transformers-3.0.2/";
  const TRANSFORMERS_CDN = ASSET_BASE + TRANSFORMERS_DIR + "transformers.min.js";
  const MODEL_ID = "briaai/RMBG-1.4";

  let modulePromise = null;
  let pipelinePromise = null;

  function loadTransformers() {
    if (modulePromise) return modulePromise;
    modulePromise = import(TRANSFORMERS_CDN);
    return modulePromise;
  }

  async function pickDevice() {
    try {
      if (typeof navigator !== "undefined" && navigator.gpu) {
        const adapter = await navigator.gpu.requestAdapter();
        // fp16 where supported: same mask as fp32 at half the download.
        if (adapter) return { device: "webgpu", dtype: adapter.features.has("shader-f16") ? "fp16" : "fp32" };
      }
    } catch (_) {}
    // Int8 is ~4x smaller and fastest on CPU/WASM.
    return { device: "wasm", dtype: "q8" };
  }

  async function getPipeline(onProgress) {
    if (pipelinePromise) return pipelinePromise;
    pipelinePromise = (async () => {
      try {
        onProgress && onProgress({ stage: "loading-runtime" });
        const T = await loadTransformers();
        T.env.allowLocalModels = false;
        T.env.remoteHost = ASSET_BASE;
        T.env.remotePathTemplate = "rmbg-1.4/";
        T.env.backends.onnx.wasm.wasmPaths = ASSET_BASE + TRANSFORMERS_DIR;

        const { device, dtype } = await pickDevice();
        onProgress && onProgress({ stage: "loading-model", device });

        const model = await T.AutoModel.from_pretrained(MODEL_ID, {
          device,
          dtype,
          progress_callback: (p) =>
            onProgress && onProgress({ stage: "downloading", progress: p }),
        });
        const processor = await T.AutoProcessor.from_pretrained(MODEL_ID, {
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
        onProgress && onProgress({ stage: "ready" });
        return { model, processor, T };
      } catch (err) {
        pipelinePromise = null;
        throw err;
      }
    })();
    return pipelinePromise;
  }

  async function blobToImage(file) {
    const url = URL.createObjectURL(file);
    try {
      return await new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error("Could not decode image."));
        img.src = url;
      });
    } finally {
      URL.revokeObjectURL(url);
    }
  }

  /**
   * removeBackground(input, opts?) → Promise<Blob>
   *
   * @param {File|Blob} input  Image file (JPG, PNG, or WebP, up to 30 MB).
   * @param {Object}   opts
   * @param {number}   opts.maxDimension  Longest edge cap. Default 4096.
   * @param {Function} opts.onProgress    Called with {stage, progress?, device?}.
   * @returns {Promise<Blob>}  Transparent PNG.
   */
  async function removeBackground(input, opts) {
    opts = opts || {};
    if (!(input instanceof Blob)) {
      throw new Error("removeBackground: input must be a File or Blob");
    }
    if (input.size > 30 * 1024 * 1024) {
      throw new Error("Image is too large. Max 30 MB.");
    }

    const { model, processor, T } = await getPipeline(opts.onProgress);
    const img = await blobToImage(input);

    const maxDim = opts.maxDimension || 4096;
    let width = img.naturalWidth;
    let height = img.naturalHeight;
    if (Math.max(width, height) > maxDim) {
      const scale = maxDim / Math.max(width, height);
      width = Math.round(width * scale);
      height = Math.round(height * scale);
    }

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    ctx.drawImage(img, 0, 0, width, height);

    const blob = await new Promise((resolve, reject) =>
      canvas.toBlob(
        (b) => (b ? resolve(b) : reject(new Error("Encode failed"))),
        "image/png"
      )
    );
    const rawImage = await T.RawImage.fromBlob(blob);
    const { pixel_values } = await processor(rawImage);
    const { output } = await model({ input: pixel_values });

    const mask = await T.RawImage.fromTensor(
      output[0].mul(255).to("uint8")
    ).resize(width, height);
    const imageData = ctx.getImageData(0, 0, width, height);
    const px = imageData.data;
    const m = mask.data;
    for (let i = 0; i < width * height; i++) px[i * 4 + 3] = m[i];
    ctx.putImageData(imageData, 0, 0);

    return await new Promise((resolve, reject) =>
      canvas.toBlob(
        (b) => (b ? resolve(b) : reject(new Error("Encode failed"))),
        "image/png"
      )
    );
  }

  /** Pre-warm the model so the first user-triggered call is faster. */
  function preload() {
    return getPipeline().catch(() => null);
  }

  global.BgRemove = { removeBackground, preload, version: "1.0.0" };
})(typeof window !== "undefined" ? window : globalThis);
