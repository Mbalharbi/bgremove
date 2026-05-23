import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import { SITE } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "background remover",
    "remove background",
    "remove bg",
    "image background remover",
    "free background remover",
    "transparent background",
    "png maker",
    "browser background removal",
    "private background remover",
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  publisher: SITE.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: SITE.url,
    types: { "application/rss+xml": `${SITE.url}/feed.xml` },
    languages: {
      "en-US": SITE.url,
      "ar": `${SITE.url}/ar`,
      "pt-BR": `${SITE.url}/pt`,
      "de-DE": `${SITE.url}/de`,
      "es-ES": `${SITE.url}/es`,
      "zh-CN": `${SITE.url}/zh`,
      "x-default": SITE.url,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
    images: [
      {
        url: SITE.ogImage,
        width: 1200,
        height: 630,
        alt: SITE.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
    images: [SITE.ogImage],
    creator: SITE.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Next.js auto-detects app/icon.svg and app/apple-icon.svg.
  // PNG variants in /public are listed below for older browsers and PWA installers.
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.json",
  category: "technology",
  verification: {
    other: {
      "msvalidate.01": "E8C4754DB79A31C17DFAEAFFB7398139",
    },
  },
  other: {
    "msapplication-TileColor": "#10b981",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
          >
            Skip to main content
          </a>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main id="main" className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>

        {/*
          ============================================================
          GOOGLE ANALYTICS 4 — REPLACE G-PLACEHOLDER WITH YOUR GA_ID
          1. Get your Measurement ID from analytics.google.com
          2. Replace SITE.gaId in lib/site.ts (G-XXXXXXXXXX)
          3. Uncomment the two <Script> tags below
          ============================================================
        */}
        {/*
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${SITE.gaId}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${SITE.gaId}', { anonymize_ip: true });
          `}
        </Script>
        */}

        {/*
          ============================================================
          GOOGLE ADSENSE — UNCOMMENT AFTER APPROVAL
          1. Apply at adsense.google.com once you have ~10 blog posts
          2. Replace ca-pub-XXXXXXXXXX with your publisher ID
          3. Cookie consent banner required for EU/UK traffic — see
             /components/cookie-consent.tsx (placeholder)
          ============================================================
        */}
        {/*
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        */}
      </body>
    </html>
  );
}
