/**
 * Content types + seed fallback.
 *
 * Live content comes from the pf_* Supabase tables; this keeps the site whole
 * when the DB is empty or unreachable.
 *
 * Rule for this file: nothing in here may assert something that has not been
 * verified. No invented metrics, no testimonials nobody said, no scarcity.
 * Every project below links to a system that was running when it was written,
 * and every image in /public/work is a real capture of that system.
 */

export type Stat = { value: string; label: string };

export type Profile = {
  hero_eyebrow: string;
  /** text after "|" is set in the accent italic */
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
  client?: string | null;
  year?: string | null;
  problem?: string | null;
  solution?: string | null;
  result?: string | null;
  metrics?: { value: string; label: string }[] | null;
  /** portrait captures (a phone screen) are framed differently to wide ones */
  shape?: "wide" | "tall";
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
export const ROLE = "Independent Systems Engineer";
export const CITY = "Kigali, Rwanda";
export const EMAIL = "ai7optivaro@gmail.com";
export const WHATSAPP = "250791811234";
export const WHATSAPP_PRETTY = "+250 791 811 234";
export const CALENDAR = "https://calendar.app.google/EBdnYtCDFWenPeLf7";

export const wa = (text: string) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;

export const WA_DEFAULT = wa(
  "Hi Eddie - I saw your site. I have a problem I think you could solve. Can we talk?"
);

/** URL-safe slug from a project title, so /work/[slug] needs no DB column. */
export const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

/* ------------------------------- the index -------------------------------- */

export type IndexRow = {
  no: string;
  href: string;
  label: string;
  line: string;
  /** which capture the image stage shows while this row is active */
  preview: string | null;
};

export const INDEX_ROWS: IndexRow[] = [
  {
    no: "01",
    href: "/work",
    label: "Selected Work",
    line: "Real projects. Real businesses.",
    preview: "/work/kigali-golden-stay.webp",
  },
  {
    no: "02",
    href: "/services",
    label: "Services",
    line: "What I can build for you.",
    preview: "/work/hotel-eza.webp",
  },
  {
    no: "03",
    href: "/about",
    label: "About Me",
    line: "The person behind the work.",
    preview: null, // the portrait stays
  },
  {
    no: "04",
    href: "/contact",
    label: "Let's Talk",
    line: "Tell me what you need.",
    preview: "/work/farmgate-rwanda.webp",
  },
];

/* ------------------------------- the offer -------------------------------- */

export const OFFER = {
  name: "The 14-Day Customer Engine",
  promise:
    "A website, a WhatsApp agent that answers for you, and follow-up that keeps running after the conversation ends.",
  price: "From RWF 450,000",
  priceNote: "One build fee. You own everything. No monthly lock-in.",
  timeline: "Built in 14 days",
  includes: [
    "A website built to turn visitors into enquiries",
    "A WhatsApp agent that answers and qualifies around the clock",
    "Automatic follow-up so enquiries do not go cold",
    "A customer record and dashboard you control",
    "Google Business and search setup",
    "30 days of fixes and tuning after launch",
  ],
};

export const PROCESS = [
  {
    no: "01",
    title: "Teardown",
    time: "Day 0",
    body: "You show me how customers reach you today. I map where they fall out. You keep that map whether you hire me or not.",
  },
  {
    no: "02",
    title: "Build",
    time: "Day 1-10",
    body: "I build the system. You answer six questions. That is the whole of your involvement.",
  },
  {
    no: "03",
    title: "Handover",
    time: "Day 11-14",
    body: "We test on real customers, tune the replies into your voice, and I hand you the keys and the logins.",
  },
];

/* ------------------------------ seed content ------------------------------ */

export const fallbackProfile: Profile = {
  hero_eyebrow: "INDEPENDENT SYSTEMS ENGINEER / KIGALI, RWANDA",
  hero_h1: "I build the systems your business needs|when you're not there.",
  hero_sub:
    "Websites, WhatsApp agents, and automation that turn enquiries into customers.",
  hero_promise:
    "Tell me how customers reach you today and I will map where they fall out.",
  about_md:
    "I am Eddie Nyambo. I build and deploy software for businesses in Rwanda, and I work with the owner directly from the first conversation to the handover. Most of what I build does one of two things: it answers people faster than a human can, or it remembers things a busy team cannot. Everything on this site is running for a real business today.",
  photo_url: "/eddie.jpg",
  stats: [],
};

export const fallbackProjects: Project[] = [
  {
    id: "seed-kgs",
    title: "Kigali Golden Stay",
    blurb:
      "A guest house site with rooms, restaurant, bar and coffee shop, and a QR menu the owner edits himself from his phone.",
    tags: ["Website", "Self-serve CMS", "Hospitality"],
    cover_url: "/work/kigali-golden-stay.webp",
    live_url: "https://kigaligoldenstay.com",
    client: "Kigali Golden Stay",
    year: "2026",
    shape: "wide",
    problem:
      "Printed menus had to be reprinted whenever a price moved, and every change meant calling a developer.",
    solution:
      "A bilingual public site and a QR menu that reads from the motel's own database, plus an editor the owner opens on his phone to change prices, rename dishes, and add or remove items.",
    result:
      "The owner has been making his own edits since launch, and the guest menu updates within seconds of him pressing save.",
    metrics: [
      { value: "EN / FR", label: "Bilingual" },
      { value: "Seconds", label: "Edit to live" },
    ],
  },
  {
    id: "seed-oreste",
    title: "Oreste Utensils",
    blurb:
      "A kitchenware shop in City Plaza given a full catalogue online, with WhatsApp checkout and cash or MoMo on delivery.",
    tags: ["E-commerce", "Next.js", "Supabase"],
    cover_url: "/work/oreste-utensils.webp",
    live_url: "https://oresteutensils.com",
    client: "Oreste Utensils, City Plaza",
    year: "2026",
    shape: "wide",
    problem:
      "A busy physical shop with no way for customers to see the range or order without walking in.",
    solution:
      "A catalogue with prices the owner maintains himself, orders placed over WhatsApp, delivery across Kigali, and payment taken in cash or MoMo when the box arrives.",
    result:
      "Customers can browse and order the whole range from a phone, and the shop keeps serving the people who still walk in.",
    metrics: [
      { value: "Cash / MoMo", label: "Paid on delivery" },
      { value: "Kigali-wide", label: "Delivery" },
    ],
  },
  {
    id: "seed-farmgate",
    title: "FarmGate Rwanda",
    blurb:
      "A livestock marketplace where buyers and keepers meet through the platform and phone numbers stay private.",
    tags: ["Marketplace", "Next.js", "Supabase"],
    cover_url: "/work/farmgate-rwanda.webp",
    live_url: "https://farmgaterwanda.com",
    client: "Ferdinand Nzabirinda, Bugesera",
    year: "2026",
    shape: "wide",
    problem:
      "Farmers and buyers were meeting on Facebook, swapping numbers, and completing deals where the platform could neither help nor see them.",
    solution:
      "A bilingual marketplace with contact-gating: every enquiry is routed through the platform, keeper accounts are reviewed before listings go live, and an on-site guide answers buyer questions.",
    result:
      "Enquiries are captured and owned by the platform instead of disappearing into private chats.",
    metrics: [
      { value: "Private", label: "Seller numbers" },
      { value: "EN / RW", label: "Bilingual" },
    ],
  },
  {
    id: "seed-eza",
    title: "Hotel Eza",
    blurb:
      "Keza, a booking agent that lives on the hotel's own site, answers guests instantly and collects a complete booking request.",
    tags: ["AI agent", "Booking", "Hospitality"],
    cover_url: "/work/hotel-eza.webp",
    live_url: "https://hotel-eza-chat.netlify.app",
    client: "Hotel Eza, Kigali",
    year: "2026",
    shape: "tall",
    problem:
      "Guests asked the same handful of questions at all hours and gave up when nobody answered quickly enough.",
    solution:
      "A chat agent embedded on the hotel site that greets the guest, answers questions about rooms and rates, and walks them to a complete booking request for the front desk.",
    result:
      "Guests get an answer at any hour, and the desk receives requests with the dates and details already filled in.",
    metrics: [
      { value: "24/7", label: "Answering" },
      { value: "Web", label: "No app needed" },
    ],
  },
  {
    id: "seed-stepin",
    title: "StepIn Coaching",
    blurb:
      "A WhatsApp sales agent and CRM for a Kigali coaching business: it qualifies the lead, books the call, and keeps following up.",
    tags: ["WhatsApp agent", "CRM", "Automation"],
    cover_url: null, // no capture that is not an empty dashboard — set typographically
    live_url: null,
    client: "Jean de Dieu, Kigali",
    year: "2026",
    shape: "wide",
    problem:
      "Enquiries arrived on WhatsApp at every hour. They were answered when the owner had a free moment, which often meant hours later.",
    solution:
      "An agent on the business number that greets and qualifies every enquiry, books the strategy call, and runs a seven-day follow-up sequence, with a dashboard where the owner updates a lead's status by sending one text.",
    result:
      "Enquiries get an immediate reply at any hour instead of waiting for the owner to be free.",
    metrics: null,
  },
];

export const fallbackServices: Service[] = [
  {
    id: "s1",
    title: "High-converting websites",
    outcome:
      "A site built so a stranger can understand what you do, trust you, and contact you without friction. Fast on Rwandan mobile data, and findable on Google.",
    icon: "globe",
  },
  {
    id: "s2",
    title: "WhatsApp AI agents",
    outcome:
      "An agent on your business number that answers enquiries, qualifies them, and handles booking, in your voice and at any hour.",
    icon: "chat",
  },
  {
    id: "s3",
    title: "Automated follow-up",
    outcome:
      "Workflows that keep responding after the first message, so the enquiries you already paid to get do not quietly go cold.",
    icon: "repeat",
  },
  {
    id: "s4",
    title: "Custom business automation",
    outcome:
      "Dashboards, databases, and internal tools that take the repetitive work off your team and put your records in one place.",
    icon: "chart",
  },
];

export const fallbackSkills: Skill[] = [
  { id: "k1", grp: "Systems", label: "WhatsApp Business API", sort: 1 },
  { id: "k2", grp: "Systems", label: "AI agents", sort: 2 },
  { id: "k3", grp: "Systems", label: "n8n automation", sort: 3 },
  { id: "k4", grp: "Build", label: "Next.js + TypeScript", sort: 11 },
  { id: "k5", grp: "Build", label: "Supabase / Postgres", sort: 12 },
  { id: "k6", grp: "Build", label: "Tailwind", sort: 13 },
  { id: "k7", grp: "Ship", label: "Vercel", sort: 21 },
  { id: "k8", grp: "Ship", label: "SEO + Google Business", sort: 22 },
  { id: "k9", grp: "Ship", label: "Handover + training", sort: 23 },
];

/**
 * Deliberately empty.
 *
 * The previous build shipped quotes attributed to real, named clients that
 * those clients never gave. Testimonials appear here only when they come from
 * the CMS, where /share records them with explicit consent.
 */
export const fallbackTestimonials: Testimonial[] = [];
