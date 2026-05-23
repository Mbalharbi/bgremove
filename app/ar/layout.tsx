import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import Script from "next/script";
import { SITE } from "@/lib/site";
import { SITE_AR } from "@/lib/site-ar";

// Arabic-friendly font, self-hosted via next/font.
const cairo = Cairo({
  subsets: ["arabic", "latin"],
  display: "swap",
  variable: "--font-cairo",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: { default: SITE_AR.title, template: `%s | ${SITE.name}` },
  description: SITE_AR.description,
  alternates: {
    canonical: SITE_AR.url,
    languages: {
      "en-US": SITE.url,
      "ar": SITE_AR.url,
      "x-default": SITE.url,
    },
  },
  openGraph: {
    type: "website",
    locale: "ar_SA",
    alternateLocale: ["en_US"],
    url: SITE_AR.url,
    siteName: SITE.name,
    title: SITE_AR.title,
    description: SITE_AR.description,
    images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_AR.title,
    description: SITE_AR.description,
    images: [SITE.ogImage],
  },
};

/**
 * Arabic locale layout.
 *
 * Next.js App Router doesn't let a nested layout change the <html> tag
 * (only the root layout outputs <html>). To set lang="ar" + dir="rtl"
 * for /ar/* routes we inject a tiny pre-hydration script that updates
 * documentElement before paint — no FOUC.
 *
 * The Cairo font CSS variable is added to body via a class wrapper so
 * Arabic text uses Cairo while English fallback stays available.
 */
export default function ArabicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {/* Runs before paint via beforeInteractive — flips html lang/dir
          synchronously so the page renders RTL from the first frame. */}
      <Script id="ar-html-attrs" strategy="beforeInteractive">
        {`document.documentElement.lang="ar";document.documentElement.dir="rtl";`}
      </Script>
      <div className={`${cairo.variable} font-arabic`} dir="rtl" lang="ar">
        {children}
      </div>
    </>
  );
}
