export default function PageHero({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-glass-border">
      <div className="dot-grid pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(215,175,55,0.07),transparent_60%)]" />
      <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-24">
        <p className="eyebrow rise-1 text-gold">{eyebrow}</p>
        <h1 className="rise-2 mt-3 max-w-3xl text-4xl leading-[1.08] tracking-tight text-ink md:text-6xl">
          {title}
        </h1>
        {lead && (
          <p className="rise-3 mt-5 max-w-xl text-base leading-relaxed text-ink-muted md:text-lg">
            {lead}
          </p>
        )}
        {children && <div className="rise-4 mt-8">{children}</div>}
      </div>
    </section>
  );
}
