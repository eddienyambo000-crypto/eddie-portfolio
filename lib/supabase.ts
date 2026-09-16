import { createClient } from "@supabase/supabase-js";

/**
 * Keys come from env ONLY.
 *
 * The old hardcoded `eyJ...` anon key was disabled by Supabase on 2026-08-02
 * ("Legacy API keys are disabled") when the shared ai7 project rotated to the
 * new-style keys. Never hardcode again — set these in Vercel:
 *
 *   NEXT_PUBLIC_SUPABASE_URL       https://zjvroxaehidqjocyjqkp.supabase.co
 *   NEXT_PUBLIC_SUPABASE_ANON_KEY  sb_publishable_...
 *
 * If they're missing the whole site still renders from lib/site.ts seed data.
 */
export const SUPA_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
export const SUPA_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
export const BUCKET = "portfolio";

/** True when the CMS is wired. Guard every query with this. */
export const cmsReady = Boolean(SUPA_URL && SUPA_ANON);

/**
 * Always a real client so callers don't need null checks — but when the env is
 * missing it points at a dead localhost so requests fail fast instead of hanging.
 */
export const supabase = createClient(
  SUPA_URL || "http://127.0.0.1:1",
  SUPA_ANON || "missing-key"
);

export const createBrowserClient = () =>
  createClient(SUPA_URL || "http://127.0.0.1:1", SUPA_ANON || "missing-key");
