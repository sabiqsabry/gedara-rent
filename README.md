# GedaraRent

A full-stack property rental marketplace built with Next.js 14+, TypeScript, Prisma, and PostgreSQL.

## Features

- 🔐 Authentication (Email/Password, Google, GitHub)
- 🏠 Multi-step listing creation
- 🔍 Advanced search and filtering
- 📅 Booking system with Stripe payments
- ⭐ Reviews and ratings
- 💬 Messaging system
- 📊 User dashboards (Guest & Host)
- 🗺️ Interactive maps with Leaflet

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Shadcn/ui
- **Database:** PostgreSQL (Supabase) + Prisma ORM
- **Authentication:** NextAuth.js
- **Payments:** Stripe
- **Images:** Cloudinary
- **Maps:** Leaflet
- **State Management:** Zustand
- **Forms:** React Hook Form + Zod

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database (or Supabase account)
- Cloudinary account
- Stripe account (for payments)
- Google/GitHub OAuth apps (optional)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd gedarent
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Fill in your environment variables in `.env.local`:
- `DATABASE_URL` - Your PostgreSQL connection string
- `NEXTAUTH_SECRET` - Generate with `openssl rand -base64 32`
- `NEXTAUTH_URL` - Your app URL (http://localhost:3000 for dev)
- OAuth credentials (Google, GitHub)
- Cloudinary credentials
- Stripe keys

4. Set up the database:
```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database
npm run db:push

# Seed the database
npm run db:seed
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Setup

### Using Supabase

1. Create a new project on [Supabase](https://supabase.com)
2. Go to Settings > Database
3. Copy the connection string
4. Update `DATABASE_URL` in `.env.local`

### Using Local PostgreSQL

1. Install PostgreSQL
2. Create a database:
```sql
CREATE DATABASE gedarent;
```
3. Update `DATABASE_URL` in `.env.local`:
```
DATABASE_URL=postgresql://user:password@localhost:5432/gedarent
```

## Project Structure

```
gedarent/
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.ts            # Seed script
├── src/
│   ├── app/               # Next.js app router pages
│   ├── components/        # React components
│   ├── lib/               # Utilities and configs
│   ├── hooks/             # Custom React hooks
│   ├── stores/            # Zustand stores
│   ├── types/             # TypeScript types
│   ├── constants/         # Constants and data
│   └── actions/           # Server actions
└── public/                # Static assets
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma Client
- `npm run db:push` - Push schema changes to database
- `npm run db:migrate` - Create and run migrations
- `npm run db:studio` - Open Prisma Studio
- `npm run db:seed` - Seed the database

## Environment Variables

See `.env.example` for all required environment variables.

## License

This is a portfolio project for demonstration purposes.
