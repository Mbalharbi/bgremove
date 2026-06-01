/**
 * Non-intrusive ad-slot placeholder. Renders a small reserved area with
 * the right dimensions so layout doesn't shift once a real ad provider
 * (AdSense, Ezoic, Mediavine) is wired up.
 *
 * Currently renders nothing visible to the user — it just reserves vertical
 * space and tags the slot in the DOM with `data-ad-slot` for future scripts
 * to discover. No third-party JS loads, no cookies are set. Free to ship.
 *
 * To enable real ads later: subscribe to a network, replace `RESERVED` with
 * the network's <ins> tag, and load their script in app/layout.tsx after
 * cookie consent.
 */

interface AdSlotProps {
  /** Logical placement identifier (analytics + later network targeting). */
  slot:
    | "after-result"     // Below the BG-removed image, before related tools
    | "in-content"        // Mid-article on blog posts
    | "above-footer"      // Near footer, after CTA
    | "sidebar"           // Optional sidebar units
    | "landing-mid";      // Between sections on landing pages
  /** Default vertical space to reserve so CLS stays clean. */
  height?: number;
  /** Optional className for layout adjustments. */
  className?: string;
}

export function AdSlot({ slot, height = 100, className = "" }: AdSlotProps) {
  return (
    <div
      data-ad-slot={slot}
      aria-hidden="true"
      className={`my-6 flex items-center justify-center rounded-lg border border-dashed border-border/40 bg-card/20 text-xs text-muted-foreground/40 ${className}`}
      style={{ minHeight: height }}
    >
      {/* Visually subtle — only visible to admins/devs eyeballing the page. */}
      <span className="select-none opacity-40">ad slot · {slot}</span>
    </div>
  );
}

/**
 * Affiliate-link placeholder. Renders a small recommended-tool card with
 * a customisable label and URL. Use after the result area when we have
 * approved affiliate programs (Canva, Adobe Express, Shopify, Snappa).
 */
export function AffiliateCard({
  title,
  description,
  href,
  cta,
}: {
  title: string;
  description: string;
  href: string;
  cta: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener sponsored"
      className="block rounded-2xl border border-primary/20 bg-card/60 p-5 transition-colors hover:border-primary/40 hover:bg-primary/5"
      data-affiliate="true"
    >
      <p className="text-xs font-mono uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
        Sponsored
      </p>
      <h3 className="mt-1 font-semibold text-foreground">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      <span className="mt-3 inline-flex items-center text-sm font-medium text-primary">
        {cta} →
      </span>
    </a>
  );
}
