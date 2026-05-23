// Chinese (zh-CN simplified) strings for /zh/ routes.
// Targets mainland China + Taiwan + HK + Singapore + global Chinese diaspora.
import { SITE } from "@/lib/site";

export const SITE_ZH = {
  name: SITE.name,
  domain: SITE.domain,
  url: `${SITE.url}/zh`,
  title: "免费在线抠图工具 — 浏览器本地处理，无需上传 | BgRemove",
  description:
    "使用 AI 在几秒内去除任何图片的背景。100% 在浏览器中运行 — 您的照片永远不会离开您的设备。免费、无限制、无需注册。",
  tagline: "几秒去除背景。100% 隐私。100% 免费。",
  ogImage: SITE.ogImage,
} as const;

export const NAV_LINKS_ZH = [
  { href: "/zh", label: "抠图" },
  { href: "/zh/bulk", label: "批量处理" },
  { href: "/zh/transparent-png-maker", label: "透明 PNG" },
  { href: "/zh/portrait-background-remover", label: "人像" },
  { href: "/zh/about", label: "关于" },
] as const;

export const FOOTER_LINKS_ZH = {
  "工具": [
    { href: "/zh", label: "抠图工具" },
    { href: "/zh/bulk", label: "批量处理" },
    { href: "/zh/transparent-png-maker", label: "透明 PNG 制作" },
  ],
  "用途": [
    { href: "/zh/portrait-background-remover", label: "人像照片" },
    { href: "/zh/product-photo-background-remover", label: "产品图片" },
  ],
  "网站": [
    { href: "/zh/about", label: "关于我们" },
    { href: "/zh/privacy", label: "隐私政策" },
  ],
} as const;

export const FAQ_ZH = [
  { q: "BgRemove 真的免费吗？", a: "是的 — 完全免费，无使用限制。无需注册、无水印、无订阅。该工具在您的浏览器中运行，因此我们没有每张图片的服务器成本。" },
  { q: "我的照片会上传到服务器吗？", a: "不会。每张图片都使用本地 AI 模型在您的设备上处理。您的照片永远不会离开您的浏览器 — 即使我们想看也看不到。" },
  { q: "支持哪些图片格式？", a: "BgRemove 接受 JPG、PNG 和 WebP 格式，最大 30 MB。输出始终是带透明背景的 PNG。" },
  { q: "为什么第一次抠图较慢？", a: "首次使用时，您的浏览器会下载 AI 模型（约 44 MB）。之后它会被本地缓存 — 后续图片在 3-5 秒内处理完成。" },
  { q: "可以在手机上使用吗？", a: "可以。适用于所有现代浏览器 — Chrome、Safari、Firefox、Edge — 在手机、平板和桌面上都能使用。" },
  { q: "图片最大尺寸是多少？", a: "最大 4096 × 4096 像素和 30 MB。更大的图片会自动缩放以适应。" },
  { q: "与 Remove.bg 或 Photoshop 相比如何？", a: "与 Remove.bg 不同，您无需账户、无积分限制，您的图片保持私密。与 Photoshop 不同，无需安装任何东西 — 在任何浏览器中即时工作。" },
  { q: "能处理非人物图片吗？", a: "可以 — 我们使用 RMBG-1.4 模型，支持人物、产品、Logo、动物、植物和任何物体。" },
] as const;

export const HOW_IT_WORKS_ZH = [
  { title: "上传图片", description: "拖放、粘贴或点击上传。JPG、PNG 或 WebP，最大 30 MB。" },
  { title: "AI 去除背景", description: "本地模型在 3-5 秒内处理。无服务器、无排队。" },
  { title: "下载 PNG", description: "透明 PNG 可立即用于任何设计工具或在线商店。" },
] as const;

export const USE_CASES_ZH = [
  { title: "头像照片", description: "为 LinkedIn、微信、钉钉准备干净透明的头像。", href: "/zh/portrait-background-remover" },
  { title: "产品图片", description: "为淘宝、京东、Shopify 准备白底产品图。", href: "/zh/product-photo-background-remover" },
  { title: "Logo 和品牌", description: "让任何 Logo 透明，适应任何背景。", href: "/zh/logo-background-remover" },
  { title: "透明 PNG", description: "一键生成透明 PNG — 用于设计、幻灯片、网页。", href: "/zh/transparent-png-maker" },
  { title: "屏幕截图", description: "从截图中抠出主体，用于教程和演示。", href: "/zh/screenshot-background-remover" },
  { title: "批量处理", description: "一次处理多达 20 张图片，打包下载为 ZIP。", href: "/zh/bulk" },
] as const;
