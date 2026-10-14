/**
 * Features shipped in response to visitor feedback. The admin dashboard's
 * "What we did" tab measures each one against the data:
 *   - requests for its feedback `needs` before vs. after `date`,
 *   - use since `date` via its usage `events`,
 *   - average rating before vs. after.
 * Add an entry here whenever a feedback-driven change ships.
 */

export interface Release {
  id: string;
  /** Production deploy date (UTC, YYYY-MM-DD). */
  date: string;
  title: string;
  /** What prompted it, in plain words. */
  because: string;
  /** Feedback "needs" ids this answers (components/feedback-dialog.tsx). */
  needs: string[];
  /** Usage events that show the feature being used (lib/track.ts). */
  events: string[];
  /** Feedback field that is true when that visitor used the feature (rating: users vs non-users). */
  usedFlag?: "edited" | "bgChanged" | "solid";
}

export const RELEASES: Release[] = [
  {
    id: "china-speed",
    date: "2026-10-08",
    title: "تشغيل الأداة في الصين ونموذج أصغر وأسرع",
    because: "الأداة لم تكن تعمل في الصين (أكثر دولة زيارةً)، وأول صورة كانت تأخذ ~27 ثانية",
    needs: ["faster"],
    events: [],
  },
  {
    id: "brush",
    date: "2026-10-12",
    title: "الفرشاة اليدوية (مسح واسترجاع)",
    because: "طلب «فرشاة يدوية» وشكاوى ذيل النمر و«القص غير نظيف»",
    needs: ["touch-up", "better-edges"],
    events: ["edit_apply"],
    usedFlag: "edited",
  },
  {
    id: "background",
    date: "2026-10-12",
    title: "تبديل الخلفية (لون أو صورة)",
    because: "أكثر طلب في الآراء (8 من 17)",
    needs: ["change-bg"],
    events: ["bg_change"],
    usedFlag: "bgChanged",
  },
  {
    id: "solid",
    date: "2026-10-12",
    title: "وضع اللون الواحد للنصوص والشعارات",
    because: "شكوى: «نص أبيض على خلفية داكنة، نصفه انمسح»",
    needs: [],
    events: ["solid_apply"],
    usedFlag: "solid",
  },
];
