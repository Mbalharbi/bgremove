import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { SeoLanding } from "@/components/seo-landing";
import { webAppSchema, buildFaqSchema } from "@/lib/schema-locale";
import { SITE } from "@/lib/site";

const URL = `${SITE.url}/zh/screenshot-background-remover/`;
const EN = `${SITE.url}/screenshot-background-remover/`;
const TITLE = "截图抠图 — 免费在线去除截图背景，生成透明 PNG";
const DESC = "免费在线去除截图背景：把截图中的图标、文字、界面或人物抠出来，生成透明 PNG，用于教程、PPT 和文章。浏览器本地处理，截图不上传。";

const faqs = [
  { q: "截图里的文字会被抠掉吗？", a: "使用纯色模式不会：它只删除背景色。AI 模式更适合人物和物体。" },
  { q: "手机截图可以吗？", a: "可以，安卓和 iPhone 截图都支持。" },
  { q: "截图会上传吗？", a: "不会，全部在浏览器中处理。" },
  { q: "能批量处理多张截图吗？", a: "可以使用批量页面，一次最多 20 张。" },
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: {
    canonical: URL,
    languages: { "en-US": EN, ar: `${SITE.url}/ar/screenshot-background-remover/`, "zh-CN": URL, "x-default": EN },
  },
};

export default function Page() {
  return (
    <>
      <JsonLd data={[webAppSchema({ bcp47: "zh-CN", url: URL, name: "BgRemove 截图工具", description: DESC }), buildFaqSchema("zh-CN", faqs)]} />
      <SeoLanding
        eyebrow="截图工具"
        title="截图抠图，干净利落"
        description="把截图里的图标、文字或界面元素单独抠出来，放进教程、PPT 和文章里。"
        trustPills={[{ icon: "lock", label: "本地处理，不上传" }, { icon: "zap", label: "几秒完成" }, { icon: "sparkles", label: "免费" }]}
        bullets={[
          { title: "纯色模式", body: "截图背景多为纯色：纯色模式只去掉背景色，文字和图标完整保留。" },
          { title: "支持粘贴", body: "截图后直接 Ctrl+V 粘贴到页面即可。" },
          { title: "透明 PNG", body: "导出透明背景，放在任何底色上都不突兀。" },
          { title: "保护隐私", body: "截图常含敏感信息，全部在本地处理。" },
        ]}
        sections={[
          { heading: "怎么用", body: "截图（Windows：Win+Shift+S；Mac：Cmd+Shift+4）。\n\n在页面中直接粘贴或拖入。\n\n纯色背景会提示使用“纯色模式”，人物截图则用 AI 抠图。\n\n下载透明 PNG。" },
          { heading: "什么时候用 AI，什么时候用纯色模式", body: "截图里是文字、图标、按钮等界面元素——用纯色模式，不会误删文字。\n\n截图里是人物或物体（如视频会议画面）——用 AI 抠图。" },
        ]}
        faqs={faqs}
        faqTitle="常见问题"
        related={[
          { href: "/zh/logo-background-remover/", label: "Logo 抠图" },
          { href: "/zh/transparent-png-maker/", label: "透明 PNG 制作" },
          { href: "/zh/", label: "在线抠图首页" },
        ]}
        relatedTitle="相关工具"
        ctaTitle="立即试用"
        ctaSubtitle="免费、无需注册、照片不上传。"
        ctaButton="开始抠图"
        ctaHref="/zh/screenshot-background-remover/"
      />
    </>
  );
}
