import CountUp from "@/components/CountUp";
import Reveal from "@/components/Reveal";

/** Swiss grid stat band — replaces decorative marquee with substance.
 *  Four numbers that a prospect actually weighs, on hairline rules. */
const stats = [
  { value: "₹2.5Cr+", label: "Ad spend managed profitably", note: "Across 150+ brands" },
  { value: "5.5X", label: "Best campaign ROAS", note: "TheAudioLearning, 120 days" },
  { value: "51%", label: "Cost-per-result reduction", note: "₹175.61 to ₹85.48" },
  { value: "11,246", label: "Payments captured", note: "Razorpay verified, zero disputes" },
];

export default function ProofBar() {
  return (
    <section className="border-y border-surface-line">
      <div className="mx-auto grid max-w-6xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 80}>
            <div className="h-full border-b border-surface-line px-6 py-10 sm:border-b-0 sm:border-r last:border-r-0 lg:px-8 lg:py-14">
              <div className="font-mono-num text-3xl font-semibold tracking-tight text-ink lg:text-4xl">
                <CountUp value={s.value} />
              </div>
              <div className="mt-3 text-sm font-medium leading-snug text-ink">{s.label}</div>
              <div className="mt-1.5 text-xs leading-relaxed text-ink-muted">{s.note}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
