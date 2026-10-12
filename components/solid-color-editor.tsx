"use client";

/**
 * Solid-colour background mode (lib/solid-bg.ts) for logos, text and
 * screenshots. Live preview runs on a downscaled copy; Apply re-runs at full
 * resolution so the output matches what the visitor tuned.
 */

import * as React from "react";
import { Check, Pipette, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToolStrings } from "@/lib/tool-i18n";
import { DEFAULT_FEATHER, DEFAULT_TOLERANCE, estimateBorderColor, solidKey, type RGB } from "@/lib/solid-bg";

const PREVIEW_MAX = 1200;

interface Props {
  originalUrl: string;
  onDone: (blob: Blob) => void;
  onCancel: () => void;
}

async function pixels(url: string, maxDim?: number): Promise<ImageData> {
  const img = new Image();
  img.src = url;
  await img.decode();
  let w = img.naturalWidth, h = img.naturalHeight;
  if (maxDim && Math.max(w, h) > maxDim) {
    const s = maxDim / Math.max(w, h);
    w = Math.round(w * s);
    h = Math.round(h * s);
  }
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d", { willReadFrequently: true })!;
  ctx.drawImage(img, 0, 0, w, h);
  return ctx.getImageData(0, 0, w, h);
}

const hex = (c: RGB) => "#" + c.map((v) => v.toString(16).padStart(2, "0")).join("");

export function SolidColorEditor({ originalUrl, onDone, onCancel }: Props) {
  const t = useToolStrings();
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const [small, setSmall] = React.useState<ImageData | null>(null);
  const [color, setColor] = React.useState<RGB>([0, 0, 0]);
  const [tolerance, setTolerance] = React.useState(DEFAULT_TOLERANCE);
  const [keepInside, setKeepInside] = React.useState(false);
  const [busy, setBusy] = React.useState(false);

  React.useEffect(() => {
    rootRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    let cancelled = false;
    void pixels(originalUrl, PREVIEW_MAX).then((d) => {
      if (cancelled) return;
      setColor(estimateBorderColor(d.data, d.width, d.height).color);
      setSmall(d);
    });
    return () => {
      cancelled = true;
    };
  }, [originalUrl]);

  // Live preview.
  React.useEffect(() => {
    if (!small || !canvasRef.current) return;
    const out = solidKey(small.data, small.width, small.height, {
      color, tolerance, feather: DEFAULT_FEATHER, connectedOnly: keepInside,
    });
    const cv = canvasRef.current;
    cv.width = small.width;
    cv.height = small.height;
    cv.getContext("2d")!.putImageData(new ImageData(out, small.width, small.height), 0, 0);
  }, [small, color, tolerance, keepInside]);

  // Eyedropper: click the preview to choose the colour to remove (from the original pixels).
  const pick = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!small) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = Math.min(small.width - 1, Math.max(0, Math.floor(((e.clientX - r.left) / r.width) * small.width)));
    const y = Math.min(small.height - 1, Math.max(0, Math.floor(((e.clientY - r.top) / r.height) * small.height)));
    const i = (y * small.width + x) * 4;
    setColor([small.data[i], small.data[i + 1], small.data[i + 2]]);
  };

  const apply = async () => {
    setBusy(true);
    try {
      const full = await pixels(originalUrl);
      const out = solidKey(full.data, full.width, full.height, {
        color, tolerance, feather: DEFAULT_FEATHER, connectedOnly: keepInside,
      });
      const c = document.createElement("canvas");
      c.width = full.width;
      c.height = full.height;
      c.getContext("2d")!.putImageData(new ImageData(out, full.width, full.height), 0, 0);
      c.toBlob((b) => b && onDone(b), "image/png");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div ref={rootRef} className="flex min-h-[480px] scroll-mt-20 flex-col gap-3">
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-card p-3 text-sm">
        <span className="font-semibold">{t.solidTitle}</span>
        <span className="inline-flex items-center gap-2 text-muted-foreground">
          <Pipette className="h-4 w-4" />
          {t.solidColor}
          <span className="h-6 w-6 rounded border border-border" style={{ background: hex(color) }} aria-label={hex(color)} title={hex(color)} />
          <input
            type="color"
            value={hex(color)}
            onChange={(e) => {
              const v = e.target.value;
              setColor([parseInt(v.slice(1, 3), 16), parseInt(v.slice(3, 5), 16), parseInt(v.slice(5, 7), 16)]);
            }}
            aria-label={t.solidColor}
            className="h-6 w-8 cursor-pointer bg-transparent"
          />
        </span>
        <label className="flex items-center gap-2 text-muted-foreground">
          {t.solidTolerance}
          <input
            type="range"
            min={0}
            max={150}
            value={tolerance}
            onChange={(e) => setTolerance(Number(e.target.value))}
            className="w-28 accent-[hsl(var(--primary))]"
            aria-label={t.solidTolerance}
          />
        </label>
        <label className="flex items-center gap-2 text-muted-foreground">
          <input type="checkbox" checked={keepInside} onChange={(e) => setKeepInside(e.target.checked)} />
          {t.solidKeepInside}
        </label>
      </div>

      <div className="checker-bg relative overflow-hidden rounded-xl border border-border" dir="ltr">
        <canvas
          ref={canvasRef}
          data-ready={!!small}
          onPointerDown={pick}
          className="block h-auto w-full cursor-crosshair"
          aria-label={t.solidPickHint}
        />
        {!small && <div className="flex min-h-[300px] items-center justify-center text-sm text-muted-foreground">{t.preparing}</div>}
      </div>
      <p className="text-xs text-muted-foreground">{t.solidPickHint}</p>

      <div className="flex flex-wrap justify-end gap-2">
        <Button type="button" variant="outline" size="lg" onClick={onCancel}>
          <X className="h-4 w-4" />
          {t.cancel}
        </Button>
        <Button type="button" size="lg" onClick={apply} disabled={!small || busy}>
          <Check className="h-4 w-4" />
          {t.applyEdits}
        </Button>
      </div>
    </div>
  );
}
