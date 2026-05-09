"use client";

import * as React from "react";
import { Download, Link as LinkIcon, RefreshCw, Unlink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UploadZone } from "@/components/upload-zone";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  decodeImage,
  encodeImage,
  extensionFor,
  SOCIAL_PRESETS,
  type ImageFormat,
} from "@/lib/image-utils";
import { changeExtension, downloadBlob, formatBytes } from "@/lib/utils";

interface ResizeState {
  decoded: HTMLImageElement;
  fileName: string;
  originalWidth: number;
  originalHeight: number;
  beforeUrl: string;
  blob: Blob;
  afterUrl: string;
}

export function ImageResizer() {
  const { toast } = useToast();
  const [state, setState] = React.useState<ResizeState | null>(null);
  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);
  const [lockAspect, setLockAspect] = React.useState(true);
  const [format, setFormat] = React.useState<ImageFormat>("image/png");
  const [working, setWorking] = React.useState(false);

  const aspect = state ? state.originalWidth / state.originalHeight : 1;

  const reEncode = React.useCallback(
    async (decoded: HTMLImageElement, w: number, h: number, fmt: ImageFormat, current: ResizeState) => {
      const { blob } = await encodeImage(decoded, { format: fmt, width: w, height: h, quality: 0.92 });
      const afterUrl = URL.createObjectURL(blob);
      if (current.afterUrl) URL.revokeObjectURL(current.afterUrl);
      return { blob, afterUrl };
    },
    []
  );

  const apply = React.useCallback(
    async (w: number, h: number, fmt: ImageFormat) => {
      if (!state) return;
      setWorking(true);
      try {
        const { blob, afterUrl } = await reEncode(state.decoded, w, h, fmt, state);
        setState({ ...state, blob, afterUrl });
      } finally {
        setWorking(false);
      }
    },
    [state, reEncode]
  );

  const onFile = React.useCallback(
    async (file: File) => {
      setWorking(true);
      try {
        const { bitmap, width: w, height: h, url } = await decodeImage(file);
        const initial = await encodeImage(bitmap, { format, quality: 0.92 });
        const afterUrl = URL.createObjectURL(initial.blob);
        setState((prev) => {
          if (prev) {
            URL.revokeObjectURL(prev.beforeUrl);
            URL.revokeObjectURL(prev.afterUrl);
          }
          return {
            decoded: bitmap,
            fileName: file.name,
            originalWidth: w,
            originalHeight: h,
            beforeUrl: url,
            blob: initial.blob,
            afterUrl,
          };
        });
        setWidth(w);
        setHeight(h);
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
    [format, toast]
  );

  const onChangeWidth = (v: string) => {
    const n = Math.max(1, Math.round(Number(v) || 0));
    setWidth(n);
    if (lockAspect && state) setHeight(Math.max(1, Math.round(n / aspect)));
  };
  const onChangeHeight = (v: string) => {
    const n = Math.max(1, Math.round(Number(v) || 0));
    setHeight(n);
    if (lockAspect && state) setWidth(Math.max(1, Math.round(n * aspect)));
  };

  const onScalePercent = (pct: number) => {
    if (!state) return;
    const w = Math.max(1, Math.round(state.originalWidth * (pct / 100)));
    const h = Math.max(1, Math.round(state.originalHeight * (pct / 100)));
    setWidth(w);
    setHeight(h);
    void apply(w, h, format);
  };

  const onPreset = (w: number, h: number) => {
    setWidth(w);
    setHeight(h);
    setLockAspect(false);
    void apply(w, h, format);
  };

  const reset = () => {
    if (state) {
      URL.revokeObjectURL(state.beforeUrl);
      URL.revokeObjectURL(state.afterUrl);
    }
    setState(null);
    setWidth(0);
    setHeight(0);
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

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <div className="rounded-xl border border-border bg-card p-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={state.afterUrl}
          alt="Resized preview"
          className="mx-auto max-h-[60vh] w-auto rounded-lg object-contain"
        />
      </div>

      <div className="flex flex-col gap-5 rounded-xl border border-border bg-card p-5">
        <div>
          <p className="text-xs font-mono uppercase tracking-wide text-muted-foreground">Dimensions</p>
          <div className="mt-2 grid grid-cols-[1fr_auto_1fr] items-end gap-2">
            <div>
              <Label htmlFor="w" className="text-xs">Width</Label>
              <Input
                id="w"
                type="number"
                min={1}
                value={width}
                onChange={(e) => onChangeWidth(e.target.value)}
                onBlur={() => apply(width, height, format)}
                className="font-mono"
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="mb-0.5"
              onClick={() => setLockAspect((v) => !v)}
              aria-pressed={lockAspect}
              aria-label={lockAspect ? "Unlock aspect ratio" : "Lock aspect ratio"}
              title={lockAspect ? "Aspect locked" : "Aspect unlocked"}
            >
              {lockAspect ? <LinkIcon className="h-4 w-4 text-primary" /> : <Unlink className="h-4 w-4" />}
            </Button>
            <div>
              <Label htmlFor="h" className="text-xs">Height</Label>
              <Input
                id="h"
                type="number"
                min={1}
                value={height}
                onChange={(e) => onChangeHeight(e.target.value)}
                onBlur={() => apply(width, height, format)}
                className="font-mono"
              />
            </div>
          </div>
        </div>

        <div>
          <p className="text-xs font-mono uppercase tracking-wide text-muted-foreground">Scale</p>
          <div className="mt-2 grid grid-cols-4 gap-2">
            {[25, 50, 75, 200].map((p) => (
              <Button key={p} variant="outline" size="sm" onClick={() => onScalePercent(p)}>
                {p}%
              </Button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-mono uppercase tracking-wide text-muted-foreground">Social presets</p>
          <div className="mt-2 grid max-h-44 grid-cols-1 gap-1 overflow-y-auto pr-1">
            {SOCIAL_PRESETS.map((p) => (
              <button
                key={p.name}
                type="button"
                onClick={() => onPreset(p.width, p.height)}
                className="flex items-center justify-between rounded-md border border-border px-3 py-2 text-left text-sm transition-colors hover:border-primary/50 hover:bg-primary/5"
              >
                <span>{p.name}</span>
                <span className="font-mono text-xs text-muted-foreground">
                  {p.width}×{p.height}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-mono uppercase tracking-wide text-muted-foreground">Format</p>
          <Tabs
            value={format}
            onValueChange={(v) => {
              const f = v as ImageFormat;
              setFormat(f);
              void apply(width, height, f);
            }}
            className="mt-2"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="image/png">PNG</TabsTrigger>
              <TabsTrigger value="image/jpeg">JPG</TabsTrigger>
              <TabsTrigger value="image/webp">WebP</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="flex items-center justify-between rounded-md bg-muted/40 px-3 py-2 text-xs">
          <span className="text-muted-foreground">Output size</span>
          <span className="font-mono font-semibold">{formatBytes(state.blob.size)}</span>
        </div>

        <div className="flex flex-col gap-2">
          <Button
            size="lg"
            disabled={working}
            onClick={() => downloadBlob(state.blob, changeExtension(state.fileName, extensionFor(format)))}
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
