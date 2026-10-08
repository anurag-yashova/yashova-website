import type { Metadata } from "next";
import LegalDoc from "@/components/LegalDoc";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Privacy Policy",
  description:
    "What Yashova collects when you use yashova.com, why, who sees it, which cookies are used, and how to ask for your details to be removed.",
  path: "/privacy-policy",
});

const mail = (
  <a href="mailto:anurag@yashova.com" className="link-line text-ink">
    anurag@yashova.com
  </a>
);

export default function PrivacyPolicy() {
  return (
    <LegalDoc
      title="Privacy Policy"
      index="08"
      eyebrow="What we collect, and why"
      updated="8 October 2026"
      intro="This page explains, in plain words, what information yashova.com collects, what we use it for, and the choices you have. We collect only what is needed to reply to you and to understand how the site is used."
      sections={[
        {
          heading: "What you give us",
          body: (
            <>
              <p>
                When you book a strategy call, we ask for your name, email, a message, and optionally a phone number.
                When you run the free growth audit, we ask for your website address, your goal, your name, your
                business name and your email.
              </p>
              <p>
                We use these details to reply to you, to prepare for a call, and to send you the audit you asked for.
                We do not sell them.
              </p>
            </>
          ),
        },
        {
          heading: "Who receives it",
          body: (
            <>
              <p>
                Form submissions are sent by email to the Yashova team through FormSubmit, an email-forwarding
                service. The site is hosted on Vercel. If you message us on WhatsApp, that conversation is handled by
                WhatsApp under its own privacy policy.
              </p>
            </>
          ),
        },
        {
          heading: "Analytics and advertising pixels",
          body: (
            <>
              <p>
                The site uses the Meta Pixel to measure our own advertising, for example to count a strategy call
                booking or an audit request. Meta may use that data under its own policies. If Google Analytics is
                switched on, it is used only to count visits and see which pages are read.
              </p>
            </>
          ),
        },
        {
          heading: "Cookies and local storage",
          body: (
            <>
              <p>
                We store a small cookie called <span className="text-ink">ccy</span> to remember which currency you
                are viewing prices in, for up to 180 days. We store your light or dark theme choice in your browser.
                The Meta Pixel may set its own cookies. You can block or delete cookies in your browser settings; the
                site will still work.
              </p>
            </>
          ),
        },
        {
          heading: "Currency and country",
          body: (
            <p>
              To show figures in a familiar currency, the site reads the country your connection appears to come
              from. We do not store your exact location.
            </p>
          ),
        },
        {
          heading: "Your choices",
          body: (
            <p>
              You can ask us to show, correct or delete the details you sent us. Email {mail} and we will act on it.
            </p>
          ),
        },
        {
          heading: "Changes to this page",
          body: <p>If we change how we handle your details, we will update this page and the date above.</p>,
        },
        {
          heading: "Contact",
          body: (
            <p>
              Questions about this policy: {mail}. Yashova, 741, Sector-23, Faridabad, Haryana, India.
            </p>
          ),
        },
      ]}
    />
  );
}
