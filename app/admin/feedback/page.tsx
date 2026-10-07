import type { Metadata } from "next";
import { FeedbackAdmin } from "@/components/feedback-admin";

// Private owner page — never indexed, not in the sitemap. Data is only
// returned by /api/feedback when the FEEDBACK_ADMIN_KEY secret matches.
export const metadata: Metadata = {
  title: "Feedback dashboard",
  robots: { index: false, follow: false },
};

export default function FeedbackAdminPage() {
  return (
    <section className="container py-10">
      <FeedbackAdmin />
    </section>
  );
}
