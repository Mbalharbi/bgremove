import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, EyeOff, ServerOff, Lock } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de Privacidad — Tus Fotos Nunca Salen de Tu Dispositivo",
  description: "BgRemove procesa imágenes enteramente en tu navegador. No subimos, almacenamos ni analizamos tus fotos.",
  alternates: {
    canonical: `${SITE.url}/es/privacy/`,
    languages: {
      "en-US": `${SITE.url}/privacy/`,
      "hi-IN": `${SITE.url}/hi/privacy/`,
      "id-ID": `${SITE.url}/id/privacy/`,
      "pt-BR": `${SITE.url}/pt/privacy/`,
      "es-ES": `${SITE.url}/es/privacy/`,
      "ar": `${SITE.url}/ar/privacy/`,
      "de-DE": `${SITE.url}/de/privacy/`,
      "zh-CN": `${SITE.url}/zh/privacy/`,
      "x-default": `${SITE.url}/privacy/`,
    },
  },
};

const PROMISES = [
  { Icon: ServerOff, title: "Tus imágenes nunca llegan a nuestros servidores", body: "Todo el procesamiento de IA ocurre en tu navegador usando memoria local y tu CPU/GPU. No hay paso de subida." },
  { Icon: EyeOff, title: "No vemos tus fotos", body: "Físicamente no podemos — la arquitectura técnica lo hace imposible." },
  { Icon: Lock, title: "Sin almacenamiento de imágenes", body: "Ni siquiera temporalmente. El modelo de IA carga una vez desde nuestro propio dominio y luego corre localmente." },
  { Icon: ShieldCheck, title: "Sin cuenta requerida", body: "Porque no se necesita. Nada para iniciar sesión, nada para sincronizar, nada para olvidar borrar." },
];

export default function EsPrivacyPage() {
  return (
    <>
      <PageHeader eyebrow="Privacidad" title="Tus fotos quedan en tu dispositivo. Punto." description="La mayoría de herramientas 'amigas de la privacidad' dicen que borran tus fotos después de procesarlas. BgRemove nunca las recibe en primer lugar." />
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
          <h2>La versión técnica</h2>
          <p>Cuando visitas {SITE.domain}, tu navegador descarga la aplicación BgRemove (HTML, CSS, JavaScript) junto con el modelo de IA (44–88 MB según tu dispositivo) desde nuestro propio dominio. <strong>Ninguna solicitud de red lleva los datos de tus imágenes.</strong> Puedes verificarlo: abre DevTools → pestaña Network, suelta una imagen en BgRemove y observa — no ocurre subida.</p>
          <h2>Estadísticas de uso anónimas</h2>
          <p>Contamos de forma anónima qué herramienta se usó, si el procesamiento funcionó, cuánto tardó, qué motor de IA se ejecutó y si se descargó el resultado. También contamos visitas a páginas de forma anónima (qué página, el dominio del sitio de origen, tipo de dispositivo y navegador). Sin imágenes, nombres de archivo, direcciones IP ni cookies; en tu navegador solo se guarda una marca de «ya lo usó antes». Si envías tu opinión, incluye cómo se procesó tu última imagen (motor y tipo de dispositivo).</p>
          <h2>Contacto</h2>
          <p>¿Preguntas? Envía un correo a <Link href={`mailto:${SITE.email}`}>{SITE.email}</Link>.</p>
          <p className="text-xs text-muted-foreground">Última actualización: {new Date().toISOString().split("T")[0]}</p>
        </div>
      </section>
    </>
  );
}
