export default function PageHero({
  eyebrow,
  title,
  lead,
  index,
  icon: Icon,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: string;
  index?: string;
  icon?: React.ComponentType<{ className?: string }>;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-surface-line">
      <div className="dot-grid pointer-events-none absolute inset-0" />
      {index && (
        <span className="index-num pointer-events-none absolute -right-4 top-6 hidden text-[11rem] md:block lg:text-[15rem]" aria-hidden>
          {index}
        </span>
      )}
      <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
        <p className={`eyebrow rise-1 ${Icon ? "has-icon" : ""}`}>
          {Icon && <Icon className="eyebrow-icon" />}
          {eyebrow}
        </p>
        <h1 className="mt-6 max-w-4xl text-5xl font-bold leading-[1.06] tracking-tighter text-ink md:text-7xl lg:text-8xl">
          <span className="clip-line"><span>{title}</span></span>
        </h1>
        {lead && (
          <p className="rise-3 mt-8 max-w-xl text-base leading-relaxed text-ink-muted md:text-lg">
            {lead}
          </p>
        )}
        {children && <div className="rise-4 mt-10">{children}</div>}
        <div className="rule rise-4 mt-14" />
      </div>
    </section>
  );
}
