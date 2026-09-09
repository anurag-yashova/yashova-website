"use client";

import { useEffect, useRef, useState } from "react";

/** The full metrics table rendered as an audited statement:
 *  dotted leaders, tabular figures, lines settling in on scroll. */
export default function CaseLedger({
  metrics,
  fileNo,
  client,
  period,
}: {
  metrics: { metric: string; value: string; note?: string | null }[];
  fileNo: string;
  client: string;
  period: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let timer: ReturnType<typeof setInterval>;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        obs.disconnect();
        if (reduced) {
          setShown(metrics.length);
          return;
        }
        timer = setInterval(() => {
          setShown((n) => {
            if (n >= metrics.length) {
              clearInterval(timer);
              return n;
            }
            return n + 1;
          });
        }, 110);
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      clearInterval(timer);
    };
  }, [metrics.length]);

  return (
    <div ref={ref} className="ledger">
      <div className="ledger-head">
        <div>
          <span className="ledger-title">Campaign performance</span>
          <span className="ledger-sub">
            {client} &middot; {period}
          </span>
        </div>
        <span className="ledger-no">File {fileNo}</span>
      </div>

      <div className="ledger-cols">
        <span>Metric</span>
        <span>Result</span>
      </div>

      <ol className="ledger-body">
        {metrics.map((m, i) => (
          <li key={m.metric} className={`ledger-line ${shown > i ? "in" : ""}`}>
            <span>{m.metric}</span>
            <span className="ledger-amount">
              {m.value}
              {m.note && <span className="ccy-note">{m.note}</span>}
            </span>
          </li>
        ))}
      </ol>

      <div className={`ledger-foot ${shown >= metrics.length ? "in" : ""}`}>
        <span className="ledger-sig">Anurag Sharma</span>
        <span className="ledger-sigline">Prepared by &middot; Yashova, Faridabad</span>
      </div>

      <span className={`ledger-stamp ${shown >= metrics.length ? "in" : ""}`} aria-hidden>
        Verified
      </span>
    </div>
  );
}
