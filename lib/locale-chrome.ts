/**
 * Shared UI chrome strings per locale. These are the bits that appear
 * around content on every page (trust pills, "related tools" heading,
 * "back to all tools" button, etc).
 */
import type { LocaleCode } from "./locales";

export interface ChromeStrings {
  trustBrowser: string;
  trustNoUpload: string;
  trustFree: string;
  relatedHeading: string;
  backToTools: string;
  backHref: string;
}

export const CHROME: Record<LocaleCode, ChromeStrings> = {
  en: {
    trustBrowser: "100% Browser-Based",
    trustNoUpload: "No Upload to Servers",
    trustFree: "Free Forever",
    relatedHeading: "Related tools and guides",
    backToTools: "Back to all tools",
    backHref: "/",
  },
  ar: {
    trustBrowser: "يعمل في المتصفح بالكامل",
    trustNoUpload: "لا رفع للخوادم",
    trustFree: "مجاني للأبد",
    relatedHeading: "أدوات ودلائل ذات صلة",
    backToTools: "العودة لجميع الأدوات",
    backHref: "/ar",
  },
  pt: {
    trustBrowser: "100% no Navegador",
    trustNoUpload: "Sem Upload",
    trustFree: "Grátis Para Sempre",
    relatedHeading: "Ferramentas e guias relacionados",
    backToTools: "Voltar para todas as ferramentas",
    backHref: "/pt",
  },
  de: {
    trustBrowser: "100% im Browser",
    trustNoUpload: "Kein Server-Upload",
    trustFree: "Für Immer Kostenlos",
    relatedHeading: "Verwandte Tools und Anleitungen",
    backToTools: "Zurück zu allen Tools",
    backHref: "/de",
  },
  es: {
    trustBrowser: "100% en el Navegador",
    trustNoUpload: "Sin Subir a Servidores",
    trustFree: "Gratis Para Siempre",
    relatedHeading: "Herramientas y guías relacionadas",
    backToTools: "Volver a todas las herramientas",
    backHref: "/es",
  },
  zh: {
    trustBrowser: "100% 浏览器内运行",
    trustNoUpload: "无服务器上传",
    trustFree: "永久免费",
    relatedHeading: "相关工具和指南",
    backToTools: "返回所有工具",
    backHref: "/zh",
  },
};
