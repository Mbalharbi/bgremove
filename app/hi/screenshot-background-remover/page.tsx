import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { SeoLanding } from "@/components/seo-landing";
import { webAppSchema, buildFaqSchema } from "@/lib/schema-locale";
import { SITE } from "@/lib/site";

const URL = `${SITE.url}/hi/screenshot-background-remover/`;
const TITLE = "स्क्रीनशॉट का बैकग्राउंड हटाएं — ट्यूटोरियल और प्रेज़ेंटेशन के लिए";
const DESC = "स्क्रीनशॉट से सब्जेक्ट (नाक, पर्सन, आइकन) काटें — ट्यूटोरियल और स्लाइड्स के लिए। फ्री, ब्राउज़र में।";

const faqs = [
  { q: "कौन से स्क्रीनशॉट काम करते हैं?", a: "Windows (Win+Shift+S), Mac (Cmd+Shift+4), Android, iOS — सब चलते हैं।" },
  { q: "क्या Zoom कॉल का स्क्रीनशॉट चलेगा?", a: "हाँ — खुद को कट करके अकेले रख सकते हैं, बाकी पार्टिसिपेंट्स बैकग्राउंड में जाएंगे।" },
  { q: "UI एलिमेंट्स (बटन, मेनू) कटते हैं?", a: "AI लोगों के लिए ऑप्टिमाइज़्ड है। साफ UI के लिए मैन्युअल क्रॉपिंग ज़्यादा बेहतर है।" },
  { q: "क्या स्क्रीनशॉट प्राइवेट रहता है?", a: "हाँ। स्क्रीनशॉट्स में अक्सर सेंसिटिव डेटा (ईमेल, पासवर्ड) होता है — आपके ब्राउज़र से बाहर नहीं जाता।" },
  { q: "मल्टीपल स्क्रीनशॉट?", a: "बल्क मोड में 20 तक।" },
];

export const metadata: Metadata = { title: TITLE, description: DESC, alternates: { canonical: URL } };

export default function Page() {
  return (
    <>
      <JsonLd data={[webAppSchema({ bcp47: "hi-IN", url: URL, name: "BgRemove स्क्रीनशॉट", description: DESC }), buildFaqSchema("hi-IN", faqs)]} />
      <SeoLanding
        eyebrow="स्क्रीनशॉट टूल"
        title="स्क्रीनशॉट से सब्जेक्ट काटें"
        description="ट्यूटोरियल, स्लाइड्स, और ब्लॉग के लिए साफ कटआउट्स।"
        trustPills={[{ icon: "lock", label: "ब्राउज़र में" }, { icon: "zap", label: "तेज़" }, { icon: "sparkles", label: "फ्री" }]}
        bullets={[
          { title: "कंटेंट क्रिएटर्स के लिए", body: "Twitter, Instagram, YouTube थंबनेल्स।" },
          { title: "टेक राइटर्स", body: "ट्यूटोरियल में साफ UI शॉट्स।" },
          { title: "Zoom/Teams स्क्रीनशॉट", body: "खुद को कट करें, बाकी टीम बैकग्राउंड।" },
          { title: "सेंसिटिव डेटा सेफ", body: "स्क्रीनशॉट सर्वर पर नहीं जाते।" },
        ]}
        sections={[
          { heading: "कब यूज़ करें", body: "ट्यूटोरियल ब्लॉग — साफ UI के साथ इलस्ट्रेशन।\n\nप्रेज़ेंटेशन स्लाइड्स — अपनी ऐप का स्क्रीनशॉट फिगर के साथ।\n\nसोशल मीडिया — Twitter थ्रेड के लिए विज़ुअल।\n\nरीसर्च पेपर — फिगर्स।" },
          { heading: "बेस्ट तरीका", body: "Win+Shift+S से क्रॉप करके स्क्रीनशॉट लें।\n\nसीधे क्लिपबोर्ड से ड्रॉप करें (टूल पेस्ट सपोर्ट करता है)।\n\nट्रांसपेरेंट PNG डाउनलोड करें।\n\nकहीं भी पेस्ट करें — Canva, PowerPoint, Notion।" },
          { heading: "लिमिटेशन", body: "AI मुख्यतः लोगों पर ट्रेन्ड है। UI रेक्टैंगल्स पर रिज़ल्ट वेरियेबल — Figma में मैन्युअल क्रॉप ज़्यादा बेहतर रेक्टैंगुलर UI के लिए। पर पर्सन/ऑब्जेक्ट के लिए बहुत अच्छा।" },
        ]}
        faqs={faqs}
        faqTitle="अक्सर पूछे जाने वाले सवाल"
        related={[
          { href: "/hi/transparent-png-maker", label: "ट्रांसपेरेंट PNG" },
          { href: "/hi/bulk", label: "बल्क" },
          { href: "/hi", label: "मेन रिमूवर" },
        ]}
        relatedTitle="रिलेटेड टूल्स"
        ctaTitle="अभी ट्राई करें"
        ctaSubtitle="स्क्रीनशॉट ड्रॉप करें।"
        ctaButton="शुरू करें"
        ctaHref="/hi"
      />
    </>
  );
}
