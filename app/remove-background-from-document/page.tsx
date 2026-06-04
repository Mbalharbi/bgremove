import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { SeoLanding } from "@/components/seo-landing";
import { webAppSchema, buildFaqSchema } from "@/lib/schema-locale";
import { SITE } from "@/lib/site";
const URL = `${SITE.url}/remove-background-from-document/`;
const TITLE = "Free Document Background Remover — Scanned Forms and Contracts";
const DESC = "Clean up scanned documents, forms, and contracts. Remove gray/yellowing background, isolate document for digital archiving. Free, browser-based.";
const faqs = [
  { q: "Cleans up scanned document backgrounds?", a: "Yes. Yellow paper, grey shadows from imperfect scans, coffee stains — all removable. Useful before OCR." },
  { q: "Works on photos of documents (phone scan)?", a: "Yes. Phone photos of contracts, ID cards, certificates work well. Especially useful when a flatbed scanner isn't available." },
  { q: "Does it preserve text legibility?", a: "Yes. Background removal only affects background pixels; foreground text and lines remain pixel-perfect." },
  { q: "Document privacy is critical — is processing local?", a: "Yes. Critical for legal documents, contracts, medical records. All processing browser-only. Verify with DevTools." },
  { q: "Can I do this before signing a PDF?", a: "Yes. Clean the document first (this tool), then sign and merge with your signature PNG from /remove-background-from-signature." },
  { q: "Works on Arabic or Chinese documents?", a: "Yes. AI is language-agnostic. Cuts background regardless of text content." },
  { q: "Will OCR work better after?", a: "Generally yes. Cleaner background reduces OCR errors from page texture and scan artifacts." },
];
export const metadata: Metadata = { title: TITLE, description: DESC, alternates: { canonical: URL } };
export default function Page() {
  return (<><JsonLd data={[webAppSchema({ bcp47: "en-US", url: URL, name: "Document BG Remover", description: DESC }), buildFaqSchema("en-US", faqs)]} />
    <SeoLanding eyebrow="Documents & Forms" title="Document background remover"
      description="Clean up scanned documents, forms, contracts, certificates. Remove yellowing, shadows, and scan artifacts. Free, browser-only, language-agnostic."
      trustPills={[{ icon: "lock", label: "Documents private" }, { icon: "zap", label: "Phone scans work" }, { icon: "sparkles", label: "Free" }]}
      bullets={[
        { title: "Scan cleanup", body: "Yellowing, shadows, page texture — all removed cleanly." },
        { title: "Phone scans OK", body: "No flatbed scanner needed — phone camera works." },
        { title: "Text preserved", body: "Foreground text and signatures remain pixel-perfect." },
        { title: "Legal-grade privacy", body: "Contracts and ID docs never touch a server." },
      ]}
      sections={[
        { heading: "Why document workers need this", body: "Scanned documents — especially from phone cameras — accumulate background artifacts: page texture, yellow tinting, scan-edge shadows, coffee stains. For archival, OCR, or digital signing, these artifacts reduce quality and increase OCR errors.\n\nBgRemove cleans documents in seconds. Combined with a fresh white background layer in any editor, the result looks like a freshly-printed original. Useful for legal teams, real estate agents, freelancers, and remote workers." },
        { heading: "Workflow for document cleanup", body: "Scan or photograph document at highest resolution available.\n\nDrop into BgRemove.\n\nGet transparent PNG of just the document content.\n\nIn Canva or any editor: add a white rectangle behind it.\n\nExport as PDF for archival, or PNG for further editing.\n\nFor multi-page documents: process pages individually, then combine into PDF using a free PDF tool." },
        { heading: "Privacy for legal and sensitive documents", body: "Contracts, NDAs, ID cards, medical records — all benefit from BG cleanup, but uploading to a cloud service is a privacy risk. Many cloud document tools quietly store uploads for ML training or 'temporary processing'.\n\nBgRemove eliminates that risk. The document never leaves your browser. Open DevTools → Network tab → drop your document → watch the empty network log. No legal exposure, no compliance question, no leak risk." },
      ]}
      faqs={faqs} faqTitle="Frequently asked questions"
      related={[
        { href: "/remove-background-from-signature/", label: "Signature background remover" },
        { href: "/remove-background-from-passport-photo/", label: "Passport photos" },
        { href: "/privacy-proof/", label: "Privacy proof" },
        { href: "/", label: "Back to background remover" },
      ]}
      relatedTitle="Related tools" ctaTitle="Clean a document right now"
      ctaSubtitle="Free, private, legal-grade." ctaButton="Start now" ctaHref="/" />
  </>);
}
