import type { Metadata } from "next";
import Link from "next/link";
import { ArLandingPageLayout } from "@/components/ar/ar-landing-page-layout";
import { JsonLd } from "@/components/json-ld";
import { softwareAppSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";

const TITLE = "إزالة خلفية لقطات الشاشة مجاناً — اقتطع موضوعاً من أي Screenshot";
const DESCRIPTION =
  "أزِل خلفية أي لقطة شاشة لتعزل النوافذ، الأشخاص، أو الأشياء. مثالي للدروس، العروض التقديمية، والمقالات. مجاني وفي متصفحك.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: `${SITE.url}/ar/screenshot-background-remover/`,
    languages: {
      "en-US": `${SITE.url}/screenshot-background-remover/`,
      "ar": `${SITE.url}/ar/screenshot-background-remover/`,
    },
  },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={softwareAppSchema({
          name: "BgRemove — إزالة خلفية لقطات الشاشة",
          url: `${SITE.url}/ar/screenshot-background-remover/`,
          description: "اقتطع موضوعات من لقطات الشاشة للدروس والعروض.",
        })}
      />
      <ArLandingPageLayout
        eyebrow="أداة للقطات الشاشة"
        title="اقتطع أي شيء من لقطة شاشة"
        description="نافذة تطبيق، شخص في مكالمة فيديو، شيء على شاشة — اعزله بنقرة واحدة. مثالي للمدونين والمدربين ومنشئي المحتوى."
        related={[
          { href: "/ar", label: "أداة إزالة الخلفية" },
          { href: "/ar/transparent-png-maker", label: "صانع PNG شفاف" },
          { href: "/ar/portrait-background-remover", label: "صور شخصية" },
        ]}
      >
        <h2>أمثلة على الاستخدام</h2>
        <ul>
          <li>
            <strong>دروس البرامج.</strong> اعزل نافذة تطبيق وضعها على خلفية
            ملونة في شرائح الشرح.
          </li>
          <li>
            <strong>مقالات تقنية.</strong> صور جزئية من واجهة المستخدم بخلفية
            شفافة تبدو احترافية في المدونات.
          </li>
          <li>
            <strong>لقطات Zoom و Teams.</strong> اقتطع نفسك من لقطة شاشة لمكالمة
            فيديو دون ظهور المتحدثين الآخرين.
          </li>
          <li>
            <strong>عروض تقديمية.</strong> أضِف لقطات منتجك أو أداتك فوق قوالب
            PowerPoint بدون مربع أبيض.
          </li>
          <li>
            <strong>صور Twitter / X.</strong> اقتطع تغريدة، صورة، أو واجهة وضعها
            في تصميم خاص بك.
          </li>
        </ul>

        <h2>كيف تستفيد منها</h2>
        <ol>
          <li>التقط لقطة شاشة (Win+Shift+S في ويندوز، Cmd+Shift+4 في ماك).</li>
          <li>اسحبها مباشرة من الحافظة إلى BgRemove (يدعم اللصق).</li>
          <li>احصل على PNG شفاف لاستخدامه في أي مكان.</li>
        </ol>

        <h2>نصائح لنتائج أفضل</h2>
        <ol>
          <li>
            <strong>لقطة عالية الدقة.</strong> الشاشات Retina تعطي صوراً أوضح
            للاقتطاع.
          </li>
          <li>
            <strong>اعزل بقدر الإمكان قبل الإزالة.</strong> اقطع اللقطة لتقتصر
            على الموضوع المراد قبل المعالجة.
          </li>
          <li>
            <strong>الموضوعات الواضحة تعمل أفضل.</strong> النوافذ المستطيلة قد
            تحتاج تنظيف حواف في Figma. الأشخاص يعملون بشكل ممتاز.
          </li>
        </ol>

        <h2>حالات لن تعمل بشكل مثالي</h2>
        <p>
          النموذج محسَّن للأشخاص بشكل أساسي. لقطات شاشة لواجهات تطبيقات
          (مستطيلات نظيفة) أحياناً تُقتطع جزئياً. للنتائج المثالية على الواجهات،
          استخدم أدوات اقتطاع متخصصة بعد إزالة الخلفية الأولية.
        </p>

        <h2>الخصوصية مهمة للقطات الشاشة</h2>
        <p>
          لقطات الشاشة كثيراً ما تحتوي بيانات حساسة — عناوين بريد، رسائل، أسماء
          ملفات داخلية. BgRemove يعالج كل شيء داخل متصفحك، فلا داعي للقلق من
          تسريب لقطات شاشتك.
        </p>
        <p>
          عشرات اللقطات؟ استخدم{" "}
          <Link href="/ar/bulk">معالجة الدفعات</Link>.
        </p>
      </ArLandingPageLayout>
    </>
  );
}
