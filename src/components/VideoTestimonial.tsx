"use client";

import { useRef, useState } from "react";

/** Shared across all testimonial cards: pausing any other playing video
 *  when a new one starts. Only one voice at a time. */
function pauseOthers(current: HTMLVideoElement) {
  document.querySelectorAll<HTMLVideoElement>("video[data-testimonial]").forEach((v) => {
    if (v !== current && !v.paused) v.pause();
  });
}

export default function VideoTestimonial({
  src,
  label,
  role,
  quote,
}: {
  src: string;
  label: string;
  role?: string;
  quote: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  function toggle() {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      pauseOthers(v);
      v.play();
    } else {
      v.pause();
    }
  }

  return (
    <figure className="glass card-hover flex h-full flex-col overflow-hidden rounded-lg">
      <button
        type="button"
        onClick={toggle}
        className="group relative aspect-[9/16] max-h-80 w-full overflow-hidden bg-black focus-ring"
        aria-label={playing ? `Pause ${label} testimonial` : `Play ${label} testimonial`}
      >
        <video
          ref={videoRef}
          data-testimonial
          src={src}
          preload="metadata"
          playsInline
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
          className="h-full w-full object-cover"
        />
        {!playing && (
          <span className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors group-hover:bg-black/15">
            <span className="flex h-14 w-14 items-center justify-center rounded-md bg-ink shadow-lg">
              <svg viewBox="0 0 24 24" fill="var(--void)" className="ml-0.5 h-6 w-6" aria-hidden>
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </span>
        )}
      </button>
      <figcaption className="flex flex-1 flex-col p-5">
        <blockquote className="flex-1 text-sm leading-relaxed text-ink-muted">
          &ldquo;{quote}&rdquo;
        </blockquote>
        <div className="mt-4">
          <span className="block text-sm font-semibold text-ink">{label}</span>
          {role && (
            <span className="mt-0.5 block font-mono-num text-[11px] uppercase tracking-[0.12em] text-ink-muted">
              {role}
            </span>
          )}
        </div>
      </figcaption>
    </figure>
  );
}
