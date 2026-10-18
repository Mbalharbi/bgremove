/**
 * HEIC/HEIF (iPhone photos) → JPEG, in the browser.
 *
 * Most browsers other than Safari can't decode HEIC, which showed up as the
 * top failure reason ("couldn't open the image"). The converter (heic2any,
 * MIT, ~1.3 MB) is served from our own domain (/m/, see worker/index.ts) and
 * loaded only when a HEIC file is actually uploaded.
 */

type Heic2Any = (o: { blob: Blob; toType: string; quality: number }) => Promise<Blob | Blob[]>;

const CONVERTER_URL = "/m/heic2any-0.0.4/heic2any.min.js";
let loader: Promise<Heic2Any> | null = null;

export const isHeic = (f: File) => /image\/hei[cf]/i.test(f.type) || /\.hei[cf]$/i.test(f.name);

function loadConverter(): Promise<Heic2Any> {
  loader ??= new Promise<Heic2Any>((resolve, reject) => {
    const s = document.createElement("script");
    s.src = CONVERTER_URL;
    s.async = true;
    s.onload = () => {
      const fn = (window as unknown as { heic2any?: Heic2Any }).heic2any;
      if (fn) resolve(fn);
      else reject(new Error("HEIC converter failed to initialise."));
    };
    s.onerror = () => reject(new Error("Could not load the HEIC converter."));
    document.head.appendChild(s);
  }).catch((e) => {
    loader = null; // allow a retry
    throw e;
  });
  return loader;
}

/** True when this browser can decode the file itself (Safari reads HEIC; some ".heic" files are really JPEG). */
async function decodesNatively(file: File): Promise<boolean> {
  if (typeof createImageBitmap !== "function") return false;
  try {
    (await createImageBitmap(file)).close();
    return true;
  } catch {
    return false;
  }
}

/** Returns the file unchanged unless it's HEIC/HEIF the browser can't read, in which case a JPEG copy. */
export async function toBrowserImage(file: File): Promise<File> {
  if (!isHeic(file) || (await decodesNatively(file))) return file;
  const convert = await loadConverter();
  const out = await convert({ blob: file, toType: "image/jpeg", quality: 0.92 });
  const jpeg = Array.isArray(out) ? out[0] : out;
  return new File([jpeg], file.name.replace(/\.hei[cf]$/i, "") + ".jpg", { type: "image/jpeg" });
}
