import type { Metadata } from "next";
import Link from "next/link";
import { ArLandingPageLayout } from "@/components/ar/ar-landing-page-layout";
import { JsonLd } from "@/components/json-ld";
import { softwareAppSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";

const TITLE = "صانع PNG شفاف مجاناً — حوّل أي صورة لـ PNG شفاف";
const DESCRIPTION =
  "حوّل أي JPG أو PNG أو WebP إلى PNG بخلفية شفافة بنقرة واحدة. مجاني، بلا حدود، يعمل في متصفحك — صورك لا تُرفع لأي خادم.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: `${SITE.url}/ar/transparent-png-maker/`,
    languages: {
      "en-US": `${SITE.url}/transparent-png-maker/`,
      "ar": `${SITE.url}/ar/transparent-png-maker/`,
    },
  },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={softwareAppSchema({
          name: "BgRemove — صانع PNG شفاف",
          url: `${SITE.url}/ar/transparent-png-maker/`,
          description: "حوّل أي صورة إلى PNG شفاف في متصفحك مجاناً.",
        })}
      />
      <ArLandingPageLayout
        eyebrow="صانع PNG شفاف"
        title="PNG شفاف بنقرة واحدة"
        description="ارفع أي JPG أو PNG أو WebP — احصل على PNG بخلفية شفافة جاهز للاستخدام في أدوات التصميم والشرائح والويب. مجاني وفوري."
        related={[
          { href: "/ar", label: "إزالة خلفية عامة" },
          { href: "/ar/logo-background-remover", label: "خلفية شفافة للشعارات" },
          { href: "/ar/bulk", label: "معالجة دفعات" },
        ]}
      >
        <h2>ما هو PNG الشفاف؟</h2>
        <p>
          صيغة PNG تدعم قناة الشفافية (alpha channel)، بمعنى أن البكسلات يمكن أن
          تكون شفافة كلياً أو جزئياً. هذا يختلف عن JPG الذي يستبدل الشفافية
          بخلفية بيضاء أو سوداء. الـ PNG الشفاف يسمح لك بدمج الصورة فوق أي خلفية
          دون حواف بيضاء.
        </p>

        <h2>متى تحتاج PNG شفاف؟</h2>
        <ul>
          <li>
            <strong>الشعارات.</strong> شعار شركتك يجب أن يكون شفافاً ليناسب أي
            خلفية موقع أو ملف PDF.
          </li>
          <li>
            <strong>صور المنتجات.</strong> منتج معزول بدون خلفية يبدو أنظف في
            صفحات المتجر والإعلانات.
          </li>
          <li>
            <strong>الـ Stickers والـ Overlays.</strong> ملصقات Telegram، صور
            WhatsApp، رموز السنابات — كلها تحتاج خلفية شفافة.
          </li>
          <li>
            <strong>عروض PowerPoint و Keynote.</strong> صور بخلفية شفافة تبدو
            أكثر احترافية فوق قوالب الشرائح.
          </li>
          <li>
            <strong>تصاميم Canva و Figma.</strong> ادمج صورك مع تصاميم أخرى بدون
            مربعات بيضاء قبيحة.
          </li>
        </ul>

        <h2>كيف يعمل في BgRemove</h2>
        <ol>
          <li>اسحب أي JPG أو PNG أو WebP (حتى 30 ميجا).</li>
          <li>
            الذكاء الاصطناعي يحدد الموضوع الرئيسي ويزيل كل ما حوله — في 2-3
            ثوانٍ.
          </li>
          <li>
            النتيجة دائماً PNG شفاف بحجم الصورة الأصلية، جاهز للتحميل والاستخدام.
          </li>
        </ol>

        <h2>PNG مقابل WebP مقابل JPG</h2>
        <p>
          <strong>JPG:</strong> أصغر حجماً، لكن لا يدعم الشفافية. مناسب لصور
          الكاميرا.
        </p>
        <p>
          <strong>PNG:</strong> يدعم الشفافية، جودة عالية، حجم أكبر. الخيار
          المعياري للشعارات والـ Overlays.
        </p>
        <p>
          <strong>WebP:</strong> يدعم الشفافية أيضاً، حجم أصغر بكثير من PNG.
          يعمل في كل المتصفحات الحديثة. إذا أردت توفير حجم، حوّل الـ PNG الشفاف
          الناتج لـ WebP في{" "}
          <Link href="/tools/image-compressor">أداة الضغط</Link>.
        </p>

        <h2>الخصوصية والسرعة</h2>
        <p>
          كل التحويل يحدث في متصفحك بالكامل. لا يوجد رفع، لا انتظار في طابور، لا
          حدود استخدام. نموذج الذكاء الاصطناعي يُحمَّل مرة واحدة (~4 ميجا)
          ويُحفَظ محلياً، فالاستخدامات اللاحقة تكون فورية تقريباً.
        </p>
      </ArLandingPageLayout>
    </>
  );
}
