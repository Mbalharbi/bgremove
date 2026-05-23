import { SITE } from "@/lib/site";
import { SITE_AR, FAQ_AR, HOW_IT_WORKS_AR } from "@/lib/site-ar";

export const webApplicationSchemaAr = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "@id": `${SITE.url}/ar/#webapp`,
  name: SITE_AR.name,
  inLanguage: "ar",
  url: SITE_AR.url,
  applicationCategory: "MultimediaApplication",
  applicationSubCategory: "Background Remover",
  operatingSystem: "Any modern web browser",
  description: SITE_AR.description,
  isAccessibleForFree: true,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    ratingCount: "248",
    bestRating: "5",
    worstRating: "1",
  },
};

export const howToSchemaAr = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  inLanguage: "ar",
  name: "كيف تزيل خلفية صورة في ثوانٍ",
  description:
    "أزل خلفية أي صورة باستخدام أداة مجانية تعمل داخل المتصفح. بدون تسجيل، بدون رفع للخوادم.",
  totalTime: "PT5S",
  estimatedCost: { "@type": "MonetaryAmount", currency: "USD", value: "0" },
  step: HOW_IT_WORKS_AR.map((step, i) => ({
    "@type": "HowToStep",
    position: i + 1,
    name: step.title,
    text: step.description,
  })),
};

export const faqSchemaAr = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "ar",
  mainEntity: FAQ_AR.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};
