import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, EyeOff, ServerOff, Lock } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de Privacidade — Suas Fotos Nunca Saem do Seu Dispositivo",
  description: "BgRemove processa imagens inteiramente no seu navegador. Não fazemos upload, armazenamento ou análise das suas fotos.",
  alternates: { canonical: `${SITE.url}/pt/privacy/`, languages: { "en-US": `${SITE.url}/privacy/`, "pt-BR": `${SITE.url}/pt/privacy/` } },
};

const PROMISES = [
  { Icon: ServerOff, title: "Suas imagens nunca chegam aos nossos servidores", body: "Todo processamento de IA acontece no seu navegador usando memória local e seu CPU/GPU. Não há etapa de upload." },
  { Icon: EyeOff, title: "Não vemos suas fotos", body: "Fisicamente não conseguimos — a arquitetura técnica torna impossível." },
  { Icon: Lock, title: "Sem armazenamento de imagens", body: "Nem mesmo temporariamente. O modelo de IA carrega de um CDN uma vez e roda localmente depois." },
  { Icon: ShieldCheck, title: "Sem cadastro necessário", body: "Porque não há necessidade. Nada para fazer login, nada para sincronizar, nada para esquecer de deletar." },
];

export default function PtPrivacyPage() {
  return (
    <>
      <PageHeader eyebrow="Privacidade" title="Suas fotos ficam no seu dispositivo. Ponto." description="A maioria das ferramentas 'amigas da privacidade' diz que deleta suas fotos após o processamento. BgRemove nunca as recebe em primeiro lugar." />
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
          <h2>A versão técnica</h2>
          <p>Quando você visita {SITE.domain}, seu navegador baixa o aplicativo BgRemove (HTML, CSS, JavaScript) junto com um pequeno modelo de IA (~44 MB) de um CDN público. <strong>Nenhuma solicitação de rede carrega dados das suas imagens.</strong> Verifique você mesmo: abra DevTools → aba Network, solte uma imagem no BgRemove e observe — não ocorre upload.</p>
          <h2>Contato</h2>
          <p>Dúvidas? Envie um email para <Link href={`mailto:${SITE.email}`}>{SITE.email}</Link>.</p>
          <p className="text-xs text-muted-foreground">Última atualização: {new Date().toISOString().split("T")[0]}</p>
        </div>
      </section>
    </>
  );
}
