import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { Shell } from "@/components/Shell";
import { CITY, EMAIL, NAME, ROLE, SITE_URL, WHATSAPP_PRETTY } from "@/lib/site";
import "./globals.css";

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

const description =
  "I install the systems that catch your customers, answer them in seconds and book them — websites that sell, WhatsApp AI agents, automatic follow-up. Built in Kigali, live in 14 days.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${NAME} — systems that get you customers while you sleep`,
    template: `%s — ${NAME}`,
  },
  description,
  keywords: [
    "AI automation Rwanda",
    "WhatsApp AI agent Kigali",
    "website developer Kigali",
    "business automation Rwanda",
    "n8n automation engineer",
  ],
  authors: [{ name: NAME }],
  creator: NAME,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: NAME,
    title: `${NAME} — systems that get you customers while you sleep`,
    description,
    locale: "en_RW",
  },
  twitter: {
    card: "summary_large_image",
    title: `${NAME} — ${ROLE}`,
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0A0908",
  colorScheme: "dark",
};

/** Tells Google this is a real person offering a real service in Kigali. */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#eddie`,
      name: NAME,
      jobTitle: ROLE,
      email: `mailto:${EMAIL}`,
      telephone: WHATSAPP_PRETTY,
      url: SITE_URL,
      address: { "@type": "PostalAddress", addressLocality: "Kigali", addressCountry: "RW" },
      knowsAbout: [
        "Business process automation",
        "WhatsApp Business API",
        "AI agents",
        "Next.js",
        "Supabase",
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#service`,
      name: `${NAME} — Automation Systems`,
      description,
      url: SITE_URL,
      provider: { "@id": `${SITE_URL}/#eddie` },
      areaServed: { "@type": "Country", name: "Rwanda" },
      address: { "@type": "PostalAddress", addressLocality: "Kigali", addressCountry: "RW" },
      priceRange: "RWF 450,000+",
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${instrument.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <body>
        <div className="bg-field" aria-hidden />
        <div className="grain" aria-hidden />

        <a
          href="#main"
          className="sr-only rounded-lg bg-amber px-4 py-2 font-medium text-[#17110a] focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100]"
        >
          Skip to content
        </a>

        <Shell />

        <main id="main" className="relative z-10">
          {children}
        </main>

        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Analytics />
      </body>
    </html>
  );
}
