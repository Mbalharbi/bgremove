import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { SeoLanding } from "@/components/seo-landing";
import { webAppSchema, buildFaqSchema } from "@/lib/schema-locale";
import { SITE } from "@/lib/site";
const URL = `${SITE.url}/id/transparent-png-maker/`;
const TITLE = "Pembuat PNG Transparan — Konversi JPG ke PNG Transparan Gratis";
const DESC = "Konversi JPG/PNG/WebP ke PNG dengan background transparan. Gratis, tanpa upload, di browser.";
const faqs = [
  { q: "Apa itu PNG transparan?", a: "PNG mendukung alpha channel — pixel bisa sepenuhnya atau sebagian transparan. JPG tidak bisa, jadi background tampak putih/hitam." },
  { q: "Apakah ukuran asli dipertahankan?", a: "Ya. Hingga 4096px — tanpa kehilangan kualitas." },
  { q: "WebP didukung?", a: "Input: ya. Output selalu PNG. Untuk WebP output pakai /tools/image-compressor." },
  { q: "Kenapa bukan Photoshop?", a: "Magic Wand di Photoshop manual dan lambat. AI selesai dalam detik, terutama untuk detail tipis." },
  { q: "Apakah file tetap di saya?", a: "Ya. Semua proses di browser." },
];
export const metadata: Metadata = { title: TITLE, description: DESC, alternates: { canonical: URL, languages: { "en-US": `${SITE.url}/transparent-png-maker/`, "id-ID": URL } } };
export default function Page() {
  return (<><JsonLd data={[webAppSchema({ bcp47: "id-ID", url: URL, name: "BgRemove PNG Maker", description: DESC }), buildFaqSchema("id-ID", faqs)]} />
    <SeoLanding
      eyebrow="PNG Maker" title="Buat PNG transparan"
      description="Ubah JPG/PNG/WebP apa pun jadi PNG dengan background transparan dengan satu klik."
      trustPills={[{ icon: "lock", label: "Di browser" }, { icon: "zap", label: "Cepat" }, { icon: "sparkles", label: "Gratis" }]}
      bullets={[
        { title: "Semua format", body: "JPG, PNG, WebP input → PNG output." },
        { title: "Kualitas asli", body: "Ukuran tidak berubah — hingga 4096px." },
        { title: "AI edge", body: "Detail tipis (rambut, bulu) tetap bersih." },
        { title: "Bulk", body: "20 file sekaligus." },
      ]}
      sections={[
        { heading: "Apa itu transparansi PNG?", body: "Format PNG mendukung alpha channel — pixel bisa transparan penuh atau sebagian. JPG tidak punya, jadi background tampak putih/hitam." },
        { heading: "Kapan diperlukan?", body: "Logo — cocok dengan background website apa pun.\n\nFoto produk di marketplace.\n\nStiker WhatsApp/Telegram.\n\nDesain PowerPoint, Canva, Figma.\n\nLayer untuk editing." },
        { heading: "PNG vs JPG vs WebP", body: "JPG: kecil, tanpa transparansi — untuk foto kamera.\n\nPNG: dengan transparansi, kualitas tinggi.\n\nWebP: transparansi + ukuran kecil — bagus untuk browser modern." },
      ]}
      faqs={faqs} faqTitle="Pertanyaan Umum"
      related={[{ href: "/id/remove-background-from-logo", label: "Logo" }, { href: "/id/remove-background-from-product-photo", label: "Foto Produk" }, { href: "/tools/image-compressor", label: "Kompres PNG" }, { href: "/id", label: "Penghapus utama" }]}
      relatedTitle="Alat Terkait" ctaTitle="Buat PNG transparan sekarang" ctaSubtitle="Tarik JPG/PNG/WebP." ctaButton="Mulai" ctaHref="/id"
    /></>);
}
