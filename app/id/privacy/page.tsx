import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, EyeOff, ServerOff, Lock } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kebijakan Privasi — Foto Anda Tidak Pernah Meninggalkan Perangkat",
  description: "BgRemove memproses gambar sepenuhnya di browser Anda. Kami tidak mengunggah, menyimpan, atau menganalisis foto Anda.",
  alternates: { canonical: `${SITE.url}/id/privacy/`, languages: { "en-US": `${SITE.url}/privacy/`, "id-ID": `${SITE.url}/id/privacy/` } },
};

const PROMISES = [
  { Icon: ServerOff, title: "Gambar Anda tidak pernah sampai ke server kami", body: "Semua pemrosesan AI terjadi di browser Anda menggunakan memori lokal dan CPU/GPU Anda. Tidak ada langkah upload." },
  { Icon: EyeOff, title: "Kami tidak melihat foto Anda", body: "Secara fisik kami tidak bisa — arsitektur teknisnya membuatnya mustahil." },
  { Icon: Lock, title: "Tidak ada penyimpanan gambar", body: "Bahkan tidak sementara. Model AI dimuat sekali dari CDN dan berjalan lokal setelahnya." },
  { Icon: ShieldCheck, title: "Tanpa akun", body: "Karena tidak butuh. Tidak ada yang perlu di-login, disinkronkan, atau dihapus." },
];

export default function IdPrivacyPage() {
  return (
    <>
      <PageHeader eyebrow="Privasi" title="Foto Anda tetap di perangkat Anda. Titik." description="Sebagian besar alat 'ramah privasi' bilang mereka menghapus foto Anda setelah diproses. BgRemove tidak pernah menerimanya sejak awal." />
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
          <h2>Versi teknis</h2>
          <p>Saat Anda mengunjungi {SITE.domain}, browser Anda mengunduh aplikasi BgRemove (HTML, CSS, JavaScript) bersama model AI kecil (~44 MB) dari CDN publik. <strong>Tidak ada permintaan jaringan yang membawa data gambar Anda.</strong> Anda dapat memverifikasi sendiri: buka DevTools → tab Network, tarik gambar ke BgRemove, dan amati — tidak ada upload.</p>
          <h2>Kontak</h2>
          <p>Pertanyaan? Kirim email ke <Link href={`mailto:${SITE.email}`}>{SITE.email}</Link>.</p>
          <p className="text-xs text-muted-foreground">Terakhir diperbarui: {new Date().toISOString().split("T")[0]}</p>
        </div>
      </section>
    </>
  );
}
