import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  Camera,
  FileImage,
  Layers,
  Megaphone,
  Monitor,
  ShoppingBag,
  Tag,
  UserCircle,
} from "lucide-react";

interface UseCase {
  title: string;
  description: string;
  href: string;
  Icon: React.ComponentType<{ className?: string }>;
}

// Ordered by likely intent + landing-page conversion value.
const USE_CASES: UseCase[] = [
  {
    title: "Profile pictures",
    description: "Clean, transparent headshots for LinkedIn, Slack, Notion.",
    href: "/portrait-background-remover/",
    Icon: UserCircle,
  },
  {
    title: "Product photos",
    description: "Drop product shots into white-bg listings instantly.",
    href: "/product-photo-background-remover/",
    Icon: ShoppingBag,
  },
  {
    title: "Logos & brand marks",
    description: "Make any logo transparent so it sits on any background.",
    href: "/logo-background-remover/",
    Icon: Tag,
  },
  {
    title: "Transparent PNGs",
    description: "One-click PNG with alpha — for design tools, slides, web.",
    href: "/transparent-png-maker/",
    Icon: FileImage,
  },
  {
    title: "Screenshots & UI",
    description: "Cut subjects out of UI captures for tutorials and decks.",
    href: "/screenshot-background-remover/",
    Icon: Monitor,
  },
  {
    title: "Bulk batches",
    description: "Process up to 20 images at once and grab a single ZIP.",
    href: "/bulk/",
    Icon: Layers,
  },
  {
    title: "Social posts",
    description: "Cut subjects out for Instagram, TikTok, and YouTube thumbnails.",
    href: "/tools/image-resizer/",
    Icon: Megaphone,
  },
  {
    title: "Resumes & docs",
    description: "Add a professional photo without the studio backdrop.",
    href: "/portrait-background-remover/",
    Icon: Briefcase,
  },
  {
    title: "Photography workflow",
    description: "Composite, retouch, and layer shots without Photoshop.",
    href: "/vs/photoshop/",
    Icon: Camera,
  },
];

export function HomeUseCases() {
  return (
    <section className="container py-16 sm:py-20" aria-labelledby="usecases-heading">
      <div className="mx-auto max-w-2xl text-center">
        <h2 id="usecases-heading" className="text-3xl font-bold tracking-tight sm:text-4xl">
          Built for everyone who works with images
        </h2>
        <p className="mt-4 text-muted-foreground text-pretty">
          Whether you&apos;re a designer, marketer, e-commerce seller, or just
          updating your profile pic — BgRemove gets out of your way.
        </p>
      </div>
      <ul className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {USE_CASES.map(({ title, description, href, Icon }) => (
          <li key={title}>
            <Link
              href={href}
              className="group flex h-full items-start gap-3 rounded-xl border border-border bg-card/60 p-4 transition-colors hover:border-primary/40 hover:bg-card"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform group-hover:scale-105">
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h3 className="flex items-center justify-between gap-2 font-semibold text-foreground">
                  <span>{title}</span>
                  <ArrowRight className="h-4 w-4 shrink-0 -translate-x-1 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100 group-hover:text-primary" />
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{description}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
