/** Custom icon set — hand-drawn for Yashova, 24x24, 1.8px stroke, gold-tintable. */

type IconProps = { className?: string };

const base = "h-7 w-7";

export function CoachIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={`${base} ${className}`}>
      {/* presenter at a whiteboard with rising arrow */}
      <rect x="3" y="3" width="18" height="12" rx="1.5" />
      <path d="M7 11l3-3 2.5 2L16 6" />
      <path d="M14.5 6H16v1.5" />
      <path d="M12 15v3" />
      <path d="M8 21c0-1.7 1.8-3 4-3s4 1.3 4 3" />
    </svg>
  );
}

export function HealthIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={`${base} ${className}`}>
      {/* heartbeat pulse inside a shield */}
      <path d="M12 21c-5-2.2-8-5.5-8-10V6l8-3 8 3v5c0 4.5-3 7.8-8 10z" />
      <path d="M7 12h2.5l1.2-2.5 2 4.5 1.3-2H17" />
    </svg>
  );
}

export function BuildingIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={`${base} ${className}`}>
      {/* house + location pin */}
      <path d="M3 11l7-6 7 6" />
      <path d="M5 10v9h10v-9" />
      <path d="M9 19v-5h2v5" />
      <circle cx="18.5" cy="8.5" r="2.8" />
      <path d="M18.5 11.3V14" />
    </svg>
  );
}

export function RocketIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={`${base} ${className}`}>
      <path d="M12 15c-1.5-3.5-1-8 2-11 3.5-1 6 1.5 5 5-3 3-7.5 3.5-11 2" />
      <path d="M9 15l-4 4" />
      <path d="M12 15c-2 .5-3.5 2-4 4 2-.5 3.5-2 4-4z" />
      <circle cx="15" cy="9" r="1.4" />
    </svg>
  );
}

export function TargetIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={`${base} ${className}`}>
      {/* crosshair target with arrow strike */}
      <circle cx="11" cy="13" r="8" />
      <circle cx="11" cy="13" r="3.5" />
      <path d="M11 13l7-7" />
      <path d="M15.5 6H18v2.5" transform="rotate(2 18 6)" />
    </svg>
  );
}

export function FunnelIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={`${base} ${className}`}>
      <path d="M3 4h18l-7 8v6l-4 2v-8L3 4z" />
      <path d="M14 18.5c2 .5 4-.5 4.5-2" opacity="0.5" />
    </svg>
  );
}

export function StrategyIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={`${base} ${className}`}>
      {/* branching decision path */}
      <circle cx="5" cy="19" r="2.2" />
      <circle cx="12" cy="5" r="2.2" />
      <circle cx="19" cy="19" r="2.2" />
      <path d="M6.3 17.3L10.7 7" />
      <path d="M13.3 7l4.4 10.3" />
      <path d="M12 7.2V12" strokeDasharray="1.5 2.5" />
    </svg>
  );
}

export function SearchInsightIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={`${base} ${className}`}>
      {/* magnifier over a bar chart */}
      <circle cx="10" cy="10" r="7" />
      <path d="M15.5 15.5L21 21" />
      <path d="M7 12.5v-3" />
      <path d="M10 12.5V7" />
      <path d="M13 12.5V9.5" />
    </svg>
  );
}

export function MapIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={`${base} ${className}`}>
      {/* roadmap with waypoints */}
      <path d="M4 20c4-1 4-5 8-6s5-4.5 8-5" />
      <circle cx="4" cy="20" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="12" cy="14" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="20" cy="9" r="1.6" fill="currentColor" stroke="none" />
      <path d="M20 6.5V4h-2.5" />
    </svg>
  );
}

export function TeamIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={`${base} ${className}`}>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5" />
      <circle cx="17" cy="9" r="2.3" />
      <path d="M15.5 14.2c2.6.2 4.8 2 5 4.8" />
    </svg>
  );
}

export function ScaleUpIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={`${base} ${className}`}>
      {/* bars stepping up with arrow */}
      <path d="M4 20v-4" />
      <path d="M9 20v-7" />
      <path d="M14 20V9" />
      <path d="M19 20V5" />
      <path d="M16.5 5H19v2.5" />
    </svg>
  );
}

export function NoEqualIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={`${base} ${className}`}>
      {/* ≠ inside a burst */}
      <path d="M7 10h10" />
      <path d="M7 14h10" />
      <path d="M15 7l-6 10" />
    </svg>
  );
}
