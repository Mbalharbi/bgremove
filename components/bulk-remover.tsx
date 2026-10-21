"use client";

import * as React from "react";
import JSZip from "jszip";
import { Download, Loader2, Trash2, X, CheckCircle2, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UploadZone } from "@/components/upload-zone";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { removeBackground, type LoadStage } from "@/lib/bg-removal";
import { changeExtension, downloadBlob, formatBytes, formatMs } from "@/lib/utils";
import { errorReason, fileTypeOf, track } from "@/lib/track";
import { useToolStrings, type ToolStrings } from "@/lib/tool-i18n";

const BULK_LIMIT = 20;

type ItemStatus =
  | { kind: "queued" }
  | { kind: "processing" }
  | {
      kind: "done";
      blob: Blob;
      /** Object URL created once on transition. Used as <img src> without
       *  regenerating on every render — eliminates a memory leak and a CLS
       *  shift from repeated image loads. */
      doneUrl: string;
      processingMs: number;
      width: number;
      height: number;
    }
  | { kind: "error"; message: string };

interface Item {
  id: string;
  file: File;
  thumbnailUrl: string;
  status: ItemStatus;
}

export function BulkRemover() {
  const { toast } = useToast();
  const t = useToolStrings();
  const [items, setItems] = React.useState<Item[]>([]);
  const [running, setRunning] = React.useState(false);
  const [loadStage, setLoadStage] = React.useState<LoadStage>("idle");

  const addFiles = React.useCallback(
    (files: File[]) => {
      const remaining = BULK_LIMIT - items.length;
      const toAdd = files.slice(0, remaining);
      if (files.length > remaining) {
        toast({
          title: t.bulkLimitTitle,
          description: t.bulkLimitDesc(BULK_LIMIT),
        });
      }
      const next: Item[] = toAdd.map((file) => ({
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        file,
        thumbnailUrl: URL.createObjectURL(file),
        status: { kind: "queued" },
      }));
      setItems((prev) => [...prev, ...next]);
    },
    [items.length, toast, t]
  );

  const revokeItem = (it: Item) => {
    URL.revokeObjectURL(it.thumbnailUrl);
    if (it.status.kind === "done") URL.revokeObjectURL(it.status.doneUrl);
  };

  const remove = (id: string) => {
    setItems((prev) =>
      prev.filter((it) => {
        if (it.id === id) {
          revokeItem(it);
          return false;
        }
        return true;
      })
    );
  };

  const clearAll = () => {
    items.forEach(revokeItem);
    setItems([]);
  };

  // Capture latest items in a ref so the unmount cleanup revokes all URLs
  // currently in state, not the snapshot from initial render.
  const itemsRef = React.useRef(items);
  React.useEffect(() => {
    itemsRef.current = items;
  }, [items]);
  React.useEffect(
    () => () => {
      itemsRef.current.forEach(revokeItem);
    },
    []
  );

  const processAll = async () => {
    setRunning(true);
    try {
      // Sequential processing so the GPU isn't oversubscribed.
      for (const item of items) {
        if (item.status.kind !== "queued") continue;
        setItems((prev) => prev.map((it) => (it.id === item.id ? { ...it, status: { kind: "processing" } } : it)));
        try {
          const result = await removeBackground(item.file, {
            onProgress: (s) => setLoadStage(s),
          });
          track("bulk", "success", { engine: result.engine, dtype: result.dtype, device: result.device, ms: result.processingMs, loadMs: result.loadMs });
          const doneUrl = URL.createObjectURL(result.blob);
          setItems((prev) =>
            prev.map((it) =>
              it.id === item.id
                ? {
                    ...it,
                    status: {
                      kind: "done",
                      blob: result.blob,
                      doneUrl,
                      processingMs: result.processingMs,
                      width: result.width,
                      height: result.height,
                    },
                  }
                : it
            )
          );
        } catch (err) {
          const message = err instanceof Error ? err.message : "Unknown error.";
          track("bulk", "fail", { reason: errorReason(err), fileType: fileTypeOf(item.file) });
          setItems((prev) =>
            prev.map((it) => (it.id === item.id ? { ...it, status: { kind: "error", message } } : it))
          );
        }
      }
    } finally {
      setRunning(false);
      setLoadStage("ready");
    }
  };

  const outName = (item: Item) => changeExtension(item.file.name || "image.png", "png");

  const downloadOne = (item: Item) => {
    if (item.status.kind === "done") downloadBlob(item.status.blob, outName(item), 1);
  };

  const downloadZip = async () => {
    const done = items.filter((it) => it.status.kind === "done");
    if (done.length === 0) return;
    const zip = new JSZip();
    const usedNames = new Set<string>();
    for (const item of done) {
      if (item.status.kind !== "done") continue;
      let name = outName(item);
      let i = 1;
      while (usedNames.has(name)) {
        const dot = name.lastIndexOf(".");
        name = `${name.slice(0, dot)}-${i}.png`;
        i++;
      }
      usedNames.add(name);
      zip.file(name, item.status.blob);
    }
    const blob = await zip.generateAsync({ type: "blob" });
    downloadBlob(blob, `bgremove-bulk-${Date.now()}.zip`, done.length);
  };

  const totalProgress = (() => {
    if (items.length === 0) return 0;
    const done = items.filter((it) => it.status.kind === "done" || it.status.kind === "error").length;
    return Math.round((done / items.length) * 100);
  })();

  const queued = items.filter((it) => it.status.kind === "queued").length;
  const completed = items.filter((it) => it.status.kind === "done").length;

  return (
    <div className="flex flex-col gap-6">
      {items.length < BULK_LIMIT && (
        <UploadZone
          multiple
          onFile={(f) => addFiles([f])}
          onFiles={addFiles}
          onError={(m) => toast({ title: t.uploadErrorTitle, description: m, variant: "destructive" })}
          compact={items.length > 0}
        />
      )}

      {items.length > 0 && (
        <>
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card p-4">
            <div className="flex flex-col gap-1">
              <p className="text-sm font-semibold">
                {t.bulkCount(items.length, BULK_LIMIT, completed)}
              </p>
              {running && (
                <p className="text-xs text-muted-foreground">
                  {loadStage === "loading-wasm" && t.loadingRuntime}
                  {loadStage === "loading-model" && t.loadingModel}
                  {(loadStage === "ready" || loadStage === "idle") && t.bulkWorking}
                </p>
              )}
              {running && <Progress value={totalProgress} className="mt-1 h-1.5 w-48" />}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="outline" onClick={clearAll} disabled={running}>
                <Trash2 className="h-4 w-4" />
                {t.bulkClear}
              </Button>
              {queued > 0 && (
                <Button onClick={processAll} disabled={running} size="lg">
                  {running ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  {running ? t.bulkRunning(completed, items.length) : t.bulkStart(queued)}
                </Button>
              )}
              {completed > 0 && (
                <Button variant={queued === 0 ? "default" : "outline"} size="lg" onClick={downloadZip}>
                  <Download className="h-4 w-4" />
                  {t.bulkZip(completed)}
                </Button>
              )}
            </div>
          </div>

          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((item) => (
              <li
                key={item.id}
                className="group relative flex flex-col gap-2 rounded-xl border border-border bg-card p-3"
              >
                <div className="aspect-square overflow-hidden rounded-lg bg-muted checker-bg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.status.kind === "done" ? item.status.doneUrl : item.thumbnailUrl}
                    alt={item.file.name}
                    width={400}
                    height={400}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-xs" title={item.file.name}>
                    {item.file.name}
                  </p>
                  <button
                    type="button"
                    onClick={() => remove(item.id)}
                    disabled={running}
                    className="rounded-full p-1 text-muted-foreground transition-opacity hover:bg-destructive/10 hover:text-destructive disabled:cursor-not-allowed sm:opacity-0 sm:group-hover:opacity-100"
                    aria-label={`${t.removeItem} ${item.file.name}`}
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <StatusBadge item={item} t={t} />
                  {item.status.kind === "done" && (
                    <Button type="button" variant="outline" size="sm" className="h-7 px-2 text-xs" onClick={() => downloadOne(item)}>
                      <Download className="h-3.5 w-3.5" />
                      {t.downloadOne}
                    </Button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

function StatusBadge({ item, t }: { item: Item; t: ToolStrings }) {
  switch (item.status.kind) {
    case "queued":
      return (
        <span className="inline-flex w-fit items-center rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
          {t.bulkQueued} · {formatBytes(item.file.size)}
        </span>
      );
    case "processing":
      return (
        <span className="inline-flex w-fit items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
          <Loader2 className="h-3 w-3 animate-spin" />
          {t.bulkProcessing}
        </span>
      );
    case "done":
      return (
        <span className="inline-flex w-fit items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
          <CheckCircle2 className="h-3 w-3" />
          {formatMs(item.status.processingMs)} · {formatBytes(item.status.blob.size)}
        </span>
      );
    case "error":
      return (
        <span className="inline-flex w-fit items-center gap-1 rounded-full bg-destructive/10 px-2 py-0.5 text-xs text-destructive">
          <AlertCircle className="h-3 w-3" />
          {item.status.message}
        </span>
      );
  }
}
