import type { Metadata } from "next";
import Script from "next/script";
import { SITE } from "@/lib/site";
import { SITE_ZH } from "@/lib/site-zh";

export const metadata: Metadata = {
  title: { default: SITE_ZH.title, template: `%s | ${SITE.name}` },
  description: SITE_ZH.description,
  alternates: {
    canonical: SITE_ZH.url,
    languages: { "en-US": SITE.url, "zh-CN": SITE_ZH.url, "x-default": SITE.url },
  },
  openGraph: {
    type: "website", locale: "zh_CN", alternateLocale: ["en_US"],
    url: SITE_ZH.url, siteName: SITE.name, title: SITE_ZH.title, description: SITE_ZH.description,
    images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: { card: "summary_large_image", title: SITE_ZH.title, description: SITE_ZH.description, images: [SITE.ogImage] },
};

/**
 * Chinese-specific layout. Flips html lang to zh-CN via pre-hydration
 * script — helps Baidu/Bing recognise content language.
 */
export default function ChineseLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Script id="zh-html-attrs" strategy="beforeInteractive">
        {`document.documentElement.lang="zh-CN";`}
      </Script>
      <div lang="zh-CN">{children}</div>
    </>
  );
}
