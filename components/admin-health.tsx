"use client";

/**
 * "Site health & search" tab: nightly site check, Google Search Console and
 * Bing Webmaster data (worker/nightly.ts → GET /api/health-report).
 */

import * as React from "react";
import { AlertTriangle, CheckCircle2, Loader2, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BarChart, LineChart } from "@/components/admin-charts";

interface Issue {
  severity: "critical" | "warning" | "info";
  type: string;
  path: string;
  detail: string;
  isNew: boolean;
}
interface Daily {
  day: string;
  clicks: number;
  impressions: number;
}
interface Report {
  lastRunDay: string | null;
  summary: { day: string; pages: number; issues: number; critical: number } | null;
  job: { day: string; phase: string; log: string[] } | null;
  issues: Issue[];
  trend: { day: string; n: number; critical: number }[];
  google: {
    configured: boolean;
    error: { day: string; message: string } | null;
    daily: (Daily & { position: number })[];
    top: { dim: string; key: string; clicks: number; impressions: number; position: number }[];
    index: { path: string; verdict: string; coverage: string; last_crawl: string; droppedOut: boolean }[];
  };
  bing: { configured: boolean; error: { day: string; message: string } | null; daily: Daily[]; issues: { url: string; http: number; issues: string }[] };
}

const TYPE_AR: Record<string, string> = {
  "sitemap-not-200": "صفحة في خريطة الموقع لا تفتح",
  noindex: "صفحة محجوبة عن Google (noindex)",
  "no-title": "صفحة بدون عنوان",
  "no-canonical": "صفحة بدون canonical",
  "canonical-elsewhere": "canonical يشير لصفحة أخرى",
  "broken-link": "رابط داخلي معطّل",
  "broken-hreflang": "رابط لغة (hreflang) معطّل",
  "duplicate-title": "عنوان مكرر في أكثر من صفحة",
  "robots-blocks-all": "robots.txt يمنع كل محركات البحث",
};
const SEV: Record<string, { label: string; cls: string }> = {
  critical: { label: "حرج", cls: "bg-red-500/15 text-red-700 dark:text-red-400" },
  warning: { label: "تنبيه", cls: "bg-amber-500/15 text-amber-700 dark:text-amber-400" },
  info: { label: "معلومة", cls: "bg-muted text-muted-foreground" },
};

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h3 className="mb-4 text-sm font-semibold">{title}</h3>
      {children}
    </div>
  );
}

const sumRange = (rows: Daily[], k: "clicks" | "impressions", from: number, to: number) =>
  rows.slice(Math.max(0, rows.length - to), rows.length - from).reduce((a, r) => a + r[k], 0);
const change = (now: number, before: number) =>
  before ? `${now >= before ? "▲" : "▼"} ${Math.abs(Math.round(((now - before) / before) * 100))}%` : "—";
const monthly = (rows: Daily[], k: "clicks" | "impressions") => {
  const m = new Map<string, number>();
  for (const r of rows) m.set(r.day.slice(0, 7), (m.get(r.day.slice(0, 7)) ?? 0) + r[k]);
  return Array.from(m.entries()).slice(-16).map(([label, value]) => ({ label, value }));
};

