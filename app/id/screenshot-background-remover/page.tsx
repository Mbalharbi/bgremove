import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { SeoLanding } from "@/components/seo-landing";
import { webAppSchema, buildFaqSchema } from "@/lib/schema-locale";
import { SITE } from "@/lib/site";
const URL = `${SITE.url}/id/screenshot-background-remover/`;
const TITLE = "Hapus Background Screenshot — Untuk Tutorial dan Presentasi";
const DESC = "Potong subjek dari screenshot untuk tutorial dan slide. Gratis, di browser, privat.";
const faqs = [
  { q: "Screenshot mana yang bekerja?", a: "Windows (Win+Shift+S), Mac (Cmd+Shift+4), Android, iOS — semua bekerja." },
  { q: "Screenshot Zoom call?", a: "Ya — bisa potong diri sendiri, peserta lain ke background." },
  { q: "UI element (tombol, menu)?", a: "AI lebih bagus untuk orang. Untuk UI bersih, crop manual lebih baik." },
  { q: "Apakah screenshot privat?", a: "Ya. Screenshot sering berisi data sensitif (email, password) — tidak keluar dari browser." },
  { q: "Multi screenshot?", a: "Bulk mode hingga 20." },
];
export const metadata: Metadata = { title: TITLE, description: DESC, alternates: { canonical: URL } };
export default function Page() {
  return (<><JsonLd data={[webAppSchema({ bcp47: "id-ID", url: URL, name: "BgRemove Screenshot", description: DESC }), buildFaqSchema("id-ID", faqs)]} />
    <SeoLanding
      eyebrow="Alat Screenshot" title="Potong subjek dari screenshot"
      description="Cutout bersih untuk tutorial, slide, dan blog."
      trustPills={[{ icon: "lock", label: "Di browser" }, { icon: "zap", label: "Cepat" }, { icon: "sparkles", label: "Gratis" }]}
      bullets={[
        { title: "Untuk content creator", body: "Thumbnail Twitter, Instagram, YouTube." },
        { title: "Penulis teknis", body: "Tutorial dengan UI shot bersih." },
        { title: "Screenshot Zoom/Teams", body: "Potong diri sendiri, tim lain ke background." },
        { title: "Data sensitif aman", body: "Screenshot tidak ke server." },
      ]}
      sections={[
        { heading: "Kapan dipakai", body: "Blog tutorial — UI bersih untuk ilustrasi.\n\nSlide presentasi — screenshot app dengan figure.\n\nMedia sosial — visual Twitter thread.\n\nPaper riset — figure." },
        { heading: "Cara terbaik", body: "Win+Shift+S untuk crop screenshot.\n\nLangsung drop dari clipboard (alat mendukung paste).\n\nUnduh PNG transparan.\n\nPaste di Canva, PowerPoint, Notion." },
        { heading: "Keterbatasan", body: "AI utamanya untuk orang. Untuk rectangle UI hasilnya variabel — crop manual di Figma lebih baik untuk UI persegi. Tapi sangat bagus untuk orang/objek." },
      ]}
      faqs={faqs} faqTitle="Pertanyaan Umum"
      related={[{ href: "/id/transparent-png-maker", label: "PNG Transparan" }, { href: "/id/bulk", label: "Bulk" }, { href: "/id", label: "Penghapus utama" }]}
      relatedTitle="Alat Terkait" ctaTitle="Coba sekarang" ctaSubtitle="Drop screenshot." ctaButton="Mulai" ctaHref="/id"
    /></>);
}
