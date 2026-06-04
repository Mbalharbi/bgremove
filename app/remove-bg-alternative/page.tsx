import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { SeoLanding } from "@/components/seo-landing";
import { webAppSchema, buildFaqSchema } from "@/lib/schema-locale";
import { SITE } from "@/lib/site";
const URL = `${SITE.url}/remove-bg-alternative/`;
const TITLE = "Best Remove.bg Alternative — Free, No Credits, No Upload";
const DESC = "Free Remove.bg alternative with no credit limits and no upload to servers. Same quality, your photos stay private. Built on RMBG-1.4.";
const faqs = [
  { q: "Why look for a Remove.bg alternative?", a: "Remove.bg's free tier gives one HD image per month — useless for actual work. Paid plans start at $0.20/image and require uploading every photo. For frequent users or privacy-sensitive workflows, that's a hard wall." },
  { q: "How does this compare on quality?", a: "BgRemove uses RMBG-1.4, the open-source model that's currently competitive with Remove.bg's commercial pipeline. On product photos, portraits, and complex edges, results are equal or better." },
  { q: "Is it really free with no limits?", a: "Yes. No credits, no per-image fee, no daily quota, no account required. The tool runs in your browser using your own CPU/GPU, so there's no marginal server cost to fund." },
  { q: "What about resolution?", a: "Output up to 4096px. Remove.bg's high-resolution output is a paid feature; here it's free." },
  { q: "How is privacy different?", a: "Remove.bg uploads every image to their servers for processing. BgRemove runs entirely in your browser — images never leave your device. Verify with DevTools → Network tab during processing." },
  { q: "Does it have an API?", a: "Not currently. The web UI handles bulk (20 at once) for most use cases. API access is on the roadmap." },
  { q: "Will Remove.bg be better for some cases?", a: "Edge cases like extremely fine hair or very specific commercial product categories may still favor Remove.bg's tuned pipeline. For 95%+ of use cases, BgRemove matches or beats them." },
];
export const metadata: Metadata = { title: TITLE, description: DESC, alternates: { canonical: URL } };
export default function Page() {
  return (<><JsonLd data={[webAppSchema({ bcp47: "en-US", url: URL, name: "Remove.bg Alternative", description: DESC }), buildFaqSchema("en-US", faqs)]} />
    <SeoLanding eyebrow="Remove.bg Alternative" title="Best Remove.bg alternative"
      description="Free, no credit limits, no upload to servers. Same quality (built on RMBG-1.4), no account required. The Remove.bg alternative for people who actually use the tool regularly."
      trustPills={[{ icon: "lock", label: "No account" }, { icon: "zap", label: "No credits" }, { icon: "sparkles", label: "100% free" }]}
      bullets={[
        { title: "Unlimited", body: "Remove.bg: 1 HD/month. Here: unlimited." },
        { title: "High-res included", body: "Up to 4096px. Remove.bg makes you pay for HD." },
        { title: "Privacy", body: "Photos stay in browser. Remove.bg uploads to their servers." },
        { title: "Bulk free", body: "20 images at once. Remove.bg's API is paid." },
      ]}
      sections={[
        { heading: "Why Remove.bg has a problem", body: "Remove.bg pioneered AI background removal but locked behind credits. For a regular user processing 100 images per month, that's $20/month — $240/year. For ecommerce sellers with hundreds of SKUs, it's prohibitive.\n\nThe free tier is essentially a demo: one HD image per month. Anyone doing real work hits the paywall immediately." },
        { heading: "How BgRemove is free forever", body: "Three architectural differences make free possible:\n\n1. The AI model (RMBG-1.4) is open-source. We don't pay licensing fees per inference.\n\n2. Inference runs in YOUR browser using YOUR CPU/GPU. We have zero marginal cost per image.\n\n3. The site is static, hosted on Cloudflare's free tier. No backend, no database, no API quotas.\n\nResult: free for users, sustainable for us. No bait-and-switch." },
        { heading: "Migration from Remove.bg", body: "Cancel your Remove.bg subscription (optional).\n\nBookmark bgremovers.org.\n\nDrop images instead of uploading.\n\nSame quality, same speed (faster after the one-time 44MB model download).\n\nNo workflow changes for users; major workflow improvement for teams handling sensitive product photography." },
      ]}
      faqs={faqs} faqTitle="Frequently asked questions"
      related={[
        { href: "/bgremovers-vs-remove-bg/", label: "Detailed comparison: BgRemove vs Remove.bg" },
        { href: "/privacy-proof/", label: "Privacy proof — verify no upload" },
        { href: "/", label: "Open the tool" },
      ]}
      relatedTitle="Related" ctaTitle="Switch from Remove.bg today"
      ctaSubtitle="No credit card needed." ctaButton="Try free now" ctaHref="/" />
  </>);
}
