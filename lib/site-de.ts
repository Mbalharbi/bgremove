// German (de) strings for /de/ routes. Privacy-first messaging — German
// audience values data protection strongly (GDPR-native).
import { SITE } from "@/lib/site";

export const SITE_DE = {
  name: SITE.name,
  domain: SITE.domain,
  url: `${SITE.url}/de`,
  title: "Kostenloser Hintergrund-Entferner — Funktioniert im Browser, Kein Upload | BgRemove",
  description:
    "Entfernen Sie den Hintergrund jedes Bildes in Sekunden mit KI. Läuft zu 100% in Ihrem Browser — Ihre Fotos verlassen Ihr Gerät nie. Kostenlos, ohne Limits, ohne Anmeldung.",
  tagline: "Hintergründe in Sekunden entfernen. 100% privat. 100% kostenlos.",
  ogImage: SITE.ogImage,
} as const;

export const NAV_LINKS_DE = [
  { href: "/de", label: "Entferner" },
  { href: "/de/bulk", label: "Stapel" },
  { href: "/de/transparent-png-maker", label: "Transparentes PNG" },
  { href: "/de/portrait-background-remover", label: "Porträts" },
  { href: "/de/about", label: "Über uns" },
] as const;

export const FOOTER_LINKS_DE = {
  "Werkzeuge": [
    { href: "/de", label: "Hintergrund-Entferner" },
    { href: "/de/bulk", label: "Stapelverarbeitung" },
    { href: "/de/transparent-png-maker", label: "PNG-Ersteller" },
  ],
  "Anwendungen": [
    { href: "/de/portrait-background-remover", label: "Porträts" },
    { href: "/de/product-photo-background-remover", label: "Produkte" },
  ],
  "Website": [
    { href: "/de/about", label: "Über uns" },
    { href: "/de/privacy", label: "Datenschutz" },
  ],
} as const;

export const FAQ_DE = [
  { q: "Ist BgRemove wirklich kostenlos?", a: "Ja — komplett kostenlos, ohne Nutzungslimits. Keine Anmeldung, kein Wasserzeichen, kein Abo. Das Tool läuft in Ihrem Browser, daher haben wir keine Serverkosten pro Bild." },
  { q: "Werden meine Fotos auf einen Server hochgeladen?", a: "Nein. Jedes Bild wird lokal auf Ihrem Gerät mit einem KI-Modell verarbeitet. Ihre Fotos verlassen Ihren Browser nie — wir könnten sie nicht einmal sehen, wenn wir wollten. DSGVO-konform by design." },
  { q: "Welche Bildformate werden unterstützt?", a: "BgRemove akzeptiert JPG, PNG und WebP bis 30 MB. Das Ergebnis ist immer ein PNG mit transparentem Hintergrund." },
  { q: "Warum ist die erste Entfernung langsamer?", a: "Beim ersten Mal lädt Ihr Browser das KI-Modell (~44 MB) herunter. Danach ist es lokal gespeichert — folgende Bilder werden in 3-5 Sekunden verarbeitet." },
  { q: "Funktioniert es auf dem Handy?", a: "Ja. Funktioniert auf allen modernen Browsern — Chrome, Safari, Firefox, Edge — auf Handys, Tablets und Desktops." },
  { q: "Was ist die maximale Bildgröße?", a: "Bis zu 4096 × 4096 Pixel und 30 MB. Größere Bilder werden automatisch verkleinert." },
  { q: "Wie vergleicht es sich mit Remove.bg oder Photoshop?", a: "Im Gegensatz zu Remove.bg brauchen Sie kein Konto, es gibt keine Credits, und Ihre Bilder bleiben privat. Im Gegensatz zu Photoshop muss nichts installiert werden." },
  { q: "Funktioniert es auch bei Nicht-Personen?", a: "Ja — wir verwenden das RMBG-1.4 Modell, das für Personen, Produkte, Logos, Tiere, Pflanzen und alle Objekte funktioniert." },
] as const;

export const HOW_IT_WORKS_DE = [
  { title: "Bild hochladen", description: "Ziehen, einfügen oder klicken zum Hochladen. JPG, PNG oder WebP bis 30 MB." },
  { title: "KI entfernt den Hintergrund", description: "Lokales Modell verarbeitet in 3-5 Sekunden. Kein Server, keine Warteschlange." },
  { title: "Als PNG herunterladen", description: "Transparentes PNG bereit für jedes Design-Tool oder Online-Shop." },
] as const;

export const USE_CASES_DE = [
  { title: "Profilbilder", description: "Saubere transparente Headshots für LinkedIn, Slack, Notion.", href: "/de/portrait-background-remover" },
  { title: "Produktfotos", description: "Weißer Hintergrund bereit für Shopify, Amazon und Instagram.", href: "/de/product-photo-background-remover" },
  { title: "Logos & Marken", description: "Machen Sie jedes Logo transparent für jeden Hintergrund.", href: "/de/logo-background-remover" },
  { title: "Transparentes PNG", description: "Transparentes PNG mit einem Klick — für Design, Slides, Web.", href: "/de/transparent-png-maker" },
  { title: "Screenshots", description: "Motive aus Screenshots ausschneiden für Tutorials und Präsentationen.", href: "/de/screenshot-background-remover" },
  { title: "Stapelverarbeitung", description: "Verarbeiten Sie bis zu 20 Bilder auf einmal und laden Sie als ZIP herunter.", href: "/de/bulk" },
] as const;
