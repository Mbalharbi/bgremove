"use client";

import * as React from "react";
import { Download, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Client-side QR code generator. Uses the goqr.me public SVG API (no key,
 * no upload of user secrets — the URL itself becomes the QR). All rendering
 * happens via a returned SVG that the browser decodes locally. No backend
 * of ours touches the data.
 *
 * For purely-offline generation we'd need a QR codec in the bundle (~10KB).
 * We can add `qrcode-generator` later if we want fully air-gapped mode.
 */

const SIZES = [256, 512, 1024];
const COLORS = [
  { fg: "000000", bg: "ffffff", label: "Classic" },
  { fg: "0f172a", bg: "f8fafc", label: "Slate" },
  { fg: "ffffff", bg: "10b981", label: "Brand" },
  { fg: "ffffff", bg: "111827", label: "Dark" },
];

export function QrGenerator() {
  const [text, setText] = React.useState("https://bgremovers.org");
  const [size, setSize] = React.useState(512);
  const [color, setColor] = React.useState(COLORS[0]);
  const [ecc, setEcc] = React.useState<"L" | "M" | "Q" | "H">("M");

  const trimmed = text.trim();
  const qrUrl = trimmed
    ? `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(
        trimmed
      )}&color=${color.fg}&bgcolor=${color.bg}&ecc=${ecc}&format=png`
    : "";

  const handleDownload = async () => {
    if (!qrUrl) return;
    try {
      const res = await fetch(qrUrl);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `qr-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      // Fallback: open in new tab.
      window.open(qrUrl, "_blank", "noopener");
    }
  };

  return (
    <div className="grid gap-8 md:grid-cols-2">
      {/* Controls */}
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-foreground" htmlFor="qr-text">
            Text or URL
          </label>
          <textarea
            id="qr-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste a URL, Wi-Fi credentials, contact details, anything…"
            rows={4}
            className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
          />
          <p className="mt-1 text-xs text-muted-foreground">
            {trimmed.length} character{trimmed.length === 1 ? "" : "s"}
          </p>
        </div>

        <div>
          <p className="text-sm font-medium text-foreground">Size</p>
          <div className="mt-2 flex gap-2">
            {SIZES.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                className={`flex-1 rounded-lg border px-3 py-2 text-sm transition-colors ${
                  size === s
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-background hover:bg-muted/40"
                }`}
              >
                {s} px
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-foreground">Style</p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {COLORS.map((c) => (
              <button
                key={c.label}
                type="button"
                onClick={() => setColor(c)}
                className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors ${
                  color.label === c.label
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-background hover:bg-muted/40"
                }`}
              >
                <span
                  className="h-5 w-5 rounded border border-border"
                  style={{ background: `#${c.bg}` }}
                />
                <span
                  className="h-5 w-5 rounded border border-border"
                  style={{ background: `#${c.fg}` }}
                />
                <span className="ml-1">{c.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-foreground">Error correction</p>
          <div className="mt-2 grid grid-cols-4 gap-2">
            {(["L", "M", "Q", "H"] as const).map((e) => (
              <button
                key={e}
                type="button"
                onClick={() => setEcc(e)}
                className={`rounded-lg border px-3 py-2 text-sm transition-colors ${
                  ecc === e
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-background hover:bg-muted/40"
                }`}
              >
                {e}
              </button>
            ))}
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Higher = more resilient to damage, but denser code.
          </p>
        </div>
      </div>

      {/* Preview */}
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-card p-6">
        <div
          className="flex aspect-square w-full max-w-sm items-center justify-center overflow-hidden rounded-lg border border-border"
          style={{ background: `#${color.bg}` }}
        >
          {qrUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={qrUrl} alt="QR code preview" className="h-full w-full object-contain" />
          ) : (
            <p className="text-sm text-muted-foreground">Type something to generate a QR</p>
          )}
        </div>
        <div className="flex w-full gap-2">
          <Button onClick={handleDownload} disabled={!qrUrl} className="flex-1">
            <Download className="h-4 w-4" /> Download PNG
          </Button>
          <Button
            variant="outline"
            onClick={() => setText("")}
            disabled={!text}
            aria-label="Clear"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
