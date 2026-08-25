"use client";

import { useState } from "react";
import { track } from "@/lib/track";

type Status = "idle" | "sending" | "sent" | "error";

const LEAD_EMAILS = ["anurag@yashova.com", "akhil.sharma323@gmail.com"];

/** Sends straight from the browser to both inboxes. No account, no API key,
 *  nothing to configure — the only one-time step is that each address must
 *  click the confirmation link FormSubmit sends the very first time. */
export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    if (company) return; // bot filled the hidden field
    setStatus("sending");

    track("Schedule", { content_name: "Strategy Call Request" });

    const results = await Promise.allSettled(
      LEAD_EMAILS.map((to) =>
        fetch(`https://formsubmit.co/ajax/${encodeURIComponent(to)}`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            name,
            email,
            phone,
            message,
            _subject: `STRATEGY CALL — ${name || email || phone}`,
            _template: "table",
            _captcha: "false",
          }),
        })
      )
    );

    const anySent = results.some((r) => r.status === "fulfilled" && r.value.ok);
    setStatus(anySent ? "sent" : "error");
  }

  const waText = `Hi, I'm ${name || "—"}${phone ? ` (${phone})` : ""}. I want to discuss growth: ${message || "—"}`;
  const waHref = `https://wa.me/919818086846?text=${encodeURIComponent(waText)}`;

  if (status === "sent") {
    return (
      <div className="glass rounded-lg p-8">
        <p className="eyebrow">Received</p>
        <h3 className="mt-4 text-2xl font-bold tracking-tight text-ink">
          Thanks {name ? name.split(" ")[0] : ""} — that reached us.
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">
          We reply within a few working hours. If you would rather not wait, message us
          on WhatsApp and we will pick it up there.
        </p>
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="cta-pulse mt-6 inline-block rounded-md bg-ink px-6 py-3 text-sm font-medium text-void transition-colors hover:bg-gold focus-ring"
        >
          Continue on WhatsApp
        </a>
      </div>
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
          className="mt-1.5 w-full rounded-md border border-surface-line bg-void px-4 py-2.5 text-ink focus-ring"
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
          className="mt-1.5 w-full rounded-md border border-surface-line bg-void px-4 py-2.5 text-ink focus-ring"
        />
      </div>

      <div>
        <label htmlFor="phone" className="text-sm font-medium text-ink-muted">
          Phone <span className="text-ink-muted/70">(WhatsApp preferred)</span>
        </label>
        <input
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="mt-1.5 w-full rounded-md border border-surface-line bg-void px-4 py-2.5 text-ink focus-ring"
        />
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-medium text-ink-muted">
          What are you looking to grow?
        </label>
        <textarea
          id="message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mt-1.5 w-full rounded-md border border-surface-line bg-void px-4 py-2.5 text-ink focus-ring"
        />
      </div>

      <div className="hidden" aria-hidden>
        <label htmlFor="company">Company</label>
        <input
          id="company"
          tabIndex={-1}
          autoComplete="off"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="cta-pulse w-full rounded-md bg-ink px-6 py-3 text-sm font-medium text-void transition-colors hover:bg-gold focus-ring disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send it over"}
      </button>

      {status === "error" && (
        <p className="text-xs leading-relaxed text-ink-muted">
          Something went wrong sending that.{" "}
          <a href={waHref} target="_blank" rel="noopener noreferrer" className="link-line text-ink">
            Message us on WhatsApp instead
          </a>{" "}
          and we will pick it up straight away.
        </p>
      )}

      <p className="text-xs text-ink-muted">
        We reply within a few working hours. No newsletter, no reselling your details.
      </p>
    </form>
  );
}
