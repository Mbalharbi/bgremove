import type { Metadata } from "next";
import Link from "next/link";
import { Lock, Sparkles, Zap, Code2 } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Über BgRemove — Der browserbasierte Hintergrund-Entferner",
  description: "BgRemove ist ein kostenloser Hintergrund-Entferner, der Ihre Fotos auf Ihrem eigenen Gerät verarbeitet. Keine Konten, kein Upload, keine Überwachung. DSGVO-konform.",
  alternates: { canonical: `${SITE.url}/de/about/`, languages: { "en-US": `${SITE.url}/about/`, "de-DE": `${SITE.url}/de/about/` } },
};

const PRINCIPLES = [
  { Icon: Lock, title: "Datenschutz by design", body: "Wir können Ihre Fotos nicht sehen, weil sie uns nie erreichen. Das KI-Modell lebt in Ihrem Browser. DSGVO-konform ohne Aufwand." },
  { Icon: Zap, title: "Geschwindigkeit zuerst", body: "Keine Upload-Warteschlange, keine Ratelimits. Der einzige Engpass ist Ihr Gerät — meist 3-5 Sekunden pro Bild." },
  { Icon: Sparkles, title: "Für immer kostenlos", body: "Kein Wasserzeichen, keine Credits, keine Anmeldemauer. Werbung deckt die Kosten, aber das Tool bleibt kostenlos." },
  { Icon: Code2, title: "Offene Standards", body: "Gebaut auf MediaPipe, Canvas und WebAssembly — offene Web-Technologien, die überall funktionieren." },
];

export default function DeAboutPage() {
  return (
    <>
      <PageHeader eyebrow="Über uns" title="Ein Hintergrund-Entferner, der Ihre Fotos respektiert" description="Die meisten Online-Tools laden Ihre Bilder auf einen Server hoch. Wir nicht. BgRemove führt das KI-Modell komplett in Ihrem Browser aus." />
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
          <h2 className="text-xl font-semibold">Jetzt ausprobieren</h2>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">Bild reinziehen und selbst sehen — keine Anmeldung, kein Upload, kein Warten.</p>
          <Button asChild size="lg" className="mt-4"><Link href="/de">Tool öffnen →</Link></Button>
        </div>
      </section>
    </>
  );
}
