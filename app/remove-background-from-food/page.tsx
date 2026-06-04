import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { SeoLanding } from "@/components/seo-landing";
import { webAppSchema, buildFaqSchema } from "@/lib/schema-locale";
import { SITE } from "@/lib/site";
const URL = `${SITE.url}/remove-background-from-food/`;
const TITLE = "Free Food Background Remover — Menu, Delivery App, Restaurant Photos";
const DESC = "Clean food photos for delivery apps (Uber Eats, DoorDash, Talabat), restaurant menus, food blogs. Free, captures sauce, garnish, plate edges.";
const faqs = [
  { q: "Works for delivery app menu photos?", a: "Yes. Uber Eats, DoorDash, Talabat, HungerStation all benefit from clean food cutouts. Higher CTR = more orders." },
  { q: "Captures sauce and garnish detail?", a: "Yes. The AI preserves sauce drips, herb garnishes, and plate-edge detail." },
  { q: "Steam or hot food effects?", a: "Steam may partially cut. Photograph after steam dissipates for cleanest results." },
  { q: "Bulk for restaurant menus?", a: "Yes — 20 dishes at once. Refresh a full menu in a session." },
  { q: "How does this compare to hiring food photographer?", a: "Food photographers charge $50-200 per dish. BgRemove is free and produces marketplace-grade results. Hire pros for hero brand shots; use BgRemove for menu and delivery apps." },
  { q: "Plate vs no-plate?", a: "Either works. Plate stays intact if photographed with it; food alone if shot without one. Match your menu style." },
  { q: "Privacy for unreleased menu items?", a: "Yes. Critical for restaurants planning seasonal launches or competing in tight markets." },
];
export const metadata: Metadata = { title: TITLE, description: DESC, alternates: { canonical: URL } };
export default function Page() {
  return (<><JsonLd data={[webAppSchema({ bcp47: "en-US", url: URL, name: "Food BG Remover", description: DESC }), buildFaqSchema("en-US", faqs)]} />
    <SeoLanding eyebrow="Restaurants & Food Brands" title="Remove backgrounds from food photos"
      description="Clean food cutouts for delivery apps, menus, food blogs, and packaging. Captures sauce, garnish, plate edges. Built for Uber Eats, DoorDash, Talabat, and direct ordering."
      trustPills={[{ icon: "lock", label: "Menu private" }, { icon: "zap", label: "Bulk 20 dishes" }, { icon: "sparkles", label: "Free" }]}
      bullets={[
        { title: "Delivery app ready", body: "Uber Eats, DoorDash, Talabat, HungerStation, Grubhub — all formats." },
        { title: "Detail preservation", body: "Sauce drips, herbs, garnish, plate edges all intact." },
        { title: "Menu refresh", body: "20 dishes per bulk batch — full menu in a session." },
        { title: "Brand consistency", body: "Same dish across delivery apps, social, menu — one workflow." },
      ]}
      sections={[
        { heading: "Why restaurants benefit", body: "Delivery apps live and die on photo quality. Same dish photographed on a cluttered restaurant table vs. on a clean background can mean 2-3x difference in order rate. Pro food photographers cost $50-200 per dish — prohibitive for restaurants with 30+ menu items.\n\nBgRemove gives restaurants studio-quality cutouts for free. Photograph dishes in your own kitchen with phone lighting, run through BgRemove, composite onto a branded background that matches your menu aesthetic, upload to delivery apps." },
        { heading: "Workflow for restaurant managers", body: "Plate dishes carefully — assume the cutout will reveal every detail.\n\nPhoto with phone camera on a natural-light spot in your kitchen.\n\nDrop a batch into /bulk on BgRemove.\n\nDownload transparent PNGs.\n\nIn Canva: build menu template with brand colour or warm neutral background.\n\nDrop each PNG. Add menu name and price overlay.\n\nUpload to Uber Eats, DoorDash, Talabat, and your own ordering page.\n\nTotal time for 30-dish menu: about 2 hours. Replaces a $3000+ food photography session." },
        { heading: "Branded campaigns and seasonal launches", body: "Same workflow extends beyond menus. Holiday menus, limited-time offers (LTOs), Ramadan iftar bundles, summer specials — clean food cutouts let you ship campaign creatives in hours instead of weeks. For multi-location restaurants, ship one master campaign across every location's delivery presence." },
      ]}
      faqs={faqs} faqTitle="Frequently asked questions"
      related={[
        { href: "/bulk/", label: "Bulk processing" },
        { href: "/background-remover-for-instagram/", label: "For Instagram food brands" },
        { href: "/", label: "Back to background remover" },
      ]}
      relatedTitle="Related tools" ctaTitle="Refresh your menu today"
      ctaSubtitle="Free, fast, bulk-ready." ctaButton="Start now" ctaHref="/" />
  </>);
}
