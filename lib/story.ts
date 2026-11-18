/**
 * The story, told backwards. Months and dates come from each project's git
 * history; `month` drives the rolling counter in the story section.
 */
export type Chapter = {
  month: string; // two digits, rolls on the counter
  when: string;
  title: string;
  body: string;
  project?: string; // slug of the case study it points to
};

export const CHAPTERS: Chapter[] = [
  {
    month: "11",
    when: "November 2026",
    title: "Four days, empty repo to live shop.",
    body: "Guranova's first commit landed on the 12th. By the 15th it was a live, indexed store with WhatsApp checkout, two languages and an admin on the owner's phone. Along the way I halved how long a cheap phone waits for a usable cart.",
    project: "guranova",
  },
  {
    month: "10",
    when: "October 2026",
    title: "A company's whole front door, before its first client.",
    body: "Morrowline needed a brand, a website, an assessment, a careers page and an admin with roles, for a support company that hadn't launched yet. 126 tests held it together.",
    project: "morrowline",
  },
  {
    month: "09",
    when: "September 2026",
    title: "A guest house that edits its own menu.",
    body: "It started as a QR menu at Kigali Golden Stay so the owner could stop reprinting prices. Two weeks later it was a full website in English and French, on its own domain.",
    project: "kigali-golden-stay",
  },
  {
    month: "07",
    when: "July 2026",
    title: "A shop in City Plaza goes online.",
    body: "Oreste Utensils: a full catalogue, WhatsApp checkout and prices checked on the server. Later I took features out because the owner found them stressful. That was the right call.",
    project: "oreste",
  },
  {
    month: "06",
    when: "June 2026",
    title: "Two rebuilds in the same week.",
    body: "FarmGate grew from a single HTML page into a real marketplace built around private contacts, and the agency's own website moved from static HTML to Next.js. Earlier that month, two one-page sites, a day each.",
    project: "farmgate",
  },
  {
    month: "03",
    when: "March 2026",
    title: "First commit.",
    body: "On 6 March I made the first commit on the website of Ai7 Optivaro, the agency where I build WhatsApp agents and automations for small businesses in Kigali. Everything on this page has happened since.",
    project: "ai7-optivaro",
  },
];

export const HATS = [
  {
    title: "Full-stack development",
    body: "Next.js, TypeScript and Postgres, from the database schema to the last button. Prices are worked out on the server, admins sign in with two factors, and it all works on a phone.",
    seen: ["guranova", "oreste", "farmgate"],
  },
  {
    title: "AI engineering",
    body: "Language models where they earn their place, kept on a short leash. FarmGate's on-site guide answers buyers and hands real enquiries to a person.",
    seen: ["farmgate", "ai7-optivaro"],
  },
  {
    title: "AI automation",
    body: "WhatsApp agents and n8n workflows that answer, qualify, book and follow up while the business is closed.",
    seen: ["ai7-optivaro"],
  },
  {
    title: "UI/UX design",
    body: "Designed for a mid-range Android phone on mobile data first. If it's quick and obvious there, it's quick and obvious everywhere.",
    seen: ["guranova", "kigali-golden-stay", "morrowline"],
  },
  {
    title: "AI consulting",
    body: "Working out with a business owner what's worth automating and what isn't. The honest answer is often a smaller system than they expected.",
    seen: ["ai7-optivaro"],
  },
  {
    title: "DevOps",
    body: "Deploys, databases, row-level security, migrations, secrets and security headers. The part nobody sees until it breaks.",
    seen: ["farmgate", "oreste", "morrowline"],
  },
  {
    title: "Motion design",
    body: "Small, deliberate motion. Guranova's cart folding into its G, and the flip board at the top of this page.",
    seen: ["guranova"],
  },
] as const;

export const PRINCIPLES = [
  {
    title: "You talk to the person doing the work.",
    body: "No account managers. I design it, build it, ship it, and I'm the one who answers when something breaks.",
  },
  {
    title: "You own all of it.",
    body: "Code, data, domains and accounts sit in your name. Leaving me should be easy.",
  },
  {
    title: "Phones first.",
    body: "Every screen is checked on a narrow phone before a laptop, because that's where your customers are.",
  },
  {
    title: "Nothing on this page is made up.",
    body: "Every number comes from a real project. The links are live. Open them and check.",
  },
] as const;
