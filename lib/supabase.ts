import { createClient } from "@supabase/supabase-js";

// anon key is public-safe (same as the old config.js). Env vars override if set.
const url =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://zjvroxaehidqjocyjqkp.supabase.co";
const anon =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpqdnJveGFlaGlkcWpvY3lqcWtwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA1NzIxNjAsImV4cCI6MjA5NjE0ODE2MH0.Ggrh9Rh6p3JfegxlAJpyLL3HGxB421tDT1LdIU_EuI8";

export const SUPA_URL = url;
export const SUPA_ANON = anon;
export const BUCKET = "portfolio";

export const supabase = createClient(url, anon);

// Fresh client (used in browser components that also do auth)
export const createBrowserClient = () => createClient(url, anon);
