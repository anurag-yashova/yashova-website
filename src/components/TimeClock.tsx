"use client";

import { useSyncExternalStore } from "react";

/** Live local times for two places and the real gap between them.
 *  Everything is computed from the visitor's clock with Intl, so daylight
 *  saving is handled correctly. Nothing here is a claim; it is just the time. */

type Place = { label: string; tz: string };

function subscribe(cb: () => void) {
  const id = setInterval(cb, 15000);
  return () => clearInterval(id);
}
const getMinute = () => Math.floor(Date.now() / 60000);
const getServerMinute = () => 0;

function parts(tz: string, at: Date) {
  const f = new Intl.DateTimeFormat("en-GB", {
    timeZone: tz,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    weekday: "short",
  });
  const p = Object.fromEntries(f.formatToParts(at).map((x) => [x.type, x.value]));
  const hour = Number(p.hour) % 24;
  return { time: `${String(hour).padStart(2, "0")}:${p.minute}`, hour, day: p.weekday };
}

function offsetMinutes(tz: string, at: Date) {
  const f = new Intl.DateTimeFormat("en-US", { timeZone: tz, timeZoneName: "shortOffset" });
  const name = f.formatToParts(at).find((x) => x.type === "timeZoneName")?.value ?? "GMT";
  const m = name.match(/GMT([+-])(\d{1,2})(?::(\d{2}))?/);
  if (!m) return 0;
  const mins = Number(m[2]) * 60 + Number(m[3] ?? 0);
  return m[1] === "-" ? -mins : mins;
}

function gapText(a: Place, b: Place, at: Date) {
  const diff = offsetMinutes(b.tz, at) - offsetMinutes(a.tz, at);
  const abs = Math.abs(diff);
  const h = Math.floor(abs / 60);
  const m = abs % 60;
  const span = m ? `${h} h ${m} min` : `${h} h`;
  if (diff === 0) return "Same time";
  return diff > 0 ? `${b.label} is ${span} ahead of ${a.label}` : `${b.label} is ${span} behind ${a.label}`;
}

export default function TimeClock({ a, b }: { a: Place; b: Place }) {
  const minute = useSyncExternalStore(subscribe, getMinute, getServerMinute);
  const ready = minute !== 0;
  const at = new Date(minute * 60000);

  return (
    <div className="grid gap-px border border-surface-line bg-surface-line sm:grid-cols-[1fr_1fr]">
      {[a, b].map((pl) => {
        const t = ready ? parts(pl.tz, at) : null;
        const open = t ? t.hour >= 9 && t.hour < 18 : false;
        return (
          <div key={pl.label} className="flex items-center justify-between gap-4 bg-surface px-6 py-6">
            <div>
              <div className="eyebrow">{pl.label}</div>
              <div className="mt-2 font-mono-num text-4xl font-semibold tabular-nums text-ink md:text-5xl" aria-live="off">
                {t ? t.time : "--:--"}
              </div>
              <div className="mt-1 text-xs text-ink-muted">{t ? t.day : " "}</div>
            </div>
            <span
              className={`pill shrink-0 px-3 py-1.5 ${open ? "text-signal" : "text-ink-muted"}`}
              style={{ visibility: ready ? "visible" : "hidden" }}
            >
              {open ? "Working hours" : "After hours"}
            </span>
          </div>
        );
      })}
      <p className="bg-surface px-6 py-4 text-sm text-ink-muted sm:col-span-2">
        {ready ? gapText(a, b, at) : "Live local times"}. Calls are booked in your own time zone.
      </p>
    </div>
  );
}
