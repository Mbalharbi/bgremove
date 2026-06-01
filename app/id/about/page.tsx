import type { Metadata } from "next";
import Link from "next/link";
import { Lock, Sparkles, Zap, Code2 } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Tentang BgRemove — Penghapus Background Berbasis Browser",
  description: "BgRemove adalah penghapus background gratis yang memproses foto Anda di perangkat sendiri. Tanpa akun, tanpa upload, tanpa pelacakan.",
  alternates: { canonical: `${SITE.url}/id/about/`, languages: { "en-US": `${SITE.url}/about/`, "id-ID": `${SITE.url}/id/about/` } },
};

const PRINCIPLES = [
  { Icon: Lock, title: "Privasi sejak desain", body: "Kami tidak bisa melihat foto Anda karena mereka tidak pernah sampai ke kami. Model AI hidup di browser Anda." },
  { Icon: Zap, title: "Kecepatan dulu", body: "Tanpa antrean upload, tanpa rate limit. Satu-satunya hambatan adalah perangkat Anda — biasanya 3-5 detik per gambar." },
  { Icon: Sparkles, title: "Gratis selamanya", body: "Tanpa watermark, tanpa kredit, tanpa dinding pendaftaran. Iklan menutup biaya, tapi alatnya tetap gratis." },
  { Icon: Code2, title: "Standar terbuka", body: "Dibangun di atas MediaPipe, Canvas, dan WebAssembly — teknologi web terbuka yang bekerja di mana pun." },
];

export default function IdAboutPage() {
  return (
    <>
      <PageHeader eyebrow="Tentang" title="Penghapus background yang menghormati foto Anda" description="Sebagian besar alat online mengunggah gambar Anda ke server. Kami tidak. BgRemove menjalankan model AI sepenuhnya di browser Anda." />
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
          <h2 className="text-xl font-semibold">Coba sekarang</h2>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">Tarik foto dan lihat sendiri — tanpa daftar, tanpa upload, tanpa menunggu.</p>
          <Button asChild size="lg" className="mt-4"><Link href="/id">Buka alat →</Link></Button>
        </div>
      </section>
    </>
  );
}
