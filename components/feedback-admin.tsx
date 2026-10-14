"use client";

/**
 * Owner dashboard for answers collected by the feedback popup.
 *
 * Reads GET /api/feedback with the FEEDBACK_ADMIN_KEY secret as a bearer
 * token. The key is kept in sessionStorage only (cleared when the tab
 * closes) and never placed in the URL.
 */

import * as React from "react";
import { Download, KeyRound, Loader2, LogOut, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FEEDBACK_STRINGS } from "@/components/feedback-dialog";
import { LOCALES } from "@/lib/locales";
import { RELEASES } from "@/lib/releases";
import { BarChart, LineChart } from "@/components/admin-charts";
import { HealthSection } from "@/components/admin-health";
import { cn } from "@/lib/utils";

const KEY_STORAGE = "bgremove:admin-key";
const AR = FEEDBACK_STRINGS.ar;

interface Entry {
  at: string;
  locale: string;
  path: string;
  useCase: string | null;
  needs: string[];
  rating: number | null;
  message: string;
  country: string | null;
  engine?: string | null;
  dtype?: string | null;
  device?: string | null;
  edited?: boolean;
  bgChanged?: boolean;
}

interface Usage {
  days: number;
  byToolEvent: { tool: string; event: string; n: number; items: number }[];
  perDay: { day: string; event: string; n: number }[];
  engines: { engine: string; dtype: string; device: string; n: number; avg_ms: number; avg_process_ms: number | null; avg_first_load_ms: number | null; timed: number }[];
  reasons: { tool: string; reason: string; file_type?: string; n: number }[];
  countries: { country: string; n: number }[];
  locales: { locale: string; n: number }[];
  returning: { is_return: number; n: number }[];
}

interface TopRow {
  key: string;
  views: number;
  visitors?: number;
  visits?: number;
}
interface Traffic {
  days: number;
  trackingSince: string | null;
  own: {
    monthly: { month: string; views: number; visitors: number; new_visitors: number }[];
    daily: { day: string; views: number; visitors: number }[];
    refs: TopRow[];
    countries: TopRow[];
    paths: TopRow[];
    devices: TopRow[];
    browsers: TopRow[];
    locales: TopRow[];
  };
  cf: {
    monthly: { month: string; views: number; visits: number }[];
    daily: { day: string; views: number; visits: number }[];
    refs: TopRow[];
    countries: TopRow[];
    paths: TopRow[];
    devices: TopRow[];
    lastSync: { at: string; ok: boolean; rows?: number; botsExcluded?: boolean; error?: string } | null;
    configured: boolean;
  };
}

const TOOL_AR: Record<string, string> = {
  remove: "إزالة الخلفية",
  bulk: "المعالجة الجماعية",
  compress: "ضغط الصور",
  resize: "تغيير المقاس",
  webp: "تحويل WebP",
  qr: "مولّد QR",
  metadata: "بيانات الصورة",
};
const REASON_AR: Record<string, string> = {
  "too-large": "الملف كبير",
  decode: "تعذّر فتح الصورة",
  "model-load": "فشل تحميل النموذج",
  memory: "نفاد الذاكرة",
  gpu: "مشكلة كرت الشاشة",
  other: "أخرى",
  "?": "غير معروف",
};
const RANGE_DAYS: Record<string, number> = { "7": 7, "30": 30, "90": 90, "365": 365, all: 3650 };

type Range = "7" | "30" | "90" | "365" | "all";
type Tab = "traffic" | "health" | "feedback" | "actions" | "usage";

function countBy<T extends string>(items: (T | null | undefined)[]): [T, number][] {
  const m = new Map<T, number>();
  for (const it of items) if (it) m.set(it, (m.get(it) ?? 0) + 1);
  return Array.from(m.entries()).sort((a, b) => b[1] - a[1]);
}

const countryName = (code: string) => {
  try {
    return new Intl.DisplayNames(["ar"], { type: "region" }).of(code) ?? code;
  } catch {
    return code;
  }
};
const localeName = (code: string) => LOCALES.find((l) => l.code === code)?.nativeName ?? code;
const needLabel = (n: string) => (AR.needs as Record<string, string>)[n] ?? n;
const purposeLabel = (u: string) => (AR.useCases as Record<string, string>)[u] ?? u;

function toCsv(entries: Entry[]): string {
  const esc = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const head = ["date", "language", "country", "page", "use_case", "needs", "rating", "message"];
  const rows = entries.map((e) =>
    [e.at, e.locale, e.country, e.path, e.useCase, e.needs.join(" | "), e.rating, e.message].map(esc).join(",")
  );
  // BOM so Excel opens Arabic/Chinese text correctly.
  return "﻿" + [head.join(","), ...rows].join("\n");
}

