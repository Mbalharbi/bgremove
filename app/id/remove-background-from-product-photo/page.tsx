import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { SeoLanding } from "@/components/seo-landing";
import { webAppSchema, buildFaqSchema } from "@/lib/schema-locale";
import { SITE } from "@/lib/site";

const URL = `${SITE.url}/id/remove-background-from-product-photo/`;
const TITLE = "Hapus Background Foto Produk — Untuk Penjual Tokopedia, Shopee, Lazada";
const DESC = "Buat foto produk dengan background putih untuk Tokopedia, Shopee, Lazada, Bukalapak. Gratis, bulk, di browser.";

const faqs = [
  { q: "Apakah sesuai standar Tokopedia/Shopee?", a: "Ya. PNG transparan → tambah layer putih di Canva → siap upload." },
  { q: "Berapa foto bisa diproses sekaligus?", a: "Hingga 20 dengan alat Bulk — update katalog cepat." },
  { q: "Apakah bekerja untuk produk reflektif (kaca, logam)?", a: "Dengan pencahayaan bagus, ya. Tepi reflektif tipis bisa dibersihkan cepat di Figma." },
  { q: "Apakah foto produk dikirim ke server?", a: "Tidak. 100% di browser — penting untuk seller, karena foto sebelum launch tidak bocor." },
  { q: "Format apa yang diunduh?", a: "Selalu PNG transparan. JPG putih bisa dikonversi 10 detik di alat desain mana pun." },
];

export const metadata: Metadata = { title: TITLE, description: DESC, alternates: { canonical: URL, languages: { "en-US": `${SITE.url}/product-photo-background-remover/`, "id-ID": URL } } };

export default function Page() {
  return (
    <>
      <JsonLd data={[webAppSchema({ bcp47: "id-ID", url: URL, name: "BgRemove Foto Produk", description: DESC }), buildFaqSchema("id-ID", faqs)]} />
      <SeoLanding
        eyebrow="Penjual Online"
        title="Hapus background foto produk"
        description="Tokopedia, Shopee, Lazada, Bukalapak — foto produk siap upload dengan background putih."
        trustPills={[{ icon: "lock", label: "Privat" }, { icon: "zap", label: "Bulk" }, { icon: "sparkles", label: "Gratis" }]}
        bullets={[
          { title: "Tokopedia siap", body: "Background putih kompatibel dengan kebijakan marketplace." },
          { title: "Marketplace ready", body: "Shopee, Lazada, Bukalapak — semua cocok." },
          { title: "Mode bulk", body: "20 foto sekaligus → ZIP → katalog dalam menit." },
          { title: "Privasi penjual", body: "Foto pre-launch tidak ke server mana pun." },
        ]}
        sections={[
          { heading: "Mengapa penting untuk ecommerce?", body: "Tokopedia, Shopee, Lazada — semua butuh background bersih. Studio foto mahal. Alat ini memberi Anda foto kualitas katalog dari kamera HP di rumah." },
          { heading: "Tips foto produk terbaik", body: "Cahaya jendela alami + reflektor putih = tanpa shadow tajam.\n\nKontras antara produk dan background — AI akan deteksi tepi.\n\nHindari permukaan reflektif atau pakai sudut rendah.\n\nMulti angle — lalu proses bulk." },
          { heading: "Workflow 50 produk", body: "Buka /id/bulk dan tarik semua foto.\n\nSetiap foto diproses ~3 detik.\n\nUnduh ZIP — semua PNG transparan.\n\nLangsung upload ke marketplace — Photoshop tidak perlu." },
        ]}
        faqs={faqs}
        faqTitle="Pertanyaan Umum"
        related={[
          { href: "/id/bulk", label: "Pemrosesan Bulk" },
          { href: "/id/background-remover-for-shopify", label: "Untuk Shopify" },
          { href: "/id/background-remover-for-amazon", label: "Untuk Amazon" },
          { href: "/id", label: "Penghapus utama" },
        ]}
        relatedTitle="Alat Terkait"
        ctaTitle="Siapkan katalog hari ini"
        ctaSubtitle="Coba satu foto atau mode bulk."
        ctaButton="Mulai sekarang"
        ctaHref="/id"
      />
    </>
  );
}
