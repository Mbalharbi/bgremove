import type { Metadata } from "next";
import { BulkRemover } from "@/components/bulk-remover";
import { PageHeader } from "@/components/page-header";
import { JsonLd } from "@/components/json-ld";
import { softwareAppSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Bulk Background Remover - Process Up to 20 Images at Once",
  description:
    "Remove backgrounds from up to 20 images at once, all in your browser. Download every result as a single ZIP. No upload, no signup, free.",
  alternates: { canonical: `${SITE.url}/bulk` },
};

export default function BulkPage() {
  return (
    <>
      <JsonLd
        data={softwareAppSchema({
          name: "BgRemove Bulk Background Remover",
          url: `${SITE.url}/bulk`,
          description:
            "Remove image backgrounds from up to 20 images at once, entirely in your browser.",
        })}
      />
      <PageHeader
        eyebrow="Bulk processing"
        title="Remove backgrounds from 20 images at once"
        description="Drop a batch of photos and grab the whole set as a transparent-PNG ZIP. Nothing leaves your device — every image is processed locally."
      />
      <section className="container py-10">
        <BulkRemover />
      </section>
    </>
  );
}
