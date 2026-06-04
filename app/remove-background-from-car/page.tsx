import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { SeoLanding } from "@/components/seo-landing";
import { webAppSchema, buildFaqSchema } from "@/lib/schema-locale";
import { SITE } from "@/lib/site";
const URL = `${SITE.url}/remove-background-from-car/`;
const TITLE = "Free Car Background Remover — For Dealers and Private Sellers";
const DESC = "Remove backgrounds from car photos for AutoTrader, Cars.com, and dealer websites. Free, bulk-ready, professional studio look without studio cost.";
const faqs = [
  { q: "Does this work on AutoTrader and Cars.com?", a: "Yes. Transparent PNG + white or gradient background = professional listing. Studies show listings with clean backgrounds get 2-3x more clicks." },
  { q: "Reflections and shadows?", a: "AI cleanly cuts the car body. For floor shadow, crop closer to body before processing if you want a clean cut, or leave space for a natural shadow effect." },
  { q: "Bulk for car dealers?", a: "Yes. /bulk processes 20 photos at once — whole showroom in minutes." },
  { q: "Night photos?", a: "Low light is variable. Daylight or studio lighting gives best results." },
  { q: "Are photos private?", a: "Yes — all in browser. Customer data and dealer inventory stay confidential." },
  { q: "How is this better than dealer photo editing services?", a: "Editing services charge $1-5 per photo with 24-48hr turnaround. BgRemove is free and runs in seconds. A 40-car shoot is ready in 15 minutes." },
  { q: "Will buyers know the background was edited?", a: "Visually clean cutouts are industry standard now — buyers expect them. The car itself is unchanged; only the messy background is removed." },
];
export const metadata: Metadata = { title: TITLE, description: DESC, alternates: { canonical: URL } };
export default function Page() {
  return (<><JsonLd data={[webAppSchema({ bcp47: "en-US", url: URL, name: "Car Background Remover", description: DESC }), buildFaqSchema("en-US", faqs)]} />
    <SeoLanding eyebrow="Car Dealers & Private Sellers" title="Remove backgrounds from car photos"
      description="Professional studio look for AutoTrader, Cars.com, Carvana, or dealership websites. Clean car cutouts in 3 seconds. Free, bulk-ready, no per-photo cost."
      trustPills={[{ icon: "lock", label: "Inventory private" }, { icon: "zap", label: "Bulk: 20 cars" }, { icon: "sparkles", label: "Free" }]}
      bullets={[
        { title: "Clean car body", body: "AI captures edge detail, mirrors, antenna, wheels." },
        { title: "Marketplace ready", body: "AutoTrader, Cars.com, Carvana — all formats supported." },
        { title: "Bulk mode", body: "20 cars per batch — full showroom catalogue in 15 min." },
        { title: "Studio look", body: "Transparent PNG + gradient background = premium dealer feel." },
      ]}
      sections={[
        { heading: "Why dealers benefit from clean backgrounds", body: "Listings with professional-looking photos consistently get 2-3x more clicks than those with messy parking lot backgrounds. Bad backgrounds distract buyers — busy parking, other cars, debris, weather. Clean cutouts = professional impression = faster sale.\n\nMost dealers either spend on professional photographers (expensive, slow) or accept the parking-lot look (lower CTR). BgRemove gives you studio-quality cutouts for free in seconds." },
        { heading: "Best photo tips", body: "Daylight photos work best.\n\n3/4 angle (slight side view) is the industry standard.\n\nContrast helps — light car on dark background, dark car on light.\n\nMultiple angles: front, side, rear, interior, engine bay.\n\nClean the car first — water spots and dust still show through cleanly cut backgrounds." },
        { heading: "Dealer workflow", body: "New inventory arrives → 6-8 photos per vehicle → /bulk on BgRemove → transparent PNGs → Canva for white or gradient background → upload to listing platforms.\n\nFor an established dealer doing 20 new cars per week, this is about an hour of total photo prep — replacing what used to take a contracted photographer 2-3 days and $200+." },
      ]}
      faqs={faqs} faqTitle="Frequently asked questions"
      related={[
        { href: "/remove-background-from-motorcycle/", label: "Motorcycle background remover" },
        { href: "/bulk/", label: "Bulk processing" },
        { href: "/", label: "Back to background remover" },
      ]}
      relatedTitle="Related tools" ctaTitle="Upgrade your listings today"
      ctaSubtitle="Free, bulk, studio look." ctaButton="Start now" ctaHref="/" />
  </>);
}
