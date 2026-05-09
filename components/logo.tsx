import Link from "next/link";
import { Scissors } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className, size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: "text-base",
    md: "text-lg",
    lg: "text-xl",
  };

  return (
    <Link
      href="/"
      className={cn(
        "group flex items-center gap-2 font-bold tracking-tight transition-opacity hover:opacity-80",
        sizeClasses[size],
        className
      )}
      aria-label="BgRemove home"
    >
      <span className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-brand-dark shadow-md shadow-primary/30 transition-transform group-hover:scale-105">
        <Scissors className="h-4 w-4 text-primary-foreground" strokeWidth={2.5} />
      </span>
      <span>
        Bg<span className="text-emerald-700 dark:text-emerald-400">Remove</span>
      </span>
    </Link>
  );
}