function SearchBlock({ name, rows }: { name: string; rows: Daily[] }) {
  const i7 = sumRange(rows, "impressions", 0, 7), i14 = sumRange(rows, "impressions", 7, 14);
  const c7 = sumRange(rows, "clicks", 0, 7), c14 = sumRange(rows, "clicks", 7, 14);
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-4">
        <Stat label={`${name}: ظهور آخر 7 أيام`} value={i7.toLocaleString("en")} />
        <Stat label="مقارنة بالأسبوع السابق" value={change(i7, i14)} />
        <Stat label={`${name}: نقرات آخر 7 أيام`} value={c7.toLocaleString("en")} />
        <Stat label="مقارنة بالأسبوع السابق" value={change(c7, c14)} />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card title={`${name}: الظهور شهريًا`}>
          <BarChart points={monthly(rows, "impressions")} unit="ظهور" />
        </Card>
        <Card title={`${name}: الظهور يوميًا — آخر 90 يومًا`}>
          <LineChart points={rows.slice(-90).map((r) => ({ label: r.day, value: r.impressions }))} unit="ظهور" />
        </Card>
        <Card title={`${name}: النقرات يوميًا — آخر 90 يومًا`}>
          <LineChart points={rows.slice(-90).map((r) => ({ label: r.day, value: r.clicks }))} unit="نقرة" />
        </Card>
      </div>
    </>
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

function TopTable({ rows, keyLabel }: { rows: { key: string; clicks: number; impressions: number; position: number }[]; keyLabel: string }) {
  if (!rows.length) return <p className="text-sm text-muted-foreground">لا توجد بيانات بعد.</p>;
  return (
    <table className="w-full text-sm">
      <thead className="text-muted-foreground">
        <tr><th className="text-right">{keyLabel}</th><th>ظهور</th><th>نقرات</th><th>الترتيب</th></tr>
      </thead>
      <tbody>
        {rows.slice(0, 15).map((r) => (
          <tr key={r.key} className="border-t border-border">
            <td className="max-w-[16rem] truncate py-1" dir="auto" title={r.key}>{r.key}</td>
            <td className="text-center">{r.impressions}</td>
            <td className="text-center">{r.clicks}</td>
            <td className="text-center">{r.position?.toFixed(1)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Setup({ title, steps }: { title: string; steps: string[] }) {
  return (
    <div className="rounded-xl border border-dashed border-border p-5 text-sm">
      <p className="font-semibold">{title}</p>
      <ol className="mt-2 list-decimal space-y-1 pe-5 text-muted-foreground">
        {steps.map((s) => <li key={s}>{s}</li>)}
      </ol>
    </div>
  );
}

export function HealthSection({ adminKey }: { adminKey: string }) {
  const [report, setReport] = React.useState<Report | null>(null);
  const [running, setRunning] = React.useState(false);
  const [progress, setProgress] = React.useState<string>("");
  const auth = { Authorization: `Bearer ${adminKey}` };

  const load = React.useCallback(async () => {
    const r = await fetch("/api/health-report", { headers: { Authorization: `Bearer ${adminKey}` } });
    setReport(r.ok ? await r.json() : null);
  }, [adminKey]);
  React.useEffect(() => {
    void load();
  }, [load]);

  const runNow = async () => {
    setRunning(true);
    try {
      for (let i = 0; i < 120; i++) {
        // First call restarts today's run so fixes are re-checked immediately.
        const r = await fetch(`/api/admin/nightly-step${i === 0 ? "?restart=1" : ""}`, { method: "POST", headers: auth });
        if (!r.ok) { setProgress(`خطأ ${r.status}`); break; }
        const job = (await r.json()) as { phase: string; log: string[] };
        setProgress(job.log[job.log.length - 1] ?? job.phase);
        if (job.phase === "done") break;
      }
      await load();
    } finally {
      setRunning(false);
    }
  };

  if (!report) return <p className="rounded-xl border border-dashed border-border p-5 text-sm text-muted-foreground">جارٍ التحميل…</p>;

  const g = report.google, b = report.bing;
  const newIssues = report.issues.filter((i) => i.isNew);
  const critical = report.issues.filter((i) => i.severity === "critical");
  const dropped = g.index.filter((r) => r.droppedOut);
  const notIndexed = g.index.filter((r) => r.verdict && r.verdict !== "PASS");
  const gi7 = sumRange(g.daily, "impressions", 0, 7), gi14 = sumRange(g.daily, "impressions", 7, 14);
  const googleDrop = gi14 > 20 && gi7 < gi14 * 0.7;
  const alerts: string[] = [
    ...(critical.length ? [`${critical.length} مشكلة حرجة في فحص الموقع`] : []),
    ...(newIssues.length ? [`${newIssues.length} مشكلة جديدة منذ الفحص السابق`] : []),
    ...(dropped.length ? [`${dropped.length} صفحة خرجت من فهرس Google: ${dropped.map((d) => d.path).join("، ")}`] : []),
    ...(googleDrop ? [`ظهور Google انخفض ${Math.round((1 - gi7 / gi14) * 100)}% عن الأسبوع السابق`] : []),
    ...(b.issues.length ? [`Bing أبلغ عن ${b.issues.length} مشكلة زحف`] : []),
    ...(g.error ? [`Google: ${g.error.message}`] : []),
    ...(b.error ? [`Bing: ${b.error.message}`] : []),
  ];

  return (
    <section className="grid gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          آخر فحص: <b>{report.lastRunDay ?? "لم يتم بعد"}</b> · يعمل تلقائيًا كل ليلة (01:00–04:00 UTC).
        </p>
        <div className="flex items-center gap-3">
          {progress && <span className="text-xs text-muted-foreground" dir="ltr">{progress}</span>}
          <Button size="sm" variant="outline" onClick={runNow} disabled={running}>
            {running ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
            شغّل الفحص الآن
          </Button>
        </div>
      </div>

      <div className={`rounded-xl border p-5 ${alerts.length ? "border-red-500/40 bg-red-500/5" : "border-primary/30 bg-primary/5"}`}>
        <h2 className="flex items-center gap-2 text-lg font-bold">
          {alerts.length ? <AlertTriangle className="h-5 w-5 text-red-600" /> : <CheckCircle2 className="h-5 w-5 text-primary" />}
          {alerts.length ? "تنبيهات اليوم" : "لا توجد مشاكل جديدة"}
        </h2>
        {alerts.length > 0 && (
          <ul className="mt-2 list-disc space-y-1 pe-5 text-sm">
            {alerts.map((a) => <li key={a}>{a}</li>)}
          </ul>
        )}
      </div>

      <h3 className="mt-2 text-lg font-bold">فحص الموقع (كما يراه Google)</h3>
      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="صفحات فُحصت" value={report.summary?.pages ?? "—"} />
        <Stat label="مشاكل حرجة" value={critical.length} />
        <Stat label="كل الملاحظات" value={report.issues.length} />
      </div>
      <Card title="الملاحظات">
        {report.issues.length === 0 ? (
          <p className="text-sm text-muted-foreground">✅ لا توجد مشاكل.</p>
        ) : (
          <ul className="divide-y divide-border text-sm">
            {report.issues.map((i, k) => (
              <li key={k} className="flex flex-wrap items-center gap-2 py-2">
                <span className={`rounded px-2 py-0.5 text-xs ${SEV[i.severity]?.cls}`}>{SEV[i.severity]?.label}</span>
                {i.isNew && <span className="rounded bg-primary px-2 py-0.5 text-xs text-primary-foreground">جديد</span>}
                <span>{TYPE_AR[i.type] ?? i.type}</span>
                <code className="text-xs" dir="ltr">{i.path}</code>
                {i.detail && <span className="text-xs text-muted-foreground" dir="auto">{i.detail}</span>}
              </li>
            ))}
          </ul>
        )}
      </Card>
      {report.trend.length > 1 && (
        <Card title="عدد الملاحظات يوميًا">
          <LineChart points={report.trend.map((t) => ({ label: t.day, value: t.n }))} unit="ملاحظة" />
        </Card>
      )}

      <h3 className="mt-2 text-lg font-bold">Google Search Console</h3>
      {!g.configured ? (
        <Setup
          title="لم يُربط بعد — خطوات الربط (مرة واحدة):"
          steps={[
            "console.cloud.google.com ← أنشئ مشروعًا ← APIs & Services ← Library ← فعّل «Google Search Console API».",
            "IAM & Admin ← Service Accounts ← Create ← ثم Keys ← Add key ← JSON (يُنزَّل ملف).",
            "Search Console ← Settings ← Users and permissions ← Add user ← إيميل حساب الخدمة (client_email) بصلاحية Restricted.",
            "Cloudflare ← bgremove ← Settings ← Variables and Secrets: أضف GSC_CLIENT_EMAIL و GSC_PRIVATE_KEY (من ملف JSON) كـ Secret ← Deploy.",
            "إن كانت خاصيتك من نوع «URL prefix» أضف أيضًا GSC_SITE = https://bgremovers.org/",
          ]}
        />
      ) : (
        <>
          <SearchBlock name="Google" rows={g.daily} />
          <div className="grid gap-4 lg:grid-cols-2">
            <Card title="أكثر كلمات البحث (28 يومًا)"><TopTable keyLabel="الكلمة" rows={g.top.filter((t) => t.dim === "query")} /></Card>
            <Card title="أكثر الصفحات ظهورًا (28 يومًا)"><TopTable keyLabel="الصفحة" rows={g.top.filter((t) => t.dim === "page")} /></Card>
            <Card title="الدول (28 يومًا)"><TopTable keyLabel="الدولة" rows={g.top.filter((t) => t.dim === "country")} /></Card>
            <Card title={`حالة الفهرسة: ${g.index.length - notIndexed.length} مفهرسة من ${g.index.length}`}>
              {notIndexed.length === 0 ? (
                <p className="text-sm text-muted-foreground">{g.index.length ? "✅ كل الصفحات المفحوصة مفهرسة." : "لم يتم الفحص بعد."}</p>
              ) : (
                <ul className="max-h-80 divide-y divide-border overflow-auto text-sm">
                  {notIndexed.map((r) => (
                    <li key={r.path} className="py-1.5">
                      <code className="text-xs" dir="ltr">{r.path}</code>
                      <span className="ms-2 text-xs text-muted-foreground">{r.coverage}{r.last_crawl ? ` · آخر زيارة ${r.last_crawl.slice(0, 10)}` : ""}</span>
                      {r.droppedOut && <span className="ms-2 rounded bg-red-500/15 px-1.5 text-xs text-red-700">خرجت من الفهرس</span>}
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          </div>
        </>
      )}

      <h3 className="mt-2 text-lg font-bold">Bing Webmaster</h3>
      {!b.configured ? (
        <Setup
          title="لم يُربط بعد — خطوات الربط (دقيقتان):"
          steps={[
            "bing.com/webmasters ← افتح موقعك ← ⚙️ Settings ← API access ← API key ← Generate.",
            "Cloudflare ← bgremove ← Settings ← Variables and Secrets: أضف BING_API_KEY كـ Secret ← Deploy.",
          ]}
        />
      ) : (
        <>
          <SearchBlock name="Bing" rows={b.daily} />
          <Card title={`مشاكل الزحف في Bing (${b.issues.length})`}>
            {b.issues.length === 0 ? <p className="text-sm text-muted-foreground">✅ لا توجد.</p> : (
              <ul className="max-h-80 divide-y divide-border overflow-auto text-sm">
                {b.issues.map((i) => <li key={i.url} className="py-1.5"><code className="text-xs" dir="ltr">{i.url}</code> <span className="text-xs text-muted-foreground">HTTP {i.http}</span></li>)}
              </ul>
            )}
          </Card>
        </>
      )}
    </section>
  );
}
