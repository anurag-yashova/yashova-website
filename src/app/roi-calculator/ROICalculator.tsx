"use client";

import { useMemo, useState } from "react";

export default function ROICalculator() {
  const [adSpend, setAdSpend] = useState(50000);
  const [cpc, setCpc] = useState(15);
  const [conversionRate, setConversionRate] = useState(3);
  const [avgOrderValue, setAvgOrderValue] = useState(2500);

  const results = useMemo(() => {
    const clicks = cpc > 0 ? adSpend / cpc : 0;
    const conversions = clicks * (conversionRate / 100);
    const revenue = conversions * avgOrderValue;
    const roas = adSpend > 0 ? revenue / adSpend : 0;
    const costPerConversion = conversions > 0 ? adSpend / conversions : 0;
    const profit = revenue - adSpend;
    return { clicks, conversions, revenue, roas, costPerConversion, profit };
  }, [adSpend, cpc, conversionRate, avgOrderValue]);

  const fmt = (n: number, decimals = 0) =>
    n.toLocaleString("en-IN", { maximumFractionDigits: decimals });

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-6 rounded-lg border border-surface-line/60 bg-surface p-7">
        <Field
          label="Monthly Ad Spend"
          prefix="₹"
          value={adSpend}
          onChange={setAdSpend}
          min={1000}
          max={2000000}
          step={1000}
        />
        <Field
          label="Average Cost Per Click"
          prefix="₹"
          value={cpc}
          onChange={setCpc}
          min={1}
          max={200}
          step={1}
        />
        <Field
          label="Landing Page Conversion Rate"
          suffix="%"
          value={conversionRate}
          onChange={setConversionRate}
          min={0.1}
          max={30}
          step={0.1}
        />
        <Field
          label="Average Order / Deal Value"
          prefix="₹"
          value={avgOrderValue}
          onChange={setAvgOrderValue}
          min={100}
          max={500000}
          step={100}
        />
      </div>

      <div className="rounded-lg border border-surface-line/60 bg-void p-7">
        <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Projected Outcome</h3>
        <div className="mt-6 grid grid-cols-2 gap-5">
          <Result label="Estimated Clicks" value={fmt(results.clicks)} />
          <Result label="Estimated Conversions" value={fmt(results.conversions, 1)} />
          <Result label="Cost per Conversion" value={`₹${fmt(results.costPerConversion)}`} />
          <Result label="Projected Revenue" value={`₹${fmt(results.revenue)}`} />
        </div>
        <div className="mt-6 rounded-md border border-gold/30 bg-ink/5 p-5">
          <div className="font-mono-num text-3xl font-semibold text-gold">
            {results.roas.toFixed(2)}x
          </div>
          <div className="mt-1 text-sm text-ink-muted">Return on Ad Spend (ROAS)</div>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-ink-muted">
          Estimates only, based on the inputs above — not a guarantee of
          results. Real performance depends on targeting, creative, offer,
          and market. Book a strategy call for a plan built around your
          actual numbers.
        </p>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  min,
  max,
  step,
  prefix,
  suffix,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  prefix?: string;
  suffix?: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-ink-muted">{label}</label>
        <span className="font-mono-num text-sm font-semibold text-ink">
          {prefix}
          {value.toLocaleString("en-IN")}
          {suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 w-full accent-[color:var(--gold)] focus-ring"
      />
    </div>
  );
}

function Result({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-mono-num text-lg font-semibold text-ink">{value}</div>
      <div className="text-[11px] leading-tight text-ink-muted">{label}</div>
    </div>
  );
}
