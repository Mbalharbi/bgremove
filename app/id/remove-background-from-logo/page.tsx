import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { SeoLanding } from "@/components/seo-landing";
import { webAppSchema, buildFaqSchema } from "@/lib/schema-locale";
import { SITE } from "@/lib/site";

const URL = `${SITE.url}/id/remove-background-from-logo/`;
const TITLE = "Cara Menghapus Background Logo — Pembuat Logo Transparan Gratis";
const DESC = "Hapus background dari logo apa pun (JPG/PNG) dan buat PNG transparan. Berjalan di browser, gratis, tanpa daftar.";

const faqs = [
  { q: "Apakah benar-benar gratis?", a: "Ya — sepenuhnya gratis, tanpa daftar, tanpa watermark." },
  { q: "Apakah logo JPG bisa?", a: "Ya. JPG, PNG, WebP — semuanya. Output selalu PNG transparan." },
  { q: "Apakah AI bagus untuk logo?", a: "Ya. Kami pakai RMBG-1.4 yang memotong garis tipis dan teks logo dengan bersih." },
  { q: "Apakah logo aman di perangkat saya?", a: "100%. Semua pemrosesan di browser Anda. Logo tidak pernah ke server kami." },
  { q: "Apakah vektor SVG lebih baik?", a: "Jika punya SVG/AI/EPS asli, pakai itu. Alat ini untuk saat file asli hilang." },
];

export const metadata: Metadata = {
  title: TITLE, description: DESC,
  alternates: { canonical: URL, languages: { "en-US": `${SITE.url}/logo-background-remover/`, "id-ID": URL } },
};

export default function Page() {
  return (
    <>
      <JsonLd data={[webAppSchema({ bcp47: "id-ID", url: URL, name: "BgRemove Logo", description: DESC }), buildFaqSchema("id-ID", faqs)]} />
      <SeoLanding
        eyebrow="Alat Logo"
        title="Hapus background logo"
        description="Ubah logo perusahaan jadi PNG transparan — pasang di website, dokumen, atau presentasi mana pun."
        trustPills={[{ icon: "lock", label: "Di browser" }, { icon: "zap", label: "Tanpa upload" }, { icon: "sparkles", label: "Gratis" }]}
        bullets={[
          { title: "Semua logo", body: "Teks, ikon, minimalis, berwarna — semua bekerja." },
          { title: "Resolusi tinggi", body: "Output hingga 4096px — sempurna untuk cetak dan banner." },
          { title: "Tepi bersih", body: "AI memotong garis tipis dan teks dengan presisi." },
          { title: "Aman bisnis", body: "Logo tidak meninggalkan perangkat Anda — tidak ada kebocoran merek." },
        ]}
        sections={[
          { heading: "Mengapa perlu logo transparan?", body: "Logo JPG terlihat aneh di website atau invoice dengan kotak putih di belakang. PNG transparan menyatu dengan background apa pun — dark mode, flyer berwarna, slide branded." },
          { heading: "Kapan pakai alat ini", body: "Saat desainer kasih logo dalam JPG.\n\nSaat file asli perusahaan lama hilang.\n\nSaat logo diambil dari screenshot/scan.\n\nSaat butuh logo kompetitor untuk presentasi." },
          { heading: "Tips hasil terbaik", body: "Mulai dengan resolusi tinggi.\n\nHindari kompresi JPG berat — akan muncul halo.\n\nLogo teks hitam-putih bekerja paling baik." },
        ]}
        faqs={faqs}
        faqTitle="Pertanyaan Umum"
        related={[
          { href: "/id/transparent-png-maker", label: "PNG Transparan" },
          { href: "/id/remove-background-from-product-photo", label: "Foto Produk" },
          { href: "/id/bulk", label: "Banyak logo sekaligus" },
          { href: "/id", label: "Penghapus utama" },
        ]}
        relatedTitle="Alat Terkait"
        ctaTitle="Coba sekarang"
        ctaSubtitle="Tarik logo Anda, unduh PNG transparan."
        ctaButton="Mulai"
        ctaHref="/id"
      />
    </>
  );
}
