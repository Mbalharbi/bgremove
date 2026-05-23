// Arabic strings for /ar/ routes. Pairs with lib/site.ts (English).
// Goal: real Arabic marketing copy, not a literal translation — preserves
// the privacy-first / browser-only positioning that makes BgRemove distinct.

import { SITE } from "@/lib/site";

export const SITE_AR = {
  name: SITE.name, // brand kept as "BgRemove"
  domain: SITE.domain,
  url: `${SITE.url}/ar`,
  title: "أداة إزالة خلفية الصور مجاناً — تعمل داخل المتصفح، بدون تحميل | BgRemove",
  description:
    "أزِل خلفية أي صورة في ثوانٍ باستخدام الذكاء الاصطناعي. تعمل بالكامل داخل متصفحك — صورك لا تغادر جهازك أبداً. مجاناً، بلا حدود، بلا تسجيل.",
  tagline: "أزِل الخلفيات في ثوانٍ. خصوصية 100%. مجاناً 100%.",
  ogImage: SITE.ogImage,
} as const;

export const NAV_LINKS_AR = [
  { href: "/ar", label: "إزالة الخلفية" },
  { href: "/ar/bulk", label: "دفعات" },
  { href: "/ar/transparent-png-maker", label: "PNG شفاف" },
  { href: "/ar/portrait-background-remover", label: "صور شخصية" },
  { href: "/ar/about", label: "عن الموقع" },
] as const;

export const FOOTER_LINKS_AR = {
  "الأدوات": [
    { href: "/ar", label: "أداة إزالة الخلفية" },
    { href: "/ar/bulk", label: "إزالة بالدفعات" },
    { href: "/ar/transparent-png-maker", label: "صانع PNG شفاف" },
  ],
  "الاستخدامات": [
    { href: "/ar/portrait-background-remover", label: "الصور الشخصية" },
    { href: "/ar/product-photo-background-remover", label: "صور المنتجات" },
  ],
  "الموقع": [
    { href: "/ar/about", label: "عن الموقع" },
    { href: "/ar/privacy", label: "الخصوصية" },
  ],
} as const;

// FAQ — 8 questions/answers in Modern Standard Arabic.
export const FAQ_AR = [
  {
    q: "هل BgRemove مجاني فعلاً؟",
    a: "نعم — مجاني بالكامل، بدون حدود استخدام. لا تسجيل، لا علامة مائية، ولا اشتراك. الأداة تعمل داخل متصفحك فقط، لذلك لا توجد تكاليف خوادم على كل صورة.",
  },
  {
    q: "هل صوري تُرفع إلى الخادم؟",
    a: "لا. كل صورة تُعالَج على جهازك مباشرة باستخدام نموذج ذكاء اصطناعي محلي. صورك لا تغادر متصفحك إطلاقاً — حتى نحن لا نستطيع رؤيتها.",
  },
  {
    q: "ما الصيغ المدعومة؟",
    a: "BgRemove يقبل JPG و PNG و WebP حتى 30 ميجابايت. النتيجة دائماً PNG بخلفية شفافة، يمكنك تحويلها لصيغ أخرى بأداة الضغط في /ar/tools/image-compressor.",
  },
  {
    q: "لماذا الإزالة الأولى أبطأ من اللاحقات؟",
    a: "في أول استخدام، يحمّل متصفحك نموذج الذكاء الاصطناعي (~4 ميجا). بعد ذلك يُحفَظ محلياً ويعالج الصور التالية في أقل من 3 ثوان.",
  },
  {
    q: "هل تعمل على الجوال؟",
    a: "نعم. تعمل على كل المتصفحات الحديثة — Chrome و Safari و Firefox و Edge — على الهاتف والتابلت والكمبيوتر. الصور الكبيرة قد تأخذ ثوانٍ إضافية على الأجهزة الضعيفة.",
  },
  {
    q: "ما الحجم الأقصى للصورة؟",
    a: "حتى 4096×4096 بكسل و 30 ميجابايت. الصور الأكبر تُصغَّر تلقائياً مع الحفاظ على نسبة الأبعاد.",
  },
  {
    q: "كيف يقارن مع Remove.bg أو Photoshop؟",
    a: "بعكس Remove.bg، لا تحتاج حساباً، ولا توجد كريديت، وصورك تبقى خاصة. وبعكس Photoshop، لا يوجد شيء للتثبيت — يعمل فوراً في أي متصفح.",
  },
  {
    q: "هل يعمل على غير الأشخاص؟",
    a: "BgRemove محسَّن للأشخاص والصور الشخصية والسيلفي. المنتجات والحيوانات تعمل أيضاً لكن النتائج تختلف. للحصول على أفضل نتيجة، تأكد أن الموضوع مضاء جيداً ومنفصل عن الخلفية.",
  },
] as const;

export const HOW_IT_WORKS_AR = [
  {
    title: "ارفع صورتك",
    description: "اسحب وأفلت، الصق، أو اضغط لاختيار. JPG أو PNG أو WebP حتى 30 ميجا.",
  },
  {
    title: "الذكاء الاصطناعي يُزيل الخلفية",
    description: "نموذج محلي يعالج صورتك في 2-3 ثوان. لا خادم، ولا انتظار في طابور.",
  },
  {
    title: "نزّل كـ PNG",
    description: "احصل على PNG شفاف جاهز للاستخدام في أي أداة تصميم أو مستند أو منشور.",
  },
] as const;

export const USE_CASES_AR = [
  {
    title: "صور الملف الشخصي",
    description: "صور رأس نظيفة وشفافة لـ LinkedIn و Slack و Notion.",
    href: "/ar/portrait-background-remover",
  },
  {
    title: "صور المنتجات",
    description: "ضع صور منتجك على خلفية بيضاء جاهزة للقوائم الإلكترونية فوراً.",
    href: "/ar/product-photo-background-remover",
  },
  {
    title: "شعارات وعلامات تجارية",
    description: "اجعل أي شعار شفافاً ليناسب أي خلفية.",
    href: "/ar/logo-background-remover",
  },
  {
    title: "PNG شفافة",
    description: "PNG شفاف بنقرة واحدة — لأدوات التصميم والشرائح والويب.",
    href: "/ar/transparent-png-maker",
  },
  {
    title: "لقطات الشاشة",
    description: "اقتطع موضوعات من لقطات الشاشة للدروس والعروض التقديمية.",
    href: "/ar/screenshot-background-remover",
  },
  {
    title: "معالجة دفعات",
    description: "عالج حتى 20 صورة دفعة واحدة وحمّلها كملف ZIP.",
    href: "/ar/bulk",
  },
] as const;
