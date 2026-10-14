import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { SeoLanding } from "@/components/seo-landing";
import { webAppSchema, buildFaqSchema } from "@/lib/schema-locale";
import { SITE } from "@/lib/site";

const URL = `${SITE.url}/zh/portrait-background-remover/`;
const EN = `${SITE.url}/portrait-background-remover/`;
const TITLE = "人像抠图 — 免费在线去除照片背景，头像 / 证件照换底";
const DESC = "免费在线人像抠图：去除照片背景，制作透明头像，或换成白底、蓝底、红底。AI 在浏览器本地运行，照片不上传，无需注册。";

const faqs = [
  { q: "能做证件照换底色吗？", a: "可以。抠图后在“背景”里选择白色、蓝色或红色，然后下载。尺寸请按官方要求再裁剪。" },
  { q: "头发能抠干净吗？", a: "大多数照片效果很好；如果有残留，可用修整画笔擦除或恢复。" },
  { q: "需要下载软件吗？", a: "不需要，打开网页即可使用，手机和电脑都可以。" },
  { q: "照片会被保存吗？", a: "不会。处理在浏览器中完成，关闭页面后不留任何副本。" },
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: {
    canonical: URL,
    languages: { "en-US": EN, ar: `${SITE.url}/ar/portrait-background-remover/`, "zh-CN": URL, "x-default": EN },
  },
};

export default function Page() {
  return (
    <>
      <JsonLd data={[webAppSchema({ bcp47: "zh-CN", url: URL, name: "BgRemove 人像 / 头像", description: DESC }), buildFaqSchema("zh-CN", faqs)]} />
      <SeoLanding
        eyebrow="人像 / 头像"
        title="人像抠图，几秒完成"
        description="去掉照片背景，得到干净的人像——用作头像、简历照片，或换成白底、蓝底。"
        trustPills={[{ icon: "lock", label: "本地处理，不上传" }, { icon: "zap", label: "几秒完成" }, { icon: "sparkles", label: "免费" }]}
        bullets={[
          { title: "头发边缘细致", body: "AI 针对人像训练，头发和衣服边缘过渡自然。" },
          { title: "一键换底色", body: "白底、蓝底、红底或任意颜色，也可以换成你自己的图片。" },
          { title: "手动修整", body: "边缘不满意？用擦除 / 恢复画笔微调。" },
          { title: "隐私安全", body: "照片在本地处理，不会上传到任何服务器。" },
        ]}
        sections={[
          { heading: "常见用途", body: "微信、钉钉、领英头像。\n\n简历和求职照片。\n\n证件照换底色（白底 / 蓝底 / 红底）。\n\n社交媒体与短视频封面。" },
          { heading: "拍摄小技巧", body: "人物与背景颜色差异越大，效果越好。\n\n光线均匀，避免强烈逆光。\n\n头发蓬松的照片，可放大后用修整画笔处理细节。" },
        ]}
        faqs={faqs}
        faqTitle="常见问题"
        related={[
          { href: "/zh/product-photo-background-remover/", label: "商品图抠图" },
          { href: "/zh/bulk/", label: "批量抠图" },
          { href: "/zh/", label: "在线抠图首页" },
        ]}
        relatedTitle="相关工具"
        ctaTitle="立即试用"
        ctaSubtitle="免费、无需注册、照片不上传。"
        ctaButton="开始抠图"
        ctaHref="/zh/portrait-background-remover/"
      />
    </>
  );
}
