import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { SeoLanding } from "@/components/seo-landing";
import { webAppSchema, buildFaqSchema } from "@/lib/schema-locale";
import { SITE } from "@/lib/site";
const URL = `${SITE.url}/id/remove-bg-alternative/`;
const TITLE = "Alternatif Remove.bg Gratis — Tanpa Batas Kredit";
const DESC = "Alternatif Remove.bg terbaik — tanpa akun, tanpa kredit, tanpa upload. Berjalan di browser.";
const faqs = [
  { q: "Remove.bg vs BgRemove?", a: "BgRemove sepenuhnya gratis, tanpa kredit. Gambar Anda tidak meninggalkan browser. Kualitas setara (RMBG-1.4)." },
  { q: "Kualitas sama?", a: "Ya — sering lebih baik. RMBG-1.4 unggul untuk orang, produk, edge kompleks." },
  { q: "Output resolusi tinggi (fitur premium Remove.bg) di sini?", a: "Ya — hingga 4096px gratis." },
  { q: "Bagaimana percaya tidak ada upload?", a: "DevTools (F12) → Network → tidak ada POST membawa gambar. /privacy-proof beri bukti lengkap." },
  { q: "API gratis juga?", a: "Belum ada API — hanya alat web. Bulk 20 gambar sekaligus." },
];
export const metadata: Metadata = { title: TITLE, description: DESC, alternates: { canonical: URL } };
export default function Page() {
  return (<><JsonLd data={[webAppSchema({ bcp47: "id-ID", url: URL, name: "Alternatif Remove.bg", description: DESC }), buildFaqSchema("id-ID", faqs)]} />
    <SeoLanding
      eyebrow="Alternatif" title="Alternatif Remove.bg gratis"
      description="Tanpa kredit. Tanpa akun. Tanpa upload. Kualitas sama."
      trustPills={[{ icon: "lock", label: "Tanpa akun" }, { icon: "zap", label: "Tanpa kredit" }, { icon: "sparkles", label: "100% gratis" }]}
      bullets={[
        { title: "Tanpa batas", body: "Remove.bg: 1 gratis/bulan. BgRemove: tidak terbatas." },
        { title: "Resolusi tinggi", body: "Remove.bg: hi-res berbayar. Di sini 4096px gratis." },
        { title: "Privasi", body: "Remove.bg kirim ke server. BgRemove tidak." },
        { title: "Bulk gratis", body: "Remove.bg API berbayar. Di sini 20 gambar gratis." },
      ]}
      sections={[
        { heading: "Masalah Remove.bg", body: "Remove.bg mahal untuk pemakaian profesional. ~$0.20/gambar. 100 gambar = Rp300rb. Untuk bisnis, jutaan rupiah/bulan.\n\nPlus: setiap gambar di-upload ke server mereka. Risiko untuk foto produk atau gambar privat." },
        { heading: "Bagaimana BgRemove gratis?", body: "Bagaimana kami untung? Tidak dari pengguna langsung. Ada iklan kemungkinan (belum), dan afiliasi alat di masa depan. Alat selalu gratis.\n\nAI di browser — tidak ada biaya server per gambar." },
        { heading: "Panduan migrasi", body: "Hapus akun Remove.bg (opsional).\n\nBookmark /id.\n\nWorkflow sama — drop, proses, unduh.\n\nUI lebih sederhana dari Remove.bg." },
      ]}
      faqs={faqs} faqTitle="Pertanyaan Umum"
      related={[{ href: "/privacy-proof", label: "Bukti Privasi" }, { href: "/id/bulk", label: "Bulk" }, { href: "/id", label: "Penghapus utama" }]}
      relatedTitle="Terkait" ctaTitle="Beralih hari ini" ctaSubtitle="Tidak perlu kartu kredit." ctaButton="Coba sekarang" ctaHref="/id"
    /></>);
}
