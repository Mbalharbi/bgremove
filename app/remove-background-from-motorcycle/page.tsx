import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { SeoLanding } from "@/components/seo-landing";
import { webAppSchema, buildFaqSchema } from "@/lib/schema-locale";
import { SITE } from "@/lib/site";
const URL = `${SITE.url}/remove-background-from-motorcycle/`;
const TITLE = "Free Motorcycle Background Remover — Dealer and Marketplace Photos";
const DESC = "Remove backgrounds from motorcycle photos for Cycle Trader, Facebook Marketplace, dealer listings. Free, bulk-ready, captures complex bike details cleanly.";
const faqs = [
  { q: "Handles complex bike details (spokes, exhaust, fairings)?", a: "Yes. RMBG-1.4 is trained on dense detail. Wheel spokes, exhaust chrome, sport bike fairings all cut accurately." },
  { q: "Works on dirt bikes, sport bikes, cruisers?", a: "All bike types. Even off-road bikes with messy outdoor backgrounds cut cleanly." },
  { q: "Bulk for dealer inventory?", a: "Yes — 20 bikes at once via /bulk." },
  { q: "What about garage clutter in photos?", a: "AI removes the background regardless of clutter. Toolboxes, other bikes, garage doors — all disappear cleanly." },
  { q: "Privacy for dealer inventory?", a: "Yes. All processing local, dealer competitive intelligence stays private." },
  { q: "Best photo conditions for bikes?", a: "Outdoor daylight works best. Indoor garage shots need stronger lighting. Side profile (3/4 angle) is the dealer standard." },
  { q: "Cycle Trader image requirements?", a: "Cycle Trader recommends 1200×900px minimum. We output up to 4096px." },
];
export const metadata: Metadata = { title: TITLE, description: DESC, alternates: { canonical: URL } };
export default function Page() {
  return (<><JsonLd data={[webAppSchema({ bcp47: "en-US", url: URL, name: "Motorcycle BG Remover", description: DESC }), buildFaqSchema("en-US", faqs)]} />
    <SeoLanding eyebrow="Motorcycle Dealers" title="Remove backgrounds from motorcycle photos"
      description="Free background remover for motorcycle dealers and private sellers. Captures spokes, chrome, fairings, and exhaust detail. Bulk-ready for inventory turnover."
      trustPills={[{ icon: "lock", label: "Inventory private" }, { icon: "zap", label: "Bulk 20 bikes" }, { icon: "sparkles", label: "Free" }]}
      bullets={[
        { title: "Detail capture", body: "Spokes, chrome, exhaust, fairings — all cut accurately." },
        { title: "All bike types", body: "Sport, cruiser, dirt, touring — works on every category." },
        { title: "Bulk mode", body: "20 bikes per batch — dealer-friendly workflow." },
        { title: "Outdoor or garage", body: "Removes background regardless of shoot location." },
      ]}
      sections={[
        { heading: "Why motorcycle dealers benefit", body: "Motorcycle listings have unique challenges. Bikes are often photographed in cluttered garages, parking lots, or outdoor lots with complex backgrounds (other inventory, trees, signage). Clean cutouts dramatically improve listing quality on Cycle Trader, Facebook Marketplace, eBay Motors, and dealer websites.\n\nThe AI handles motorcycle-specific complexity: wheel spokes (often cut poorly by traditional tools), chrome exhaust reflections, sport bike fairings with multiple angles. Results are dealer-grade." },
        { heading: "Best photo conditions", body: "Outdoor daylight: ideal. Slight overcast diffuses shadows.\n\n3/4 side angle: industry standard for bike listings.\n\nClean the bike first — water spots and dust show through clean cutouts.\n\nClose-ups of engine, instrument panel, seat get the same workflow.\n\nFor sport bikes with reflective fairings, avoid direct overhead lighting to reduce specular highlights." },
        { heading: "Workflow for motorcycle dealers", body: "Inventory comes in → photograph at 6-8 angles per bike → /bulk on BgRemove → ZIP of transparent PNGs → Canva for clean background → upload to platforms.\n\nFor a busy dealer with 30+ bikes in inventory, total prep time is under an hour. Replaces contracted photography that typically costs $300-1000 per batch." },
      ]}
      faqs={faqs} faqTitle="Frequently asked questions"
      related={[
        { href: "/remove-background-from-car/", label: "Car background remover" },
        { href: "/bulk/", label: "Bulk processing" },
        { href: "/", label: "Back to background remover" },
      ]}
      relatedTitle="Related tools" ctaTitle="Professional motorcycle listings today"
      ctaSubtitle="Free, bulk, dealer-grade." ctaButton="Start now" ctaHref="/" />
  </>);
}
