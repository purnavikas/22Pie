# Hostinger Deployment

1. Create a Hostinger MySQL database and user.
2. Open phpMyAdmin and import `database/schema.sql`.
3. Create the first admin account locally with PHP `password_hash`, then insert the generated hash into `admin_users`.
4. Copy `frontend/out/*` to `public_html`.
5. Copy `backend/api` to `public_html/api`.
6. Copy `deployment/.htaccess` to `public_html/.htaccess`.
7. Configure database and SMTP values as Hostinger environment variables, or place `.env` outside web root when the account allows it.
8. Ensure upload directories under `public_html/api/uploads` are writable and cannot execute PHP.
9. Enable SSL for `22pie.com`.
10. Test:
   - `https://22pie.com`
   - `https://22pie.com/courses/`
   - `https://22pie.com/api/v1/public/settings`
   - a contact enquiry POST
   - admin login after the first admin user exists
11. Remove temporary bootstrap scripts after creating the first admin.
12. Configure backups for the database and uploaded media.
