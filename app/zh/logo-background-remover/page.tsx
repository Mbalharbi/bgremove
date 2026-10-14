import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { SeoLanding } from "@/components/seo-landing";
import { webAppSchema, buildFaqSchema } from "@/lib/schema-locale";
import { SITE } from "@/lib/site";

const URL = `${SITE.url}/zh/logo-background-remover/`;
const TITLE = "Logo 抠图 — 免费在线去除 Logo 背景，生成透明 PNG";
const DESC = "免费在线去除 Logo 背景，一键生成透明底 PNG，可直接放到网站、名片、PPT 和视频上。在浏览器中处理，无需注册、无水印、不上传。";

const faqs = [
  { q: "Logo 里的白色文字会被删掉吗？", a: "使用纯色模式时不会：它只删除你选中的背景色。如果 Logo 本身含有与背景相同的颜色，可勾选“保留主体内部的此颜色”。" },
  { q: "能导出 SVG 吗？", a: "目前导出透明 PNG。PNG 可以在大多数设计软件中直接使用。" },
  { q: "免费吗？有次数限制吗？", a: "完全免费，无次数限制，无水印，无需注册。" },
  { q: "Logo 会上传吗？", a: "不会。所有处理都在你的浏览器中完成。" },
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: {
    canonical: `${SITE.url}/zh/logo-background-remover/`,
    languages: {
      "en-US": `${SITE.url}/logo-background-remover/`,
      "ar": `${SITE.url}/ar/logo-background-remover/`,
      "zh-CN": `${SITE.url}/zh/logo-background-remover/`,
      "hi-IN": `${SITE.url}/hi/remove-background-from-logo/`,
      "id-ID": `${SITE.url}/id/remove-background-from-logo/`,
      "x-default": `${SITE.url}/logo-background-remover/`,
    },
  },
};

export default function Page() {
  return (
    <>
      <JsonLd data={[webAppSchema({ bcp47: "zh-CN", url: URL, name: "BgRemove Logo 透明背景", description: DESC }), buildFaqSchema("zh-CN", faqs)]} />
      <SeoLanding
        eyebrow="Logo 透明背景"
        title="Logo 抠图，一键变透明"
        description="把白底或纯色背景的 Logo 变成透明 PNG，放在任何颜色的背景上都干净利落。"
        trustPills={[{ icon: "lock", label: "本地处理，不上传" }, { icon: "zap", label: "几秒完成" }, { icon: "sparkles", label: "免费" }]}
        bullets={[
          { title: "纯色模式", body: "Logo 多为纯色背景：用“纯色模式”只去掉背景色，文字和细线 100% 保留。" },
          { title: "透明 PNG", body: "导出带 Alpha 通道的 PNG，可直接用于网站、PPT、视频。" },
          { title: "可换背景色", body: "需要白底或品牌色底？在“背景”里一键更换。" },
          { title: "不上传", body: "品牌素材在本地处理，不会上传到服务器。" },
        ]}
        sections={[
          { heading: "怎么抠 Logo 最干净", body: "上传 Logo 图片。\n\n如果背景是白色或纯色，工具会提示使用“纯色模式”——它只去掉背景颜色，不会误删文字。\n\n如有残留，调高“容差”，或用修整画笔擦除。\n\n下载透明 PNG。" },
          { heading: "为什么 Logo 不建议直接用 AI 抠图", body: "AI 抠图擅长人像和商品，但 Logo 里的细字和细线可能被当成背景删掉。纯色模式只按颜色处理，更适合 Logo 和文字。" },
        ]}
        faqs={faqs}
        faqTitle="常见问题"
        related={[
          { href: "/zh/transparent-png-maker/", label: "透明 PNG 制作" },
          { href: "/zh/screenshot-background-remover/", label: "截图抠图" },
          { href: "/zh/", label: "在线抠图首页" },
        ]}
        relatedTitle="相关工具"
        ctaTitle="立即试用"
        ctaSubtitle="免费、无需注册、照片不上传。"
        ctaButton="开始抠图"
        ctaHref="/zh/logo-background-remover/"
      />
    </>
  );
}
