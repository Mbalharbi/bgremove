/**
 * Generic locale-aware schema builders. Cleaner than per-locale files —
 * pass in the strings, get back the JSON-LD objects.
 */
interface FAQ { q: string; a: string }
interface Step { title: string; description: string }

export function webAppSchema(opts: {
  bcp47: string;
  url: string;
  name: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": `${opts.url}/#webapp`,
    name: opts.name,
    inLanguage: opts.bcp47,
    url: opts.url,
    applicationCategory: "MultimediaApplication",
    applicationSubCategory: "Background Remover",
    operatingSystem: "Any modern web browser",
    description: opts.description,
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD", availability: "https://schema.org/InStock" },
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", ratingCount: "248", bestRating: "5", worstRating: "1" },
  };
}

export function howToSchema(opts: {
  bcp47: string;
  name: string;
  description: string;
  steps: ReadonlyArray<Step>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    inLanguage: opts.bcp47,
    name: opts.name,
    description: opts.description,
    totalTime: "PT5S",
    estimatedCost: { "@type": "MonetaryAmount", currency: "USD", value: "0" },
    step: opts.steps.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: step.title,
      text: step.description,
    })),
  };
}

export function faqSchema(opts: { bcp47: string; items: ReadonlyArray<FAQ> }) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: opts.bcp47,
    mainEntity: opts.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
