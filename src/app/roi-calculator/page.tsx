import type { Metadata } from "next";
import ROICalculator from "./ROICalculator";

export const metadata: Metadata = {
  title: "ROI Calculator",
  description: "Estimate your ad spend ROI based on your own numbers.",
};

export default function ROICalculatorPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <p className="eyebrow text-gold">Free Tool</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink md:text-5xl">
        ROI Calculator
      </h1>
      <p className="mt-4 max-w-lg text-ink-muted">
        Adjust the numbers to see what a given ad spend could return, based
        on your own click cost, conversion rate, and deal value.
      </p>
      <div className="mt-12">
        <ROICalculator />
      </div>
    </section>
  );
}
