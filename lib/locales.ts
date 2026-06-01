/**
 * Central locale registry. Header / Footer / sitemap / layout-hreflang all
 * derive from this list. Adding a new locale = add one entry here + create
 * the matching lib/site-XX.ts and app/XX/ tree.
 *
 * Order matters: this is the order shown in the language switcher dropdown
 * and the order Google sees in hreflang. We surface highest-opportunity
 * languages first (Hindi + Indonesian above Portuguese/Spanish, per the
 * free-image-tools traffic mix).
 */

export type LocaleCode =
  | "en"
  | "hi"
  | "id"
  | "pt"
  | "es"
  | "ar"
  | "de"
  | "zh";

export interface Locale {
  code: LocaleCode;
  /** URL prefix. "" for default English (root paths). */
  prefix: string;
  /** Short label shown in switcher (max 4 chars). */
  label: string;
  /** Native name shown in tooltip / dropdown. */
  nativeName: string;
  /** BCP-47 tag for hreflang + html lang. */
  bcp47: string;
  /** Text direction. */
  dir: "ltr" | "rtl";
}

export const LOCALES: ReadonlyArray<Locale> = [
  { code: "en", prefix: "",      label: "EN", nativeName: "English",     bcp47: "en-US", dir: "ltr" },
  { code: "hi", prefix: "/hi",   label: "HI", nativeName: "हिन्दी",       bcp47: "hi-IN", dir: "ltr" },
  { code: "id", prefix: "/id",   label: "ID", nativeName: "Indonesia",   bcp47: "id-ID", dir: "ltr" },
  { code: "pt", prefix: "/pt",   label: "PT", nativeName: "Português",   bcp47: "pt-BR", dir: "ltr" },
  { code: "es", prefix: "/es",   label: "ES", nativeName: "Español",     bcp47: "es-ES", dir: "ltr" },
  { code: "ar", prefix: "/ar",   label: "AR", nativeName: "العربية",     bcp47: "ar",    dir: "rtl" },
  { code: "de", prefix: "/de",   label: "DE", nativeName: "Deutsch",     bcp47: "de-DE", dir: "ltr" },
  { code: "zh", prefix: "/zh",   label: "ZH", nativeName: "中文",         bcp47: "zh-CN", dir: "ltr" },
];

/** Detect the active locale from a pathname (e.g. "/hi/bulk/" → "hi"). */
export function detectLocale(pathname: string): Locale {
  for (const loc of LOCALES) {
    if (!loc.prefix) continue;
    if (pathname === loc.prefix || pathname.startsWith(loc.prefix + "/")) return loc;
  }
  return LOCALES[0]; // English default
}

/** Localised aria strings for header chrome. */
export const HEADER_ARIA: Record<LocaleCode, { primary: string; mobile: string; open: string; close: string; language: string }> = {
  en: { primary: "Primary",       mobile: "Mobile",       open: "Open menu",       close: "Close menu",       language: "Change language" },
  hi: { primary: "मुख्य",          mobile: "मोबाइल",        open: "मेनू खोलें",         close: "मेनू बंद करें",       language: "भाषा बदलें" },
  id: { primary: "Utama",         mobile: "Seluler",      open: "Buka menu",       close: "Tutup menu",       language: "Ubah bahasa" },
  pt: { primary: "Primário",      mobile: "Móvel",        open: "Abrir menu",      close: "Fechar menu",      language: "Mudar idioma" },
  es: { primary: "Principal",     mobile: "Móvil",        open: "Abrir menú",      close: "Cerrar menú",      language: "Cambiar idioma" },
  ar: { primary: "التنقل الرئيسي", mobile: "تنقل الجوال",   open: "افتح القائمة",      close: "أغلق القائمة",      language: "تغيير اللغة" },
  de: { primary: "Hauptmenü",     mobile: "Mobil",        open: "Menü öffnen",     close: "Menü schließen",   language: "Sprache ändern" },
  zh: { primary: "主导航",          mobile: "移动",          open: "打开菜单",          close: "关闭菜单",          language: "切换语言" },
};
