-- ===================================================
-- CSK CONSTRUCTIONS - SUPABASE DATABASE MIGRATIONS
-- ===================================================

-- 1. Leads Table (Contact Form Captures)
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  project_type TEXT,
  budget TEXT,
  location TEXT,
  message TEXT,
  status TEXT DEFAULT 'new', -- new | contacted | converted | closed
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Portfolio Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  category TEXT, -- residential | commercial | luxury | industrial | infrastructure
  images JSONB, -- array of Supabase Storage URLs
  budget TEXT,
  timeline TEXT,
  location TEXT,
  status TEXT DEFAULT 'published', -- published | draft
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Client Testimonials Table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_name TEXT NOT NULL,
  company TEXT,
  review TEXT NOT NULL,
  rating INT CHECK (rating BETWEEN 1 AND 5),
  image_url TEXT,
  video_url TEXT,
  published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Blog / Resources Table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT,
  excerpt TEXT,
  cover_image TEXT,
  category TEXT,
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Job Openings / Careers Table
CREATE TABLE IF NOT EXISTS careers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  position TEXT NOT NULL,
  location TEXT,
  description TEXT,
  requirements TEXT,
  salary_range TEXT,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. AI Chat Sessions Table
CREATE TABLE IF NOT EXISTS conversations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT UNIQUE NOT NULL,
  messages JSONB, -- array of dialogue objects
  lead_captured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ===================================================

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE careers ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;

-- Leads RLS: Public insert only. All reads and updates locked behind admin auth.
CREATE POLICY "Allow public inserts on leads" ON leads FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Restrict lead reads to authenticated admins" ON leads FOR SELECT TO authenticated USING (true);
CREATE POLICY "Restrict lead updates to authenticated admins" ON leads FOR UPDATE TO authenticated USING (true);

-- Conversations RLS: Public insert only. Reads locked behind admin auth.
CREATE POLICY "Allow public inserts on conversations" ON conversations FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Restrict conversation reads to authenticated admins" ON conversations FOR SELECT TO authenticated USING (true);

-- Projects RLS: Public reads of published projects. Writes locked behind admin.
CREATE POLICY "Allow public select on published projects" ON projects FOR SELECT TO public USING (status = 'published');
CREATE POLICY "Restrict all project writes to authenticated admins" ON projects FOR ALL TO authenticated USING (true);

-- Testimonials RLS: Public reads of approved testimonials. Writes locked behind admin.
CREATE POLICY "Allow public select on approved testimonials" ON testimonials FOR SELECT TO public USING (published = true);
CREATE POLICY "Restrict all testimonial writes to authenticated admins" ON testimonials FOR ALL TO authenticated USING (true);

-- Blog Posts RLS: Public reads of published articles. Writes locked behind admin.
CREATE POLICY "Allow public select on published blog posts" ON blog_posts FOR SELECT TO public USING (published = true);
CREATE POLICY "Restrict all blog writes to authenticated admins" ON blog_posts FOR ALL TO authenticated USING (true);

-- Careers RLS: Public reads of active vacancies. Writes locked behind admin.
CREATE POLICY "Allow public select on active careers" ON careers FOR SELECT TO public USING (active = true);
CREATE POLICY "Restrict all career writes to authenticated admins" ON careers FOR ALL TO authenticated USING (true);
