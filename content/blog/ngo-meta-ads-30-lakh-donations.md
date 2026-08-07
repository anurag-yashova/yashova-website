---
title: "₹30 Lakhs in Donations in 60 Days: An NGO Meta Ads Case Study"
excerpt: "How a fundraising campaign produced ₹30,11,507 in Razorpay-verified donations across 11,246 payments at 4.5X ROAS — and why the tracking stack mattered more than the creative."
publishedAt: "2026-08-29"
keywords: ["NGO fundraising Meta ads", "donation campaign India", "nonprofit digital marketing India", "Meta CAPI setup"]
exhibits:
  - src: "/images/case-studies/hhf-5.jpg"
    caption: "Razorpay dashboard — ₹30,11,507 collected from 11,246 captured payments, zero disputes, 96.99% UPI."
  - src: "/images/case-studies/hhf-1.jpg"
    caption: "Meta Ads Manager — reach, frequency, CTR and CPC across the full 60-day campaign period."
  - src: "/images/case-studies/hhf-2.jpg"
    caption: "Campaign breakdown — cost per result falling across 13 structured tests."
  - src: "/images/case-studies/hhf-3.jpg"
    caption: "Advantage+ campaign budget configuration at ₹15,000 daily."

---

Most people assume donation campaigns fail because of budget. Spend more, reach more people, write a more emotional caption, and the money follows.

That assumption is wrong, and it is expensive.

When we started with Helping Hands Foundation, we did not see a budget problem. We saw a cause worth funding and near-zero infrastructure to convert goodwill into actual donations.

## The result, verified

| Metric | Result |
| --- | --- |
| Donations collected | ₹30,11,507 |
| Donor transactions | 11,246 captured |
| ROAS | 4.5X |
| Unique reach | 2,65,400 |
| CTR (all) | 2.8% |
| CPC | ₹12.54 |
| Best cost per purchase | ₹85.48 |
| Payment disputes | ₹0.00 |
| Timeline | 60 days |

Those donation figures come from the Razorpay dashboard, not from Meta's attribution. That distinction matters — platform-reported conversions and money actually in the account are different numbers, and only one of them is real.

## What the audit found

Before writing a single ad, we audited three things.

**The website existed** and told the organisation's story well. But it was built like an about-us page — informational, not transactional. An informational site assumes the visitor already trusts you. A conversion-optimised site assumes they arrived interested but unconvinced, and builds trust on the page before the ask.

**The tracking was incomplete.** Meta Pixel was installed. Conversion API was not. That gap means campaigns optimise on roughly 40–70% of actual conversion data — every budget and creative decision made on a partial picture.

**The prior campaign data confirmed it.** Cost per payment on early campaigns sat at ₹175.61 and ₹193.07.

## What we built, and in what order

**1. The donor journey.** We restructured around one question: what does a first-time visitor need to see, read and feel before entering card details? The answer is not more information — it is a sequence. Credibility signals first, then emotional resonance, then a frictionless ask. We shortened the form and made the CTA impossible to miss.

This came before any ad spend. Sending paid traffic to a poorly converting page is not a traffic problem; it is a funnel problem that advertising makes more expensive.

**2. Pixel plus Conversion API.** Full dual tracking, server-side alongside browser-side, with custom events on every meaningful donor action — page visit, donation initiated, completed, thank-you view.

Nobody posts screenshots of their CAPI event configuration. It is unglamorous work. It is also the foundation every other optimisation sits on.

**3. Creative built on specificity.** Donation campaigns are not e-commerce. You are asking someone to part with money for nothing tangible to themselves. Generic appeals create sympathy but not urgency. Specific stories, specific numbers, specific outcomes create the sense that this donation, right now, does something real.

## How the cost per result actually fell

Read the campaign sequence:

| Campaign | Results | Cost per result | Note |
| --- | --- | --- | --- |
| A | 86 | ₹175.61 | Early baseline |
| B | 43 | ₹193.07 | Audience test |
| C | 25 | ₹242.34 | Creative test |
| D | 22 | ₹85.48 | Scaled winner |
| E | 10 | ₹158.50 | Broad, no audience |

Campaign C looks like a failure at ₹242.34. It was not. It was the test that identified what campaign D then scaled at less than half the original cost.

That improvement is not primarily creative. It is an algorithm trained on clean CAPI data finding the donor cohort earlier tests had mapped.

## Budget architecture

We ran Advantage+ campaign budget optimisation at ₹15,000 daily, Highest Volume bid strategy. Within the primary campaign, one ad absorbed roughly 90% of budget — ₹23,611.74 — because it outperformed the other three on every metric. The rest received ₹1,459.30, ₹639.17 and ₹541.87.

That is CBO working correctly. You do not manually shift budget to the winner. You structure the campaign so the algorithm identifies and rewards it.

## The number that told us who the donors were

**96.99% paid via UPI.**

That is not just a payment statistic. It describes the audience precisely: mobile-first, deciding quickly, unwilling to tolerate friction. Every creative and landing page decision followed from it — fast loading, UPI-first checkout, minimal steps.

And **zero disputes across 11,246 transactions**, with a single ₹40 refund. Against typical 2–5% refund rates in performance campaigns, that is as clean as it gets. It means the donor journey was clear enough that nobody felt misled at any point.

## What this campaign taught us

Donors are not a different species from customers. Same wiring — trust before transacting, specificity before committing, minimal friction between intent and action. What differs is the emotional register: not desire or status, but empathy and moral identity.

And attribution matters more in nonprofit than in e-commerce. When an NGO makes the case to its board that digital marketing deserves investment, they need clean data. Pixel-only tracking that misses 40% of conversions does not just hurt optimisation — it undermines institutional confidence in the entire channel.

The complete case study with dashboard screenshots is [here](/case-studies/helping-hands-foundation).
