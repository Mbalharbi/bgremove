import { JsonLd } from "@/components/json-ld";
import { LocalizedHome } from "@/components/localized-home";
import { SITE_ZH, FAQ_ZH, HOW_IT_WORKS_ZH, USE_CASES_ZH } from "@/lib/site-zh";
import { webAppSchema, howToSchema, faqSchema } from "@/lib/schema-locale";

export default function ChineseHome() {
  return (
    <>
      <JsonLd
        data={[
          webAppSchema({ bcp47: "zh-CN", url: SITE_ZH.url, name: SITE_ZH.name, description: SITE_ZH.description }),
          howToSchema({ bcp47: "zh-CN", name: "几秒内去除图片背景", description: "使用在浏览器中运行的免费工具去除任何图片的背景。", steps: HOW_IT_WORKS_ZH }),
          faqSchema({ bcp47: "zh-CN", items: FAQ_ZH }),
        ]}
      />
      <LocalizedHome
        badge="100% 免费 AI 在浏览器中运行"
        title="去除图片背景"
        titleHighlight="几秒搞定"
        subtitle="免费、无限制、100% 隐私 — 您的图片完全在浏览器中处理。无上传、无注册、无水印。"
        trustPills={[
          { icon: "lock", label: "浏览器内运行" },
          { icon: "zap", label: "无服务器上传" },
          { icon: "sparkles", label: "永久免费" },
        ]}
        howTitle="三步搞定，零烦恼"
        howSubtitle="无需账户、无需安装、无需将照片上传到陌生服务器。只需浏览器和几秒钟。"
        howStepLabel="步骤"
        steps={HOW_IT_WORKS_ZH}
        useCasesTitle="为使用图片的每个人设计"
        useCasesSubtitle="无论您是设计师、营销人员、电商卖家，还是只想更新头像 — BgRemove 不挡您的路。"
        useCases={USE_CASES_ZH}
        faqTitle="常见问题"
        faqSubtitle="关于工具如何工作、什么是免费的、什么保持私密的直接回答。"
        faqs={FAQ_ZH}
        ctaTitle="立即试用 — 只需 2 秒"
        ctaSubtitle="拖入一张图片，获得透明背景的版本。无需注册、无需等待、无意外。"
        ctaButton="立即开始"
      />
    </>
  );
}
