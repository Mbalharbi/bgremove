"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Lock } from "lucide-react";
import { Logo } from "@/components/logo";
import { FOOTER_LINKS, SITE } from "@/lib/site";
import { FOOTER_LINKS_AR, SITE_AR } from "@/lib/site-ar";

export function Footer() {
  const year = new Date().getFullYear();
  const pathname = usePathname();
  const isArabic = pathname === "/ar" || pathname.startsWith("/ar/");

  const footerLinks = isArabic ? FOOTER_LINKS_AR : FOOTER_LINKS;
  const tagline = isArabic ? SITE_AR.tagline : SITE.tagline;
  const trustPill = isArabic ? "تعمل بالكامل في المتصفح" : "100% browser-based";
  const copyright = isArabic
    ? `© ${year} ${SITE.name}. جميع الحقوق محفوظة.`
    : `© ${year} ${SITE.name}. All rights reserved.`;
  const madeWith = isArabic ? "صنع بـ" : "Made with";
  const tagSuffix = isArabic ? "للويب المفتوح." : "for the open web.";

  return (
    <footer className="border-t border-border bg-card/40 mt-16">
      <div className="container py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Logo />
            <p className="mt-3 text-sm text-muted-foreground max-w-xs">
              {tagline}
            </p>
            <p className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-xs text-muted-foreground">
              <Lock className="h-3 w-3 text-primary" />
              {trustPill}
            </p>
          </div>
          {Object.entries(footerLinks).map(([heading, links]) => (
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
          <p>{copyright}</p>
          <p className="inline-flex items-center gap-1.5">
            {madeWith} <Heart className="h-3.5 w-3.5 fill-primary text-primary" /> {tagSuffix}
          </p>
        </div>
      </div>
    </footer>
  );
}
