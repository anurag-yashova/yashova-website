/** Floating KPI notifications cycling over the hero chart — the site
 *  feels like a live ads dashboard capturing wins. Pure CSS animation. */
const events = [
  { text: <>Payment captured — <b>₹2,400</b></>, style: { top: "8%", right: "-4%", animationDelay: "0s" } },
  { text: <>Lead qualified — <b>₹126 CPL</b></>, style: { top: "38%", left: "-6%", animationDelay: "3s" } },
  { text: <>ROAS <b>5.5X</b> ↑</>, style: { bottom: "30%", right: "-5%", animationDelay: "6s" } },
  { text: <>Webinar seat booked <b>✓</b></>, style: { bottom: "4%", left: "-3%", animationDelay: "9s" } },
];

export default function LiveOpsFeed() {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 hidden md:block" aria-hidden>
      {events.map((e, i) => (
        <span key={i} className="kpi-chip" style={e.style}>
          <span className="dot" />
          <span>{e.text}</span>
        </span>
      ))}
    </div>
  );
}
