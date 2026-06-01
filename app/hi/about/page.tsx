import type { Metadata } from "next";
import Link from "next/link";
import { Lock, Sparkles, Zap, Code2 } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "BgRemove के बारे में — ब्राउज़र-नेटिव बैकग्राउंड रिमूवर",
  description: "BgRemove एक फ्री बैकग्राउंड रिमूवर है जो आपकी फोटो आपके डिवाइस पर ही प्रोसेस करता है। ना अकाउंट, ना अपलोड, ना ट्रैकिंग।",
  alternates: { canonical: `${SITE.url}/hi/about/`, languages: { "en-US": `${SITE.url}/about/`, "hi-IN": `${SITE.url}/hi/about/` } },
};

const PRINCIPLES = [
  { Icon: Lock, title: "डिज़ाइन से ही प्राइवेसी", body: "हम आपकी फोटो नहीं देख सकते क्योंकि वो हम तक पहुँचती ही नहीं। AI मॉडल आपके ब्राउज़र में रहता है।" },
  { Icon: Zap, title: "स्पीड पहले", body: "ना अपलोड क़तार, ना रेट लिमिट। बस आपका डिवाइस — आमतौर पर 3-5 सेकंड प्रति इमेज।" },
  { Icon: Sparkles, title: "हमेशा फ्री", body: "ना वॉटरमार्क, ना क्रेडिट, ना साइन-अप वॉल। विज्ञापन खर्च निकालते हैं, टूल फ्री ही रहता है।" },
  { Icon: Code2, title: "ओपन स्टैंडर्ड्स", body: "MediaPipe, Canvas, और WebAssembly पर बना — ओपन वेब टेक्नोलॉजी, हर जगह चलती है।" },
];

export default function HiAboutPage() {
  return (
    <>
      <PageHeader eyebrow="हमारे बारे में" title="ऐसा बैकग्राउंड रिमूवर जो आपकी फोटो की कद्र करे" description="ज़्यादातर ऑनलाइन टूल आपकी इमेज सर्वर पर अपलोड करते हैं। हम नहीं करते। BgRemove AI मॉडल पूरी तरह आपके ब्राउज़र में चलाता है।" />
      <section className="container py-12">
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {PRINCIPLES.map(({ Icon, title, body }) => (
            <div key={title} className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/40">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"><Icon className="h-5 w-5" /></div>
              <h2 className="mt-3 text-lg font-semibold">{title}</h2>
              <p className="mt-1.5 text-sm text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 rounded-2xl border border-primary/30 bg-primary/5 p-6 sm:p-8">
          <h2 className="text-xl font-semibold">अभी ट्राई करें</h2>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">एक फोटो ड्रॉप करें और खुद देखें — ना साइन-अप, ना अपलोड, ना इंतज़ार।</p>
          <Button asChild size="lg" className="mt-4"><Link href="/hi">टूल खोलें →</Link></Button>
        </div>
      </section>
    </>
  );
}
