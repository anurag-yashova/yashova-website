import type { Currency } from "@/lib/currency";

/** Small honesty note shown only when figures are converted away from rupees. */
export default function CcyFootnote({ ccy, className = "" }: { ccy: Currency; className?: string }) {
  if (ccy === "INR") return null;
  return (
    <p className={`ccy-foot ${className}`}>
      Figures marked ≈ are approx., billed in INR. The rupee amount is the verified one.
    </p>
  );
}
