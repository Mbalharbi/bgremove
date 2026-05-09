"use client";

import * as React from "react";
import { Upload, ImageIcon } from "lucide-react";
import { cn, formatBytes } from "@/lib/utils";
import { BG_REMOVAL_LIMITS, preloadSegmenter, validateImageFile } from "@/lib/bg-removal";

interface UploadZoneProps {
  onFile: (file: File) => void;
  onError?: (msg: string) => void;
  multiple?: boolean;
  onFiles?: (files: File[]) => void;
  accept?: string;
  className?: string;
  compact?: boolean;
  disabled?: boolean;
}

const DEFAULT_ACCEPT = "image/jpeg,image/png,image/webp";

export function UploadZone({
  onFile,
  onFiles,
  onError,
  multiple = false,
  accept = DEFAULT_ACCEPT,
  className,
  compact = false,
  disabled = false,
}: UploadZoneProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = React.useState(false);
  const dragCounter = React.useRef(0);

  const handleFiles = React.useCallback(
    (fileList: FileList | File[]) => {
      const files = Array.from(fileList).filter((f) => f.type.startsWith("image/"));
      if (files.length === 0) {
        onError?.("No image files detected. Try JPG, PNG, or WebP.");
        return;
      }
      const valid: File[] = [];
      for (const f of files) {
        const v = validateImageFile(f);
        if (v.ok) valid.push(f);
        else onError?.(v.reason);
      }
      if (valid.length === 0) return;
      if (multiple && onFiles) onFiles(valid);
      else onFile(valid[0]);
    },
    [multiple, onFile, onFiles, onError]
  );

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    dragCounter.current = 0;
    if (disabled) return;
    if (e.dataTransfer?.files?.length) handleFiles(e.dataTransfer.files);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current += 1;
    if (dragCounter.current === 1) setDragActive(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current -= 1;
    if (dragCounter.current === 0) setDragActive(false);
  };

  React.useEffect(() => {
    const onPaste = (e: ClipboardEvent) => {
      if (disabled) return;
      const items = e.clipboardData?.files;
      if (items && items.length > 0) handleFiles(items);
    };
    window.addEventListener("paste", onPaste);
    return () => window.removeEventListener("paste", onPaste);
  }, [handleFiles, disabled]);

  const onClick = () => inputRef.current?.click();
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      aria-label="Upload an image to remove its background"
      onClick={disabled ? undefined : onClick}
      onKeyDown={disabled ? undefined : onKeyDown}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onMouseEnter={preloadSegmenter}
      onFocus={preloadSegmenter}
      className={cn(
        "group relative flex w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed text-center transition-all duration-200",
        compact ? "p-6" : "p-10 sm:p-16",
        dragActive
          ? "border-primary bg-primary/5 scale-[1.01]"
          : "border-border bg-card/50 hover:border-primary/60 hover:bg-card",
        disabled && "cursor-not-allowed opacity-60 pointer-events-none",
        className
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        aria-label={multiple ? "Choose image files to upload" : "Choose an image file to upload"}
        className="sr-only"
        onChange={(e) => {
          if (e.target.files) handleFiles(e.target.files);
          e.target.value = "";
        }}
      />
      <div
        className={cn(
          "flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-200 sm:h-16 sm:w-16",
          dragActive ? "scale-110" : "group-hover:scale-105"
        )}
      >
        {dragActive ? (
          <ImageIcon className="h-7 w-7" />
        ) : (
          <Upload className="h-7 w-7" />
        )}
      </div>
      <p className={cn("mt-4 font-semibold text-foreground", compact ? "text-base" : "text-lg sm:text-xl")}>
        {dragActive
          ? "Drop to upload"
          : multiple
            ? "Drop images, paste, or tap to upload"
            : "Drop an image, paste, or tap to upload"}
      </p>
      <p className="mt-1.5 text-sm text-muted-foreground">
        JPG, PNG, or WebP &middot; up to {formatBytes(BG_REMOVAL_LIMITS.maxFileBytes)}
        {multiple && " each"}
      </p>
      <p className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-border bg-background/80 px-2.5 py-1 text-xs text-muted-foreground">
        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
        Processed in your browser &middot; never uploaded
      </p>
    </div>
  );
}
