import Link from "next/link";
import { ArrowRight, Cpu, Download, ImagePlus, Lock, Sparkles, Zap, Check, Minus, X } from "lucide-react";
import { BgRemover } from "@/components/bg-remover";
import { JsonLd } from "@/components/json-ld";
import { FAQ_AR, HOW_IT_WORKS_AR, USE_CASES_AR } from "@/lib/site-ar";
import { webApplicationSchemaAr, howToSchemaAr, faqSchemaAr } from "@/lib/schema-ar";
import { ArHomeFaq } from "@/components/ar/ar-home-faq";

const STEP_ICONS = [ImagePlus, Cpu, Download];

const COMPARE_ROWS = [
  { feature: "مجاني بدون حدود", bg: true, rem: "جزئي", ps: false },
  { feature: "بدون تسجيل", bg: true, rem: false, ps: false },
  { feature: "الصور تبقى على جهازك", bg: true, rem: false, ps: true },
  { feature: "يعمل على الجوال", bg: true, rem: true, ps: "جزئي" },
  { feature: "معالجة بالدفعات", bg: true, rem: "جزئي", ps: "جزئي" },
  { feature: "بدون علامة مائية", bg: true, rem: false, ps: true },
  { feature: "التكلفة الشهرية", bg: "0 ر.س", rem: "+34 ر.س", ps: "+86 ر.س" },
] as const;

function CompareCell({ value }: { value: boolean | "جزئي" | string }) {
  if (value === true) return <Check className="mx-auto h-5 w-5 text-primary" />;
  if (value === false) return <X className="mx-auto h-5 w-5 text-muted-foreground/60" />;
  if (value === "جزئي") return <Minus className="mx-auto h-5 w-5 text-accent" />;
  return <span className="font-mono text-sm">{value}</span>;
}

export default function ArabicHomePage() {
  return (
    <>
      <JsonLd data={[webApplicationSchemaAr, howToSchemaAr, faqSchemaAr]} />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-radial-fade" />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_60%_40%_at_50%_0%,black,transparent)]" />
        <div className="container relative pt-12 pb-16 sm:pt-20 sm:pb-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              <span>ذكاء اصطناعي مجاني 100% يعمل في المتصفح</span>
            </div>
            <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              أزِل خلفية الصور{" "}
              <span className="bg-gradient-to-l from-primary to-emerald-400 bg-clip-text text-transparent">
                في ثوانٍ
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
              مجاناً، بلا حدود، وخاص 100% — تتم معالجة صورك بالكامل في متصفحك.
              بدون رفع، بدون تسجيل، بدون علامة مائية.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-3xl animate-fade-in">
            <BgRemover />
          </div>

          <div className="mx-auto mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
            <div className="inline-flex items-center gap-2">
              <Lock className="h-4 w-4 text-primary" />
              يعمل في المتصفح بالكامل
            </div>
            <div className="inline-flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              لا رفع للخوادم
            </div>
            <div className="inline-flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              مجاني للأبد
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="container py-16 sm:py-24" aria-labelledby="ar-how-heading">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="ar-how-heading" className="text-3xl font-bold tracking-tight sm:text-4xl">
            ثلاث خطوات. صفر تعقيد.
          </h2>
          <p className="mt-4 text-muted-foreground text-pretty">
            بدون حسابات، بدون تثبيت، بدون إرسال صورك لخادم غريب. فقط متصفح وثوانٍ معدودة.
          </p>
        </div>
        <ol className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
          {HOW_IT_WORKS_AR.map((step, i) => {
            const Icon = STEP_ICONS[i];
            return (
              <li
                key={step.title}
                className="relative rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/40 hover:shadow-md"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <p className="font-mono text-xs uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
                  الخطوة {i + 1}
                </p>
                <h3 className="mt-1 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
              </li>
            );
          })}
        </ol>
      </section>

      {/* USE CASES */}
      <section className="container py-16 sm:py-20" aria-labelledby="ar-uses-heading">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="ar-uses-heading" className="text-3xl font-bold tracking-tight sm:text-4xl">
            مصممة لكل من يعمل مع الصور
          </h2>
          <p className="mt-4 text-muted-foreground text-pretty">
            سواء كنت مصمماً، مسوقاً، بائعاً، أو فقط تحدّث صورتك الشخصية — BgRemove يبتعد عن طريقك.
          </p>
        </div>
        <ul className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {USE_CASES_AR.map(({ title, description, href }) => (
            <li key={title}>
              <Link
                href={href}
                className="group flex h-full items-start gap-3 rounded-xl border border-border bg-card/60 p-4 transition-colors hover:border-primary/40 hover:bg-card"
              >
                <div className="flex-1">
                  <h3 className="flex items-center justify-between gap-2 font-semibold text-foreground">
                    <span>{title}</span>
                    <ArrowRight className="h-4 w-4 shrink-0 translate-x-1 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100 group-hover:text-primary rtl:rotate-180" />
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{description}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* COMPARISON */}
      <section className="container py-16 sm:py-20" aria-labelledby="ar-compare-heading">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="ar-compare-heading" className="text-3xl font-bold tracking-tight sm:text-4xl">
            كيف يقارن BgRemove
          </h2>
          <p className="mt-4 text-muted-foreground text-pretty">
            نفس المهمة — لكن مجانية، أسرع، وخاصة.
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="p-4 text-right font-semibold">الميزة</th>
                  <th className="p-4 text-center font-semibold text-emerald-700 dark:text-emerald-400">BgRemove</th>
                  <th className="p-4 text-center font-semibold">Remove.bg</th>
                  <th className="p-4 text-center font-semibold">Photoshop</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map((row, i) => (
                  <tr key={row.feature} className={i % 2 === 1 ? "bg-muted/20 border-b border-border" : "border-b border-border last:border-0"}>
                    <td className="p-4 font-medium text-foreground">{row.feature}</td>
                    <td className="p-4 text-center bg-primary/5"><CompareCell value={row.bg} /></td>
                    <td className="p-4 text-center"><CompareCell value={row.rem} /></td>
                    <td className="p-4 text-center"><CompareCell value={row.ps} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <ArHomeFaq items={FAQ_AR} />

      {/* CTA */}
      <section className="container pb-16">
        <div className="mx-auto max-w-3xl rounded-2xl border border-primary/30 bg-primary/5 p-8 text-center sm:p-12">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">جربها الآن — تأخذ ثانيتين</h2>
          <p className="mt-3 text-muted-foreground">
            اسحب صورة، احصل على نسخة بخلفية شفافة. بدون تسجيل، بدون انتظار، بدون مفاجآت.
          </p>
          <Link
            href="#main"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-sm transition-all hover:bg-brand-dark hover:shadow-md hover:shadow-primary/20"
          >
            ابدأ الآن
            <ArrowRight className="h-4 w-4 rtl:rotate-180" />
          </Link>
        </div>
      </section>
    </>
  );
}
