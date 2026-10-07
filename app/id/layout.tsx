import type { Metadata } from "next";
import Script from "next/script";
import { SITE } from "@/lib/site";
import { SITE_ID } from "@/lib/site-id";

export const metadata: Metadata = {
  title: { absolute: SITE_ID.title, template: `%s | ${SITE.name}` },
  description: SITE_ID.description,
  alternates: {
    canonical: SITE_ID.url,
    languages: { "en-US": SITE.url, "id-ID": SITE_ID.url, "x-default": SITE.url },
  },
  openGraph: {
    type: "website", locale: "id_ID", alternateLocale: ["en_US"],
    url: SITE_ID.url, siteName: SITE.name, title: SITE_ID.title, description: SITE_ID.description,
    images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: { card: "summary_large_image", title: SITE_ID.title, description: SITE_ID.description, images: [SITE.ogImage] },
};

export default function IndonesianLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Script id="id-html-attrs" strategy="beforeInteractive">
        {`document.documentElement.lang="id-ID";`}
      </Script>
      <div lang="id-ID">{children}</div>
    </>
  );
}
