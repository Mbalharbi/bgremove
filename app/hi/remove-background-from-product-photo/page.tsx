import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { SeoLanding } from "@/components/seo-landing";
import { webAppSchema, buildFaqSchema } from "@/lib/schema-locale";
import { SITE } from "@/lib/site";

const URL = `${SITE.url}/hi/remove-background-from-product-photo/`;
const TITLE = "प्रोडक्ट फोटो का बैकग्राउंड हटाएं — Amazon, Flipkart, Meesho सेलर्स के लिए";
const DESC = "प्रोडक्ट फोटो का बैकग्राउंड फ्री में हटाएं। सफेद बैकग्राउंड Amazon/Flipkart रेडी। ब्राउज़र में चलता है, बिना अपलोड।";

const faqs = [
  { q: "क्या Amazon वाली सफेद बैकग्राउंड पॉलिसी पूरी होती है?", a: "हाँ। ट्रांसपेरेंट PNG को डिज़ाइन टूल में सफेद लेयर के ऊपर रखें — Amazon की #FFFFFF रिक्वायरमेंट पूरी।" },
  { q: "एक बार में कितनी फोटो प्रोसेस कर सकते हैं?", a: "बल्क टूल में 20 तक एक साथ — कैटलॉग जल्दी अपडेट करें।" },
  { q: "क्या रिफ्लेक्टिव प्रोडक्ट (ग्लास, मेटल) पर काम करता है?", a: "अच्छे लाइटिंग के साथ हाँ। पतली रिफ्लेक्शन वाली एज को Figma में जल्दी क्लीन कर सकते हैं।" },
  { q: "क्या प्रोडक्ट फोटो सर्वर पर अपलोड होती है?", a: "नहीं। 100% आपके ब्राउज़र में प्रोसेसिंग — सेलर्स के लिए ज़रूरी, क्योंकि लॉन्च-से-पहले फोटो लीक नहीं हो सकती।" },
  { q: "किस फॉर्मेट में डाउनलोड होता है?", a: "हमेशा ट्रांसपेरेंट PNG। JPG (सफेद बैकग्राउंड के साथ) चाहिए तो किसी भी डिज़ाइन टूल में 10 सेकंड में कन्वर्ट हो जाता है।" },
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: URL, languages: { "en-US": `${SITE.url}/product-photo-background-remover/`, "hi-IN": URL } },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          webAppSchema({ bcp47: "hi-IN", url: URL, name: "BgRemove — प्रोडक्ट फोटो", description: DESC }),
          buildFaqSchema("hi-IN", faqs),
        ]}
      />
      <SeoLanding
        eyebrow="ईकॉमर्स सेलर्स के लिए"
        title="प्रोडक्ट फोटो का बैकग्राउंड हटाएं"
        description="Amazon, Flipkart, Meesho, Shopify — सब प्लेटफॉर्म के लिए साफ सफेद बैकग्राउंड वाली प्रोडक्ट फोटो बनाएं।"
        trustPills={[
          { icon: "lock", label: "ब्राउज़र में चलता है" },
          { icon: "zap", label: "बल्क सपोर्ट" },
          { icon: "sparkles", label: "फ्री, बिना लिमिट" },
        ]}
        bullets={[
          { title: "Amazon रेडी", body: "ट्रांसपेरेंट PNG → सफेद लेयर → #FFFFFF पॉलिसी पूरी।" },
          { title: "मार्केटप्लेस रेडी", body: "Flipkart, Meesho, Etsy, Shopify, Wix — सब जगह फिट।" },
          { title: "बल्क मोड", body: "20 फोटो एक साथ → ZIP डाउनलोड → मिनटों में पूरा कैटलॉग।" },
          { title: "सेलर प्राइवेसी", body: "लॉन्च-से-पहले प्रोडक्ट फोटो किसी सर्वर पर नहीं जाती।" },
        ]}
        sections={[
          { heading: "ईकॉमर्स के लिए क्यों ज़रूरी है?", body: "Amazon, Flipkart, Myntra — सब प्लेटफॉर्म सफेद बैकग्राउंड माँगते हैं। प्रोफेशनल फोटोशूट महंगा है। यह टूल आपको घर में बैठे, फोन के कैमरे से, कैटलॉग-क्वालिटी फोटो देता है।" },
          { heading: "बेस्ट प्रोडक्ट फोटो टिप्स", body: "नेचुरल विंडो लाइट + सफेद रिफ्लेक्टर = कोई शार्प शैडो नहीं।\n\nप्रोडक्ट और बैकग्राउंड में कंट्रास्ट रखें — AI एज पहचानेगा।\n\nरिफ्लेक्टिव सरफेस (ग्लास, क्रोम) से बचें या कम एंगल लें।\n\nमल्टीपल एंगल्स — फिर बल्क टूल से एक साथ प्रोसेस।" },
          { heading: "50 प्रोडक्ट के लिए वर्कफ्लो", body: "/hi/bulk खोलें और सारी फोटो ड्रॉप करें।\n\nहर फोटो ~3 सेकंड में प्रोसेस।\n\nZIP डाउनलोड — सारे ट्रांसपेरेंट PNG।\n\nसीधे मार्केटप्लेस पर अपलोड — Photoshop की ज़रूरत नहीं।" },
        ]}
        faqs={faqs}
        faqTitle="अक्सर पूछे जाने वाले सवाल"
        related={[
          { href: "/hi/bulk", label: "बल्क प्रोसेसिंग" },
          { href: "/hi/background-remover-for-amazon", label: "Amazon के लिए" },
          { href: "/hi/background-remover-for-shopify", label: "Shopify के लिए" },
          { href: "/hi", label: "मेन बैकग्राउंड रिमूवर" },
        ]}
        relatedTitle="रिलेटेड टूल्स"
        ctaTitle="कैटलॉग आज ही तैयार करें"
        ctaSubtitle="एक फोटो टेस्ट करें या बल्क मोड से पूरा सेट।"
        ctaButton="अभी शुरू करें"
        ctaHref="/hi"
      />
    </>
  );
}
