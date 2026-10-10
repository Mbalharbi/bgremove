/**
 * Anonymous usage counters → POST /api/event (worker/index.ts, D1 table `events`).
 *
 * What is sent: tool, event name, and a few non-identifying details
 * (engine/precision/device for background removal, duration, page locale,
 * whether this browser has used the site before). The worker adds the
 * country from Cloudflare.
 *
 * Never sent: images, file names, IPs, cookies or any per-person ID. The
 * "returning" flag is a single boolean kept in localStorage.
 */

import { detectLocale } from "@/lib/locales";

export type Tool = "remove" | "bulk" | "compress" | "resize" | "webp" | "qr" | "metadata";
export type UsageEvent = "upload" | "success" | "fail" | "download" | "edit_open" | "edit_apply";

export interface EventDetails {
  engine?: string;
  dtype?: string;
  device?: string;
  ms?: number;
  /** For bulk: how many images in this action. */
  count?: number;
  /** Short, non-identifying error class (e.g. "model-load", "decode"). */
  reason?: string;
}

const SEEN_KEY = "bgremove:seen";

/** Which tool a page hosts, from its path (locale prefix stripped). */
export function toolFromPath(pathname: string): Tool {
  const loc = detectLocale(pathname);
  const p = loc.prefix ? pathname.slice(loc.prefix.length) || "/" : pathname;
  if (p.startsWith("/bulk")) return "bulk";
  if (p.startsWith("/tools/image-compressor")) return "compress";
  if (p.startsWith("/tools/image-resizer")) return "resize";
  if (p.startsWith("/tools/webp-converter")) return "webp";
  if (p.startsWith("/tools/qr-code-generator")) return "qr";
  if (p.startsWith("/tools/image-metadata-viewer")) return "metadata";
  return "remove"; // home, locale homes and every landing page embed the remover
}

function returning(): boolean {
  try {
    const seen = localStorage.getItem(SEEN_KEY) === "1";
    if (!seen) localStorage.setItem(SEEN_KEY, "1");
    return seen;
  } catch {
    return false;
  }
}

// Decided once per page load so all events of a visit agree.
let returningVisit: boolean | null = null;

export function track(tool: Tool, event: UsageEvent, details: EventDetails = {}): void {
  if (typeof window === "undefined") return;
  if (returningVisit === null) returningVisit = returning();
  const body = JSON.stringify({
    tool,
    event,
    locale: detectLocale(window.location.pathname).code,
    returning: returningVisit,
    ...details,
    ms: details.ms !== undefined ? Math.round(details.ms) : undefined,
  });
  try {
    // sendBeacon survives page navigation and never blocks the UI.
    const ok = navigator.sendBeacon?.("/api/event", new Blob([body], { type: "application/json" }));
    if (!ok) void fetch("/api/event", { method: "POST", body, keepalive: true, headers: { "Content-Type": "application/json" } });
  } catch {
    /* analytics must never break the tool */
  }
}

/** Map an error message to a coarse, non-identifying class. */
export function errorReason(err: unknown): string {
  const m = (err instanceof Error ? err.message : String(err)).toLowerCase();
  if (/too large|maximum is/.test(m)) return "too-large";
  if (/decode|could not decode/.test(m)) return "decode";
  if (/fetch|network|load|import/.test(m)) return "model-load";
  if (/memory|allocation|oom/.test(m)) return "memory";
  if (/webgpu|gpu|device/.test(m)) return "gpu";
  return "other";
}
