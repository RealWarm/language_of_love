# replit.md

## Overview

This is a **Love Language Quiz** web application (사랑의 언어 테스트) built in Korean. Users answer 30 multiple-choice questions to discover their primary love language among five types: Words of Affirmation (인정하는 말), Quality Time (함께하는 시간), Receiving Gifts (선물), Acts of Service (봉사), and Physical Touch (스킨십). The app presents questions with animated transitions, calculates results based on answer frequency, saves results to a database, and displays personalized results with charts and aggregate statistics.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Framework**: React 18 with TypeScript, bundled by Vite
- **Routing**: Wouter (lightweight client-side router) with three main routes: `/` (Home), `/quiz` (Quiz flow), `/result` (Results page)
- **State Management**: TanStack React Query for server state; local component state via React hooks; quiz answers passed between pages via `localStorage`
- **UI Components**: shadcn/ui component library (new-york style) built on Radix UI primitives with Tailwind CSS
- **Styling**: Tailwind CSS with CSS variables for theming; custom warm/love-themed color palette (pink primary, purple accent); custom fonts (Outfit for display, Plus Jakarta Sans for body)
- **Animations**: Framer Motion for page transitions, question transitions, and option card interactions
- **Charts**: Recharts for visualizing result breakdowns as bar charts
- **Effects**: canvas-confetti for celebration effects on the results page
- **Path aliases**: `@/` maps to `client/src/`, `@shared/` maps to `shared/`

### Backend
- **Framework**: Express.js running on Node.js with TypeScript (executed via tsx)
- **API Design**: Two REST endpoints defined in `shared/routes.ts`:
  - `POST /api/quiz/submit` — saves quiz results (resultType + answers array)
  - `GET /api/quiz/stats` — returns aggregate counts grouped by result type
- **Validation**: Zod schemas for request validation, shared between client and server via `shared/` directory
- **Development**: Vite dev server middleware integrated with Express for HMR during development
- **Production**: Client built to `dist/public`, server bundled via esbuild to `dist/index.cjs`

### Shared Code (`shared/` directory)
- **schema.ts**: Drizzle ORM table definitions and Zod insert schemas (single `quiz_results` table)
- **routes.ts**: API route definitions with method, path, input schema, and response schemas — used by both client and server
- **questions.ts**: Type mappings and detailed Korean descriptions for each love language type

### Database
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Database**: PostgreSQL, connected via `DATABASE_URL` environment variable
- **Connection**: `pg` Pool from `node-postgres`
- **Schema**: Single table `quiz_results` with columns:
  - `id` (serial primary key)
  - `result_type` (text — A/B/C/D/E)
  - `answers` (jsonb — array of all user answers)
- **Migrations**: Managed via `drizzle-kit push` command (`npm run db:push`)

### Storage Layer
- **Pattern**: Repository/Storage pattern — `IStorage` interface with `DatabaseStorage` implementation in `server/storage.ts`
- **Methods**: `createQuizResult()` and `getQuizStats()` (with SQL count aggregation)

### Build System
- **Client**: Vite builds to `dist/public`
- **Server**: esbuild bundles server code to `dist/index.cjs`, selectively bundling key dependencies (listed in allowlist) while externalizing others
- **Build script**: Custom `script/build.ts` orchestrates both builds

## External Dependencies

### Database
- **PostgreSQL** — Required. Connected via `DATABASE_URL` environment variable. Must be provisioned before running.

### Key NPM Packages
- **drizzle-orm** + **drizzle-kit** — ORM and migration tooling for PostgreSQL
- **express** — HTTP server framework
- **@tanstack/react-query** — Async server state management
- **framer-motion** — Animation library for React
- **recharts** — Chart visualization library
- **canvas-confetti** — Confetti celebration effects
- **zod** + **drizzle-zod** — Schema validation and type inference
- **wouter** — Lightweight React router
- **shadcn/ui** components (Radix UI primitives) — Extensive UI component library

### Replit-Specific
- **@replit/vite-plugin-runtime-error-modal** — Runtime error overlay in development
- **@replit/vite-plugin-cartographer** — Dev tooling (dev only)
- **@replit/vite-plugin-dev-banner** — Dev banner (dev only)

### Fonts (External CDN)
- Google Fonts: Outfit, Plus Jakarta Sans, DM Sans, Fira Code, Geist Mono, Architects Daughter