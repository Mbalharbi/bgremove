// Hindi (hi-IN) strings for /hi/ routes.
// Target: mobile-first Indian audience — ecommerce sellers, students,
// designers. Tone: native Hindi, not literal English translation.
import { SITE } from "@/lib/site";

export const SITE_HI = {
  name: SITE.name,
  domain: SITE.domain,
  url: `${SITE.url}/hi`,
  title: "मुफ्त बैकग्राउंड रिमूवर — ब्राउज़र में काम करे, अपलोड नहीं | BgRemove",
  description:
    "किसी भी फोटो का बैकग्राउंड AI से कुछ सेकंड में हटाएं। आपकी फोटो आपके फोन/लैपटॉप से कहीं नहीं जाती — 100% प्राइवेसी। फ्री, बिना लिमिट, बिना साइन-अप।",
  tagline: "सेकंडों में बैकग्राउंड हटाएं। 100% प्राइवेट। 100% फ्री।",
  ogImage: SITE.ogImage,
} as const;

export const NAV_LINKS_HI = [
  { href: "/hi", label: "बैकग्राउंड रिमूवर" },
  { href: "/hi/bulk", label: "बल्क" },
  { href: "/hi/transparent-png-maker", label: "ट्रांसपेरेंट PNG" },
  { href: "/hi/remove-background-from-product-photo", label: "प्रोडक्ट फोटो" },
  { href: "/hi/about", label: "हमारे बारे में" },
] as const;

export const FOOTER_LINKS_HI = {
  "टूल्स": [
    { href: "/hi", label: "बैकग्राउंड रिमूवर" },
    { href: "/hi/bulk", label: "बल्क प्रोसेसिंग" },
    { href: "/hi/transparent-png-maker", label: "ट्रांसपेरेंट PNG बनाएं" },
  ],
  "उपयोग": [
    { href: "/hi/remove-background-from-product-photo", label: "प्रोडक्ट फोटो" },
    { href: "/hi/remove-background-from-logo", label: "लोगो" },
    { href: "/hi/background-remover-for-amazon", label: "Amazon सेलर्स के लिए" },
  ],
  "साइट": [
    { href: "/hi/about", label: "हमारे बारे में" },
    { href: "/hi/privacy", label: "प्राइवेसी" },
  ],
} as const;

export const FAQ_HI = [
  { q: "क्या BgRemove वाकई फ्री है?", a: "हाँ — पूरी तरह से फ्री, बिना किसी लिमिट के। ना साइन-अप, ना वॉटरमार्क, ना सब्सक्रिप्शन। टूल आपके ब्राउज़र में चलता है, इसलिए हमारे पास हर इमेज की सर्वर लागत नहीं आती।" },
  { q: "क्या मेरी फोटो सर्वर पर अपलोड होती है?", a: "नहीं। हर इमेज आपके डिवाइस पर ही लोकल AI मॉडल से प्रोसेस होती है। आपकी फोटो आपके ब्राउज़र से बाहर नहीं जाती — हम चाहें भी तो उन्हें देख नहीं सकते।" },
  { q: "कौन से इमेज फॉर्मेट सपोर्टेड हैं?", a: "JPG, PNG और WebP — 30 MB तक। आउटपुट हमेशा ट्रांसपेरेंट बैकग्राउंड वाला PNG होता है।" },
  { q: "पहली बार स्लो क्यों है?", a: "पहली बार आपका ब्राउज़र AI मॉडल (~44 MB) डाउनलोड करता है। फिर वो लोकल कैश में रहता है — अगली इमेज 3-5 सेकंड में बन जाती है।" },
  { q: "क्या मोबाइल पर चलता है?", a: "हाँ। Chrome, Safari, Firefox, Edge — फोन, टैबलेट, लैपटॉप, सब पर चलता है।" },
  { q: "अधिकतम इमेज साइज़ क्या है?", a: "4096 × 4096 पिक्सेल और 30 MB तक। बड़ी इमेज ऑटोमैटिक रिसाइज़ हो जाती हैं।" },
  { q: "Remove.bg या Photoshop से कैसे अलग है?", a: "Remove.bg के विपरीत — कोई अकाउंट नहीं, कोई क्रेडिट लिमिट नहीं, आपकी इमेज प्राइवेट रहती है। Photoshop के विपरीत — कुछ इंस्टॉल नहीं करना, ब्राउज़र में तुरंत चलता है।" },
  { q: "क्या लोगों के अलावा भी काम करता है?", a: "हाँ — हम RMBG-1.4 मॉडल यूज़ करते हैं जो लोगों, प्रोडक्ट्स, लोगो, जानवरों, पौधों और किसी भी चीज़ पर काम करता है।" },
] as const;

export const HOW_IT_WORKS_HI = [
  { title: "अपनी इमेज अपलोड करें", description: "ड्रैग करें, पेस्ट करें या टैप करें। JPG, PNG या WebP — 30 MB तक।" },
  { title: "AI बैकग्राउंड हटा देगा", description: "लोकल AI मॉडल 3-5 सेकंड में प्रोसेस करता है। ना सर्वर, ना क़तार।" },
  { title: "PNG डाउनलोड करें", description: "ट्रांसपेरेंट PNG — किसी भी डिज़ाइन टूल या ऑनलाइन स्टोर में लगाएं।" },
] as const;

export const USE_CASES_HI = [
  { title: "प्रोफ़ाइल फोटो", description: "LinkedIn, WhatsApp, Notion के लिए साफ ट्रांसपेरेंट हेडशॉट्स।", href: "/hi/remove-background-from-product-photo" },
  { title: "प्रोडक्ट फोटो", description: "Amazon, Flipkart, Meesho के लिए सफेद बैकग्राउंड वाली फोटो।", href: "/hi/remove-background-from-product-photo" },
  { title: "लोगो और ब्रांड", description: "किसी भी लोगो को ट्रांसपेरेंट बनाएं, किसी भी बैकग्राउंड पर लगाएं।", href: "/hi/remove-background-from-logo" },
  { title: "ट्रांसपेरेंट PNG", description: "एक क्लिक में ट्रांसपेरेंट PNG — डिज़ाइन, स्लाइड्स, वेब के लिए।", href: "/hi/transparent-png-maker" },
  { title: "स्क्रीनशॉट", description: "ट्यूटोरियल और प्रेज़ेंटेशन के लिए स्क्रीनशॉट से सब्जेक्ट निकालें।", href: "/hi/screenshot-background-remover" },
  { title: "बल्क प्रोसेसिंग", description: "एक बार में 20 इमेज प्रोसेस करें और ZIP में डाउनलोड करें।", href: "/hi/bulk" },
] as const;
