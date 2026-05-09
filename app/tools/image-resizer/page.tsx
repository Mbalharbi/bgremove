import type { Metadata } from "next";
import { ImageResizer } from "@/components/image-resizer";
import { PageHeader } from "@/components/page-header";
import { JsonLd } from "@/components/json-ld";
import { softwareAppSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Free Image Resizer - Resize Photos for Instagram, Twitter, LinkedIn",
  description:
    "Resize images to exact dimensions or social media presets. Lock aspect ratio, scale by percentage, switch formats — all in your browser, no upload.",
  alternates: { canonical: `${SITE.url}/tools/image-resizer` },
};

export default function ImageResizerPage() {
  return (
    <>
      <JsonLd
        data={softwareAppSchema({
          name: "BgRemove Image Resizer",
          url: `${SITE.url}/tools/image-resizer`,
          description:
            "Resize photos for Instagram, Twitter, Facebook, LinkedIn, and YouTube — instantly, in your browser.",
        })}
      />
      <PageHeader
        eyebrow="Image tool"
        title="Resize images for any social platform"
        description="Punch in exact pixels, scale by percentage, or pick a one-tap preset for Instagram, X, Facebook, LinkedIn, YouTube, and more."
      />
      <section className="container py-10">
        <ImageResizer />
      </section>
    </>
  );
}
