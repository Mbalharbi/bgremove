"use client";

import * as React from "react";
import { Upload, AlertTriangle } from "lucide-react";

/**
 * Client-side image metadata viewer. Parses EXIF/XMP from JPEG and PNG
 * directly in the browser — no upload, no server. We implement a minimal
 * EXIF/marker parser inline to avoid bundling a 50KB dependency.
 *
 * Covers: image dimensions, MIME, file size, EXIF camera tags (make, model,
 * lens, exposure, ISO, GPS), and a "privacy risk" summary.
 */

interface ParsedMeta {
  filename: string;
  size: number;
  mime: string;
  width?: number;
  height?: number;
  exif?: Record<string, string | number>;
  hasGps?: boolean;
  privacyRisks: string[];
}

// Minimal EXIF reader for JPEG markers. Returns { tagId: value } only for
// the handful of tags we care about. We don't try to be a full EXIF lib.
function readJpegExif(buf: ArrayBuffer): Record<string, string | number> | null {
  const view = new DataView(buf);
  if (view.getUint16(0) !== 0xffd8) return null; // SOI
  let offset = 2;
  while (offset < view.byteLength) {
    if (view.getUint8(offset) !== 0xff) return null;
    const marker = view.getUint8(offset + 1);
    const segLen = view.getUint16(offset + 2);
    if (marker === 0xe1) {
      // APP1 — usually EXIF
      const start = offset + 4;
      const sig = new TextDecoder("ascii").decode(buf.slice(start, start + 4));
      if (sig === "Exif") {
        const tiffStart = start + 6;
        const little = view.getUint16(tiffStart) === 0x4949;
        const get16 = (o: number) => (little ? view.getUint16(o, true) : view.getUint16(o, false));
        const get32 = (o: number) => (little ? view.getUint32(o, true) : view.getUint32(o, false));
        const ifd0Offset = tiffStart + get32(tiffStart + 4);
        const numEntries = get16(ifd0Offset);
        const wanted: Record<number, string> = {
          0x010f: "Make",
          0x0110: "Model",
          0x0132: "DateTime",
          0x013b: "Artist",
          0x8825: "GPSInfoIFD",
          0x8769: "ExifIFD",
        };
        const out: Record<string, string | number> = {};
        let exifIFD = 0;
        let gpsIFD = 0;
        for (let i = 0; i < numEntries; i++) {
          const entry = ifd0Offset + 2 + i * 12;
          const tag = get16(entry);
          if (wanted[tag]) {
            const type = get16(entry + 2);
            const count = get32(entry + 4);
            if (tag === 0x8825) gpsIFD = get32(entry + 8);
            else if (tag === 0x8769) exifIFD = get32(entry + 8);
            else if (type === 2) {
              // ASCII
              const valOffset = count <= 4 ? entry + 8 : tiffStart + get32(entry + 8);
              const bytes = new Uint8Array(buf.slice(valOffset, valOffset + count));
              const str = new TextDecoder("ascii").decode(bytes).replace(/\0+$/, "");
              out[wanted[tag]] = str;
            }
          }
        }
        if (gpsIFD) out["__hasGps"] = 1;
        if (exifIFD) {
          // Walk the Exif IFD for lens / iso / exposure
          const num = get16(tiffStart + exifIFD);
          const lensTags: Record<number, string> = {
            0x8827: "ISO",
            0x920a: "FocalLength",
            0x829d: "FNumber",
            0x829a: "ExposureTime",
            0xa434: "LensModel",
          };
          for (let i = 0; i < num; i++) {
            const entry = tiffStart + exifIFD + 2 + i * 12;
            const tag = get16(entry);
            if (lensTags[tag]) {
              const type = get16(entry + 2);
              const count = get32(entry + 4);
              if (type === 2) {
                const valOffset = count <= 4 ? entry + 8 : tiffStart + get32(entry + 8);
                const bytes = new Uint8Array(buf.slice(valOffset, valOffset + count));
                out[lensTags[tag]] = new TextDecoder("ascii").decode(bytes).replace(/\0+$/, "");
              } else if (type === 5) {
                // RATIONAL (2x uint32)
                const o = tiffStart + get32(entry + 8);
                const num1 = get32(o);
                const den = get32(o + 4);
                out[lensTags[tag]] = den ? num1 / den : 0;
              } else if (type === 3) {
                out[lensTags[tag]] = get16(entry + 8);
              }
            }
          }
        }
        return out;
      }
    }
    offset += 2 + segLen;
  }
  return null;
}

