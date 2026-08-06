export default function OutlineMarquee({
  words,
  goldEvery = 0,
}: {
  words: string[];
  goldEvery?: number;
}) {
  const row = [...words, ...words, ...words];
  return (
    <div className="outline-marquee" aria-hidden>
      <div className="marquee-track">
        {row.map((w, i) => (
          <span
            key={`${w}-${i}`}
            className={`outline-word ${goldEvery > 0 && i % goldEvery === goldEvery - 1 ? "gold-fill" : ""}`}
          >
            {w}
          </span>
        ))}
      </div>
    </div>
  );
}
