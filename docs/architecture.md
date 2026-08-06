# Architecture

22Pie is separated into a static frontend and a PHP API:

- The frontend uses Next.js App Router with `output: "export"` so Hostinger does not need Node.js in production.
- Public pages are pre-rendered and can fetch dynamic content from `/api/v1/public/*`.
- The backend is a PHP REST API using PDO and MySQL prepared statements.
- Admin features are exposed through `/api/v1/admin/*` and require a secure PHP session.

The static route strategy uses explicit pages for core routes and generated static params for known detail URLs. New dynamic detail pages can either be generated during build from exported API data or rendered by a generic static detail shell that fetches by slug at runtime.
