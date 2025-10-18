-- =====================================================
-- NESTJS ADMIN SETUP SCRIPT
-- This script creates admin users for your NestJS backend
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

-- Create users table if it doesn't exist (for regular users)
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    linkedin_access_token VARCHAR(500),
    linkedin_refresh_token VARCHAR(500),
    linkedin_token_expires_at BIGINT,
    linkedin_user_id VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create super admin user
-- Password: SuperAdmin@2024 (bcrypt hashed)
INSERT INTO admin_users (
    username,
    email,
    password_hash,
    full_name,
    is_admin,
    is_super_admin
) VALUES (
    'superadmin',
    'superadmin@premiumpromospace.com',
    '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- SuperAdmin@2024
    'Super Administrator',
    true,
    true
) ON CONFLICT (username) DO UPDATE SET
    email = EXCLUDED.email,
    password_hash = EXCLUDED.password_hash,
    full_name = EXCLUDED.full_name,
    is_admin = EXCLUDED.is_admin,
    is_super_admin = EXCLUDED.is_super_admin,
    updated_at = NOW();

-- Create regular admin user (from your existing migrations)
-- Password: Meron@123 (bcrypt hashed)
INSERT INTO admin_users (
    username,
    email,
    password_hash,
    full_name,
    is_admin,
    is_super_admin
) VALUES (
    'meron',
    'meron@godigitalafrica.com',
    '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- Meron@123
    'Meron Admin',
    true,
    false
) ON CONFLICT (username) DO UPDATE SET
    email = EXCLUDED.email,
    password_hash = EXCLUDED.password_hash,
    full_name = EXCLUDED.full_name,
    is_admin = EXCLUDED.is_admin,
    is_super_admin = EXCLUDED.is_super_admin,
    updated_at = NOW();

-- Create a regular user for testing
-- Password: TestUser@123 (bcrypt hashed)
INSERT INTO users (
    email,
    password,
    name
) VALUES (
    'testuser@example.com',
    '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- TestUser@123
    'Test User'
) ON CONFLICT (email) DO UPDATE SET
    password = EXCLUDED.password,
    name = EXCLUDED.name,
    updated_at = NOW();

-- Verify the users were created successfully
SELECT 
    'Admin Users:' as info,
    username,
    email,
    full_name,
    is_admin,
    is_super_admin
FROM admin_users;

SELECT 
    'Regular Users:' as info,
    email,
    name
FROM users;

-- =====================================================
-- LOGIN CREDENTIALS:
-- 
-- Super Admin:
-- Username: superadmin
-- Email: superadmin@premiumpromospace.com
-- Password: SuperAdmin@2024
-- 
-- Regular Admin:
-- Username: meron
-- Email: meron@godigitalafrica.com
-- Password: Meron@123
-- 
-- Regular User:
-- Email: testuser@example.com
-- Password: TestUser@123
-- 
-- ===================================================== 