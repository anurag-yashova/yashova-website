/** Self-drawing ROAS curve — the hero's signature moment.
 *  Pure SVG + CSS animation, no JS runtime cost. */
export default function HeroChart() {
  // upward revenue curve with a dip (honest — real campaigns dip before scaling)
  const line = "M0,175 C40,168 70,160 100,150 C130,140 150,152 180,138 C215,122 235,95 270,80 C305,64 330,52 360,30";
  const fill = `${line} L360,200 L0,200 Z`;

  const dots = [
    { cx: 100, cy: 150, delay: "1.0s" },
    { cx: 180, cy: 138, delay: "1.4s" },
    { cx: 270, cy: 80, delay: "1.8s" },
    { cx: 360, cy: 30, delay: "2.3s" },
  ];

  return (
    <div className="relative w-full">
      <svg
        viewBox="0 0 360 200"
        className="w-full"
        role="img"
        aria-label="Revenue growth curve trending upward"
      >
        <defs>
          <linearGradient id="goldFade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D7AF37" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#D7AF37" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* grid */}
        {[40, 80, 120, 160].map((y) => (
          <line key={y} x1="0" y1={y} x2="360" y2={y} stroke="rgba(196,207,222,0.08)" strokeWidth="1" />
        ))}
        {[72, 144, 216, 288].map((x) => (
          <line key={x} x1={x} y1="0" x2={x} y2="200" stroke="rgba(196,207,222,0.05)" strokeWidth="1" />
        ))}

        <path d={fill} fill="url(#goldFade)" className="chart-fill" />
        <path
          d={line}
          fill="none"
          stroke="#D7AF37"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="chart-line"
        />

        {dots.map((d) => (
          <circle
            key={d.cx}
            cx={d.cx}
            cy={d.cy}
            r="4.5"
            fill="#212428"
            stroke="#D7AF37"
            strokeWidth="2.5"
            className="chart-dot"
            style={{ animationDelay: d.delay }}
          />
        ))}

        {/* ROAS label at the peak */}
        <g className="chart-dot" style={{ animationDelay: "2.5s" }}>
          <rect x="288" y="4" rx="6" width="64" height="22" fill="rgba(215,175,55,0.12)" stroke="rgba(215,175,55,0.5)" strokeWidth="1" />
          <text x="320" y="19" textAnchor="middle" fill="#F0CC6B" fontSize="11" fontWeight="600" fontFamily="var(--font-montserrat), sans-serif">
            5.5X ROAS
          </text>
        </g>
      </svg>
    </div>
  );
}
