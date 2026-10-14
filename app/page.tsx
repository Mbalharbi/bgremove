import { HomeHero } from "@/components/home/home-hero";
import { HomeHowItWorks } from "@/components/home/home-how-it-works";
import { HomeComparison } from "@/components/home/home-comparison";
import { HomeFaq } from "@/components/home/home-faq";
import { HomeRelatedTools } from "@/components/home/home-related-tools";
import { HomeUseCases } from "@/components/home/home-use-cases";
import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { JsonLd } from "@/components/json-ld";
import {
  webApplicationSchema,
  faqSchema,
  howToSchema,
  organizationSchema,
  websiteSchema,
} from "@/lib/schema";

// hreflang lives here (not in the root layout) so other pages don't inherit it.
export const metadata: Metadata = {
  alternates: {
    canonical: `${SITE.url}/`,
    types: { "application/rss+xml": `${SITE.url}/feed.xml` },
    languages: {
      "en-US": `${SITE.url}/`,
      "hi-IN": `${SITE.url}/hi/`,
      "id-ID": `${SITE.url}/id/`,
      "pt-BR": `${SITE.url}/pt/`,
      "es-ES": `${SITE.url}/es/`,
      "ar": `${SITE.url}/ar/`,
      "de-DE": `${SITE.url}/de/`,
      "zh-CN": `${SITE.url}/zh/`,
      "x-default": `${SITE.url}/`,
    },
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={[
          websiteSchema,
          organizationSchema,
          webApplicationSchema,
          howToSchema,
          faqSchema,
        ]}
      />
      <HomeHero />
      <HomeHowItWorks />
      <HomeUseCases />
      <HomeComparison />
      <HomeRelatedTools />
      <HomeFaq />
    </>
  );
}
