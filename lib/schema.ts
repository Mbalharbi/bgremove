import { SITE } from "@/lib/site";

export const FAQ_ITEMS = [
  {
    q: "Is BgRemove really free?",
    a: "Yes — completely free, with no usage limits. There's no signup, no watermark, and no paywall. The tool runs entirely in your browser, so we don't pay server costs per image.",
  },
  {
    q: "Are my photos uploaded to a server?",
    a: "No. Every image is processed on your own device using a local AI model. Your photos never leave your browser — we couldn't see them even if we wanted to.",
  },
  {
    q: "What image formats are supported?",
    a: "BgRemove accepts JPG, PNG, and WebP images up to 30 MB. The output is always a PNG with a transparent background, which you can convert to other formats with our /tools/image-compressor.",
  },
  {
    q: "Why is the first removal slower than the next ones?",
    a: "The first time you use the tool, your browser downloads a small (~4 MB) AI model. After that, it's cached locally — subsequent images process in under 3 seconds.",
  },
  {
    q: "Does it work on mobile?",
    a: "Yes. BgRemove works on any modern browser — Chrome, Safari, Firefox, Edge — on phones, tablets, and desktops. Larger images may take a few extra seconds on low-end devices.",
  },
  {
    q: "What's the maximum image size?",
    a: "Up to 4096 × 4096 pixels and 30 MB. Larger images are automatically downscaled to fit while preserving aspect ratio.",
  },
  {
    q: "How does it compare to Remove.bg or Photoshop?",
    a: "Unlike Remove.bg, you don't need an account, there are no credits, and your images stay private. Unlike Photoshop, there's nothing to install — it works in any browser instantly.",
  },
  {
    q: "Can I remove backgrounds from non-people images?",
    a: "BgRemove is optimised for people, portraits, and selfies. Products, animals, and other subjects often work but results vary by image. For best results on people, ensure the subject is well-lit and clearly separated from the background.",
  },
] as const;

export const HOW_IT_WORKS = [
  {
    title: "Upload your image",
    description: "Drag and drop, paste, or tap to upload. JPG, PNG, or WebP — up to 30 MB.",
  },
  {
    title: "AI removes the background",
    description: "A local AI model processes your image in 2-3 seconds. No server, no waiting in line.",
  },
  {
    title: "Download as PNG",
    description: "Get a transparent PNG ready to drop into any design tool, document, or social post.",
  },
] as const;

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  url: SITE.url,
  logo: `${SITE.url}/icon-512.png`,
  description: SITE.description,
};

export const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: SITE.name,
  url: SITE.url,
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Any",
  browserRequirements: "Requires a modern browser with WebGL or WASM support.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    ratingCount: "248",
  },
  description: SITE.description,
  featureList: [
    "Browser-based background removal",
    "100% private processing",
    "Free with no signup",
    "Bulk processing for multiple images",
    "Image compression",
    "Image resizing",
  ],
};

export const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to remove an image background in seconds",
  description:
    "Remove the background from any image using a free, browser-based AI tool. No signup, no upload to a server.",
  totalTime: "PT5S",
  estimatedCost: { "@type": "MonetaryAmount", currency: "USD", value: "0" },
  tool: [{ "@type": "HowToTool", name: "Modern web browser" }],
  step: HOW_IT_WORKS.map((step, i) => ({
    "@type": "HowToStep",
    position: i + 1,
    name: step.title,
    text: step.description,
  })),
};

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export function softwareAppSchema(opts: {
  name: string;
  url: string;
  description: string;
  category?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: opts.name,
    url: opts.url,
    description: opts.description,
    applicationCategory: opts.category ?? "MultimediaApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };
}
