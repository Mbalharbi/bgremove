"use client";

/**
 * Manual touch-up after background removal: an erase brush (make pixels
 * transparent) and a restore brush (bring back the original pixels), plus a
 * magic wand that does the same to a whole area of similar colour in one click.
 *
 * Works on the full-resolution alpha channel. The original image's RGB is
 * always used for colour, so "restore" brings back exactly what was in the
 * photo. Undo/redo keep whole-alpha snapshots, capped by memory.
 *
 * Coordinates: pointer → image pixels via the canvas' on-screen rect, so CSS
 * zoom and scrolling are accounted for automatically.
 */

import * as React from "react";
import { Eraser, Paintbrush, Wand2, Brush, Undo2, Redo2, ZoomIn, ZoomOut, Maximize2, Eye, EyeOff, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToolStrings } from "@/lib/tool-i18n";
import { cn } from "@/lib/utils";
import { wandSelect } from "@/lib/magic-wand";
import { toolFromPath, track } from "@/lib/track";

type Mode = "erase" | "restore";
type Tool = "brush" | "wand";

interface MaskEditorProps {
  originalUrl: string;
  resultBlob: Blob;
  onDone: (blob: Blob) => void;
  onCancel: () => void;
}

const MAX_UNDO_BYTES = 160 * 1024 * 1024;
const HARDNESS = 0.6; // inner 60% of the brush is full strength, the rest feathers out

async function loadPixels(src: string | Blob): Promise<ImageData> {
  const url = typeof src === "string" ? src : URL.createObjectURL(src);
  try {
    const img = new Image();
    img.src = url;
    await img.decode();
    const c = document.createElement("canvas");
    c.width = img.naturalWidth;
    c.height = img.naturalHeight;
    const ctx = c.getContext("2d", { willReadFrequently: true })!;
    ctx.drawImage(img, 0, 0);
    return ctx.getImageData(0, 0, c.width, c.height);
  } finally {
    if (typeof src !== "string") URL.revokeObjectURL(url);
  }
}

