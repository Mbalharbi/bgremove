"use client";

/**
 * Feedback popup — asks visitors what they used BgRemove for and what would
 * make them use it more.
 *
 * When it opens:
 *   • automatically, ~2s after the visitor's first successful download
 *     (the moment they've actually experienced the tool);
 *   • manually, from the footer "Suggest a feature" link (OPEN_FEEDBACK_EVENT).
 *
 * Frequency: auto-open never repeats after a submit, and waits SNOOZE_DAYS
 * after a dismiss. State lives in localStorage (wrapped — private windows
 * just behave as first-time visitors).
 *
 * Language: the page's own language when the visitor is on a translated
 * page (/zh/, /ar/…); otherwise the browser's language; otherwise the
 * visitor's country (/api/geo); otherwise English. The visitor can switch
 * language inside the popup.
 *
 * Privacy: answers go to POST /api/feedback (worker/index.ts). No image, no
 * IP, no cookies — only the answers, popup language, path and country.
 */

import * as React from "react";
import { usePathname } from "next/navigation";
import { Check, Loader2, MessageSquareHeart } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { detectLocale, LOCALES, type LocaleCode } from "@/lib/locales";
import { cn, DOWNLOAD_EVENT, OPEN_FEEDBACK_EVENT } from "@/lib/utils";

const STORAGE_KEY = "bgremove:feedback";
const SNOOZE_DAYS = 14;
const AUTO_OPEN_DELAY_MS = 2000;
const MAX_MESSAGE = 500;

// Option ids are stable (they're what we store); labels are per-locale.
const USE_CASES = ["product", "portrait", "logo", "document", "social", "other"] as const;
const NEEDS = [
  "change-bg",
  "touch-up",
  "better-edges",
  "faster",
  "hd",
  "resize",
  "passport",
  "mobile-app",
] as const;

type UseCase = (typeof USE_CASES)[number];
type Need = (typeof NEEDS)[number];

interface Strings {
  title: string;
  description: string;
  useCaseQ: string;
  useCases: Record<UseCase, string>;
  needsQ: string;
  needsHint: string;
  needs: Record<Need, string>;
  ratingQ: string;
  ratings: [string, string, string, string, string];
  messageQ: string;
  messagePlaceholder: string;
  privacy: string;
  send: string;
  notNow: string;
  thanksTitle: string;
  thanksBody: string;
  close: string;
  error: string;
  empty: string;
  footerLink: string;
}

