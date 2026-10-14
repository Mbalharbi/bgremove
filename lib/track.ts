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
export type UsageEvent = "upload" | "success" | "fail" | "download" | "edit_open" | "edit_apply" | "bg_change" | "solid_apply";

export interface EventDetails {
  engine?: string;
  dtype?: string;
  device?: string;
  ms?: number;
  /** For bulk: how many images in this action. */
  count?: number;
  /** Short, non-identifying error class (e.g. "model-load", "decode"). */
  reason?: string;
  /** Model download/warm-up part of `ms` (first image of a visit only). */
  loadMs?: number;
  /** Image format of the upload, e.g. "jpeg", "heic" — never the file name. */
  fileType?: string;
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
    loadMs: details.loadMs !== undefined ? Math.round(details.loadMs) : undefined,
  });
  try {
    // sendBeacon survives page navigation and never blocks the UI.
    const ok = navigator.sendBeacon?.("/api/event", new Blob([body], { type: "application/json" }));
    if (!ok) void fetch("/api/event", { method: "POST", body, keepalive: true, headers: { "Content-Type": "application/json" } });
  } catch {
    /* analytics must never break the tool */
  }
}

/** Coarse image format from MIME type or extension ("jpeg", "png", "heic", …). */
export function fileTypeOf(file: File | Blob): string {
  const name = file instanceof File ? file.name.toLowerCase() : "";
  const ext = name.includes(".") ? name.split(".").pop()! : "";
  const t = (file.type.split("/")[1] || ext || "unknown").replace("jpg", "jpeg").replace("x-", "");
  return /^[a-z0-9+.-]{1,12}$/.test(t) ? t : "other";
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

// ── Page views ──────────────────────────────────────────────────────────────
// Visitor counts without IDs: this browser remembers only the date of its
// last view, so each view can say "first today / first this month / first ever".

const LAST_VIEW_KEY = "bgremove:lastView";

function visitFlags(): { newDay: boolean; newMonth: boolean; newEver: boolean } {
  const today = new Date().toISOString().slice(0, 10);
  try {
    const last = localStorage.getItem(LAST_VIEW_KEY);
    localStorage.setItem(LAST_VIEW_KEY, today);
    return { newDay: last !== today, newMonth: !last || last.slice(0, 7) !== today.slice(0, 7), newEver: !last };
  } catch {
    return { newDay: false, newMonth: false, newEver: false }; // storage blocked: count the view, not a visitor
  }
}

function deviceType(): "mobile" | "tablet" | "desktop" {
  const ua = navigator.userAgent;
  if (/iPad|Tablet|Nexus 7|Nexus 10|SM-T/i.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1)) return "tablet";
  return /Mobi|Android|iPhone|iPod/i.test(ua) ? "mobile" : "desktop";
}

function browserFamily(): string {
  const ua = navigator.userAgent;
  if (/SamsungBrowser/.test(ua)) return "Samsung";
  if (/OPR\/|Opera/.test(ua)) return "Opera";
  if (/Edg\//.test(ua)) return "Edge";
  if (/Firefox\//.test(ua)) return "Firefox";
  if (/Chrome\//.test(ua) || /CriOS/.test(ua)) return "Chrome";
  if (/Safari\//.test(ua)) return "Safari";
  return "Other";
}

export function trackPageview(path: string, referrer: string): void {
  if (typeof window === "undefined") return;
  let ref = "";
  try {
    ref = referrer ? new URL(referrer).hostname : "";
  } catch {
    /* malformed referrer → direct */
  }
  const body = JSON.stringify({
    path,
    ref,
    device: deviceType(),
    browser: browserFamily(),
    locale: detectLocale(path).code,
    ...visitFlags(),
  });
  try {
    const ok = navigator.sendBeacon?.("/api/pv", new Blob([body], { type: "application/json" }));
    if (!ok) void fetch("/api/pv", { method: "POST", body, keepalive: true, headers: { "Content-Type": "application/json" } });
  } catch {
    /* analytics must never break the site */
  }
}
