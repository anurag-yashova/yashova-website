---
title: "An NGO losing donors at the payment screen, not the ask"
subject: "Indian non-profit · donation funnel"
category: "Checkout and tracking"
spend: "Seasonal campaign spend"
publishedAt: "2026-08-20"
verdict: "The story works. The checkout undoes it."
excerpt: "The emotional appeal was strong enough to get the click. Then the donation flow asked for an account, a PAN, and a page reload."
keywords: ["NGO donation page", "nonprofit conversion", "UPI checkout India", "donation funnel audit"]
findings:
  - severity: critical
    title: "Account creation required before donating"
    detail: "A first-time donor moved by a story is asked to create a login. Almost nothing kills a charitable impulse faster than a password field."
  - severity: critical
    title: "UPI buried below card fields"
    detail: "On comparable campaigns we have run, the overwhelming majority of donations come through UPI. Presenting cards first asks a mobile-first audience to work against its own habit."
  - severity: major
    title: "Amount entered manually with no suggested values"
    detail: "An empty amount box makes the donor decide what their compassion is worth, alone, with no anchor. Preset amounts tied to outcomes do that work for them."
  - severity: major
    title: "No visible tracking beyond a basic pixel"
    detail: "No evidence of server-side conversion tracking. Browser-only measurement misses a meaningful share of completed donations, which means the campaign optimises on a partial picture of who actually gives."
  - severity: minor
    title: "80G and registration details three clicks deep"
    detail: "For Indian donors these are trust and tax signals. They belong near the ask, not in the footer of an about page."
---

## What we looked at

A donation campaign running publicly, the page it leads to, and the checkout flow up to the point of payment. We did not complete a transaction.

## Where it goes wrong

The creative is good. It is specific, it names a real outcome, and it earns the click — which is the hard part, and the part most nonprofits get wrong.

Then the donor lands somewhere that behaves like a membership portal.

Create an account. Enter an amount, unaided. Scroll past card fields to find UPI. Reload to a payment gateway that looks unrelated to the organisation they were just reading about.

Each step is small. Together they convert a moved person into an abandoned session.

## Why this is worse for a nonprofit than for a shop

An e-commerce buyer wants the product. They will tolerate friction because there is something waiting on the other side.

A donor gets nothing tangible. The entire transaction is powered by an emotional state that decays by the second. Friction does not delay a donation the way it delays a purchase — it cancels it.

## The tracking point, which matters more than it looks

If the Conversion API is absent, the campaign optimises on incomplete data. On one donation account we worked on, adding server-side tracking alongside the pixel coincided with cost per result falling from ₹175.61 to ₹85.48 across the campaign period.

That improvement was not creative genius. It was the algorithm finally learning from a full picture of who converted.

There is a second reason it matters for nonprofits specifically: when the team goes to its board to argue that digital fundraising deserves next year's budget, attribution gaps do not just cost efficiency. They cost institutional confidence in the whole channel.

## What we would change first

1. Remove account creation entirely. Name, phone, amount, pay.
2. Put UPI first and make it the default.
3. Offer three preset amounts tied to concrete outcomes.
4. Move registration number and 80G status next to the donate button.
5. Implement server-side conversion tracking before the next campaign, not after.

## Caveat

This is an outside view. We cannot see their conversion rate or their donor retention, and there may be compliance reasons behind some of these choices that are not visible from the front end.

We have run this exact rebuild before, and the [full case study is here](/case-studies/helping-hands-foundation) — ₹30,11,507 raised in 60 days, verified through the payment gateway.
