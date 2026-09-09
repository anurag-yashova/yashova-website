"use client";

import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import { buildNoteForBareAmount, type Currency } from "@/lib/currency";

/** A working desk, not a hero image.
 *  Statements roll off one after another; a hand marks each one up in pen,
 *  then the page is pulled away and the next one starts printing. */

type Row = { label: string; value: string; debit?: boolean; sub?: boolean; money?: boolean };

type Total = { label: string; value: string; money?: boolean };
type Statement = {
  no: string;
  client: string;
  period: string;
  rows: Row[];
  total: Total;
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
      { label: "Ad spend", value: "18,60,000", debit: true, money: true },
      { label: "Clicks", value: "1,86,000" },
      { label: "Leads captured", value: "15,000" },
      { label: "of which unqualified", value: "(9,200)", sub: true },
      { label: "Admissions", value: "780" },
    ],
    total: { label: "Revenue generated", value: "1,02,00,000", money: true },
    ratio: { label: "Return on ad spend", value: "5.5X" },
    note: "₹126 a lead. 780 seats filled.",
    stamp: "Verified",
  },
  {
    no: "002",
    client: "Helping Hands Foundation",
    period: "60 days · Meta Ads + CAPI",
    rows: [
      { label: "Cost per result, start", value: "175.61", debit: true, money: true },
      { label: "Cost per result, scaled", value: "85.48", money: true },
      { label: "Donor transactions", value: "11,246" },
      { label: "Disputes raised", value: "(0)", sub: true },
      { label: "Paid via UPI", value: "96.99%" },
    ],
    total: { label: "Donations collected", value: "30,11,507", money: true },
    ratio: { label: "Return on ad spend", value: "4.5X" },
    note: "Razorpay verified. Zero chargebacks.",
    stamp: "Verified",
  },
  {
    no: "003",
    client: "CvolvePro",
    period: "Initial phase · LinkedIn",
    rows: [
      { label: "Ad spend", value: "41,010", debit: true, money: true },
      { label: "Impressions", value: "3,86,438" },
      { label: "Professional reach", value: "2,22,630" },
      { label: "Best ad set CPC", value: "4.28", sub: true, money: true },
      { label: "Clicks", value: "8,752" },
    ],
    total: { label: "Cost per click", value: "4.69", money: true },
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

type Marks = {
  w: number;
  h: number;
  ring: string;      // wobbly ellipse around the ratio figure
  underline: string; // stroke under the total figure
  arrow: string;
  arrowHead: string;
  noteX: number;
  noteY: number;
};

/** Hand-drawn ellipse around a rect: four cubic arcs with a deterministic wobble,
 *  overshooting slightly at the end the way a real pen does. */
function ringPath(x: number, y: number, w: number, h: number): string {
  const cx = x + w / 2;
  const cy = y + h / 2;
  const rx = w / 2 + 12;
  const ry = h / 2 + 8;
  const k = 0.5523;
  const j = (n: number) => n * (1 + 0.04);
  return [
    `M ${cx + rx} ${cy - 2}`,
    `C ${cx + rx} ${cy - j(ry) * k + 2}, ${cx + rx * k} ${cy - ry}, ${cx - 1} ${cy - ry}`,
    `C ${cx - rx * k - 3} ${cy - ry}, ${cx - rx} ${cy - ry * k}, ${cx - rx} ${cy + 1}`,
    `C ${cx - rx} ${cy + ry * k + 2}, ${cx - rx * k} ${cy + ry}, ${cx + 2} ${cy + ry}`,
    `C ${cx + rx * k + 4} ${cy + ry}, ${cx + rx + 2} ${cy + ry * k}, ${cx + rx - 1} ${cy - 4}`,
    `C ${cx + rx - 3} ${cy - ry * 0.75}, ${cx + rx * 0.6} ${cy - ry - 3}, ${cx - 6} ${cy - ry - 1}`,
  ].join(" ");
}

export default function LedgerHero({ ccy, rates }: { ccy: Currency; rates: Record<string, number> }) {
  const ref = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const ratioRef = useRef<HTMLSpanElement>(null);
  const totalRef = useRef<HTMLSpanElement>(null);
  const [marks, setMarks] = useState<Marks | null>(null);
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

  const measure = useCallback(() => {
    const sheet = sheetRef.current;
    const ratio = ratioRef.current;
    const total = totalRef.current;
    if (!sheet || !ratio || !total) return;

    const base = sheet.getBoundingClientRect();
    const r = ratio.getBoundingClientRect();
    const t = total.getBoundingClientRect();

    const rx = r.left - base.left;
    const ry = r.top - base.top;
    const tx = t.left - base.left;
    const ty = t.top - base.top;

    setMarks({
      w: base.width,
      h: base.height,
      ring: ringPath(rx, ry, r.width, r.height),
      underline: `M ${tx - 4} ${ty + t.height + 5} C ${tx + t.width * 0.35} ${ty + t.height + 8}, ${tx + t.width * 0.7} ${ty + t.height + 2}, ${tx + t.width + 5} ${ty + t.height + 6}`,
      arrow: `M ${rx - 120} ${ry + 74} C ${rx - 84} ${ry + 66}, ${rx - 46} ${ry + 46}, ${rx - 16} ${ry + 22}`,
      arrowHead: `M ${rx - 30} ${ry + 24} L ${rx - 16} ${ry + 22} L ${rx - 22} ${ry + 36}`,
      noteX: Math.max(16, rx - 210),
      noteY: ry + 66,
    });
  }, []);

  useEffect(() => {
    if (state.phase !== "mark") return;
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [state.phase, measure]);

  const s = statements[state.doc];
  const marked = state.phase === "mark" || state.phase === "hold";
  const leaving = state.phase === "hold";

  return (
    <div className="ledger-desk">
      {/* the stack of statements underneath */}
      <div className="ledger-stack" aria-hidden />
      <div className="ledger-stack ledger-stack-2" aria-hidden />

      <div
        ref={(el) => {
          ref.current = el;
          sheetRef.current = el;
        }}
        className={`ledger ${leaving ? "is-leaving" : ""}`}
        key={state.doc}
      >
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
                {r.money && buildNoteForBareAmount(r.value, ccy, rates) && (
                  <span className="ccy-note">{buildNoteForBareAmount(r.value, ccy, rates)}</span>
                )}
              </span>
            </li>
          ))}

          <li className={`ledger-rule ${state.printed > TOTAL_ROWS ? "in" : ""}`} aria-hidden />

          <li className={`ledger-line ledger-total ${state.printed > TOTAL_ROWS ? "in" : ""}`}>
            <span>{s.total.label}</span>
            <span ref={totalRef} className="ledger-amount">
              {s.total.value}
              {s.total.money && buildNoteForBareAmount(s.total.value, ccy, rates) && (
                <span className="ccy-note">{buildNoteForBareAmount(s.total.value, ccy, rates)}</span>
              )}
            </span>
          </li>
          <li className={`ledger-line ledger-ratio ${state.printed > TOTAL_ROWS + 1 ? "in" : ""}`}>
            <span>{s.ratio.label}</span>
            <span ref={ratioRef} className="ledger-amount">
              {s.ratio.value}
            </span>
          </li>
        </ol>

        {/* the hand: pen strokes drawn around the actual figures, measured from the DOM */}
        {marks && (
          <svg
            className={`pen ${marked ? "in" : ""}`}
            viewBox={`0 0 ${marks.w} ${marks.h}`}
            width={marks.w}
            height={marks.h}
            aria-hidden
          >
            <path className="pen-stroke pen-1" d={marks.ring} fill="none" />
            <path className="pen-stroke pen-2" d={marks.underline} fill="none" />
            <path className="pen-stroke pen-3" d={marks.arrow} fill="none" />
            <path className="pen-stroke pen-3" d={marks.arrowHead} fill="none" />
          </svg>
        )}

        <span
          className={`pen-note ${marked ? "in" : ""}`}
          style={marks ? { left: marks.noteX, top: marks.noteY } : undefined}
        >
          {s.note}
        </span>

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
