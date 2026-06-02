import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { SeoLanding } from "@/components/seo-landing";
import { webAppSchema, buildFaqSchema } from "@/lib/schema-locale";
import { SITE } from "@/lib/site";

const URL = `${SITE.url}/id/remove-background-from-signature/`;
const TITLE = "Hapus Background Tanda Tangan — Buat PNG Transparan Gratis";
const DESC = "Foto tanda tangan di kertas, hapus background putih, gunakan PNG transparan di dokumen digital.";
const faqs = [
  { q: "Bekerja di PDF/Word?", a: "Ya. Paste PNG ke dokumen — tanda tangan akan transparan." },
  { q: "Scan atau foto, mana yang lebih baik?", a: "Keduanya bekerja. Foto HP dengan pencahayaan baik sama bagusnya." },
  { q: "Apakah valid untuk dokumen legal?", a: "Ini hanya tanda tangan visual. eSignature legal (seperti privyID) berbeda." },
  { q: "Apakah privat?", a: "Ya — 100% di browser. Tanda tangan tidak ke server kami." },
  { q: "Apakah warna asli dipertahankan?", a: "Ya — AI mempertahankan warna tinta." },
];
export const metadata: Metadata = { title: TITLE, description: DESC, alternates: { canonical: URL } };
export default function Page() {
  return (<><JsonLd data={[webAppSchema({ bcp47: "id-ID", url: URL, name: "BgRemove Tanda Tangan", description: DESC }), buildFaqSchema("id-ID", faqs)]} />
    <SeoLanding
      eyebrow="Alat Tanda Tangan" title="Hapus background tanda tangan"
      description="Tanda tangan di kertas → foto → PNG transparan → langsung di dokumen."
      trustPills={[{ icon: "lock", label: "Privat" }, { icon: "zap", label: "Cepat" }, { icon: "sparkles", label: "Gratis" }]}
      bullets={[
        { title: "Cutout bersih", body: "AI hanya menyimpan garis tinta." },
        { title: "Siap dokumen", body: "PDF, Word, Google Docs." },
        { title: "Privat", body: "Tanda tangan tidak keluar dari perangkat." },
        { title: "Multi tanda tangan", body: "Bulk mode untuk 20 sekaligus." },
      ]}
      sections={[
        { heading: "Mengapa perlu?", body: "Kerja remote butuh tanda tangan digital. Cetak → tanda tangan → scan itu ribet. Buat PNG transparan sekali, lalu paste di PDF/Word mana pun." },
        { heading: "Cara terbaik", body: "Kertas putih + pulpen gelap.\n\nFoto lurus dari atas.\n\nPencahayaan bagus (tanpa shadow).\n\nUpload, unduh PNG transparan." },
        { heading: "Yang perlu diingat", body: "Ini visual, bukan eSignature legal.\n\nUntuk privyID atau sertifikat digital, gunakan layanan resmi.\n\nUntuk surat informal, kontrak draft, email — sempurna." },
      ]}
      faqs={faqs} faqTitle="Pertanyaan Umum"
      related={[{ href: "/id/transparent-png-maker", label: "PNG Transparan" }, { href: "/id/remove-background-from-passport-photo", label: "Foto Paspor" }, { href: "/id", label: "Penghapus utama" }]}
      relatedTitle="Alat Terkait" ctaTitle="Digitalkan tanda tangan sekarang" ctaSubtitle="1 menit selesai." ctaButton="Mulai" ctaHref="/id"
    /></>);
}