export const FEEDBACK_STRINGS: Record<LocaleCode, Strings> = {
  en: {
    title: "Help us shape BgRemove",
    description: "30 seconds, 3 quick taps. We build what you ask for.",
    useCaseQ: "What did you use it for?",
    useCases: { product: "Product photos", portrait: "Portrait / profile", logo: "Logo", document: "Document / signature", social: "Social media", other: "Other" },
    needsQ: "What would make you use it more?",
    needsHint: "Pick any",
    needs: {
      "change-bg": "Replace background (color / image)",
      "touch-up": "Manual erase / restore brush",
      "better-edges": "Cleaner edges (hair, fur)",
      faster: "Faster processing",
      hd: "Full-resolution HD download",
      resize: "Crop & resize for platforms",
      passport: "Passport / ID photo maker",
      "mobile-app": "Mobile app",
    },
    ratingQ: "How was your result?",
    ratings: ["Bad", "Poor", "OK", "Good", "Great"],
    messageQ: "Anything missing or annoying?",
    messagePlaceholder: "Tell us in your own words (optional)",
    privacy: "Anonymous. No images, no email, no tracking.",
    send: "Send feedback",
    notNow: "Not now",
    thanksTitle: "Thank you!",
    thanksBody: "We read every answer — the most requested features ship first.",
    close: "Close",
    error: "Couldn't send right now. Please try again.",
    empty: "Pick at least one answer first.",
    footerLink: "Suggest a feature",
  },
  ar: {
    title: "ساعدنا نطوّر BgRemove",
    description: "30 ثانية و3 نقرات سريعة. نبني ما تطلبه أنت.",
    useCaseQ: "لأي غرض استخدمت الأداة؟",
    useCases: { product: "صور منتجات", portrait: "صورة شخصية / بروفايل", logo: "شعار", document: "مستند / توقيع", social: "سوشيال ميديا", other: "أخرى" },
    needsQ: "ما الذي يجعلك تستخدمها أكثر؟",
    needsHint: "اختر ما يناسبك",
    needs: {
      "change-bg": "تبديل الخلفية (لون / صورة)",
      "touch-up": "فرشاة مسح / استرجاع يدوية",
      "better-edges": "حواف أدق (شعر، فرو)",
      faster: "معالجة أسرع",
      hd: "تنزيل بالدقة الأصلية HD",
      resize: "قص وتغيير المقاس للمنصات",
      passport: "صانع صور الجواز / الهوية",
      "mobile-app": "تطبيق جوال",
    },
    ratingQ: "كيف كانت النتيجة؟",
    ratings: ["سيئة", "ضعيفة", "مقبولة", "جيدة", "ممتازة"],
    messageQ: "هل ينقصك شيء أو يزعجك شيء؟",
    messagePlaceholder: "اكتب بأسلوبك (اختياري)",
    privacy: "مجهول الهوية. لا صور ولا بريد ولا تتبّع.",
    send: "إرسال الرأي",
    notNow: "ليس الآن",
    thanksTitle: "شكرًا لك!",
    thanksBody: "نقرأ كل إجابة — والميزات الأكثر طلبًا تُنفَّذ أولًا.",
    close: "إغلاق",
    error: "تعذّر الإرسال الآن. حاول مرة أخرى.",
    empty: "اختر إجابة واحدة على الأقل.",
    footerLink: "اقترح ميزة",
  },
  zh: {
    title: "帮助我们改进 BgRemove",
    description: "只需 30 秒、点 3 下。你需要什么，我们就做什么。",
    useCaseQ: "你用它做什么？",
    useCases: { product: "商品图片", portrait: "人像 / 头像", logo: "Logo", document: "文件 / 签名", social: "社交媒体", other: "其他" },
    needsQ: "什么功能会让你更常使用？",
    needsHint: "可多选",
    needs: {
      "change-bg": "更换背景（颜色 / 图片）",
      "touch-up": "手动擦除 / 恢复画笔",
      "better-edges": "更精细的边缘（头发、毛发）",
      faster: "更快的处理速度",
      hd: "原图高清下载",
      resize: "按平台裁剪和调整尺寸",
      passport: "证件照 / 护照照片制作",
      "mobile-app": "手机 App",
    },
    ratingQ: "抠图效果如何？",
    ratings: ["很差", "较差", "一般", "不错", "很棒"],
    messageQ: "还缺什么，或有什么不满意？",
    messagePlaceholder: "用你自己的话告诉我们（可选）",
    privacy: "匿名提交。不收集图片、邮箱，不做追踪。",
    send: "提交反馈",
    notNow: "以后再说",
    thanksTitle: "谢谢你！",
    thanksBody: "每条反馈我们都会阅读——呼声最高的功能优先上线。",
    close: "关闭",
    error: "暂时无法提交，请重试。",
    empty: "请至少选择一项。",
    footerLink: "功能建议",
  },
  es: {
    title: "Ayúdanos a mejorar BgRemove",
    description: "30 segundos y 3 toques. Construimos lo que pides.",
    useCaseQ: "¿Para qué lo usaste?",
    useCases: { product: "Fotos de producto", portrait: "Retrato / perfil", logo: "Logo", document: "Documento / firma", social: "Redes sociales", other: "Otro" },
    needsQ: "¿Qué haría que lo usaras más?",
    needsHint: "Elige los que quieras",
    needs: {
      "change-bg": "Cambiar el fondo (color / imagen)",
      "touch-up": "Pincel para borrar / restaurar",
      "better-edges": "Bordes más limpios (pelo)",
      faster: "Procesamiento más rápido",
      hd: "Descarga en resolución original",
      resize: "Recortar y redimensionar para redes",
      passport: "Creador de fotos de pasaporte",
      "mobile-app": "App móvil",
    },
    ratingQ: "¿Qué tal el resultado?",
    ratings: ["Malo", "Flojo", "Normal", "Bueno", "Genial"],
    messageQ: "¿Falta algo o algo te molesta?",
    messagePlaceholder: "Cuéntanos con tus palabras (opcional)",
    privacy: "Anónimo. Sin imágenes, sin email, sin rastreo.",
    send: "Enviar opinión",
    notNow: "Ahora no",
    thanksTitle: "¡Gracias!",
    thanksBody: "Leemos cada respuesta: lo más pedido se lanza primero.",
    close: "Cerrar",
    error: "No se pudo enviar. Inténtalo de nuevo.",
    empty: "Elige al menos una respuesta.",
    footerLink: "Sugerir una función",
  },
  pt: {
    title: "Ajude-nos a melhorar o BgRemove",
    description: "30 segundos e 3 toques. Construímos o que você pede.",
    useCaseQ: "Para que você usou?",
    useCases: { product: "Fotos de produto", portrait: "Retrato / perfil", logo: "Logo", document: "Documento / assinatura", social: "Redes sociais", other: "Outro" },
    needsQ: "O que faria você usar mais?",
    needsHint: "Escolha quantos quiser",
    needs: {
      "change-bg": "Trocar o fundo (cor / imagem)",
      "touch-up": "Pincel para apagar / restaurar",
      "better-edges": "Bordas mais limpas (cabelo)",
      faster: "Processamento mais rápido",
      hd: "Download em resolução original",
      resize: "Cortar e redimensionar para redes",
      passport: "Criador de foto 3x4 / passaporte",
      "mobile-app": "App para celular",
    },
    ratingQ: "Como ficou o resultado?",
    ratings: ["Ruim", "Fraco", "OK", "Bom", "Ótimo"],
    messageQ: "Falta algo ou algo incomoda?",
    messagePlaceholder: "Conte com suas palavras (opcional)",
    privacy: "Anônimo. Sem imagens, sem e-mail, sem rastreamento.",
    send: "Enviar opinião",
    notNow: "Agora não",
    thanksTitle: "Obrigado!",
    thanksBody: "Lemos todas as respostas — o mais pedido sai primeiro.",
    close: "Fechar",
    error: "Não foi possível enviar. Tente novamente.",
    empty: "Escolha pelo menos uma resposta.",
    footerLink: "Sugerir um recurso",
  },
  de: {
    title: "Hilf uns, BgRemove besser zu machen",
    description: "30 Sekunden, 3 Klicks. Wir bauen, was du dir wünschst.",
    useCaseQ: "Wofür hast du es genutzt?",
    useCases: { product: "Produktfotos", portrait: "Porträt / Profilbild", logo: "Logo", document: "Dokument / Unterschrift", social: "Social Media", other: "Anderes" },
    needsQ: "Was würde dich öfter zurückbringen?",
    needsHint: "Mehrfachauswahl",
    needs: {
      "change-bg": "Hintergrund ersetzen (Farbe / Bild)",
      "touch-up": "Pinsel zum Radieren / Wiederherstellen",
      "better-edges": "Sauberere Kanten (Haare, Fell)",
      faster: "Schnellere Verarbeitung",
      hd: "Download in Originalauflösung",
      resize: "Zuschneiden für Plattformen",
      passport: "Passbild-Generator",
      "mobile-app": "Mobile App",
    },
    ratingQ: "Wie war das Ergebnis?",
    ratings: ["Schlecht", "Mäßig", "OK", "Gut", "Super"],
    messageQ: "Fehlt etwas oder stört dich etwas?",
    messagePlaceholder: "In deinen eigenen Worten (optional)",
    privacy: "Anonym. Keine Bilder, keine E-Mail, kein Tracking.",
    send: "Feedback senden",
    notNow: "Nicht jetzt",
    thanksTitle: "Danke!",
    thanksBody: "Wir lesen jede Antwort — die meistgewünschten Funktionen kommen zuerst.",
    close: "Schließen",
    error: "Senden gerade nicht möglich. Bitte erneut versuchen.",
    empty: "Bitte wähle mindestens eine Antwort.",
    footerLink: "Funktion vorschlagen",
  },
  hi: {
    title: "BgRemove को बेहतर बनाने में मदद करें",
    description: "सिर्फ़ 30 सेकंड, 3 टैप। आप जो माँगेंगे, हम वही बनाएँगे।",
    useCaseQ: "आपने इसे किस काम के लिए इस्तेमाल किया?",
    useCases: { product: "प्रोडक्ट फ़ोटो", portrait: "पोर्ट्रेट / प्रोफ़ाइल", logo: "लोगो", document: "डॉक्यूमेंट / सिग्नेचर", social: "सोशल मीडिया", other: "अन्य" },
    needsQ: "किस फ़ीचर से आप इसे ज़्यादा इस्तेमाल करेंगे?",
    needsHint: "जितने चाहें चुनें",
    needs: {
      "change-bg": "बैकग्राउंड बदलें (रंग / इमेज)",
      "touch-up": "मिटाने / वापस लाने वाला ब्रश",
      "better-edges": "साफ़ किनारे (बाल, फ़र)",
      faster: "तेज़ प्रोसेसिंग",
      hd: "ओरिजिनल HD डाउनलोड",
      resize: "प्लेटफ़ॉर्म के लिए क्रॉप और रीसाइज़",
      passport: "पासपोर्ट / ID फ़ोटो मेकर",
      "mobile-app": "मोबाइल ऐप",
    },
    ratingQ: "रिज़ल्ट कैसा रहा?",
    ratings: ["बुरा", "कमज़ोर", "ठीक", "अच्छा", "शानदार"],
    messageQ: "कुछ कमी है या कुछ परेशान करता है?",
    messagePlaceholder: "अपने शब्दों में बताएँ (वैकल्पिक)",
    privacy: "गुमनाम। कोई इमेज, ईमेल या ट्रैकिंग नहीं।",
    send: "फ़ीडबैक भेजें",
    notNow: "अभी नहीं",
    thanksTitle: "धन्यवाद!",
    thanksBody: "हम हर जवाब पढ़ते हैं — सबसे ज़्यादा माँगे गए फ़ीचर पहले आते हैं।",
    close: "बंद करें",
    error: "अभी भेजा नहीं जा सका। फिर से कोशिश करें।",
    empty: "कम से कम एक जवाब चुनें।",
    footerLink: "फ़ीचर सुझाएँ",
  },
  id: {
    title: "Bantu kami mengembangkan BgRemove",
    description: "30 detik, 3 ketukan. Kami membangun yang kamu butuhkan.",
    useCaseQ: "Kamu pakai untuk apa?",
    useCases: { product: "Foto produk", portrait: "Potret / profil", logo: "Logo", document: "Dokumen / tanda tangan", social: "Media sosial", other: "Lainnya" },
    needsQ: "Apa yang membuatmu lebih sering memakainya?",
    needsHint: "Pilih sebanyak yang kamu mau",
    needs: {
      "change-bg": "Ganti latar (warna / gambar)",
      "touch-up": "Kuas hapus / pulihkan manual",
      "better-edges": "Tepi lebih rapi (rambut, bulu)",
      faster: "Proses lebih cepat",
      hd: "Unduh resolusi asli HD",
      resize: "Potong & ubah ukuran untuk platform",
      passport: "Pembuat pas foto / paspor",
      "mobile-app": "Aplikasi ponsel",
    },
    ratingQ: "Bagaimana hasilnya?",
    ratings: ["Buruk", "Kurang", "Lumayan", "Bagus", "Keren"],
    messageQ: "Ada yang kurang atau mengganggu?",
    messagePlaceholder: "Ceritakan dengan kata-katamu (opsional)",
    privacy: "Anonim. Tanpa gambar, email, atau pelacakan.",
    send: "Kirim masukan",
    notNow: "Nanti saja",
    thanksTitle: "Terima kasih!",
    thanksBody: "Kami membaca setiap jawaban — fitur paling diminta dirilis lebih dulu.",
    close: "Tutup",
    error: "Gagal mengirim. Coba lagi.",
    empty: "Pilih minimal satu jawaban.",
    footerLink: "Usulkan fitur",
  },
};

