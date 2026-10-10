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
}

interface Usage {
  days: number;
  byToolEvent: { tool: string; event: string; n: number; items: number }[];
  perDay: { day: string; event: string; n: number }[];
  engines: { engine: string; dtype: string; device: string; n: number; avg_ms: number }[];
  reasons: { tool: string; reason: string; n: number }[];
  countries: { country: string; n: number }[];
  locales: { locale: string; n: number }[];
  returning: { is_return: number; n: number }[];
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
const RANGE_DAYS: Record<string, number> = { "7": 7, "30": 30, all: 400 };

type Range = "7" | "30" | "all";

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
                ["7", "آخر 7 أيام"],
                ["30", "آخر 30 يومًا"],
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

      <UsageSection usage={usage} range={range} />

      <h2 className="mt-4 text-xl font-bold">آراء المستخدمين</h2>
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
  const reasonRows = usage.reasons.map((r) => [`${TOOL_AR[r.tool] ?? r.tool}: ${REASON_AR[r.reason] ?? r.reason}`, r.n] as [string, number]);
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
              <tr><th className="text-left">engine</th><th className="text-left">dtype</th><th className="text-left">device</th><th className="text-right">n</th><th className="text-right">avg</th></tr>
            </thead>
            <tbody>
              {usage.engines.map((e) => (
                <tr key={e.engine + e.dtype + e.device}>
                  <td>{e.engine}</td><td>{e.dtype}</td><td>{e.device}</td><td className="text-right">{e.n}</td>
                  <td className="text-right">{e.avg_ms ? `${(e.avg_ms / 1000).toFixed(1)}s` : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <BarList title="أسباب الفشل (كل الفترة)" rows={reasonRows} total={reasonRows.reduce((a, [, n]) => a + n, 0)} />
        <BarList title="الدول (المعالجات الناجحة)" rows={countryRows} total={okTotal} />
        <Stat label="زوار عائدون (من محاولات الرفع)" value={pct(ret, retAll)} />
      </div>
    </section>
  );
}
