# 22Pie Website

Production-shaped website starter for 22Pie, built for static frontend hosting on Hostinger plus a PHP/MySQL API.

## Structure

- `frontend/` - Next.js App Router site configured for static export.
- `backend/` - PHP REST API intended to be copied to `public_html/api`.
- `database/` - MySQL schema, migrations, and seed data.
- `deployment/` - Hostinger deployment assets and checklist.
- `docs/` - Architecture, API, admin, content, and security notes.

## Local Frontend

```bash
cd frontend
npm install
npm run dev
```

## Static Build

```bash
cd frontend
npm run build
```

The exported frontend is generated in `frontend/out` and can be copied to Hostinger `public_html`.

## Backend Setup

1. Create a MySQL database in Hostinger.
2. Import `database/schema.sql` through phpMyAdmin.
3. Copy `backend/api` to `public_html/api`.
4. Copy `.env.example` to `.env` outside public web access where possible, or configure equivalent Hostinger environment variables.

Never commit production credentials.
