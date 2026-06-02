import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { SeoLanding } from "@/components/seo-landing";
import { webAppSchema, buildFaqSchema } from "@/lib/schema-locale";
import { SITE } from "@/lib/site";

const URL = `${SITE.url}/hi/remove-bg-alternative/`;
const TITLE = "Remove.bg का फ्री अल्टरनेटिव — कोई क्रेडिट लिमिट नहीं";
const DESC = "Remove.bg का बेस्ट फ्री अल्टरनेटिव — बिना अकाउंट, बिना क्रेडिट, बिना अपलोड। ब्राउज़र में चलता है।";

const faqs = [
  { q: "Remove.bg vs BgRemove — क्या फर्क है?", a: "BgRemove पूरी तरह फ्री है, क्रेडिट नहीं चाहिए। आपकी इमेज ब्राउज़र से बाहर नहीं जाती। क्वालिटी RMBG-1.4 (वही टेक्नोलॉजी) से बराबर।" },
  { q: "क्या क्वालिटी सेम है?", a: "हाँ — कई केसेज में बेहतर। RMBG-1.4 मॉडल लोग, प्रोडक्ट, और जटिल एज पर एक्सीलेंट है।" },
  { q: "क्या Remove.bg की हाई-रेज इमेज पेड फीचर भी है यहाँ?", a: "हाँ — 4096px तक हाई-रेज आउटपुट फ्री।" },
  { q: "कैसे ट्रस्ट करें कि अपलोड नहीं होती?", a: "DevTools (F12) → Network टैब → कोई POST रिक्वेस्ट नहीं देखेंगे जो इमेज लेकर जाए। /privacy-proof पेज पर पूरा प्रूफ।" },
  { q: "API भी फ्री है?", a: "अभी API नहीं है — मुख्यतः वेब टूल। Bulk processing 20 इमेज तक एक साथ।" },
];

export const metadata: Metadata = { title: TITLE, description: DESC, alternates: { canonical: URL } };

export default function Page() {
  return (
    <>
      <JsonLd data={[webAppSchema({ bcp47: "hi-IN", url: URL, name: "Remove.bg Alternative", description: DESC }), buildFaqSchema("hi-IN", faqs)]} />
      <SeoLanding
        eyebrow="अल्टरनेटिव"
        title="Remove.bg का फ्री अल्टरनेटिव"
        description="कोई क्रेडिट नहीं। कोई अकाउंट नहीं। कोई अपलोड नहीं। सेम क्वालिटी।"
        trustPills={[{ icon: "lock", label: "बिना अकाउंट" }, { icon: "zap", label: "बिना क्रेडिट" }, { icon: "sparkles", label: "100% फ्री" }]}
        bullets={[
          { title: "बिना लिमिट", body: "Remove.bg: हर महीने सिर्फ 1 फ्री इमेज। BgRemove: अनलिमिटेड।" },
          { title: "हाई रेज", body: "Remove.bg पर हाई-रेज पेड। यहाँ 4096px फ्री।" },
          { title: "प्राइवेसी", body: "Remove.bg सर्वर पर भेजता है। BgRemove नहीं।" },
          { title: "बल्क फ्री", body: "Remove.bg API पेड। यहाँ 20 इमेज फ्री।" },
        ]}
        sections={[
          { heading: "Remove.bg की प्रॉब्लम", body: "Remove.bg प्रोफेशनल यूज़ के लिए महंगा है। प्रति इमेज ~$0.20। 100 इमेज = ₹2,000। बिज़नेस के लिए हज़ारों रुपये/महीना।\n\nप्लस: हर इमेज उनके सर्वर पर अपलोड होती है। प्रोडक्ट फोटो या प्राइवेट इमेज के लिए रिस्क।" },
          { heading: "BgRemove कैसे फ्री है?", body: "हम पैसे कैसे कमाते हैं? डायरेक्ट यूज़र से कुछ नहीं। साइट पर ads हो सकते हैं (अभी नहीं हैं), और भविष्य में अफिलिएट टूल्स। टूल हमेशा फ्री रहेगा।\n\nऔर AI ब्राउज़र में चलता है — हमारी कोई सर्वर कॉस्ट नहीं प्रति इमेज।" },
          { heading: "माइग्रेशन गाइड", body: "Remove.bg अकाउंट डिलीट करें (ऑप्शनल)।\n\n/hi बुकमार्क करें।\n\nवही वर्कफ्लो — ड्रॉप, प्रोसेस, डाउनलोड।\n\nUI से Remove.bg से ज़्यादा सरल।" },
        ]}
        faqs={faqs}
        faqTitle="अक्सर पूछे जाने वाले सवाल"
        related={[
          { href: "/privacy-proof", label: "प्राइवेसी प्रूफ" },
          { href: "/hi/bulk", label: "बल्क" },
          { href: "/hi", label: "मेन रिमूवर" },
        ]}
        relatedTitle="रिलेटेड"
        ctaTitle="आज ही स्विच करें"
        ctaSubtitle="कोई क्रेडिट कार्ड नहीं चाहिए।"
        ctaButton="अभी ट्राई करें"
        ctaHref="/hi"
      />
    </>
  );
}
