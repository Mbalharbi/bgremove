"use client";

import * as React from "react";
import { DOWNLOAD_EVENT } from "@/lib/utils";
import { toolFromPath, track } from "@/lib/track";

/** Counts downloads from every tool (they all go through lib/utils downloadBlob). */
export function UsageTracker() {
  React.useEffect(() => {
    const onDownload = () => track(toolFromPath(window.location.pathname), "download");
    window.addEventListener(DOWNLOAD_EVENT, onDownload);
    return () => window.removeEventListener(DOWNLOAD_EVENT, onDownload);
  }, []);
  return null;
}
