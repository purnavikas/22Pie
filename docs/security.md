# Security Notes

- Admin passwords must use `password_hash` and `password_verify`.
- Admin sessions use HttpOnly cookies and session rotation after login.
- The API uses PDO prepared statements and avoids exposing SQL errors.
- Public forms include a honeypot field and server-side validation.
- Production should add IP-based rate limiting, CSRF tokens for authenticated mutations, file MIME validation, and upload execution blocking.
- Never store database credentials in frontend files.
- Never store JWTs in localStorage.
