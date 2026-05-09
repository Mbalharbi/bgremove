interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <header className="relative overflow-hidden border-b border-border">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-radial-fade" />
      <div className="container relative py-12 sm:py-16">
        {eyebrow && (
          <p className="text-xs font-mono uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-2 text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
            {description}
          </p>
        )}
      </div>
    </header>
  );
}
