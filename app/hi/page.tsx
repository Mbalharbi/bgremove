import { JsonLd } from "@/components/json-ld";
import { LocalizedHome } from "@/components/localized-home";
import { SITE_HI, FAQ_HI, HOW_IT_WORKS_HI, USE_CASES_HI } from "@/lib/site-hi";
import { webAppSchema, howToSchema, faqSchema } from "@/lib/schema-locale";

export default function HindiHome() {
  return (
    <>
      <JsonLd
        data={[
          webAppSchema({ bcp47: "hi-IN", url: SITE_HI.url, name: SITE_HI.name, description: SITE_HI.description }),
          howToSchema({ bcp47: "hi-IN", name: "इमेज का बैकग्राउंड कैसे हटाएं", description: "ब्राउज़र में चलने वाले फ्री टूल से किसी भी इमेज का बैकग्राउंड हटाएं।", steps: HOW_IT_WORKS_HI }),
          faqSchema({ bcp47: "hi-IN", items: FAQ_HI }),
        ]}
      />
      <LocalizedHome
        badge="100% फ्री AI जो आपके ब्राउज़र में चलता है"
        title="इमेज का बैकग्राउंड हटाएं"
        titleHighlight="कुछ सेकंड में"
        subtitle="फ्री, बिना लिमिट और 100% प्राइवेट — आपकी इमेज पूरी तरह आपके ब्राउज़र में प्रोसेस होती है। ना अपलोड, ना साइन-अप, ना वॉटरमार्क।"
        trustPills={[
          { icon: "lock", label: "ब्राउज़र में चलता है" },
          { icon: "zap", label: "कोई अपलोड नहीं" },
          { icon: "sparkles", label: "हमेशा फ्री" },
        ]}
        howTitle="तीन स्टेप्स। कोई झंझट नहीं।"
        howSubtitle="ना अकाउंट, ना इंस्टॉल, ना अपनी फोटो किसी अंजान सर्वर पर भेजें। बस ब्राउज़र और कुछ सेकंड।"
        howStepLabel="स्टेप"
        steps={HOW_IT_WORKS_HI}
        useCasesTitle="हर उस इंसान के लिए जो इमेज से काम करता है"
        useCasesSubtitle="चाहे आप डिज़ाइनर हों, मार्केटर, ऑनलाइन सेलर, या बस अपनी प्रोफाइल फोटो अपडेट कर रहे हों — BgRemove आपके रास्ते से हट जाता है।"
        useCases={USE_CASES_HI}
        faqTitle="अक्सर पूछे जाने वाले सवाल"
        faqSubtitle="टूल कैसे काम करता है, क्या फ्री है, और क्या प्राइवेट रहता है — सीधे जवाब।"
        faqs={FAQ_HI}
        ctaTitle="अभी ट्राई करें — 2 सेकंड लगते हैं"
        ctaSubtitle="एक इमेज ड्रैग करें, ट्रांसपेरेंट बैकग्राउंड के साथ डाउनलोड करें। ना साइन-अप, ना इंतज़ार, ना सरप्राइज़।"
        ctaButton="अभी शुरू करें"
      />
    </>
  );
}
