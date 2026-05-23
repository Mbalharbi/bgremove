import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { SITE_ES } from "@/lib/site-es";

export const metadata: Metadata = {
  title: { default: SITE_ES.title, template: `%s | ${SITE.name}` },
  description: SITE_ES.description,
  alternates: {
    canonical: SITE_ES.url,
    languages: { "en-US": SITE.url, "es-ES": SITE_ES.url, "x-default": SITE.url },
  },
  openGraph: {
    type: "website", locale: "es_ES", alternateLocale: ["en_US"],
    url: SITE_ES.url, siteName: SITE.name, title: SITE_ES.title, description: SITE_ES.description,
    images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: { card: "summary_large_image", title: SITE_ES.title, description: SITE_ES.description, images: [SITE.ogImage] },
};

export default function SpanishLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div lang="es-ES">{children}</div>;
}
