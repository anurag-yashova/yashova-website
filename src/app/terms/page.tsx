import type { Metadata } from "next";
import Link from "next/link";
import LegalDoc from "@/components/LegalDoc";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Terms of Use",
  description:
    "The terms for using yashova.com and its free tools: what the site offers, how case study figures should be read, and the limits of what we promise.",
  path: "/terms",
});

export default function Terms() {
  return (
    <LegalDoc
      title="Terms of Use"
      index="09"
      eyebrow="The ground rules"
      updated="8 October 2026"
      intro="By using yashova.com you agree to these terms. They cover the website and its free tools. Paid work is covered by the written agreement we make with each client."
      sections={[
        {
          heading: "What this site is",
          body: (
            <p>
              yashova.com describes the performance marketing services of Yashova and offers free tools, such as the
              ROI calculator and the growth audit. Nothing on the site is a contract until we agree one with you in
              writing.
            </p>
          ),
        },
        {
          heading: "Results and figures",
          body: (
            <>
              <p>
                Case studies, blog posts and teardowns show real figures from specific accounts over specific periods.
                Your results will depend on your offer, market, budget and follow-up, and we do not guarantee any
                particular outcome.
              </p>
              <p>
                Teardowns use outside-in estimates. Any ad spend shown there is labelled as estimated and is not
                client data. Figures shown in other currencies are approximate conversions; the original figure is
                the one that counts.
              </p>
            </>
          ),
        },
        {
          heading: "Free tools",
          body: (
            <p>
              The ROI calculator and the growth audit give estimates from the numbers you enter and from public
              signals. They are a starting point for a conversation, not financial or legal advice.
            </p>
          ),
        },
        {
          heading: "Paid services and refunds",
          body: (
            <p>
              Paid engagements are governed by the agreement we sign with you. Refund terms are on our{" "}
              <Link href="/refund-policy" className="link-line text-ink">
                Refund Policy
              </Link>
              .
            </p>
          ),
        },
        {
          heading: "Our content",
          body: (
            <p>
              The text, designs and charts on this site belong to Yashova, except client logos and names, which belong
              to those clients. Please do not copy our material without asking.
            </p>
          ),
        },
        {
          heading: "Limits of liability",
          body: (
            <p>
              The site is provided as it is. To the extent the law allows, Yashova is not liable for losses that come
              from relying on the site or its tools alone.
            </p>
          ),
        },
        {
          heading: "Governing law",
          body: <p>These terms are governed by the laws of India.</p>,
        },
        {
          heading: "Contact",
          body: (
            <p>
              Questions about these terms:{" "}
              <a href="mailto:anurag@yashova.com" className="link-line text-ink">
                anurag@yashova.com
              </a>
              . Also see our{" "}
              <Link href="/privacy-policy" className="link-line text-ink">
                Privacy Policy
              </Link>
              .
            </p>
          ),
        },
      ]}
    />
  );
}
