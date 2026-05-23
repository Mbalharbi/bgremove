import { JsonLd } from "@/components/json-ld";
import { LocalizedHome } from "@/components/localized-home";
import { SITE_ES, FAQ_ES, HOW_IT_WORKS_ES, USE_CASES_ES } from "@/lib/site-es";
import { webAppSchema, howToSchema, faqSchema } from "@/lib/schema-locale";

export default function SpanishHome() {
  return (
    <>
      <JsonLd
        data={[
          webAppSchema({ bcp47: "es-ES", url: SITE_ES.url, name: SITE_ES.name, description: SITE_ES.description }),
          howToSchema({ bcp47: "es-ES", name: "Cómo quitar el fondo de una imagen en segundos", description: "Quita el fondo de cualquier imagen con una herramienta gratuita que funciona en el navegador.", steps: HOW_IT_WORKS_ES }),
          faqSchema({ bcp47: "es-ES", items: FAQ_ES }),
        ]}
      />
      <LocalizedHome
        badge="IA 100% gratis en tu navegador"
        title="Quita fondos de imágenes"
        titleHighlight="en segundos"
        subtitle="Gratis, sin límites y 100% privado — tus imágenes se procesan completamente en tu navegador. Sin subir, sin registro, sin marca de agua."
        trustPills={[
          { icon: "lock", label: "Funciona en el navegador" },
          { icon: "zap", label: "Sin subir a servidores" },
          { icon: "sparkles", label: "Gratis para siempre" },
        ]}
        howTitle="Tres pasos. Cero complicación."
        howSubtitle="Sin cuentas, sin instalación, sin enviar tus fotos a servidores extraños. Solo un navegador y unos segundos."
        howStepLabel="Paso"
        steps={HOW_IT_WORKS_ES}
        useCasesTitle="Diseñado para quien trabaja con imágenes"
        useCasesSubtitle="Ya seas diseñador, marketero, vendedor online o solo actualizando tu foto de perfil — BgRemove se aparta de tu camino."
        useCases={USE_CASES_ES}
        faqTitle="Preguntas Frecuentes"
        faqSubtitle="Respuestas claras sobre cómo funciona la herramienta, qué es gratis y qué queda privado."
        faqs={FAQ_ES}
        ctaTitle="Pruébalo ahora — toma 2 segundos"
        ctaSubtitle="Arrastra una imagen, obtén una versión con fondo transparente. Sin registro, sin esperas, sin sorpresas."
        ctaButton="Empezar ahora"
      />
    </>
  );
}
