"use client";

/**
 * Cookie consent banner — placeholder.
 *
 * Currently no-op because BgRemove sets no tracking cookies (only a theme
 * preference in localStorage, which doesn't require consent under GDPR).
 *
 * UNCOMMENT and customise this component before enabling:
 *   1. Google Analytics 4 (sets _ga cookie)
 *   2. Google AdSense (sets advertising cookies)
 *   3. Any other analytics/ads SDK
 *
 * Then mount <CookieConsent /> in app/layout.tsx between <Toaster /> and the
 * GA Script tags. Read consent state via cookie-store API or localStorage.
 *
 * Suggested libraries if you want a turnkey solution:
 *   - vanilla-cookieconsent (open-source, ~10 KB)
 *   - CookieYes (managed, free tier covers small sites)
 *   - Klaro! (open-source, granular per-service consent)
 */
export function CookieConsent() {
  return null;
}
