import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { SeoLanding } from "@/components/seo-landing";
import { webAppSchema, buildFaqSchema } from "@/lib/schema-locale";
import { SITE } from "@/lib/site";
const URL = `${SITE.url}/id/remove-background-from-passport-photo/`;
const TITLE = "Hapus Background Foto Paspor — Buat Background Putih Gratis";
const DESC = "Buat foto paspor, visa, KTP dengan background putih gratis. Di browser, tanpa upload.";
const faqs = [
  { q: "Apakah sesuai standar paspor Indonesia?", a: "Ya. PNG transparan → tambah layer putih di Canva → memenuhi syarat paspor." },
  { q: "Untuk visa US juga?", a: "Ya. Standar background putih semua negara terpenuhi." },
  { q: "Perlu crop ukuran?", a: "Setelah background dihapus, pakai /tools/image-resizer untuk crop 35x45mm." },
  { q: "Apakah foto privat?", a: "Ya. 100% di browser — penting untuk dokumen identitas." },
  { q: "Tanpa studio?", a: "Foto di depan dinding putih dengan HP. AI bersihkan background." },
];
export const metadata: Metadata = { title: TITLE, description: DESC, alternates: { canonical: URL } };
export default function Page() {
  return (<><JsonLd data={[webAppSchema({ bcp47: "id-ID", url: URL, name: "BgRemove Foto Paspor", description: DESC }), buildFaqSchema("id-ID", faqs)]} />
    <SeoLanding
      eyebrow="Alat Foto ID" title="Foto paspor dan visa"
      description="Paspor, visa, KTP, SIM — semua dengan background putih gratis."
      trustPills={[{ icon: "lock", label: "Privat" }, { icon: "zap", label: "Cepat" }, { icon: "sparkles", label: "Gratis" }]}
      bullets={[
        { title: "Siap pemerintah", body: "Standar background putih semua negara." },
        { title: "Buat di rumah", body: "Studio tidak perlu — pakai HP." },
        { title: "Privasi ID", body: "Dokumen ID tidak ke server kami." },
        { title: "Multi-guna", body: "Paspor, visa, SIM, KTP." },
      ]}
      sections={[
        { heading: "Cara foto paspor di rumah", body: "Berdiri di depan dinding putih.\n\nCahaya alami dari jendela.\n\nHP kamera depan lurus.\n\nUpload — unduh PNG transparan.\n\nCanva: tambah layer putih.\n\nResize ke 35x45mm." },
        { heading: "Standar tiap negara", body: "Indonesia: background putih, 35x45mm.\n\nUS visa: 2x2 inch putih.\n\nSchengen: 35x45mm.\n\nUAE: 35x45mm putih." },
        { heading: "Lebih baik dari studio?", body: "Studio Rp50-100rb. Alat ini gratis. Dengan tips fotografi dasar, hasilnya sama profesional." },
      ]}
      faqs={faqs} faqTitle="Pertanyaan Umum"
      related={[{ href: "/tools/image-resizer", label: "Image Resizer" }, { href: "/id/remove-background-from-signature", label: "Tanda Tangan" }, { href: "/id", label: "Penghapus utama" }]}
      relatedTitle="Alat Terkait" ctaTitle="Buat foto paspor sekarang" ctaSubtitle="Tidak perlu studio." ctaButton="Mulai" ctaHref="/id"
    /></>);
}
