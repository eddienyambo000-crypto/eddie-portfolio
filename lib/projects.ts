/**
 * Every project on the site is live at its URL. Screenshots in /public/work
 * are captures of those live sites, taken on 17 November 2026.
 */

export type Tone = "mint" | "burgundy" | "cloud";

export type Project = {
  slug: string;
  name: string;
  url: string;
  domain: string;
  kind: string;
  when: string;
  summary: string;
  /** which of the seven hats this project needed */
  hats: string[];
  stack: string[];
  situation: string;
  built: string[];
  learned: string;
  facts: { value: string; label: string }[];
  /** anything a visitor should know about what is and isn't switched on yet */
  status?: string;
  tone: Tone;
};

export const PROJECTS: Project[] = [
  {
    slug: "guranova",
    name: "Guranova",
    url: "https://guranova.com",
    domain: "guranova.com",
    kind: "Online store, Kigali",
    when: "November 2026",
    summary:
      "A Kigali shop selling hair care, beauty, sports gear and phone accessories. Customers check out on WhatsApp and pay with MoMo or cash on delivery.",
    hats: ["Product design", "Full-stack", "DevOps", "Motion"],
    stack: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "Vercel"],
    situation:
      "The shop's customers already buy on WhatsApp, mostly on mid-range Android phones and patchy mobile data. A heavy, card-first checkout would have lost them at the first screen.",
    built: [
      "A catalogue in English and Kinyarwanda, with search and delivery fees worked out by area.",
      "Guest checkout that ends in a ready-written WhatsApp order. Payment is MoMo or cash when it arrives.",
      "An admin the owner installs on their phone to add products and photograph them on the spot.",
      "Owner sign-in with a forced password change and two-factor codes on first login.",
      "The opening animation, where a shopping cart folds into the Guranova G.",
    ],
    learned:
      "My first version made every page download a 231 KB splash image. On a throttled phone the cart took up to 14 seconds to become usable. A lazy 19 KB image and less text shipped to the browser brought that under 7. Then iPhones couldn't upload product photos, because Safari can't encode WebP from a canvas, so uploads now fall back to JPEG.",
    facts: [
      { value: "4 days", label: "First commit to launch" },
      { value: "EN / RW", label: "Languages" },
      { value: "MoMo, cash", label: "Payment" },
    ],
    tone: "mint",
  },
  {
    slug: "farmgate",
    name: "FarmGate Rwanda",
    url: "https://farmgaterwanda.com",
    domain: "farmgaterwanda.com",
    kind: "Livestock marketplace, Rwanda",
    when: "June to October 2026",
    summary:
      "A marketplace where keepers list cattle, goats, pigs and poultry, and buyers send enquiries through the platform. Phone numbers stay private.",
    hats: ["Product design", "Full-stack", "AI engineering", "DevOps"],
    stack: ["Next.js", "TypeScript", "Supabase", "Vercel"],
    situation:
      "It began as one HTML page. Buyers and keepers would meet on it, swap numbers and finish the deal somewhere the platform couldn't see, help with or learn from.",
    built: [
      "Contact-gating: buyers never see a seller's number, and every enquiry is routed and recorded.",
      "Keeper accounts, with an owner review queue before any listing goes public.",
      "Private photo uploads and two-factor sign-in for the admin.",
      "Fara, an on-site guide that answers buyers' questions and passes real enquiries to the owner.",
      "English and Kinyarwanda, with a privacy notice and terms.",
    ],
    learned:
      "Some listings look rough, with photos taken in the field on a phone. They're real, and they stay. On a marketplace people are deciding whether to trust strangers, and an honest listing does more for that than a polished stock photo.",
    facts: [
      { value: "0", label: "Seller numbers shown to buyers" },
      { value: "2FA", label: "Admin sign-in" },
      { value: "EN / RW", label: "Languages" },
    ],
    tone: "burgundy",
  },
  {
    slug: "oreste",
    name: "Oreste Utensils",
    url: "https://oresteutensils.com",
    domain: "oresteutensils.com",
    kind: "Kitchenware shop, City Plaza, Kigali",
    when: "July to October 2026",
    summary:
      "Cookware, dinnerware and small appliances from a shop in City Plaza, ordered online and paid for on delivery anywhere in Kigali.",
    hats: ["Design", "Full-stack", "DevOps"],
    stack: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "Vercel"],
    situation:
      "A busy shop with a range nobody could browse without walking in, and an owner with no time to learn a complicated system.",
    built: [
      "A catalogue the owner keeps up to date, photos included, from the admin.",
      "Orders priced on the server: the browser sends products and quantities, never prices.",
      "WhatsApp checkout, with free delivery over 500,000 RWF.",
      "Analytics that load only after a visitor agrees, and security headers on every page.",
      "A printable QR kit that takes customers straight to the shop's Google reviews.",
    ],
    learned:
      "The owner found product categories stressful to keep up, so I took them out and let search and sorting carry the shop. Software should fit how someone actually works, not how a template says a shop is supposed to look.",
    facts: [
      { value: "100", label: "Lighthouse accessibility (mobile)" },
      { value: "100", label: "Lighthouse best practices" },
      { value: "100", label: "Lighthouse SEO" },
    ],
    tone: "cloud",
  },
  {
    slug: "kigali-golden-stay",
    name: "Kigali Golden Stay",
    url: "https://kigaligoldenstay.com",
    domain: "kigaligoldenstay.com",
    kind: "Guest house, Nyakabanda, Kigali",
    when: "September 2026",
    summary:
      "A guest house with its own restaurant, bar and coffee shop. Guests scan a QR code for the menu, and the owner changes the prices from a phone.",
    hats: ["Design", "Full-stack", "DevOps"],
    stack: ["Next.js", "TypeScript", "Vercel"],
    situation:
      "Every price change meant reprinting menus, and every question about a room went through one phone at reception.",
    built: [
      "A QR menu for food, drinks and rooms that the owner edits from a phone.",
      "A website in English and French with rooms, dining, the bar and a gallery.",
      "Booking requests with a reference number, handed to reception on WhatsApp and clearly marked as a request until reception confirms.",
      "Self-hosted fonts that took the first screen from 604 KB down to 381 KB.",
    ],
    learned:
      "I measured six seconds from the owner pressing save to the new price showing on a guest's phone. The owner made more than twenty edits in the first weeks. A system the owner can run alone is the part I'm proudest of.",
    facts: [
      { value: "6 s", label: "From save to a guest's phone" },
      { value: "EN / FR", label: "Languages" },
      { value: "381 KB", label: "First screen" },
    ],
    tone: "mint",
  },
  {
    slug: "morrowline",
    name: "Morrowline",
    url: "https://morrowline.vercel.app",
    domain: "morrowline.vercel.app",
    kind: "Customer support company, US and Rwanda",
    when: "October 2026",
    summary:
      "A managed customer-support company for travel and hospitality brands, being set up between the US and Kigali. Brand, website, assessment, careers and admin.",
    hats: ["Brand and UX", "Full-stack", "DevOps"],
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Vercel"],
    situation:
      "A founder starting a support company needed to look established before the first client, without the site promising anything that wasn't true yet.",
    built: [
      "An art-directed website that reads like a hospitality brand rather than an outsourcing brochure.",
      "A 'design your support operation' assessment and a careers page with résumé uploads.",
      "An admin with roles for owner, sales, recruiting and editing, on its own sign-in: hashed passwords and sessions, and lockout after repeated failures.",
      "A claims register. Addresses, hours and certifications only appear once the founder has verified them.",
    ],
    learned:
      "126 automated tests, 50 unit and 76 end-to-end, were passing before launch. On a throttled phone the main content paints in about two seconds, and nothing on the page jumps as it loads.",
    facts: [
      { value: "126", label: "Automated tests" },
      { value: "~2 s", label: "Main content, slow phone" },
      { value: "0", label: "Layout shift" },
    ],
    status:
      "The website is live. The assessment, careers and admin are built and switch on when the founder connects the database.",
    tone: "burgundy",
  },
  {
    slug: "ai7-optivaro",
    name: "Ai7 Optivaro",
    url: "https://ai7optivaro.com",
    domain: "ai7optivaro.com",
    kind: "AI automation agency, Kigali",
    when: "Since March 2026",
    summary:
      "The Kigali automation agency where I'm the engineer. I build the WhatsApp agents and workflows its clients run on, and I built the agency's own website.",
    hats: ["AI automation", "AI consulting", "Full-stack", "DevOps"],
    stack: ["Next.js", "TypeScript", "Supabase", "n8n", "WhatsApp Business API", "Vercel"],
    situation:
      "Small businesses lose customers in the hours nobody can answer the phone. The agency sells the fix, and I'm the person who builds it.",
    built: [
      "WhatsApp agents that answer, qualify and book customers, and the n8n workflows behind them.",
      "The agency's website, rebuilt from a single HTML file into Next.js, with a blog, team and industry pages, and an admin behind proper sign-in.",
      "A sitemap and llms.txt so search engines and AI assistants can read the site properly.",
    ],
    learned:
      "Rebuilding the agency's site taught me to treat every key in a repository as already public. Secrets live in environment variables, and nothing sensitive is ever sent to the browser.",
    facts: [
      { value: "Mar 2026", label: "First commit" },
      { value: "n8n", label: "Workflow engine" },
    ],
    tone: "cloud",
  },
];

/** Smaller one-page sites, each built in a day (per their git history). Also live. */
export const SMALLER = [
  {
    slug: "grandpa",
    name: "GRANDPA Clothing",
    url: "https://grandpa-clothing.vercel.app",
    note: "Menswear made in Rwanda. A catalogue that orders over WhatsApp.",
    when: "June 2026",
  },
  {
    slug: "acai-oasis",
    name: "Açaí Oasis",
    url: "https://acai-oasis.vercel.app",
    note: "An açaí café in Kimihurura. Menu and WhatsApp ordering.",
    when: "June 2026",
  },
  {
    slug: "keepin-cool",
    name: "Keepin' Cool",
    url: "https://keepin-cool.vercel.app",
    note: "Air conditioning for cars, homes and offices. Booking over WhatsApp.",
    when: "August 2026",
  },
] as const;

export const getProject = (slug: string) => PROJECTS.find((p) => p.slug === slug);

export const shot = (slug: string, kind: "desktop" | "phone") => ({
  src: `/work/${slug}-${kind}.webp`,
  width: kind === "desktop" ? 1600 : 600,
  height: kind === "desktop" ? 1000 : 1298,
});
