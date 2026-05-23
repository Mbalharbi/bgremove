import type { Metadata } from "next";
import { BulkRemover } from "@/components/bulk-remover";
import { PageHeader } from "@/components/page-header";
import { JsonLd } from "@/components/json-ld";
import { webAppSchema } from "@/lib/schema-locale";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Quitar Fondo por Lotes — Hasta 20 Imágenes a la Vez",
  description: "Quita fondos de hasta 20 imágenes a la vez, todo en tu navegador. Descarga todo como ZIP. Sin subir, sin registro, gratis.",
  alternates: { canonical: `${SITE.url}/es/bulk/`, languages: { "en-US": `${SITE.url}/bulk/`, "es-ES": `${SITE.url}/es/bulk/` } },
};

export default function EsBulkPage() {
  return (
    <>
      <JsonLd data={webAppSchema({ bcp47: "es-ES", url: `${SITE.url}/es/bulk/`, name: "BgRemove — Por Lotes", description: "Quita fondos de hasta 20 imágenes a la vez en tu navegador." })} />
      <PageHeader
        eyebrow="Procesamiento por lotes"
        title="Quita fondos de 20 imágenes a la vez"
        description="Arrastra un grupo de fotos y obtén todo el conjunto como ZIP de PNGs transparentes. Nada sale de tu dispositivo — cada imagen se procesa localmente."
      />
      <section className="container py-10"><BulkRemover /></section>
    </>
  );
}
