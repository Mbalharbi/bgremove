import type { Metadata } from "next";
import { BulkRemover } from "@/components/bulk-remover";
import { PageHeader } from "@/components/page-header";
import { JsonLd } from "@/components/json-ld";
import { webAppSchema } from "@/lib/schema-locale";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "批量抠图工具 — 一次处理多达 20 张图片",
  description: "一次去除多达 20 张图片的背景，全部在您的浏览器中完成。打包下载为 ZIP。无上传、无注册、免费。",
  alternates: {
    canonical: `${SITE.url}/zh/bulk/`,
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

export default function ZhBulkPage() {
  return (
    <>
      <JsonLd data={webAppSchema({ bcp47: "zh-CN", url: `${SITE.url}/zh/bulk/`, name: "BgRemove — 批量处理", description: "在浏览器中一次处理多达 20 张图片的背景去除。" })} />
      <PageHeader
        eyebrow="批量处理"
        title="一次去除 20 张图片的背景"
        description="拖入一批照片，将整套结果作为透明 PNG ZIP 文件下载。所有图片都在本地处理 — 不会离开您的设备。"
      />
      <section className="container py-10"><BulkRemover /></section>
    </>
  );
}
