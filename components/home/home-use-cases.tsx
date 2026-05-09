import { Briefcase, Camera, ShoppingBag, UserCircle, Megaphone, Layers } from "lucide-react";

const USE_CASES = [
  { title: "Profile pictures", description: "Clean, transparent headshots for LinkedIn, Slack, Notion.", Icon: UserCircle },
  { title: "Product photos", description: "Drop product shots into white-bg listings instantly.", Icon: ShoppingBag },
  { title: "Social posts", description: "Cut subjects out for Instagram, TikTok, and YouTube thumbnails.", Icon: Megaphone },
  { title: "Resumes & docs", description: "Add a professional photo without the studio backdrop.", Icon: Briefcase },
  { title: "Photography", description: "Composite, retouch, and layer shots without Photoshop.", Icon: Camera },
  { title: "Design assets", description: "Build mockups and presentations with cleaner cutouts.", Icon: Layers },
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
      <div className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {USE_CASES.map(({ title, description, Icon }) => (
          <div
            key={title}
            className="group flex items-start gap-3 rounded-xl border border-border bg-card/60 p-4 transition-colors hover:border-primary/40 hover:bg-card"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform group-hover:scale-105">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
