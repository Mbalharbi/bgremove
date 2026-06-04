import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { SeoLanding } from "@/components/seo-landing";
import { webAppSchema, buildFaqSchema } from "@/lib/schema-locale";
import { SITE } from "@/lib/site";
const URL = `${SITE.url}/erase-bg-alternative/`;
const TITLE = "Best Erase.bg Alternative — Free, Browser-Only, No Upload";
const DESC = "Free Erase.bg alternative running entirely in your browser. No signup, no credit limits, no upload to servers. Same RMBG-1.4 model, better privacy.";
const faqs = [
  { q: "Why switch from Erase.bg?", a: "Erase.bg's free tier limits image dimensions and adds friction with account requirements. BgRemove gives you full resolution, no signup, browser-only processing." },
  { q: "Same quality?", a: "Both use modern AI background removal. BgRemove uses RMBG-1.4 — equivalent or better than Erase.bg's commercial pipeline for most use cases." },
  { q: "Faster?", a: "After the one-time 44MB model download, processing is local on your CPU/GPU. No upload latency, no server queue. Often faster than Erase.bg." },
  { q: "Privacy improvement?", a: "Major. Erase.bg uploads every image to their servers. BgRemove processes everything in your browser. Verify with DevTools." },
  { q: "Bulk processing?", a: "Yes, 20 images at once via /bulk. Free." },
  { q: "Will Erase.bg API still be needed?", a: "If you need programmatic processing in a server-side workflow, yes. For interactive desktop/mobile use, BgRemove replaces Erase.bg completely." },
];
export const metadata: Metadata = { title: TITLE, description: DESC, alternates: { canonical: URL } };
export default function Page() {
  return (<><JsonLd data={[webAppSchema({ bcp47: "en-US", url: URL, name: "Erase.bg Alternative", description: DESC }), buildFaqSchema("en-US", faqs)]} />
    <SeoLanding eyebrow="Erase.bg Alternative" title="Best Erase.bg alternative"
      description="Free Erase.bg alternative — browser-only, no signup, no credit limits, full-resolution output. Same RMBG-1.4 quality, better privacy."
      trustPills={[{ icon: "lock", label: "No signup" }, { icon: "zap", label: "No upload" }, { icon: "sparkles", label: "Free" }]}
      bullets={[
        { title: "No account", body: "Erase.bg requires signup. BgRemove doesn't." },
        { title: "Full resolution", body: "Up to 4096px output, no dimension limits." },
        { title: "Privacy", body: "Photos processed locally, never sent to a server." },
        { title: "Same AI quality", body: "RMBG-1.4 model — competitive with Erase.bg's pipeline." },
      ]}
      sections={[
        { heading: "What's wrong with Erase.bg", body: "Erase.bg has solid AI quality but the user experience has friction: signup required, daily limits on the free tier, dimension restrictions, and every image is uploaded to their servers.\n\nFor occasional use it's fine. For regular workflows or privacy-sensitive use cases (product photography, ID documents, client headshots), the upload step and account wall are real frustrations." },
        { heading: "How BgRemove improves it", body: "No signup. Open the site, drop image, get result. Same experience every visit.\n\nNo dimension limit. Process 4096×4096 images in the free tier.\n\nNo upload. Inference runs in your browser. Verify with DevTools → Network tab.\n\nSame quality. Both tools use modern transformer-based BG removal models with similar performance profiles." },
        { heading: "When Erase.bg is still useful", body: "Erase.bg has an API and SDK for server-side integration. BgRemove is currently web-only. If you need programmatic BG removal in a server pipeline (uploading 10,000 images via API), Erase.bg's API is currently the better fit. For 95% of interactive use cases, BgRemove is the upgrade." },
      ]}
      faqs={faqs} faqTitle="Frequently asked questions"
      related={[
        { href: "/remove-bg-alternative/", label: "Remove.bg alternative" },
        { href: "/bgremovers-vs-erase-bg/", label: "Detailed: BgRemove vs Erase.bg" },
        { href: "/", label: "Open the tool" },
      ]}
      relatedTitle="Related" ctaTitle="Switch from Erase.bg"
      ctaSubtitle="No signup, no upload." ctaButton="Try now" ctaHref="/" />
  </>);
}
