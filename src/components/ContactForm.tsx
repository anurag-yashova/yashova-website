"use client";

import { useState } from "react";
import { track } from "@/lib/track";

/** Submits straight to WhatsApp — no backend needed, matches the
 *  agency's WhatsApp-first follow-up workflow. */
export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    track("Lead", { content_name: "Strategy Call Form" });
    const text = `Hi, I'm ${name || "—"} (${email || "no email"}). I want to discuss growth: ${message || "—"}`;
    window.open(
      `https://wa.me/919818086846?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  return (
    <form onSubmit={submit} className="glass space-y-5 rounded-lg p-8">
      <div>
        <label htmlFor="name" className="text-sm font-medium text-ink-muted">Name</label>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1.5 w-full rounded-lg border border-glass-border bg-void px-4 py-2.5 text-ink focus-ring"
        />
      </div>
      <div>
        <label htmlFor="email" className="text-sm font-medium text-ink-muted">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1.5 w-full rounded-lg border border-glass-border bg-void px-4 py-2.5 text-ink focus-ring"
        />
      </div>
      <div>
        <label htmlFor="message" className="text-sm font-medium text-ink-muted">What are you looking to grow?</label>
        <textarea
          id="message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mt-1.5 w-full rounded-lg border border-glass-border bg-void px-4 py-2.5 text-ink focus-ring"
        />
      </div>
      <button
        type="submit"
        className="cta-pulse w-full rounded-md bg-ink px-6 py-3 text-sm font-medium text-void transition-colors hover:bg-gold focus-ring"
      >
        Send on WhatsApp
      </button>
      <p className="text-xs text-ink-muted">
        Opens WhatsApp with your message pre-filled — we reply within a few hours.
      </p>
    </form>
  );
}
