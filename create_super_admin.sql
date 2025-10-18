-- =====================================================
-- SUPER ADMIN SETUP SCRIPT
-- This script creates a super admin user that can access:
-- 1. Frontend admin dashboard (/admin-dashboard)
-- 2. NestJS backend admin functionality
-- =====================================================

-- First, ensure the admin user type exists in the enum
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_type') THEN
        CREATE TYPE user_type AS ENUM ('client', 'digital_expert', 'sme');
    END IF;
    
    -- Add admin to the enum if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'admin' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'user_type')) THEN
        ALTER TYPE user_type ADD VALUE 'admin';
    END IF;
END $$;

-- Create admin_users table for NestJS backend authentication
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

-- Create the super admin user for NestJS backend
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

-- Create or update the admin user in auth.users (for frontend access)
-- This ensures the user can access the frontend admin dashboard
INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    invited_at,
    confirmation_token,
    confirmation_sent_at,
    recovery_token,
    recovery_sent_at,
    email_change_token_new,
    email_change,
    email_change_sent_at,
    last_sign_in_at,
    raw_app_meta_data,
    raw_user_meta_data,
    is_super_admin,
    created_at,
    updated_at,
    phone,
    phone_confirmed_at,
    phone_change,
    phone_change_token,
    phone_change_sent_at,
    email_change_token_current,
    email_change_confirm_status,
    banned_until,
    reauthentication_token,
    reauthentication_sent_at,
    is_sso_user,
    deleted_at,
    is_anonymous
) VALUES (
    '00000000-0000-0000-0000-000000000000',
    'super-admin-1111-1111-1111-111111111111',
    'authenticated',
    'authenticated',
    'superadmin@premiumpromospace.com',
    crypt('SuperAdmin@2024', gen_salt('bf')),
    now(),
    null,
    '',
    null,
    '',
    null,
    '',
    '',
    null,
    null,
    '{"provider": "email", "providers": ["email"]}',
    '{"is_super_admin": true}',
    true,
    now(),
    now(),
    null,
    null,
    '',
    '',
    null,
    '',
    0,
    null,
    '',
    null,
    false,
    null,
    false
) ON CONFLICT (email) DO UPDATE SET
    encrypted_password = EXCLUDED.encrypted_password,
    raw_user_meta_data = EXCLUDED.raw_user_meta_data,
    is_super_admin = EXCLUDED.is_super_admin,
    updated_at = NOW();

-- Create or update the profile for frontend admin dashboard access
INSERT INTO public.profiles (
    id,
    user_type,
    full_name,
    created_at,
    updated_at
) VALUES (
    'super-admin-1111-1111-1111-111111111111',
    'admin',
    'Super Administrator',
    now(),
    now()
) ON CONFLICT (id) DO UPDATE SET
    user_type = EXCLUDED.user_type,
    full_name = EXCLUDED.full_name,
    updated_at = NOW();

-- Create additional admin policies for the super admin
-- Allow super admin to view all data
CREATE POLICY IF NOT EXISTS "Super admin can view all profiles" 
    ON public.profiles 
    FOR SELECT 
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND user_type = 'admin'
        )
    );

CREATE POLICY IF NOT EXISTS "Super admin can view all tasks" 
    ON public.tasks 
    FOR SELECT 
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND user_type = 'admin'
        )
    );

CREATE POLICY IF NOT EXISTS "Super admin can view all conversations" 
    ON public.conversations 
    FOR SELECT 
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND user_type = 'admin'
        )
    );

CREATE POLICY IF NOT EXISTS "Super admin can view all messages" 
    ON public.messages 
    FOR SELECT 
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND user_type = 'admin'
        )
    );

CREATE POLICY IF NOT EXISTS "Super admin can view all expert profiles" 
    ON public.digital_expert_profiles 
    FOR SELECT 
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND user_type = 'admin'
        )
    );

-- Verify the super admin was created successfully
SELECT 
    'NestJS Backend Admin User:' as info,
    username,
    email,
    full_name,
    is_admin,
    is_super_admin
FROM admin_users 
WHERE username = 'superadmin';

SELECT 
    'Frontend Auth User:' as info,
    email,
    is_super_admin,
    raw_user_meta_data
FROM auth.users 
WHERE email = 'superadmin@premiumpromospace.com';

SELECT 
    'Frontend Profile:' as info,
    full_name,
    user_type
FROM public.profiles 
WHERE id = 'super-admin-1111-1111-1111-111111111111';

-- =====================================================
-- LOGIN CREDENTIALS FOR SUPER ADMIN:
-- 
-- Frontend Admin Dashboard (/admin-dashboard):
-- Email: superadmin@premiumpromospace.com
-- Password: SuperAdmin@2024
-- 
-- NestJS Backend Admin:
-- Username: superadmin
-- Password: SuperAdmin@2024
-- 
-- ===================================================== 