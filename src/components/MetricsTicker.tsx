const metrics = [
  { label: "TAL revenue generated", value: "₹1.02Cr+" },
  { label: "ROAS", value: "5.5X" },
  { label: "HHF donations — Razorpay verified", value: "₹30.1L" },
  { label: "payments captured", value: "11,246" },
  { label: "CTR vs 0.8–1.5% industry avg", value: "2.8%" },
  { label: "CPL best batch", value: "₹11.40" },
  { label: "LinkedIn reach (CvolvePro)", value: "222,630+" },
  { label: "admissions", value: "780+" },
  { label: "CPR reduction", value: "51%" },
  { label: "payment disputes", value: "₹0.00" },
  { label: "brands scaled", value: "150+" },
  { label: "qualified leads (TAL)", value: "5,800+" },
];

export default function MetricsTicker() {
  return (
    <div className="ticker" aria-hidden>
      <div className="ticker-track">
        {[...metrics, ...metrics].map((m, i) => (
          <span key={`${m.label}-${i}`} className="ticker-item">
            <b>{m.value}</b> {m.label}
          </span>
        ))}
      </div>
    </div>
  );
}
