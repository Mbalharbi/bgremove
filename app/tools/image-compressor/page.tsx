import type { Metadata } from "next";
import { ImageCompressor } from "@/components/image-compressor";
import { PageHeader } from "@/components/page-header";
import { JsonLd } from "@/components/json-ld";
import { softwareAppSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Free Image Compressor - Compress JPG, PNG, WebP Online",
  description:
    "Compress images directly in your browser. Drag the quality slider, switch between JPG, PNG, and WebP, and watch the file shrink in real-time. 100% private.",
  alternates: { canonical: `${SITE.url}/tools/image-compressor` },
};

export default function ImageCompressorPage() {
  return (
    <>
      <JsonLd
        data={softwareAppSchema({
          name: "BgRemove Image Compressor",
          url: `${SITE.url}/tools/image-compressor`,
          description:
            "Compress JPG, PNG, and WebP images in your browser with a live quality slider. No upload required.",
        })}
      />
      <PageHeader
        eyebrow="Image tool"
        title="Compress images without uploading"
        description="Drag the quality slider, switch formats, see the file size update in real time. JPG, PNG, and WebP — all in your browser."
      />
      <section className="container py-10">
        <ImageCompressor />
      </section>
    </>
  );
}
