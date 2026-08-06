"use client";

import { useEffect, useReducer, useRef } from "react";

/** A working desk, not a hero image.
 *  Statements roll off one after another; a hand marks each one up in pen,
 *  then the page is pulled away and the next one starts printing. */

type Row = { label: string; value: string; debit?: boolean; sub?: boolean };

type Statement = {
  no: string;
  client: string;
  period: string;
  rows: Row[];
  total: { label: string; value: string };
  ratio: { label: string; value: string };
  /** pen note scrawled in the margin once the figures land */
  note: string;
  stamp: string;
};

const statements: Statement[] = [
  {
    no: "001",
    client: "TheAudioLearning",
    period: "120 days · Meta + webinar funnel",
    rows: [
      { label: "Ad spend", value: "18,60,000", debit: true },
      { label: "Clicks", value: "1,86,000" },
      { label: "Leads captured", value: "15,000" },
      { label: "of which unqualified", value: "(9,200)", sub: true },
      { label: "Admissions", value: "780" },
    ],
    total: { label: "Revenue generated", value: "1,02,00,000" },
    ratio: { label: "Return on ad spend", value: "5.5X" },
    note: "₹126 a lead. 780 seats filled.",
    stamp: "Verified",
  },
  {
    no: "002",
    client: "Helping Hands Foundation",
    period: "60 days · Meta Ads + CAPI",
    rows: [
      { label: "Cost per result, start", value: "175.61", debit: true },
      { label: "Cost per result, scaled", value: "85.48" },
      { label: "Donor transactions", value: "11,246" },
      { label: "Disputes raised", value: "(0)", sub: true },
      { label: "Paid via UPI", value: "96.99%" },
    ],
    total: { label: "Donations collected", value: "30,11,507" },
    ratio: { label: "Return on ad spend", value: "4.5X" },
    note: "Razorpay verified. Zero chargebacks.",
    stamp: "Verified",
  },
  {
    no: "003",
    client: "CvolvePro",
    period: "Initial phase · LinkedIn",
    rows: [
      { label: "Ad spend", value: "41,010", debit: true },
      { label: "Impressions", value: "3,86,438" },
      { label: "Professional reach", value: "2,22,630" },
      { label: "Best ad set CPC", value: "4.28", sub: true },
      { label: "Clicks", value: "8,752" },
    ],
    total: { label: "Cost per click", value: "4.69" },
    ratio: { label: "Click-through rate", value: "2.26%" },
    note: "Under ₹5 a click, all through testing.",
    stamp: "Live",
  },
];

/* phases: print rows → rule+total → pen marks → hold → tear away */
type State = { doc: number; printed: number; phase: "print" | "mark" | "hold" | "exit" };
type Action = { type: "tick" } | { type: "mark" } | { type: "hold" } | { type: "next" };

const TOTAL_ROWS = 5;

function reducer(s: State, a: Action): State {
  switch (a.type) {
    case "tick":
      return { ...s, printed: Math.min(s.printed + 1, TOTAL_ROWS + 2) };
    case "mark":
      return { ...s, phase: "mark" };
    case "hold":
      return { ...s, phase: "hold" };
    case "next":
      return { doc: (s.doc + 1) % statements.length, printed: 0, phase: "print" };
  }
}

