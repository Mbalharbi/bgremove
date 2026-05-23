"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, Menu, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { NAV_LINKS } from "@/lib/site";
import { NAV_LINKS_AR } from "@/lib/site-ar";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  // Detect Arabic locale from the URL. /ar and /ar/* render Arabic nav and
  // link to Arabic destinations; everything else stays English.
  const isArabic = pathname === "/ar" || pathname.startsWith("/ar/");
  const navLinks = isArabic ? NAV_LINKS_AR : NAV_LINKS;
  const aria = isArabic
    ? { primary: "التنقل الرئيسي", mobile: "تنقل الجوال", open: "افتح القائمة", close: "أغلق القائمة" }
    : { primary: "Primary", mobile: "Mobile", open: "Open menu", close: "Close menu" };

  // Cross-locale switcher target. We don't deep-translate paths — just point
  // at the locale root, which is the safest default until every page exists
  // in both languages.
  const switcher = isArabic
    ? { href: "/", label: "EN", title: "English" }
    : { href: "/ar", label: "AR", title: "العربية" };

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => setMobileOpen(false), [pathname]);

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
          <Link
            href={switcher.href}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold text-muted-foreground transition-colors hover:bg-accent/10 hover:text-foreground"
            title={switcher.title}
            aria-label={`Switch to ${switcher.title}`}
            hrefLang={switcher.label.toLowerCase()}
          >
            <Globe className="h-4 w-4" aria-hidden />
            <span className="sr-only">{switcher.label}</span>
          </Link>
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
            <Link
              href={switcher.href}
              className="mt-2 rounded-md px-3 py-3 text-sm font-medium text-muted-foreground hover:bg-accent/10 hover:text-foreground"
              hrefLang={switcher.label.toLowerCase()}
            >
              <Globe className="me-2 inline h-4 w-4" aria-hidden /> {switcher.title}
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
