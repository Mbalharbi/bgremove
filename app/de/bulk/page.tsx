import type { Metadata } from "next";
import { BulkRemover } from "@/components/bulk-remover";
import { PageHeader } from "@/components/page-header";
import { JsonLd } from "@/components/json-ld";
import { webAppSchema } from "@/lib/schema-locale";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Stapel-Hintergrund-Entferner — Bis zu 20 Bilder gleichzeitig",
  description: "Entfernen Sie Hintergründe von bis zu 20 Bildern gleichzeitig, alles in Ihrem Browser. Alle Ergebnisse als ZIP herunterladen. Kein Upload, keine Anmeldung, kostenlos.",
  alternates: { canonical: `${SITE.url}/de/bulk/`, languages: { "en-US": `${SITE.url}/bulk/`, "de-DE": `${SITE.url}/de/bulk/` } },
};

export default function DeBulkPage() {
  return (
    <>
      <JsonLd data={webAppSchema({ bcp47: "de-DE", url: `${SITE.url}/de/bulk/`, name: "BgRemove — Stapel", description: "Entfernen Sie Hintergründe von bis zu 20 Bildern gleichzeitig im Browser." })} />
      <PageHeader
        eyebrow="Stapelverarbeitung"
        title="Hintergründe von 20 Bildern auf einmal entfernen"
        description="Ziehen Sie einen Stapel Fotos und erhalten Sie das gesamte Set als transparente PNG-ZIP. Nichts verlässt Ihr Gerät — jedes Bild wird lokal verarbeitet."
      />
      <section className="container py-10"><BulkRemover /></section>
    </>
  );
}
