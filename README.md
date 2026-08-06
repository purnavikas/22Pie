# 22Pie Website

Production-shaped website starter for 22Pie, built for static frontend hosting on Hostinger plus a PHP/MySQL API.

## Structure

- `frontend/` - Next.js App Router site configured for static export.
- `backend/` - PHP REST API intended to be copied to `public_html/api`.
- `database/` - MySQL schema, migrations, and seed data.
- `deployment/` - Hostinger deployment assets and checklist.
- `docs/` - Architecture, API, admin, content, and security notes.

## Local Frontend

Recommended runtime:

- Node.js `22.13.0` or newer
- npm `10` or newer

Fresh clone setup:

```bash
git clone https://github.com/veeraphani1322-syndicate/22Pie.git
cd 22Pie
npm install
npm run dev
```

Then open the local URL printed by Next.js, usually `http://localhost:3000`.

## Static Build

```bash
npm run build
```

The exported frontend is generated in `frontend/out` and can be copied to Hostinger `public_html`.

## What Is Included

The repository includes all source code, generated website images, PHP API files, SQL schema, docs, deployment files, `package.json`, and `package-lock.json`.

The repository intentionally does not include `node_modules`, `.next`, or `frontend/out`. Those are recreated from the lockfile with `npm install` and `npm run build`.

## Backend Setup

1. Create a MySQL database in Hostinger.
2. Import `database/schema.sql` through phpMyAdmin.
3. Copy `backend/api` to `public_html/api`.
4. Copy `.env.example` to `.env` outside public web access where possible, or configure equivalent Hostinger environment variables.

Never commit production credentials.
