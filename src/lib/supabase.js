import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn('Supabase credentials not configured. Set SUPABASE_URL and SUPABASE_KEY in Replit Secrets.');
  throw new Error('Supabase credentials are required. Please configure SUPABASE_URL and SUPABASE_KEY in your Replit Secrets.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);
