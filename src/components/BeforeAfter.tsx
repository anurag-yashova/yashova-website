"use client";

import { useEffect, useRef, useState } from "react";

/** Real before/after numbers from accounts we took over. */
const rows = [
  { metric: "Cost per donation", before: "₹175.61", after: "₹85.48", client: "Helping Hands Foundation", ratio: 0.49 },
  { metric: "Cost per lead", before: "₹80–₹100", after: "₹25–₹35", client: "Client account", ratio: 0.33 },
  { metric: "Cost per lead, best batch", before: "₹126 avg", after: "₹11.40", client: "TheAudioLearning", ratio: 0.09 },
];

export default function BeforeAfter() {
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
          </div>
          <div>
            <div className="flex items-baseline justify-between gap-6">
              <span className="font-mono-num text-sm text-ink-muted line-through decoration-1">
                {r.before}
              </span>
              <span className="font-mono-num text-2xl font-semibold text-gold md:text-3xl">
                {r.after}
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
