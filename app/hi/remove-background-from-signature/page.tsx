import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { SeoLanding } from "@/components/seo-landing";
import { webAppSchema, buildFaqSchema } from "@/lib/schema-locale";
import { SITE } from "@/lib/site";

const URL = `${SITE.url}/hi/remove-background-from-signature/`;
const TITLE = "साइन (Signature) का बैकग्राउंड हटाएं — ट्रांसपेरेंट PNG बनाएं";
const DESC = "कागज़ पर साइन की फोटो लें, सफेद बैकग्राउंड हटाएं, ट्रांसपेरेंट PNG में डिजिटल डॉक्यूमेंट पर लगाएं।";

const faqs = [
  { q: "क्या PDF/Word डॉक्यूमेंट में काम करेगा?", a: "हाँ। डाउनलोडेड PNG को डॉक्यूमेंट में पेस्ट करें — सिग्नेचर पारदर्शी रहेगा।" },
  { q: "क्या स्कैन और फोटो दोनों चलेंगे?", a: "हाँ। फोन से सीधी फोटो भी काम करती है — बस अच्छी लाइटिंग।" },
  { q: "क्या लीगल डॉक्यूमेंट के लिए वैध है?", a: "टेक्निकली डिजिटल सिग्नेचर अलग चीज़ है (Aadhaar eSign वगैरह)। यह सिर्फ विज़ुअल/इन्फॉर्मल यूज़ के लिए है।" },
  { q: "क्या साइन सर्वर पर भेजा जाता है?", a: "नहीं — 100% ब्राउज़र में। साइन प्राइवेट रहता है, जो ज़रूरी है।" },
  { q: "क्या नीला/काला दोनों कलर सपोर्टेड है?", a: "हाँ। AI सिग्नेचर के ओरिजिनल कलर को रखता है।" },
];

export const metadata: Metadata = { title: TITLE, description: DESC, alternates: { canonical: URL } };

export default function Page() {
  return (
    <>
      <JsonLd data={[webAppSchema({ bcp47: "hi-IN", url: URL, name: "BgRemove सिग्नेचर", description: DESC }), buildFaqSchema("hi-IN", faqs)]} />
      <SeoLanding
        eyebrow="सिग्नेचर टूल"
        title="सिग्नेचर का बैकग्राउंड हटाएं"
        description="कागज़ पर साइन → फोटो → ट्रांसपेरेंट PNG → डॉक्यूमेंट पर सीधे लगाएं।"
        trustPills={[{ icon: "lock", label: "100% प्राइवेट" }, { icon: "zap", label: "तेज़" }, { icon: "sparkles", label: "फ्री" }]}
        bullets={[
          { title: "साफ कटआउट", body: "AI सिर्फ इंक लाइंस रखता है, बाक़ी सब हटाता है।" },
          { title: "डॉक्यूमेंट रेडी", body: "PDF, Word, Google Docs — कहीं भी पेस्ट करें।" },
          { title: "प्राइवेट", body: "सिग्नेचर आपके डिवाइस से बाहर नहीं जाता।" },
          { title: "मल्टीपल साइन", body: "बल्क मोड में 20 सिग्नेचर एक साथ।" },
        ]}
        sections={[
          { heading: "क्यों ज़रूरी है?", body: "रिमोट वर्क में अक्सर डॉक्यूमेंट डिजिटली साइन करना पड़ता है। प्रिंट → साइन → स्कैन की झंझट से बचने के लिए — एक बार साइन की ट्रांसपेरेंट PNG बना लें, फिर किसी भी PDF/Word में सीधे पेस्ट करें।" },
          { heading: "बेस्ट तरीका", body: "सफेद कागज़ पर डार्क पेन से साइन करें।\n\nफोन से सीधी ऊपर से फोटो लें — कोई एंगल नहीं।\n\nअच्छी लाइटिंग (कोई शैडो नहीं)।\n\nइस टूल पर अपलोड — ट्रांसपेरेंट PNG डाउनलोड।" },
          { heading: "क्या ध्यान रखें", body: "यह विज़ुअल सिग्नेचर है, लीगल eSignature नहीं।\n\nजहाँ Aadhaar eSign या डिजिटल सर्टिफिकेट चाहिए, वहाँ यह काफी नहीं।\n\nइन्फॉर्मल लेटर, ईमेल अटैचमेंट, कॉन्ट्रैक्ट ड्राफ्ट — यहाँ अच्छा।" },
        ]}
        faqs={faqs}
        faqTitle="अक्सर पूछे जाने वाले सवाल"
        related={[
          { href: "/hi/transparent-png-maker", label: "ट्रांसपेरेंट PNG" },
          { href: "/hi/remove-background-from-passport-photo", label: "पासपोर्ट फोटो" },
          { href: "/hi", label: "मेन रिमूवर" },
        ]}
        relatedTitle="रिलेटेड टूल्स"
        ctaTitle="सिग्नेचर अभी डिजिटल करें"
        ctaSubtitle="1 मिनट में काम तैयार।"
        ctaButton="शुरू करें"
        ctaHref="/hi"
      />
    </>
  );
}
