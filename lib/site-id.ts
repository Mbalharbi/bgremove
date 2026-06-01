// Indonesian (id-ID) strings for /id/ routes.
// Target: Indonesian creators, Tokopedia/Shopee sellers, students.
// Tone: friendly, mobile-first, ecommerce-aware.
import { SITE } from "@/lib/site";

export const SITE_ID = {
  name: SITE.name,
  domain: SITE.domain,
  url: `${SITE.url}/id`,
  title: "Penghapus Background Gratis — Berjalan di Browser, Tanpa Upload | BgRemove",
  description:
    "Hapus background gambar apa pun dalam hitungan detik dengan AI. Berjalan 100% di browser Anda — foto Anda tidak pernah meninggalkan perangkat. Gratis, tanpa batas, tanpa daftar.",
  tagline: "Hapus background dalam detik. 100% privat. 100% gratis.",
  ogImage: SITE.ogImage,
} as const;

export const NAV_LINKS_ID = [
  { href: "/id", label: "Hapus Background" },
  { href: "/id/bulk", label: "Bulk" },
  { href: "/id/transparent-png-maker", label: "PNG Transparan" },
  { href: "/id/remove-background-from-product-photo", label: "Foto Produk" },
  { href: "/id/about", label: "Tentang" },
] as const;

export const FOOTER_LINKS_ID = {
  "Alat": [
    { href: "/id", label: "Penghapus Background" },
    { href: "/id/bulk", label: "Pemrosesan Bulk" },
    { href: "/id/transparent-png-maker", label: "Pembuat PNG Transparan" },
  ],
  "Penggunaan": [
    { href: "/id/remove-background-from-product-photo", label: "Foto Produk" },
    { href: "/id/remove-background-from-logo", label: "Logo" },
    { href: "/id/background-remover-for-shopify", label: "Untuk Toko Online" },
  ],
  "Situs": [
    { href: "/id/about", label: "Tentang" },
    { href: "/id/privacy", label: "Privasi" },
  ],
} as const;

export const FAQ_ID = [
  { q: "Apakah BgRemove benar-benar gratis?", a: "Ya — sepenuhnya gratis, tanpa batas penggunaan. Tidak ada pendaftaran, tidak ada watermark, tidak ada langganan. Alat ini berjalan di browser Anda, jadi kami tidak punya biaya server per gambar." },
  { q: "Apakah foto saya diunggah ke server?", a: "Tidak. Setiap gambar diproses di perangkat Anda menggunakan model AI lokal. Foto Anda tidak pernah meninggalkan browser — kami pun tidak bisa melihatnya." },
  { q: "Format gambar apa yang didukung?", a: "BgRemove menerima JPG, PNG, dan WebP hingga 30 MB. Hasilnya selalu PNG dengan background transparan." },
  { q: "Kenapa pertama kali lebih lambat?", a: "Pertama kali, browser mengunduh model AI (~44 MB). Setelah itu disimpan lokal — gambar berikutnya diproses dalam 3-5 detik." },
  { q: "Apakah bekerja di HP?", a: "Ya. Bekerja di semua browser modern — Chrome, Safari, Firefox, Edge — di HP, tablet, dan desktop." },
  { q: "Berapa ukuran maksimum gambar?", a: "Hingga 4096 × 4096 piksel dan 30 MB. Gambar lebih besar otomatis dikecilkan sambil menjaga rasio aspek." },
  { q: "Bagaimana dibandingkan dengan Remove.bg atau Photoshop?", a: "Tidak seperti Remove.bg, Anda tidak butuh akun, tidak ada kredit, dan gambar Anda tetap privat. Tidak seperti Photoshop, tidak ada yang perlu diinstal — langsung jalan di browser." },
  { q: "Apakah bekerja untuk selain orang?", a: "Ya — kami pakai model RMBG-1.4 yang bekerja untuk orang, produk, logo, hewan, tanaman, dan objek apa pun." },
] as const;

export const HOW_IT_WORKS_ID = [
  { title: "Unggah gambar Anda", description: "Tarik-lepas, tempel, atau ketuk untuk mengunggah. JPG, PNG, atau WebP hingga 30 MB." },
  { title: "AI menghapus background", description: "Model lokal memproses dalam 3-5 detik. Tanpa server, tanpa antrean." },
  { title: "Unduh sebagai PNG", description: "PNG transparan siap dipakai di alat desain atau toko online mana pun." },
] as const;

export const USE_CASES_ID = [
  { title: "Foto profil", description: "Headshot bersih transparan untuk LinkedIn, WhatsApp, Slack.", href: "/id/remove-background-from-product-photo" },
  { title: "Foto produk", description: "Background putih siap untuk Tokopedia, Shopee, dan Instagram.", href: "/id/remove-background-from-product-photo" },
  { title: "Logo & brand", description: "Buat logo apa pun transparan untuk background mana pun.", href: "/id/remove-background-from-logo" },
  { title: "PNG transparan", description: "PNG transparan satu klik — untuk desain, slide, web.", href: "/id/transparent-png-maker" },
  { title: "Tangkapan layar", description: "Potong subjek dari screenshot untuk tutorial dan presentasi.", href: "/id/screenshot-background-remover" },
  { title: "Pemrosesan bulk", description: "Proses hingga 20 gambar sekaligus dan unduh sebagai ZIP.", href: "/id/bulk" },
] as const;