export function MaskEditor({ originalUrl, resultBlob, onDone, onCancel }: MaskEditorProps) {
  const t = useToolStrings();
  const rootRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [ready, setReady] = React.useState(false);
  const [mode, setMode] = React.useState<Mode>("erase");
  const [tool, setTool] = React.useState<Tool>("brush");
  const [tolerance, setTolerance] = React.useState(25);
  const [wandAll, setWandAll] = React.useState(false);
  const wandTracked = React.useRef(false);
  const [size, setSize] = React.useState(30); // on-screen diameter in CSS px
  const [zoom, setZoom] = React.useState(1);
  const [ghost, setGhost] = React.useState(true);
  const [cursor, setCursor] = React.useState<{ x: number; y: number } | null>(null);
  const [, bump] = React.useReducer((n: number) => n + 1, 0); // re-render for undo/redo buttons

  // Working state lives in refs: it changes on every pointer move.
  const st = React.useRef<{
    w: number;
    h: number;
    rgb: Uint8ClampedArray; // original RGBA (alpha ignored)
    alpha: Uint8ClampedArray; // current mask
    out: ImageData; // what's drawn: original RGB + current alpha
    undo: Uint8ClampedArray[];
    redo: Uint8ClampedArray[];
    drawing: boolean;
    last: { x: number; y: number } | null;
    dirty: [number, number, number, number] | null;
    raf: number;
  } | null>(null);

  // The editor replaces the result view in place, usually while the page is
  // scrolled down to the result buttons — bring the toolbar into view.
  React.useEffect(() => {
    rootRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, []);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      const [orig, res] = await Promise.all([loadPixels(originalUrl), loadPixels(resultBlob)]);
      if (cancelled) return;
      const { width: w, height: h } = res;
      // The result may be downscaled vs. the original; match sizes.
      let rgb = orig.data;
      if (orig.width !== w || orig.height !== h) {
        const c = document.createElement("canvas");
        c.width = w;
        c.height = h;
        const ctx = c.getContext("2d", { willReadFrequently: true })!;
        const tmp = document.createElement("canvas");
        tmp.width = orig.width;
        tmp.height = orig.height;
        tmp.getContext("2d")!.putImageData(orig, 0, 0);
        ctx.drawImage(tmp, 0, 0, w, h);
        rgb = ctx.getImageData(0, 0, w, h).data;
      }
      const alpha = new Uint8ClampedArray(w * h);
      for (let i = 0; i < w * h; i++) alpha[i] = res.data[i * 4 + 3];
      const out = new ImageData(w, h);
      for (let i = 0; i < w * h; i++) {
        out.data[i * 4] = rgb[i * 4];
        out.data[i * 4 + 1] = rgb[i * 4 + 1];
        out.data[i * 4 + 2] = rgb[i * 4 + 2];
        out.data[i * 4 + 3] = alpha[i];
      }
      st.current = { w, h, rgb, alpha, out, undo: [], redo: [], drawing: false, last: null, dirty: null, raf: 0 };
      const cv = canvasRef.current!;
      cv.width = w;
      cv.height = h;
      cv.getContext("2d")!.putImageData(out, 0, 0);
      setReady(true);
    })();
    return () => {
      cancelled = true;
      if (st.current?.raf) cancelAnimationFrame(st.current.raf);
    };
  }, [originalUrl, resultBlob]);

  const flush = React.useCallback(() => {
    const s = st.current;
    if (!s || !s.dirty) return;
    const [x0, y0, x1, y1] = s.dirty;
    s.dirty = null;
    s.raf = 0;
    canvasRef.current!.getContext("2d")!.putImageData(s.out, 0, 0, x0, y0, x1 - x0 + 1, y1 - y0 + 1);
  }, []);

  const scheduleFlush = React.useCallback(() => {
    const s = st.current!;
    if (!s.raf) s.raf = requestAnimationFrame(flush);
  }, [flush]);

  /** Paint one round dab of radius r (image px) at (cx, cy). */
  const dab = React.useCallback(
    (cx: number, cy: number, r: number, m: Mode) => {
      const s = st.current!;
      const x0 = Math.max(0, Math.floor(cx - r)), x1 = Math.min(s.w - 1, Math.ceil(cx + r));
      const y0 = Math.max(0, Math.floor(cy - r)), y1 = Math.min(s.h - 1, Math.ceil(cy + r));
      if (x0 > x1 || y0 > y1) return;
      for (let y = y0; y <= y1; y++) {
        for (let x = x0; x <= x1; x++) {
          const d = Math.hypot(x + 0.5 - cx, y + 0.5 - cy) / r;
          if (d >= 1) continue;
          const k = d <= HARDNESS ? 1 : (1 - d) / (1 - HARDNESS);
          const i = y * s.w + x;
          const a = s.alpha[i];
          const next = m === "erase" ? a * (1 - k) : a + (255 - a) * k;
          // Never move against the brush direction (keeps repeated passes stable).
          const v = m === "erase" ? Math.min(a, Math.round(next)) : Math.max(a, Math.round(next));
          s.alpha[i] = v;
          s.out.data[i * 4 + 3] = v;
        }
      }
      s.dirty = s.dirty
        ? [Math.min(s.dirty[0], x0), Math.min(s.dirty[1], y0), Math.max(s.dirty[2], x1), Math.max(s.dirty[3], y1)]
        : [x0, y0, x1, y1];
    },
    []
  );

  const toImage = (e: React.PointerEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    const s = st.current!;
    return {
      x: ((e.clientX - rect.left) / rect.width) * s.w,
      y: ((e.clientY - rect.top) / rect.height) * s.h,
      scale: s.w / rect.width, // image px per CSS px
    };
  };

  const pushUndo = () => {
    const s = st.current!;
    s.undo.push(s.alpha.slice());
    s.redo = [];
    let bytes = s.undo.length * s.alpha.length;
    while (bytes > MAX_UNDO_BYTES && s.undo.length > 1) {
      s.undo.shift();
      bytes -= s.alpha.length;
    }
  };

  /** One wand click: erase or restore every pixel of similar colour. */
  const applyWand = (x: number, y: number) => {
    const s = st.current!;
    pushUndo();
    const sel = wandSelect(s.rgb, s.w, s.h, x, y, tolerance, !wandAll);
    for (let i = 0; i < sel.length; i++) {
      const k = sel[i];
      if (!k) continue;
      const a = s.alpha[i];
      const v = mode === "erase" ? Math.min(a, Math.round((a * (255 - k)) / 255)) : Math.max(a, Math.round(a + ((255 - a) * k) / 255));
      s.alpha[i] = v;
      s.out.data[i * 4 + 3] = v;
    }
    s.dirty = [0, 0, s.w - 1, s.h - 1];
    flush();
    bump();
    if (!wandTracked.current) {
      wandTracked.current = true;
      track(toolFromPath(window.location.pathname), "wand_use");
    }
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (!st.current) return;
    e.preventDefault();
    if (tool === "wand") {
      const p = toImage(e);
      applyWand(p.x, p.y);
      return;
    }
    try {
      (e.target as Element).setPointerCapture(e.pointerId);
    } catch {
      /* capture is a nicety (keeps strokes going past the edge); never block drawing on it */
    }
    pushUndo();
    const p = toImage(e);
    st.current.drawing = true;
    st.current.last = p;
    dab(p.x, p.y, (size / 2) * p.scale, mode);
    scheduleFlush();
    bump();
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const s = st.current;
    if (!s) return;
    const rect = canvasRef.current!.getBoundingClientRect();
    setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    if (!s.drawing || !s.last) return;
    const p = toImage(e);
    const r = (size / 2) * p.scale;
    // Interpolate so fast strokes stay continuous.
    const dist = Math.hypot(p.x - s.last.x, p.y - s.last.y);
    const steps = Math.max(1, Math.ceil(dist / Math.max(1, r / 3)));
    for (let k = 1; k <= steps; k++) {
      dab(s.last.x + ((p.x - s.last.x) * k) / steps, s.last.y + ((p.y - s.last.y) * k) / steps, r, mode);
    }
    s.last = p;
    scheduleFlush();
  };

  const endStroke = () => {
    if (st.current) {
      st.current.drawing = false;
      st.current.last = null;
    }
  };

  const restoreSnapshot = (from: "undo" | "redo") => {
    const s = st.current;
    if (!s) return;
    const src = from === "undo" ? s.undo : s.redo;
    const dst = from === "undo" ? s.redo : s.undo;
    const snap = src.pop();
    if (!snap) return;
    dst.push(s.alpha.slice());
    s.alpha.set(snap);
    for (let i = 0; i < snap.length; i++) s.out.data[i * 4 + 3] = snap[i];
    s.dirty = [0, 0, s.w - 1, s.h - 1];
    flush();
    bump();
  };

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!(e.ctrlKey || e.metaKey) || e.key.toLowerCase() !== "z") return;
      e.preventDefault();
      restoreSnapshot(e.shiftKey ? "redo" : "undo");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const finish = () => {
    canvasRef.current!.toBlob((b) => b && onDone(b), "image/png");
  };

  const s = st.current;
  const canUndo = !!s && s.undo.length > 0;
  const canRedo = !!s && s.redo.length > 0;

  return (
    <div ref={rootRef} className="flex min-h-[480px] scroll-mt-20 flex-col gap-3">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 rounded-xl border border-border bg-card p-2">
        <div className="flex rounded-lg bg-muted p-1" role="group">
          {(["brush", "wand"] as Tool[]).map((k) => (
            <button
              key={k}
              type="button"
              aria-pressed={tool === k}
              onClick={() => setTool(k)}
              data-testid={`tool-${k}`}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                tool === k ? "bg-background text-foreground shadow" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {k === "brush" ? <Brush className="h-4 w-4" /> : <Wand2 className="h-4 w-4" />}
              {k === "brush" ? t.brushTool : t.wandTool}
            </button>
          ))}
        </div>
        <div className="flex rounded-lg bg-muted p-1" role="group" aria-label={t.editTitle}>
          {(["erase", "restore"] as Mode[]).map((m) => (
            <button
              key={m}
              type="button"
              aria-pressed={mode === m}
              onClick={() => setMode(m)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                mode === m ? "bg-background text-foreground shadow" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {m === "erase" ? <Eraser className="h-4 w-4" /> : <Paintbrush className="h-4 w-4" />}
              {m === "erase" ? t.erase : t.restore}
            </button>
          ))}
        </div>
        {tool === "brush" ? (
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            {t.brushSize}
            <input
              type="range"
              min={4}
              max={160}
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="w-28 accent-[hsl(var(--primary))]"
              aria-label={t.brushSize}
            />
          </label>
        ) : (
          <>
            <label className="flex items-center gap-2 text-sm text-muted-foreground">
              {t.tolerance}
              <input
                type="range"
                min={1}
                max={100}
                value={tolerance}
                onChange={(e) => setTolerance(Number(e.target.value))}
                className="w-28 accent-[hsl(var(--primary))]"
                aria-label={t.tolerance}
              />
            </label>
            <label className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <input type="checkbox" checked={wandAll} onChange={(e) => setWandAll(e.target.checked)} className="accent-[hsl(var(--primary))]" />
              {t.wandAll}
            </label>
          </>
        )}
        <div className="flex items-center gap-1">
          <Button type="button" variant="ghost" size="icon" onClick={() => restoreSnapshot("undo")} disabled={!canUndo} aria-label={t.undo} title={t.undo}>
            <Undo2 className="h-4 w-4" />
          </Button>
          <Button type="button" variant="ghost" size="icon" onClick={() => restoreSnapshot("redo")} disabled={!canRedo} aria-label={t.redo} title={t.redo}>
            <Redo2 className="h-4 w-4" />
          </Button>
          <Button type="button" variant="ghost" size="icon" onClick={() => setZoom((z) => Math.max(1, z / 1.5))} disabled={zoom <= 1} aria-label={t.zoomOut} title={t.zoomOut}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button type="button" variant="ghost" size="icon" onClick={() => setZoom((z) => Math.min(8, z * 1.5))} aria-label={t.zoomIn} title={t.zoomIn}>
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button type="button" variant="ghost" size="icon" onClick={() => setZoom(1)} disabled={zoom === 1} aria-label={t.zoomFit} title={t.zoomFit}>
            <Maximize2 className="h-4 w-4" />
          </Button>
          <Button type="button" variant="ghost" size="icon" onClick={() => setGhost((g) => !g)} aria-pressed={ghost} aria-label={t.showOriginal} title={t.showOriginal}>
            {ghost ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Canvas (scrolls when zoomed) */}
      <div ref={scrollRef} className="relative max-h-[70vh] overflow-auto rounded-xl border border-border" dir="ltr">
        <div className="checker-bg relative" style={{ width: `${zoom * 100}%` }}>
          {ghost && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={originalUrl} alt="" aria-hidden className="pointer-events-none absolute inset-0 h-full w-full opacity-25" draggable={false} />
          )}
          <canvas
            ref={canvasRef}
            data-ready={ready}
            className="relative block h-auto w-full touch-none"
            style={{ cursor: tool === "wand" ? "crosshair" : "none" }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endStroke}
            onPointerCancel={endStroke}
            onPointerLeave={() => {
              setCursor(null);
            }}
            aria-label={t.editTitle}
          />
          {cursor && ready && tool === "brush" && (
            <div
              className={cn(
                "pointer-events-none absolute rounded-full border-2",
                mode === "erase" ? "border-red-500" : "border-emerald-500"
              )}
              style={{ width: size, height: size, left: cursor.x - size / 2, top: cursor.y - size / 2 }}
            />
          )}
        </div>
        {!ready && <div className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">{t.preparing}</div>}
      </div>

      <p className="text-xs text-muted-foreground">{tool === "wand" ? t.wandHint : t.editHint}</p>

      <div className="flex flex-wrap justify-end gap-2">
        <Button type="button" variant="outline" size="lg" onClick={onCancel}>
          <X className="h-4 w-4" />
          {t.cancel}
        </Button>
        <Button type="button" size="lg" onClick={finish} disabled={!ready}>
          <Check className="h-4 w-4" />
          {t.applyEdits}
        </Button>
      </div>
    </div>
  );
}
