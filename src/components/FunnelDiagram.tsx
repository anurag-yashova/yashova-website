"use client";

import { useEffect, useRef, useState } from "react";

/** The site demonstrates the service: a real funnel, drawn to scale from a
 *  real campaign (TheAudioLearning, 120 days). Each stage animates its width
 *  proportionally to actual volume when scrolled into view. */
const stages = [
  { label: "Impressions", value: "12.4M", width: 100, note: "₹18.6L spend" },
  { label: "Clicks", value: "186,000", width: 74, note: "₹10 CPC" },
  { label: "Leads", value: "15,000", width: 52, note: "₹126 average cost per lead" },
  { label: "Qualified", value: "5,800", width: 33, note: "Form-qualified by intent" },
  { label: "Admissions", value: "780", width: 18, note: "₹1.02Cr revenue · 5.5X ROAS" },
];

export default function FunnelDiagram() {
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
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="mt-12 space-y-3">
      {stages.map((s, i) => (
        <div key={s.label} className="group">
          <div className="flex items-baseline justify-between gap-4 pb-2">
            <span className="font-mono-num text-xs uppercase tracking-[0.14em] text-ink-muted">
              {s.label}
            </span>
            <span className="font-mono-num text-lg font-semibold text-ink md:text-xl">
              {s.value}
            </span>
          </div>
          <div className="relative h-px w-full bg-surface-line">
            <div
              className="absolute left-0 top-0 h-px bg-ink transition-[width] duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                width: on ? `${s.width}%` : "0%",
                transitionDelay: `${i * 140}ms`,
                background: i === stages.length - 1 ? "var(--gold)" : undefined,
              }}
            />
            <span
              className="absolute -top-[3px] h-[7px] w-[7px] transition-[left] duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                left: on ? `calc(${s.width}% - 7px)` : "0%",
                transitionDelay: `${i * 140}ms`,
                background: i === stages.length - 1 ? "var(--gold)" : "var(--ink)",
              }}
            />
          </div>
          <div className="pt-2 text-xs text-ink-muted">{s.note}</div>
        </div>
      ))}
    </div>
  );
}
