import type { Metadata } from "next";
import Script from "next/script";
import { SITE } from "@/lib/site";
import { SITE_HI } from "@/lib/site-hi";

export const metadata: Metadata = {
  title: { default: SITE_HI.title, template: `%s | ${SITE.name}` },
  description: SITE_HI.description,
  alternates: {
    canonical: SITE_HI.url,
    languages: { "en-US": SITE.url, "hi-IN": SITE_HI.url, "x-default": SITE.url },
  },
  openGraph: {
    type: "website", locale: "hi_IN", alternateLocale: ["en_US"],
    url: SITE_HI.url, siteName: SITE.name, title: SITE_HI.title, description: SITE_HI.description,
    images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: { card: "summary_large_image", title: SITE_HI.title, description: SITE_HI.description, images: [SITE.ogImage] },
};

export default function HindiLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Script id="hi-html-attrs" strategy="beforeInteractive">
        {`document.documentElement.lang="hi-IN";`}
      </Script>
      <div lang="hi-IN">{children}</div>
    </>
  );
}
