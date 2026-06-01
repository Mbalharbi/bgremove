import type { Metadata } from "next";
import { BulkRemover } from "@/components/bulk-remover";
import { PageHeader } from "@/components/page-header";
import { JsonLd } from "@/components/json-ld";
import { webAppSchema } from "@/lib/schema-locale";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "बल्क बैकग्राउंड रिमूवर — एक साथ 20 इमेज तक",
  description: "एक बार में 20 इमेज का बैकग्राउंड हटाएं, सब आपके ब्राउज़र में। पूरा बैच ZIP में डाउनलोड करें। ना अपलोड, ना साइन-अप, फ्री।",
  alternates: { canonical: `${SITE.url}/hi/bulk/`, languages: { "en-US": `${SITE.url}/bulk/`, "hi-IN": `${SITE.url}/hi/bulk/` } },
};

export default function HiBulkPage() {
  return (
    <>
      <JsonLd data={webAppSchema({ bcp47: "hi-IN", url: `${SITE.url}/hi/bulk/`, name: "BgRemove — बल्क", description: "ब्राउज़र में एक बार में 20 इमेज तक का बैकग्राउंड हटाएं।" })} />
      <PageHeader
        eyebrow="बल्क प्रोसेसिंग"
        title="एक बार में 20 इमेज का बैकग्राउंड हटाएं"
        description="फोटो का एक बैच ड्रॉप करें और पूरा सेट ट्रांसपेरेंट PNG ZIP में पाएं। कुछ भी आपके डिवाइस से बाहर नहीं जाता — हर इमेज लोकल प्रोसेस होती है।"
      />
      <section className="container py-10"><BulkRemover /></section>
    </>
  );
}
