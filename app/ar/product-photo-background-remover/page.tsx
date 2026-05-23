import type { Metadata } from "next";
import Link from "next/link";
import { ArLandingPageLayout } from "@/components/ar/ar-landing-page-layout";
import { JsonLd } from "@/components/json-ld";
import { softwareAppSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";

const TITLE = "إزالة خلفية صور المنتجات مجاناً — جاهزة للمتاجر الإلكترونية";
const DESCRIPTION =
  "أزِل الخلفية من صور منتجاتك في ثوانٍ. خلفية بيضاء أو شفافة جاهزة لـ Salla و Zid و Amazon و Shopify. مجاني، بلا حدود، بدون رفع.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: `${SITE.url}/ar/product-photo-background-remover/`,
    languages: {
      "en-US": `${SITE.url}/product-photo-background-remover/`,
      "ar": `${SITE.url}/ar/product-photo-background-remover/`,
    },
  },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={softwareAppSchema({
          name: "BgRemove — إزالة خلفية صور المنتجات",
          url: `${SITE.url}/ar/product-photo-background-remover/`,
          description: "أزِل خلفية صور المنتجات وجهّزها للمتاجر الإلكترونية.",
        })}
      />
      <ArLandingPageLayout
        eyebrow="أداة لصور المنتجات والمتاجر"
        title="صور منتجات نظيفة. جاهزة للنشر فوراً."
        description="مصممة لأصحاب المتاجر الإلكترونية على سلة وزِد و Shopify و Amazon. خلفية بيضاء قياسية أو PNG شفاف بنقرة واحدة — صورك تبقى عندك."
        related={[
          { href: "/ar/bulk", label: "معالجة كاتالوج كامل بالدفعات" },
          { href: "/ar/transparent-png-maker", label: "صانع PNG شفاف" },
          { href: "/ar", label: "أداة إزالة الخلفية" },
        ]}
      >
        <h2>لماذا أداة لصور المنتجات؟</h2>
        <p>
          المتاجر الإلكترونية الكبرى (Amazon, Salla, Zid, Shopify) تطلب صور
          منتجات بخلفية بيضاء نظيفة. تصوير منتجك في الستوديو مكلف، وأدوات السحاب
          تفرض اشتراكاً أو علامة مائية. BgRemove يحل هذا — مجاناً، فورياً، وفي
          متصفحك.
        </p>

        <h2>مثالي لـ</h2>
        <ul>
          <li>
            <strong>متاجر سلة وزِد.</strong> صور منتجات قياسية بخلفية بيضاء جاهزة
            للرفع المباشر.
          </li>
          <li>
            <strong>بائعو Amazon FBA.</strong> Amazon يطلب خلفية بيضاء صرفة
            (#FFFFFF) — احصل عليها مباشرة من الـ PNG الشفاف.
          </li>
          <li>
            <strong>متاجر Instagram و Snapchat.</strong> منتجات بخلفية شفافة
            تظهر بشكل أنيق في المنشورات والقصص.
          </li>
          <li>
            <strong>كتالوجات PDF.</strong> اقطع المنتج وضعه على أي خلفية تصميمية.
          </li>
          <li>
            <strong>إعلانات Google Shopping.</strong> الخلفية البيضاء النظيفة
            ترفع نسبة النقرات.
          </li>
        </ul>

        <h2>نصائح تصوير منتجات للحصول على أفضل اقتطاع</h2>
        <ol>
          <li>
            <strong>إضاءة موزعة.</strong> ضوء طبيعي من النافذة + شاشة بيضاء عاكسة
            من الجهة الأخرى يلغي الظلال الحادة.
          </li>
          <li>
            <strong>خلفية بسيطة.</strong> جدار أو ورقة كرتون بلون متباين مع المنتج
            تجعل النموذج يميز الحواف بسهولة.
          </li>
          <li>
            <strong>تجنب الأسطح العاكسة.</strong> الزجاج والمعدن اللامع يربكان
            النموذج — استخدم زاوية تصوير تقلل الانعكاس.
          </li>
          <li>
            <strong>صوّر متعدد الزوايا.</strong> استخدم{" "}
            <Link href="/ar/bulk">معالجة الدفعات</Link> لإزالة الخلفية من كل
            الزوايا دفعة واحدة.
          </li>
        </ol>

        <h2>سير عمل سريع لـ 50 منتج</h2>
        <ol>
          <li>افتح <Link href="/ar/bulk">/ar/bulk</Link> واسحب كل صور المنتجات.</li>
          <li>انتظر المعالجة (~3 ثوان لكل صورة).</li>
          <li>حمّل ملف ZIP يحتوي كل الـ PNG الشفافة.</li>
          <li>ارفعها مباشرة لمتجرك — لا حاجة لـ Photoshop.</li>
        </ol>

        <h2>الخصوصية مهمة لأصحاب الأعمال</h2>
        <p>
          منتجاتك قبل الإطلاق سرية تجارية. أدوات السحاب تخزّن صورك على خوادمها،
          مما يعني أن منافسيك قد يصلون لها (إذا تسرّبت). BgRemove يعالج كل شيء
          داخل متصفحك — صور منتجك الجديد لا تغادر جهازك أبداً.
        </p>
      </ArLandingPageLayout>
    </>
  );
}
