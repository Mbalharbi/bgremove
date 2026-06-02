import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { SeoLanding } from "@/components/seo-landing";
import { webAppSchema, buildFaqSchema } from "@/lib/schema-locale";
import { SITE } from "@/lib/site";

const URL = `${SITE.url}/hi/transparent-png-maker/`;
const TITLE = "ट्रांसपेरेंट PNG मेकर — किसी भी JPG को ट्रांसपेरेंट PNG बनाएं फ्री";
const DESC = "JPG/PNG/WebP को ट्रांसपेरेंट बैकग्राउंड वाले PNG में कन्वर्ट करें। फ्री, बिना अपलोड, ब्राउज़र में।";

const faqs = [
  { q: "JPG को ट्रांसपेरेंट PNG में बदलना क्या होता है?", a: "JPG ट्रांसपेरेंसी सपोर्ट नहीं करता। हम इमेज के बैकग्राउंड को AI से हटाते हैं और PNG फॉर्मेट में सेव करते हैं — जिसमें ट्रांसपेरेंसी होती है।" },
  { q: "क्या ओरिजिनल साइज़ बना रहेगा?", a: "हाँ। 4096px तक का आउटपुट — कोई क्वालिटी लॉस नहीं।" },
  { q: "WebP भी सपोर्ट करता है?", a: "इनपुट: हाँ। आउटपुट हमेशा PNG होता है। WebP आउटपुट के लिए /tools/image-compressor यूज़ करें।" },
  { q: "Photoshop क्यों नहीं?", a: "Photoshop में मैजिक वैंड टूल मैनुअल और स्लो है। AI सेकंडों में करता है, खासकर पतले डिटेल्स (बाल, फर) पर।" },
  { q: "क्या फाइल मेरे पास रहती है?", a: "हाँ। पूरी प्रोसेसिंग आपके ब्राउज़र में — कुछ भी अपलोड नहीं होता।" },
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: URL, languages: { "en-US": `${SITE.url}/transparent-png-maker/`, "hi-IN": URL } },
};

export default function Page() {
  return (
    <>
      <JsonLd data={[webAppSchema({ bcp47: "hi-IN", url: URL, name: "BgRemove PNG मेकर", description: DESC }), buildFaqSchema("hi-IN", faqs)]} />
      <SeoLanding
        eyebrow="PNG मेकर"
        title="ट्रांसपेरेंट PNG बनाएं"
        description="किसी भी JPG/PNG/WebP को एक क्लिक में ट्रांसपेरेंट बैकग्राउंड वाले PNG में बदलें।"
        trustPills={[{ icon: "lock", label: "ब्राउज़र में" }, { icon: "zap", label: "तेज़" }, { icon: "sparkles", label: "फ्री" }]}
        bullets={[
          { title: "सब फॉर्मेट", body: "JPG, PNG, WebP इनपुट → हमेशा PNG आउटपुट।" },
          { title: "ओरिजिनल क्वालिटी", body: "साइज़ नहीं बदलता — 4096px तक।" },
          { title: "AI एज", body: "पतले डिटेल्स (बाल, फर, फेदर) भी साफ।" },
          { title: "बल्क", body: "20 फाइल एक साथ ट्रांसपेरेंट PNG में।" },
        ]}
        sections={[
          { heading: "PNG ट्रांसपेरेंसी क्या है?", body: "PNG फॉर्मेट 'alpha channel' सपोर्ट करता है — पिक्सेल पूरी तरह या आंशिक रूप से पारदर्शी हो सकते हैं। JPG में यह नहीं होता, इसलिए वहाँ बैकग्राउंड सफेद या काला दिखाई देता है।" },
          { heading: "कहाँ ज़रूरी है?", body: "लोगो — किसी भी वेबसाइट बैकग्राउंड पर फिट।\n\nप्रोडक्ट फोटो — मार्केटप्लेस पर साफ दिखे।\n\nWhatsApp/Telegram स्टिकर्स।\n\nPowerPoint, Canva, Figma डिज़ाइन्स।\n\nएडिटिंग के लिए लेयर्स।" },
          { heading: "PNG vs JPG vs WebP", body: "JPG: छोटा, पर ट्रांसपेरेंसी नहीं — कैमरा फोटो के लिए।\n\nPNG: ट्रांसपेरेंसी सपोर्ट, हाई क्वालिटी, बड़ा साइज़।\n\nWebP: ट्रांसपेरेंसी + छोटा साइज़ — मॉडर्न ब्राउज़र में अच्छा।" },
        ]}
        faqs={faqs}
        faqTitle="अक्सर पूछे जाने वाले सवाल"
        related={[
          { href: "/hi/remove-background-from-logo", label: "लोगो" },
          { href: "/hi/remove-background-from-product-photo", label: "प्रोडक्ट फोटो" },
          { href: "/tools/image-compressor", label: "PNG को छोटा करें" },
          { href: "/hi", label: "मेन रिमूवर" },
        ]}
        relatedTitle="रिलेटेड टूल्स"
        ctaTitle="अभी ट्रांसपेरेंट PNG बनाएं"
        ctaSubtitle="JPG/PNG/WebP ड्रॉप करें।"
        ctaButton="शुरू करें"
        ctaHref="/hi"
      />
    </>
  );
}
