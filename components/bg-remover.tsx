"use client";

import * as React from "react";
import { Loader2, RefreshCw, Sparkles, Zap, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UploadZone } from "@/components/upload-zone";
import { ImagePreview } from "@/components/image-preview";
import { DownloadButton } from "@/components/download-button";
import { Button } from "@/components/ui/button";
import {
  removeBackground,
  type LoadStage,
  type RemoveResult,
} from "@/lib/bg-removal";
import { useToolStrings, type ToolStrings } from "@/lib/tool-i18n";
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

export function BgRemover() {
  const t = useToolStrings();
  const { toast } = useToast();
  const [status, setStatus] = React.useState<Status>({ kind: "idle" });

  const reset = React.useCallback(() => {
    setStatus((prev) => {
      if (prev.kind === "ready") {
        URL.revokeObjectURL(prev.src.beforeUrl);
        URL.revokeObjectURL(prev.src.afterUrl);
      }
      return { kind: "idle" };
    });
  }, []);

  React.useEffect(() => {
    return () => {
      if (status.kind === "ready") {
        URL.revokeObjectURL(status.src.beforeUrl);
        URL.revokeObjectURL(status.src.afterUrl);
      }
    };
  }, [status]);

  const process = React.useCallback(
    async (file: File) => {
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
        setStatus({ kind: "error", message });
        toast({ title: t.errorTitle, description: message, variant: "destructive" });
      }
    },
    [toast, t]
  );

  if (status.kind === "ready") {
    const { beforeUrl, afterUrl, filename, result, inputSize } = status.src;
    return (
      <div className="flex min-h-[480px] flex-col gap-4">
        <ImagePreview
          beforeUrl={beforeUrl}
          afterUrl={afterUrl}
          alt={filename}
          width={result.width}
          height={result.height}
        />
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
            <DownloadButton blob={result.blob} filename={filename} label={t.downloadPng} />
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
