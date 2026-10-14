import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { SeoLanding } from "@/components/seo-landing";
import { webAppSchema, buildFaqSchema } from "@/lib/schema-locale";
import { SITE } from "@/lib/site";

const URL = `${SITE.url}/zh/product-photo-background-remover/`;
const TITLE = "商品图抠图 — 免费在线去除商品背景，电商白底图";
const DESC = "免费在线抠商品图：去除背景并生成白底主图或透明 PNG，适用于淘宝、拼多多、亚马逊、Shopify 等平台。浏览器本地处理，支持批量。";

const faqs = [
  { q: "能直接生成白底图吗？", a: "可以：抠图完成后，在“背景”里选择白色，下载即可。" },
  { q: "可以批量处理吗？", a: "可以，批量页面一次最多 20 张，并打包为 ZIP。" },
  { q: "透明或反光的商品效果如何？", a: "大部分可以处理，玻璃、塑料包装边缘可能需要用修整画笔微调。" },
  { q: "收费吗？", a: "完全免费，无水印，无需注册。" },
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: {
    canonical: `${SITE.url}/zh/product-photo-background-remover/`,
    languages: {
      "en-US": `${SITE.url}/product-photo-background-remover/`,
      "ar": `${SITE.url}/ar/product-photo-background-remover/`,
      "zh-CN": `${SITE.url}/zh/product-photo-background-remover/`,
      "hi-IN": `${SITE.url}/hi/remove-background-from-product-photo/`,
      "id-ID": `${SITE.url}/id/remove-background-from-product-photo/`,
      "x-default": `${SITE.url}/product-photo-background-remover/`,
    },
  },
};

export default function Page() {
  return (
    <>
      <JsonLd data={[webAppSchema({ bcp47: "zh-CN", url: URL, name: "BgRemove 电商商品图", description: DESC }), buildFaqSchema("zh-CN", faqs)]} />
      <SeoLanding
        eyebrow="电商商品图"
        title="商品图抠图，秒出白底主图"
        description="给商品照片去背景，生成平台要求的纯白底主图或透明 PNG。"
        trustPills={[{ icon: "lock", label: "本地处理，不上传" }, { icon: "zap", label: "几秒完成" }, { icon: "sparkles", label: "免费" }]}
        bullets={[
          { title: "白底主图", body: "抠图后选择白色背景，直接生成电商平台常用的白底图。" },
          { title: "批量处理", body: "一次最多 20 张，打包下载 ZIP。" },
          { title: "细节修整", body: "用擦除 / 恢复画笔处理透明包装、细小配件。" },
          { title: "新品保密", body: "未发布的新品照片不会上传到服务器。" },
        ]}
        sections={[
          { heading: "适合哪些平台", body: "淘宝、天猫、京东、拼多多主图。\n\n亚马逊、eBay、Shopify、TikTok Shop 等跨境平台（多要求纯白底）。\n\n小红书、抖音商品展示。" },
          { heading: "拍摄建议", body: "在纯色背景前拍摄，商品与背景颜色区分明显。\n\n光线均匀，减少阴影。\n\n玻璃、透明材质边缘较难，可用修整画笔补充。" },
        ]}
        faqs={faqs}
        faqTitle="常见问题"
        related={[
          { href: "/zh/bulk/", label: "批量抠图" },
          { href: "/zh/transparent-png-maker/", label: "透明 PNG 制作" },
          { href: "/zh/", label: "在线抠图首页" },
        ]}
        relatedTitle="相关工具"
        ctaTitle="立即试用"
        ctaSubtitle="免费、无需注册、照片不上传。"
        ctaButton="开始抠图"
        ctaHref="/zh/product-photo-background-remover/"
      />
    </>
  );
}
