-- Add github_url and custom_links columns to projects table

ALTER TABLE public.projects 
ADD COLUMN IF NOT EXISTS github_url TEXT,
ADD COLUMN IF NOT EXISTS custom_links JSONB DEFAULT '[]'::jsonb;
