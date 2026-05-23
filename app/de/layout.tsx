import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { SITE_DE } from "@/lib/site-de";

export const metadata: Metadata = {
  title: { default: SITE_DE.title, template: `%s | ${SITE.name}` },
  description: SITE_DE.description,
  alternates: {
    canonical: SITE_DE.url,
    languages: { "en-US": SITE.url, "de-DE": SITE_DE.url, "x-default": SITE.url },
  },
  openGraph: {
    type: "website", locale: "de_DE", alternateLocale: ["en_US"],
    url: SITE_DE.url, siteName: SITE.name, title: SITE_DE.title, description: SITE_DE.description,
    images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: { card: "summary_large_image", title: SITE_DE.title, description: SITE_DE.description, images: [SITE.ogImage] },
};

export default function GermanLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div lang="de-DE">{children}</div>;
}
