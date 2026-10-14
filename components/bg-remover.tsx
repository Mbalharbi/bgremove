"use client";

import * as React from "react";
import { Loader2, RefreshCw, Sparkles, Zap, Lock, Brush, Pipette, ImagePlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UploadZone } from "@/components/upload-zone";
import { ImagePreview } from "@/components/image-preview";
import { DownloadButton } from "@/components/download-button";
import { MaskEditor } from "@/components/mask-editor";
import { SolidColorEditor } from "@/components/solid-color-editor";
import { compositeOnto, type Background } from "@/lib/composite";
import { estimateBorderColor } from "@/lib/solid-bg";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  removeBackground,
  type LoadStage,
  type RemoveResult,
} from "@/lib/bg-removal";
import { useToolStrings, type ToolStrings } from "@/lib/tool-i18n";
import { errorReason, fileTypeOf, toolFromPath, track } from "@/lib/track";
import { setLastRun } from "@/components/feedback-dialog";
import { changeExtension, formatBytes, formatMs } from "@/lib/utils";

interface Progress {
  stage: LoadStage;
  /** Bytes of model weights downloaded so far (first visit only). */
  loaded?: number;
  total?: number;
}

type Status =
  | { kind: "idle" }
  | { kind: "loading"; progress: Progress }
  | { kind: "ready"; src: BeforeAfter }
  | { kind: "error"; message: string };

interface BeforeAfter {
  beforeUrl: string;
  afterUrl: string;
  filename: string;
  result: RemoveResult;
  inputSize: number;
}

const toMb = (bytes: number) => (bytes / 1024 / 1024).toFixed(0);

/** Per-feature "used it" flags: the "New" badge shows until the visitor tries the feature. */
function useSeen(key: string): [boolean, () => void] {
  const [seen, setSeen] = React.useState(true); // assume seen until storage says otherwise (no flash)
  React.useEffect(() => {
    try {
      setSeen(localStorage.getItem(key) === "1");
    } catch {
      /* storage blocked: no badge */
    }
  }, [key]);
  const mark = React.useCallback(() => {
    setSeen(true);
    try {
      localStorage.setItem(key, "1");
    } catch {
      /* ignore */
    }
  }, [key]);
  return [seen, mark];
}

const BG_SWATCHES = ["#ffffff", "#000000", "#f3f4f6", "#2563eb", "#ef4444", "#10b981", "#f59e0b"];

/** True when the photo's border is (almost) one colour — offer Solid-colour mode. */
async function hasPlainBorder(url: string): Promise<boolean> {
  try {
    const img = new Image();
    img.src = url;
    await img.decode();
    const s = Math.min(1, 600 / Math.max(img.naturalWidth, img.naturalHeight));
    const c = document.createElement("canvas");
    c.width = Math.max(4, Math.round(img.naturalWidth * s));
    c.height = Math.max(4, Math.round(img.naturalHeight * s));
    const ctx = c.getContext("2d", { willReadFrequently: true })!;
    ctx.drawImage(img, 0, 0, c.width, c.height);
    return estimateBorderColor(ctx.getImageData(0, 0, c.width, c.height).data, c.width, c.height).uniformity >= 0.9;
  } catch {
    return false;
  }
}

function stageLabel(t: ToolStrings, p: Progress): string {
  if (p.total && p.loaded !== undefined && p.loaded < p.total) {
    return t.downloading(toMb(p.loaded), toMb(p.total));
  }
  switch (p.stage) {
    case "loading-wasm":
      return t.loadingRuntime;
    case "loading-model":
      return p.total ? t.loadingRuntime : t.loadingModel; // weights done → session warm-up
    case "ready":
      return t.removing;
    default:
      return t.preparing;
  }
}

interface BgRemoverProps {
  /**
   * "solid": skip the AI and open Solid-colour mode right after upload — for
   * pages about scanned documents and signatures, where the AI can erase text.
   * The visitor can still switch to the AI from there.
   */
  startMode?: "ai" | "solid";
}

/** Width/height of an image file without decoding it into a canvas. */
async function imageSize(url: string): Promise<{ width: number; height: number }> {
  const img = new Image();
  img.src = url;
  await img.decode();
  return { width: img.naturalWidth, height: img.naturalHeight };
}

