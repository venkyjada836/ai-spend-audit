# Architecture Overview

## Frontend

Built with Next.js App Router and Tailwind CSS.

### Main Pages

- `/audit`
  - Main audit form
  - Savings analysis
  - AI summary generation

- `/results/[id]`
  - Public shareable audit result page
  - Lead capture form

## Backend

Supabase is used for:
- Audit persistence
- Lead storage
- Shareable result retrieval

## Database Tables

### audits

Stores:
- tool
- spend
- seats
- savings
- recommendation

### leads

Stores:
- email
- company
- role

## Testing

Vitest validates:
- audit savings calculations
- recommendation logic

## CI/CD

GitHub Actions pipeline:
- installs dependencies
- runs tests automatically

## Deployment

Hosted on Vercel.