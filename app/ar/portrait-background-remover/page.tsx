import type { Metadata } from "next";
import Link from "next/link";
import { ArLandingPageLayout } from "@/components/ar/ar-landing-page-layout";
import { JsonLd } from "@/components/json-ld";
import { softwareAppSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";

const TITLE = "إزالة خلفية الصور الشخصية مجاناً — صور رأس نظيفة في ثوانٍ";
const DESCRIPTION =
  "أزِل الخلفية من أي صورة شخصية أو سيلفي في متصفحك. مجاني، بلا حدود، بدون تسجيل، بدون رفع — مثالي لـ LinkedIn وصور الملف الشخصي والصور الرسمية.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: `${SITE.url}/ar/portrait-background-remover/`,
    languages: {
      "en-US": `${SITE.url}/portrait-background-remover/`,
      "ar": `${SITE.url}/ar/portrait-background-remover/`,
    },
  },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={softwareAppSchema({
          name: "BgRemove — إزالة خلفية الصور الشخصية",
          url: `${SITE.url}/ar/portrait-background-remover/`,
          description: "أزِل الخلفية من أي صورة شخصية أو سيلفي في متصفحك مجاناً.",
        })}
      />
      <ArLandingPageLayout
        eyebrow="أداة للصور الشخصية والـ Headshots"
        title="أزِل الخلفية من أي صورة شخصية"
        description="مصممة للصور الرسمية والسيلفي وصور الملف الشخصي. النموذج مدرَّب على الأشخاص، لذا تحصل على أنظف اقتطاع للصور الشخصية — وصورتك لا تغادر جهازك."
        related={[
          { href: "/ar", label: "أداة إزالة الخلفية العامة" },
          { href: "/ar/transparent-png-maker", label: "صانع PNG شفاف" },
          { href: "/ar/bulk", label: "إزالة بالدفعات" },
        ]}
      >
        <h2>لماذا أداة مخصصة للصور الشخصية؟</h2>
        <p>
          النموذج الذي يعمل خلف BgRemove (MediaPipe Selfie Segmenter) دُرِّب على
          مجموعة ضخمة من صور الأشخاص — سيلفي، صور رسمية، صور جماعية، صور رياضية.
          يقتطع الصور الشخصية بدقة أعلى ملحوظاً من النماذج العامة. تفاصيل الشعر،
          حواف الفك، النظارات، وحتى القصات الجزئية للجسم تبقى نظيفة.
        </p>

        <h2>الاستخدامات الشائعة</h2>
        <ul>
          <li>
            <strong>صور LinkedIn الرسمية.</strong> ضع سيلفي من الجوال على خلفية
            بيضاء نظيفة أو خلفية بلون الشركة.
          </li>
          <li>
            <strong>صور Slack و Discord و Notion.</strong> الصور الدائرية الحادة
            تحتاج اقتطاعاً نظيفاً لتبدو احترافية.
          </li>
          <li>
            <strong>تطبيقات المواعدة.</strong> استبدل خلفية مزدحمة بخلفية محايدة،
            أو ضع اقتطاعك في مشهد منسَّق.
          </li>
          <li>
            <strong>صفحات المتحدثين وفرق العمل.</strong> صور PNG شفافة متسقة تجعل
            صفحة الفريق تبدو مدروسة.
          </li>
          <li>
            <strong>صور الهوية وجواز السفر.</strong> معظم الدول تتطلب لون خلفية
            محدداً — ابدأ بـ PNG شفاف ثم أضِف اللون المطلوب في أداة تصميم.
          </li>
        </ul>

        <h2>نصائح لأنظف اقتطاع</h2>
        <ol>
          <li>
            <strong>إضاءة من الأمام.</strong> الإضاءة الناعمة من الأمام تتجنب
            الظلال الحادة على الوجه والشعر.
          </li>
          <li>
            <strong>اختر خلفية متباينة.</strong> شعر داكن على جدار أبيض، شعر فاتح
            على جدار داكن. النموذج يستخدم التباين اللوني لإيجاد الحافة.
          </li>
          <li>
            <strong>اقطع فوق الكتفين.</strong> قصّة الـ Headshot المعيارية تعطي
            النموذج شكلاً مألوفاً.
          </li>
          <li>
            <strong>تجنب اليدين قرب الوجه.</strong> النموذج أحياناً يخلط بين خد
            مرتاح على يد والخلفية.
          </li>
          <li>
            <strong>النظارات بخير.</strong> النموذج يتعامل مع النظارات جيداً.
            النظارات الشمسية أحياناً تختلط بالاقتطاع — استخدم شريط المقارنة للفحص.
          </li>
        </ol>

        <h2>الخصوصية: لماذا مهمة للصور الشخصية</h2>
        <p>
          الصورة الشخصية بيانات شخصية. أدوات السحاب تحتفظ بصورك لفترة (Remove.bg
          يقول ساعة واحدة؛ غيرهم لا يحدد). لصورة فريق داخلية أو صورة عائلية،
          غالباً لا تريد ذلك — حتى لو كان الخطر منخفضاً.
        </p>
        <p>
          BgRemove يعالج صورتك بالكامل داخل متصفحك. لا توجد خطوة رفع. لا نَعِد
          بحذف صورك لأننا لا نستلمها أصلاً. افتح DevTools وراقب تبويب Network
          عند الرفع — لن ترى أي بيانات صور خارجة.
        </p>

        <h2>بعد الاقتطاع</h2>
        <p>
          للشبكات الاجتماعية، يمكنك استخدام الـ PNG الشفاف مباشرة في أي أداة
          تصميم. لصور الهوية، افتح الـ PNG في أداة تصميم، أضِف لون الخلفية
          المطلوب كطبقة سفلية، ثم صدِّر.
        </p>
        <p>
          هل لديك عشرات الصور؟ جرّب{" "}
          <Link href="/ar/bulk">معالجة الدفعات</Link> وعالج حتى 20 صورة دفعة واحدة.
        </p>
      </ArLandingPageLayout>
    </>
  );
}
