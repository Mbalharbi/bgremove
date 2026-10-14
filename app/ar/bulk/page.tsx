import type { Metadata } from "next";
import { BulkRemover } from "@/components/bulk-remover";
import { PageHeader } from "@/components/page-header";
import { JsonLd } from "@/components/json-ld";
import { softwareAppSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "إزالة خلفية بالدفعات — حتى 20 صورة دفعة واحدة",
  description:
    "أزِل الخلفية من حتى 20 صورة دفعة واحدة، كل ذلك في متصفحك. حمّل النتيجة بالكامل كملف ZIP واحد. بدون رفع، بدون تسجيل، مجاناً.",
  alternates: {
    canonical: `${SITE.url}/ar/bulk/`,
    languages: {
      "en-US": `${SITE.url}/bulk/`,
      "hi-IN": `${SITE.url}/hi/bulk/`,
      "id-ID": `${SITE.url}/id/bulk/`,
      "pt-BR": `${SITE.url}/pt/bulk/`,
      "es-ES": `${SITE.url}/es/bulk/`,
      "ar": `${SITE.url}/ar/bulk/`,
      "de-DE": `${SITE.url}/de/bulk/`,
      "zh-CN": `${SITE.url}/zh/bulk/`,
      "x-default": `${SITE.url}/bulk/`,
    },
  },
};

export default function ArBulkPage() {
  return (
    <>
      <JsonLd
        data={softwareAppSchema({
          name: "BgRemove — إزالة بالدفعات",
          url: `${SITE.url}/ar/bulk/`,
          description: "أزِل الخلفية من حتى 20 صورة دفعة واحدة في متصفحك.",
        })}
      />
      <PageHeader
        eyebrow="معالجة بالدفعات"
        title="أزِل الخلفية من 20 صورة دفعة واحدة"
        description="اسحب مجموعة من الصور واحصل على الناتج كله كملف ZIP من PNG شفافة. لا شيء يغادر جهازك — كل صورة تُعالَج محلياً."
      />
      <section className="container py-10">
        <BulkRemover />
      </section>
    </>
  );
}
