/**
 * Content types + seed fallback.
 * Live content comes from the pf_* Supabase tables; everything here keeps the
 * site rendering perfectly when the DB is empty, slow or unreachable.
 */

export type Stat = { value: string; label: string };

export type Profile = {
  hero_eyebrow: string;
  /** text after "|" renders in the accent italic */
  hero_h1: string;
  hero_sub: string;
  hero_promise: string;
  about_md: string;
  photo_url: string;
  stats: Stat[];
};

export type Project = {
  id: string;
  title: string;
  blurb: string;
  tags: string[];
  cover_url?: string | null;
  live_url?: string | null;
  accent?: string | null;
  /** deep-dive fields added by the 2026-09 migration - all optional */
  client?: string | null;
  year?: string | null;
  problem?: string | null;
  solution?: string | null;
  result?: string | null;
  metrics?: { value: string; label: string }[] | null;
};

export type Service = { id: string; title: string; outcome: string; icon?: string | null };
export type Skill = { id: string; grp: string; label: string; sort: number };
export type Testimonial = {
  id: string;
  name: string;
  role: string;
  quote: string;
  avatar_url?: string | null;
};

/* --------------------------- identity + contact --------------------------- */

export const SITE_URL = "https://eddie-portfolio-gamma.vercel.app";
export const NAME = "Eddie Nyambo";
export const ROLE = "Automation Systems Engineer";
export const CITY = "Kigali, Rwanda";
export const EMAIL = "ai7optivaro@gmail.com";
export const WHATSAPP = "250791811234";
export const WHATSAPP_PRETTY = "+250 791 811 234";
export const CALENDAR = "https://calendar.app.google/EBdnYtCDFWenPeLf7";

export const wa = (text: string) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;

/** Default WhatsApp opener, used by most CTAs. */
export const WA_DEFAULT = wa(
  "Hi Eddie - I saw your site. I want a system that brings me customers automatically. Can we talk?"
);

/** URL-safe slug from a project title, so /work/[slug] needs no DB column. */
export const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

/* ------------------------------ the launcher ------------------------------ */

export type Destination = {
  key: string;
  no: string;
  href: string;
  label: string;
  line: string;
  hint: string;
};

/** The four doors on the home screen. Order = keyboard order. */
export const DESTINATIONS: Destination[] = [
  {
    key: "system",
    no: "01",
    href: "/system",
    label: "See it working",
    line: "Watch a customer get captured, answered and booked. Live, in 40 seconds.",
    hint: "Interactive demo",
  },
  {
    key: "work",
    no: "02",
    href: "/work",
    label: "The work",
    line: "Real systems running real Rwandan businesses right now. Open them yourself.",
    hint: "Case studies",
  },
  {
    key: "services",
    no: "03",
    href: "/services",
    label: "What I build",
    line: "The four systems I install, what each one is worth, and what it costs.",
    hint: "Offer and pricing",
  },
  {
    key: "start",
    no: "04",
    href: "/contact",
    label: "Start a build",
    line: "Free teardown of your business. I map what to automate first. No pitch.",
    hint: "2 slots this month",
  },
];

/* ------------------------------- the offer -------------------------------- */

export const OFFER = {
  name: "The 14-Day Customer Engine",
  promise:
    "A system that catches every customer, answers them in seconds and books them without you touching your phone.",
  price: "From RWF 450,000",
  priceNote: "One build fee. You own everything. No monthly lock-in.",
  timeline: "Live in 14 days",
  slots: 2,
  stack: [
    { item: "A website built to sell, not to sit", worth: "RWF 600,000" },
    { item: "WhatsApp AI agent that answers in 5 seconds, 24/7", worth: "RWF 800,000" },
    { item: "Automatic follow-up so no lead ever goes cold", worth: "RWF 400,000" },
    { item: "Customer database and dashboard you actually control", worth: "RWF 350,000" },
    { item: "Google visibility setup so people find you", worth: "RWF 250,000" },
    { item: "30 days of fixes and tuning after launch", worth: "RWF 300,000" },
  ],
  guarantee:
    "If it is not live and working in 14 days, you do not pay the balance. If it is live and you hate it, I remove it and refund the build fee. The risk is mine, not yours.",
};

