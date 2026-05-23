import type { Metadata } from "next";
import Link from "next/link";
import { Lock, Sparkles, Zap, Code2 } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "عن BgRemove — أداة إزالة خلفية تعمل في المتصفح",
  description:
    "BgRemove أداة مجانية لإزالة الخلفية تعمل في متصفحك بالكامل. لا حسابات، لا رفع، لا مراقبة. صورك تبقى على جهازك.",
  alternates: {
    canonical: `${SITE.url}/ar/about/`,
    languages: {
      "en-US": `${SITE.url}/about/`,
      "ar": `${SITE.url}/ar/about/`,
    },
  },
};

const PRINCIPLES = [
  {
    Icon: Lock,
    title: "الخصوصية بالتصميم",
    body: "لا نستطيع رؤية صورك لأنها لا تصل إلينا أصلاً. نموذج الذكاء الاصطناعي يعمل داخل متصفحك.",
  },
  {
    Icon: Zap,
    title: "السرعة أولاً",
    body: "لا طوابير رفع، ولا حدود استخدام. القيد الوحيد هو جهازك — عادة 2-3 ثوانٍ للصورة.",
  },
  {
    Icon: Sparkles,
    title: "مجاني للأبد",
    body: "لا علامة مائية، لا كريديت، لا جدار تسجيل. الإعلانات تدفع الفواتير، لكن الأداة نفسها تبقى مجانية.",
  },
  {
    Icon: Code2,
    title: "معايير مفتوحة",
    body: "مبنية على MediaPipe و Canvas و WebAssembly — تقنيات ويب مفتوحة تعمل في كل مكان.",
  },
];

export default function ArAboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="عن الموقع"
        title="أداة إزالة خلفية تحترم صورك"
        description="معظم الأدوات الأونلاين ترفع صورك لخوادمها. نحن لا. BgRemove يشغّل نموذج الذكاء الاصطناعي بالكامل داخل متصفحك، لذا صورك لا تغادر جهازك — انتهى الموضوع."
      />
      <section className="container py-12">
        <div className="prose prose-slate max-w-none text-right dark:prose-invert">
          <p className="text-lg text-pretty text-muted-foreground">
            BgRemove بدأ من إحباط بسيط: كل أداة إزالة خلفية &laquo;مجانية&raquo; إما تضع علامة
            مائية على النتيجة، أو تحدّك بثلاث صور يومياً، أو تطلب رفع صورك لخوادم شخص آخر.
            فكّرنا: نموذج الذكاء الاصطناعي صغير بما يكفي ليعمل في تبويب متصفح. لماذا لا نفعل
            ذلك مباشرة؟
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {PRINCIPLES.map(({ Icon, title, body }) => (
            <div
              key={title}
              className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/40"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <h2 className="mt-3 text-lg font-semibold">{title}</h2>
              <p className="mt-1.5 text-sm text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-primary/30 bg-primary/5 p-6 sm:p-8">
          <h2 className="text-xl font-semibold">جرّبها الآن</h2>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            ضع صورة وشاهد بنفسك — بدون تسجيل، بدون رفع، بدون انتظار.
          </p>
          <Button asChild size="lg" className="mt-4">
            <Link href="/ar">افتح الأداة ←</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
