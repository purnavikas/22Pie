CREATE TABLE admin_roles (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(120) NOT NULL UNIQUE,
  created_at TIMESTAMP NULL,
  updated_at TIMESTAMP NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE admin_users (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(160) NOT NULL,
  email VARCHAR(190) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  status ENUM('active','locked','disabled') NOT NULL DEFAULT 'active',
  last_login_at TIMESTAMP NULL,
  failed_login_count INT UNSIGNED NOT NULL DEFAULT 0,
  locked_until TIMESTAMP NULL,
  created_at TIMESTAMP NULL,
  updated_at TIMESTAMP NULL,
  deleted_at TIMESTAMP NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE admin_user_roles (
  admin_user_id BIGINT UNSIGNED NOT NULL,
  admin_role_id BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY (admin_user_id, admin_role_id),
  CONSTRAINT fk_admin_user_roles_user FOREIGN KEY (admin_user_id) REFERENCES admin_users(id) ON DELETE CASCADE,
  CONSTRAINT fk_admin_user_roles_role FOREIGN KEY (admin_role_id) REFERENCES admin_roles(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE admin_activity_logs (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  admin_user_id BIGINT UNSIGNED NULL,
  action VARCHAR(160) NOT NULL,
  entity_type VARCHAR(120) NULL,
  entity_id BIGINT UNSIGNED NULL,
  metadata JSON NULL,
  ip_address VARCHAR(64) NULL,
  created_at TIMESTAMP NULL,
  INDEX idx_activity_admin_created (admin_user_id, created_at),
  CONSTRAINT fk_activity_admin FOREIGN KEY (admin_user_id) REFERENCES admin_users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE site_settings (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  setting_key VARCHAR(160) NOT NULL UNIQUE,
  setting_value TEXT NULL,
  setting_type VARCHAR(60) NOT NULL DEFAULT 'text',
  is_public BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NULL,
  updated_at TIMESTAMP NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE technologies (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(160) NOT NULL UNIQUE,
  slug VARCHAR(180) NOT NULL UNIQUE,
  description TEXT NULL,
  color VARCHAR(32) NULL,
  sort_order INT NOT NULL DEFAULT 0,
  published_at TIMESTAMP NULL,
  created_at TIMESTAMP NULL,
  updated_at TIMESTAMP NULL,
  deleted_at TIMESTAMP NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE course_categories (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(160) NOT NULL UNIQUE,
  slug VARCHAR(180) NOT NULL UNIQUE,
  created_at TIMESTAMP NULL,
  updated_at TIMESTAMP NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE courses (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  category_id BIGINT UNSIGNED NULL,
  title VARCHAR(190) NOT NULL,
  slug VARCHAR(220) NOT NULL UNIQUE,
  subtitle VARCHAR(255) NULL,
  technology VARCHAR(160) NULL,
  short_description TEXT NULL,
  full_description MEDIUMTEXT NULL,
  thumbnail_media_id BIGINT UNSIGNED NULL,
  level VARCHAR(100) NULL,
  delivery_mode VARCHAR(100) NULL,
  language VARCHAR(80) NULL,
  duration VARCHAR(120) NULL,
  session_schedule VARCHAR(255) NULL,
  start_date DATE NULL,
  end_date DATE NULL,
  enrollment_status VARCHAR(80) NULL,
  price DECIMAL(10,2) NULL,
  discounted_price DECIMAL(10,2) NULL,
  price_visible BOOLEAN NOT NULL DEFAULT FALSE,
  instructor_name VARCHAR(160) NULL,
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  sort_order INT NOT NULL DEFAULT 0,
  seo_title VARCHAR(190) NULL,
  seo_description VARCHAR(320) NULL,
  published_at TIMESTAMP NULL,
  created_at TIMESTAMP NULL,
  updated_at TIMESTAMP NULL,
  deleted_at TIMESTAMP NULL,
  INDEX idx_courses_public (published_at, deleted_at, featured, sort_order),
  INDEX idx_courses_filters (technology, level, delivery_mode, enrollment_status),
  CONSTRAINT fk_courses_category FOREIGN KEY (category_id) REFERENCES course_categories(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE course_modules (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  course_id BIGINT UNSIGNED NOT NULL,
  title VARCHAR(190) NOT NULL,
  description TEXT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP NULL,
  updated_at TIMESTAMP NULL,
  CONSTRAINT fk_course_modules_course FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE services (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(190) NOT NULL,
  slug VARCHAR(220) NOT NULL UNIQUE,
  short_description TEXT NULL,
  full_description MEDIUMTEXT NULL,
  icon VARCHAR(80) NULL,
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  sort_order INT NOT NULL DEFAULT 0,
  seo_title VARCHAR(190) NULL,
  seo_description VARCHAR(320) NULL,
  published_at TIMESTAMP NULL,
  created_at TIMESTAMP NULL,
  updated_at TIMESTAMP NULL,
  deleted_at TIMESTAMP NULL,
  INDEX idx_services_public (published_at, deleted_at, sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE resources (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(190) NOT NULL,
  slug VARCHAR(220) NOT NULL UNIQUE,
  resource_type VARCHAR(100) NOT NULL,
  summary TEXT NULL,
  body MEDIUMTEXT NULL,
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  published_at TIMESTAMP NULL,
  created_at TIMESTAMP NULL,
  updated_at TIMESTAMP NULL,
  deleted_at TIMESTAMP NULL,
  INDEX idx_resources_public (published_at, deleted_at, featured)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE enquiries (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  type ENUM('course','career','project','contact') NOT NULL DEFAULT 'contact',
  name VARCHAR(160) NOT NULL,
  email VARCHAR(190) NOT NULL,
  phone VARCHAR(60) NULL,
  company VARCHAR(190) NULL,
  subject VARCHAR(190) NULL,
  message TEXT NOT NULL,
  payload JSON NULL,
  source_url VARCHAR(500) NULL,
  consent_given BOOLEAN NOT NULL DEFAULT FALSE,
  ip_address VARCHAR(64) NULL,
  user_agent VARCHAR(500) NULL,
  status ENUM('new','in_progress','closed','spam') NOT NULL DEFAULT 'new',
  created_at TIMESTAMP NULL,
  updated_at TIMESTAMP NULL,
  deleted_at TIMESTAMP NULL,
  INDEX idx_enquiries_type_status_created (type, status, created_at),
  INDEX idx_enquiries_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE media (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  disk VARCHAR(80) NOT NULL DEFAULT 'public',
  path VARCHAR(500) NOT NULL,
  original_name VARCHAR(255) NOT NULL,
  mime_type VARCHAR(120) NOT NULL,
  size_bytes BIGINT UNSIGNED NOT NULL,
  alt_text VARCHAR(255) NULL,
  caption VARCHAR(255) NULL,
  created_at TIMESTAMP NULL,
  updated_at TIMESTAMP NULL,
  deleted_at TIMESTAMP NULL,
  INDEX idx_media_mime (mime_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO admin_roles (name, slug, created_at, updated_at) VALUES
('Super Admin', 'super-admin', NOW(), NOW()),
('Content Admin', 'content-admin', NOW(), NOW()),
('Enquiry Manager', 'enquiry-manager', NOW(), NOW());

INSERT INTO site_settings (setting_key, setting_value, setting_type, is_public, created_at, updated_at) VALUES
('brand_name', '22Pie', 'text', 1, NOW(), NOW()),
('hero_headline', 'Learn the technology. Build the confidence. Grow together.', 'text', 1, NOW(), NOW()),
('hero_description', '22Pie is a developer-led learning and technology community offering practical IT training, interview preparation, career guidance, certification support, and project development.', 'textarea', 1, NOW(), NOW()),
('community_url', '', 'url', 1, NOW(), NOW()),
('whatsapp_general_number', '', 'text', 1, NOW(), NOW());

INSERT INTO course_categories (name, slug, created_at, updated_at) VALUES
('Technology Training', 'technology-training', NOW(), NOW()),
('Career Preparation', 'career-preparation', NOW(), NOW());

INSERT INTO technologies (name, slug, description, color, sort_order, published_at, created_at, updated_at) VALUES
('Salesforce', 'salesforce', 'CRM platform training and implementation support.', '#6d5dfc', 1, NOW(), NOW(), NOW()),
('Java', 'java', 'Backend programming and interview foundations.', '#0aa6a6', 2, NOW(), NOW(), NOW()),
('DevOps', 'devops', 'Delivery practices, CI/CD, cloud, and support readiness.', '#e96f5f', 3, NOW(), NOW(), NOW());

INSERT INTO services (title, slug, short_description, icon, featured, sort_order, published_at, created_at, updated_at) VALUES
('IT training', 'it-training', 'Practical classes for current technologies.', 'graduation-cap', 1, 1, NOW(), NOW(), NOW()),
('Interview coaching', 'interview-coaching', 'Scenario-based preparation with developer feedback.', 'message-square-text', 1, 2, NOW(), NOW(), NOW()),
('Technical consulting', 'technical-consulting', 'CRM, integration, automation, and app architecture support.', 'briefcase-business', 1, 3, NOW(), NOW(), NOW());