export const PROCESS = [
  {
    no: "01",
    title: "Teardown",
    time: "Day 0 / 30 min",
    body: "You show me how customers reach you today. I show you exactly where money leaks out. You keep the map whether you hire me or not.",
  },
  {
    no: "02",
    title: "Build",
    time: "Day 1-10",
    body: "I build the whole system: site, agent, follow-up, database. You answer six questions. That is your entire job.",
  },
  {
    no: "03",
    title: "Live",
    time: "Day 11-14",
    body: "We test on real customers, tune the replies into your voice, hand you the keys. Then it runs without either of us.",
  },
];

export const PROBLEMS = [
  "A customer messages at 9pm. You reply at 7am. They already bought from someone else.",
  "You are the bottleneck. Every question, every price, every booking goes through your thumbs.",
  "Leads sit unanswered in WhatsApp. Most of them were still winnable yesterday.",
  "You have no idea how many people asked about you last month. That data is gone.",
];

/* ------------------------------ seed content ------------------------------ */

export const fallbackProfile: Profile = {
  hero_eyebrow: "AUTOMATION SYSTEMS ENGINEER / KIGALI",
  hero_h1: "Your business should make money|while you sleep.",
  hero_sub:
    "I install the system that does it: a site that sells, a WhatsApp agent that answers in seconds, follow-up that never forgets. Built for Rwandan businesses. Live in 14 days.",
  hero_promise:
    "Free teardown. Show me your business and I will map exactly where you are losing customers.",
  about_md:
    "I am Eddie Nyambo. I do not make brochure websites, I install machines that go and get customers. Sites that sell while you sleep, WhatsApp agents that answer in five seconds at 2am, follow-up that chases every lead until they buy or say no. Everything here is deployed and running for a real business in Rwanda today, not sitting in a demo folder.",
  photo_url: "/eddie.jpg",
  stats: [
    { value: "12+", label: "Systems shipped" },
    { value: "5 sec", label: "Average reply time" },
    { value: "24/7", label: "Runs without you" },
    { value: "14", label: "Days to live" },
  ],
};

export const fallbackProjects: Project[] = [
  {
    id: "seed-1",
    title: "StepIn Coaching",
    blurb:
      "A WhatsApp AI agent that qualifies every lead, books the call and runs a 7-day follow-up, plus a live CRM the owner reads from his phone.",
    tags: ["WhatsApp AI", "CRM", "Follow-up"],
    live_url: "https://stepin-crm-dashboard.netlify.app",
    accent: "#F0A64B",
    client: "Jean de Dieu / Kigali",
    year: "2026",
    problem:
      "Leads came in at all hours on WhatsApp. Jean answered when he could, which meant hours late and often never. No record of who asked what.",
    solution:
      "An AI sales agent on the business number that greets, qualifies and books instantly, a 7-day drip that follows up on its own, and a dashboard where every lead and its status lives.",
    result:
      "Every enquiry gets answered in seconds, day or night. Jean updates a lead status by sending one text. Nothing falls through.",
    metrics: [
      { value: "24/7", label: "Coverage" },
      { value: "7-day", label: "Auto follow-up" },
      { value: "0", label: "Leads lost to silence" },
    ],
  },
  {
    id: "seed-2",
    title: "Hotel Eza",
    blurb:
      "A booking agent living on the hotel's own site that collects dates, guests and room type, then hands the front desk a finished booking.",
    tags: ["Booking Agent", "Hospitality"],
    live_url: "https://hotel-eza-chat.netlify.app",
    accent: "#5FD08A",
    client: "Hotel Eza / Rwanda",
    year: "2026",
    problem:
      "Guests asked the same questions over and over and gave up when nobody replied fast enough.",
    solution:
      "A chat agent embedded on the hotel site that answers instantly and walks the guest all the way to a complete booking request.",
    result: "Guests get answers in seconds and the desk receives bookings already filled in.",
    metrics: [
      { value: "<5s", label: "Reply time" },
      { value: "100%", label: "Enquiries answered" },
    ],
  },
  {
    id: "seed-3",
    title: "FarmGate Rwanda",
    blurb:
      "A livestock marketplace where buyers never see a seller's number. Every lead is routed through the platform, on purpose.",
    tags: ["Marketplace", "Next.js", "Supabase"],
    live_url: "https://farmgaterwanda.com",
    accent: "#C98B4B",
    client: "Ferdinand Nzabirinda / Bugesera",
    year: "2026",
    problem:
      "Farmers and buyers met on Facebook, swapped numbers and cut the platform out of every deal.",
    solution:
      "A full marketplace with contact-gating. Buyers send an enquiry through the platform, the owner sees every lead, and an on-site guide answers questions before they bounce.",
    result: "Deals stay on the platform, and the owner finally has a record of demand.",
    metrics: [
      { value: "100%", label: "Leads captured" },
      { value: "0", label: "Contacts leaked" },
    ],
  },
  {
    id: "seed-4",
    title: "Kigali Golden Stay",
    blurb:
      "A scan-once QR menu for a motel covering food, drinks and rooms, where the owner edits prices from his phone and the guest menu updates in six seconds.",
    tags: ["Next.js", "Self-serve CMS", "PWA"],
    live_url: "https://new-wembley.vercel.app",
    accent: "#F5D601",
    client: "Kigali Golden Stay / Kigali",
    year: "2026",
    problem:
      "Reprinting menus every time a price moved, and calling a developer for every change.",
    solution:
      "A bilingual QR menu with an owner's editor: add items, change prices, publish. No database to pay for, installable on his home screen.",
    result:
      "The owner has made 20+ edits himself. First visit loads 335KB, repeat visits load nothing, and it works with the network cut.",
    metrics: [
      { value: "6s", label: "Edit to live" },
      { value: "82%", label: "Lighter images" },
      { value: "0KB", label: "Repeat visit" },
    ],
  },
];

