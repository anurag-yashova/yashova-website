import type { Metadata } from "next";
import ROICalculator from "./ROICalculator";
import PageHero from "@/components/PageHero";
import { MarkTool } from "@/components/icons";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Ad Spend ROI Calculator",
  description:
    "Enter your monthly ad spend, cost per click, landing page conversion rate and order value to estimate clicks, conversions and projected revenue.",
  path: "/roi-calculator",
});

export default function ROICalculatorPage() {
  return (
    <>
    <PageHero
      eyebrow="Run your own numbers"
        icon={MarkTool}
      index="04"
      title={<>ROI <span className="hl">Calculator</span></>}
      lead="Adjust the numbers to see what a given ad spend could return, based on your own click cost, conversion rate, and deal value."
    />
    <section className="mx-auto max-w-5xl px-6 py-16">
      <ROICalculator />
    </section>
    </>
  );
}
