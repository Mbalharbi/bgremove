"use client";

import * as React from "react";
import { Download, RefreshCw } from "lucide-react";
import qrcode from "qrcode-generator";
import { Button } from "@/components/ui/button";

/**
 * QR code generator that runs entirely in the browser (qrcode-generator, MIT).
 * The text never leaves the device — it often holds Wi-Fi passwords or
 * contact details, which a third-party QR API would receive and could log.
 */

qrcode.stringToBytes = qrcode.stringToBytesFuncs["UTF-8"];

/** Draw the QR code to a canvas: `size`×`size` px including a 4-module quiet zone. */
function renderQr(text: string, size: number, fg: string, bg: string, ecc: "L" | "M" | "Q" | "H"): HTMLCanvasElement | null {
  let qr: ReturnType<typeof qrcode>;
  try {
    qr = qrcode(0, ecc);
    qr.addData(text, "Byte");
    qr.make();
  } catch {
    return null; // too long for a QR code at this error-correction level
  }
  const n = qr.getModuleCount();
  const cell = size / (n + 8);
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = `#${bg}`;
  ctx.fillRect(0, 0, size, size);
  ctx.fillStyle = `#${fg}`;
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      if (!qr.isDark(y, x)) continue;
      // Snap to whole pixels so neighbouring modules don't leave hairline gaps.
      const x0 = Math.round((x + 4) * cell), y0 = Math.round((y + 4) * cell);
      ctx.fillRect(x0, y0, Math.round((x + 5) * cell) - x0, Math.round((y + 5) * cell) - y0);
    }
  }
  return c;
}

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
  // Rendered after mount (needs a canvas), so the static HTML and first client render match.
  const [canvas, setCanvas] = React.useState<HTMLCanvasElement | null>(null);
  const [tooLong, setTooLong] = React.useState(false);
  React.useEffect(() => {
    const c = trimmed ? renderQr(trimmed, size, color.fg, color.bg, ecc) : null;
    setCanvas(c);
    setTooLong(!!trimmed && !c);
  }, [trimmed, size, color, ecc]);
  const qrUrl = React.useMemo(() => canvas?.toDataURL("image/png") ?? "", [canvas]);

  const handleDownload = () => {
    canvas?.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `qr-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, "image/png");
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
            {tooLong && " — too long for a QR code; shorten it or lower the error correction."}
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
