import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { SeoLanding } from "@/components/seo-landing";
import { webAppSchema, buildFaqSchema } from "@/lib/schema-locale";
import { SITE } from "@/lib/site";

const URL = `${SITE.url}/zh/transparent-png-maker/`;
const TITLE = "透明 PNG 制作 — 免费在线把图片背景变透明";
const DESC = "免费在线制作透明背景 PNG：上传图片，一键去除背景，得到带透明通道的 PNG，可用于设计、PPT、网页和视频。无需注册、无水印、不上传。";

const faqs = [
  { q: "JPG 能变成透明 PNG 吗？", a: "可以。上传 JPG，去除背景后会导出为透明 PNG。" },
  { q: "透明 PNG 会变模糊吗？", a: "不会，输出保持原图分辨率（超过 4096 像素的图片会等比缩小）。" },
  { q: "手机能用吗？", a: "可以，手机浏览器直接打开即可。" },
  { q: "免费吗？", a: "完全免费，无水印，无需注册。" },
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: {
    canonical: `${SITE.url}/zh/transparent-png-maker/`,
    languages: {
      "en-US": `${SITE.url}/transparent-png-maker/`,
      "ar": `${SITE.url}/ar/transparent-png-maker/`,
      "zh-CN": `${SITE.url}/zh/transparent-png-maker/`,
      "hi-IN": `${SITE.url}/hi/transparent-png-maker/`,
      "id-ID": `${SITE.url}/id/transparent-png-maker/`,
      "x-default": `${SITE.url}/transparent-png-maker/`,
    },
  },
};

export default function Page() {
  return (
    <>
      <JsonLd data={[webAppSchema({ bcp47: "zh-CN", url: URL, name: "BgRemove 透明背景 PNG", description: DESC }), buildFaqSchema("zh-CN", faqs)]} />
      <SeoLanding
        eyebrow="透明背景 PNG"
        title="一键生成透明 PNG"
        description="把任何图片的背景变成透明，得到可以叠加在任意背景上的 PNG。"
        trustPills={[{ icon: "lock", label: "本地处理，不上传" }, { icon: "zap", label: "几秒完成" }, { icon: "sparkles", label: "免费" }]}
        bullets={[
          { title: "真正透明", body: "导出带 Alpha 通道的 PNG，不是白底伪透明。" },
          { title: "两种方式", body: "照片用 AI 抠图；纯色背景的图片用纯色模式，边缘更干净。" },
          { title: "可再换底", body: "需要白底或其他颜色时，一键更换。" },
          { title: "免费不限次", body: "无需注册，无水印，无次数限制。" },
        ]}
        sections={[
          { heading: "透明 PNG 用在哪里", body: "设计稿和海报叠加素材。\n\nPPT、Keynote 演示文稿。\n\n网页图标和插图。\n\n短视频贴纸和封面。" },
          { heading: "怎么判断是否真的透明", body: "下载后放到深色背景上查看：透明区域会显示底色，而不是白色块。本工具导出的 PNG 都带有真正的透明通道。" },
        ]}
        faqs={faqs}
        faqTitle="常见问题"
        related={[
          { href: "/zh/logo-background-remover/", label: "Logo 抠图" },
          { href: "/zh/portrait-background-remover/", label: "人像抠图" },
          { href: "/zh/", label: "在线抠图首页" },
        ]}
        relatedTitle="相关工具"
        ctaTitle="立即试用"
        ctaSubtitle="免费、无需注册、照片不上传。"
        ctaButton="开始抠图"
        ctaHref="/zh/transparent-png-maker/"
      />
    </>
  );
}
