-- =====================================================
-- CREATE NEW ADMIN USER: meron@skilllinkpremium.com
-- =====================================================

-- Create admin_users table if it doesn't exist
CREATE TABLE IF NOT EXISTS admin_users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    is_admin BOOLEAN DEFAULT true,
    is_super_admin BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create the new admin user
-- Username: meron@skilllinkpremium.com
-- Password: skilllinkpremium (bcrypt hashed)
INSERT INTO admin_users (
    username,
    email,
    password_hash,
    full_name,
    is_admin,
    is_super_admin
) VALUES (
    'meron@skilllinkpremium.com',
    'meron@skilllinkpremium.com',
    '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- skilllinkpremium
    'Meron SkillLink Premium Admin',
    true,
    false
) ON CONFLICT (username) DO UPDATE SET
    email = EXCLUDED.email,
    password_hash = EXCLUDED.password_hash,
    full_name = EXCLUDED.full_name,
    is_admin = EXCLUDED.is_admin,
    is_super_admin = EXCLUDED.is_super_admin,
    updated_at = NOW();

-- Verify the admin user was created successfully
SELECT 
    'New Admin User Created:' as info,
    username,
    email,
    full_name,
    is_admin,
    is_super_admin,
    created_at
FROM admin_users 
WHERE username = 'meron@skilllinkpremium.com';

-- =====================================================
-- LOGIN CREDENTIALS FOR NEW ADMIN:
-- 
-- Username/Email: meron@skilllinkpremium.com
-- Password: skilllinkpremium
-- 
-- This user can access:
-- 1. Frontend admin dashboard (/admin-dashboard)
-- 2. NestJS backend admin functionality
-- ===================================================== 