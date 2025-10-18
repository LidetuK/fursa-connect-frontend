-- Check the structure of admin_users table
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'admin_users';

-- Check if admin_users table exists and has any data
SELECT COUNT(*) as admin_users_count FROM admin_users;

-- Show sample data from admin_users (if any)
SELECT * FROM admin_users LIMIT 5;

-- Check if users table exists
SELECT COUNT(*) as users_count FROM users;

-- Show sample data from users (if any)
SELECT * FROM users LIMIT 5; 