const RATING_EMOJI = ["😞", "🙁", "😐", "🙂", "😍"] as const;

const SUPPORTED = new Set<string>(LOCALES.map((l) => l.code));

// Countries whose visitors most likely read one of our non-English locales.
// India is left out on purpose: most Indian visitors browse in English.
const COUNTRY_LOCALE: Record<string, LocaleCode> = {
  CN: "zh", TW: "zh", HK: "zh", MO: "zh",
  SA: "ar", AE: "ar", EG: "ar", KW: "ar", QA: "ar", BH: "ar", OM: "ar", JO: "ar",
  IQ: "ar", SY: "ar", LB: "ar", PS: "ar", YE: "ar", LY: "ar", TN: "ar", DZ: "ar",
  MA: "ar", SD: "ar", MR: "ar",
  ES: "es", MX: "es", AR: "es", CO: "es", CL: "es", PE: "es", VE: "es", EC: "es",
  GT: "es", CU: "es", BO: "es", DO: "es", HN: "es", PY: "es", SV: "es", NI: "es",
  CR: "es", PA: "es", UY: "es",
  BR: "pt", PT: "pt", AO: "pt", MZ: "pt",
  DE: "de", AT: "de", LI: "de",
  ID: "id",
};

/** Browser language → supported locale, e.g. "zh-TW" → "zh", "in" (old Indonesian) → "id". */
function browserLocale(): LocaleCode | null {
  const langs = typeof navigator === "undefined" ? [] : navigator.languages ?? [navigator.language];
  for (const tag of langs) {
    let base = tag.toLowerCase().split("-")[0];
    if (base === "in") base = "id";
    if (base === "en") return "en"; // explicit English preference wins over country
    if (SUPPORTED.has(base)) return base as LocaleCode;
  }
  return null;
}

