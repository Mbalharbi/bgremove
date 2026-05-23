import type { Metadata } from "next";
import Link from "next/link";
import { Lock, Sparkles, Zap, Code2 } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "关于 BgRemove — 浏览器原生抠图工具",
  description: "BgRemove 是一款免费的抠图工具，在您自己的设备上处理照片。无账户、无上传、无监控。",
  alternates: { canonical: `${SITE.url}/zh/about/`, languages: { "en-US": `${SITE.url}/about/`, "zh-CN": `${SITE.url}/zh/about/` } },
};

const PRINCIPLES = [
  { Icon: Lock, title: "隐私优先设计", body: "我们看不到您的照片，因为它们永远不会到达我们这里。AI 模型在您的浏览器中运行。" },
  { Icon: Zap, title: "速度优先", body: "无上传队列、无速率限制。唯一的瓶颈是您的设备 — 通常每张图片 3-5 秒。" },
  { Icon: Sparkles, title: "永久免费", body: "无水印、无积分、无注册墙。广告维持运营，但工具本身永久免费。" },
  { Icon: Code2, title: "开放标准", body: "基于 MediaPipe、Canvas 和 WebAssembly — 在任何地方都能运行的开放 Web 技术。" },
];

export default function ZhAboutPage() {
  return (
    <>
      <PageHeader eyebrow="关于" title="尊重您照片的抠图工具" description="大多数在线工具会将您的图片上传到服务器。我们不会。BgRemove 完全在您的浏览器中运行 AI 模型。" />
      <section className="container py-12">
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {PRINCIPLES.map(({ Icon, title, body }) => (
            <div key={title} className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/40">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"><Icon className="h-5 w-5" /></div>
              <h2 className="mt-3 text-lg font-semibold">{title}</h2>
              <p className="mt-1.5 text-sm text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 rounded-2xl border border-primary/30 bg-primary/5 p-6 sm:p-8">
          <h2 className="text-xl font-semibold">立即试用</h2>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">放入一张照片亲自体验 — 无需注册、无需上传、无需等待。</p>
          <Button asChild size="lg" className="mt-4"><Link href="/zh">打开工具 →</Link></Button>
        </div>
      </section>
    </>
  );
}
