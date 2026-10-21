"use client";

/**
 * One-time "What's new" card announcing features built from visitor
 * feedback. A small dismissible card in the corner — not a full-screen
 * interstitial, which annoys visitors and is penalised by Google on mobile.
 *
 * Shown once per browser per announcement (ANNOUNCEMENT id in
 * localStorage), until SHOW_UNTIL, never on /admin. Language follows the
 * same rules as the feedback popup (page → browser → country → English).
 */

import * as React from "react";
import { usePathname } from "next/navigation";
import { Wand2, ImagePlus, MessageSquareHeart, Pipette, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { resolveLocale } from "@/components/feedback-dialog";
import { detectLocale, LOCALES, type LocaleCode } from "@/lib/locales";
import { OPEN_FEEDBACK_EVENT } from "@/lib/utils";

const ANNOUNCEMENT = "2026-10-magic-wand";
const STORAGE_KEY = `bgremove:whatsnew:${ANNOUNCEMENT}`;
const SHOW_UNTIL = Date.parse("2026-11-30T23:59:59Z");
const DELAY_MS = 1200;

interface Strings {
  badge: string;
  title: string;
  bg: string;
  solid: string;
  brush: string;
  ask: string;
  tryIt: string;
  feedback: string;
  close: string;
}

const STRINGS: Record<LocaleCode, Strings> = {
  en: {
    badge: "New",
    title: "New tools — added because you asked",
    bg: "Replace the background with a colour or your own photo",
    solid: "Solid-colour mode keeps text and logos 100% intact",
    brush: "New: magic wand — erase or restore a whole colour area in one click, plus the touch-up brush",
    ask: "Give them a try and tell us what you think.",
    tryIt: "Try it now",
    feedback: "Share your opinion",
    close: "Close",
  },
  ar: {
    badge: "جديد",
    title: "خدمات جديدة أضفناها تلبيةً لطلباتكم",
    bg: "تبديل الخلفية بلون أو بصورة من جهازك",
    solid: "«وضع اللون الواحد» يحافظ على النصوص والشعارات كاملة",
    brush: "جديد: عصا سحرية تمسح أو تسترجع منطقة لون كاملة بنقرة، مع الفرشاة اليدوية",
    ask: "نأمل تجربتها وإعطاءنا رأيكم.",
    tryIt: "جرّبها الآن",
    feedback: "شاركنا رأيك",
    close: "إغلاق",
  },
  zh: {
    badge: "新功能",
    title: "根据大家的建议，我们新增了这些功能",
    bg: "一键更换背景：纯色或你自己的图片",
    solid: "“纯色模式”完整保留文字和 Logo",
    brush: "新增魔术棒：一键擦除或恢复整片相似颜色区域，另有手动修整画笔",
    ask: "欢迎试用，并告诉我们你的想法。",
    tryIt: "立即试用",
    feedback: "提交反馈",
    close: "关闭",
  },
  es: {
    badge: "Nuevo",
    title: "Nuevas herramientas, añadidas porque nos las pediste",
    bg: "Cambia el fondo por un color o por tu propia foto",
    solid: "El modo color sólido conserva textos y logos al 100 %",
    brush: "Nuevo: varita mágica para borrar o recuperar toda una zona de color con un clic, y el pincel de retoque",
    ask: "Pruébalas y cuéntanos qué te parecen.",
    tryIt: "Probar ahora",
    feedback: "Danos tu opinión",
    close: "Cerrar",
  },
  pt: {
    badge: "Novo",
    title: "Novas ferramentas, criadas a pedido de vocês",
    bg: "Troque o fundo por uma cor ou pela sua própria foto",
    solid: "O modo cor sólida mantém textos e logos 100% intactos",
    brush: "Novo: varinha mágica para apagar ou recuperar uma área de cor inteira com um clique, e o pincel de retoque",
    ask: "Experimente e conte o que achou.",
    tryIt: "Experimentar agora",
    feedback: "Dar minha opinião",
    close: "Fechar",
  },
  de: {
    badge: "Neu",
    title: "Neue Funktionen – auf euren Wunsch hinzugefügt",
    bg: "Hintergrund durch eine Farbe oder ein eigenes Foto ersetzen",
    solid: "Einfarbig-Modus erhält Texte und Logos zu 100 %",
    brush: "Neu: Zauberstab radiert oder holt eine ganze Farbfläche mit einem Klick zurück – dazu der Korrekturpinsel",
    ask: "Probiert sie aus und sagt uns eure Meinung.",
    tryIt: "Jetzt ausprobieren",
    feedback: "Feedback geben",
    close: "Schließen",
  },
  hi: {
    badge: "नया",
    title: "आपके कहने पर जोड़े गए नए टूल",
    bg: "बैकग्राउंड को किसी रंग या अपनी फ़ोटो से बदलें",
    solid: "एक-रंग मोड टेक्स्ट और लोगो को पूरा सुरक्षित रखता है",
    brush: "नया: मैजिक वैंड — एक क्लिक में पूरे रंग वाले हिस्से को मिटाएँ या वापस लाएँ, साथ में सुधार ब्रश",
    ask: "इन्हें आज़माएँ और हमें अपनी राय बताएँ।",
    tryIt: "अभी आज़माएँ",
    feedback: "अपनी राय दें",
    close: "बंद करें",
  },
  id: {
    badge: "Baru",
    title: "Fitur baru — kami tambahkan karena kalian minta",
    bg: "Ganti latar dengan warna atau foto milik sendiri",
    solid: "Mode warna polos menjaga teks dan logo tetap utuh 100%",
    brush: "Baru: tongkat ajaib untuk menghapus atau memulihkan satu area warna sekali klik, plus kuas perapian",
    ask: "Silakan coba dan beri tahu pendapat kalian.",
    tryIt: "Coba sekarang",
    feedback: "Beri masukan",
    close: "Tutup",
  },
};

function alreadySeen(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return true; // storage blocked: don't risk showing it on every page
  }
}
function markSeen() {
  try {
    localStorage.setItem(STORAGE_KEY, "1");
  } catch {
    /* ignore */
  }
}

