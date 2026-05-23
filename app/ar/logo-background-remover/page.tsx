import type { Metadata } from "next";
import Link from "next/link";
import { ArLandingPageLayout } from "@/components/ar/ar-landing-page-layout";
import { JsonLd } from "@/components/json-ld";
import { softwareAppSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";

const TITLE = "إزالة خلفية الشعارات مجاناً — اجعل أي شعار شفافاً";
const DESCRIPTION =
  "أزِل الخلفية البيضاء أو الملونة من أي شعار في ثوانٍ. PNG شفاف عالي الجودة، يعمل على أي خلفية. مجاني، بدون تسجيل، يعمل في متصفحك.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: `${SITE.url}/ar/logo-background-remover/`,
    languages: {
      "en-US": `${SITE.url}/logo-background-remover/`,
      "ar": `${SITE.url}/ar/logo-background-remover/`,
    },
  },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={softwareAppSchema({
          name: "BgRemove — إزالة خلفية الشعارات",
          url: `${SITE.url}/ar/logo-background-remover/`,
          description: "اجعل أي شعار شفافاً في ثوانٍ — مجاناً وفي متصفحك.",
        })}
      />
      <ArLandingPageLayout
        eyebrow="أداة الشعارات والعلامات التجارية"
        title="اجعل أي شعار شفافاً"
        description="مثالي للشعارات الممسوحة ضوئياً أو المحفوظة بـ JPG، أو الشعارات بخلفية بيضاء. احصل على PNG شفاف يعمل فوق أي خلفية موقع أو ملف."
        related={[
          { href: "/ar/transparent-png-maker", label: "صانع PNG شفاف" },
          { href: "/ar", label: "أداة إزالة الخلفية" },
          { href: "/ar/product-photo-background-remover", label: "صور المنتجات" },
        ]}
      >
        <h2>لماذا تحتاج شعار بخلفية شفافة؟</h2>
        <p>
          الشعار بخلفية بيضاء يبدو غريباً على المواقع الداكنة، الفواتير، العروض
          التقديمية، أو أي خلفية ملونة. الشعار الشفاف يندمج طبيعياً مع أي تصميم،
          ويعطي انطباعاً احترافياً.
        </p>

        <h2>متى تستخدم هذه الأداة؟</h2>
        <ul>
          <li>
            <strong>شعار من ملف JPG.</strong> استلمت الشعار من المصمم بصيغة JPG
            بخلفية بيضاء؟ حوّله لـ PNG شفاف بنقرة.
          </li>
          <li>
            <strong>شعار ممسوح ضوئياً.</strong> شعار من ورق أو من قميص — استخرجه
            ونظّفه.
          </li>
          <li>
            <strong>شعار من لقطة شاشة.</strong> أحياناً المصدر الوحيد المتاح
            للشعار هو لقطة شاشة. احصل على نسخة قابلة للاستخدام.
          </li>
          <li>
            <strong>شعار قديم بدون ملف مصدر.</strong> الشركات القديمة كثيراً ما
            تفقد ملف الـ Vector — هذه الأداة تنقذك مؤقتاً.
          </li>
          <li>
            <strong>شعارات منافسين.</strong> للعروض التقديمية والتحليلات، احتج
            شعار شركة أخرى بخلفية شفافة.
          </li>
        </ul>

        <h2>نصائح لأفضل نتيجة</h2>
        <ol>
          <li>
            <strong>ابدأ بأعلى دقة ممكنة.</strong> كلما كانت الصورة الأصلية أوضح،
            كانت الحواف أنظف بعد الإزالة.
          </li>
          <li>
            <strong>تجنب الشعارات المضغوطة بشدة.</strong> ضغط JPG العالي يترك
            هالات حول الحروف — استخدم نسخة PNG إن وجدت.
          </li>
          <li>
            <strong>الشعارات النصية بسيطة.</strong> النص الأسود على أبيض يعمل
            بشكل ممتاز عادة.
          </li>
          <li>
            <strong>الشعارات الملونة المعقدة.</strong> قد تحتاج تنظيف يدوي في
            Figma بعد الإزالة الأولية.
          </li>
        </ol>

        <h2>بدائل أفضل (إذا توفرت)</h2>
        <p>
          إذا كان لديك ملف الشعار الأصلي بصيغة SVG أو AI أو EPS، استخدمه
          مباشرة — الـ Vector دائماً أفضل من الـ Raster لأنه يكبّر بدون فقدان
          جودة. هذه الأداة الحل البديل عندما لا تتوفر النسخة الأصلية.
        </p>

        <h2>الخصوصية والسرية</h2>
        <p>
          شعارات الشركات قبل الإطلاق سرية. BgRemove يعالج الصورة بالكامل داخل
          متصفحك — لا ترفع شعار شركتك الجديد لأي خادم. صورة الشعار لا تغادر
          جهازك أبداً.
        </p>
        <p>
          تحتاج معالجة عدة شعارات؟ استخدم{" "}
          <Link href="/ar/bulk">أداة الدفعات</Link>.
        </p>
      </ArLandingPageLayout>
    </>
  );
}
