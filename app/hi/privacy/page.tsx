import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, EyeOff, ServerOff, Lock } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "प्राइवेसी पॉलिसी — आपकी फोटो आपके डिवाइस से बाहर नहीं जाती",
  description: "BgRemove पूरी तरह आपके ब्राउज़र में इमेज प्रोसेस करता है। हम ना अपलोड करते, ना स्टोर करते, ना एनालाइज़ करते।",
  alternates: { canonical: `${SITE.url}/hi/privacy/`, languages: { "en-US": `${SITE.url}/privacy/`, "hi-IN": `${SITE.url}/hi/privacy/` } },
};

const PROMISES = [
  { Icon: ServerOff, title: "आपकी इमेज हमारे सर्वर तक नहीं पहुँचती", body: "सारी AI प्रोसेसिंग आपके ब्राउज़र में आपकी RAM और CPU/GPU से होती है। कोई अपलोड स्टेप नहीं है।" },
  { Icon: EyeOff, title: "हम आपकी फोटो नहीं देख सकते", body: "तकनीकी रूप से असंभव है — आर्किटेक्चर ही ऐसा है कि कोई रास्ता नहीं।" },
  { Icon: Lock, title: "कोई इमेज स्टोरेज नहीं", body: "अस्थाई भी नहीं। AI मॉडल CDN से एक बार लोड होकर लोकल चलता है।" },
  { Icon: ShieldCheck, title: "अकाउंट की ज़रूरत नहीं", body: "क्योंकि ज़रूरत ही नहीं। ना लॉग-इन, ना सिंक, ना डिलीट करने की चिंता।" },
];

export default function HiPrivacyPage() {
  return (
    <>
      <PageHeader eyebrow="प्राइवेसी" title="आपकी फोटो आपके डिवाइस पर रहती है। बस।" description="ज़्यादातर 'प्राइवेसी-फ्रेंडली' टूल कहते हैं कि प्रोसेसिंग के बाद डिलीट कर देंगे। BgRemove उन्हें पहले मिलती ही नहीं।" />
      <section className="container py-10">
        <div className="grid gap-4 sm:grid-cols-2">
          {PROMISES.map(({ Icon, title, body }) => (
            <div key={title} className="rounded-xl border border-primary/30 bg-card p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"><Icon className="h-5 w-5" /></div>
              <h2 className="mt-3 text-lg font-semibold">{title}</h2>
              <p className="mt-1.5 text-sm text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="container py-10">
        <div className="prose prose-slate max-w-none dark:prose-invert">
          <h2>तकनीकी विवरण</h2>
          <p>जब आप {SITE.domain} खोलते हैं, आपका ब्राउज़र BgRemove ऐप (HTML, CSS, JavaScript) और एक छोटा AI मॉडल (~44 MB) पब्लिक CDN से डाउनलोड करता है। <strong>कोई नेटवर्क रिक्वेस्ट आपकी इमेज डेटा नहीं ले जाती।</strong> खुद वेरिफाई करें: DevTools → Network टैब खोलें, BgRemove में फोटो ड्रॉप करें, और देखें — कोई अपलोड नहीं होता।</p>
          <h2>संपर्क</h2>
          <p>कोई सवाल? ईमेल करें <Link href={`mailto:${SITE.email}`}>{SITE.email}</Link>।</p>
          <p className="text-xs text-muted-foreground">अंतिम अपडेट: {new Date().toISOString().split("T")[0]}</p>
        </div>
      </section>
    </>
  );
}