async function countryLocale(): Promise<{ locale: LocaleCode | null; country: string | null }> {
  try {
    const res = await fetch("/api/geo", { cache: "no-store" });
    const { country } = (await res.json()) as { country: string | null };
    return { locale: (country && COUNTRY_LOCALE[country]) || null, country };
  } catch {
    return { locale: null, country: null };
  }
}

/** The language the popup should open in for this visitor on this page. */
async function resolveLocale(pageLocale: LocaleCode): Promise<LocaleCode> {
  if (pageLocale !== "en") return pageLocale;
  const fromBrowser = browserLocale();
  if (fromBrowser) return fromBrowser;
  return (await countryLocale()).locale ?? "en";
}

interface StoredState {
  submittedAt?: number;
  dismissedAt?: number;
}

function readState(): StoredState {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}") as StoredState;
  } catch {
    return {};
  }
}

function writeState(patch: StoredState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...readState(), ...patch }));
  } catch {
    /* storage blocked — popup may reappear next visit, which is fine */
  }
}

function shouldAutoOpen(): boolean {
  const s = readState();
  if (s.submittedAt) return false;
  if (s.dismissedAt && Date.now() - s.dismissedAt < SNOOZE_DAYS * 86_400_000) return false;
  return true;
}

function Chip({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        selected
          ? "border-primary bg-primary/10 text-foreground"
          : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground"
      )}
    >
      {selected && <Check className="h-3.5 w-3.5 text-primary" />}
      {children}
    </button>
  );
}