export default function LedgerHero() {
  const ref = useRef<HTMLDivElement>(null);
  const [state, dispatch] = useReducer(reducer, { doc: 0, printed: 0, phase: "print" });
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || started.current) return;
        started.current = true;
        obs.disconnect();
        dispatch({ type: "tick" });
      },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // drive the cycle
  useEffect(() => {
    if (!started.current) return;
    let t: ReturnType<typeof setTimeout>;
    if (state.phase === "print") {
      if (state.printed < TOTAL_ROWS + 2) {
        t = setTimeout(() => dispatch({ type: "tick" }), 200);
      } else {
        t = setTimeout(() => dispatch({ type: "mark" }), 450);
      }
    } else if (state.phase === "mark") {
      t = setTimeout(() => dispatch({ type: "hold" }), 1900);
    } else if (state.phase === "hold") {
      t = setTimeout(() => dispatch({ type: "next" }), 3200);
    }
    return () => clearTimeout(t);
  }, [state]);

  useEffect(() => {
    if (state.phase === "print" && state.printed === 0 && started.current) {
      const t = setTimeout(() => dispatch({ type: "tick" }), 380);
      return () => clearTimeout(t);
    }
  }, [state]);

  const s = statements[state.doc];
  const marked = state.phase === "mark" || state.phase === "hold";
  const leaving = state.phase === "hold";

  return (
    <div className="ledger-desk">
      {/* the stack of statements underneath */}
      <div className="ledger-stack" aria-hidden />
      <div className="ledger-stack ledger-stack-2" aria-hidden />

      <div ref={ref} className={`ledger ${leaving ? "is-leaving" : ""}`} key={state.doc}>
        <div className="ledger-head">
          <div>
            <span className="ledger-title">Statement of account</span>
            <span className="ledger-sub">
              {s.client} &middot; {s.period}
            </span>
          </div>
          <span className="ledger-no">No. {s.no}</span>
        </div>

        <div className="ledger-cols">
          <span>Particulars</span>
          <span>Amount (₹)</span>
        </div>

        <ol className="ledger-body">
          {s.rows.map((r, i) => (
            <li
              key={r.label}
              className={`ledger-line ${r.sub ? "ledger-subline" : ""} ${state.printed > i ? "in" : ""}`}
            >
              <span>{r.label}</span>
              <span className={`ledger-amount ${r.debit ? "is-debit" : ""}`}>
                {r.debit ? "\u2212 " : ""}
                {r.value}
              </span>
            </li>
          ))}

          <li className={`ledger-rule ${state.printed > TOTAL_ROWS ? "in" : ""}`} aria-hidden />

          <li className={`ledger-line ledger-total ${state.printed > TOTAL_ROWS ? "in" : ""}`}>
            <span>{s.total.label}</span>
            <span className="ledger-amount">{s.total.value}</span>
          </li>
          <li className={`ledger-line ledger-ratio ${state.printed > TOTAL_ROWS + 1 ? "in" : ""}`}>
            <span>{s.ratio.label}</span>
            <span className="ledger-amount" id="ratio-figure">
              {s.ratio.value}
            </span>
          </li>
        </ol>

        {/* the hand: pen strokes drawn over the finished figures */}
        <svg className={`pen ${marked ? "in" : ""}`} viewBox="0 0 400 300" preserveAspectRatio="none" aria-hidden>
          {/* loose circle around the ratio figure */}
          <path
            className="pen-stroke pen-1"
            d="M312 246c-34-9-62-6-72 3-9 8-2 18 22 22 27 5 62 2 74-6 11-8 4-17-16-21-22-5-52-4-66 2"
            fill="none"
          />
          {/* underline under the total */}
          <path className="pen-stroke pen-2" d="M232 214c26 3 52 4 78 1" fill="none" />
          {/* arrow from the note up to the circle */}
          <path className="pen-stroke pen-3" d="M196 286c22-6 48-16 74-28" fill="none" />
          <path className="pen-stroke pen-3" d="M262 254l10 4-3 10" fill="none" />
        </svg>

        <span className={`pen-note ${marked ? "in" : ""}`}>{s.note}</span>

        <div className={`ledger-foot ${state.printed > TOTAL_ROWS + 1 ? "in" : ""}`}>
          <span className="ledger-sig">Anurag Sharma</span>
          <span className="ledger-sigline">Prepared by &middot; Yashova, Faridabad</span>
          {state.phase === "print" && <span className="ledger-caret" aria-hidden />}
        </div>

        <span className={`ledger-stamp ${marked ? "in" : ""}`} aria-hidden>
          {s.stamp}
        </span>
      </div>

      {/* which statement is on top */}
      <div className="ledger-tabs" role="tablist" aria-label="Client statements">
        {statements.map((st, i) => (
          <span
            key={st.no}
            role="tab"
            aria-selected={i === state.doc}
            className={`ledger-tab ${i === state.doc ? "is-on" : ""}`}
          >
            {st.client}
          </span>
        ))}
      </div>
    </div>
  );
}
