import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "For Colleges & Institutions",
  description: "We partner with colleges to create lasting impact and new opportunities.",
};

const pillars = [
  { title: "Improve Student Placements", body: "Build employer-ready pipelines and marketing that gets your placement cell noticed by recruiters." },
  { title: "Provide Industry-Relevant Training", body: "Position add-on certification and skilling programs so they actually reach the students who need them." },
  { title: "Create Additional Revenue Streams", body: "Turn certification programs, executive courses, and workshops into a consistent enrollment funnel." },
];

export default function ForColleges() {
  return (
    <>
      <section className="border-b border-glass-border">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <p className="eyebrow text-gold">For Colleges & Institutions</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink md:text-5xl">
            We partner with colleges to create lasting impact and new opportunities
          </h1>
          <p className="mt-5 max-w-2xl text-ink-muted">
            From placement marketing to certification-program enrollment, we
            build the acquisition systems that education institutions
            normally can&apos;t build in-house.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-20">
        <div className="grid gap-6 sm:grid-cols-3">
          {pillars.map((p) => (
            <div key={p.title} className="glass rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-ink">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-surface-line/60 bg-surface/40">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <h2 className="text-2xl font-semibold text-ink">
            Ready to build a real enrollment pipeline for your institution?
          </h2>
          <Link
            href="/strategy-call"
            className="mt-6 inline-block rounded-full bg-gold px-8 py-3.5 text-sm font-semibold text-void hover:bg-gold-bright focus-ring"
          >
            Collaborate With Us →
          </Link>
        </div>
      </section>
    </>
  );
}
