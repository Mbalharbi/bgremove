"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { DOWNLOAD_EVENT } from "@/lib/utils";
import { toolFromPath, track, trackPageview } from "@/lib/track";

/**
 * - Counts downloads from every tool (they all go through lib/utils downloadBlob).
 * - Sends one anonymous page view per page, including client-side navigations.
 */
export function UsageTracker() {
  const pathname = usePathname();
  const firstView = React.useRef(true);

  React.useEffect(() => {
    const onDownload = (e: Event) =>
      track(toolFromPath(window.location.pathname), "download", { count: (e as CustomEvent<{ images?: number }>).detail?.images ?? 1 });
    window.addEventListener(DOWNLOAD_EVENT, onDownload);
    return () => window.removeEventListener(DOWNLOAD_EVENT, onDownload);
  }, []);

  React.useEffect(() => {
    if (!pathname || pathname.startsWith("/admin")) return;
    // Only the landing page view carries the external referrer.
    trackPageview(pathname, firstView.current ? document.referrer : "");
    firstView.current = false;
  }, [pathname]);

  return null;
}
