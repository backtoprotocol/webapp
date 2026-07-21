# Back to Protocol

A modern, fully functional website for a health and wellness media company built with Next.js 14, TypeScript, Tailwind CSS, Prisma, and Auth.js.

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database

### Installation

1. Clone the repository and install dependencies:
```bash
npm install
```

2. Set up your environment variables:
```bash
cp .env.example .env
```

Fill in the required values:
- `DATABASE_URL`: Your PostgreSQL connection string
- `NEXTAUTH_SECRET`: Generate with `openssl rand -base64 32`
- `GOOGLE_ID` and `GOOGLE_SECRET`: OAuth credentials from Google Cloud Console
- `RESEND_API_KEY`: Your Resend email API key

3. Set up the database:
```bash
npm run db:push
```

4. Seed the database with sample data:
```bash
npm run db:seed
```

5. Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

## Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Auth.js (NextAuth)
- **Email**: Resend API
- **Icons**: Lucide React

## Project Structure

```
.
├── app/                    # Next.js app router
│   ├── api/               # API routes
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # Reusable components
├── lib/                   # Utilities and helpers
├── prisma/                # Database schema
├── public/                # Static assets
├── scripts/               # Database seed scripts
└── styles/                # Global styles
```

## Key Features

- ✅ Authentication (email/password + Google OAuth)
- ✅ Dynamic article and topic pages
- ✅ Newsletter signup integration
- ✅ Article search and filtering
- ✅ User dashboard for saved articles
- ✅ Responsive design (mobile-first)
- ✅ Medical disclaimer on all articles
- ✅ Contact and about pages

## Environment Variables

See `.env.example` for all required environment variables.

## Deployment

This project is optimized for deployment on Vercel:

```bash
npm run build
npm run start
```

## License

MIT