function BarList({ title, rows, total }: { title: string; rows: [string, number][]; total: number }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h3 className="mb-4 text-sm font-semibold">{title}</h3>
      {rows.length === 0 ? (
        <p className="text-sm text-muted-foreground">لا توجد بيانات بعد.</p>
      ) : (
        <ul className="space-y-3">
          {rows.map(([label, n]) => {
            const pct = total ? Math.round((n / total) * 100) : 0;
            return (
              <li key={label}>
                <div className="mb-1 flex justify-between gap-3 text-sm">
                  <span>{label}</span>
                  <span className="font-mono text-muted-foreground">
                    {n} · {pct}%
                  </span>
                </div>
                <div className="h-2 rounded-full bg-muted">
                  <div className="h-2 rounded-full bg-primary" style={{ width: `${pct}%` }} />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
    </div>
  );
}

export function FeedbackAdmin() {
  const [key, setKey] = React.useState("");
  const [entries, setEntries] = React.useState<Entry[] | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [range, setRange] = React.useState<Range>("30");
  const [usage, setUsage] = React.useState<Usage | null>(null);
  const [traffic, setTraffic] = React.useState<Traffic | null>(null);
  const [tab, setTab] = React.useState<Tab>("traffic");
  const [syncMsg, setSyncMsg] = React.useState<string | null>(null);

  const load = React.useCallback(async (k: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/feedback", { headers: { Authorization: `Bearer ${k}` } });
      if (res.status === 401) throw new Error("مفتاح المدير غير صحيح.");
      if (res.status === 404 || res.status === 503)
        throw new Error("تخزين الآراء أو مفتاح المدير غير مُعَدّ في Cloudflare بعد.");
      if (!res.ok) throw new Error(`خطأ غير متوقع (${res.status}).`);
      const data = (await res.json()) as { entries: Entry[] };
      setEntries(data.entries.slice().reverse()); // newest first
      // Usage counters are optional (D1 may not be set up yet).
      fetch(`/api/usage?days=400`, { headers: { Authorization: `Bearer ${k}` } })
        .then((r) => (r.ok ? r.json() : null))
        .then((u) => setUsage(u))
        .catch(() => setUsage(null));
      try {
        sessionStorage.setItem(KEY_STORAGE, k);
      } catch {
        /* storage blocked — user re-enters the key next time */
      }
    } catch (e) {
      setEntries(null);
      setError(e instanceof Error ? e.message : "تعذّر التحميل.");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    let saved: string | null = null;
    try {
      saved = sessionStorage.getItem(KEY_STORAGE);
    } catch {
      /* ignore */
    }
    if (saved) {
      setKey(saved);
      void load(saved);
    }
  }, [load]);

  React.useEffect(() => {
    if (!entries || !key) return;
    let cancelled = false;
    fetch(`/api/traffic?days=${RANGE_DAYS[range]}`, { headers: { Authorization: `Bearer ${key}` } })
      .then((r) => (r.ok ? r.json() : null))
      .then((t) => !cancelled && setTraffic(t))
      .catch(() => !cancelled && setTraffic(null));
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [range, entries, key]);

  const syncCloudflare = async () => {
    setSyncMsg("جارٍ النسخ من Cloudflare…");
    try {
      const r = await fetch("/api/admin/cf-sync?days=31", { method: "POST", headers: { Authorization: `Bearer ${key}` } });
      const j = (await r.json()) as { ok: boolean; rows?: number; error?: string };
      setSyncMsg(j.ok ? `تم: حُفظ ${j.rows} سطرًا من بيانات Cloudflare.` : `تعذّر: ${j.error}`);
      const t = await fetch(`/api/traffic?days=${RANGE_DAYS[range]}`, { headers: { Authorization: `Bearer ${key}` } });
      if (t.ok) setTraffic(await t.json());
    } catch {
      setSyncMsg("تعذّر الاتصال.");
    }
  };

  const logout = () => {
    try {
      sessionStorage.removeItem(KEY_STORAGE);
    } catch {
      /* ignore */
    }
    setKey("");
    setEntries(null);
  };

  const filtered = React.useMemo(() => {
    if (!entries) return [];
    if (range === "all") return entries;
    const since = Date.now() - Number(range) * 86_400_000;
    return entries.filter((e) => Date.parse(e.at) >= since);
  }, [entries, range]);

  const download = () => {
    const blob = new Blob([toCsv(filtered)], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bgremove-feedback-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!entries) {
    return (
      <div dir="rtl" className="mx-auto max-w-md rounded-xl border border-border bg-card p-6 text-right">
        <h1 className="flex items-center gap-2 text-xl font-bold">
          <KeyRound className="h-5 w-5 text-primary" />
          لوحة آراء المستخدمين
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          أدخل مفتاح المدير (قيمة FEEDBACK_ADMIN_KEY التي وضعتها في Cloudflare).
        </p>
        <form
          className="mt-5 grid gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            if (key.trim()) void load(key.trim());
          }}
        >
          <input
            type="password"
            autoComplete="current-password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="مفتاح المدير"
            dir="ltr"
            className="rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          <Button type="submit" disabled={loading || !key.trim()}>
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            دخول
          </Button>
          {error && (
            <p role="alert" className="text-sm text-destructive">
              {error}
            </p>
          )}
        </form>
      </div>
    );
  }

  const total = filtered.length;
  const rated = filtered.filter((e) => e.rating !== null);
  const avg = rated.length ? rated.reduce((s, e) => s + (e.rating ?? 0), 0) / rated.length : null;
  const needs = countBy(filtered.flatMap((e) => e.needs)).map(([n, c]) => [needLabel(n), c] as [string, number]);
  const useCases = countBy(filtered.map((e) => e.useCase)).map(([u, c]) => [purposeLabel(u), c] as [string, number]);
  const countries = countBy(filtered.map((e) => e.country)).slice(0, 10).map(([c, n]) => [countryName(c), n] as [string, number]);
  const langs = countBy(filtered.map((e) => e.locale)).map(([l, n]) => [localeName(l), n] as [string, number]);
  const ratings = [5, 4, 3, 2, 1].map((r) => [`${"★".repeat(r)} (${AR.ratings[r - 1]})`, rated.filter((e) => e.rating === r).length] as [string, number]);
  const comments = filtered.filter((e) => e.message);

  return (
    <div dir="rtl" className="grid gap-6 text-right">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">لوحة آراء المستخدمين</h1>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex rounded-lg border border-border p-1">
            {(
              [
                ["7", "7 أيام"],
                ["30", "30 يومًا"],
                ["90", "3 أشهر"],
                ["365", "سنة"],
                ["all", "الكل"],
              ] as [Range, string][]
            ).map(([r, label]) => (
              <button
                key={r}
                type="button"
                onClick={() => setRange(r)}
                className={cn(
                  "rounded-md px-3 py-1 text-sm",
                  range === r ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {label}
              </button>
            ))}
          </div>
          <Button variant="outline" size="sm" onClick={() => void load(key)} disabled={loading}>
            <RefreshCw className={cn("h-4 w-4", loading && "animate-spin")} />
            تحديث
          </Button>
          <Button variant="outline" size="sm" onClick={download} disabled={!total}>
            <Download className="h-4 w-4" />
            تنزيل Excel (CSV)
          </Button>
          <Button variant="ghost" size="sm" onClick={logout}>
            <LogOut className="h-4 w-4" />
            خروج
          </Button>
        </div>
      </div>

      <div role="tablist" aria-label="أقسام اللوحة" className="flex flex-wrap gap-1 border-b border-border">
        {(
          [
            ["traffic", "الزيارات"],
            ["health", "صحة الموقع والبحث"],
            ["feedback", "الآراء"],
            ["actions", "ماذا فعلنا بآرائكم"],
            ["usage", "الاستخدام"],
          ] as [Tab, string][]
        ).map(([id, label]) => (
          <button
            key={id}
            role="tab"
            type="button"
            aria-selected={tab === id}
            onClick={() => setTab(id)}
            className={cn(
              "-mb-px border-b-2 px-4 py-2 text-sm font-medium",
              tab === id ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "traffic" && <TrafficSection traffic={traffic} onSync={syncCloudflare} syncMsg={syncMsg} />}
      {tab === "usage" && <UsageSection usage={usage} range={range} />}
      {tab === "health" && <HealthSection adminKey={key} />}
      {tab === "actions" && <ActionsSection entries={entries} usage={usage} />}
      {tab === "feedback" && (
        <>
      <Summary3Days entries={entries} />
      <h2 className="mt-2 text-xl font-bold">كل الآراء في الفترة المختارة</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="عدد الردود" value={total} />
        <Stat label="متوسط التقييم" value={avg === null ? "—" : `${avg.toFixed(1)} / 5`} />
        <Stat label="ردود فيها تعليق" value={comments.length} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <BarList title="أكثر الميزات طلبًا" rows={needs} total={total} />
        <BarList title="لأي غرض يستخدمون الأداة" rows={useCases} total={total} />
        <BarList title="التقييم" rows={ratings} total={rated.length} />
        <BarList title="الدول" rows={countries} total={total} />
        <BarList title="لغة الرد" rows={langs} total={total} />
      </div>

      <div className="rounded-xl border border-border bg-card p-5">
        <h3 className="mb-4 text-sm font-semibold">التعليقات المكتوبة ({comments.length})</h3>
        {comments.length === 0 ? (
          <p className="text-sm text-muted-foreground">لا توجد تعليقات في هذه الفترة.</p>
        ) : (
          <ul className="divide-y divide-border">
            {comments.map((e) => (
              <li key={e.at + e.message} className="py-3">
                <p className="whitespace-pre-wrap text-sm" dir="auto">
                  {e.message}
                  {e.locale !== "ar" && (
                    <a
                      href={`https://translate.google.com/?sl=auto&tl=ar&op=translate&text=${encodeURIComponent(e.message)}`}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="ms-2 text-xs text-primary underline"
                    >
                      ترجم
                    </a>
                  )}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {new Date(e.at).toLocaleString("ar")} · {e.country ? countryName(e.country) : "—"} ·{" "}
                  {localeName(e.locale)}
                  {e.rating ? ` · ${"★".repeat(e.rating)}` : ""}
                  {e.needs.length ? ` · ${e.needs.map(needLabel).join("، ")}` : ""}
                  {e.engine ? ` · ${e.engine}${e.dtype ? "/" + e.dtype : ""}${e.device ? "/" + e.device : ""}` : ""}
                  {e.edited ? " · استخدم الفرشاة" : ""}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
        </>
      )}
    </div>
  );
}

/** "Usage" block: which tools people use and how well processing works. */
function UsageSection({ usage, range }: { usage: Usage | null; range: Range }) {
  if (!usage) {
    return (
      <div className="rounded-xl border border-dashed border-border p-5 text-sm text-muted-foreground">
        إحصاءات الاستخدام غير متاحة بعد (قاعدة البيانات لم تُفعّل أو لا توجد بيانات).
      </div>
    );
  }
  // The API returns up to 400 days; filter to the selected range client-side.
  const since = new Date(Date.now() - (RANGE_DAYS[range] - 1) * 86400000).toISOString().slice(0, 10);
  const days = usage.perDay.filter((d) => d.day >= since);
  const total = (ev: string) => days.filter((d) => d.event === ev).reduce((a, d) => a + d.n, 0);
  const uploads = total("upload"), ok = total("success"), fail = total("fail"), dls = total("download");
  const editOpen = total("edit_open"), editApply = total("edit_apply");
  const pct = (a: number, b: number) => (b ? `${Math.round((a / b) * 100)}%` : "—");
  // Tool popularity and engine stats come from the all-time aggregates.
  const toolRows = Object.entries(
    usage.byToolEvent.filter((r) => r.event === "upload").reduce<Record<string, number>>((m, r) => {
      m[r.tool] = (m[r.tool] ?? 0) + r.items;
      return m;
    }, {})
  )
    .sort((a, b) => b[1] - a[1])
    .map(([t, n]) => [TOOL_AR[t] ?? t, n] as [string, number]);
  const toolTotal = toolRows.reduce((a, [, n]) => a + n, 0);
  const ret = usage.returning.find((r) => r.is_return === 1)?.n ?? 0;
  const retAll = usage.returning.reduce((a, r) => a + r.n, 0);
  const reasonRows = usage.reasons.map((r) => [`${TOOL_AR[r.tool] ?? r.tool}: ${REASON_AR[r.reason] ?? r.reason}${r.file_type && r.file_type !== "?" ? ` (${r.file_type})` : ""}`, r.n] as [string, number]);
  const itemsOf = (tool: string, ev: string) => usage.byToolEvent.filter((r) => r.tool === tool && r.event === ev).reduce((a, r) => a + r.items, 0);
  const downloadRates = ["remove", "bulk"].map((tool) => ({ tool, downloads: itemsOf(tool, "download"), successes: itemsOf(tool, "success") }));
  const countryRows = usage.countries.map((c) => [c.country === "?" ? "غير معروف" : countryName(c.country), c.n] as [string, number]);
  const okTotal = usage.countries.reduce((a, c) => a + c.n, 0);
  const byDay = Array.from(new Set(days.map((d) => d.day))).map((day) => ({
    day,
    n: days.filter((d) => d.day === day && d.event === "upload").reduce((a, d) => a + d.n, 0),
  }));
  const maxDay = Math.max(1, ...byDay.map((d) => d.n));

  return (
    <section className="grid gap-4">
      <h2 className="text-xl font-bold">الاستخدام</h2>
      <div className="grid gap-4 sm:grid-cols-4">
        <Stat label="محاولات رفع" value={uploads} />
        <Stat label="نجاح المعالجة" value={`${ok} (${pct(ok, ok + fail)})`} />
        <Stat label="تنزيلات" value={`${dls} (${pct(dls, ok)} من الناجحة)`} />
        <Stat label="استخدام الفرشاة" value={`${editApply} / ${editOpen} فُتحت`} />
        <Stat label="تبديل الخلفية" value={total("bg_change")} />
        <Stat label="وضع اللون الواحد" value={total("solid_apply")} />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <BarList title="الأدوات الأكثر استخدامًا (عدد الصور، كل الفترة)" rows={toolRows} total={toolTotal} />
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="mb-4 text-sm font-semibold">محاولات الرفع يوميًا</h3>
          {byDay.length === 0 ? (
            <p className="text-sm text-muted-foreground">لا توجد بيانات بعد.</p>
          ) : (
            <div className="flex h-32 items-end gap-1" dir="ltr">
              {byDay.map((d) => (
                <div key={d.day} title={`${d.day}: ${d.n}`} className="flex-1 rounded-t bg-primary" style={{ height: `${(d.n / maxDay) * 100}%` }} />
              ))}
            </div>
          )}
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="mb-4 text-sm font-semibold">المحرك والجهاز (الناجحة، كل الفترة)</h3>
          <table className="w-full text-sm" dir="ltr">
            <thead className="text-muted-foreground">
              <tr><th className="text-left">engine</th><th className="text-left">dtype</th><th className="text-left">device</th><th className="text-right">n</th><th className="text-right">avg</th><th className="text-right" title="processing only">proc</th><th className="text-right" title="first image: model download + warm-up">1st load</th></tr>
            </thead>
            <tbody>
              {usage.engines.map((e) => (
                <tr key={e.engine + e.dtype + e.device}>
                  <td>{e.engine}</td><td>{e.dtype}</td><td>{e.device}</td><td className="text-right">{e.n}</td>
                  <td className="text-right">{e.avg_ms ? `${(e.avg_ms / 1000).toFixed(1)}s` : "—"}</td>
                  <td className="text-right">{e.avg_process_ms != null ? `${(e.avg_process_ms / 1000).toFixed(1)}s` : "—"}</td>
                  <td className="text-right">{e.avg_first_load_ms != null ? `${(e.avg_first_load_ms / 1000).toFixed(1)}s` : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-2 text-xs text-muted-foreground" dir="rtl">
            avg = الوقت الكلي · proc = المعالجة فقط · 1st load = تحميل النموذج لأول صورة. التقسيم متاح للمعالجات بعد 18 أكتوبر.
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="mb-4 text-sm font-semibold">معدل التنزيل لكل أداة (صور نُزّلت ÷ صور نجحت)</h3>
          <table className="w-full text-sm">
            <tbody>
              {downloadRates.map((r) => (
                <tr key={r.tool} className="border-t border-border">
                  <td className="py-1">{TOOL_AR[r.tool] ?? r.tool}</td>
                  <td className="text-center">{r.downloads} / {r.successes}</td>
                  <td className="text-left font-semibold">{r.successes ? `${Math.round((r.downloads / r.successes) * 100)}%` : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-2 text-xs text-muted-foreground">تنزيلات الجماعي تُحسب بعدد الصور في ملف ZIP منذ 18 أكتوبر.</p>
        </div>
        <BarList title="أسباب الفشل (كل الفترة)" rows={reasonRows} total={reasonRows.reduce((a, [, n]) => a + n, 0)} />
        <BarList title="الدول (المعالجات الناجحة)" rows={countryRows} total={okTotal} />
        <Stat label="زوار عائدون (من محاولات الرفع)" value={pct(ret, retAll)} />
      </div>
    </section>
  );
}

const MONTHS_AR = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
const monthLabel = (m: string) => `${MONTHS_AR[Number(m.slice(5, 7)) - 1]} ${m.slice(2, 4)}`;
const pctChange = (now: number, before: number) =>
  before ? `${now >= before ? "▲" : "▼"} ${Math.abs(Math.round(((now - before) / before) * 100))}%` : "—";
const REF_AR: Record<string, string> = { "(direct)": "مباشر / غير معروف" };
const DEVICE_AR: Record<string, string> = { mobile: "جوال", desktop: "كمبيوتر", tablet: "تابلت" };

/** Long-term traffic: our own page-view counter + the nightly copy of Cloudflare's numbers. */
function TrafficSection({ traffic, onSync, syncMsg }: { traffic: Traffic | null; onSync: () => void; syncMsg: string | null }) {
  if (!traffic) {
    return <p className="rounded-xl border border-dashed border-border p-5 text-sm text-muted-foreground">جارٍ تحميل بيانات الزيارات…</p>;
  }
  const own = traffic.own, cf = traffic.cf;
  const months = own.monthly.slice(-13);
  const cur = months[months.length - 1], prev = months[months.length - 2];
  const totalViews = own.daily.reduce((a, d) => a + d.views, 0);
  const totalVisitors = own.daily.reduce((a, d) => a + d.visitors, 0);
  const rows = (list: TopRow[], label: (k: string) => string = (k) => k, by: "views" | "visits" = "views") =>
    list.map((r) => [label(r.key), (by === "visits" ? r.visits : r.views) ?? 0] as [string, number]);
  const sum = (list: [string, number][]) => list.reduce((a, [, n]) => a + n, 0);
  const cfMonths = cf.monthly.slice(-13);

  return (
    <section className="grid gap-4">
      <div className="rounded-xl border border-border bg-card p-4 text-sm text-muted-foreground">
        {traffic.trackingSince
          ? <>عدّادنا يسجّل منذ <b>{traffic.trackingSince}</b>، وتُحفظ بياناته بلا انتهاء. </>
          : <>عدّادنا بدأ للتو ولا توجد بيانات بعد. </>}
        نحسب «الزائر» مرة واحدة يوميًا/شهريًا لكل متصفح، بدون أي معرّف أو IP — أرقامنا تقريبية وقد تختلف قليلًا عن Cloudflare.
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        <Stat label="زوار هذا الشهر" value={cur ? cur.visitors.toLocaleString("en") : "—"} />
        <Stat label="مقارنة بالشهر السابق" value={cur && prev ? pctChange(cur.visitors, prev.visitors) : "—"} />
        <Stat label="مشاهدات الفترة المختارة" value={totalViews.toLocaleString("en")} />
        <Stat label="زوار يوميون (مجموع الفترة)" value={totalVisitors.toLocaleString("en")} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="mb-4 text-sm font-semibold">الزوار شهريًا — آخر 13 شهرًا (عدّادنا)</h3>
          <BarChart points={months.map((m) => ({ label: monthLabel(m.month), value: m.visitors }))} unit="زائر" />
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="mb-4 text-sm font-semibold">الزوار يوميًا — الفترة المختارة (عدّادنا)</h3>
          <LineChart points={own.daily.map((d) => ({ label: d.day, value: d.visitors }))} unit="زائر" />
        </div>
        <BarList title="مصادر الزيارات (مشاهدات)" rows={rows(own.refs, (k) => REF_AR[k] ?? k)} total={sum(rows(own.refs))} />
        <BarList title="الدول (مشاهدات)" rows={rows(own.countries, (k) => (k === "?" ? "غير معروف" : countryName(k)))} total={sum(rows(own.countries))} />
        <BarList title="أكثر الصفحات زيارة" rows={rows(own.paths)} total={sum(rows(own.paths))} />
        <BarList title="الأجهزة" rows={rows(own.devices, (k) => DEVICE_AR[k] ?? k)} total={sum(rows(own.devices))} />
        <BarList title="المتصفحات" rows={rows(own.browsers)} total={sum(rows(own.browsers))} />
        <BarList title="لغة الصفحة" rows={rows(own.locales, (k) => localeName(k))} total={sum(rows(own.locales))} />
      </div>

      <h3 className="mt-2 text-lg font-bold">نسخة أرقام Cloudflare (محفوظة يوميًا)</h3>
      <div className="rounded-xl border border-border bg-card p-4 text-sm">
        {!cf.configured ? (
          <p className="text-muted-foreground">
            لم يُفعَّل بعد: أضف في Cloudflare (Workers & Pages ← bgremove ← Settings ← Variables and Secrets) سِرّين:
            <code className="mx-1">CF_ANALYTICS_TOKEN</code> و<code className="mx-1">CF_ACCOUNT_ID</code>، ثم اضغط «انسخ الآن».
          </p>
        ) : cf.lastSync ? (
          <p className="text-muted-foreground">
            آخر نسخ: {new Date(cf.lastSync.at).toLocaleString("ar")} — {cf.lastSync.ok ? `ناجح (${cf.lastSync.rows} سطرًا${cf.lastSync.botsExcluded ? "، بدون البوتات" : ""})` : `فشل: ${cf.lastSync.error}`}
          </p>
        ) : (
          <p className="text-muted-foreground">لم يتم أي نسخ بعد.</p>
        )}
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <Button size="sm" variant="outline" onClick={onSync} disabled={!cf.configured}>
            <RefreshCw className="h-4 w-4" />
            انسخ الآن (آخر 31 يومًا)
          </Button>
          {syncMsg && <span className="text-xs text-muted-foreground">{syncMsg}</span>}
        </div>
      </div>
      {cf.daily.length > 0 && (
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="mb-4 text-sm font-semibold">زيارات Cloudflare شهريًا</h3>
            <BarChart points={cfMonths.map((m) => ({ label: monthLabel(m.month), value: m.visits }))} unit="زيارة" />
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="mb-4 text-sm font-semibold">زيارات Cloudflare يوميًا — الفترة المختارة</h3>
            <LineChart points={cf.daily.map((d) => ({ label: d.day, value: d.visits }))} unit="زيارة" />
          </div>
          <BarList title="Cloudflare: المصادر (زيارات)" rows={rows(cf.refs, (k) => (k === "" ? "مباشر" : k), "visits")} total={sum(rows(cf.refs, undefined, "visits"))} />
          <BarList title="Cloudflare: الدول (زيارات)" rows={rows(cf.countries, undefined, "visits")} total={sum(rows(cf.countries, undefined, "visits"))} />
        </div>
      )}
    </section>
  );
}

/** Automatic summary of the last 3 days of feedback vs. the 3 days before. */
function Summary3Days({ entries }: { entries: Entry[] }) {
  const now = Date.now(), D3 = 3 * 86_400_000;
  const last = entries.filter((e) => now - Date.parse(e.at) < D3);
  const prev = entries.filter((e) => now - Date.parse(e.at) >= D3 && now - Date.parse(e.at) < 2 * D3);
  const avg = (l: Entry[]) => {
    const r = l.filter((e) => e.rating !== null);
    return r.length ? r.reduce((a, e) => a + (e.rating ?? 0), 0) / r.length : null;
  };
  const a1 = avg(last), a0 = avg(prev);
  const topNeed = countBy(last.flatMap((e) => e.needs))[0];
  const topUse = countBy(last.map((e) => e.useCase))[0];
  const complaints = last.filter((e) => e.rating !== null && e.rating <= 2);
  const langs = countBy(last.map((e) => e.locale)).map(([l, n]) => `${localeName(l)} ${n}`).join("، ");
  // Features already shipped that people still ask for → maybe they can't find them.
  const stillAsked = RELEASES.flatMap((r) =>
    r.needs
      .map((n) => ({ r, n, k: last.filter((e) => Date.parse(e.at) >= Date.parse(r.date) && e.needs.includes(n)).length }))
      .filter((x) => x.k > 0)
  );
  const comments = last.filter((e) => e.message);

  return (
    <section className="rounded-xl border border-primary/30 bg-primary/5 p-5">
      <h2 className="text-lg font-bold">ملخص آخر 3 أيام</h2>
      {last.length === 0 ? (
        <p className="mt-2 text-sm text-muted-foreground">لا توجد آراء في آخر 3 أيام.</p>
      ) : (
        <ul className="mt-3 list-disc space-y-1.5 pe-5 text-sm">
          <li><b>{last.length}</b> ردًا (الأيام الثلاثة قبلها: {prev.length}).</li>
          <li>
            متوسط التقييم: <b>{a1 === null ? "—" : a1.toFixed(1)}</b>
            {a0 !== null && a1 !== null ? ` (قبلها ${a0.toFixed(1)} — ${a1 >= a0 ? "تحسّن ▲" : "تراجع ▼"})` : ""}
          </li>
          {topNeed && <li>أكثر طلب: <b>{needLabel(topNeed[0])}</b> ({topNeed[1]})</li>}
          {topUse && <li>أكثر غرض للاستخدام: <b>{purposeLabel(topUse[0])}</b> ({topUse[1]})</li>}
          <li>اللغات: {langs}</li>
          <li>
            تقييمات سيئة (1–2): <b>{complaints.length}</b>
            {complaints.some((c) => c.message) && ` — ${complaints.filter((c) => c.message).map((c) => `«${c.message.slice(0, 80)}»`).join(" · ")}`}
          </li>
          {stillAsked.map(({ r, n, k }) => (
            <li key={r.id + n} className="text-amber-700 dark:text-amber-400">
              ما زال {k} زائرًا يطلبون «{needLabel(n)}» بعد إطلاق «{r.title}» — ربما لم يجدوها، أو يريدون شيئًا مختلفًا.
            </li>
          ))}
          {comments.length > 0 && (
            <li>
              تعليقات جديدة:
              <ul className="mt-1 space-y-1 pe-4">
                {comments.map((c) => (
                  <li key={c.at} dir="auto">«{c.message}» <span className="text-xs text-muted-foreground">— {localeName(c.locale)}{c.rating ? ` · ${"★".repeat(c.rating)}` : ""}</span></li>
                ))}
              </ul>
            </li>
          )}
        </ul>
      )}
    </section>
  );
}

/** For each feedback-driven release: was it asked for, is it used, did ratings move? */
function ActionsSection({ entries, usage }: { entries: Entry[]; usage: Usage | null }) {
  const avg = (l: Entry[]) => {
    const r = l.filter((e) => e.rating !== null);
    return r.length ? r.reduce((a, e) => a + (e.rating ?? 0), 0) / r.length : null;
  };
  const evSince = (ev: string, since: string) =>
    (usage?.perDay ?? []).filter((d) => d.event === ev && d.day >= since).reduce((a, d) => a + d.n, 0);
  return (
    <section className="grid gap-4">
      <p className="text-sm text-muted-foreground">
        كل ميزة بنيناها استجابةً لآرائكم، مع الأرقام: كم طلبها قبل الإطلاق، هل تُستخدم، وهل تغيّر التقييم بعدها.
      </p>
      {RELEASES.slice().reverse().map((r) => {
        const t = Date.parse(r.date);
        const before = entries.filter((e) => Date.parse(e.at) < t);
        const after = entries.filter((e) => Date.parse(e.at) >= t);
        const askedBefore = before.filter((e) => r.needs.some((n) => e.needs.includes(n))).length;
        const askedAfter = after.filter((e) => r.needs.some((n) => e.needs.includes(n))).length;
        const uses = r.events.reduce((a, ev) => a + evSince(ev, r.date), 0);
        const successes = evSince("success", r.date);
        const b = avg(before), a = avg(after);
        const usedIt = (e: Entry) =>
          r.usedFlag === "edited" ? !!e.edited : r.usedFlag === "bgChanged" ? !!e.bgChanged : r.usedFlag === "solid" ? e.engine === "solid-colour" : false;
        const users = r.usedFlag ? after.filter(usedIt) : [];
        const nonUsers = r.usedFlag ? after.filter((e) => !usedIt(e)) : [];
        const pct = (x: number, n: number) => (n ? `${Math.round((x / n) * 100)}%` : "—");
        return (
          <div key={r.id} className="rounded-xl border border-border bg-card p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-bold">{r.title}</h3>
              <span className="text-xs text-muted-foreground">أُطلقت {r.date}</span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">السبب: {r.because}</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-4">
              <Stat label="طلبها قبل الإطلاق" value={r.needs.length ? `${askedBefore} (${pct(askedBefore, before.length)})` : "—"} />
              <Stat label="ما زال يطلبها بعده" value={r.needs.length ? `${askedAfter} (${pct(askedAfter, after.length)})` : "—"} />
              <Stat
                label="الاستخدام منذ الإطلاق"
                value={r.events.length ? (usage ? `${uses} مرة (${pct(uses, successes)} من المعالجات)` : "—") : "—"}
              />
              <Stat label="متوسط التقييم" value={`قبل: ${b === null ? "—" : b.toFixed(1)} · بعد: ${a === null ? "—" : a.toFixed(1)}`} />
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <Stat
                label={`تقييم من استخدمها (${users.length} رد)`}
                value={r.usedFlag ? (avg(users) === null ? "—" : avg(users)!.toFixed(1)) : "—"}
              />
              <Stat
                label={`تقييم من لم يستخدمها (${nonUsers.length} رد)`}
                value={r.usedFlag ? (avg(nonUsers) === null ? "—" : avg(nonUsers)!.toFixed(1)) : "—"}
              />
            </div>
          </div>
        );
      })}
    </section>
  );
}
