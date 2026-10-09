-- ====================================================================
-- PRATYUSH MISHRA - PORTFOLIO DATABASE SCHEMA
-- Target Engine: PostgreSQL 15+ / Supabase
-- Table: certificates
-- Description: Stores all verified professional licenses, certifications, 
--              internships, and credentials for Pratyush Mishra.
-- ====================================================================

-- 1. Enable UUID Extension (Supabase includes this by default)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create Certificates Table
CREATE TABLE IF NOT EXISTS public.certificates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    issuer VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL DEFAULT 'AI & Data Science',
    issue_date DATE NOT NULL DEFAULT CURRENT_DATE,
    end_date DATE,
    duration VARCHAR(100),
    is_internship BOOLEAN DEFAULT FALSE,
    credential_id VARCHAR(255),
    credential_url TEXT,
    badge_image_url TEXT,
    certificate_pdf_url TEXT,
    skills TEXT[] DEFAULT '{}',
    description TEXT,
    is_verified BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create Performance Indexes for Fast Querying
CREATE INDEX IF NOT EXISTS idx_certificates_category ON public.certificates(category);
CREATE INDEX IF NOT EXISTS idx_certificates_issuer ON public.certificates(issuer);
CREATE INDEX IF NOT EXISTS idx_certificates_is_internship ON public.certificates(is_internship);
CREATE INDEX IF NOT EXISTS idx_certificates_is_featured ON public.certificates(is_featured);
CREATE INDEX IF NOT EXISTS idx_certificates_issue_date ON public.certificates(issue_date DESC);

-- 4. Convenient Chronological Views
-- Complete chronological view (Newest credentials first)
CREATE OR REPLACE VIEW public.v_certificates_chronological AS 
SELECT * FROM public.certificates 
ORDER BY issue_date DESC, created_at DESC;

-- Dedicated Work Experience & Internships view
CREATE OR REPLACE VIEW public.v_internships_chronological AS 
SELECT * FROM public.certificates 
WHERE is_internship = TRUE 
ORDER BY issue_date DESC;

-- 5. Automatic updated_at Trigger
CREATE OR REPLACE FUNCTION update_certificates_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_certificates_updated_at ON public.certificates;
CREATE TRIGGER trigger_certificates_updated_at
    BEFORE UPDATE ON public.certificates
    FOR EACH ROW
    EXECUTE FUNCTION update_certificates_updated_at();

-- 6. Supabase Row Level Security (RLS)
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

-- Allow Public (anonymous visitors) to view all verified certificates
DROP POLICY IF EXISTS "Public can view verified certificates" ON public.certificates;
CREATE POLICY "Public can view verified certificates" 
    ON public.certificates 
    FOR SELECT 
    USING (is_verified = true);

-- Allow Authenticated Users (Admin / Pratyush) to insert, update, delete
DROP POLICY IF EXISTS "Admin full access" ON public.certificates;
CREATE POLICY "Admin full access" 
    ON public.certificates 
    FOR ALL 
    TO authenticated 
    USING (true) 
    WITH CHECK (true);

-- ====================================================================
-- SUCCESS: Schema created with chronological views and RLS security.
-- Copy and paste this directly into Supabase SQL Editor.
-- ====================================================================
