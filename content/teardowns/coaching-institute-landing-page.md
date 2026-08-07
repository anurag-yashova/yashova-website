---
title: "A coaching institute spending ₹4L a month on a page that asks for eleven fields"
subject: "Delhi NCR coaching institute · admissions funnel"
category: "Landing page"
spend: "₹4,00,000 / month"
publishedAt: "2026-08-06"
verdict: "Traffic is fine. The page is the leak."
excerpt: "Public ads, a live landing page, and a form that asks for eleven fields before it has earned one. A teardown of where the money goes."
keywords: ["landing page teardown", "coaching institute marketing", "lead form optimisation", "conversion rate optimisation India"]
findings:
  - severity: critical
    title: "Eleven form fields before any trust is built"
    detail: "Name, email, phone, city, state, course, qualification, year of passing, budget, how did you hear about us, and a message box. Every field after the fourth costs conversion rate, and none of the last seven change what the counsellor does on the first call."
  - severity: critical
    title: "6.4 second load on 4G"
    detail: "A 2.1MB hero image, three chat widgets and two analytics scripts fire before content paints. A large share of paid clicks leave before they see the offer they clicked for."
  - severity: major
    title: "The ad promises a fee discount the page never mentions"
    detail: "The creative leads with a limited-period offer. The landing page leads with the institute's history. Message mismatch between ad and page is one of the most expensive and most common failures in paid acquisition."
  - severity: major
    title: "No qualification, so the sales team sorts manually"
    detail: "Nothing in the form separates someone enrolling this week from someone browsing for next year. That sorting still happens — it just happens on the phone, at the cost of counsellor hours instead of a dropdown."
  - severity: minor
    title: "Call-to-action below the fold on mobile"
    detail: "On a 6.1 inch screen the primary button sits after two scrolls. It should be visible at rest."
---

## What we looked at

Ads running publicly on Meta for a Delhi NCR coaching institute, the landing page they point to, and the page's behaviour on a mid-range Android phone over 4G. No account access, no insider data — everything here is observable by anyone who clicks the ad.

We estimate spend from ad library activity and delivery breadth. Treat the number as an order of magnitude, not a precise figure.

## The core problem

This is not a traffic problem. The creative is doing its job — the ads are specific, the offer is clear, and the click-through looks healthy for the category.

The money is lost between the click and the form.

A visitor arriving from a discount ad wants to know one thing: does this course get me a job, and what does it cost. The page answers with the institute's founding year, a message from the chairman, and a photo gallery. The offer that made them click appears nowhere.

Then the form asks for eleven fields.

## What eleven fields actually costs

Every field after the fourth reduces completion. The exact figure varies by category, but the direction never does. For a course enquiry, four fields are enough: name, phone, one qualification question, one timeline question.

The timeline question is the valuable one. "How soon do you want to enrol — right away, this month, or exploring" tells the counsellor more than qualification, city, and year of passing combined, because it sorts the list by intent at the moment of maximum honesty.

The other seven fields are not gathering information. They are filtering out buyers.

## What we would change first

1. Cut the form to four fields, one of them a timeline question.
2. Put the ad's offer in the first line of the page, in the same words the ad used.
3. Compress the hero image, defer the chat widgets, and get first paint under two seconds on 4G.
4. Move the primary button above the fold on mobile.
5. Fire an automated WhatsApp confirmation on submission, before a human touches the lead.

None of that requires more budget. It requires the page to respect that the visitor already showed intent.

## The honest caveat

We cannot see their conversion rate, their close rate, or their unit economics. It is possible this page converts acceptably and the business is fine. But the failures above are mechanical — a six second load and eleven fields cost conversion regardless of how good the offer behind them is.

If you are running a similar funnel and want to know where yours leaks, the [free growth audit](/ai-audit) runs the same checks against your live page automatically.
