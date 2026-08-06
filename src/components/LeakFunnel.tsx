"use client";

import { useEffect, useRef, useState } from "react";

/** Where the money leaks — an animated funnel built from the drop-off
 *  pattern we see on almost every unaudited account. */
const stages = [
  { label: "Ad impressions", pct: 100, leak: null },
  { label: "Clicks", pct: 62, leak: "Weak creative, wrong audience" },
  { label: "Page loaded", pct: 38, leak: "Slow mobile load — visitor gone before content" },
  { label: "Form started", pct: 19, leak: "Too many fields, unclear offer" },
  { label: "Lead captured", pct: 11, leak: "No qualification, no reason to act now" },
  { label: "Contacted in time", pct: 6, leak: "Follow-up too slow — interest decayed" },
  { label: "Customer", pct: 3, leak: null },
];

export default function LeakFunnel() {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  const [active, setActive] = useState<number | null>(null);

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
    <div ref={ref} className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
      <div>
        {stages.map((s, i) => (
          <div
            key={s.label}
            className="group relative border-b border-surface-line py-3.5"
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
          >
            <div className="flex items-baseline justify-between gap-4">
              <span
                className={`font-mono-num text-xs uppercase tracking-[0.14em] transition-colors ${
                  active === i ? "text-ink" : "text-ink-muted"
                }`}
              >
                {s.label}
              </span>
              <span className="font-mono-num text-sm text-ink">{s.pct}%</span>
            </div>
            <div className="mt-2.5 h-[3px] w-full bg-surface-line/40">
              <div
                className={`h-full ${i === stages.length - 1 ? "bg-gold" : "bg-ink"}`}
                style={{
                  width: on ? `${s.pct}%` : "0%",
                  transition: `width 1.1s cubic-bezier(0.16,1,0.3,1) ${i * 130}ms`,
                }}
              />
            </div>
            {s.leak && (
              <p
                className={`mt-2 text-xs leading-relaxed transition-opacity duration-300 ${
                  active === i ? "text-ink-muted opacity-100" : "text-ink-muted/0 opacity-0 lg:opacity-0"
                }`}
              >
                {s.leak}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="lg:pt-6">
        <p className="text-lg leading-relaxed text-ink">
          Out of every 100 people your ad reaches, roughly three become
          customers. The other 97 are not lost in the auction — they leak out
          at six specific points after the click.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-ink-muted">
          Most agencies optimise the first two stages, because that is what the
          ad account controls. The largest losses happen further down, in the
          page, the form, and the follow-up. That is the part we build.
        </p>
        <p className="mt-6 hidden font-mono-num text-xs uppercase tracking-[0.14em] text-ink-muted lg:block">
          Hover any stage to see what leaks there
        </p>
      </div>
    </div>
  );
}
