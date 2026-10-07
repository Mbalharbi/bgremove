/**
 * UI strings for the background-removal tool itself (upload zone, progress,
 * result actions, before/after slider). Page copy lives in lib/site-XX.ts;
 * this file covers the interactive widget that every locale page embeds.
 *
 * Pick strings with `useToolStrings()` — it follows the page's locale
 * (detectLocale on the pathname), so /zh/ pages get Chinese, etc.
 */

"use client";

import { usePathname } from "next/navigation";
import { detectLocale, type LocaleCode } from "@/lib/locales";

export interface ToolStrings {
  // Upload zone
  dropOne: string;
  dropMany: string;
  dropping: string;
  formats: (maxSize: string) => string;
  formatsEach: string;
  private: string;
  zoneAriaOne: string;
  zoneAriaMany: string;
  inputAriaOne: string;
  inputAriaMany: string;
  errNoImage: string;
  errTooBig: (maxSize: string) => string;
  uploadErrorTitle: string;
  // Progress
  preparing: string;
  loadingRuntime: string;
  loadingModel: string;
  downloading: (doneMb: string, totalMb: string) => string;
  removing: string;
  firstTimeHint: string;
  // Trust pills under the upload zone
  pillPrivate: string;
  pillSpeed: string;
  pillFree: string;
  // Result
  newImage: string;
  downloadPng: string;
  downscaledTitle: string;
  downscaledDesc: (w: number, h: number) => string;
  errorTitle: string;
  // Before / after slider
  before: string;
  after: string;
  compareAria: string;
  altOriginal: string;
  altRemoved: string;
}

const MB = "MB";

