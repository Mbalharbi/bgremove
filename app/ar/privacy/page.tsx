import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, EyeOff, ServerOff, Lock } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "سياسة الخصوصية — صورك لا تغادر جهازك",
  description:
    "BgRemove يعالج الصور بالكامل داخل متصفحك. لا نرفع ولا نخزّن ولا نحلّل صورك. اقرأ سياسة خصوصيتنا الصريحة.",
  alternates: {
    canonical: `${SITE.url}/ar/privacy/`,
    languages: {
      "en-US": `${SITE.url}/privacy/`,
      "ar": `${SITE.url}/ar/privacy/`,
    },
  },
};

const PROMISES = [
  { Icon: ServerOff, title: "صورك لا تصل خوادمنا أبداً", body: "كل معالجة الذكاء الاصطناعي تحدث في متصفحك باستخدام الذاكرة المحلية ومعالج/كرت جهازك. لا توجد خطوة رفع." },
  { Icon: EyeOff, title: "نحن لا نرى صورك", body: "فيزيائياً لا نستطيع — التصميم التقني يجعل ذلك مستحيلاً. لم نضِف وضع خصوصية؛ الوضع الوحيد هو الخصوصي." },
  { Icon: Lock, title: "لا تخزين للصور", body: "ولا حتى مؤقتاً. نموذج الذكاء الاصطناعي يُحمَّل من CDN مرة واحدة ثم يعمل محلياً بعد ذلك." },
  { Icon: ShieldCheck, title: "لا حساب مطلوب", body: "لأنه لا حاجة لواحد. لا شيء لتسجل الدخول إليه، لا شيء للمزامنة، لا شيء لتنسى حذفه." },
];

export default function ArPrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="الخصوصية"
        title="صورك تبقى على جهازك. انتهى."
        description="معظم الأدوات &laquo;الصديقة للخصوصية&raquo; تقول إنها تحذف صورك بعد المعالجة. BgRemove لا يستلمها أصلاً."
      />
      <section className="container py-10">
        <div className="grid gap-4 sm:grid-cols-2">
          {PROMISES.map(({ Icon, title, body }) => (
            <div key={title} className="rounded-xl border border-primary/30 bg-card p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <h2 className="mt-3 text-lg font-semibold">{title}</h2>
              <p className="mt-1.5 text-sm text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container py-10">
        <div className="prose prose-slate max-w-none text-right dark:prose-invert">
          <h2>النسخة التقنية</h2>
          <p>
            عندما تزور {SITE.domain}، يحمّل متصفحك تطبيق BgRemove (HTML, CSS, JavaScript) إلى
            جانب نموذج ذكاء اصطناعي صغير (~4 ميجا) من CDN عام. النموذج يُحفَظ محلياً بعد أول
            زيارة. عندما تختار صورة:
          </p>
          <ol>
            <li>الصورة تُقرأ في ذاكرة متصفحك كـ binary blob.</li>
            <li>تُفكَّك إلى بكسلات داخل عنصر <code>&lt;canvas&gt;</code>.</li>
            <li>نموذج الذكاء الاصطناعي المحلي يعمل على البكسلات باستخدام WebAssembly + تسريع GPU.</li>
            <li>الناتج PNG يُولَّد من نفس الـ canvas ويُقدَّم للتحميل.</li>
            <li>عند إغلاق التبويب، الصورة والنتيجة تُحرَّر من الذاكرة. لا شيء يبقى.</li>
          </ol>
          <p>
            <strong>لا يوجد طلب شبكي يحمل بيانات صورتك.</strong> يمكنك التحقق بنفسك: افتح
            DevTools ← تبويب Network، ضع صورة في BgRemove، وراقب — لا رفع يحدث.
          </p>

          <h2>ما الذي نجمعه</h2>
          <ul>
            <li>
              <strong>تحليلات مجهولة الهوية</strong> (مشاهدات الصفحات، نوع المتصفح، البلد) عبر
              Google Analytics 4. لا نجمع عناوين IP بشكل قابل للتعريف.
            </li>
            <li>
              <strong>سجلات خادم قياسية</strong> من مزوّد الاستضافة (Cloudflare) للملفات التي
              تُحمّلها. تحتوي IP و User-Agent، تُحفظ حسب إعدادات Cloudflare الافتراضية.
            </li>
            <li>
              <strong>لا كوكيز نضعها نحن</strong> عدا تفضيل الثيم (فاتح/داكن) المحفوظ في
              localStorage على جهازك.
            </li>
          </ul>

          <h2>خدمات الطرف الثالث</h2>
          <ul>
            <li>
              <strong>نموذج Google MediaPipe + WASM runtime</strong> — يُجلَب من{" "}
              <code>storage.googleapis.com</code> و <code>cdn.jsdelivr.net</code> في الزيارة
              الأولى. يطبَّق تسجيل CDN القياسي.
            </li>
            <li>
              <strong>Google Analytics 4</strong> — عند تفعيله، يضع كوكي <code>_ga</code>
              لقياس الزيارات بشكل مجهول.
            </li>
            <li>
              <strong>Google AdSense</strong> — إن ظهر، قد يضع كوكيز إعلانية. يخضع لإشعار قبول
              الكوكيز لزوار الاتحاد الأوروبي والمملكة المتحدة.
            </li>
          </ul>

          <h2>حقوقك</h2>
          <p>
            بما أننا لا نجمع معلومات تعريف شخصية عن محتوى صورك، لا شيء لدينا منك لنحذفه.
            للتحليلات، يمكنك تعطيلها بأي مانع تتبع متصفح، أو تفعيل &laquo;Do Not Track&raquo;.
          </p>

          <h2>التواصل</h2>
          <p>
            استفسارات؟ راسلنا على{" "}
            <Link href={`mailto:${SITE.email}`}>{SITE.email}</Link>.
          </p>

          <p className="text-xs text-muted-foreground">
            آخر تحديث: {new Date().toISOString().split("T")[0]}
          </p>
        </div>
      </section>
    </>
  );
}