export const fallbackServices: Service[] = [
  {
    id: "s1",
    title: "The website that sells",
    outcome:
      "Not a brochure. A page built to turn a stranger into a booked customer. Fast on Rwandan mobile data, found on Google, and working at 3am.",
    icon: "globe",
  },
  {
    id: "s2",
    title: "WhatsApp AI agent",
    outcome:
      "Answers in five seconds, in your voice, all night. Qualifies the lead, quotes, books the appointment and hands you only the ones worth your time.",
    icon: "chat",
  },
  {
    id: "s3",
    title: "Follow-up that never forgets",
    outcome:
      "Every lead gets chased until they buy or say no. The ones you currently lose to silence become the cheapest customers you will ever get.",
    icon: "repeat",
  },
  {
    id: "s4",
    title: "Operations on autopilot",
    outcome:
      "Orders, bookings, stock, reports and the customer database run themselves, and you get one dashboard that tells you the truth.",
    icon: "chart",
  },
];

export const fallbackSkills: Skill[] = [
  { id: "k1", grp: "Systems", label: "WhatsApp Business API", sort: 1 },
  { id: "k2", grp: "Systems", label: "n8n automation", sort: 2 },
  { id: "k3", grp: "Systems", label: "AI agents", sort: 3 },
  { id: "k4", grp: "Systems", label: "CRM and dashboards", sort: 4 },
  { id: "k5", grp: "Build", label: "Next.js + TypeScript", sort: 11 },
  { id: "k6", grp: "Build", label: "Tailwind", sort: 12 },
  { id: "k7", grp: "Build", label: "Supabase / Postgres", sort: 13 },
  { id: "k8", grp: "Build", label: "Vercel", sort: 14 },
  { id: "k9", grp: "Ship", label: "SEO + Google Business", sort: 21 },
  { id: "k10", grp: "Ship", label: "Analytics", sort: 22 },
  { id: "k11", grp: "Ship", label: "Security and RLS", sort: 23 },
  { id: "k12", grp: "Ship", label: "Handover and training", sort: 24 },
];

export const fallbackTestimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Jean de Dieu",
    role: "StepIn Coaching, Kigali",
    quote:
      "Eddie built our entire WhatsApp sales system. Leads get answered instantly now, even at night. It just runs itself.",
  },
  {
    id: "t2",
    name: "Hotel Eza",
    role: "Hospitality, Rwanda",
    quote:
      "Fast, professional, and the booking agent is exactly what we needed. Guests get answers in seconds.",
  },
];
