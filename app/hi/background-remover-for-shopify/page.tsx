import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { SeoLanding } from "@/components/seo-landing";
import { webAppSchema, buildFaqSchema } from "@/lib/schema-locale";
import { SITE } from "@/lib/site";

const URL = `${SITE.url}/hi/background-remover-for-shopify/`;
const TITLE = "Shopify स्टोर्स के लिए बैकग्राउंड रिमूवर — कैटलॉग रेडी फ्री";
const DESC = "Shopify प्रोडक्ट इमेज के लिए साफ कटआउट — ट्रांसपेरेंट PNG या सफेद बैकग्राउंड। फ्री, बल्क, प्राइवेट।";

const faqs = [
  { q: "क्या Shopify पर ट्रांसपेरेंट PNG चलती है?", a: "हाँ। Shopify ट्रांसपेरेंसी सपोर्ट करता है — आपके थीम के बैकग्राउंड के साथ ब्लेंड होगा।" },
  { q: "क्या ब्रांडेड बैकग्राउंड भी एड कर सकते हैं?", a: "हाँ। ट्रांसपेरेंट PNG डाउनलोड करके कैनवा में अपनी ब्रांड कलर बैकग्राउंड एड करें।" },
  { q: "Dropshippers के लिए भी अच्छा?", a: "हाँ। सप्लायर फोटो को अपनी ब्रांडिंग के साथ रीप्रोसेस करें।" },
  { q: "Shopify फोटो रिक्वायरमेंट क्या है?", a: "कोई स्ट्रिक्ट साइज़ नहीं — 2048x2048 सजेस्टेड। यह टूल 4096px तक आउटपुट देता है।" },
  { q: "मल्टी-स्टोर सपोर्ट?", a: "जितना चाहें यूज़ करें — कोई लिमिट नहीं।" },
];

export const metadata: Metadata = { title: TITLE, description: DESC, alternates: { canonical: URL } };

export default function Page() {
  return (
    <>
      <JsonLd data={[webAppSchema({ bcp47: "hi-IN", url: URL, name: "BgRemove Shopify", description: DESC }), buildFaqSchema("hi-IN", faqs)]} />
      <SeoLanding
        eyebrow="Shopify स्टोर्स"
        title="Shopify के लिए बैकग्राउंड रिमूवर"
        description="कैटलॉग रेडी प्रोडक्ट कटआउट्स — ट्रांसपेरेंट या ब्रांडेड बैकग्राउंड के साथ।"
        trustPills={[{ icon: "lock", label: "प्राइवेट" }, { icon: "zap", label: "बल्क" }, { icon: "sparkles", label: "फ्री" }]}
        bullets={[
          { title: "Shopify रेडी", body: "2048x2048 सजेस्टेड साइज़ — 4096px तक आउटपुट।" },
          { title: "ब्रांडेड लुक", body: "ट्रांसपेरेंट PNG + ब्रांड बैकग्राउंड = प्रीमियम कैटलॉग।" },
          { title: "Dropshipper-फ्रेंडली", body: "सप्लायर फोटो को रीब्रांड करें।" },
          { title: "बल्क", body: "20 SKU एक साथ।" },
        ]}
        sections={[
          { heading: "Shopify थीम के साथ कैसे फिट करें", body: "अधिकांश Shopify थीम सफेद/लाइट बैकग्राउंड पर अच्छे दिखते हैं। ट्रांसपेरेंट PNG थीम के बैकग्राउंड कलर के साथ नेचुरली ब्लेंड करता है। डार्क थीम पर भी फिट — कोई सफेद बॉक्स नहीं।" },
          { heading: "Dropshipping वर्कफ्लो", body: "AliExpress/सप्लायर से प्रोडक्ट इमेज डाउनलोड करें।\n\nBgRemove में बैकग्राउंड हटाएं।\n\nकैनवा में अपनी ब्रांड कलर बैकग्राउंड एड करें।\n\nShopify पर अपलोड — कैटलॉग प्रोफेशनल दिखेगा।" },
          { heading: "स्टोरफ्रंट टिप्स", body: "सब प्रोडक्ट के लिए कंसिस्टेंट बैकग्राउंड — सब सफेद, या सब ब्रांड कलर।\n\nLifestyle फोटो ऐडिशनल इमेज के तौर पर — मेन हमेशा क्लीन।\n\nहर एंगल (फ्रंट, साइड, बैक) के लिए सेम स्टाइल।" },
        ]}
        faqs={faqs}
        faqTitle="अक्सर पूछे जाने वाले सवाल"
        related={[
          { href: "/hi/remove-background-from-product-photo", label: "प्रोडक्ट फोटो" },
          { href: "/hi/bulk", label: "बल्क" },
          { href: "/hi/background-remover-for-amazon", label: "Amazon के लिए" },
          { href: "/hi", label: "मेन रिमूवर" },
        ]}
        relatedTitle="रिलेटेड टूल्स"
        ctaTitle="अभी स्टोर अपग्रेड करें"
        ctaSubtitle="फ्री बल्क प्रोसेसिंग।"
        ctaButton="शुरू करें"
        ctaHref="/hi"
      />
    </>
  );
}
