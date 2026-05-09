import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MessageSquare, Bug } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach the BgRemove team — bug reports, feedback, partnerships.",
  alternates: { canonical: `${SITE.url}/contact` },
};

const CARDS = [
  {
    Icon: Mail,
    title: "General questions",
    body: "Anything that doesn't fit a bug report or partnership pitch.",
    cta: "Send an email",
    href: `mailto:${SITE.email}`,
  },
  {
    Icon: Bug,
    title: "Found a bug?",
    body: "Include the image type, browser, and what went wrong.",
    cta: "Report a bug",
    href: `mailto:${SITE.email}?subject=${encodeURIComponent("Bug report")}`,
  },
  {
    Icon: MessageSquare,
    title: "Partnerships & press",
    body: "Integrations, sponsorships, content collaborations.",
    cta: "Say hi",
    href: `mailto:${SITE.email}?subject=${encodeURIComponent("Partnership")}`,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="We read every message"
        description="No support form, no chatbot — just a real inbox. Pick the topic that fits and we'll get back within a day or two."
      />
      <section className="container py-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map(({ Icon, title, body, cta, href }) => (
            <div key={title} className="flex flex-col gap-3 rounded-xl border border-border bg-card p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-semibold">{title}</h2>
              <p className="text-sm text-muted-foreground">{body}</p>
              <Button asChild variant="outline" className="mt-auto w-fit">
                <Link href={href}>{cta} →</Link>
              </Button>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-muted-foreground">
          Direct address: <Link href={`mailto:${SITE.email}`} className="font-mono">{SITE.email}</Link>
        </p>
      </section>
    </>
  );
}
