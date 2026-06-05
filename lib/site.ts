export const SITE = {
  name: "BgRemove",
  domain: "bgremovers.org",
  url: "https://bgremovers.org",
  title: "Free Background Remover - Remove Image Background Online | BgRemove",
  description:
    "Remove image backgrounds in seconds with AI. 100% browser-based — your photos never leave your device. Free, unlimited, no signup required.",
  tagline: "Remove backgrounds in seconds. 100% private. 100% free.",
  ogImage: "/og-image.png",
  twitterHandle: "@bgremovers",
  email: "hello@bgremovers.org",
  // GA placeholder — replace with real ID before launch
  gaId: "G-PLACEHOLDER", // TODO: replace with G-XXXXXXXXXX from Google Analytics
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Remove BG" },
  { href: "/bulk", label: "Bulk" },
  { href: "/tools/image-compressor", label: "Compress" },
  { href: "/tools/image-resizer", label: "Resize" },
  { href: "/blog", label: "Blog" },
] as const;

export const FOOTER_LINKS = {
  Tools: [
    { href: "/", label: "Background Remover" },
    { href: "/bulk", label: "Bulk Remover" },
    { href: "/tools/image-compressor", label: "Image Compressor" },
    { href: "/tools/image-resizer", label: "Image Resizer" },
    { href: "/tools/png-to-jpg", label: "PNG to JPG" },
    { href: "/tools/jpg-to-png", label: "JPG to PNG" },
    { href: "/tools/webp-converter", label: "WebP Converter" },
    { href: "/tools/qr-code-generator", label: "QR Code Generator" },
    { href: "/tools/image-metadata-viewer", label: "Metadata Viewer" },
    { href: "/transparent-png-maker", label: "Transparent PNG Maker" },
  ],
  "Use cases": [
    { href: "/portrait-background-remover", label: "Portrait Remover" },
    { href: "/product-photo-background-remover", label: "Product Photo Remover" },
    { href: "/logo-background-remover", label: "Logo Background Remover" },
    { href: "/screenshot-background-remover", label: "Screenshot Remover" },
  ],
  Company: [
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
    { href: "/api", label: "API & SDK" },
    { href: "/contact", label: "Contact" },
  ],
  Legal: [
    { href: "/privacy", label: "Privacy" },
    { href: "/privacy-proof", label: "Privacy Proof" },
    { href: "/terms", label: "Terms" },
  ],
} as const;
