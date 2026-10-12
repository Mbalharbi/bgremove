"use client";

/**
 * Small single-series charts for the admin dashboard (no chart library).
 * One measure per chart, one hue (the brand primary), hover tooltip, and a
 * "show as table" view so values never depend on reading the marks.
 */

import * as React from "react";

export interface Point {
  label: string; // shown on the axis / in the tooltip
  value: number;
}

function Tooltip({ x, y, text }: { x: number; y: number; text: string }) {
  return (
    <div
      className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-md border border-border bg-background px-2 py-1 text-xs shadow"
      style={{ left: x, top: y - 6 }}
    >
      {text}
    </div>
  );
}

function TableView({ points, unit }: { points: Point[]; unit: string }) {
  return (
    <details className="mt-2 text-xs text-muted-foreground">
      <summary className="cursor-pointer">عرض كجدول</summary>
      <table className="mt-2 w-full" dir="ltr">
        <tbody>
          {points.map((p) => (
            <tr key={p.label} className="border-t border-border">
              <td className="py-0.5">{p.label}</td>
              <td className="py-0.5 text-right">{p.value.toLocaleString("en")} {unit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </details>
  );
}

/** Vertical bars (e.g. visitors per month). Labels the latest and the largest bar. */
export function BarChart({ points, unit, height = 160 }: { points: Point[]; unit: string; height?: number }) {
  const [hover, setHover] = React.useState<{ i: number; x: number; y: number } | null>(null);
  if (!points.length) return <p className="text-sm text-muted-foreground">لا توجد بيانات بعد.</p>;
  const max = Math.max(1, ...points.map((p) => p.value));
  const maxI = points.findIndex((p) => p.value === max);
  return (
    <div>
      <div className="relative" style={{ height: height + 34 }} dir="ltr">
        <div className="absolute inset-x-0 top-0 flex items-end gap-[2px]" style={{ height }}>
          {points.map((p, i) => {
            const h = Math.max(2, (p.value / max) * height);
            const showLabel = i === points.length - 1 || i === maxI;
            return (
              <div
                key={p.label}
                className="relative flex h-full flex-1 items-end"
                onPointerEnter={(e) => {
                  const r = (e.currentTarget.parentElement as HTMLElement).getBoundingClientRect();
                  const b = e.currentTarget.getBoundingClientRect();
                  setHover({ i, x: b.left - r.left + b.width / 2, y: height - h });
                }}
                onPointerLeave={() => setHover(null)}
              >
                {showLabel && (
                  <span className="absolute inset-x-0 text-center text-[10px] text-muted-foreground" style={{ bottom: h + 2 }}>
                    {p.value.toLocaleString("en")}
                  </span>
                )}
                <div className={`mx-auto w-full max-w-[48px] rounded-t bg-primary ${hover?.i === i ? "opacity-80" : ""}`} style={{ height: h }} />
              </div>
            );
          })}
        </div>
        <div className="absolute inset-x-0 flex gap-[2px] border-t border-border pt-1" style={{ top: height }}>
          {points.map((p, i) => (
            <span key={p.label} className="flex-1 truncate text-center text-[10px] text-muted-foreground">
              {points.length <= 14 || i % Math.ceil(points.length / 12) === 0 ? p.label : ""}
            </span>
          ))}
        </div>
        {hover && <Tooltip x={hover.x} y={hover.y} text={`${points[hover.i].label}: ${points[hover.i].value.toLocaleString("en")} ${unit}`} />}
      </div>
      <TableView points={points} unit={unit} />
    </div>
  );
}

/** Daily line with a hover crosshair. */
export function LineChart({ points, unit, height = 140 }: { points: Point[]; unit: string; height?: number }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [hover, setHover] = React.useState<number | null>(null);
  if (points.length < 2) return <p className="text-sm text-muted-foreground">نحتاج يومين على الأقل من البيانات.</p>;
  const W = 1000;
  const max = Math.max(1, ...points.map((p) => p.value));
  const x = (i: number) => (i / (points.length - 1)) * W;
  const y = (v: number) => height - (v / max) * (height - 8) - 2;
  const d = points.map((p, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(p.value).toFixed(1)}`).join(" ");
  const onMove = (e: React.PointerEvent) => {
    const r = ref.current!.getBoundingClientRect();
    const i = Math.round(((e.clientX - r.left) / r.width) * (points.length - 1));
    setHover(Math.max(0, Math.min(points.length - 1, i)));
  };
  const hx = hover === null ? 0 : (hover / (points.length - 1)) * (ref.current?.clientWidth ?? 0);
  return (
    <div>
      <div ref={ref} className="relative" dir="ltr" onPointerMove={onMove} onPointerLeave={() => setHover(null)}>
        <svg viewBox={`0 0 ${W} ${height}`} preserveAspectRatio="none" className="block w-full" style={{ height }} role="img" aria-label={`${unit} per day`}>
          <line x1="0" x2={W} y1={height - 1} y2={height - 1} className="stroke-border" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          <path d={d} fill="none" className="stroke-primary" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
          {hover !== null && (
            <>
              <line x1={x(hover)} x2={x(hover)} y1="0" y2={height} className="stroke-muted-foreground" strokeWidth="1" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" />
            </>
          )}
        </svg>
        {hover !== null && (
          <>
            <span
              className="pointer-events-none absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-background bg-primary"
              style={{ left: hx, top: y(points[hover].value) }}
            />
            <Tooltip x={hx} y={y(points[hover].value)} text={`${points[hover].label}: ${points[hover].value.toLocaleString("en")} ${unit}`} />
          </>
        )}
        <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
          <span>{points[0].label}</span>
          <span>{points[points.length - 1].label}</span>
        </div>
      </div>
      <TableView points={points} unit={unit} />
    </div>
  );
}
