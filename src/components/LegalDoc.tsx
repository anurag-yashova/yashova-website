import PageHero from "@/components/PageHero";
import { MarkPolicy } from "@/components/icons";

export type LegalSection = { heading: string; body: React.ReactNode };

/** Shared layout for plain-language policy pages (same look as the refund policy). */
export default function LegalDoc({
  title,
  index,
  eyebrow,
  updated,
  intro,
  sections,
}: {
  title: string;
  index: string;
  eyebrow: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <PageHero eyebrow={eyebrow} icon={MarkPolicy} title={title} index={index} />
      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="space-y-8 text-sm leading-relaxed text-ink-muted">
          <p className="font-mono-num text-xs uppercase tracking-[0.14em]">Last updated: {updated}</p>
          <p>{intro}</p>
          {sections.map((s) => (
            <div key={s.heading}>
              <h2 className="text-lg font-semibold text-ink">{s.heading}</h2>
              <div className="mt-2 space-y-2">{s.body}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
