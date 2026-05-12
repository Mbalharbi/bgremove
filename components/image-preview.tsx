"use client";

import * as React from "react";
import { ChevronsLeftRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImagePreviewProps {
  beforeUrl: string;
  afterUrl: string;
  alt?: string;
  className?: string;
  /** Image natural width — used to reserve aspect ratio and prevent CLS. */
  width?: number;
  /** Image natural height — used to reserve aspect ratio and prevent CLS. */
  height?: number;
}

/**
 * Before/after slider. Drag the handle to compare original vs background-removed.
 */
export function ImagePreview({
  beforeUrl,
  afterUrl,
  alt = "Image preview",
  className,
  width,
  height,
}: ImagePreviewProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [position, setPosition] = React.useState(50);
  const [dragging, setDragging] = React.useState(false);

  const updateFromClientX = React.useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(pct);
  }, []);

  React.useEffect(() => {
    if (!dragging) return;
    const onMove = (e: PointerEvent) => updateFromClientX(e.clientX);
    const onUp = () => setDragging(false);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [dragging, updateFromClientX]);

  const onPointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    setDragging(true);
    updateFromClientX(e.clientX);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") setPosition((p) => Math.max(0, p - 5));
    else if (e.key === "ArrowRight") setPosition((p) => Math.min(100, p + 5));
    else if (e.key === "Home") setPosition(0);
    else if (e.key === "End") setPosition(100);
  };

  // Reserve aspect ratio so the container has a stable height before the
  // image loads. Eliminates CLS during state transitions.
  const aspectStyle: React.CSSProperties | undefined =
    width && height ? { aspectRatio: `${width} / ${height}` } : undefined;

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full overflow-hidden rounded-xl border border-border bg-card shadow-sm select-none",
        dragging ? "cursor-grabbing" : "cursor-grab",
        className
      )}
      style={aspectStyle}
      onPointerDown={onPointerDown}
    >
      {/* After (transparent PNG) — shows checkered bg */}
      <div className="checker-bg absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={afterUrl}
          alt={`${alt} — background removed`}
          width={width}
          height={height}
          className="block h-full w-full object-contain"
          draggable={false}
        />
      </div>

      {/* Before (original) — clipped */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={beforeUrl}
          alt={`${alt} — original`}
          width={width}
          height={height}
          className="block h-full w-full object-contain"
          draggable={false}
        />
      </div>

      {/* Labels */}
      <div className="pointer-events-none absolute left-3 top-3 rounded-md bg-background/80 px-2 py-1 text-xs font-medium text-foreground backdrop-blur-sm">
        Before
      </div>
      <div className="pointer-events-none absolute right-3 top-3 rounded-md bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
        After
      </div>

      {/* Drag handle line */}
      <div
        role="slider"
        tabIndex={0}
        aria-label="Compare before and after"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        onKeyDown={onKeyDown}
        className="absolute inset-y-0 z-10 flex w-1 -translate-x-1/2 items-center justify-center bg-white/90 shadow-[0_0_0_1px_rgba(0,0,0,0.15)] focus:outline-none"
        style={{ left: `${position}%` }}
      >
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full bg-white text-foreground shadow-lg transition-transform",
            dragging ? "scale-110" : "hover:scale-105"
          )}
        >
          <ChevronsLeftRight className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
