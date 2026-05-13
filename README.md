# AI Spend Audit

AI Spend Audit is a SaaS MVP that helps teams analyze and optimize their AI tool spending across platforms like ChatGPT, Claude, Cursor, GitHub Copilot, and Gemini.

## Features

- AI spend audit form
- Personalized optimization recommendations
- Monthly and annual savings estimates
- AI-generated summaries
- Persistent form state
- Shareable public audit URLs
- Lead capture form
- Supabase backend integration
- Automated testing with Vitest
- CI pipeline with GitHub Actions

## Tech Stack

- Next.js 16
- TypeScript
- Tailwind CSS
- shadcn/ui
- Supabase
- Vitest

## Setup

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Run tests:

```bash
npm test
```

## Environment Variables

Create `.env.local`

```env
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
```

## Deployment

Recommended deployment platform:

- Vercel

## Author

Venky Jada