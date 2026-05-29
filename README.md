# Debra Robinson — The Full Estate

A two-part site built by **Number One Son Software Development** (Roger Grubb) for
**Debra Robinson**, REALTOR® (CA DRE #01704867, SRES®) & 30-year estate liquidator, East Bay CA.

## Two routes
- **`/` — the pitch.** A teach-then-sell presentation: how buyers, sellers, and AI
  assistants find a Realtor in 2026, what a real Realtor website requires, the AI-search
  opportunity, a reveal of the live site, and a one-time **$1,000** offer (no monthly fees).
- **`/preview` — the product.** Debra's actual customer-facing "Full Estate" website
  (revealed from the pitch after the value is established).

## Structure
```
public/
  index.html        → the pitch presentation
  pitch.css, pitch.js
  config.js          → shared Supabase config (publishable key; insert-only)
  robots.txt, sitemap.xml
  preview/           → the customer-facing realtor site
    index.html, styles.css, main.js, config.js
vercel.json          → static hosting (serves /public, cleanUrls)
pitch/               → leave-behind sales pitch (PDF + DOCX)
docs/                → full Growth Proposal (PDF + DOCX)
```

## Lead capture
Both the pitch CTA and the realtor form insert into the `debra_leads` table in Supabase
(project `nag-platform`), RLS = anonymous INSERT only. The pitch "Yes" button logs an
acceptance (`source: pitch-accept`) and opens a prefilled email to Roger.

## Business model
One-time **$1,000** flat fee: build + AI/search integration + Google Business Profile +
schema + lead system + analytics + deployment + handoff. No retainers, no monthly fees.

## Deploy
```bash
vercel deploy --prod   # static; serves /public
```
Live: https://debra-robinson-realty.vercel.app  (pitch) · /preview (site)