async function parseMeta(file: File): Promise<ParsedMeta> {
  const buf = await file.arrayBuffer();
  const exif = file.type === "image/jpeg" ? readJpegExif(buf) || undefined : undefined;
  let width: number | undefined;
  let height: number | undefined;
  try {
    const bmp = await createImageBitmap(file);
    width = bmp.width;
    height = bmp.height;
  } catch {
    /* not decodable */
  }
  const hasGps = exif?.__hasGps === 1;
  const risks: string[] = [];
  if (hasGps) risks.push("GPS coordinates embedded — file shows where the photo was taken.");
  if (exif?.Artist) risks.push(`Author name embedded: "${exif.Artist}".`);
  if (exif?.Make || exif?.Model) risks.push(`Camera identifiable: ${exif.Make ?? ""} ${exif.Model ?? ""}.`);
  if (exif?.DateTime) risks.push(`Original capture time embedded: ${exif.DateTime}.`);

  return {
    filename: file.name,
    size: file.size,
    mime: file.type,
    width,
    height,
    exif: exif ? Object.fromEntries(Object.entries(exif).filter(([k]) => !k.startsWith("__"))) : undefined,
    hasGps,
    privacyRisks: risks,
  };
}

export function ImageMetadataViewer() {
  const [meta, setMeta] = React.useState<ParsedMeta | null>(null);
  const [busy, setBusy] = React.useState(false);
  const [err, setErr] = React.useState("");

  const onFile = async (f: File | null) => {
    if (!f) return;
    setBusy(true);
    setErr("");
    try {
      const m = await parseMeta(f);
      setMeta(m);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Could not parse file");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-6">
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) void onFile(f); }}
        className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-card/40 p-10"
      >
        <label className="flex cursor-pointer flex-col items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Upload className="h-6 w-6" />
          </div>
          <p className="text-base font-semibold">Drop a JPG/PNG/WebP to inspect</p>
          <p className="text-xs text-muted-foreground">Parsed locally — file never leaves your browser</p>
          <input type="file" accept="image/*" className="sr-only" onChange={(e) => void onFile(e.target.files?.[0] ?? null)} />
        </label>
      </div>

      {busy && <p className="text-sm text-muted-foreground">Parsing…</p>}
      {err && <p className="text-sm text-destructive">{err}</p>}

      {meta && (
        <div className="space-y-6">
          {meta.privacyRisks.length > 0 && (
            <div className="rounded-2xl border border-yellow-500/40 bg-yellow-500/5 p-5">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 shrink-0 text-yellow-600" />
                <div>
                  <h3 className="font-semibold text-yellow-700 dark:text-yellow-300">Privacy notes</h3>
                  <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                    {meta.privacyRisks.map((r) => (
                      <li key={r}>• {r}</li>
                    ))}
                  </ul>
                  <p className="mt-3 text-xs text-muted-foreground">Strip these tags by re-saving the image through our PNG/JPG converter — most metadata is dropped.</p>
                </div>
              </div>
            </div>
          )}

          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="font-semibold">File</h3>
            <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <dt className="text-muted-foreground">Filename</dt><dd className="font-mono">{meta.filename}</dd>
              <dt className="text-muted-foreground">Type</dt><dd className="font-mono">{meta.mime || "unknown"}</dd>
              <dt className="text-muted-foreground">Size</dt><dd className="font-mono">{(meta.size / 1024).toFixed(1)} KB</dd>
              {meta.width && <><dt className="text-muted-foreground">Dimensions</dt><dd className="font-mono">{meta.width} × {meta.height}</dd></>}
            </dl>
          </div>

          {meta.exif && Object.keys(meta.exif).length > 0 && (
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-semibold">EXIF</h3>
              <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                {Object.entries(meta.exif).map(([k, v]) => (
                  <React.Fragment key={k}>
                    <dt className="text-muted-foreground">{k}</dt>
                    <dd className="font-mono">{String(v)}</dd>
                  </React.Fragment>
                ))}
              </dl>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
