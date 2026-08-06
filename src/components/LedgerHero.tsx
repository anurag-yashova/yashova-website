"use client";

import { useEffect, useRef, useState } from "react";

/** A statement of account that prints itself, line by line.
 *  Not a dashboard. Not a chart. A document. */

type Line =
  | { kind: "item"; label: string; value: string; sign?: "debit" | "credit" }
  | { kind: "sub"; label: string; value: string }
  | { kind: "rule" }
  | { kind: "total"; label: string; value: string }
  | { kind: "ratio"; label: string; value: string };

const lines: Line[] = [
  { kind: "item", label: "Ad spend", value: "18,60,000", sign: "debit" },
  { kind: "item", label: "Impressions served", value: "1,24,00,000" },
  { kind: "item", label: "Clicks", value: "1,86,000" },
  { kind: "item", label: "Leads captured", value: "15,000" },
  { kind: "sub", label: "of which unqualified", value: "(9,200)" },
  { kind: "item", label: "Qualified leads", value: "5,800" },
  { kind: "item", label: "Admissions", value: "780" },
  { kind: "rule" },
  { kind: "total", label: "Revenue generated", value: "1,02,00,000" },
  { kind: "ratio", label: "Return on ad spend", value: "5.5X" },
];

export default function LedgerHero() {
  const ref = useRef<HTMLDivElement>(null);
  const [printed, setPrinted] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let timer: ReturnType<typeof setInterval>;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        obs.disconnect();
        if (reduced) {
          setPrinted(lines.length + 1);
          return;
        }
        timer = setInterval(() => {
          setPrinted((n) => {
            if (n >= lines.length + 1) {
              clearInterval(timer);
              return n;
            }
            return n + 1;
          });
        }, 190);
      },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      clearInterval(timer);
    };
  }, []);

  const done = printed >= lines.length + 1;

  return (
    <div ref={ref} className="ledger">
      <div className="ledger-head">
        <div>
          <span className="ledger-title">Statement of account</span>
          <span className="ledger-sub">TheAudioLearning &middot; 120 days</span>
        </div>
        <span className="ledger-no">No. 001</span>
      </div>

      <div className="ledger-cols">
        <span>Particulars</span>
        <span className="text-right">Amount (₹)</span>
      </div>

      <ol className="ledger-body">
        {lines.map((l, i) => {
          const shown = printed > i;
          if (l.kind === "rule") {
            return <li key={i} className={`ledger-rule ${shown ? "in" : ""}`} aria-hidden />;
          }
          if (l.kind === "total") {
            return (
              <li key={i} className={`ledger-line ledger-total ${shown ? "in" : ""}`}>
                <span>{l.label}</span>
                <span className="ledger-amount">{l.value}</span>
              </li>
            );
          }
          if (l.kind === "ratio") {
            return (
              <li key={i} className={`ledger-line ledger-ratio ${shown ? "in" : ""}`}>
                <span>{l.label}</span>
                <span className="ledger-amount">{l.value}</span>
              </li>
            );
          }
          if (l.kind === "sub") {
            return (
              <li key={i} className={`ledger-line ledger-subline ${shown ? "in" : ""}`}>
                <span>{l.label}</span>
                <span className="ledger-amount">{l.value}</span>
              </li>
            );
          }
          return (
            <li key={i} className={`ledger-line ${shown ? "in" : ""}`}>
              <span>{l.label}</span>
              <span className={`ledger-amount ${l.sign === "debit" ? "is-debit" : ""}`}>
                {l.sign === "debit" ? "\u2212 " : ""}
                {l.value}
              </span>
            </li>
          );
        })}
      </ol>

      <div className={`ledger-foot ${done ? "in" : ""}`}>
        <span className="ledger-sig">Anurag Sharma</span>
        <span className="ledger-sigline">Prepared by &middot; Yashova, Faridabad</span>
        {!done && <span className="ledger-caret" aria-hidden />}
      </div>

      <span className={`ledger-stamp ${done ? "in" : ""}`} aria-hidden>
        Verified
      </span>
    </div>
  );
}
