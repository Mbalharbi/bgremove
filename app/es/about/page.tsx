import type { Metadata } from "next";
import Link from "next/link";
import { Lock, Sparkles, Zap, Code2 } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Acerca de BgRemove — Quitar Fondo desde el Navegador",
  description: "BgRemove es un quitador de fondo gratuito que procesa tus fotos en tu propio dispositivo. Sin cuentas, sin subir, sin vigilancia.",
  alternates: { canonical: `${SITE.url}/es/about/`, languages: { "en-US": `${SITE.url}/about/`, "es-ES": `${SITE.url}/es/about/` } },
};

const PRINCIPLES = [
  { Icon: Lock, title: "Privacidad por diseño", body: "No podemos ver tus fotos porque nunca llegan a nosotros. El modelo de IA vive en tu navegador." },
  { Icon: Zap, title: "Velocidad primero", body: "Sin cola de subida, sin límites de uso. El único cuello de botella es tu dispositivo — usualmente 3-5 segundos por imagen." },
  { Icon: Sparkles, title: "Gratis para siempre", body: "Sin marca de agua, sin créditos, sin muro de registro. La publicidad paga las cuentas, pero la herramienta queda gratis." },
  { Icon: Code2, title: "Estándares abiertos", body: "Construido con MediaPipe, Canvas y WebAssembly — tecnología web abierta que funciona en todas partes." },
];

export default function EsAboutPage() {
  return (
    <>
      <PageHeader eyebrow="Acerca" title="Un quitador de fondo que respeta tus fotos" description="La mayoría de herramientas online suben tus imágenes a un servidor. Nosotros no. BgRemove ejecuta el modelo de IA enteramente en tu navegador." />
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
          <h2 className="text-xl font-semibold">Pruébalo ahora</h2>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">Suelta una foto y míralo tú mismo — sin registro, sin subir, sin esperar.</p>
          <Button asChild size="lg" className="mt-4"><Link href="/es">Abrir la herramienta →</Link></Button>
        </div>
      </section>
    </>
  );
}
