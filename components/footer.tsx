"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Lock } from "lucide-react";
import { Logo } from "@/components/logo";
import { FOOTER_LINKS, SITE } from "@/lib/site";
import { FOOTER_LINKS_AR, SITE_AR } from "@/lib/site-ar";
import { FOOTER_LINKS_PT, SITE_PT } from "@/lib/site-pt";
import { FOOTER_LINKS_DE, SITE_DE } from "@/lib/site-de";
import { FOOTER_LINKS_ES, SITE_ES } from "@/lib/site-es";
import { FOOTER_LINKS_ZH, SITE_ZH } from "@/lib/site-zh";
import { detectLocale, type LocaleCode } from "@/lib/locales";

type FooterLinkGroup = Readonly<Record<string, ReadonlyArray<{ href: string; label: string }>>>;

interface FooterStrings {
  links: FooterLinkGroup;
  tagline: string;
  trustPill: string;
  copyright: (year: number) => string;
  madeWith: string;
  tagSuffix: string;
}

const FOOTER_BY_LOCALE: Record<LocaleCode, FooterStrings> = {
  en: {
    links: FOOTER_LINKS,
    tagline: SITE.tagline,
    trustPill: "100% browser-based",
    copyright: (y) => `© ${y} ${SITE.name}. All rights reserved.`,
    madeWith: "Made with",
    tagSuffix: "for the open web.",
  },
  ar: {
    links: FOOTER_LINKS_AR,
    tagline: SITE_AR.tagline,
    trustPill: "تعمل بالكامل في المتصفح",
    copyright: (y) => `© ${y} ${SITE.name}. جميع الحقوق محفوظة.`,
    madeWith: "صنع بـ",
    tagSuffix: "للويب المفتوح.",
  },
  pt: {
    links: FOOTER_LINKS_PT,
    tagline: SITE_PT.tagline,
    trustPill: "100% no navegador",
    copyright: (y) => `© ${y} ${SITE.name}. Todos os direitos reservados.`,
    madeWith: "Feito com",
    tagSuffix: "para a web aberta.",
  },
  de: {
    links: FOOTER_LINKS_DE,
    tagline: SITE_DE.tagline,
    trustPill: "100% browserbasiert",
    copyright: (y) => `© ${y} ${SITE.name}. Alle Rechte vorbehalten.`,
    madeWith: "Erstellt mit",
    tagSuffix: "für das offene Web.",
  },
  es: {
    links: FOOTER_LINKS_ES,
    tagline: SITE_ES.tagline,
    trustPill: "100% en el navegador",
    copyright: (y) => `© ${y} ${SITE.name}. Todos los derechos reservados.`,
    madeWith: "Hecho con",
    tagSuffix: "para la web abierta.",
  },
  zh: {
    links: FOOTER_LINKS_ZH,
    tagline: SITE_ZH.tagline,
    trustPill: "100% 浏览器原生",
    copyright: (y) => `© ${y} ${SITE.name}。保留所有权利。`,
    madeWith: "用",
    tagSuffix: "为开放网络打造。",
  },
};

export function Footer() {
  const year = new Date().getFullYear();
  const pathname = usePathname();
  const locale = detectLocale(pathname);
  const f = FOOTER_BY_LOCALE[locale.code];

  return (
    <footer className="border-t border-border bg-card/40 mt-16">
      <div className="container py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Logo />
            <p className="mt-3 text-sm text-muted-foreground max-w-xs">{f.tagline}</p>
            <p className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-xs text-muted-foreground">
              <Lock className="h-3 w-3 text-primary" />
              {f.trustPill}
            </p>
          </div>
          {Object.entries(f.links).map(([heading, links]) => (
            <div key={heading}>
              <h2 className="text-sm font-semibold text-foreground">{heading}</h2>
              <ul className="mt-3 space-y-2">
                {(links as ReadonlyArray<{ href: string; label: string }>).map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col-reverse items-start justify-between gap-4 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center">
          <p>{f.copyright(year)}</p>
          <p className="inline-flex items-center gap-1.5">
            {f.madeWith} <Heart className="h-3.5 w-3.5 fill-primary text-primary" /> {f.tagSuffix}
          </p>
        </div>
      </div>
    </footer>
  );
}
