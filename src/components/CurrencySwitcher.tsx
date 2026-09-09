"use client";

import { useSyncExternalStore } from "react";
import { SUPPORTED_CCY } from "@/lib/currency";

function readCookie(): string {
  if (typeof document === "undefined") return "INR";
  const match = document.cookie.match(/(?:^|; )ccy=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : "INR";
}

/** Shows the visitor's detected currency and lets them override it. The
 *  detection itself needs no setup (see middleware.ts) — this is purely the
 *  manual escape hatch for when geo-IP guesses wrong (VPNs, offices, travel). */
export default function CurrencySwitcher() {
  const ccy = useSyncExternalStore(
    () => () => {},
    readCookie,
    () => "INR" // server snapshot — avoids a hydration mismatch
  );

  function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const next = e.target.value;
    document.cookie = `ccy=${next}; path=/; max-age=${60 * 60 * 24 * 180}`;
    window.location.reload();
  }

  return (
    <select
      value={ccy}
      onChange={onChange}
      className="ccy-switch"
      aria-label="Currency"
      title="Figures shown in your currency alongside the verified ₹ amount"
    >
      {SUPPORTED_CCY.map((c) => (
        <option key={c} value={c}>
          {c}
        </option>
      ))}
    </select>
  );
}
