# Debra Robinson — The Full Estate

Custom personalized website + digital growth engine for **Debra Robinson**,
REALTOR® (CA DRE #01704867, SRES®) and 30-year estate liquidator serving the East Bay.

Built by **Number One Son Software Development** (Roger Grubb).

## What this is
A fast, mobile-first, **AI-search-ready** marketing site built around Debra's
one-of-a-kind "Full Estate" offering — she sells the *contents* and the *house*.

## Structure
```
public/            → the website (static, deploy-ready)
  index.html       → the page
  styles.css       → styles
  config.js        → site config (Supabase URL + publishable key)
  main.js          → lead-form submit logic (→ Supabase)
  robots.txt, sitemap.xml
vercel.json        → static hosting config (serves /public)
pitch/             → leave-behind sales pitch (PDF + DOCX)
docs/              → full Growth Proposal (PDF + DOCX)
```

## Lead capture
The consultation form inserts into the `debra_leads` table in Supabase
(project `nag-platform`). Row Level Security allows **anonymous INSERT only** —
the publishable key in `config.js` is safe to expose; it cannot read data.
Leads are read by Roger via the Supabase service role / dashboard.

If the database call ever fails, the form gracefully falls back to opening a
prefilled email to debrashouse@gmail.com so no lead is lost.

## Built for Google + AI search (GEO)
- schema.org `RealEstateAgent` + `FAQPage` structured data
- semantic headings, plain-language answers, fast mobile load
- service-area coverage and credibility markers in markup

## Run locally
```bash
cd public && python3 -m http.server 8080   # then open http://localhost:8080
```

## Deploy (Vercel)
```bash
vercel deploy            # from repo root (needs a Vercel login/token)
```
No custom domain selected yet — deploys to a *.vercel.app preview URL.
