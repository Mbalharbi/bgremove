import { JsonLd } from "@/components/json-ld";
import { LocalizedHome } from "@/components/localized-home";
import { SITE_DE, FAQ_DE, HOW_IT_WORKS_DE, USE_CASES_DE } from "@/lib/site-de";
import { webAppSchema, howToSchema, faqSchema } from "@/lib/schema-locale";

export default function GermanHome() {
  return (
    <>
      <JsonLd
        data={[
          webAppSchema({ bcp47: "de-DE", url: SITE_DE.url, name: SITE_DE.name, description: SITE_DE.description }),
          howToSchema({ bcp47: "de-DE", name: "Hintergrund in Sekunden entfernen", description: "Entfernen Sie den Hintergrund jedes Bildes mit einem kostenlosen Tool, das im Browser läuft.", steps: HOW_IT_WORKS_DE }),
          faqSchema({ bcp47: "de-DE", items: FAQ_DE }),
        ]}
      />
      <LocalizedHome
        badge="100% kostenlose KI im Browser"
        title="Bildhintergründe entfernen"
        titleHighlight="in Sekunden"
        subtitle="Kostenlos, ohne Limits und 100% privat — Ihre Bilder werden komplett in Ihrem Browser verarbeitet. Kein Upload, keine Anmeldung, kein Wasserzeichen."
        trustPills={[
          { icon: "lock", label: "Läuft im Browser" },
          { icon: "zap", label: "Kein Upload" },
          { icon: "sparkles", label: "Für immer kostenlos" },
        ]}
        howTitle="Drei Schritte. Null Komplikation."
        howSubtitle="Keine Konten, keine Installation, keine Fotos an fremde Server. Nur ein Browser und ein paar Sekunden."
        howStepLabel="Schritt"
        steps={HOW_IT_WORKS_DE}
        useCasesTitle="Für alle, die mit Bildern arbeiten"
        useCasesSubtitle="Ob Sie Designer, Marketer, Online-Verkäufer oder einfach Ihr Profilbild aktualisieren — BgRemove ist sofort einsatzbereit."
        useCases={USE_CASES_DE}
        faqTitle="Häufig gestellte Fragen"
        faqSubtitle="Klare Antworten dazu, wie das Tool funktioniert, was kostenlos ist und was privat bleibt."
        faqs={FAQ_DE}
        ctaTitle="Jetzt ausprobieren — dauert 2 Sekunden"
        ctaSubtitle="Bild ziehen, transparente Version erhalten. Keine Anmeldung, kein Warten, keine Überraschungen."
        ctaButton="Jetzt starten"
      />
    </>
  );
}
