<?php

declare(strict_types=1);

session_start([
    'cookie_httponly' => true,
    'cookie_samesite' => 'Lax',
    'cookie_secure' => ($_ENV['SESSION_SECURE'] ?? 'false') === 'true',
]);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: strict-origin-when-cross-origin');

function respond(bool $success, string $message, mixed $data = null, array $errors = [], int $status = 200): never
{
    http_response_code($status);
    echo json_encode([
        'success' => $success,
        'message' => $message,
        'data' => $data,
        'errors' => $errors,
    ], JSON_UNESCAPED_SLASHES);
    exit;
}

function env_value(string $key, ?string $fallback = null): ?string
{
    return $_ENV[$key] ?? getenv($key) ?: $fallback;
}

function db(): PDO
{
    static $pdo = null;

    if ($pdo instanceof PDO) {
        return $pdo;
    }

    $host = env_value('DB_HOST', 'localhost');
    $name = env_value('DB_NAME', '22pie');
    $charset = env_value('DB_CHARSET', 'utf8mb4');
    $dsn = "mysql:host={$host};dbname={$name};charset={$charset}";

    $pdo = new PDO($dsn, (string) env_value('DB_USER'), (string) env_value('DB_PASS'), [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);

    return $pdo;
}

function body(): array
{
    $raw = file_get_contents('php://input') ?: '';
    $json = json_decode($raw, true);
    if (is_array($json)) {
        return $json;
    }

    return $_POST;
}

function require_admin(): array
{
    if (!isset($_SESSION['admin_user_id'])) {
        respond(false, 'Authentication required.', null, [], 401);
    }

    $stmt = db()->prepare('SELECT id, name, email, status FROM admin_users WHERE id = ? AND status = "active" LIMIT 1');
    $stmt->execute([$_SESSION['admin_user_id']]);
    $user = $stmt->fetch();

    if (!$user) {
        session_destroy();
        respond(false, 'Authentication required.', null, [], 401);
    }

    return $user;
}

function validate_required(array $input, array $fields): array
{
    $errors = [];
    foreach ($fields as $field) {
        if (!isset($input[$field]) || trim((string) $input[$field]) === '') {
            $errors[$field] = 'This field is required.';
        }
    }

    return $errors;
}

try {
    $method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
    $path = trim(parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH), '/');
    $path = preg_replace('#^api/v1/?#', '', $path) ?: '';

    if ($method === 'GET' && $path === 'public/settings') {
        $rows = db()->query('SELECT setting_key, setting_value FROM site_settings WHERE is_public = 1')->fetchAll();
        respond(true, 'Settings loaded.', $rows);
    }

    if ($method === 'GET' && $path === 'public/courses') {
        $stmt = db()->query('SELECT title, slug, subtitle, technology, level, delivery_mode, duration, start_date, enrollment_status, short_description FROM courses WHERE published_at IS NOT NULL AND deleted_at IS NULL ORDER BY featured DESC, sort_order ASC, title ASC');
        respond(true, 'Courses loaded.', $stmt->fetchAll());
    }

    if ($method === 'GET' && preg_match('#^public/courses/([a-z0-9-]+)$#', $path, $matches)) {
        $stmt = db()->prepare('SELECT * FROM courses WHERE slug = ? AND published_at IS NOT NULL AND deleted_at IS NULL LIMIT 1');
        $stmt->execute([$matches[1]]);
        $course = $stmt->fetch();
        $course ? respond(true, 'Course loaded.', $course) : respond(false, 'Course not found.', null, [], 404);
    }

    if ($method === 'GET' && $path === 'public/services') {
        $stmt = db()->query('SELECT title, slug, short_description, icon, published_at FROM services WHERE published_at IS NOT NULL AND deleted_at IS NULL ORDER BY sort_order ASC, title ASC');
        respond(true, 'Services loaded.', $stmt->fetchAll());
    }

    if ($method === 'GET' && $path === 'public/resources') {
        $stmt = db()->query('SELECT title, slug, resource_type, summary, published_at FROM resources WHERE published_at IS NOT NULL AND deleted_at IS NULL ORDER BY published_at DESC');
        respond(true, 'Resources loaded.', $stmt->fetchAll());
    }

    if ($method === 'POST' && $path === 'public/enquiries') {
        $input = body();
        if (!empty($input['company_website'])) {
            respond(true, 'Enquiry received.', ['queued' => true]);
        }

        $errors = validate_required($input, ['name', 'email', 'message', 'consent']);
        if (!filter_var($input['email'] ?? '', FILTER_VALIDATE_EMAIL)) {
            $errors['email'] = 'Enter a valid email address.';
        }

        if ($errors !== []) {
            respond(false, 'Please correct the highlighted fields.', null, $errors, 422);
        }

        $stmt = db()->prepare('INSERT INTO enquiries (type, name, email, phone, subject, message, source_url, consent_given, ip_address, user_agent, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, 1, ?, ?, "new", NOW(), NOW())');
        $stmt->execute([
            $input['type'] ?? 'contact',
            trim((string) $input['name']),
            trim((string) $input['email']),
            trim((string) ($input['phone'] ?? '')),
            trim((string) ($input['topic'] ?? $input['subject'] ?? 'Website enquiry')),
            trim((string) $input['message']),
            $_SERVER['HTTP_REFERER'] ?? '',
            $_SERVER['REMOTE_ADDR'] ?? '',
            substr($_SERVER['HTTP_USER_AGENT'] ?? '', 0, 500),
        ]);

        respond(true, 'Enquiry received. The 22Pie team will contact you soon.', ['id' => db()->lastInsertId()], [], 201);
    }

    if ($method === 'POST' && $path === 'auth/login') {
        $input = body();
        $errors = validate_required($input, ['email', 'password']);
        if ($errors !== []) {
            respond(false, 'Invalid login details.', null, [], 422);
        }

        $stmt = db()->prepare('SELECT id, name, email, password_hash, status FROM admin_users WHERE email = ? LIMIT 1');
        $stmt->execute([strtolower(trim((string) $input['email']))]);
        $user = $stmt->fetch();

        if (!$user || $user['status'] !== 'active' || !password_verify((string) $input['password'], $user['password_hash'])) {
            respond(false, 'Invalid login details.', null, [], 401);
        }

        session_regenerate_id(true);
        $_SESSION['admin_user_id'] = $user['id'];
        respond(true, 'Logged in.', ['user' => ['id' => $user['id'], 'name' => $user['name'], 'email' => $user['email']]]);
    }

    if ($method === 'POST' && $path === 'auth/logout') {
        session_destroy();
        respond(true, 'Logged out.');
    }

    if ($method === 'GET' && $path === 'auth/me') {
        respond(true, 'Authenticated user loaded.', require_admin());
    }

    if ($method === 'GET' && $path === 'admin/analytics') {
        require_admin();
        $data = [
            'total_enquiries' => (int) db()->query('SELECT COUNT(*) FROM enquiries')->fetchColumn(),
            'new_enquiries' => (int) db()->query('SELECT COUNT(*) FROM enquiries WHERE status = "new"')->fetchColumn(),
            'published_courses' => (int) db()->query('SELECT COUNT(*) FROM courses WHERE published_at IS NOT NULL AND deleted_at IS NULL')->fetchColumn(),
        ];
        respond(true, 'Analytics loaded.', $data);
    }

    respond(false, 'Endpoint not found.', null, [], 404);
} catch (Throwable $exception) {
    error_log($exception->getMessage());
    respond(false, 'Something went wrong. Please try again later.', null, [], 500);
}
