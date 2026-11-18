import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { CITY, NAME, ROLES, SITE_URL } from "@/lib/site";
import { PROJECTS } from "@/lib/projects";
import "./globals.css";

// Self-hosted (SIL Open Font License), Latin subsets only: 80 KB for all three.
// Builds never depend on a font CDN, and visitors never wait on one.
const schibsted = localFont({
  src: "./fonts/schibsted-grotesk-latin-var.woff2",
  weight: "400 900",
  variable: "--font-schibsted",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});
const anton = localFont({
  src: "./fonts/anton-latin-400.woff2",
  weight: "400",
  variable: "--font-anton",
  display: "swap",
  fallback: ["Arial Narrow", "sans-serif"],
});
const plexMono = localFont({
  src: "./fonts/ibm-plex-mono-latin-500.woff2",
  weight: "500",
  variable: "--font-plex-mono",
  display: "swap",
  preload: false,
  fallback: ["ui-monospace", "monospace"],
});

const description =
  "Eddie Nyambo, full-stack developer and AI engineer in Kigali. Designing, building and running live products for businesses: online shops, a livestock marketplace, a guest house and a support company.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${NAME}: full-stack developer and AI engineer, Kigali`,
    template: `%s · ${NAME}`,
  },
  description,
  alternates: { canonical: "/" },
  authors: [{ name: NAME, url: SITE_URL }],
  creator: NAME,
  openGraph: {
    type: "profile",
    url: SITE_URL,
    siteName: NAME,
    title: `${NAME}: full-stack developer and AI engineer`,
    description,
    locale: "en_GB",
  },
  twitter: { card: "summary_large_image", title: NAME, description },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#F7F5F0",
  colorScheme: "light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#eddie`,
  name: NAME,
  url: SITE_URL,
  image: `${SITE_URL}/eddie/portrait.webp`,
  jobTitle: "Full-stack developer and AI engineer",
  address: { "@type": "PostalAddress", addressLocality: "Kigali", addressCountry: "RW" },
  homeLocation: CITY,
  knowsAbout: [...ROLES, "Next.js", "TypeScript", "Supabase", "PostgreSQL", "n8n", "WhatsApp Business API"],
  workExample: PROJECTS.map((p) => ({ "@type": "CreativeWork", name: p.name, url: p.url })),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${schibsted.variable} ${anton.variable} ${plexMono.variable}`}>
      <body id="top">
        <a className="skip" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Reveal />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
