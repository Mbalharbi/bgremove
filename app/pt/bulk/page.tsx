import type { Metadata } from "next";
import { BulkRemover } from "@/components/bulk-remover";
import { PageHeader } from "@/components/page-header";
import { JsonLd } from "@/components/json-ld";
import { webAppSchema } from "@/lib/schema-locale";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Removedor de Fundo em Lote — Até 20 Imagens de Uma Vez",
  description: "Remova fundos de até 20 imagens de uma vez, tudo no seu navegador. Baixe tudo como ZIP. Sem upload, sem cadastro, grátis.",
  alternates: { canonical: `${SITE.url}/pt/bulk/`, languages: { "en-US": `${SITE.url}/bulk/`, "pt-BR": `${SITE.url}/pt/bulk/` } },
};

export default function PtBulkPage() {
  return (
    <>
      <JsonLd data={webAppSchema({ bcp47: "pt-BR", url: `${SITE.url}/pt/bulk/`, name: "BgRemove — Em Lote", description: "Remova fundos de até 20 imagens de uma vez no navegador." })} />
      <PageHeader
        eyebrow="Processamento em lote"
        title="Remova fundos de 20 imagens de uma vez"
        description="Arraste um lote de fotos e baixe tudo como ZIP de PNGs transparentes. Nada sai do seu dispositivo — cada imagem é processada localmente."
      />
      <section className="container py-10"><BulkRemover /></section>
    </>
  );
}