export function WhatsNew() {
  const pathname = usePathname() ?? "/";
  const pageLocale = detectLocale(pathname).code;
  const [lang, setLang] = React.useState<LocaleCode | null>(null);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (pathname.startsWith("/admin") || Date.now() > SHOW_UNTIL || alreadySeen()) return;
    let cancelled = false;
    const timer = setTimeout(() => {
      void resolveLocale(pageLocale).then((l) => {
        if (cancelled) return;
        setLang(l);
        setOpen(true);
      });
    }, DELAY_MS);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
    // Only on first mount: navigating between pages must not re-trigger it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!open || !lang) return null;
  const t = STRINGS[lang];
  const dir = LOCALES.find((l) => l.code === lang)?.dir ?? "ltr";

  const close = () => {
    markSeen();
    setOpen(false);
  };

  const tryIt = () => {
    close();
    const zone = document.querySelector<HTMLElement>('main [role="button"][aria-label]');
    if (zone) {
      zone.scrollIntoView({ behavior: "smooth", block: "center" });
      zone.focus({ preventScroll: true });
    } else {
      // Pages without the tool (blog, about…): go to the home page in the visitor's language.
      window.location.href = (LOCALES.find((l) => l.code === lang)?.prefix || "") + "/";
    }
  };

  return (
    <aside
      role="dialog"
      aria-modal="false"
      aria-labelledby="whats-new-title"
      data-testid="whats-new"
      dir={dir}
      lang={LOCALES.find((l) => l.code === lang)?.bcp47}
      className="fixed bottom-4 z-40 w-[calc(100%-2rem)] max-w-sm animate-in fade-in slide-in-from-bottom-4 rounded-2xl border border-primary/30 bg-background p-4 shadow-2xl ltr:right-4 rtl:left-4 sm:bottom-6 ltr:sm:right-6 rtl:sm:left-6"
    >
      <button
        type="button"
        onClick={close}
        aria-label={t.close}
        className="absolute top-3 rounded-sm p-1 text-muted-foreground hover:text-foreground ltr:right-3 rtl:left-3"
      >
        <X className="h-4 w-4" />
      </button>
      <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
        <Sparkles className="h-3 w-3" />
        {t.badge}
      </span>
      <h2 id="whats-new-title" className="mt-2 pe-6 text-base font-bold leading-snug">
        {t.title}
      </h2>
      <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
        <li className="flex gap-2"><Wand2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{t.brush}</li>
        <li className="flex gap-2"><ImagePlus className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{t.bg}</li>
        <li className="flex gap-2"><Pipette className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{t.solid}</li>
      </ul>
      <p className="mt-3 text-sm">{t.ask}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button size="sm" onClick={tryIt}>{t.tryIt}</Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            close();
            window.dispatchEvent(new CustomEvent(OPEN_FEEDBACK_EVENT));
          }}
        >
          <MessageSquareHeart className="h-4 w-4" />
          {t.feedback}
        </Button>
      </div>
    </aside>
  );
}
