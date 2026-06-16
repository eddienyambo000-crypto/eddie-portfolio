-- ════════════════════════════════════════════════════════════════════════
--  EDDIE NYAMBO PORTFOLIO — Supabase schema  (pf_ prefixed = safe to add
--  to an EXISTING Supabase project without clashing with its tables)
--
--  Run ONCE in: Supabase Dashboard → SQL Editor → New query → Run
--  Then create your admin login in: Authentication → Users → Add user
--  (email + password). That email/password is what you use at /admin.
-- ════════════════════════════════════════════════════════════════════════

-- ── PROFILE (singleton row id=1: hero + about + photo + stats) ──────────
create table if not exists public.pf_profile (
  id          int primary key default 1,
  hero_eyebrow text   default 'AI AUTOMATION ENGINEER · KIGALI, RWANDA',
  hero_h1      text   default 'I make your business|run itself.',  -- text after "|" shows in caramel italic
  hero_sub     text   default 'I design AI automation systems and web apps that cut the busywork, kill costly errors, and free your team — built custom, shipped in weeks.',
  hero_promise text   default 'Free 20-min automation audit. I''ll map exactly what to automate first.',
  about_md     text   default 'I''m Eddie Nyambo — AI Automation Engineer & Web Developer based in Kigali, Rwanda. I build systems that do the repetitive work so you don''t have to: WhatsApp AI agents, n8n pipelines, CRM dashboards, and premium web builds. Real, deployed solutions — not demos.',
  photo_url    text   default '',
  stats        jsonb  default '[
    {"value":"3+","label":"Live Systems Shipped"},
    {"value":"100%","label":"Delivery Rate"},
    {"value":"1000s","label":"Hours Automated"},
    {"value":"24/7","label":"Bots Running"}
  ]'::jsonb,
  updated_at   timestamptz default now()
);
insert into public.pf_profile (id) values (1) on conflict (id) do nothing;

-- ── PROJECTS ─────────────────────────────────────────────────────────────
create table if not exists public.pf_projects (
  id         uuid primary key default gen_random_uuid(),
  title      text not null,
  blurb      text,
  tags       text[] default '{}',
  cover_url  text,
  live_url   text,
  accent     text default '#B07A4B',
  sort       int  default 0,
  published  boolean default true,
  created_at timestamptz default now()
);

-- ── SERVICES (offer stack) ───────────────────────────────────────────────
create table if not exists public.pf_services (
  id      uuid primary key default gen_random_uuid(),
  title   text not null,
  outcome text,
  icon    text default 'bolt',
  sort    int  default 0
);

-- ── SKILLS ───────────────────────────────────────────────────────────────
create table if not exists public.pf_skills (
  id     uuid primary key default gen_random_uuid(),
  grp    text not null,         -- group: "AI Automation" | "Web Development" | "Infrastructure"
  label  text not null,
  sort   int default 0
);

-- ── TESTIMONIALS ─────────────────────────────────────────────────────────
create table if not exists public.pf_testimonials (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  role       text,
  quote      text not null,
  avatar_url text,
  sort       int default 0,
  published  boolean default true
);

-- ── LEADS (contact form inbox) ───────────────────────────────────────────
create table if not exists public.pf_leads (
  id         uuid primary key default gen_random_uuid(),
  name       text,
  email      text,
  subject    text,
  message    text,
  status     text default 'new',   -- new | read | replied
  created_at timestamptz default now()
);

-- ════════════════════════════════════════════════════════════════════════
--  ROW LEVEL SECURITY
--  Public (anon): READ content, INSERT leads only.
--  Logged-in admin (authenticated): full write on everything.
-- ════════════════════════════════════════════════════════════════════════
alter table public.pf_profile      enable row level security;
alter table public.pf_projects     enable row level security;
alter table public.pf_services     enable row level security;
alter table public.pf_skills       enable row level security;
alter table public.pf_testimonials enable row level security;
alter table public.pf_leads        enable row level security;

-- Public read on content tables
create policy "pf_read_profile"      on public.pf_profile      for select using (true);
create policy "pf_read_projects"     on public.pf_projects     for select using (true);
create policy "pf_read_services"     on public.pf_services     for select using (true);
create policy "pf_read_skills"       on public.pf_skills       for select using (true);
create policy "pf_read_testimonials" on public.pf_testimonials for select using (true);

