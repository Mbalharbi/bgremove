"use client";

import * as React from "react";
import { Download } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { downloadBlob } from "@/lib/utils";

interface DownloadButtonProps extends Omit<ButtonProps, "onClick"> {
  blob: Blob;
  filename: string;
  label?: string;
}

export function DownloadButton({
  blob,
  filename,
  label = "Download PNG",
  size = "lg",
  ...props
}: DownloadButtonProps) {
  const onClick = () => downloadBlob(blob, filename);
  return (
    <Button onClick={onClick} size={size} {...props}>
      <Download className="h-5 w-5" />
      {label}
    </Button>
  );
}
