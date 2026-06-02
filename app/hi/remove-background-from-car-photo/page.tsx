import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { SeoLanding } from "@/components/seo-landing";
import { webAppSchema, buildFaqSchema } from "@/lib/schema-locale";
import { SITE } from "@/lib/site";

const URL = `${SITE.url}/hi/remove-background-from-car-photo/`;
const TITLE = "कार फोटो का बैकग्राउंड हटाएं — डीलर्स और OLX सेलर्स के लिए";
const DESC = "कार फोटो का बैकग्राउंड फ्री में हटाएं — OLX, CarDekho, Cars24, डीलरशिप वेबसाइट के लिए साफ कटआउट। ब्राउज़र में चलता है।";

const faqs = [
  { q: "क्या OLX और CarDekho पर अच्छा दिखेगा?", a: "हाँ। ट्रांसपेरेंट PNG को सफेद या ग्रेडिएंट बैकग्राउंड के साथ रखें — प्रोफेशनल लिस्टिंग बनेगी।" },
  { q: "क्या रिफ्लेक्शन और शैडो भी कटती हैं?", a: "AI मेन कार बॉडी साफ काटता है। फ्लोर शैडो को रखना है तो ओरिजिनल बैकग्राउंड में थोड़ी क्रॉपिंग करें।" },
  { q: "कितनी कार फोटो एक साथ?", a: "बल्क टूल से 20 तक एक साथ — पूरा शोरूम मिनटों में।" },
  { q: "क्या रात के समय की फोटो काम करेगी?", a: "कम लाइट में थोड़ा वेरिएशन — डे लाइट या स्टूडियो लाइट बेहतर रिज़ल्ट देती है।" },
  { q: "क्या फोटो सर्वर पर अपलोड होती है?", a: "नहीं। पूरी प्रोसेसिंग आपके ब्राउज़र में — कस्टमर डेटा प्राइवेट रहता है।" },
];

export const metadata: Metadata = { title: TITLE, description: DESC, alternates: { canonical: URL } };

export default function Page() {
  return (
    <>
      <JsonLd data={[webAppSchema({ bcp47: "hi-IN", url: URL, name: "BgRemove कार फोटो", description: DESC }), buildFaqSchema("hi-IN", faqs)]} />
      <SeoLanding
        eyebrow="कार डीलर्स के लिए"
        title="कार फोटो का बैकग्राउंड हटाएं"
        description="OLX, Cars24, CarDekho, या डीलरशिप वेबसाइट — प्रोफेशनल कार लिस्टिंग के लिए साफ कटआउट।"
        trustPills={[{ icon: "lock", label: "ब्राउज़र में" }, { icon: "zap", label: "बल्क" }, { icon: "sparkles", label: "फ्री" }]}
        bullets={[
          { title: "साफ कार बॉडी", body: "AI कार के एज, मिरर, और एंटीना सब डिटेल पकड़ता है।" },
          { title: "मार्केटप्लेस रेडी", body: "OLX, Cars24, Spinny, OLX Autos — सब फिट।" },
          { title: "बल्क मोड", body: "20 कार फोटो एक साथ — पूरा शोरूम कैटलॉग।" },
          { title: "स्टूडियो लुक", body: "ट्रांसपेरेंट PNG + कोई भी ग्रेडिएंट बैकग्राउंड = प्रीमियम फील।" },
        ]}
        sections={[
          { heading: "लिस्टिंग पर असर", body: "साफ बैकग्राउंड वाली कार लिस्टिंग पर 2-3x ज़्यादा क्लिक आते हैं। ख़राब बैकग्राउंड (गंदा पार्किंग, भीड़) कस्टमर का ध्यान भटकाता है। साफ कटआउट = प्रोफेशनल इम्प्रेशन = फास्ट सेल।" },
          { heading: "बेस्ट फोटो टिप्स", body: "डे लाइट में फोटो लें।\n\n3/4 एंगल बेस्ट दिखता है।\n\nबैकग्राउंड में कंट्रास्ट हो — सफेद कार पर डार्क बैकग्राउंड।\n\nहर एंगल लें — फ्रंट, साइड, बैक, इंटीरियर।" },
          { heading: "डीलर वर्कफ्लो", body: "नई कार आई → 4-6 फोटो लें → /hi/bulk में डालें → ट्रांसपेरेंट PNG → कैनवा में सफेद बैकग्राउंड डालें → लिस्टिंग रेडी।" },
        ]}
        faqs={faqs}
        faqTitle="अक्सर पूछे जाने वाले सवाल"
        related={[
          { href: "/hi/bulk", label: "बल्क" },
          { href: "/hi/remove-background-from-product-photo", label: "प्रोडक्ट फोटो" },
          { href: "/hi", label: "मेन बैकग्राउंड रिमूवर" },
        ]}
        relatedTitle="रिलेटेड टूल्स"
        ctaTitle="लिस्टिंग आज ही अपग्रेड करें"
        ctaSubtitle="एक कार फोटो टेस्ट करें।"
        ctaButton="शुरू करें"
        ctaHref="/hi"
      />
    </>
  );
}
