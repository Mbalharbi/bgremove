// Portuguese (pt-BR) strings for /pt/ routes.
import { SITE } from "@/lib/site";

export const SITE_PT = {
  name: SITE.name,
  domain: SITE.domain,
  url: `${SITE.url}/pt`,
  title: "Removedor de Fundo Grátis — Funciona no Navegador, Sem Upload | BgRemove",
  description:
    "Remova o fundo de qualquer imagem em segundos com IA. Funciona 100% no seu navegador — suas fotos nunca saem do seu dispositivo. Grátis, sem limites, sem cadastro.",
  tagline: "Remova fundos em segundos. 100% privado. 100% grátis.",
  ogImage: SITE.ogImage,
} as const;

export const NAV_LINKS_PT = [
  { href: "/pt", label: "Removedor" },
  { href: "/pt/bulk", label: "Em lote" },
  { href: "/pt/transparent-png-maker", label: "PNG Transparente" },
  { href: "/pt/portrait-background-remover", label: "Retratos" },
  { href: "/pt/about", label: "Sobre" },
] as const;

export const FOOTER_LINKS_PT = {
  "Ferramentas": [
    { href: "/pt", label: "Removedor de Fundo" },
    { href: "/pt/bulk", label: "Em Lote" },
    { href: "/pt/transparent-png-maker", label: "Criador de PNG" },
  ],
  "Usos": [
    { href: "/pt/portrait-background-remover", label: "Retratos" },
    { href: "/pt/product-photo-background-remover", label: "Produtos" },
  ],
  "Site": [
    { href: "/pt/about", label: "Sobre" },
    { href: "/pt/privacy", label: "Privacidade" },
  ],
} as const;

export const FAQ_PT = [
  { q: "O BgRemove é realmente grátis?", a: "Sim — totalmente grátis, sem limites. Sem cadastro, sem marca d'água, sem assinatura. A ferramenta roda no seu navegador, então não temos custo de servidor por imagem." },
  { q: "Minhas fotos são enviadas para um servidor?", a: "Não. Cada imagem é processada no seu dispositivo usando um modelo de IA local. Suas fotos nunca saem do seu navegador — nem nós podemos vê-las." },
  { q: "Quais formatos são suportados?", a: "BgRemove aceita JPG, PNG e WebP até 30 MB. O resultado é sempre um PNG com fundo transparente." },
  { q: "Por que a primeira remoção é mais lenta?", a: "Na primeira vez, seu navegador baixa o modelo de IA (~44MB). Depois fica em cache e processa em 3-5 segundos." },
  { q: "Funciona no celular?", a: "Sim. Funciona em todos os navegadores modernos — Chrome, Safari, Firefox, Edge — em celulares, tablets e desktops." },
  { q: "Qual o tamanho máximo da imagem?", a: "Até 4096×4096 pixels e 30 MB. Imagens maiores são redimensionadas automaticamente." },
  { q: "Como se compara ao Remove.bg ou Photoshop?", a: "Diferente do Remove.bg, você não precisa de conta, não há créditos e suas imagens ficam privadas. Diferente do Photoshop, não há nada para instalar — funciona em qualquer navegador instantaneamente." },
  { q: "Funciona com objetos, não só pessoas?", a: "Sim — usamos o modelo RMBG-1.4 que funciona com pessoas, produtos, logos, animais, plantas e qualquer objeto." },
] as const;

export const HOW_IT_WORKS_PT = [
  { title: "Envie sua imagem", description: "Arraste, cole ou clique para enviar. JPG, PNG ou WebP até 30 MB." },
  { title: "A IA remove o fundo", description: "Modelo local processa em 3-5 segundos. Sem servidor, sem fila." },
  { title: "Baixe como PNG", description: "PNG transparente pronto para qualquer ferramenta de design ou loja online." },
] as const;

export const USE_CASES_PT = [
  { title: "Fotos de perfil", description: "Headshots limpos e transparentes para LinkedIn, Slack, Notion.", href: "/pt/portrait-background-remover" },
  { title: "Fotos de produtos", description: "Fundo branco pronto para Shopify, Mercado Livre e Instagram.", href: "/pt/product-photo-background-remover" },
  { title: "Logos e marcas", description: "Torne qualquer logo transparente para combinar com qualquer fundo.", href: "/pt/logo-background-remover" },
  { title: "PNG transparente", description: "PNG transparente com um clique — para design, slides, web.", href: "/pt/transparent-png-maker" },
  { title: "Capturas de tela", description: "Recorte assuntos de screenshots para tutoriais e apresentações.", href: "/pt/screenshot-background-remover" },
  { title: "Processamento em lote", description: "Processe até 20 imagens de uma vez e baixe como ZIP.", href: "/pt/bulk" },
] as const;
