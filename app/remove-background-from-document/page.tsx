import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { SeoLanding } from "@/components/seo-landing";
import { webAppSchema, buildFaqSchema } from "@/lib/schema-locale";
import { SITE } from "@/lib/site";
const URL = `${SITE.url}/remove-background-from-document/`;
const TITLE = "Remove Background from Scanned Documents — Free, Keeps Every Letter";
const DESC = "Remove the grey or yellow background from scanned documents, forms and contracts — or make it pure white. Keeps every letter sharp. Free, private, runs in your browser.";
const faqs = [
  { q: "How do I make a scanned page's background white?", a: "Drop the scan, keep the detected paper colour, press Apply, then choose the white swatch under Background and download. You get clean black text on a pure white page." },
  { q: "Will it erase any of the text?", a: "No. For documents the tool starts in Solid-colour mode: it removes only the paper colour you pick, so every letter, line and stamp stays intact. (The AI mode is built for photos and can erase text, so it isn't used here unless you choose it.)" },
  { q: "The paper is uneven or shadowed — what then?", a: "Raise the Tolerance slider until the traces disappear, or click a darker area of the paper to pick that colour. Very uneven phone scans may still need the touch-up brush for leftover spots." },
  { q: "Works on photos of documents (phone scans)?", a: "Yes, best when the page is evenly lit and photographed straight on." },
  { q: "Are my documents uploaded?", a: "No. Everything runs in your browser — important for contracts, IDs and medical records. You can verify it in DevTools → Network." },
  { q: "Can I do this before signing a PDF?", a: "Yes. Clean the page here, then add your signature as a transparent PNG from the signature background remover." },
  { q: "Works on Arabic or Chinese documents?", a: "Yes. It only looks at colours, not the language of the text." },
];
export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: URL, languages: { "en-US": URL, ar: `${SITE.url}/ar/remove-background-from-document/`, "x-default": URL } },
};
export default function Page() {
  return (<><JsonLd data={[webAppSchema({ bcp47: "en-US", url: URL, name: "Document Background Remover", description: DESC }), buildFaqSchema("en-US", faqs)]} />
    <SeoLanding eyebrow="Scanned documents & forms" title="Remove background from scanned documents"
      description="Remove the grey or yellow paper background from scans and phone photos of documents — or make it pure white — without losing a single letter."
      toolMode="solid"
      trustPills={[{ icon: "lock", label: "Documents stay on your device" }, { icon: "zap", label: "Phone scans work" }, { icon: "sparkles", label: "Free" }]}
      bullets={[
        { title: "Keeps every letter", body: "Removes only the paper colour — text, lines and stamps stay exactly as scanned." },
        { title: "Pure white background", body: "One click on the white swatch turns a grey scan into a clean white page." },
        { title: "Phone scans OK", body: "No flatbed scanner needed — an evenly lit phone photo works." },
        { title: "Legal-grade privacy", body: "Contracts and ID documents never touch a server." },
      ]}
      sections={[
        { heading: "Why a document needs a different tool", body: "Most background removers use AI trained to find one object, like a person or a product. On a document there is no single object — just text — so the AI can treat letters as background and erase them.\n\nThat's why this page starts in Solid-colour mode: it removes the colour of the paper and nothing else. If your image is actually a photo rather than a page, choose “Use AI instead”." },
        { heading: "How to clean a scanned page", body: "Drop the scan or phone photo.\n\nThe paper colour is detected automatically — or click the paper to pick it.\n\nRaise Tolerance if grey traces remain, then press Apply.\n\nFor a white page, pick the white swatch under Background. For a transparent PNG, keep Transparent.\n\nDownload. For multi-page documents, repeat per page and combine into a PDF with any free PDF tool." },
        { heading: "Privacy for legal and sensitive documents", body: "Contracts, NDAs, ID cards and medical records are exactly the files you shouldn't upload to a stranger's server. Here the page never leaves your browser: open DevTools → Network, drop the document, and watch — nothing is uploaded." },
      ]}
      faqs={faqs} faqTitle="Frequently asked questions"
      related={[
        { href: "/remove-background-from-signature/", label: "Signature background remover" },
        { href: "/remove-background-from-passport-photo/", label: "Passport photos" },
        { href: "/privacy-proof/", label: "Privacy proof" },
        { href: "/", label: "Back to background remover" },
      ]}
      relatedTitle="Related tools" ctaTitle="Clean a document right now"
      ctaSubtitle="Free, private, keeps every letter." ctaButton="Start now" ctaHref="/remove-background-from-document/" />
  </>);
}
