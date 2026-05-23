import { JsonLd } from "@/components/json-ld";
import { LocalizedHome } from "@/components/localized-home";
import { SITE_PT, FAQ_PT, HOW_IT_WORKS_PT, USE_CASES_PT } from "@/lib/site-pt";
import { webAppSchema, howToSchema, faqSchema } from "@/lib/schema-locale";

export default function PortugueseHome() {
  return (
    <>
      <JsonLd
        data={[
          webAppSchema({ bcp47: "pt-BR", url: SITE_PT.url, name: SITE_PT.name, description: SITE_PT.description }),
          howToSchema({ bcp47: "pt-BR", name: "Como remover fundo de imagem em segundos", description: "Remova o fundo de qualquer imagem com uma ferramenta gratuita que roda no navegador.", steps: HOW_IT_WORKS_PT }),
          faqSchema({ bcp47: "pt-BR", items: FAQ_PT }),
        ]}
      />
      <LocalizedHome
        badge="IA 100% grátis no seu navegador"
        title="Remova fundos de imagens"
        titleHighlight="em segundos"
        subtitle="Grátis, sem limites e 100% privado — suas imagens são processadas inteiramente no seu navegador. Sem upload, sem cadastro, sem marca d'água."
        trustPills={[
          { icon: "lock", label: "Funciona no navegador" },
          { icon: "zap", label: "Sem upload" },
          { icon: "sparkles", label: "Grátis para sempre" },
        ]}
        howTitle="Três passos. Zero complicação."
        howSubtitle="Sem contas, sem instalação, sem enviar suas fotos para servidores estranhos. Só um navegador e alguns segundos."
        howStepLabel="Passo"
        steps={HOW_IT_WORKS_PT}
        useCasesTitle="Feito para quem trabalha com imagens"
        useCasesSubtitle="Seja você designer, marqueteiro, vendedor online ou só atualizando sua foto de perfil — BgRemove sai do seu caminho."
        useCases={USE_CASES_PT}
        faqTitle="Perguntas Frequentes"
        faqSubtitle="Respostas diretas sobre como a ferramenta funciona, o que é grátis e o que fica privado."
        faqs={FAQ_PT}
        ctaTitle="Experimente agora — leva 2 segundos"
        ctaSubtitle="Arraste uma imagem, receba uma versão com fundo transparente. Sem cadastro, sem espera, sem surpresas."
        ctaButton="Começar agora"
      />
    </>
  );
}
