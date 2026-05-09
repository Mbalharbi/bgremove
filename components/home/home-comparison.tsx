import { Check, Minus, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Cell = boolean | "partial" | string;

interface Row {
  feature: string;
  bgremove: Cell;
  removeBg: Cell;
  photoshop: Cell;
}

const ROWS: Row[] = [
  { feature: "Free with no limits", bgremove: true, removeBg: "partial", photoshop: false },
  { feature: "No signup required", bgremove: true, removeBg: false, photoshop: false },
  { feature: "Photos stay on your device", bgremove: true, removeBg: false, photoshop: true },
  { feature: "Works on mobile", bgremove: true, removeBg: true, photoshop: "partial" },
  { feature: "Bulk processing", bgremove: true, removeBg: "partial", photoshop: "partial" },
  { feature: "Output: transparent PNG", bgremove: true, removeBg: true, photoshop: true },
  { feature: "No install required", bgremove: true, removeBg: true, photoshop: false },
  { feature: "No watermark", bgremove: true, removeBg: false, photoshop: true },
  { feature: "Cost (per month)", bgremove: "$0", removeBg: "$9+", photoshop: "$23+" },
];

function cell(value: Cell) {
  if (value === true) return <Check className="mx-auto h-5 w-5 text-primary" aria-label="Yes" />;
  if (value === false) return <X className="mx-auto h-5 w-5 text-muted-foreground/60" aria-label="No" />;
  if (value === "partial") return <Minus className="mx-auto h-5 w-5 text-accent" aria-label="Partial" />;
  return <span className="font-mono text-sm">{value}</span>;
}

export function HomeComparison() {
  return (
    <section className="container py-16 sm:py-20" aria-labelledby="compare-heading">
      <div className="mx-auto max-w-2xl text-center">
        <h2 id="compare-heading" className="text-3xl font-bold tracking-tight sm:text-4xl">
          How BgRemove compares
        </h2>
        <p className="mt-4 text-muted-foreground text-pretty">
          The same job, but free, faster, and private.
        </p>
      </div>
      <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="p-4 text-left font-semibold">Feature</th>
                <th className="p-4 text-center font-semibold text-primary">BgRemove</th>
                <th className="p-4 text-center font-semibold">Remove.bg</th>
                <th className="p-4 text-center font-semibold">Photoshop</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, i) => (
                <tr
                  key={row.feature}
                  className={cn(
                    "border-b border-border last:border-0",
                    i % 2 === 1 && "bg-muted/20"
                  )}
                >
                  <td className="p-4 font-medium text-foreground">{row.feature}</td>
                  <td className="p-4 text-center bg-primary/5">{cell(row.bgremove)}</td>
                  <td className="p-4 text-center">{cell(row.removeBg)}</td>
                  <td className="p-4 text-center">{cell(row.photoshop)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
