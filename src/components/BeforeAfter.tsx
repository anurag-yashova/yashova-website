"use client";

import { useEffect, useRef, useState } from "react";
import { buildNote, type Currency } from "@/lib/currency";

/** Real before/after numbers. Each row says what it measures, so an average is never mistaken for a best batch. */
const rows = [
  {
    metric: "Cost per donation",
    before: "₹175.61",
    after: "₹85.48",
    client: "Helping Hands Foundation",
    measures: "First campaign against the scaled campaign, same account, 60 days.",
    ratio: 0.49,
  },
  {
    metric: "Cost per lead, webinar campaigns",
    before: "₹41.16",
    after: "₹11.40",
    client: "TheAudioLearning",
    measures: "Two single webinar campaigns, 20 Dec against 12 Jan. The average over the whole 120 days was ₹126.",
    ratio: 0.28,
  },
];

export default function BeforeAfter({ ccy, rates }: { ccy: Currency; rates: Record<string, number> }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="border-t border-surface-line">
      {rows.map((r, i) => (
        <div key={r.metric} className="grid gap-4 border-b border-surface-line py-7 md:grid-cols-[1fr_2fr] md:gap-10">
          <div>
            <p className="font-mono-num text-xs uppercase tracking-[0.14em] text-ink-muted">
              {r.client}
            </p>
            <p className="mt-1.5 text-lg font-semibold text-ink">{r.metric}</p>
            <p className="mt-2 max-w-xs text-xs leading-relaxed text-ink-muted">{r.measures}</p>
          </div>
          <div>
            <div className="flex items-baseline justify-between gap-6">
              <span className="font-mono-num text-sm text-ink-muted line-through decoration-1">
                {r.before}
              </span>
              <span className="font-mono-num text-2xl font-semibold text-gold md:text-3xl">
                {r.after}
                {buildNote(r.after, ccy, rates) && (
                  <span className="ccy-note text-sm">{buildNote(r.after, ccy, rates)}</span>
                )}
              </span>
            </div>
            <div className="mt-3 h-[3px] w-full bg-surface-line/40">
              <div
                className="h-full bg-ink"
                style={{
                  width: on ? "100%" : "0%",
                  transition: `width 1s cubic-bezier(0.16,1,0.3,1) ${i * 160}ms`,
                }}
              />
              <div
                className="-mt-[3px] h-[3px] bg-gold"
                style={{
                  width: on ? `${r.ratio * 100}%` : "0%",
                  transition: `width 1.2s cubic-bezier(0.16,1,0.3,1) ${i * 160 + 400}ms`,
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
