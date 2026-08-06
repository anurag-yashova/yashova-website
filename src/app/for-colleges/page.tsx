import Link from "next/link";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

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
      <PageHero
        eyebrow="For Colleges & Institutions"
        index="03"
        title={<>We partner with colleges to create <span className="hl">lasting impact</span> and new opportunities</>}
        lead="From placement marketing to certification-program enrollment, we build the acquisition systems that education institutions normally can't build in-house."
      />

      <section className="mx-auto max-w-4xl px-6 py-20">
        <div className="grid gap-6 sm:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 110}>
            <div className="glass card-hover h-full rounded-lg p-6">
              <h3 className="text-lg font-semibold text-ink">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{p.body}</p>
            </div>
            </Reveal>
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
            className="mt-6 inline-block rounded-md bg-ink px-8 py-3.5 text-sm font-semibold text-void hover:bg-gold focus-ring"
          >
            Collaborate With Us
          </Link>
        </div>
      </section>
    </>
  );
}
