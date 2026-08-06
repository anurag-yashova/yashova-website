import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy",
};

export default function RefundPolicy() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-3xl font-semibold tracking-tight text-ink md:text-4xl">Refund Policy</h1>
      <div className="mt-8 space-y-8 text-sm leading-relaxed text-ink-muted">
        <p>
          At Yashova, we are committed to providing high-quality digital
          marketing, advertising, and lead generation services. By purchasing
          or subscribing to our services, you agree to the terms below.
        </p>

        <div>
          <h2 className="text-lg font-semibold text-ink">Refund Eligibility</h2>
          <p className="mt-2">Clients may request a refund within 7 days from:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>the date of signing the contract/agreement, or</li>
            <li>the initiation of the service/project,</li>
          </ul>
          <p className="mt-2">whichever occurs first.</p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-ink">Non-Refundable Policy</h2>
          <p className="mt-2">
            After 7 days of the contract date or service initiation, all
            payments made to Yashova become strictly non-refundable. Due to
            the nature of digital marketing services, resource allocation,
            strategy planning, advertising setup, team allocation, and
            execution begin immediately after onboarding.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-ink">Partial Refunds</h2>
          <p className="mt-2">
            If a refund request is approved within the eligible 7-day period,
            Yashova reserves the right to deduct:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>service setup charges,</li>
            <li>consultation fees,</li>
            <li>advertising spend,</li>
            <li>third-party tool costs,</li>
            <li>completed work charges,</li>
            <li>and any other applicable operational expenses.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-ink">Service Cancellation</h2>
          <p className="mt-2">
            Clients may request cancellation of ongoing services by providing
            written notice via email. Cancellation of services does not
            guarantee a refund for completed or in-progress work.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-ink">Contact Information</h2>
          <p className="mt-2">For refund-related inquiries, please contact:</p>
          <p className="mt-2">
            Email: <a href="mailto:anurag@yashova.com" className="text-gold hover:text-gold-bright">anurag@yashova.com</a>
            <br />
            Website: <a href="https://yashova.com" className="text-gold hover:text-gold-bright">https://yashova.com</a>
          </p>
        </div>

        <p>
          By using our services, you acknowledge that you have read,
          understood, and agreed to this Refund Policy.
        </p>
      </div>
    </section>
  );
}
