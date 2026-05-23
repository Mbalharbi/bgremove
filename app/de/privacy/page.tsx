import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, EyeOff, ServerOff, Lock } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Datenschutzerklärung — Ihre Fotos verlassen Ihr Gerät nie",
  description: "BgRemove verarbeitet Bilder komplett in Ihrem Browser. Wir laden Ihre Fotos nicht hoch, speichern oder analysieren sie nicht. DSGVO-konform.",
  alternates: { canonical: `${SITE.url}/de/privacy/`, languages: { "en-US": `${SITE.url}/privacy/`, "de-DE": `${SITE.url}/de/privacy/` } },
};

const PROMISES = [
  { Icon: ServerOff, title: "Ihre Bilder erreichen unsere Server nie", body: "Die gesamte KI-Verarbeitung findet in Ihrem Browser mit lokalem Speicher und Ihrer CPU/GPU statt. Es gibt keinen Upload-Schritt." },
  { Icon: EyeOff, title: "Wir sehen Ihre Fotos nicht", body: "Wir können es physisch nicht — die technische Architektur macht es unmöglich." },
  { Icon: Lock, title: "Keine Bildspeicherung", body: "Nicht einmal vorübergehend. Das KI-Modell lädt einmal von einem CDN und läuft danach lokal." },
  { Icon: ShieldCheck, title: "Kein Konto erforderlich", body: "Weil keins benötigt wird. Nichts zum Einloggen, nichts zu synchronisieren, nichts zum Löschen vergessen." },
];

export default function DePrivacyPage() {
  return (
    <>
      <PageHeader eyebrow="Datenschutz" title="Ihre Fotos bleiben auf Ihrem Gerät. Punkt." description="Die meisten 'datenschutzfreundlichen' Tools behaupten, Ihre Fotos nach der Verarbeitung zu löschen. BgRemove erhält sie überhaupt nie." />
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
          <h2>Die technische Version</h2>
          <p>Wenn Sie {SITE.domain} besuchen, lädt Ihr Browser die BgRemove-Web-App (HTML, CSS, JavaScript) zusammen mit einem kleinen KI-Modell (~44 MB) von einem öffentlichen CDN herunter. <strong>Keine Netzwerkanfrage trägt Ihre Bilddaten.</strong> Sie können dies selbst überprüfen: öffnen Sie die DevTools → Netzwerk-Tab, ziehen Sie ein Bild in BgRemove und beobachten Sie — es findet kein Upload statt.</p>
          <h2>DSGVO-Konformität</h2>
          <p>BgRemove erfüllt die DSGVO durch Design: keine personenbezogenen Daten werden erhoben, gespeichert oder übertragen, weil keine Daten unsere Server erreichen.</p>
          <h2>Kontakt</h2>
          <p>Fragen? Schreiben Sie an <Link href={`mailto:${SITE.email}`}>{SITE.email}</Link>.</p>
          <p className="text-xs text-muted-foreground">Letzte Aktualisierung: {new Date().toISOString().split("T")[0]}</p>
        </div>
      </section>
    </>
  );
}
