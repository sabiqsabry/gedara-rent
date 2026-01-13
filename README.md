# 🏠 GedaraRent

> **GedaraRent** (Gedara meaning "house/home" in Sinhala) is a full-stack property rental marketplace platform inspired by Airbnb. Built as a portfolio project to showcase modern web development skills, it demonstrates proficiency in Next.js, TypeScript, Prisma, authentication systems, payment processing, and real-time features.

[![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-7.0-2D3748?style=flat-square&logo=prisma)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Database Setup](#-database-setup)
- [Development Features](#-development-features)
- [API Documentation](#-api-documentation)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### 🔐 Authentication & Authorization
- **Multiple Auth Methods**: Email/password, Google OAuth, GitHub OAuth
- **Role-Based Access Control**: Guest, Host, and Admin roles
- **Session Management**: Secure JWT-based sessions via NextAuth.js
- **Protected Routes**: Middleware-based route protection

### 🏠 Listing Management
- **Multi-Step Creation**: Intuitive 9-step listing creation wizard
  - Category selection with visual cards
  - Interactive location picker with map integration
  - Property details (type, capacity, amenities)
  - Photo upload with drag-and-drop (Cloudinary)
  - Pricing configuration
  - House rules setup
  - Preview before publishing
- **Listing Dashboard**: Manage all your listings in one place
- **Rich Listings**: Detailed property pages with image galleries, amenities, and reviews

### 🔍 Search & Discovery
- **Advanced Search**: Location, dates, guest count filtering
- **Smart Filters**: Price range, property type, amenities, instant book
- **Multiple Views**: Grid, list, and map view toggle
- **Category Browsing**: Explore by Beach, Modern, Countryside, Tropical, Heritage, and more
- **Featured Listings**: Curated selection of top properties

### 📅 Booking System
- **Availability Calendar**: Real-time availability checking
- **Date Selection**: Flexible check-in/check-out date picker
- **Price Calculation**: Automatic breakdown (nightly rate + cleaning fee + service fee)
- **Stripe Integration**: Secure payment processing
- **Booking Management**: View and manage reservations from dashboard

### ⭐ Reviews & Ratings
- **5-Star Rating System**: Overall and category-specific ratings
  - Cleanliness
  - Accuracy
  - Communication
  - Location
  - Check-in
  - Value
- **Review Display**: Beautiful review cards with host responses
- **Verified Guests**: Badge system for verified bookings

### 💬 Messaging System
- **Real-Time Conversations**: Thread-based messaging between hosts and guests
- **Message Notifications**: Stay updated on new messages
- **Conversation History**: Full message history per listing inquiry

### 📊 User Dashboards

#### Guest Dashboard
- **Trips**: View upcoming and past bookings
- **Wishlists**: Save favorite listings
- **Reviews**: Manage reviews given
- **Settings**: Update profile and preferences

#### Host Dashboard
- **Listings Management**: Create, edit, pause, and delete listings
- **Reservations Calendar**: Visual calendar view of bookings
- **Earnings**: Track revenue and payouts
- **Performance Metrics**: View listing statistics

### 🎨 UI/UX Features
- **Responsive Design**: Mobile-first, works on all devices
- **Modern UI**: Built with Shadcn/ui components
- **Smooth Animations**: Framer Motion for delightful interactions
- **Loading States**: Skeleton loaders and spinners
- **Error Handling**: Graceful error boundaries and toast notifications
- **SEO Optimized**: Dynamic meta tags, sitemap, and robots.txt

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **Next.js 14+** | React framework with App Router, SSR, and API routes |
| **TypeScript** | Type safety and enhanced developer experience |
| **Tailwind CSS** | Utility-first CSS framework |
| **Shadcn/ui** | Pre-built accessible component library |
| **Zustand** | Lightweight state management |
| **React Hook Form** | Performant form handling |
| **Zod** | Schema validation |
| **Framer Motion** | Animation library |
| **Lucide React** | Icon library |

### Backend
| Technology | Purpose |
|------------|---------|
| **Next.js API Routes** | RESTful API endpoints |
| **Prisma ORM** | Type-safe database access |
| **NextAuth.js** | Authentication framework |
| **Server Actions** | Server-side mutations |

### Database & Services
| Technology | Purpose |
|------------|---------|
| **PostgreSQL** | Primary database (via Supabase) |
| **Cloudinary** | Image upload and CDN |
| **Stripe** | Payment processing |
| **Leaflet** | Interactive maps |

### Development Tools
- **ESLint** - Code linting
- **TypeScript** - Static type checking
- **Prisma Studio** - Database GUI
- **Git** - Version control

---

## 📁 Project Structure

```
gedarent/
├── prisma/
│   ├── schema.prisma          # Database schema definition
│   └── seed.ts                # Database seeding script
│
├── public/                    # Static assets
│   └── placeholder.jpg
│
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── (auth)/           # Authentication pages
│   │   ├── (main)/           # Public pages
│   │   ├── api/              # API routes
│   │   ├── dashboard/        # Dashboard pages
│   │   ├── become-a-host/    # Listing creation flow
│   │   └── layout.tsx       # Root layout
│   │
│   ├── components/            # React components
│   │   ├── ui/               # Shadcn/ui components
│   │   ├── layout/           # Layout components
│   │   ├── listings/         # Listing-related components
│   │   ├── forms/            # Form components
│   │   ├── search/           # Search components
│   │   ├── dashboard/        # Dashboard components
│   │   └── shared/           # Shared components
│   │
│   ├── lib/                  # Utilities and configurations
│   │   ├── prisma.ts         # Prisma client
│   │   ├── auth.ts           # NextAuth configuration
│   │   ├── stripe.ts         # Stripe client
│   │   ├── cloudinary.ts     # Cloudinary config
│   │   └── utils.ts          # Helper functions
│   │
│   ├── hooks/                # Custom React hooks
│   ├── stores/               # Zustand stores
│   ├── types/                # TypeScript type definitions
│   ├── constants/            # Constants and data
│   └── actions/              # Server actions
│
├── .env.example              # Environment variables template
├── .gitignore                # Git ignore rules
├── next.config.ts            # Next.js configuration
├── tailwind.config.ts        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Dependencies and scripts
```

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **npm** or **yarn** package manager
- **PostgreSQL** database (or Supabase account)
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sabiqsabry/gedara-rent.git
   cd gedara-rent
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and fill in your configuration (see [Environment Variables](#-environment-variables))

4. **Set up the database**
   ```bash
   # Generate Prisma Client
   npm run db:generate
   
   # Push schema to database
   npm run db:push
   
   # Seed the database with sample data
   npm run db:seed
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🔧 Environment Variables

Create a `.env.local` file in the root directory with the following variables:

### Required Variables

```env
# Database
DATABASE_URL=postgresql://user:password@host:5432/gedarent

# NextAuth
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000
```

### Optional Variables

```env
# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=GedaraRent

# OAuth Providers
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# Cloudinary (for image uploads)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Stripe (for payments)
STRIPE_SECRET_KEY=your-stripe-secret-key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
STRIPE_WEBHOOK_SECRET=your-webhook-secret

# Development Features
NEXT_PUBLIC_ENABLE_AUTH_BYPASS=true  # Enable testing bypass buttons
```

### Generating Secrets

**NextAuth Secret:**
```bash
openssl rand -base64 32
```

---

## 🗄 Database Setup

### Option 1: Supabase (Recommended)

1. Create a free account at [Supabase](https://supabase.com)
2. Create a new project
3. Go to **Settings** → **Database**
4. Copy the connection string
5. Update `DATABASE_URL` in `.env.local`

### Option 2: Local PostgreSQL

1. Install PostgreSQL on your machine
2. Create a new database:
   ```sql
   CREATE DATABASE gedarent;
   ```
3. Update `DATABASE_URL` in `.env.local`:
   ```
   DATABASE_URL=postgresql://username:password@localhost:5432/gedarent
   ```

### Database Schema

The Prisma schema includes the following models:
- `User` - User accounts with roles
- `Account` - OAuth account linking
- `Listing` - Property listings
- `ListingImage` - Listing photos
- `Amenity` - Property amenities
- `Reservation` - Booking records
- `Payment` - Payment transactions
- `Review` - User reviews
- `Favorite` - Saved listings
- `Conversation` - Message threads
- `Message` - Individual messages

---

## 🧪 Development Features

### Testing Bypass Buttons

For development and testing purposes, the app includes bypass features:

#### Authentication Bypass
- **Enable**: Set `NEXT_PUBLIC_ENABLE_AUTH_BYPASS=true` in `.env.local`
- **Location**: Yellow button appears in bottom-right corner
- **Function**: Allows testing without logging in (dev mode only)

#### Payment Bypass
- **Enable**: Automatically enabled when auth bypass is active
- **Location**: Appears on booking/reservation widget
- **Function**: Creates reservations without actual Stripe payments

**⚠️ Important**: These features are automatically disabled in production builds.

---

## 📡 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/[...nextauth]` | NextAuth.js handler |
| POST | `/api/auth/register` | User registration |

### Listings Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/listings` | Get all listings (with filters) |
| POST | `/api/listings` | Create new listing |
| GET | `/api/listings/[slug]` | Get single listing |
| PATCH | `/api/listings/[slug]` | Update listing |
| DELETE | `/api/listings/[slug]` | Delete listing |
| GET | `/api/listings/user` | Get user's listings |

### Reservations Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/reservations` | Get user's reservations |
| POST | `/api/reservations` | Create reservation |
| GET | `/api/reservations/[id]` | Get reservation details |
| PATCH | `/api/reservations/[id]` | Update reservation |
| DELETE | `/api/reservations/[id]` | Cancel reservation |
| GET | `/api/reservations/host` | Get host's reservations |

### Reviews Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/reviews` | Create review |
| GET | `/api/reviews/listing/[id]` | Get listing reviews |

### Favorites Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/favorites` | Get user's favorites |
| POST | `/api/favorites/[listingId]` | Add to favorites |
| DELETE | `/api/favorites/[listingId]` | Remove from favorites |

### Messaging Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/conversations` | Get conversations |
| POST | `/api/conversations` | Create conversation |
| GET | `/api/conversations/[id]` | Get conversation messages |
| POST | `/api/messages` | Send message |

### Payment Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/payments/create-intent` | Create Stripe payment intent |
| POST | `/api/payments/bypass` | Development payment bypass |

---

## 📦 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run db:generate` | Generate Prisma Client |
| `npm run db:push` | Push schema changes to database |
| `npm run db:migrate` | Create and run migrations |
| `npm run db:studio` | Open Prisma Studio (database GUI) |
| `npm run db:seed` | Seed database with sample data |

---

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

### Manual Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm run start
   ```

### Environment Variables for Production

Make sure to set all required environment variables in your hosting platform:
- `DATABASE_URL`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL` (your production URL)
- OAuth credentials
- Cloudinary credentials
- Stripe keys

**⚠️ Important**: Remove or set `NEXT_PUBLIC_ENABLE_AUTH_BYPASS=false` in production!

---

## 🎯 Key Features Showcase

### Multi-Step Listing Creation
The listing creation process is broken down into 9 intuitive steps:
1. **Category Selection** - Choose from 17+ property categories
2. **Location** - Pin-drop location with map integration
3. **Property Details** - Type, capacity, bedrooms, bathrooms
4. **Amenities** - Select from categorized amenities
5. **Photos** - Upload and organize property images
6. **Description** - Title and detailed description
7. **Pricing** - Set nightly rates and fees
8. **House Rules** - Define property rules
9. **Preview** - Review and publish

### Smart Search & Filtering
- Location-based search with autocomplete
- Date range selection with availability checking
- Guest count filtering
- Price range slider
- Property type filters
- Amenity-based filtering
- Sort by price, rating, or newest

### Booking Flow
1. Select dates on availability calendar
2. Choose guest count
3. View detailed price breakdown
4. Complete payment via Stripe
5. Receive confirmation email
6. Manage booking from dashboard

---

## 🤝 Contributing

This is a portfolio project, but suggestions and feedback are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is created for portfolio demonstration purposes. Feel free to use it as a reference or learning resource.

---

## 👨‍💻 Author

**Sabiq Sabry**

- GitHub: [@sabiqsabry](https://github.com/sabiqsabry)
- Project: [GedaraRent](https://github.com/sabiqsabry/gedara-rent)

---

## 🙏 Acknowledgments

- Inspired by Airbnb's design and functionality
- Built with modern web technologies
- Uses open-source libraries and frameworks
- Special thanks to the Next.js and Prisma communities

---

<div align="center">

**⭐ If you find this project helpful, please give it a star! ⭐**

Made with ❤️ using Next.js, TypeScript, and Prisma

</div>
