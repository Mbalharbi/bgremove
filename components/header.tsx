"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, Menu, X, ChevronDown } from "lucide-react";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { NAV_LINKS } from "@/lib/site";
import { NAV_LINKS_AR } from "@/lib/site-ar";
import { NAV_LINKS_PT } from "@/lib/site-pt";
import { NAV_LINKS_DE } from "@/lib/site-de";
import { NAV_LINKS_ES } from "@/lib/site-es";
import { NAV_LINKS_ZH } from "@/lib/site-zh";
import { LOCALES, detectLocale, HEADER_ARIA, type LocaleCode } from "@/lib/locales";
import { cn } from "@/lib/utils";

// Map locale codes → their localised nav links.
const NAV_BY_LOCALE: Record<LocaleCode, ReadonlyArray<{ href: string; label: string }>> = {
  en: NAV_LINKS,
  ar: NAV_LINKS_AR,
  pt: NAV_LINKS_PT,
  de: NAV_LINKS_DE,
  es: NAV_LINKS_ES,
  zh: NAV_LINKS_ZH,
};

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [langOpen, setLangOpen] = React.useState(false);
  const langRef = React.useRef<HTMLDivElement>(null);

  const locale = detectLocale(pathname);
  const navLinks = NAV_BY_LOCALE[locale.code];
  const aria = HEADER_ARIA[locale.code];

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => setMobileOpen(false), [pathname]);
  React.useEffect(() => setLangOpen(false), [pathname]);

  // Close language dropdown on outside click.
  React.useEffect(() => {
    if (!langOpen) return;
    const onDown = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [langOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b transition-all duration-300",
        scrolled
          ? "border-border bg-background/85 backdrop-blur-md"
          : "border-transparent bg-background/60 backdrop-blur-sm"
      )}
    >
      <div className="container flex h-16 items-center justify-between gap-4">
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1" aria-label={aria.primary}>
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent/10 hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          {/* Language dropdown */}
          <div className="relative" ref={langRef}>
            <button
              type="button"
              onClick={() => setLangOpen((v) => !v)}
              className="inline-flex h-10 items-center gap-1 rounded-full px-3 text-sm font-semibold text-muted-foreground transition-colors hover:bg-accent/10 hover:text-foreground"
              aria-label={aria.language}
              aria-expanded={langOpen}
              aria-haspopup="listbox"
            >
              <Globe className="h-4 w-4" aria-hidden />
              <span className="hidden sm:inline">{locale.label}</span>
              <ChevronDown className={cn("h-3 w-3 transition-transform", langOpen && "rotate-180")} aria-hidden />
            </button>
            {langOpen && (
              <ul
                role="listbox"
                className="absolute right-0 mt-2 min-w-[160px] overflow-hidden rounded-xl border border-border bg-background/95 py-1 shadow-lg backdrop-blur-md"
              >
                {LOCALES.map((loc) => {
                  const target = loc.prefix || "/";
                  const isActive = loc.code === locale.code;
                  return (
                    <li key={loc.code} role="option" aria-selected={isActive}>
                      <Link
                        href={target}
                        hrefLang={loc.bcp47}
                        className={cn(
                          "block px-4 py-2 text-sm transition-colors",
                          isActive
                            ? "bg-primary/10 text-primary font-semibold"
                            : "text-foreground hover:bg-accent/10"
                        )}
                      >
                        {loc.nativeName}
                        <span className="ml-2 text-xs text-muted-foreground">{loc.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? aria.close : aria.open}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav
          className="md:hidden border-t border-border bg-background/95 backdrop-blur-md"
          aria-label={aria.mobile}
        >
          <div className="container flex flex-col py-2">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-md px-3 py-3 text-sm font-medium transition-colors",
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-accent/10"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            {/* Language list on mobile */}
            <div className="mt-2 border-t border-border pt-2">
              <p className="px-3 pb-1 text-xs uppercase tracking-wider text-muted-foreground">
                {aria.language}
              </p>
              {LOCALES.map((loc) => {
                const target = loc.prefix || "/";
                const isActive = loc.code === locale.code;
                return (
                  <Link
                    key={loc.code}
                    href={target}
                    hrefLang={loc.bcp47}
                    className={cn(
                      "block rounded-md px-3 py-2 text-sm transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary font-semibold"
                        : "text-foreground hover:bg-accent/10"
                    )}
                  >
                    {loc.nativeName}
                    <span className="ml-2 text-xs text-muted-foreground">{loc.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
