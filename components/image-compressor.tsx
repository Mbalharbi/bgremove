"use client";

import * as React from "react";
import { Download, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UploadZone } from "@/components/upload-zone";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  decodeImage,
  encodeImage,
  extensionFor,
  type ImageFormat,
} from "@/lib/image-utils";
import { changeExtension, downloadBlob, formatBytes } from "@/lib/utils";

interface CompressedState {
  beforeUrl: string;
  beforeSize: number;
  beforeName: string;
  decoded: HTMLImageElement;
  blob: Blob;
  afterUrl: string;
  width: number;
  height: number;
}

export function ImageCompressor() {
  const { toast } = useToast();
  const [format, setFormat] = React.useState<ImageFormat>("image/jpeg");
  const [quality, setQuality] = React.useState(80);
  const [working, setWorking] = React.useState(false);
  const [state, setState] = React.useState<CompressedState | null>(null);

  const reEncode = React.useCallback(
    async (decoded: HTMLImageElement, fmt: ImageFormat, q: number, current: CompressedState | null) => {
      const { blob, width, height } = await encodeImage(decoded, {
        format: fmt,
        quality: q / 100,
      });
      const afterUrl = URL.createObjectURL(blob);
      if (current?.afterUrl) URL.revokeObjectURL(current.afterUrl);
      return { blob, afterUrl, width, height };
    },
    []
  );

  const onFile = React.useCallback(
    async (file: File) => {
      setWorking(true);
      try {
        const { bitmap, width: w, height: h, url } = await decodeImage(file);
        const initial = await encodeImage(bitmap, { format, quality: quality / 100 });
        const afterUrl = URL.createObjectURL(initial.blob);
        // Reset previous before url if any
        setState((prev) => {
          if (prev) {
            URL.revokeObjectURL(prev.beforeUrl);
            URL.revokeObjectURL(prev.afterUrl);
          }
          return {
            beforeUrl: url,
            beforeSize: file.size,
            beforeName: file.name,
            decoded: bitmap,
            blob: initial.blob,
            afterUrl,
            width: initial.width,
            height: initial.height,
          };
        });
        // unused vars to satisfy typescript
        void w;
        void h;
      } catch (err) {
        toast({
          title: "Couldn't read image",
          description: err instanceof Error ? err.message : "Unknown error.",
          variant: "destructive",
        });
      } finally {
        setWorking(false);
      }
    },
    [format, quality, toast]
  );

  const onChangeQuality = React.useCallback(
    async (v: number) => {
      setQuality(v);
      if (!state) return;
      setWorking(true);
      try {
        const { blob, afterUrl, width, height } = await reEncode(state.decoded, format, v, state);
        setState({ ...state, blob, afterUrl, width, height });
      } finally {
        setWorking(false);
      }
    },
    [state, format, reEncode]
  );

  const onChangeFormat = React.useCallback(
    async (f: ImageFormat) => {
      setFormat(f);
      if (!state) return;
      setWorking(true);
      try {
        const { blob, afterUrl, width, height } = await reEncode(state.decoded, f, quality, state);
        setState({ ...state, blob, afterUrl, width, height });
      } finally {
        setWorking(false);
      }
    },
    [state, quality, reEncode]
  );

  const reset = () => {
    if (state) {
      URL.revokeObjectURL(state.beforeUrl);
      URL.revokeObjectURL(state.afterUrl);
    }
    setState(null);
  };

  React.useEffect(
    () => () => {
      if (state) {
        URL.revokeObjectURL(state.beforeUrl);
        URL.revokeObjectURL(state.afterUrl);
      }
    },
    [state]
  );

  if (!state) {
    return (
      <UploadZone
        onFile={onFile}
        onError={(message) => toast({ title: "Upload error", description: message, variant: "destructive" })}
      />
    );
  }

  const reduction = state.beforeSize > 0 ? Math.round((1 - state.blob.size / state.beforeSize) * 100) : 0;
  const isPng = format === "image/png";

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="rounded-xl border border-border bg-card p-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={state.afterUrl}
          alt="Compressed preview"
          className="mx-auto max-h-[60vh] w-auto rounded-lg object-contain"
        />
      </div>
      <div className="flex flex-col gap-5 rounded-xl border border-border bg-card p-5">
        <div>
          <p className="text-xs font-mono uppercase tracking-wide text-muted-foreground">Format</p>
          <Tabs value={format} onValueChange={(v) => onChangeFormat(v as ImageFormat)} className="mt-2">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="image/jpeg">JPG</TabsTrigger>
              <TabsTrigger value="image/png">PNG</TabsTrigger>
              <TabsTrigger value="image/webp">WebP</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <p className="text-xs font-mono uppercase tracking-wide text-muted-foreground">Quality</p>
            <p className="font-mono text-sm font-semibold tabular-nums">
              {isPng ? "lossless" : `${quality}%`}
            </p>
          </div>
          <Slider
            value={[quality]}
            onValueChange={(v) => void onChangeQuality(v[0])}
            min={10}
            max={100}
            step={1}
            disabled={isPng}
            className="mt-3"
          />
          {isPng && (
            <p className="mt-2 text-xs text-muted-foreground">
              PNG is lossless — switch to JPG or WebP to reduce file size.
            </p>
          )}
        </div>

        <div className="space-y-2 rounded-lg bg-muted/40 p-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Original</span>
            <span className="font-mono">{formatBytes(state.beforeSize)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Compressed</span>
            <span className="font-mono font-semibold">{formatBytes(state.blob.size)}</span>
          </div>
          <div className="flex items-center justify-between border-t border-border pt-2">
            <span className="text-muted-foreground">Saved</span>
            <span
              className={`font-mono font-semibold ${reduction >= 0 ? "text-primary" : "text-destructive"}`}
            >
              {reduction >= 0 ? `−${reduction}%` : `+${Math.abs(reduction)}%`}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Dimensions</span>
            <span className="font-mono">
              {state.width}×{state.height}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Button
            size="lg"
            onClick={() =>
              downloadBlob(state.blob, changeExtension(state.beforeName, extensionFor(format)))
            }
            disabled={working}
          >
            <Download className="h-5 w-5" />
            Download {extensionFor(format).toUpperCase()}
          </Button>
          <Button variant="outline" onClick={reset}>
            <RefreshCw className="h-4 w-4" />
            New image
          </Button>
        </div>
      </div>
    </div>
  );
}
