-- =====================================================
-- FIX EXPERTS TABLE STRUCTURE
-- =====================================================

-- Drop the existing table if it exists
DROP TABLE IF EXISTS experts CASCADE;

-- Recreate the table with proper column types
CREATE TABLE experts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    gender VARCHAR(10) NOT NULL CHECK (gender IN ('male', 'female')),
    currently_employed BOOLEAN NOT NULL,
    contract_type VARCHAR(100),
    expertise_areas TEXT NOT NULL, -- Store as TEXT (JSON string)
    experience VARCHAR(20) NOT NULL CHECK (experience IN ('less-than-1', '1-3', '4-5', '6-plus')),
    certifications_url TEXT,
    passport_photo_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_experts_email ON experts(email);
CREATE INDEX idx_experts_created_at ON experts(created_at DESC);

-- Verify the table structure
\d experts; 