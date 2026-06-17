// Types + default content fallback (used if Supabase is empty/unreachable).
// Live content comes from the pf_* Supabase tables; this keeps the site
// rendering beautifully even before/without the DB.

export type Stat = { value: string; label: string };
export type Profile = {
  hero_eyebrow: string;
  hero_h1: string; // text after "|" renders caramel-italic
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
};
export type Service = { id: string; title: string; outcome: string };
export type Skill = { id: string; grp: string; label: string; sort: number };
export type Testimonial = {
  id: string;
  name: string;
  role: string;
  quote: string;
  avatar_url?: string | null;
};

export const WHATSAPP = "250791811234";
export const wa = (text: string) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;

export const fallbackProfile: Profile = {
  hero_eyebrow: "AUTOMATED BUSINESS SYSTEMS · KIGALI, RWANDA",
  hero_h1:
    "I install automated customer-getting systems that|run your entire business for you.",
  hero_sub:
    "Stop drowning in manual WhatsApp chats, follow-ups and admin. I install systems that capture leads, follow up, book customers and run your operations 24/7 — so your business keeps making money even when you put your phone down.",
  hero_promise:
    "Free systems teardown — show me your business and I'll map exactly what to automate first.",
  about_md:
    "I'm Eddie Nyambo — I install automated business systems for Rwandan companies: customer-getting websites, WhatsApp AI agents, automated follow-up and operations that run 24/7 without you. Not pretty brochures — engines that capture customers and run the business while you live your life. Real, deployed systems, not demos.",
  photo_url: "/eddie.jpg",
  stats: [
    { value: "3+", label: "Systems Live" },
    { value: "100%", label: "Delivery Rate" },
    { value: "24/7", label: "Runs Without You" },
    { value: "30-day", label: "Guarantee" },
  ],
};

export const fallbackProjects: Project[] = [
  {
    id: "1",
    title: "Ai7 OPTIVARO",
    blurb:
      "Full agency website + AI chatbot, admin panel and SEO for an automation firm in Kigali.",
    tags: ["Web", "AI", "Automation"],
    live_url: "https://ai7optivaro.com",
    accent: "#B07A4B",
  },
  {
    id: "2",
    title: "FarmGate RW",
    blurb:
      "Livestock marketplace connecting farmers and buyers across Rwanda with a WhatsApp-integrated flow.",
    tags: ["Marketplace", "Web"],
    live_url: "https://farmgate-rw.vercel.app",
    accent: "#6F4E37",
  },
  {
    id: "3",
    title: "StepIn Automation",
    blurb:
      "End-to-end WhatsApp AI sales agent + 7-day drip + CRM for a Kigali coaching business. Runs 24/7.",
    tags: ["AI Agent", "Automation", "WhatsApp"],
    live_url: "https://wa.me/250793154804",
    accent: "#8A5A3C",
  },
];

export const fallbackServices: Service[] = [
  {
    id: "1",
    title: "Customer-Getting Website",
    outcome:
      "Your 24/7 salesperson: a fast, conversion-built site that turns visitors into booked, paying customers.",
  },
  {
    id: "2",
    title: "WhatsApp AI Sales Agent",
    outcome:
      "Captures, qualifies, answers and books leads automatically — day and night, with no human needed.",
  },
  {
    id: "3",
    title: "Automated Follow-Up & CRM",
    outcome:
      "Every lead nurtured, every customer remembered. Follow-ups and records run themselves — no lead goes cold.",
  },
  {
    id: "4",
    title: "Operations Automation",
    outcome:
      "Orders, bookings, reports and admin handled automatically — so nothing slips and you stop doing busywork.",
  },
];

export const fallbackSkills: Skill[] = [
  { id: "1", grp: "24/7 Automated Customer Follow-Up", label: "WhatsApp AI agent", sort: 1 },
  { id: "2", grp: "24/7 Automated Customer Follow-Up", label: "Instant replies", sort: 2 },
  { id: "3", grp: "24/7 Automated Customer Follow-Up", label: "Lead qualifying", sort: 3 },
  { id: "4", grp: "24/7 Automated Customer Follow-Up", label: "Auto booking", sort: 4 },
  { id: "5", grp: "24/7 Automated Customer Follow-Up", label: "No lead goes cold", sort: 5 },
  { id: "6", grp: "Intelligent Business Memory & Database", label: "Every customer remembered", sort: 11 },
  { id: "7", grp: "Intelligent Business Memory & Database", label: "Orders & bookings tracked", sort: 12 },
  { id: "8", grp: "Intelligent Business Memory & Database", label: "Live dashboards", sort: 13 },
  { id: "9", grp: "Intelligent Business Memory & Database", label: "Auto reports", sort: 14 },
  { id: "10", grp: "99.9% Bulletproof Sales Engine", label: "Always-on uptime", sort: 21 },
  { id: "11", grp: "99.9% Bulletproof Sales Engine", label: "Bank-grade security", sort: 22 },
  { id: "12", grp: "99.9% Bulletproof Sales Engine", label: "Lightning fast", sort: 23 },
  { id: "13", grp: "99.9% Bulletproof Sales Engine", label: "You own it all", sort: 24 },
];

export const fallbackTestimonials: Testimonial[] = [
  {
    id: "1",
    name: "Jean de Dieu",
    role: "StepIn Coaching, Kigali",
    quote:
      "Eddie built our entire WhatsApp sales system. Leads get answered instantly now, even at night. It just runs itself.",
  },
  {
    id: "2",
    name: "Hotel Eza",
    role: "Hospitality, Rwanda",
    quote:
      "Fast, professional, and the booking agent is exactly what we needed. Guests get answers in seconds.",
  },
];
