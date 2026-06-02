import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { SeoLanding } from "@/components/seo-landing";
import { webAppSchema, buildFaqSchema } from "@/lib/schema-locale";
import { SITE } from "@/lib/site";
const URL = `${SITE.url}/id/background-remover-for-amazon/`;
const TITLE = "Penghapus Background untuk Penjual Amazon — Background Putih Gratis";
const DESC = "Penuhi kebijakan #FFFFFF background putih Amazon gratis. Bulk support, tanpa langganan.";
const faqs = [
  { q: "Apa kebijakan background putih Amazon?", a: "Gambar MAIN Amazon harus background putih murni (RGB 255,255,255). Alat ini beri PNG transparan — tambah layer putih di Canva." },
  { q: "Apakah bulk untuk katalog?", a: "Ya. 20 gambar sekaligus → ZIP." },
  { q: "Apakah melanggar TOS Amazon?", a: "Tidak. Amazon mendorong gambar background bersih. Alat ini membuatnya mudah." },
  { q: "Kualitas seperti Remove.bg?", a: "Ya — kami pakai RMBG-1.4 yang teknis setara atau lebih baik, gratis, tanpa akun." },
  { q: "Foto produk privat?", a: "Ya — foto pre-launch tidak ke server." },
];
export const metadata: Metadata = { title: TITLE, description: DESC, alternates: { canonical: URL } };
export default function Page() {
  return (<><JsonLd data={[webAppSchema({ bcp47: "id-ID", url: URL, name: "BgRemove Amazon", description: DESC }), buildFaqSchema("id-ID", faqs)]} />
    <SeoLanding
      eyebrow="Penjual Amazon" title="Penghapus background untuk Amazon"
      description="Cutout produk sempurna untuk kebijakan #FFFFFF MAIN Amazon."
      trustPills={[{ icon: "lock", label: "Privat" }, { icon: "zap", label: "Bulk" }, { icon: "sparkles", label: "Gratis" }]}
      bullets={[
        { title: "Sesuai Amazon", body: "Background #FFFFFF putih — kebijakan terpenuhi." },
        { title: "Siap FBA", body: "Untuk penjual FBA volume tinggi." },
        { title: "Mode bulk", body: "20 SKU sekaligus — selesai dalam menit." },
        { title: "Anti bocor", body: "Produk pre-launch tidak ke server." },
      ]}
      sections={[
        { heading: "Kebijakan gambar Amazon", body: "Gambar MAIN harus: background RGB 255,255,255, produk menutupi 85% area, tanpa watermark/text/logo. Alat ini beri cutout bersih — tambah layer putih di Canva untuk memenuhi kebijakan." },
        { heading: "Workflow penjual Amazon", body: "Foto produk — background apa pun bekerja.\n\n/id/bulk dengan seluruh set SKU.\n\nSetiap gambar diproses ~3 detik.\n\nUnduh ZIP.\n\nTambah layer putih di Canva.\n\nUpload ke Amazon Seller Central." },
        { heading: "Mengapa lebih baik dari Remove.bg?", body: "Remove.bg: $0.20/gambar, perlu akun, foto di server.\n\nBgRemove: gratis, tanpa akun, foto privat.\n\n100 SKU = Remove.bg Rp300rb, di sini gratis." },
      ]}
      faqs={faqs} faqTitle="Pertanyaan Umum"
      related={[{ href: "/id/remove-background-from-product-photo", label: "Foto Produk" }, { href: "/id/bulk", label: "Bulk" }, { href: "/id/background-remover-for-shopify", label: "Untuk Shopify" }, { href: "/id", label: "Penghapus utama" }]}
      relatedTitle="Alat Terkait" ctaTitle="Proses katalog hari ini" ctaSubtitle="Gratis, bulk, privat." ctaButton="Mulai" ctaHref="/id"
    /></>);
}
