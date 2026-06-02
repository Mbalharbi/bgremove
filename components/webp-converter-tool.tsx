"use client";

import * as React from "react";
import { Upload, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

/** WebP-specific converter that lets the user pick the OUTPUT direction. */
export function WebpConverterTool() {
  const [dir, setDir] = React.useState<"toWebp" | "fromWebp">("toWebp");
  const [outFormat, setOutFormat] = React.useState<"image/png" | "image/jpeg">("image/png");
  const [file, setFile] = React.useState<File | null>(null);
  const [outBlob, setOutBlob] = React.useState<Blob | null>(null);
  const [outUrl, setOutUrl] = React.useState<string>("");
  const [quality, setQuality] = React.useState(85);
  const [busy, setBusy] = React.useState(false);

  React.useEffect(() => () => { if (outUrl) URL.revokeObjectURL(outUrl); }, [outUrl]);

  const convert = React.useCallback(async (f: File) => {
    setBusy(true);
    setOutBlob(null);
    if (outUrl) URL.revokeObjectURL(outUrl);
    try {
      const bitmap = await createImageBitmap(f);
      const canvas = document.createElement("canvas");
      canvas.width = bitmap.width;
      canvas.height = bitmap.height;
      const ctx = canvas.getContext("2d")!;
      const targetType = dir === "toWebp" ? "image/webp" : outFormat;
      if (targetType === "image/jpeg") {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.drawImage(bitmap, 0, 0);
      const blob = await new Promise<Blob>((resolve, reject) =>
        canvas.toBlob(
          (b) => (b ? resolve(b) : reject(new Error("Conversion failed"))),
          targetType,
          targetType === "image/png" ? undefined : quality / 100
        )
      );
      setOutBlob(blob);
      setOutUrl(URL.createObjectURL(blob));
    } finally {
      setBusy(false);
    }
  }, [dir, outFormat, quality, outUrl]);

  const onFile = (f: File | null) => {
    setFile(f);
    if (f) void convert(f);
  };

  const accept = dir === "toWebp" ? "image/png,image/jpeg" : "image/webp";
  const outExt = dir === "toWebp" ? "webp" : outFormat === "image/png" ? "png" : "jpg";
  const showQuality = dir === "toWebp" || outFormat === "image/jpeg";

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

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-2">
        <button onClick={() => { setDir("toWebp"); setFile(null); setOutBlob(null); }} className={`rounded-lg border px-4 py-3 text-sm font-medium ${dir === "toWebp" ? "border-primary bg-primary/10 text-primary" : "border-border bg-background"}`}>PNG/JPG → WebP</button>
        <button onClick={() => { setDir("fromWebp"); setFile(null); setOutBlob(null); }} className={`rounded-lg border px-4 py-3 text-sm font-medium ${dir === "fromWebp" ? "border-primary bg-primary/10 text-primary" : "border-border bg-background"}`}>WebP → PNG/JPG</button>
      </div>

      {dir === "fromWebp" && (
        <div className="grid grid-cols-2 gap-2">
          <button onClick={() => { setOutFormat("image/png"); if (file) void convert(file); }} className={`rounded-lg border px-4 py-2 text-sm ${outFormat === "image/png" ? "border-primary bg-primary/10 text-primary" : "border-border"}`}>Output PNG</button>
          <button onClick={() => { setOutFormat("image/jpeg"); if (file) void convert(file); }} className={`rounded-lg border px-4 py-2 text-sm ${outFormat === "image/jpeg" ? "border-primary bg-primary/10 text-primary" : "border-border"}`}>Output JPG</button>
        </div>
      )}

      <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-card/40 p-10">
        <label className="flex cursor-pointer flex-col items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Upload className="h-6 w-6" />
          </div>
          <p className="text-base font-semibold">Drop a {dir === "toWebp" ? "PNG or JPG" : "WebP"} image</p>
          <p className="text-xs text-muted-foreground">Processed locally in your browser</p>
          <input type="file" accept={accept} className="sr-only" onChange={(e) => onFile(e.target.files?.[0] ?? null)} />
        </label>
      </div>

      {showQuality && (
        <div>
          <p className="text-sm font-medium">Quality: {quality}%</p>
          <input
            type="range" min={40} max={95} step={5} value={quality}
            onChange={(e) => { setQuality(Number(e.target.value)); if (file) void convert(file); }}
            className="mt-2 w-full"
          />
        </div>
      )}

      {file && (
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="truncate font-semibold">{file.name}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {(file.size / 1024).toFixed(0)} KB → {((outBlob?.size || 0) / 1024).toFixed(0)} KB
              </p>
            </div>
            <Button onClick={download} disabled={!outBlob || busy}>
              <Download className="h-4 w-4" /> Download {outExt.toUpperCase()}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
