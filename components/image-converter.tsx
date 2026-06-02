"use client";

import * as React from "react";
import { Upload, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Client-side image format converter. Reads JPG/PNG/WebP via canvas, re-encodes
 * to the requested output type entirely in-browser. No bytes ever leave the
 * device — same privacy model as the background remover.
 */

type Format = "image/png" | "image/jpeg" | "image/webp";

interface ImageConverterProps {
  /** Target output type. */
  to: Format;
  /** Default quality (0..1) for JPEG/WebP. PNG ignores quality. */
  defaultQuality?: number;
  /** Allowed input MIME types. */
  acceptMime: string;
  /** Filename suffix (e.g. "jpg", "png", "webp"). */
  outExt: string;
}

const QUALITIES = [60, 75, 85, 95];

export function ImageConverter({ to, defaultQuality = 0.85, acceptMime, outExt }: ImageConverterProps) {
  const [file, setFile] = React.useState<File | null>(null);
  const [outBlob, setOutBlob] = React.useState<Blob | null>(null);
  const [outUrl, setOutUrl] = React.useState<string>("");
  const [busy, setBusy] = React.useState(false);
  const [quality, setQuality] = React.useState(Math.round(defaultQuality * 100));
  const [error, setError] = React.useState<string>("");

  React.useEffect(() => () => { if (outUrl) URL.revokeObjectURL(outUrl); }, [outUrl]);

  const convert = React.useCallback(async (f: File) => {
    setBusy(true);
    setError("");
    setOutBlob(null);
    if (outUrl) URL.revokeObjectURL(outUrl);
    try {
      const bitmap = await createImageBitmap(f);
      const canvas = document.createElement("canvas");
      canvas.width = bitmap.width;
      canvas.height = bitmap.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas not available");
      // JPG doesn't support transparency — fill with white so transparent input
      // doesn't end up as solid black.
      if (to === "image/jpeg") {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.drawImage(bitmap, 0, 0);
      const blob = await new Promise<Blob>((resolve, reject) =>
        canvas.toBlob(
          (b) => (b ? resolve(b) : reject(new Error("Conversion failed"))),
          to,
          to === "image/png" ? undefined : quality / 100
        )
      );
      setOutBlob(blob);
      setOutUrl(URL.createObjectURL(blob));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Conversion failed");
    } finally {
      setBusy(false);
    }
  }, [to, quality, outUrl]);

  const onFile = (f: File | null) => {
    setFile(f);
    if (f) void convert(f);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f) onFile(f);
  };

  const onPaste = React.useCallback((e: ClipboardEvent) => {
    const item = Array.from(e.clipboardData?.items || []).find((i) => i.type.startsWith("image/"));
    if (item) {
      const f = item.getAsFile();
      if (f) onFile(f);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    document.addEventListener("paste", onPaste);
    return () => document.removeEventListener("paste", onPaste);
  }, [onPaste]);

  const download = () => {
    if (!outBlob) return;
    const a = document.createElement("a");
    const baseName = file?.name.replace(/\.[^.]+$/, "") || "image";
    a.href = outUrl;
    a.download = `${baseName}.${outExt}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const showQuality = to !== "image/png";
  const origSize = file?.size || 0;
  const newSize = outBlob?.size || 0;
  const delta = origSize && newSize ? Math.round((newSize / origSize - 1) * 100) : 0;

  return (
    <div className="space-y-6">
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
        className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-card/40 p-10 transition-colors hover:border-primary/40"
      >
        <label className="flex cursor-pointer flex-col items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Upload className="h-6 w-6" />
          </div>
          <p className="text-base font-semibold">Drop an image, paste, or tap to upload</p>
          <p className="text-xs text-muted-foreground">Up to 30 MB · processed locally in your browser</p>
          <input
            type="file"
            accept={acceptMime}
            className="sr-only"
            onChange={(e) => onFile(e.target.files?.[0] ?? null)}
          />
        </label>
      </div>

      {showQuality && (
        <div>
          <p className="text-sm font-medium">Quality</p>
          <div className="mt-2 flex gap-2">
            {QUALITIES.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => {
                  setQuality(q);
                  if (file) void convert(file);
                }}
                className={`flex-1 rounded-lg border px-3 py-2 text-sm transition-colors ${
                  quality === q
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-background hover:bg-muted/40"
                }`}
              >
                {q}%
              </button>
            ))}
          </div>
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {file && (
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="truncate font-semibold">{file.name}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {(origSize / 1024).toFixed(0)} KB → {(newSize / 1024).toFixed(0)} KB
                {origSize && newSize ? ` (${delta > 0 ? "+" : ""}${delta}%)` : ""}
              </p>
            </div>
            <Button onClick={download} disabled={!outBlob || busy}>
              <Download className="h-4 w-4" /> Download {outExt.toUpperCase()}
            </Button>
          </div>
          {outUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={outUrl} alt="" className="mt-4 max-h-96 w-full rounded-lg object-contain bg-muted/30" />
          )}
        </div>
      )}
    </div>
  );
}
