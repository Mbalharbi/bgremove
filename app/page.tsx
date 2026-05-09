import { HomeHero } from "@/components/home/home-hero";
import { HomeHowItWorks } from "@/components/home/home-how-it-works";
import { HomeComparison } from "@/components/home/home-comparison";
import { HomeFaq } from "@/components/home/home-faq";
import { HomeUseCases } from "@/components/home/home-use-cases";
import { JsonLd } from "@/components/json-ld";
import {
  webApplicationSchema,
  faqSchema,
  howToSchema,
  organizationSchema,
} from "@/lib/schema";

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={[
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
      <HomeFaq />
    </>
  );
}
