/**
 * Identity, contact and the roles on the flip board.
 *
 * House rule for every file in lib/: nothing here may say something that
 * can't be checked. No invented numbers, testimonials or clients.
 */

export const SITE_URL = "https://eddie-portfolio-gamma.vercel.app";
export const NAME = "Eddie Nyambo";
export const FIRST_NAME = "Eddie";
export const CITY = "Kigali, Rwanda";
export const TIMEZONE = "Africa/Kigali";

export const EMAIL = "ai7optivaro@gmail.com";
export const WHATSAPP = "250791811234";
export const WHATSAPP_PRETTY = "+250 791 811 234";

export const waLink = (text: string) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;

export const WA_HELLO = waLink("Hi Eddie, I found your portfolio. I'd like to talk about a project.");

/** What the flip board cycles through. Order matters: it is the reading order. */
export const ROLES = [
  "Full-stack developer",
  "AI engineer",
  "Automation engineer",
  "UI/UX designer",
  "AI consultant",
  "DevOps engineer",
  "Motion designer",
] as const;

export const NAV = [
  { href: "/#work", label: "Work" },
  { href: "/#what-i-do", label: "What I do" },
  { href: "/#story", label: "Story" },
  { href: "/contact", label: "Contact" },
] as const;

/** Verified from git history across the project repositories (Nov 2026). */
export const SINCE = {
  firstCommit: "6 March 2026",
  repositories: 12,
  commits: "about 340",
};