export function BgRemover({ startMode = "ai" }: BgRemoverProps = {}) {
  const t = useToolStrings();
  const { toast } = useToast();
  const [status, setStatus] = React.useState<Status>({ kind: "idle" });
  // Which panel replaces the result view: the touch-up brush or Solid-colour mode.
  const [panel, setPanel] = React.useState<"none" | "brush" | "solid">("none");
  const [bg, setBg] = React.useState<Background>({ kind: "none" });
  const [display, setDisplay] = React.useState<{ blob: Blob; url: string } | null>(null);
  const [plainBorder, setPlainBorder] = React.useState(false);
  const bgImageInput = React.useRef<HTMLInputElement>(null);
  const lastFile = React.useRef<File | null>(null);
  const [bgSeen, markBgSeen] = useSeen("bgremove:seen-bg");
  const [brushSeen, markBrushSeen] = useSeen("bgremove:seen-brush");
  // True while a solid-mode start is waiting for its first Apply (Cancel then means "use the AI").
  const [awaitingSolid, setAwaitingSolid] = React.useState(false);

  const reset = React.useCallback(() => {
    setStatus((prev) => {
      if (prev.kind === "ready") {
        URL.revokeObjectURL(prev.src.beforeUrl);
        URL.revokeObjectURL(prev.src.afterUrl);
      }
      return { kind: "idle" };
    });
    setPanel("none");
    setAwaitingSolid(false);
    setBg((prev) => {
      if (prev.kind === "image") URL.revokeObjectURL(prev.url);
      return { kind: "none" };
    });
    setPlainBorder(false);
  }, []);

  // Composite the cutout onto the chosen background whenever either changes.
  const cutout = status.kind === "ready" ? status.src.result.blob : null;
  React.useEffect(() => {
    if (!cutout || bg.kind === "none") {
      setDisplay(null);
      return;
    }
    let cancelled = false;
    let made: string | null = null;
    void compositeOnto(cutout, bg).then((blob) => {
      if (cancelled) return;
      made = URL.createObjectURL(blob);
      setDisplay({ blob, url: made });
    });
    return () => {
      cancelled = true;
      if (made) URL.revokeObjectURL(made);
    };
  }, [cutout, bg]);

  // Offer Solid-colour mode for logos / text / screenshots on plain backgrounds.
  const beforeForCheck = status.kind === "ready" ? status.src.beforeUrl : null;
  React.useEffect(() => {
    if (!beforeForCheck) return;
    let cancelled = false;
    void hasPlainBorder(beforeForCheck).then((v) => {
      if (!cancelled) setPlainBorder(v);
    });
    return () => {
      cancelled = true;
    };
  }, [beforeForCheck]);

  // Release the current images only when the tool unmounts. (Releasing on
  // every status change would break edits, which keep beforeUrl.)
  const statusRef = React.useRef(status);
  statusRef.current = status;
  React.useEffect(() => {
    return () => {
      const s = statusRef.current;
      if (s.kind === "ready") {
        URL.revokeObjectURL(s.src.beforeUrl);
        URL.revokeObjectURL(s.src.afterUrl);
      }
    };
  }, []);

  const process = React.useCallback(
    async (file: File, mode: "ai" | "solid" = startMode) => {
      lastFile.current = file;
      if (mode === "solid") {
        const beforeUrl = URL.createObjectURL(file);
        try {
          const { width, height } = await imageSize(beforeUrl);
          setStatus({
            kind: "ready",
            src: {
              beforeUrl,
              afterUrl: URL.createObjectURL(file),
              filename: changeExtension(file.name || "image.png", "png"),
              result: { blob: file, width, height, processingMs: 0, downscaled: false, engine: "solid-colour" },
              inputSize: file.size,
            },
          });
          setAwaitingSolid(true);
          setPanel("solid");
        } catch {
          URL.revokeObjectURL(beforeUrl);
          toast({ title: t.errorTitle, description: t.errNoImage, variant: "destructive" });
        }
        return;
      }
      const update = (patch: Partial<Progress>) =>
        setStatus((prev) =>
          prev.kind === "loading" ? { kind: "loading", progress: { ...prev.progress, ...patch } } : prev
        );

      setStatus({ kind: "loading", progress: { stage: "loading-wasm" } });
      const beforeUrl = URL.createObjectURL(file);
      try {
        const result = await removeBackground(file, {
          onProgress: (stage) => update({ stage }),
          onDownloadProgress: (loaded, total) => update({ loaded, total }),
        });
        const tool = toolFromPath(window.location.pathname);
        track(tool, "success", { engine: result.engine, dtype: result.dtype, device: result.device, ms: result.processingMs, loadMs: result.loadMs });
        setLastRun({ engine: result.engine, dtype: result.dtype, device: result.device });
        const afterUrl = URL.createObjectURL(result.blob);
        if (result.downscaled) {
          toast({
            title: t.downscaledTitle,
            description: t.downscaledDesc(result.width, result.height),
          });
        }
        setStatus({
          kind: "ready",
          src: {
            beforeUrl,
            afterUrl,
            filename: changeExtension(file.name || "image.png", "png"),
            result,
            inputSize: file.size,
          },
        });
      } catch (err) {
        URL.revokeObjectURL(beforeUrl);
        const message = err instanceof Error ? err.message : "Unknown error.";
        track(toolFromPath(window.location.pathname), "fail", { reason: errorReason(err), fileType: fileTypeOf(file) });
        setStatus({ kind: "error", message });
        toast({ title: t.errorTitle, description: message, variant: "destructive" });
      }
    },
    [toast, t, startMode]
  );

  if (status.kind === "ready") {
    const { beforeUrl, afterUrl, filename, result, inputSize } = status.src;
    const replaceCutout = (blob: Blob) =>
      setStatus((prev) => {
        if (prev.kind !== "ready") return prev;
        URL.revokeObjectURL(prev.src.afterUrl);
        return {
          kind: "ready",
          src: { ...prev.src, afterUrl: URL.createObjectURL(blob), result: { ...prev.src.result, blob } },
        };
      });
    if (panel === "brush") {
      return (
        <MaskEditor
          originalUrl={beforeUrl}
          resultBlob={result.blob}
          onCancel={() => setPanel("none")}
          onDone={(blob) => {
            replaceCutout(blob);
            setPanel("none");
            track(toolFromPath(window.location.pathname), "edit_apply");
            setLastRun({ edited: true });
          }}
        />
      );
    }
    if (panel === "solid") {
      return (
        <SolidColorEditor
          originalUrl={beforeUrl}
          cancelLabel={awaitingSolid ? t.solidUseAi : undefined}
          onCancel={() => {
            if (awaitingSolid && lastFile.current) {
              // Started in solid mode and the visitor wants the AI instead.
              setAwaitingSolid(false);
              setPanel("none");
              URL.revokeObjectURL(beforeUrl);
              URL.revokeObjectURL(afterUrl);
              void process(lastFile.current, "ai");
              return;
            }
            setPanel("none");
          }}
          onDone={(blob) => {
            replaceCutout(blob);
            setPanel("none");
            if (awaitingSolid) {
              setAwaitingSolid(false);
              track(toolFromPath(window.location.pathname), "success", { engine: "solid-colour" });
            }
            track(toolFromPath(window.location.pathname), "solid_apply");
            setLastRun({ engine: "solid-colour" });
          }}
        />
      );
    }
    return (
      <div className="flex min-h-[480px] flex-col gap-4">
        {plainBorder && (
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-primary/40 bg-primary/5 p-3 text-sm">
            <span>{t.solidSuggest}</span>
            <Button size="sm" onClick={() => setPanel("solid")}>
              <Pipette className="h-4 w-4" />
              {t.solidButton}
            </Button>
          </div>
        )}
        <ImagePreview
          beforeUrl={beforeUrl}
          afterUrl={display?.url ?? afterUrl}
          alt={filename}
          width={result.width}
          height={result.height}
        />
        <div
          className="flex flex-wrap items-center gap-2 rounded-xl border border-primary/40 bg-primary/5 p-3"
          role="group"
          aria-label={t.bgLabel}
          data-testid="bg-card"
        >
          <span className="me-1 inline-flex items-center gap-2 text-sm font-semibold">
            <ImagePlus className="h-4 w-4 text-primary" />
            {t.bgTitle}
            {!bgSeen && <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground">{t.newBadge}</span>}
          </span>
          <button
            type="button"
            aria-pressed={bg.kind === "none"}
            aria-label={t.bgTransparent}
            title={t.bgTransparent}
            onClick={() => setBg({ kind: "none" })}
            className={cn("checker-bg h-10 w-10 rounded-lg border", bg.kind === "none" ? "ring-2 ring-primary ring-offset-2" : "border-border")}
          />
          {BG_SWATCHES.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={bg.kind === "color" && bg.color === c}
              aria-label={c}
              title={c}
              onClick={() => {
                markBgSeen();
                setBg({ kind: "color", color: c });
                track(toolFromPath(window.location.pathname), "bg_change");
                setLastRun({ bgChanged: true });
              }}
              className={cn("h-10 w-10 rounded-lg border border-border", bg.kind === "color" && bg.color === c && "ring-2 ring-primary ring-offset-2")}
              style={{ background: c }}
            />
          ))}
          <label className="inline-flex h-8 cursor-pointer items-center gap-1 rounded-md border border-border px-2 text-xs text-muted-foreground" title={t.bgCustom}>
            <input
              type="color"
              aria-label={t.bgCustom}
              className="h-5 w-6 cursor-pointer bg-transparent"
              value={bg.kind === "color" ? bg.color : "#ffffff"}
              onChange={(e) => {
                markBgSeen();
                setBg({ kind: "color", color: e.target.value });
              }}
              onBlur={() => track(toolFromPath(window.location.pathname), "bg_change")}
            />
            {t.bgCustom}
          </label>
          <Button type="button" variant="outline" size="sm" onClick={() => bgImageInput.current?.click()}>
            <ImagePlus className="h-4 w-4" />
            {t.bgImage}
          </Button>
          <input
            ref={bgImageInput}
            type="file"
            accept="image/*"
            className="sr-only"
            aria-label={t.bgImage}
            data-testid="bg-image-input"
            onChange={(e) => {
              const f = e.target.files?.[0];
              e.target.value = "";
              if (!f) return;
              markBgSeen();
              setBg((prev) => {
                if (prev.kind === "image") URL.revokeObjectURL(prev.url);
                return { kind: "image", url: URL.createObjectURL(f) };
              });
              track(toolFromPath(window.location.pathname), "bg_change");
                setLastRun({ bgChanged: true });
            }}
          />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground" dir="ltr">
            <span className="rounded-md bg-muted px-2 py-1 font-mono">
              {result.width}×{result.height}
            </span>
            <span className="rounded-md bg-muted px-2 py-1 font-mono">
              {formatMs(result.processingMs)}
            </span>
            <span className="rounded-md bg-muted px-2 py-1 font-mono">
              {formatBytes(inputSize)} → {formatBytes(result.blob.size)}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" size="lg" onClick={reset}>
              <RefreshCw className="h-4 w-4" />
              {t.newImage}
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                markBrushSeen();
                setPanel("brush");
                track(toolFromPath(window.location.pathname), "edit_open");
              }}
            >
              <Brush className="h-4 w-4" />
              {t.editButton}
              {!brushSeen && <span className="rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-bold text-primary-foreground">{t.newBadge}</span>}
            </Button>
            {!plainBorder && (
              <Button variant="outline" size="lg" onClick={() => setPanel("solid")}>
                <Pipette className="h-4 w-4" />
                {t.solidButton}
              </Button>
            )}
            <DownloadButton blob={display?.blob ?? result.blob} filename={filename} label={t.downloadPng} />
          </div>
        </div>
      </div>
    );
  }

  if (status.kind === "loading") {
    const p = status.progress;
    const pct = p.total ? Math.min(100, Math.round(((p.loaded ?? 0) / p.total) * 100)) : null;
    const downloading = pct !== null && pct < 100;
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex min-h-[480px] w-full flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-primary/40 bg-card/60 p-10 sm:p-16"
      >
        <div className="relative">
          <div className="absolute inset-0 animate-ping rounded-full bg-primary/30" />
          <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Loader2 className="h-7 w-7 animate-spin" />
          </div>
        </div>
        <p className="text-center text-base font-semibold text-foreground">{stageLabel(t, p)}</p>
        {pct !== null && (
          <div className="w-full max-w-sm">
            <div
              className="h-2 w-full overflow-hidden rounded-full bg-muted"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={pct}
            >
              <div className="h-2 rounded-full bg-primary transition-[width] duration-300" style={{ width: `${pct}%` }} />
            </div>
            <p className="mt-1 text-center font-mono text-xs text-muted-foreground" dir="ltr">
              {pct}%
            </p>
          </div>
        )}
        {downloading && <p className="text-center text-sm text-muted-foreground">{t.firstTimeHint}</p>}
      </div>
    );
  }

  return (
    <div className="flex min-h-[480px] flex-col gap-4">
      <UploadZone
        onFile={process}
        onError={(message) => toast({ title: t.uploadErrorTitle, description: message, variant: "destructive" })}
      />
      <div className="grid gap-2 text-xs text-muted-foreground sm:grid-cols-3">
        <div className="flex items-center gap-2 rounded-lg border border-border bg-card/60 p-3">
          <Lock className="h-4 w-4 text-primary" />
          <span>{t.pillPrivate}</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-border bg-card/60 p-3">
          <Zap className="h-4 w-4 text-primary" />
          <span>{t.pillSpeed}</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-border bg-card/60 p-3">
          <Sparkles className="h-4 w-4 text-primary" />
          <span>{t.pillFree}</span>
        </div>
      </div>
    </div>
  );
}
