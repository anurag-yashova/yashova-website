import type { Metadata } from "next";
import ROICalculator from "./ROICalculator";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "ROI Calculator",
  description: "Estimate your ad spend ROI based on your own numbers.",
};

export default function ROICalculatorPage() {
  return (
    <>
    <PageHero
      eyebrow="Free Tool"
      title={<>ROI <span className="hl">Calculator</span></>}
      lead="Adjust the numbers to see what a given ad spend could return, based on your own click cost, conversion rate, and deal value."
    />
    <section className="mx-auto max-w-5xl px-6 py-16">
      <ROICalculator />
    </section>
    </>
  );
}
