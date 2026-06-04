import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { SeoLanding } from "@/components/seo-landing";
import { webAppSchema, buildFaqSchema } from "@/lib/schema-locale";
import { SITE } from "@/lib/site";
const URL = `${SITE.url}/remove-background-from-passport-photo/`;
const TITLE = "Free Passport Photo Background Remover — White Background for Visas";
const DESC = "Create passport, visa, and ID photos with proper white backgrounds. Free, in your browser. Works for US, UK, Schengen, India, UAE — every country's spec.";
const faqs = [
  { q: "Will this meet US passport requirements?", a: "Yes. US passport: 2×2 inch, white/off-white background. Get transparent PNG, add white layer in Canva, crop to 2×2 inch using /tools/image-resizer." },
  { q: "UK visa, Schengen, Indian passport?", a: "Yes — same workflow, just different sizes. UK: 45×35mm light grey or cream. Schengen: 35×45mm white. India: 35×45mm plain white." },
  { q: "Can I do this at home without a studio?", a: "Yes. Stand against a white wall, natural light from front (window), phone camera. AI handles the rest. Saves $20-50 per studio visit." },
  { q: "Is the photo private?", a: "Yes. Critical for ID documents. All processing local — your passport photo never leaves your device." },
  { q: "Do I need a specific size?", a: "Use our /tools/image-resizer after BG removal to crop to country-specific dimensions." },
  { q: "What about red-eye or under-eye shadows?", a: "BgRemove only handles background. For red-eye removal, use a phone photo editor; for shadows, ensure even front lighting before shooting." },
  { q: "Will my country's passport office accept it?", a: "Yes if the photo itself meets their spec (neutral expression, proper lighting, correct size). The background being studio-clean is just a positive." },
];
export const metadata: Metadata = { title: TITLE, description: DESC, alternates: { canonical: URL } };
export default function Page() {
  return (<><JsonLd data={[webAppSchema({ bcp47: "en-US", url: URL, name: "Passport Photo BG Remover", description: DESC }), buildFaqSchema("en-US", faqs)]} />
    <SeoLanding eyebrow="Passport, Visa, ID Photos" title="Passport photo background remover"
      description="Create compliant passport, visa, and ID photos with proper white backgrounds for free. Works for every country's spec. Take a phone selfie at home, get a studio-grade ID photo in 30 seconds."
      trustPills={[{ icon: "lock", label: "ID photo private" }, { icon: "zap", label: "30 seconds" }, { icon: "sparkles", label: "Free" }]}
      bullets={[
        { title: "Every country", body: "US, UK, Schengen, India, UAE, Saudi — all spec-compatible." },
        { title: "At-home shooting", body: "No studio visit needed — phone selfie against a wall is enough." },
        { title: "ID photo private", body: "Document photos never touch a server." },
        { title: "Multi-purpose", body: "Passport, visa, driving license, work permit — same workflow." },
      ]}
      sections={[
        { heading: "How to shoot a passport photo at home", body: "Stand against a plain white or light wall.\n\nNatural window light from front — no shadows on face or background.\n\nPhone front camera at eye level. Neutral expression.\n\nUpload to BgRemove. Get transparent PNG.\n\nIn Canva: add white background layer.\n\nUse /tools/image-resizer to crop to country-specific size (US 2×2 inch, Schengen 35×45mm, etc.).\n\nPrint at any photo printing service or upload digitally to government portals." },
        { heading: "Country-specific requirements", body: "United States passport: 2×2 inch, white or off-white background.\n\nUS visa: 2×2 inch white.\n\nUK passport: 45×35mm, light grey or cream.\n\nSchengen visa: 35×45mm white.\n\nIndia passport: 35×45mm plain white.\n\nUAE residency/visa: 35×45mm white.\n\nSaudi visa: 4×6cm white.\n\nMost government portals now accept digital upload — no need to print." },
        { heading: "Better than a studio?", body: "Studios charge $15-50 per photo session. The result is often just a single fixed crop, lit by their lighting (which may not flatter you). Home shooting + BgRemove gives you unlimited tries to get the expression right, total control over lighting and clothing, and zero cost. For travelers needing multiple visa applications, it's a 90% cost saving with equivalent quality." },
      ]}
      faqs={faqs} faqTitle="Frequently asked questions"
      related={[
        { href: "/tools/image-resizer/", label: "Image resizer (crop to passport spec)" },
        { href: "/remove-background-from-signature/", label: "Signature background remover" },
        { href: "/portrait-background-remover/", label: "General portrait remover" },
        { href: "/", label: "Back to background remover" },
      ]}
      relatedTitle="Related tools" ctaTitle="Create your passport photo at home"
      ctaSubtitle="Free, private, 30 seconds." ctaButton="Start now" ctaHref="/" />
  </>);
}
