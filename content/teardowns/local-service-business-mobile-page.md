---
title: "A local service business winning the click and losing the phone"
subject: "Delhi NCR local service brand · Meta + Google"
category: "Mobile experience"
spend: "₹75,000 / month"
publishedAt: "2026-09-17"
verdict: "Nine seconds to first paint on 4G. Nothing else matters until that changes."
excerpt: "A teardown of what a mid-range Android phone on a normal connection actually experiences after clicking a local business ad."
keywords: ["local business marketing India", "mobile page speed", "Google Business Profile", "local lead generation Delhi NCR"]
findings:
  - severity: critical
    title: "Nine seconds to first meaningful paint on 4G"
    detail: "Tested on a mid-range Android over a normal mobile connection, not on office wifi with a flagship phone. A 3.4MB uncompressed hero image is the main cause. Most paid clicks are being billed for visitors who never see the page."
  - severity: critical
    title: "Phone number is an image, not a link"
    detail: "The number appears inside a banner graphic. On mobile it cannot be tapped, cannot be copied, and is invisible to screen readers and to Google. For a local service business, tap-to-call is the primary conversion."
  - severity: major
    title: "Google Business Profile hours contradict the website"
    detail: "The profile lists Sunday closed; the site advertises Sunday service. Whichever is wrong, some customers are being turned away and some are arriving to a closed door. Both damage reviews."
  - severity: major
    title: "Two chat widgets loading simultaneously"
    detail: "A WhatsApp widget and a separate live chat tool, both loading before content, both covering the call-to-action on a small screen."
  - severity: minor
    title: "No service area or landmark on the page"
    detail: "For local intent, proximity is the deciding factor. The page names the city but not the sector, landmark or service radius."
---

## The test that matters

Open the ad on a mid-range Android phone, on mobile data, away from your office wifi. That is the actual experience you are buying.

Most businesses test their own site on a fast laptop over broadband and conclude it is fine. Their customers are on a three-year-old phone with two bars, and the difference is not marginal.

## Nine seconds

At nine seconds to first meaningful paint, a large share of visitors are gone before anything appears. They do not bounce because they disliked the offer. They bounce because there was nothing to dislike yet.

You paid for every one of those clicks. The ad worked perfectly. The money evaporated in the gap.

The cause here is ordinary: one very large uncompressed image, plus scripts loading ahead of content. Both are fixable in an afternoon by someone who knows what to look for, and neither requires a redesign.

## The phone number problem

This one is quietly severe for a local business.

When the number lives inside an image, a customer on a phone cannot tap it. They must memorise it, leave the page, open the dialler and type it. A meaningful proportion simply will not.

It is also invisible to Google, which uses consistent name, address and phone data across your site and your Business Profile as a local ranking signal.

Text, wrapped in a `tel:` link, above the fold. That is the entire fix.

## Consistency across the profile

Local customers check three things before calling: is it near me, is it open, and do other people rate it.

If your Business Profile and your website disagree on hours, you fail the second test for some customers and generate a bad experience for others. Reviews follow.

This costs nothing to fix and is checked by nobody.

## What we would change first

1. Compress the hero image and defer non-essential scripts. Target under two and a half seconds on 4G.
2. Make the phone number real text in a tap-to-call link, above the fold.
3. Reconcile hours, address and phone across the website and Google Business Profile.
4. Remove one of the two chat widgets.
5. Add the sector, a landmark and the service radius to the page.

Nothing on that list requires more budget. Three of the five are free.

## Caveat

We tested from one device on one connection at one moment. Speed varies. But a 3.4MB image is 3.4MB for everybody, and a number inside a graphic is untappable for everybody.

Run the same check on your own site with our [free growth audit](/ai-audit) — it measures load and flags the mechanical failures automatically.
