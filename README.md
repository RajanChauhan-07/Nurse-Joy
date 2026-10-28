# Nurse Joy - Hospital Records Management System

A full-stack hospital management monorepo for patient admissions, physician shift scheduling, and clinical records.

## Project Structure

```
Nurse-Joy/
├── frontend/               # Next.js 16 (App Router), Tailwind CSS v4, TypeScript, shadcn UI
│   ├── public/             # Static public assets (e.g. nurse-joy-greeting.jpeg)
│   ├── src/
│   │   ├── app/            # App routes (/ for signup, /login, /dashboard)
│   │   ├── assets/         # Bundled image assets
│   │   ├── components/ui/  # Reusable shadcn UI components & tables
│   │   └── lib/            # Utilities (cn helper)
│   ├── components.json     # shadcn configuration
│   ├── next.config.mjs     # Next.js static export & GitHub Pages routing
│   └── package.json
│
├── backend/                # Express & TypeScript REST API
│   ├── src/
│   │   ├── controllers/    # Patients & Doctors request handlers
│   │   ├── models/         # TypeScript interfaces & DTOs
│   │   ├── routes/         # REST API routes (/api/patients, /api/doctors)
│   │   ├── middleware/     # Error handling middleware
│   │   └── index.ts        # Server entrypoint
│   ├── .env.example
│   └── package.json
│
├── database/               # SQL schema definitions & seed fixtures
│   ├── schema.sql          # Doctors & Patients table definitions with indexes
│   ├── seed.sql            # Initial sample clinical data
│   └── README.md
│
├── .github/workflows/      # Automated GitHub Pages CI/CD deployment
└── package.json            # Monorepo root scripts & workspace configuration
```

## Quick Start

### 1. Frontend

```bash
cd frontend
npm install
npm run dev
# Running on http://localhost:3000
```

From root:
```bash
npm run dev
```

### 2. Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
# Running on http://localhost:5000
```

### 3. Database

```bash
cd database
# Run with PostgreSQL
psql -d nurse_joy -f schema.sql
psql -d nurse_joy -f seed.sql
```
