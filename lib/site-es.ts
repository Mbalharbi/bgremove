// Spanish (es) strings for /es/ routes. Targets Spain + LATAM.
import { SITE } from "@/lib/site";

export const SITE_ES = {
  name: SITE.name,
  domain: SITE.domain,
  url: `${SITE.url}/es`,
  title: "Quitar Fondo de Imagen Gratis — Funciona en el Navegador, Sin Subir | BgRemove",
  description:
    "Quita el fondo de cualquier imagen en segundos con IA. Funciona 100% en tu navegador — tus fotos nunca salen de tu dispositivo. Gratis, sin límites, sin registro.",
  tagline: "Quita fondos en segundos. 100% privado. 100% gratis.",
  ogImage: SITE.ogImage,
} as const;

export const NAV_LINKS_ES = [
  { href: "/es", label: "Quitar fondo" },
  { href: "/es/bulk", label: "Por lotes" },
  { href: "/es/transparent-png-maker", label: "PNG Transparente" },
  { href: "/es/portrait-background-remover", label: "Retratos" },
  { href: "/es/about", label: "Acerca" },
] as const;

export const FOOTER_LINKS_ES = {
  "Herramientas": [
    { href: "/es", label: "Quitar Fondo" },
    { href: "/es/bulk", label: "Por Lotes" },
    { href: "/es/transparent-png-maker", label: "Creador de PNG" },
  ],
  "Usos": [
    { href: "/es/portrait-background-remover", label: "Retratos" },
    { href: "/es/product-photo-background-remover", label: "Productos" },
  ],
  "Sitio": [
    { href: "/es/about", label: "Acerca" },
    { href: "/es/privacy", label: "Privacidad" },
  ],
} as const;

export const FAQ_ES = [
  { q: "¿Es BgRemove realmente gratis?", a: "Sí — completamente gratis, sin límites de uso. Sin registro, sin marca de agua, sin suscripción. La herramienta funciona en tu navegador, así que no tenemos costos de servidor por imagen." },
  { q: "¿Se suben mis fotos a un servidor?", a: "No. Cada imagen se procesa en tu dispositivo usando un modelo de IA local. Tus fotos nunca salen de tu navegador." },
  { q: "¿Qué formatos están soportados?", a: "BgRemove acepta JPG, PNG y WebP hasta 30 MB. El resultado siempre es un PNG con fondo transparente." },
  { q: "¿Por qué la primera vez es más lenta?", a: "La primera vez, tu navegador descarga el modelo de IA (~44 MB). Después queda en caché y procesa en 3-5 segundos." },
  { q: "¿Funciona en móvil?", a: "Sí. Funciona en todos los navegadores modernos — Chrome, Safari, Firefox, Edge — en móviles, tablets y escritorio." },
  { q: "¿Cuál es el tamaño máximo?", a: "Hasta 4096 × 4096 píxeles y 30 MB. Imágenes más grandes se redimensionan automáticamente." },
  { q: "¿Cómo se compara con Remove.bg o Photoshop?", a: "A diferencia de Remove.bg, no necesitas cuenta, no hay créditos y tus imágenes quedan privadas. A diferencia de Photoshop, no hay nada que instalar." },
  { q: "¿Funciona con objetos, no solo personas?", a: "Sí — usamos el modelo RMBG-1.4 que funciona con personas, productos, logos, animales, plantas y cualquier objeto." },
] as const;

export const HOW_IT_WORKS_ES = [
  { title: "Sube tu imagen", description: "Arrastra, pega o toca para subir. JPG, PNG o WebP hasta 30 MB." },
  { title: "La IA quita el fondo", description: "Modelo local procesa en 3-5 segundos. Sin servidor, sin cola." },
  { title: "Descarga como PNG", description: "PNG transparente listo para cualquier herramienta de diseño o tienda online." },
] as const;

export const USE_CASES_ES = [
  { title: "Fotos de perfil", description: "Headshots limpios y transparentes para LinkedIn, Slack, Notion.", href: "/es/portrait-background-remover" },
  { title: "Fotos de productos", description: "Fondo blanco listo para Shopify, Mercado Libre e Instagram.", href: "/es/product-photo-background-remover" },
  { title: "Logos y marcas", description: "Haz cualquier logo transparente para combinar con cualquier fondo.", href: "/es/logo-background-remover" },
  { title: "PNG transparente", description: "PNG transparente con un clic — para diseño, slides, web.", href: "/es/transparent-png-maker" },
  { title: "Capturas de pantalla", description: "Recorta sujetos de capturas para tutoriales y presentaciones.", href: "/es/screenshot-background-remover" },
  { title: "Procesamiento por lotes", description: "Procesa hasta 20 imágenes a la vez y descárgalas como ZIP.", href: "/es/bulk" },
] as const;
