-- ══════════════════════════════════════════════════════════════════════════
--  Eddie Nyambo portfolio — 2026-09 rebuild migration
--
--  Run ONCE in the Supabase SQL editor for project zjvroxaehidqjocyjqkp.
--  Safe to re-run: every statement is idempotent.
--
--  It does three things:
--    1. adds the optional case-study columns the new /work/[slug] pages use
--    2. lets the admin read its own leads (SELECT policy for authenticated)
--    3. refreshes the hero/about copy + services to match the rebuilt site
--
--  The site works WITHOUT this — it falls back to the seed content in
--  lib/site.ts. Run it when you want to edit that content from /admin.
-- ══════════════════════════════════════════════════════════════════════════

-- ── 1. case-study fields (all optional, all nullable) ────────────────────
alter table public.pf_projects add column if not exists client   text;
alter table public.pf_projects add column if not exists year     text;
alter table public.pf_projects add column if not exists problem  text;
alter table public.pf_projects add column if not exists solution text;
alter table public.pf_projects add column if not exists result   text;
alter table public.pf_projects add column if not exists metrics  jsonb default '[]'::jsonb;

comment on column public.pf_projects.metrics is
  'Array of {value,label} shown as the big numbers on the case-study page.';

-- ── 2. make sure the admin can actually read the leads inbox ─────────────
--    (anon must never get SELECT here — that would publish the lead list)
drop policy if exists "auth read leads" on public.pf_leads;
create policy "auth read leads" on public.pf_leads
  for select to authenticated using (true);

drop policy if exists "auth manage leads" on public.pf_leads;
create policy "auth manage leads" on public.pf_leads
  for all to authenticated using (true) with check (true);

-- anon may only drop a lead in the box, never read it back
drop policy if exists "anon insert leads" on public.pf_leads;
create policy "anon insert leads" on public.pf_leads
  for insert to anon with check (true);

-- ── 3. refresh the copy to match the rebuilt site ────────────────────────
update public.pf_profile set
  hero_eyebrow = 'AUTOMATION SYSTEMS ENGINEER / KIGALI',
  hero_h1      = 'Your business should make money|while you sleep.',
  hero_sub     = 'I install the system that does it: a site that sells, a WhatsApp agent that answers in seconds, follow-up that never forgets. Built for Rwandan businesses. Live in 14 days.',
  hero_promise = 'Free teardown. Show me your business and I will map exactly where you are losing customers.',
  about_md     = 'I am Eddie Nyambo. I do not make brochure websites, I install machines that go and get customers. Sites that sell while you sleep, WhatsApp agents that answer in five seconds at 2am, follow-up that chases every lead until they buy or say no. Everything here is deployed and running for a real business in Rwanda today, not sitting in a demo folder.',
  stats        = '[
    {"value":"12+","label":"Systems shipped"},
    {"value":"5 sec","label":"Average reply time"},
    {"value":"24/7","label":"Runs without you"},
    {"value":"14","label":"Days to live"}
  ]'::jsonb
where id = 1;

-- services: the site expects icon to be one of globe | chat | repeat | chart
update public.pf_services set icon = 'globe'  where icon is null or icon = 'bolt';

-- ── check it worked ──────────────────────────────────────────────────────
-- select column_name from information_schema.columns
--   where table_name = 'pf_projects' order by ordinal_position;
-- select policyname, cmd, roles from pg_policies where tablename = 'pf_leads';
