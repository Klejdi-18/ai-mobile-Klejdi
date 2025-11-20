-- create_tasks_table.sql
-- Run this SQL in your Supabase project's SQL editor (or via psql/supabase CLI)

-- 1) Create the tasks table
CREATE TABLE IF NOT EXISTS public.tasks (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title TEXT NOT NULL,
  is_done BOOLEAN NOT NULL DEFAULT false,
  inserted_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2) If Row Level Security (RLS) is enabled, enable it and add policies to allow anonymous (anon) access for dev/testing.
-- Only do this in development. For production, use stricter policies tied to auth.users.

ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anon_select" ON public.tasks
  FOR SELECT
  USING (true);

CREATE POLICY "anon_insert" ON public.tasks
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "anon_update" ON public.tasks
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "anon_delete" ON public.tasks
  FOR DELETE
  USING (true);

-- Optional: grant explicit privileges to the anon role (usually public schema has these already)
GRANT SELECT, INSERT, UPDATE, DELETE ON public.tasks TO anon;
