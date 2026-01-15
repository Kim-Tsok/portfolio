-- Create projects table
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  tech_stack TEXT[] NOT NULL DEFAULT '{}',
  link TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create skills table
CREATE TABLE IF NOT EXISTS public.skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  proficiency TEXT DEFAULT 'Intermediate',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS (Row Level Security) - public read access, admin write access
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read projects and skills
CREATE POLICY "Allow public read access to projects"
  ON public.projects FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access to skills"
  ON public.skills FOR SELECT
  USING (true);

-- Create admin role check function
CREATE OR REPLACE FUNCTION is_admin() RETURNS BOOLEAN AS $$
BEGIN
  RETURN (auth.jwt() ->> 'user_metadata')::jsonb ->> 'is_admin' = 'true';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Admin-only insert/update/delete policies
CREATE POLICY "Allow admins to insert projects"
  ON public.projects FOR INSERT
  WITH CHECK (is_admin());

CREATE POLICY "Allow admins to update projects"
  ON public.projects FOR UPDATE
  USING (is_admin());

CREATE POLICY "Allow admins to delete projects"
  ON public.projects FOR DELETE
  USING (is_admin());

CREATE POLICY "Allow admins to insert skills"
  ON public.skills FOR INSERT
  WITH CHECK (is_admin());

CREATE POLICY "Allow admins to update skills"
  ON public.skills FOR UPDATE
  USING (is_admin());

CREATE POLICY "Allow admins to delete skills"
  ON public.skills FOR DELETE
  USING (is_admin());
