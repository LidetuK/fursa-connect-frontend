-- Create admin_users table with basic structure
CREATE TABLE IF NOT EXISTS admin_users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    is_admin BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create a simple admin user
-- Password: admin123 (bcrypt hashed)
INSERT INTO admin_users (
    username,
    password_hash,
    is_admin
) VALUES (
    'admin',
    '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- admin123
    true
) ON CONFLICT (username) DO UPDATE SET
    password_hash = EXCLUDED.password_hash,
    is_admin = EXCLUDED.is_admin;

-- Verify the admin user was created
SELECT * FROM admin_users;

-- =====================================================
-- LOGIN CREDENTIALS:
-- Username: admin
-- Password: admin123
-- ===================================================== 