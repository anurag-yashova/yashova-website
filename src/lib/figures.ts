/** Named data visuals available to articles via [[figure:key]].
 *  Every number here traces to a verified source — see case-studies.ts. */

type Spec =
  | { kind: "delta"; props: { label: string; before: string; after: string; ratio: number; note?: string } }
  | { kind: "rank"; props: { title: string; rows: { label: string; value: string; pct: number; highlight?: boolean }[]; note?: string } }
  | { kind: "funnel"; props: { title: string; steps: { label: string; value: string; pct: number }[]; note?: string } }
  | { kind: "stat"; props: { value: string; label: string; note?: string } };

export const figures: Record<string, Spec> = {
  "cpr-drop": {
    kind: "delta",
    props: {
      label: "Cost per result · Helping Hands Foundation",
      before: "₹175.61",
      after: "₹85.48",
      ratio: 0.49,
      note: "Baseline campaign against the scaled Advantage+ campaign, after Conversion API was added alongside the browser Pixel. A 51% reduction across the 60-day period.",
    },
  },
  "cpl-drop": {
    kind: "delta",
    props: {
      label: "Cost per lead · best webinar batch",
      before: "₹126 average",
      after: "₹11.40",
      ratio: 0.09,
      note: "Campaign-level cost per lead ranged from ₹11.40 to ₹41.16 across webinar batches. Averages hide the range, and the range is where optimisation lives.",
    },
  },
  "campaign-sequence": {
    kind: "rank",
    props: {
      title: "13 structured tests · cost per result in sequence",
      rows: [
        { label: "Campaign A — early baseline", value: "₹175.61", pct: 72 },
        { label: "Campaign B — audience test", value: "₹193.07", pct: 80 },
        { label: "Campaign C — creative test", value: "₹242.34", pct: 100 },
        { label: "Campaign E — broad, no audience", value: "₹158.50", pct: 65 },
        { label: "Campaign D — scaled Advantage+", value: "₹85.48", pct: 35, highlight: true },
      ],
      note: "The expensive middle tests were not failures. They mapped the donor cohort that the final campaign then found efficiently. Longer bars are worse — this is cost, not performance.",
    },
  },
  "tal-funnel": {
    kind: "funnel",
    props: {
      title: "120 days · ₹18.6L spent, ₹1.02Cr returned",
      steps: [
        { label: "Impressions", value: "12.4M", pct: 100 },
        { label: "Clicks", value: "186,000", pct: 62 },
        { label: "Leads captured", value: "15,000", pct: 38 },
        { label: "Qualified", value: "5,800", pct: 22 },
        { label: "Admissions", value: "780", pct: 9 },
      ],
      note: "Bars are drawn to relative scale, not to raw proportion — at true scale the last stage would be invisible, which is itself the point.",
    },
  },
  "upi-share": {
    kind: "stat",
    props: {
      value: "96.99%",
      label: "of donations paid via UPI",
      note: "Not just a payment statistic. It describes the donor precisely: mobile-first, deciding in a single session, unwilling to tolerate friction. The creative and checkout were built for that person.",
    },
  },
  "zero-disputes": {
    kind: "stat",
    props: {
      value: "₹0.00",
      label: "disputes across 11,246 transactions",
      note: "One ₹40 refund on a single transaction, against typical 2–5% refund rates in performance campaigns. Zero disputes means the journey was clear enough that nobody felt deceived.",
    },
  },
  "linkedin-cpc": {
    kind: "rank",
    props: {
      title: "LinkedIn ad sets · cost per click",
      rows: [
        { label: "Ad set 3", value: "₹4.28", pct: 91, highlight: true },
        { label: "Ad set 2", value: "₹4.85", pct: 103 },
        { label: "Ad set 1", value: "₹4.93", pct: 105 },
        { label: "Account average", value: "₹4.69", pct: 100 },
      ],
      note: "Every ad set held under ₹5 through the testing phase, with CTR ranging from 1.43% to 3.88%.",
    },
  },
};
