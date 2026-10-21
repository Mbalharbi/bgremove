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
  {
    id: "magic-wand",
    date: "2026-10-21",
    title: "العصا السحرية داخل محرر التعديل",
    because: "أكثر طلب في آخر 3 أيام، وتعليق «手动擦除建议加个魔术棒»",
    needs: ["magic-wand"],
    events: ["wand_use"],
  },
  {
    id: "edges",
    date: "2026-10-21",
    title: "حواف أدق تلقائيًا (شعر، فرو، نصوص)",
    because: "«حواف أدق» من أكثر الطلبات؛ مُختبر على 270 صورة: خطأ الحواف −7٪ للصور و−40٪ للنصوص",
    needs: ["better-edges"],
    events: [],
  },
  {
    id: "bulk-i18n",
    date: "2026-10-21",
    title: "صفحة الدفعات بلغة الزائر + تنزيل كل صورة على حدة",
    because: "الصفحة كانت إنجليزية حتى للصينيين (60٪ من الزوار)، ومعدل تنزيل الدفعات 24٪ فقط",
    needs: [],
    events: ["download"],
  },
];