-- Anyone can submit a lead; only admin can read/update them
create policy "pf_insert_leads"      on public.pf_leads        for insert with check (true);
create policy "pf_admin_read_leads"  on public.pf_leads        for select using (auth.role() = 'authenticated');
create policy "pf_admin_upd_leads"   on public.pf_leads        for update using (auth.role() = 'authenticated');
create policy "pf_admin_del_leads"   on public.pf_leads        for delete using (auth.role() = 'authenticated');

-- Admin full write on content
create policy "pf_write_profile"      on public.pf_profile      for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "pf_write_projects"     on public.pf_projects     for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "pf_write_services"     on public.pf_services     for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "pf_write_skills"       on public.pf_skills       for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "pf_write_testimonials" on public.pf_testimonials for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- ════════════════════════════════════════════════════════════════════════
--  STORAGE — public 'portfolio' bucket (photo, project covers, avatars)
-- ════════════════════════════════════════════════════════════════════════
insert into storage.buckets (id, name, public)
values ('portfolio', 'portfolio', true)
on conflict (id) do nothing;

create policy "pf_media_public_read"  on storage.objects for select using (bucket_id = 'portfolio');
create policy "pf_media_admin_write"  on storage.objects for insert with check (bucket_id = 'portfolio' and auth.role() = 'authenticated');
create policy "pf_media_admin_update" on storage.objects for update using (bucket_id = 'portfolio' and auth.role() = 'authenticated');
create policy "pf_media_admin_delete" on storage.objects for delete using (bucket_id = 'portfolio' and auth.role() = 'authenticated');

-- ════════════════════════════════════════════════════════════════════════
--  SEED DATA (mirrors the launch content; edit later from /admin)
-- ════════════════════════════════════════════════════════════════════════
insert into public.pf_projects (title, blurb, tags, live_url, accent, sort) values
  ('Ai7 OPTIVARO', 'Full agency website for an AI automation firm in Kigali — Three.js visuals, AI chatbot, admin panel, SEO.', ARRAY['Web','AI','Three.js'], 'https://ai7optivaro.com', '#B07A4B', 1),
  ('FarmGate RW', 'Livestock marketplace connecting farmers and buyers across Rwanda with a WhatsApp-integrated flow.', ARRAY['Marketplace','Web'], 'https://farmgate-rw.vercel.app', '#6F4E37', 2),
  ('StepIn Automation', 'End-to-end WhatsApp AI sales agent + 7-day drip + CRM for a Kigali coaching business. Runs 24/7.', ARRAY['AI Automation','n8n','WhatsApp'], 'https://wa.me/250793154804', '#8A5A3C', 3)
on conflict do nothing;

insert into public.pf_services (title, outcome, icon, sort) values
  ('WhatsApp AI Agents', 'A bot that qualifies leads, books calls and answers customers 24/7 — so you stop losing sales after hours.', 'chat', 1),
  ('Workflow Automation', 'n8n pipelines that move data, send follow-ups and run reports automatically — no human touching it.', 'bolt', 2),
  ('Premium Web Builds', 'Fast, stunning, mobile-first sites that turn visitors into booked calls. Shipped in days, not months.', 'globe', 3),
  ('AI Integration', 'Plug GPT/Claude into your CRM and tools so your existing stack starts working smarter for you.', 'plug', 4)
on conflict do nothing;

insert into public.pf_skills (grp, label, sort) values
  ('AI Automation','n8n',1),('AI Automation','OpenAI API',2),('AI Automation','Claude API',3),('AI Automation','WhatsApp Automation',4),('AI Automation','RAG Systems',5),('AI Automation','AI Chatbots',6),
  ('Web Development','HTML / CSS / JS',1),('Web Development','Tailwind',2),('Web Development','Three.js',3),('Web Development','Responsive Design',4),('Web Development','SEO & Schema',5),
  ('Infrastructure','Supabase',1),('Infrastructure','Vercel',2),('Infrastructure','Google Analytics',3),('Infrastructure','DNS & Email',4)
on conflict do nothing;
