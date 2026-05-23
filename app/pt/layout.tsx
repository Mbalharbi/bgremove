import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { SITE_PT } from "@/lib/site-pt";

export const metadata: Metadata = {
  title: { default: SITE_PT.title, template: `%s | ${SITE.name}` },
  description: SITE_PT.description,
  alternates: {
    canonical: SITE_PT.url,
    languages: { "en-US": SITE.url, "pt-BR": SITE_PT.url, "x-default": SITE.url },
  },
  openGraph: {
    type: "website", locale: "pt_BR", alternateLocale: ["en_US"],
    url: SITE_PT.url, siteName: SITE.name, title: SITE_PT.title, description: SITE_PT.description,
    images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: { card: "summary_large_image", title: SITE_PT.title, description: SITE_PT.description, images: [SITE.ogImage] },
};

export default function PortugueseLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div lang="pt-BR">{children}</div>;
}
