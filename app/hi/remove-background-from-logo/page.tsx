import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { SeoLanding } from "@/components/seo-landing";
import { webAppSchema, buildFaqSchema } from "@/lib/schema-locale";
import { SITE } from "@/lib/site";

const URL = `${SITE.url}/hi/remove-background-from-logo/`;
const TITLE = "लोगो का बैकग्राउंड कैसे हटाएं — फ्री ट्रांसपेरेंट लोगो मेकर";
const DESC = "किसी भी लोगो (JPG/PNG) का बैकग्राउंड हटाएं और ट्रांसपेरेंट PNG बनाएं। ब्राउज़र में चलता है, फ्री, बिना साइन-अप।";

const faqs = [
  { q: "क्या यह वाकई फ्री है?", a: "हाँ — पूरी तरह फ्री, कोई साइन-अप नहीं, कोई वॉटरमार्क नहीं।" },
  { q: "क्या JPG लोगो काम करेगा?", a: "हाँ। JPG, PNG, WebP — सब चलते हैं। आउटपुट हमेशा ट्रांसपेरेंट PNG होगा।" },
  { q: "क्या यह AI लोगो पर अच्छा काम करता है?", a: "हाँ। हम RMBG-1.4 मॉडल यूज़ करते हैं जो लोगो की पतली लाइनों और टेक्स्ट को साफ काटता है।" },
  { q: "क्या लोगो मेरे डिवाइस पर सुरक्षित है?", a: "100%। सारी प्रोसेसिंग आपके ब्राउज़र में होती है। लोगो हमारे सर्वर पर नहीं जाता।" },
  { q: "वेक्टर SVG बेहतर है या नहीं?", a: "अगर आपके पास ओरिजिनल SVG/AI/EPS है, उसे यूज़ करें। यह टूल तब के लिए है जब ओरिजिनल फाइल नहीं मिले।" },
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: URL, languages: { "en-US": `${SITE.url}/logo-background-remover/`, "hi-IN": URL } },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          webAppSchema({ bcp47: "hi-IN", url: URL, name: "BgRemove — लोगो बैकग्राउंड रिमूवर", description: DESC }),
          buildFaqSchema("hi-IN", faqs),
        ]}
      />
      <SeoLanding
        eyebrow="लोगो टूल"
        title="लोगो का बैकग्राउंड हटाएं"
        description="कंपनी लोगो को ट्रांसपेरेंट PNG में बदलें — किसी भी वेबसाइट, दस्तावेज़, या प्रेज़ेंटेशन में लगाएं।"
        trustPills={[
          { icon: "lock", label: "ब्राउज़र में चलता है" },
          { icon: "zap", label: "कोई अपलोड नहीं" },
          { icon: "sparkles", label: "फ्री" },
        ]}
        bullets={[
          { title: "हर लोगो", body: "टेक्स्ट लोगो, आइकन, मिनिमल, कलरफुल — सब काम करता है।" },
          { title: "हाई रेज़ोल्यूशन", body: "4096px तक का आउटपुट — प्रिंट और बैनर के लिए परफेक्ट।" },
          { title: "साफ किनारे", body: "AI पतली लाइनें और टेक्स्ट को सटीक काटता है।" },
          { title: "बिज़नेस-सेफ", body: "लोगो आपके डिवाइस से बाहर नहीं जाता — ब्रांड लीक नहीं होगा।" },
        ]}
        sections={[
          { heading: "लोगो ट्रांसपेरेंट क्यों चाहिए?", body: "JPG लोगो वेबसाइट या इनवॉइस पर सफेद बॉक्स में दिखता है जो अजीब लगता है। ट्रांसपेरेंट PNG किसी भी बैकग्राउंड पर सीधे लगता है — डार्क मोड वेबसाइट, कलर्ड फ्लायर, ब्रांडेड स्लाइड — सब जगह फिट।" },
          { heading: "कब यह टूल यूज़ करें", body: "जब डिज़ाइनर ने JPG में लोगो दिया हो।\n\nजब पुरानी कंपनी का ओरिजिनल फाइल खो गया हो।\n\nजब लोगो स्क्रीनशॉट या स्कैन से लिया गया हो।\n\nजब कॉम्पिटिटर का लोगो प्रेज़ेंटेशन में लगाना हो।" },
          { heading: "बेस्ट रिज़ल्ट के लिए टिप्स", body: "हाई रेज़ोल्यूशन से शुरू करें — जितना साफ ओरिजिनल, उतना साफ कट।\n\nभारी JPG कम्प्रेशन से बचें — हलो दिखेगा।\n\nब्लैक/व्हाइट टेक्स्ट लोगो बेहतरीन काम करते हैं।" },
        ]}
        faqs={faqs}
        faqTitle="अक्सर पूछे जाने वाले सवाल"
        related={[
          { href: "/hi/transparent-png-maker", label: "ट्रांसपेरेंट PNG बनाएं" },
          { href: "/hi/remove-background-from-product-photo", label: "प्रोडक्ट फोटो" },
          { href: "/hi/bulk", label: "कई लोगो एक साथ" },
          { href: "/hi", label: "मेन बैकग्राउंड रिमूवर" },
        ]}
        relatedTitle="रिलेटेड टूल्स"
        ctaTitle="अभी ट्राई करें"
        ctaSubtitle="अपना लोगो ड्रॉप करें, साफ ट्रांसपेरेंट PNG डाउनलोड करें।"
        ctaButton="अभी शुरू करें"
        ctaHref="/hi"
      />
    </>
  );
}
