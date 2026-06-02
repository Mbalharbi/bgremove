import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { SeoLanding } from "@/components/seo-landing";
import { webAppSchema, buildFaqSchema } from "@/lib/schema-locale";
import { SITE } from "@/lib/site";

const URL = `${SITE.url}/hi/background-remover-for-amazon/`;
const TITLE = "Amazon सेलर्स के लिए बैकग्राउंड रिमूवर — सफेद बैकग्राउंड फ्री";
const DESC = "Amazon की #FFFFFF सफेद बैकग्राउंड पॉलिसी फ्री में पूरी करें। बल्क सपोर्ट, बिना सब्सक्रिप्शन।";

const faqs = [
  { q: "Amazon की सफेद बैकग्राउंड रिक्वायरमेंट क्या है?", a: "Amazon की MAIN इमेज में बैकग्राउंड पूरी तरह सफेद (RGB 255,255,255) होना चाहिए। यह टूल ट्रांसपेरेंट PNG देता है — फिर डिज़ाइन टूल में सफेद लेयर एड करें।" },
  { q: "क्या बल्क में कैटलॉग प्रोसेस होगा?", a: "हाँ। 20 इमेज एक साथ → ZIP डाउनलोड।" },
  { q: "क्या यह Amazon TOS के खिलाफ है?", a: "नहीं। Amazon साफ बैकग्राउंड वाली इमेज को encourage करता है। यह टूल बस यह आसान बनाता है।" },
  { q: "Remove.bg जैसी क्वालिटी?", a: "हाँ — हम RMBG-1.4 यूज़ करते हैं जो टेक्निकली बराबर या बेहतर है, फ्री और बिना अकाउंट।" },
  { q: "क्या प्रोडक्ट फोटो प्राइवेट रहेगी?", a: "हाँ — लॉन्च-से-पहले फोटो सर्वर पर नहीं जाती।" },
];

export const metadata: Metadata = { title: TITLE, description: DESC, alternates: { canonical: URL } };

export default function Page() {
  return (
    <>
      <JsonLd data={[webAppSchema({ bcp47: "hi-IN", url: URL, name: "BgRemove Amazon", description: DESC }), buildFaqSchema("hi-IN", faqs)]} />
      <SeoLanding
        eyebrow="Amazon सेलर्स"
        title="Amazon के लिए बैकग्राउंड रिमूवर"
        description="Amazon की MAIN इमेज पॉलिसी (#FFFFFF सफेद) के लिए परफेक्ट प्रोडक्ट कटआउट।"
        trustPills={[{ icon: "lock", label: "प्राइवेट" }, { icon: "zap", label: "बल्क" }, { icon: "sparkles", label: "फ्री" }]}
        bullets={[
          { title: "Amazon कंप्लायंट", body: "#FFFFFF सफेद बैकग्राउंड — पॉलिसी कंप्लेंट।" },
          { title: "FBA रेडी", body: "FBA सेलर्स के लिए हाई-वॉल्यूम कैटलॉग।" },
          { title: "बल्क मोड", body: "20 SKU एक साथ — मिनटों में पूरा।" },
          { title: "लीक प्रूफ", body: "अनलॉन्च्ड प्रोडक्ट सर्वर पर नहीं जाते।" },
        ]}
        sections={[
          { heading: "Amazon की इमेज पॉलिसी", body: "Amazon की MAIN image (पहली इमेज) requirements: सफेद बैकग्राउंड (RGB 255,255,255), प्रोडक्ट इमेज के 85% area कवर करे, कोई वॉटरमार्क/टेक्स्ट/लोगो नहीं। यह टूल साफ कटआउट देता है — आप कैनवा में सफेद बैकग्राउंड लेयर एड करके पॉलिसी पूरी करें।" },
          { heading: "Amazon सेलर्स का वर्कफ्लो", body: "स्टूडियो/घर पर फोटो लें — कोई बैकग्राउंड चलेगा।\n\n/hi/bulk में पूरा SKU सेट डालें।\n\nहर इमेज ~3 सेकंड में प्रोसेस।\n\nZIP डाउनलोड।\n\nकैनवा में सफेद बैकग्राउंड लेयर एड करें।\n\nAmazon Seller Central पर अपलोड।" },
          { heading: "Remove.bg से बेहतर क्यों?", body: "Remove.bg: $0.20 प्रति इमेज, अकाउंट चाहिए, बैकग्राउंड पर डेटा।\n\nBgRemove: फ्री, बिना अकाउंट, इमेज प्राइवेट।\n\n100 SKU = Remove.bg पर ₹2,000, यहाँ ₹0।" },
        ]}
        faqs={faqs}
        faqTitle="अक्सर पूछे जाने वाले सवाल"
        related={[
          { href: "/hi/remove-background-from-product-photo", label: "प्रोडक्ट फोटो" },
          { href: "/hi/bulk", label: "बल्क" },
          { href: "/hi/background-remover-for-shopify", label: "Shopify के लिए" },
          { href: "/hi", label: "मेन रिमूवर" },
        ]}
        relatedTitle="रिलेटेड टूल्स"
        ctaTitle="कैटलॉग आज ही प्रोसेस करें"
        ctaSubtitle="फ्री, बल्क, प्राइवेट।"
        ctaButton="शुरू करें"
        ctaHref="/hi"
      />
    </>
  );
}
