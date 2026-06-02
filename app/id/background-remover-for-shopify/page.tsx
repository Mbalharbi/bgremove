import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { SeoLanding } from "@/components/seo-landing";
import { webAppSchema, buildFaqSchema } from "@/lib/schema-locale";
import { SITE } from "@/lib/site";
const URL = `${SITE.url}/id/background-remover-for-shopify/`;
const TITLE = "Penghapus Background untuk Toko Shopify — Katalog Siap Gratis";
const DESC = "Cutout bersih untuk gambar produk Shopify — PNG transparan atau background putih. Gratis, bulk.";
const faqs = [
  { q: "PNG transparan bekerja di Shopify?", a: "Ya. Shopify mendukung transparansi — akan berpadu dengan background tema Anda." },
  { q: "Bisa tambah background brand?", a: "Ya. Unduh PNG transparan, tambah warna brand di Canva." },
  { q: "Untuk dropshipper?", a: "Ya. Re-process foto supplier dengan branding Anda." },
  { q: "Syarat foto Shopify?", a: "Tanpa ukuran strict — 2048x2048 disarankan. Alat ini output hingga 4096px." },
  { q: "Multi-store?", a: "Gunakan sebanyak yang Anda mau — tanpa batas." },
];
export const metadata: Metadata = { title: TITLE, description: DESC, alternates: { canonical: URL } };
export default function Page() {
  return (<><JsonLd data={[webAppSchema({ bcp47: "id-ID", url: URL, name: "BgRemove Shopify", description: DESC }), buildFaqSchema("id-ID", faqs)]} />
    <SeoLanding
      eyebrow="Toko Shopify" title="Penghapus background untuk Shopify"
      description="Cutout produk siap katalog — dengan background transparan atau branded."
      trustPills={[{ icon: "lock", label: "Privat" }, { icon: "zap", label: "Bulk" }, { icon: "sparkles", label: "Gratis" }]}
      bullets={[
        { title: "Shopify ready", body: "Ukuran 2048x2048 — output hingga 4096px." },
        { title: "Tampilan branded", body: "PNG transparan + background brand = katalog premium." },
        { title: "Dropshipper-friendly", body: "Re-brand foto supplier." },
        { title: "Bulk", body: "20 SKU sekaligus." },
      ]}
      sections={[
        { heading: "Cara cocok dengan tema Shopify", body: "Kebanyakan tema Shopify bagus di background putih/terang. PNG transparan berpadu natural dengan warna tema. Bahkan di tema gelap — tanpa kotak putih." },
        { heading: "Workflow dropshipping", body: "Download foto produk dari AliExpress/supplier.\n\nHapus background di BgRemove.\n\nTambah warna brand background di Canva.\n\nUpload ke Shopify — katalog tampak profesional." },
        { heading: "Tips storefront", body: "Background konsisten untuk semua produk — semua putih, atau semua warna brand.\n\nFoto lifestyle sebagai gambar tambahan — main selalu bersih.\n\nGaya sama untuk setiap sudut." },
      ]}
      faqs={faqs} faqTitle="Pertanyaan Umum"
      related={[{ href: "/id/remove-background-from-product-photo", label: "Foto Produk" }, { href: "/id/bulk", label: "Bulk" }, { href: "/id/background-remover-for-amazon", label: "Untuk Amazon" }, { href: "/id", label: "Penghapus utama" }]}
      relatedTitle="Alat Terkait" ctaTitle="Upgrade toko sekarang" ctaSubtitle="Pemrosesan bulk gratis." ctaButton="Mulai" ctaHref="/id"
    /></>);
}
