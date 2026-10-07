import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { SeoLanding } from "@/components/seo-landing";
import { webAppSchema, buildFaqSchema } from "@/lib/schema-locale";
import { SITE } from "@/lib/site";
const URL = `${SITE.url}/remove-background-from-signature/`;
const TITLE = "Remove Background from Signature — Free Transparent Signature PNG";
const DESC = "Turn a photo of your handwritten signature into a transparent PNG for PDFs, contracts, and email. Free, private, runs in your browser.";
const faqs = [
  { q: "How do I get the best signature cutout?", a: "Sign with a dark pen on plain white paper, photograph it in even daylight from straight above, and crop close to the signature before uploading." },
  { q: "Can I add the PNG to a PDF?", a: "Yes. Most PDF editors (Adobe Acrobat, Preview on Mac, Microsoft Edge, many free web tools) let you insert an image — place the transparent PNG over the signature line." },
  { q: "Is my signature uploaded anywhere?", a: "No. The AI runs entirely in your browser, so your signature never reaches a server. You can confirm in DevTools → Network while you process it." },
  { q: "Does it work with blue ink?", a: "Yes. Ink color is kept as-is; only the paper background is removed." },
  { q: "Will it work on a photo taken with my phone?", a: "Yes. Phone photos work well as long as the paper is evenly lit and the signature is in focus." },
  { q: "Is an image of my signature legally binding?", a: "It depends on your country and the document. Many everyday agreements accept an inserted signature image; for regulated documents use a certified e-signature service." },
];
export const metadata: Metadata = { title: TITLE, description: DESC, alternates: { canonical: URL } };
export default function Page() {
  return (<><JsonLd data={[webAppSchema({ bcp47: "en-US", url: URL, name: "Signature BG Remover", description: DESC }), buildFaqSchema("en-US", faqs)]} />
    <SeoLanding eyebrow="Signatures" title="Signature background remover"
      description="Photograph your signature on paper and get a clean transparent PNG to drop into PDFs, contracts, and email footers. Free and private."
      trustPills={[{ icon: "lock", label: "Never uploaded" }, { icon: "zap", label: "Phone photos work" }, { icon: "sparkles", label: "Free" }]}
      bullets={[
        { title: "Transparent PNG", body: "Only the ink stays — paper, shadows, and texture are removed." },
        { title: "Keeps ink color", body: "Black, blue, or any pen color stays exactly as you signed." },
        { title: "PDF-ready", body: "Drop it onto a signature line in any PDF or document editor." },
        { title: "Stays on your device", body: "Your signature is never sent to a server." },
      ]}
      sections={[
        { heading: "Why make a transparent signature", body: "A photo of a signature carries the paper with it — a grey or yellow box that looks out of place on a white document. A transparent PNG keeps only the ink, so it sits naturally on any contract, invoice, or letter.\n\nSince the signature is personal, it matters where it's processed. BgRemove runs the AI in your browser, so the image never leaves your device." },
        { heading: "How to do it", body: "Sign with a dark pen on plain white paper.\n\nPhotograph it in even light from directly above, then crop close to the signature.\n\nDrop the photo into BgRemove and download the transparent PNG.\n\nInsert the PNG into your PDF or document and resize it to fit the signature line." },
      ]}
      faqs={faqs} faqTitle="Frequently asked questions"
      related={[
        { href: "/remove-background-from-document/", label: "Document background remover" },
        { href: "/transparent-png-maker/", label: "Transparent PNG maker" },
        { href: "/privacy-proof/", label: "Privacy proof" },
        { href: "/", label: "Back to background remover" },
      ]}
      relatedTitle="Related tools" ctaTitle="Make your signature transparent"
      ctaSubtitle="Free, private, ready in seconds." ctaButton="Start now" ctaHref="/" />
  </>);
}
