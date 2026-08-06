# API

All endpoints return:

```json
{
  "success": true,
  "message": "Human-readable message",
  "data": {},
  "errors": []
}
```

Implemented starter endpoints:

- `GET /api/v1/public/settings`
- `GET /api/v1/public/courses`
- `GET /api/v1/public/courses/{slug}`
- `GET /api/v1/public/services`
- `GET /api/v1/public/resources`
- `POST /api/v1/public/enquiries`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/logout`
- `GET /api/v1/auth/me`
- `GET /api/v1/admin/analytics`

Planned endpoints:

- Admin CRUD for courses, technologies, learning paths, instructors, mentors, services, projects, case studies, testimonials, FAQs, articles, resources, media, menus, homepage sections, settings, and SEO metadata.
- CSV export for enquiries.
- Password reset and CSRF token endpoints.