export const TOOL_STRINGS: Record<LocaleCode, ToolStrings> = {
  en: {
    dropOne: "Drop an image, paste, or tap to upload",
    dropMany: "Drop images, paste, or tap to upload",
    dropping: "Drop to upload",
    formats: (s) => `JPG, PNG, or WebP · up to ${s}`,
    formatsEach: " each",
    private: "Processed in your browser · never uploaded",
    zoneAriaOne: "Drop an image, paste, or tap to upload (removes the background)",
    zoneAriaMany: "Drop images, paste, or tap to upload (removes the background)",
    inputAriaOne: "Choose an image file to upload",
    inputAriaMany: "Choose image files to upload",
    errNoImage: "No image files detected. Try JPG, PNG, or WebP.",
    errTooBig: (s) => `File is too large. Maximum is ${s}.`,
    uploadErrorTitle: "Upload error",
    preparing: "Preparing…",
    loadingRuntime: "Starting the AI engine…",
    loadingModel: "Loading AI model…",
    downloading: (d, t) => `Downloading AI model — ${d} of ${t} ${MB}`,
    removing: "Removing background…",
    firstTimeHint: "One-time download — the next image will be much faster.",
    pillPrivate: "Files never leave your device",
    pillSpeed: "Seconds per image after the first load",
    pillFree: "Free, unlimited, no signup",
    newImage: "New image",
    downloadPng: "Download PNG",
    downscaledTitle: "Image downscaled",
    downscaledDesc: (w, h) => `Resized to ${w}×${h} for performance.`,
    errorTitle: "Couldn't remove background",
    before: "Before",
    after: "After",
    compareAria: "Compare before and after",
    altOriginal: "original",
    altRemoved: "background removed",
  },
  ar: {
    dropOne: "اسحب صورة أو الصقها أو اضغط للرفع",
    dropMany: "اسحب الصور أو الصقها أو اضغط للرفع",
    dropping: "أفلت الصورة هنا",
    formats: (s) => `JPG أو PNG أو WebP · حتى ${s}`,
    formatsEach: " لكل صورة",
    private: "تتم المعالجة في متصفحك · لا تُرفع أبدًا",
    zoneAriaOne: "اسحب صورة أو الصقها أو اضغط للرفع (لإزالة الخلفية)",
    zoneAriaMany: "اسحب الصور أو الصقها أو اضغط للرفع (لإزالة الخلفية)",
    inputAriaOne: "اختر صورة للرفع",
    inputAriaMany: "اختر صورًا للرفع",
    errNoImage: "لم يتم العثور على صورة. جرّب JPG أو PNG أو WebP.",
    errTooBig: (s) => `الملف كبير جدًا. الحد الأقصى ${s}.`,
    uploadErrorTitle: "خطأ في الرفع",
    preparing: "جارٍ التحضير…",
    loadingRuntime: "جارٍ تشغيل محرك الذكاء الاصطناعي…",
    loadingModel: "جارٍ تحميل نموذج الذكاء الاصطناعي…",
    downloading: (d, t) => `تنزيل نموذج الذكاء الاصطناعي — ${d} من ${t} ${MB}`,
    removing: "جارٍ إزالة الخلفية…",
    firstTimeHint: "تنزيل لمرة واحدة فقط — الصورة التالية ستكون أسرع بكثير.",
    pillPrivate: "ملفاتك لا تغادر جهازك",
    pillSpeed: "ثوانٍ لكل صورة بعد أول تحميل",
    pillFree: "مجاني، بلا حدود، بدون تسجيل",
    newImage: "صورة جديدة",
    downloadPng: "تنزيل PNG",
    downscaledTitle: "تم تصغير الصورة",
    downscaledDesc: (w, h) => `تم تغيير المقاس إلى ${w}×${h} لتسريع المعالجة.`,
    errorTitle: "تعذّرت إزالة الخلفية",
    before: "قبل",
    after: "بعد",
    compareAria: "قارن قبل وبعد",
    altOriginal: "الأصلية",
    altRemoved: "بعد إزالة الخلفية",
  },
  zh: {
    dropOne: "拖放、粘贴或点击上传图片",
    dropMany: "拖放、粘贴或点击上传多张图片",
    dropping: "松开即可上传",
    formats: (s) => `JPG、PNG 或 WebP · 最大 ${s}`,
    formatsEach: "（每张）",
    private: "在浏览器中处理 · 绝不上传",
    zoneAriaOne: "拖放、粘贴或点击上传图片（去除背景）",
    zoneAriaMany: "拖放、粘贴或点击上传多张图片（去除背景）",
    inputAriaOne: "选择要上传的图片",
    inputAriaMany: "选择要上传的图片",
    errNoImage: "未检测到图片。请使用 JPG、PNG 或 WebP。",
    errTooBig: (s) => `文件过大，最大 ${s}。`,
    uploadErrorTitle: "上传出错",
    preparing: "准备中…",
    loadingRuntime: "正在启动 AI 引擎…",
    loadingModel: "正在加载 AI 模型…",
    downloading: (d, t) => `正在下载 AI 模型 — ${d} / ${t} ${MB}`,
    removing: "正在去除背景…",
    firstTimeHint: "仅首次需要下载，下一张会快很多。",
    pillPrivate: "文件不会离开你的设备",
    pillSpeed: "首次加载后每张只需几秒",
    pillFree: "免费、无限制、无需注册",
    newImage: "换一张",
    downloadPng: "下载 PNG",
    downscaledTitle: "图片已缩小",
    downscaledDesc: (w, h) => `已调整为 ${w}×${h} 以提升速度。`,
    errorTitle: "无法去除背景",
    before: "原图",
    after: "效果",
    compareAria: "对比处理前后",
    altOriginal: "原图",
    altRemoved: "已去除背景",
  },
  es: {
    dropOne: "Suelta una imagen, pégala o toca para subir",
    dropMany: "Suelta imágenes, pégalas o toca para subir",
    dropping: "Suelta para subir",
    formats: (s) => `JPG, PNG o WebP · hasta ${s}`,
    formatsEach: " cada una",
    private: "Se procesa en tu navegador · nunca se sube",
    zoneAriaOne: "Suelta una imagen, pégala o toca para subir (quita el fondo)",
    zoneAriaMany: "Suelta imágenes, pégalas o toca para subir (quita el fondo)",
    inputAriaOne: "Elige una imagen para subir",
    inputAriaMany: "Elige imágenes para subir",
    errNoImage: "No se detectó ninguna imagen. Prueba JPG, PNG o WebP.",
    errTooBig: (s) => `El archivo es demasiado grande. Máximo ${s}.`,
    uploadErrorTitle: "Error al subir",
    preparing: "Preparando…",
    loadingRuntime: "Iniciando el motor de IA…",
    loadingModel: "Cargando el modelo de IA…",
    downloading: (d, t) => `Descargando el modelo de IA — ${d} de ${t} ${MB}`,
    removing: "Quitando el fondo…",
    firstTimeHint: "Descarga única: la próxima imagen será mucho más rápida.",
    pillPrivate: "Tus archivos no salen de tu dispositivo",
    pillSpeed: "Segundos por imagen tras la primera carga",
    pillFree: "Gratis, ilimitado, sin registro",
    newImage: "Nueva imagen",
    downloadPng: "Descargar PNG",
    downscaledTitle: "Imagen reducida",
    downscaledDesc: (w, h) => `Redimensionada a ${w}×${h} para mayor rapidez.`,
    errorTitle: "No se pudo quitar el fondo",
    before: "Antes",
    after: "Después",
    compareAria: "Comparar antes y después",
    altOriginal: "original",
    altRemoved: "sin fondo",
  },
  pt: {
    dropOne: "Solte uma imagem, cole ou toque para enviar",
    dropMany: "Solte imagens, cole ou toque para enviar",
    dropping: "Solte para enviar",
    formats: (s) => `JPG, PNG ou WebP · até ${s}`,
    formatsEach: " cada",
    private: "Processado no seu navegador · nunca enviado",
    zoneAriaOne: "Solte uma imagem, cole ou toque para enviar (remove o fundo)",
    zoneAriaMany: "Solte imagens, cole ou toque para enviar (remove o fundo)",
    inputAriaOne: "Escolha uma imagem para enviar",
    inputAriaMany: "Escolha imagens para enviar",
    errNoImage: "Nenhuma imagem detectada. Tente JPG, PNG ou WebP.",
    errTooBig: (s) => `Arquivo muito grande. Máximo de ${s}.`,
    uploadErrorTitle: "Erro no envio",
    preparing: "Preparando…",
    loadingRuntime: "Iniciando o motor de IA…",
    loadingModel: "Carregando o modelo de IA…",
    downloading: (d, t) => `Baixando o modelo de IA — ${d} de ${t} ${MB}`,
    removing: "Removendo o fundo…",
    firstTimeHint: "Download único — a próxima imagem será bem mais rápida.",
    pillPrivate: "Seus arquivos não saem do seu aparelho",
    pillSpeed: "Segundos por imagem após o primeiro carregamento",
    pillFree: "Grátis, ilimitado, sem cadastro",
    newImage: "Nova imagem",
    downloadPng: "Baixar PNG",
    downscaledTitle: "Imagem reduzida",
    downscaledDesc: (w, h) => `Redimensionada para ${w}×${h} para ganhar velocidade.`,
    errorTitle: "Não foi possível remover o fundo",
    before: "Antes",
    after: "Depois",
    compareAria: "Comparar antes e depois",
    altOriginal: "original",
    altRemoved: "sem fundo",
  },
  de: {
    dropOne: "Bild ablegen, einfügen oder tippen zum Hochladen",
    dropMany: "Bilder ablegen, einfügen oder tippen zum Hochladen",
    dropping: "Zum Hochladen loslassen",
    formats: (s) => `JPG, PNG oder WebP · bis ${s}`,
    formatsEach: " pro Bild",
    private: "Im Browser verarbeitet · nie hochgeladen",
    zoneAriaOne: "Bild ablegen, einfügen oder tippen zum Hochladen (entfernt den Hintergrund)",
    zoneAriaMany: "Bilder ablegen, einfügen oder tippen zum Hochladen (entfernt den Hintergrund)",
    inputAriaOne: "Bilddatei zum Hochladen wählen",
    inputAriaMany: "Bilddateien zum Hochladen wählen",
    errNoImage: "Kein Bild erkannt. Versuche JPG, PNG oder WebP.",
    errTooBig: (s) => `Datei zu groß. Maximal ${s}.`,
    uploadErrorTitle: "Fehler beim Hochladen",
    preparing: "Wird vorbereitet…",
    loadingRuntime: "KI-Engine wird gestartet…",
    loadingModel: "KI-Modell wird geladen…",
    downloading: (d, t) => `KI-Modell wird geladen — ${d} von ${t} ${MB}`,
    removing: "Hintergrund wird entfernt…",
    firstTimeHint: "Einmaliger Download — das nächste Bild geht viel schneller.",
    pillPrivate: "Dateien verlassen nie dein Gerät",
    pillSpeed: "Sekunden pro Bild nach dem ersten Laden",
    pillFree: "Kostenlos, unbegrenzt, ohne Anmeldung",
    newImage: "Neues Bild",
    downloadPng: "PNG herunterladen",
    downscaledTitle: "Bild verkleinert",
    downscaledDesc: (w, h) => `Für mehr Tempo auf ${w}×${h} verkleinert.`,
    errorTitle: "Hintergrund konnte nicht entfernt werden",
    before: "Vorher",
    after: "Nachher",
    compareAria: "Vorher und nachher vergleichen",
    altOriginal: "Original",
    altRemoved: "ohne Hintergrund",
  },
  hi: {
    dropOne: "इमेज ड्रॉप करें, पेस्ट करें या अपलोड के लिए टैप करें",
    dropMany: "इमेज ड्रॉप करें, पेस्ट करें या अपलोड के लिए टैप करें",
    dropping: "अपलोड के लिए छोड़ें",
    formats: (s) => `JPG, PNG या WebP · ${s} तक`,
    formatsEach: " (हर इमेज)",
    private: "आपके ब्राउज़र में प्रोसेस · कभी अपलोड नहीं",
    zoneAriaOne: "इमेज ड्रॉप करें, पेस्ट करें या अपलोड के लिए टैप करें (बैकग्राउंड हटाता है)",
    zoneAriaMany: "इमेज ड्रॉप करें, पेस्ट करें या अपलोड के लिए टैप करें (बैकग्राउंड हटाता है)",
    inputAriaOne: "अपलोड के लिए इमेज चुनें",
    inputAriaMany: "अपलोड के लिए इमेज चुनें",
    errNoImage: "कोई इमेज नहीं मिली। JPG, PNG या WebP आज़माएँ।",
    errTooBig: (s) => `फ़ाइल बहुत बड़ी है। अधिकतम ${s}।`,
    uploadErrorTitle: "अपलोड में गड़बड़ी",
    preparing: "तैयारी हो रही है…",
    loadingRuntime: "AI इंजन शुरू हो रहा है…",
    loadingModel: "AI मॉडल लोड हो रहा है…",
    downloading: (d, t) => `AI मॉडल डाउनलोड हो रहा है — ${t} में से ${d} ${MB}`,
    removing: "बैकग्राउंड हटाया जा रहा है…",
    firstTimeHint: "सिर्फ़ एक बार डाउनलोड — अगली इमेज बहुत तेज़ बनेगी।",
    pillPrivate: "फ़ाइलें आपके डिवाइस से बाहर नहीं जातीं",
    pillSpeed: "पहली बार के बाद हर इमेज कुछ सेकंड में",
    pillFree: "फ्री, अनलिमिटेड, बिना साइन-अप",
    newImage: "नई इमेज",
    downloadPng: "PNG डाउनलोड करें",
    downscaledTitle: "इमेज छोटी की गई",
    downscaledDesc: (w, h) => `तेज़ी के लिए ${w}×${h} पर रीसाइज़ किया गया।`,
    errorTitle: "बैकग्राउंड नहीं हट सका",
    before: "पहले",
    after: "बाद में",
    compareAria: "पहले और बाद की तुलना करें",
    altOriginal: "ओरिजिनल",
    altRemoved: "बैकग्राउंड हटाया गया",
  },
  id: {
    dropOne: "Tarik gambar, tempel, atau ketuk untuk unggah",
    dropMany: "Tarik gambar-gambar, tempel, atau ketuk untuk unggah",
    dropping: "Lepas untuk unggah",
    formats: (s) => `JPG, PNG, atau WebP · hingga ${s}`,
    formatsEach: " per gambar",
    private: "Diproses di browser Anda · tidak pernah diunggah",
    zoneAriaOne: "Tarik gambar, tempel, atau ketuk untuk unggah (menghapus latar)",
    zoneAriaMany: "Tarik gambar-gambar, tempel, atau ketuk untuk unggah (menghapus latar)",
    inputAriaOne: "Pilih gambar untuk diunggah",
    inputAriaMany: "Pilih gambar-gambar untuk diunggah",
    errNoImage: "Tidak ada gambar terdeteksi. Coba JPG, PNG, atau WebP.",
    errTooBig: (s) => `File terlalu besar. Maksimal ${s}.`,
    uploadErrorTitle: "Gagal mengunggah",
    preparing: "Menyiapkan…",
    loadingRuntime: "Menyalakan mesin AI…",
    loadingModel: "Memuat model AI…",
    downloading: (d, t) => `Mengunduh model AI — ${d} dari ${t} ${MB}`,
    removing: "Menghapus latar…",
    firstTimeHint: "Unduhan sekali saja — gambar berikutnya jauh lebih cepat.",
    pillPrivate: "File tidak pernah keluar dari perangkat Anda",
    pillSpeed: "Hitungan detik per gambar setelah muat pertama",
    pillFree: "Gratis, tanpa batas, tanpa daftar",
    newImage: "Gambar baru",
    downloadPng: "Unduh PNG",
    downscaledTitle: "Gambar diperkecil",
    downscaledDesc: (w, h) => `Diubah ke ${w}×${h} agar lebih cepat.`,
    errorTitle: "Gagal menghapus latar",
    before: "Sebelum",
    after: "Sesudah",
    compareAria: "Bandingkan sebelum dan sesudah",
    altOriginal: "asli",
    altRemoved: "latar dihapus",
  },
};

/** Strings for the locale of the current page. */
export function useToolStrings(): ToolStrings {
  const pathname = usePathname();
  return TOOL_STRINGS[detectLocale(pathname ?? "/").code];
}
