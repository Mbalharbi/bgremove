import { JsonLd } from "@/components/json-ld";
import { LocalizedHome } from "@/components/localized-home";
import { SITE_ID, FAQ_ID, HOW_IT_WORKS_ID, USE_CASES_ID } from "@/lib/site-id";
import { webAppSchema, howToSchema, faqSchema } from "@/lib/schema-locale";

export default function IndonesianHome() {
  return (
    <>
      <JsonLd
        data={[
          webAppSchema({ bcp47: "id-ID", url: SITE_ID.url, name: SITE_ID.name, description: SITE_ID.description }),
          howToSchema({ bcp47: "id-ID", name: "Cara menghapus background gambar dalam detik", description: "Hapus background gambar apa pun dengan alat gratis yang berjalan di browser.", steps: HOW_IT_WORKS_ID }),
          faqSchema({ bcp47: "id-ID", items: FAQ_ID }),
        ]}
      />
      <LocalizedHome
        badge="AI 100% gratis berjalan di browser Anda"
        title="Hapus background gambar"
        titleHighlight="dalam detik"
        subtitle="Gratis, tanpa batas, dan 100% privat — gambar Anda diproses sepenuhnya di browser. Tanpa upload, tanpa daftar, tanpa watermark."
        trustPills={[
          { icon: "lock", label: "Berjalan di browser" },
          { icon: "zap", label: "Tanpa upload" },
          { icon: "sparkles", label: "Gratis selamanya" },
        ]}
        howTitle="Tiga langkah. Tanpa ribet."
        howSubtitle="Tanpa akun, tanpa instalasi, tanpa mengirim foto Anda ke server asing. Hanya browser dan beberapa detik."
        howStepLabel="Langkah"
        steps={HOW_IT_WORKS_ID}
        useCasesTitle="Dibuat untuk siapa pun yang bekerja dengan gambar"
        useCasesSubtitle="Baik Anda desainer, marketer, penjual online, atau hanya memperbarui foto profil — BgRemove tidak menghalangi Anda."
        useCases={USE_CASES_ID}
        faqTitle="Pertanyaan Umum"
        faqSubtitle="Jawaban jelas tentang cara kerja alat, apa yang gratis, dan apa yang tetap privat."
        faqs={FAQ_ID}
        ctaTitle="Coba sekarang — hanya 2 detik"
        ctaSubtitle="Tarik gambar, dapatkan versi dengan background transparan. Tanpa daftar, tanpa menunggu, tanpa kejutan."
        ctaButton="Mulai sekarang"
      />
    </>
  );
}
