-- Create services table
CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access to services"
  ON public.services FOR SELECT
  USING (true);

-- Admin-only write access
CREATE POLICY "Allow admins to insert services"
  ON public.services FOR INSERT
  WITH CHECK (is_admin());

CREATE POLICY "Allow admins to update services"
  ON public.services FOR UPDATE
  USING (is_admin());

CREATE POLICY "Allow admins to delete services"
  ON public.services FOR DELETE
  USING (is_admin());
