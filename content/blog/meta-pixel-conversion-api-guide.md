---
title: "Meta Pixel and Conversion API Setup: The Complete Guide"
excerpt: "Why browser-only Pixel tracking is costing you money, what Conversion API actually does, the events worth configuring, and how to verify the whole stack is working."
publishedAt: "2026-09-23"
keywords: ["Meta Pixel setup", "Conversion API setup", "Facebook CAPI India", "Meta pixel not tracking"]
---

This is the single highest-leverage fix available in most Indian ad accounts, and it is also the one nobody wants to do because there are no screenshots to show for it.

## What the Pixel actually is

A piece of JavaScript that fires from the visitor's browser when something happens — page loaded, form submitted, purchase completed — and reports it to Meta.

Meta uses those reports to learn who converts and find more people like them. Everything about campaign optimisation depends on that feedback loop.

## Why the browser-side Pixel is not enough

Three things break it:

**iOS privacy restrictions.** App Tracking Transparency limits what can be attributed for a large share of users.

**Ad blockers and browser protections.** Safari's tracking prevention and standard blockers stop Pixel requests entirely.

**Network failures.** The visitor closes the tab, the connection drops, the script does not fire.

The result is that a meaningful share of real conversions never reach Meta. Estimates vary, but the practical range is 30–60% of conversions missing.

## What Conversion API does differently

CAPI sends conversion data **server to server** — from your website's backend or a tag manager server container directly to Meta — bypassing the browser entirely.

Ad blockers cannot stop it. iOS restrictions do not apply the same way. The tab closing does not matter.

Running both together, with event deduplication so a single conversion is not counted twice, gives the algorithm a materially more complete picture.

## What it is worth in practice

On an NGO donation account with Pixel installed but no CAPI, cost per result sat at ₹175.61. After implementing dual tracking with mapped events, the scaled campaign reached ₹85.48.

Creative improved somewhat. Audience testing helped. But the biggest contributor was that the algorithm stopped optimising on a distorted sample of who actually donated.

## The events worth configuring

Do not track everything. Track the sequence that describes your funnel:

- **PageView** — baseline
- **ViewContent** — reached a key page
- **InitiateCheckout** or form start — declared intent
- **Lead** — form submitted
- **Purchase** — money moved, with value and currency

The value parameter matters. Without it, Meta optimises for conversion count and will happily find you many small conversions instead of fewer large ones.

## Setup paths, briefly

**Partner integrations** (Shopify, WooCommerce, WordPress plugins) — easiest, least flexible.

**Google Tag Manager server-side container** — the standard for most businesses. Requires a server container, typically on Google Cloud.

**Direct API implementation** — a developer sends events from your backend. Most control, most work, and the most reliable for custom checkouts.

Whichever path, you need event deduplication configured, or a single conversion reported by both Pixel and CAPI gets double-counted and your data becomes worse rather than better.

## How to verify it is actually working

1. **Events Manager → Test Events.** Fire a real conversion and confirm it appears.
2. **Check the Event Match Quality score.** Below about 5.0 means you are sending insufficient customer parameters — add email, phone, and external ID where you have consent.
3. **Look for deduplication warnings.** If Meta reports duplicate events, your event IDs are not matching.
4. **Compare against your payment gateway.** This is the real test. If Razorpay says 11,246 payments and Meta says 6,000, you have a tracking gap, not a campaign problem.

That last check is the one most people never run, and it is the only one that reflects reality.

## The most common mistakes

- Installing CAPI without deduplication, then trusting inflated numbers
- Tracking form *views* as conversions instead of submissions
- Omitting the value parameter, so all purchases look equal
- Never sending offline conversions back, so the platform never learns which leads actually became customers
- Assuming the plugin worked and never testing it

## The order of work

Get tracking right before you spend meaningfully. Sending traffic through a broken measurement layer means every optimisation decision after that point inherits the error — and you will spend months adjusting creative to fix a data problem.

If you want the whole stack checked, that is where our [free growth audit](/ai-audit) begins.