export function FeedbackDialog() {
  const pathname = usePathname();
  const pageLocale = detectLocale(pathname).code;

  const [open, setOpen] = React.useState(false);
  const [lang, setLang] = React.useState<LocaleCode>(pageLocale);
  const langPicked = React.useRef(false);
  const locale = LOCALES.find((l) => l.code === lang) ?? LOCALES[0];
  const t = FEEDBACK_STRINGS[lang];
  const [useCase, setUseCase] = React.useState<UseCase | null>(null);
  const [needs, setNeeds] = React.useState<Need[]>([]);
  const [rating, setRating] = React.useState<number | null>(null);
  const [message, setMessage] = React.useState("");
  const [phase, setPhase] = React.useState<"form" | "sending" | "done">("form");
  const [error, setError] = React.useState<string | null>(null);
  // Open via download only once per page load, even across several downloads.
  const autoTriggered = React.useRef(false);

  React.useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const onDownload = () => {
      if (autoTriggered.current || !shouldAutoOpen()) return;
      autoTriggered.current = true;
      timer = setTimeout(() => setOpen(true), AUTO_OPEN_DELAY_MS);
    };
    const onManual = () => setOpen(true);
    window.addEventListener(DOWNLOAD_EVENT, onDownload);
    window.addEventListener(OPEN_FEEDBACK_EVENT, onManual);
    return () => {
      clearTimeout(timer);
      window.removeEventListener(DOWNLOAD_EVENT, onDownload);
      window.removeEventListener(OPEN_FEEDBACK_EVENT, onManual);
    };
  }, []);

  React.useEffect(() => {
    if (!open || langPicked.current) return;
    let cancelled = false;
    void resolveLocale(pageLocale).then((l) => {
      if (!cancelled && !langPicked.current) setLang(l);
    });
    return () => {
      cancelled = true;
    };
  }, [open, pageLocale]);

  const onOpenChange = (next: boolean) => {
    if (!next && phase !== "done") writeState({ dismissedAt: Date.now() });
    setOpen(next);
  };

  const toggleNeed = (n: Need) =>
    setNeeds((prev) => (prev.includes(n) ? prev.filter((x) => x !== n) : [...prev, n]));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!useCase && needs.length === 0 && rating === null && !message.trim()) {
      setError(t.empty);
      return;
    }
    setError(null);
    setPhase("sending");
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          locale: lang,
          path: pathname,
          useCase,
          needs,
          rating,
          message: message.trim().slice(0, MAX_MESSAGE),
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      writeState({ submittedAt: Date.now() });
      setPhase("done");
    } catch {
      setPhase("form");
      setError(t.error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        dir={locale.dir}
        lang={locale.bcp47}
        className="max-h-[90vh] w-[calc(100%-2rem)] max-w-xl overflow-y-auto rounded-xl"
      >
        {phase === "done" ? (
          <div className="flex flex-col items-center gap-3 py-6 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/15">
              <Check className="h-6 w-6 text-primary" />
            </div>
            <DialogTitle>{t.thanksTitle}</DialogTitle>
            <DialogDescription>{t.thanksBody}</DialogDescription>
            <Button className="mt-2" onClick={() => setOpen(false)}>
              {t.close}
            </Button>
          </div>
        ) : (
          <form onSubmit={submit} className="grid gap-5">
            {/* pr-8 keeps the title clear of the dialog's top-right close button */}
            <DialogHeader className={cn("pr-8", locale.dir === "rtl" && "text-right")}>
              <DialogTitle className="flex items-center gap-2">
                <MessageSquareHeart className="h-5 w-5 text-primary" />
                {t.title}
              </DialogTitle>
              <DialogDescription>{t.description}</DialogDescription>
            </DialogHeader>

            <div className="-mt-2 flex flex-wrap gap-1" role="group" aria-label="Language">
              {LOCALES.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  lang={l.bcp47}
                  aria-pressed={lang === l.code}
                  onClick={() => {
                    langPicked.current = true;
                    setLang(l.code);
                  }}
                  className={cn(
                    "rounded-md px-2 py-0.5 text-xs transition-colors",
                    lang === l.code
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {l.nativeName}
                </button>
              ))}
            </div>

            <fieldset className="grid gap-2">
              <legend className="mb-2 text-sm font-semibold">1. {t.useCaseQ}</legend>
              <div className="flex flex-wrap gap-2">
                {USE_CASES.map((u) => (
                  <Chip key={u} selected={useCase === u} onClick={() => setUseCase(useCase === u ? null : u)}>
                    {t.useCases[u]}
                  </Chip>
                ))}
              </div>
            </fieldset>

            <fieldset className="grid gap-2">
              <legend className="mb-2 text-sm font-semibold">
                2. {t.needsQ}{" "}
                <span className="font-normal text-muted-foreground">({t.needsHint})</span>
              </legend>
              <div className="flex flex-wrap gap-2">
                {NEEDS.map((n) => (
                  <Chip key={n} selected={needs.includes(n)} onClick={() => toggleNeed(n)}>
                    {t.needs[n]}
                  </Chip>
                ))}
              </div>
            </fieldset>

            <fieldset className="grid gap-2">
              <legend className="mb-2 text-sm font-semibold">3. {t.ratingQ}</legend>
              <div className="flex gap-2">
                {RATING_EMOJI.map((emoji, i) => (
                  <button
                    key={emoji}
                    type="button"
                    aria-pressed={rating === i + 1}
                    aria-label={t.ratings[i]}
                    title={t.ratings[i]}
                    onClick={() => setRating(rating === i + 1 ? null : i + 1)}
                    className={cn(
                      "flex h-11 w-11 items-center justify-center rounded-lg border text-xl transition focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      rating === i + 1
                        ? "scale-110 border-primary bg-primary/10"
                        : "border-border bg-card opacity-70 hover:opacity-100"
                    )}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </fieldset>

            <label className="grid gap-2">
              <span className="text-sm font-semibold">4. {t.messageQ}</span>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={MAX_MESSAGE}
                rows={3}
                placeholder={t.messagePlaceholder}
                className="w-full resize-none rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </label>

            {error && (
              <p role="alert" className="text-sm text-destructive">
                {error}
              </p>
            )}

            <div className="flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-muted-foreground">{t.privacy}</p>
              <div className="flex gap-2">
                <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
                  {t.notNow}
                </Button>
                <Button type="submit" disabled={phase === "sending"}>
                  {phase === "sending" && <Loader2 className="h-4 w-4 animate-spin" />}
                  {t.send}
                </Button>
              </div>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

/** Footer link that opens the popup on demand. */
export function FeedbackLink({ className }: { className?: string }) {
  const pathname = usePathname();
  const t = FEEDBACK_STRINGS[detectLocale(pathname).code];
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent(OPEN_FEEDBACK_EVENT))}
      className={cn("inline-flex items-center gap-1.5 hover:text-primary", className)}
    >
      <MessageSquareHeart className="h-3.5 w-3.5" />
      {t.footerLink}
    </button>
  );
}
