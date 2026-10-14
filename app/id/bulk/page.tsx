import type { Metadata } from "next";
import { BulkRemover } from "@/components/bulk-remover";
import { PageHeader } from "@/components/page-header";
import { JsonLd } from "@/components/json-ld";
import { webAppSchema } from "@/lib/schema-locale";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Penghapus Background Bulk — Hingga 20 Gambar Sekaligus",
  description: "Hapus background hingga 20 gambar sekaligus, semua di browser Anda. Unduh seluruh hasil sebagai ZIP. Tanpa upload, tanpa daftar, gratis.",
  alternates: {
    canonical: `${SITE.url}/id/bulk/`,
    languages: {
      "en-US": `${SITE.url}/bulk/`,
      "hi-IN": `${SITE.url}/hi/bulk/`,
      "id-ID": `${SITE.url}/id/bulk/`,
      "pt-BR": `${SITE.url}/pt/bulk/`,
      "es-ES": `${SITE.url}/es/bulk/`,
      "ar": `${SITE.url}/ar/bulk/`,
      "de-DE": `${SITE.url}/de/bulk/`,
      "zh-CN": `${SITE.url}/zh/bulk/`,
      "x-default": `${SITE.url}/bulk/`,
    },
  },
};

export default function IdBulkPage() {
  return (
    <>
      <JsonLd data={webAppSchema({ bcp47: "id-ID", url: `${SITE.url}/id/bulk/`, name: "BgRemove — Bulk", description: "Hapus background hingga 20 gambar sekaligus di browser." })} />
      <PageHeader
        eyebrow="Pemrosesan bulk"
        title="Hapus background 20 gambar sekaligus"
        description="Tarik sekumpulan foto dan dapatkan seluruh hasil sebagai ZIP PNG transparan. Tidak ada yang meninggalkan perangkat Anda — setiap gambar diproses lokal."
      />
      <section className="container py-10"><BulkRemover /></section>
    </>
  );
}
