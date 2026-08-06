export default function Stat({
  value,
  label,
  accent = "gold",
}: {
  value: string;
  label: string;
  accent?: "gold" | "signal";
}) {
  return (
    <div className="rounded-xl border border-surface-line/60 bg-surface p-5">
      <div
        className={`font-mono-num text-3xl font-semibold ${
          accent === "signal" ? "text-signal" : "text-gold"
        }`}
      >
        {value}
      </div>
      <div className="mt-1 text-sm text-ink-muted">{label}</div>
    </div>
  );
}
