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
import { changeExtension, formatBytes, formatMs } from "@/lib/utils";

type Status =
  | { kind: "idle" }
  | { kind: "loading"; stage: LoadStage }
  | { kind: "ready"; src: BeforeAfter }
  | { kind: "error"; message: string };

interface BeforeAfter {
  beforeUrl: string;
  afterUrl: string;
  filename: string;
  result: RemoveResult;
  inputSize: number;
}

const STAGE_LABEL: Record<LoadStage, string> = {
  idle: "Preparing…",
  "loading-wasm": "Loading runtime (one-time, ~1 MB)…",
  "loading-model": "Loading AI model (one-time, ~4 MB)…",
  ready: "Removing background…",
  error: "Something went wrong",
};

export function BgRemover() {
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
      setStatus({ kind: "loading", stage: "loading-wasm" });
      const beforeUrl = URL.createObjectURL(file);
      try {
        const result = await removeBackground(file, {
          onProgress: (stage) => setStatus({ kind: "loading", stage }),
        });
        const afterUrl = URL.createObjectURL(result.blob);
        if (result.downscaled) {
          toast({
            title: "Image downscaled",
            description: `Resized to ${result.width}×${result.height} for performance.`,
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
        toast({
          title: "Couldn't remove background",
          description: message,
          variant: "destructive",
        });
      }
    },
    [toast]
  );

  if (status.kind === "ready") {
    const { beforeUrl, afterUrl, filename, result, inputSize } = status.src;
    return (
      <div className="flex flex-col gap-4">
        <ImagePreview beforeUrl={beforeUrl} afterUrl={afterUrl} alt={filename} />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span className="rounded-md bg-muted px-2 py-1 font-mono">
              {result.width}×{result.height}
            </span>
            <span className="rounded-md bg-muted px-2 py-1 font-mono">
              in {formatMs(result.processingMs)}
            </span>
            <span className="rounded-md bg-muted px-2 py-1 font-mono">
              {formatBytes(inputSize)} → {formatBytes(result.blob.size)}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" size="lg" onClick={reset}>
              <RefreshCw className="h-4 w-4" />
              New image
            </Button>
            <DownloadButton blob={result.blob} filename={filename} />
          </div>
        </div>
      </div>
    );
  }

  if (status.kind === "loading") {
    return (
      <div className="flex w-full flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-primary/40 bg-card/60 p-10 sm:p-16">
        <div className="relative">
          <div className="absolute inset-0 animate-ping rounded-full bg-primary/30" />
          <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Loader2 className="h-7 w-7 animate-spin" />
          </div>
        </div>
        <p className="text-base font-semibold text-foreground">
          {STAGE_LABEL[status.stage]}
        </p>
        <p className="text-sm text-muted-foreground">
          Cached after first run — next image will be near-instant.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <UploadZone
        onFile={process}
        onError={(message) => toast({ title: "Upload error", description: message, variant: "destructive" })}
      />
      <div className="grid gap-2 text-xs text-muted-foreground sm:grid-cols-3">
        <div className="flex items-center gap-2 rounded-lg border border-border bg-card/60 p-3">
          <Lock className="h-4 w-4 text-primary" />
          <span>Files never leave your device</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-border bg-card/60 p-3">
          <Zap className="h-4 w-4 text-primary" />
          <span>Typically ~3 seconds per image</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-border bg-card/60 p-3">
          <Sparkles className="h-4 w-4 text-primary" />
          <span>Free, unlimited, no signup</span>
        </div>
      </div>
    </div>
  );
}
