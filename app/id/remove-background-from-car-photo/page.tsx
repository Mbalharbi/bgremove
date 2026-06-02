import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { SeoLanding } from "@/components/seo-landing";
import { webAppSchema, buildFaqSchema } from "@/lib/schema-locale";
import { SITE } from "@/lib/site";

const URL = `${SITE.url}/id/remove-background-from-car-photo/`;
const TITLE = "Hapus Background Foto Mobil — Untuk Dealer dan Penjual OLX";
const DESC = "Hapus background foto mobil untuk OLX, Mobil123, OtoSpektor. Bulk support, di browser, gratis.";

const faqs = [
  { q: "Apakah bagus untuk OLX dan Mobil123?", a: "Ya. PNG transparan dengan background putih atau gradient = listing profesional." },
  { q: "Apakah shadow dan refleksi terpotong?", a: "AI memotong body mobil bersih. Untuk shadow lantai, biarkan area sekitar tidak dipotong sebelum proses." },
  { q: "Berapa foto sekaligus?", a: "Hingga 20 dengan mode bulk." },
  { q: "Apakah foto malam bekerja?", a: "Cahaya rendah agak bervariasi. Cahaya siang/studio memberi hasil terbaik." },
  { q: "Apakah foto privat?", a: "Ya — semua diproses di browser, data pelanggan aman." },
];

export const metadata: Metadata = { title: TITLE, description: DESC, alternates: { canonical: URL } };

export default function Page() {
  return (
    <>
      <JsonLd data={[webAppSchema({ bcp47: "id-ID", url: URL, name: "BgRemove Foto Mobil", description: DESC }), buildFaqSchema("id-ID", faqs)]} />
      <SeoLanding
        eyebrow="Dealer Mobil"
        title="Hapus background foto mobil"
        description="OLX, Mobil123, dealer — listing mobil profesional dengan cutout bersih."
        trustPills={[{ icon: "lock", label: "Di browser" }, { icon: "zap", label: "Bulk" }, { icon: "sparkles", label: "Gratis" }]}
        bullets={[
          { title: "Body mobil bersih", body: "AI menangkap detail edge, mirror, antena." },
          { title: "Marketplace ready", body: "OLX, Mobil123, OtoSpektor — semua cocok." },
          { title: "Mode bulk", body: "20 foto mobil sekaligus — katalog showroom." },
          { title: "Tampilan studio", body: "PNG transparan + gradient background = nuansa premium." },
        ]}
        sections={[
          { heading: "Dampak pada listing", body: "Listing dengan background bersih dapat 2-3x klik lebih banyak. Background buruk mengalihkan perhatian. Cutout bersih = kesan profesional = penjualan cepat." },
          { heading: "Tips foto terbaik", body: "Ambil foto siang hari.\n\nSudut 3/4 paling bagus.\n\nKontras background — mobil putih di background gelap.\n\nSetiap sudut: depan, samping, belakang, interior." },
          { heading: "Workflow dealer", body: "Mobil baru → 4-6 foto → /id/bulk → PNG transparan → Canva untuk background putih → listing siap." },
        ]}
        faqs={faqs}
        faqTitle="Pertanyaan Umum"
        related={[
          { href: "/id/bulk", label: "Bulk" },
          { href: "/id/remove-background-from-product-photo", label: "Foto Produk" },
          { href: "/id", label: "Penghapus utama" },
        ]}
        relatedTitle="Alat Terkait"
        ctaTitle="Upgrade listing hari ini"
        ctaSubtitle="Coba satu foto mobil."
        ctaButton="Mulai"
        ctaHref="/id"
      />
    </>
  );
}
