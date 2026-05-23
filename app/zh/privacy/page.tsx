import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, EyeOff, ServerOff, Lock } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "隐私政策 — 您的照片永远不会离开您的设备",
  description: "BgRemove 完全在您的浏览器中处理图片。我们不上传、不存储、不分析您的照片。",
  alternates: { canonical: `${SITE.url}/zh/privacy/`, languages: { "en-US": `${SITE.url}/privacy/`, "zh-CN": `${SITE.url}/zh/privacy/` } },
};

const PROMISES = [
  { Icon: ServerOff, title: "您的图片永远不会到达我们的服务器", body: "所有 AI 处理都在您的浏览器中使用本地内存和您的 CPU/GPU 进行。没有上传步骤。" },
  { Icon: EyeOff, title: "我们看不到您的照片", body: "物理上我们无法做到 — 技术架构使这成为不可能。" },
  { Icon: Lock, title: "不存储图片", body: "甚至临时也不会。AI 模型从 CDN 加载一次，之后在本地运行。" },
  { Icon: ShieldCheck, title: "无需账户", body: "因为不需要。没有登录、没有同步、没有忘记删除。" },
];

export default function ZhPrivacyPage() {
  return (
    <>
      <PageHeader eyebrow="隐私" title="您的照片留在您的设备上。就这么简单。" description="大多数声称'保护隐私'的工具说它们在处理后会删除您的照片。BgRemove 从一开始就不接收它们。" />
      <section className="container py-10">
        <div className="grid gap-4 sm:grid-cols-2">
          {PROMISES.map(({ Icon, title, body }) => (
            <div key={title} className="rounded-xl border border-primary/30 bg-card p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"><Icon className="h-5 w-5" /></div>
              <h2 className="mt-3 text-lg font-semibold">{title}</h2>
              <p className="mt-1.5 text-sm text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="container py-10">
        <div className="prose prose-slate max-w-none dark:prose-invert">
          <h2>技术细节</h2>
          <p>当您访问 {SITE.domain} 时，您的浏览器会从公共 CDN 下载 BgRemove Web 应用（HTML、CSS、JavaScript）以及一个小型 AI 模型（约 44 MB）。<strong>没有网络请求会传输您的图片数据。</strong>您可以自己验证：打开 DevTools → 网络选项卡，将图片拖入 BgRemove 并观察 — 不会发生上传。</p>
          <h2>联系</h2>
          <p>有问题？发送邮件到 <Link href={`mailto:${SITE.email}`}>{SITE.email}</Link>。</p>
          <p className="text-xs text-muted-foreground">最后更新：{new Date().toISOString().split("T")[0]}</p>
        </div>
      </section>
    </>
  );
}
