import type { Metadata } from "next";
import Link from "next/link";
import { Lock, Sparkles, Zap, Code2 } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sobre o BgRemove — Removedor de Fundo no Navegador",
  description: "BgRemove é um removedor de fundo gratuito que processa suas fotos no próprio dispositivo. Sem contas, sem upload, sem vigilância.",
  alternates: { canonical: `${SITE.url}/pt/about/`, languages: { "en-US": `${SITE.url}/about/`, "pt-BR": `${SITE.url}/pt/about/` } },
};

const PRINCIPLES = [
  { Icon: Lock, title: "Privacidade por design", body: "Não conseguimos ver suas fotos porque elas nunca chegam até nós. O modelo de IA vive no seu navegador." },
  { Icon: Zap, title: "Velocidade primeiro", body: "Sem fila de upload, sem limites. O único gargalo é seu dispositivo — geralmente 3-5 segundos por imagem." },
  { Icon: Sparkles, title: "Grátis para sempre", body: "Sem marca d'água, sem créditos, sem muro de cadastro. Anúncios pagam as contas, mas a ferramenta fica grátis." },
  { Icon: Code2, title: "Padrões abertos", body: "Construído com MediaPipe, Canvas e WebAssembly — tecnologia web aberta que funciona em todo lugar." },
];

export default function PtAboutPage() {
  return (
    <>
      <PageHeader eyebrow="Sobre" title="Um removedor de fundo que respeita suas fotos" description="A maioria das ferramentas online faz upload das suas imagens. Nós não. BgRemove roda o modelo de IA inteiramente no seu navegador." />
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
          <h2 className="text-xl font-semibold">Experimente agora</h2>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">Solte uma foto e veja você mesmo — sem cadastro, sem upload, sem espera.</p>
          <Button asChild size="lg" className="mt-4"><Link href="/pt">Abrir a ferramenta →</Link></Button>
        </div>
      </section>
    </>
  );
}
