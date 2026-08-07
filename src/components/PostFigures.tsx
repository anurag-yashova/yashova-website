"use client";

import { useEffect, useRef, useState } from "react";

function useOnScreen<T extends HTMLElement>() {
  const ref = useRef<T>(null);
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
      { threshold: 0.35 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, on] as const;
}

/* ---------- Before / after comparison bar ---------- */
export function DeltaBar({
  label,
  before,
  after,
  ratio,
  note,
}: {
  label: string;
  before: string;
  after: string;
  ratio: number;
  note?: string;
}) {
  const [ref, on] = useOnScreen<HTMLDivElement>();
  return (
    <figure ref={ref} className="fig">
      <figcaption className="fig-label">{label}</figcaption>
      <div className="mt-3 flex items-baseline justify-between gap-6">
        <span className="font-mono-num text-sm text-ink-muted line-through decoration-1">
          {before}
        </span>
        <span className="font-mono-num text-2xl font-semibold text-gold">{after}</span>
      </div>
      <div className="mt-3 h-[3px] w-full bg-surface-line/50">
        <div
          className="h-full bg-ink"
          style={{ width: on ? "100%" : "0%", transition: "width 0.9s cubic-bezier(0.16,1,0.3,1)" }}
        />
        <div
          className="-mt-[3px] h-[3px] bg-gold"
          style={{
            width: on ? `${Math.max(2, ratio * 100)}%` : "0%",
            transition: "width 1.1s cubic-bezier(0.16,1,0.3,1) 0.35s",
          }}
        />
      </div>
      {note && <p className="fig-note">{note}</p>}
    </figure>
  );
}

/* ---------- Horizontal ranked bars ---------- */
export function RankBars({
  title,
  rows,
  note,
}: {
  title: string;
  rows: { label: string; value: string; pct: number; highlight?: boolean }[];
  note?: string;
}) {
  const [ref, on] = useOnScreen<HTMLDivElement>();
  return (
    <figure ref={ref} className="fig">
      <figcaption className="fig-label">{title}</figcaption>
      <div className="mt-4">
        {rows.map((r, i) => (
          <div key={r.label} className="border-b border-surface-line py-3 last:border-b-0">
            <div className="flex items-baseline justify-between gap-4">
              <span className="text-sm text-ink-muted">{r.label}</span>
              <span
                className={`font-mono-num text-sm ${r.highlight ? "font-semibold text-gold" : "text-ink"}`}
              >
                {r.value}
              </span>
            </div>
            <div className="mt-2 h-[3px] w-full bg-surface-line/50">
              <div
                className={`h-full ${r.highlight ? "bg-gold" : "bg-ink"}`}
                style={{
                  width: on ? `${r.pct}%` : "0%",
                  transition: `width 0.9s cubic-bezier(0.16,1,0.3,1) ${i * 110}ms`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
      {note && <p className="fig-note">{note}</p>}
    </figure>
  );
}

/* ---------- Stepped funnel ---------- */
export function FunnelSteps({
  title,
  steps,
  note,
}: {
  title: string;
  steps: { label: string; value: string; pct: number }[];
  note?: string;
}) {
  const [ref, on] = useOnScreen<HTMLDivElement>();
  return (
    <figure ref={ref} className="fig">
      <figcaption className="fig-label">{title}</figcaption>
      <div className="mt-4">
        {steps.map((s, i) => (
          <div key={s.label} className="border-b border-surface-line py-3 last:border-b-0">
            <div className="flex items-baseline justify-between gap-4">
              <span className="font-mono-num text-[11px] uppercase tracking-[0.14em] text-ink-muted">
                {s.label}
              </span>
              <span className="font-mono-num text-sm text-ink">{s.value}</span>
            </div>
            <div className="mt-2 h-[3px] w-full bg-surface-line/50">
              <div
                className={`h-full ${i === steps.length - 1 ? "bg-gold" : "bg-ink"}`}
                style={{
                  width: on ? `${s.pct}%` : "0%",
                  transition: `width 1s cubic-bezier(0.16,1,0.3,1) ${i * 130}ms`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
      {note && <p className="fig-note">{note}</p>}
    </figure>
  );
}

/* ---------- Big single figure ---------- */
export function BigStat({
  value,
  label,
  note,
}: {
  value: string;
  label: string;
  note?: string;
}) {
  return (
    <figure className="fig fig-stat">
      <span className="font-mono-num text-4xl font-semibold text-gold md:text-5xl">{value}</span>
      <figcaption className="mt-2 text-sm text-ink">{label}</figcaption>
      {note && <p className="fig-note">{note}</p>}
    </figure>
  );
}
