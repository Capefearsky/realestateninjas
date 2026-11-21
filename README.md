# Ninjas platform

One Next.js app that runs **realestateninjas.com** and **homeliquidation.com** for Tony Brooks Ward Jr's brokerage.

- `app/(ninjas)` – Real Estate Ninjas pages. `app/hl` – Home Liquidation pages (homeliquidation.com is routed here by `middleware.js`).
- `app/api/lead` – lead intake: same-origin check, bot trap, Cloudflare Turnstile, validation, rate limit, database, emails.
- `app/admin` – Ninjas HQ, Tony's private dashboard (password + two-step login).
- `lib/questions.js` – the only questions the public forms ask. Keep them non-confidential (no price, timeline, finances or motivation) and fair-housing safe.

## Environment variables (Vercel → Settings → Environment Variables)

| Name | What it is |
| --- | --- |
| `DATABASE_URL` | Postgres connection string (added automatically by the Neon integration) |
| `SESSION_SECRET` | 32+ random characters; signs admin sessions and encrypts the two-step key |
| `ADMIN_PASSWORD` | Tony's admin password (12+ characters) |
| `RESEND_API_KEY` | Email sending |
| `EMAIL_FROM_NINJAS` | e.g. `Real Estate Ninjas <hello@realestateninjas.com>` |
| `EMAIL_FROM_HL` | e.g. `Home Liquidation <hello@homeliquidation.com>` |
| `NOTIFY_EMAIL` | where new-lead alerts go |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile bot check |
| `SITE_LIVE` | set to `true` at launch to let search engines index the sites |

Until the database and email are connected, leads are forwarded to the existing Formspree forms.
