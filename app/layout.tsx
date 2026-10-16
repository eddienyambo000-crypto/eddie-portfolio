import type { Metadata, Viewport } from "next";
import { Archivo, Newsreader } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SiteFooter, SiteHeader } from "@/components/Chrome";
import { CITY, EMAIL, NAME, ROLE, SITE_URL, WHATSAPP_PRETTY } from "@/lib/site";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-archivo",
  display: "swap",
});
const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

const description =
  "Eddie Nyambo builds websites, WhatsApp agents and business automation for companies in Kigali, Rwanda — systems that answer customers and keep working when you are not there.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${NAME} — ${ROLE}, Kigali`,
    template: `%s — ${NAME}`,
  },
  description,
  keywords: [
    "web developer Kigali",
    "WhatsApp AI agent Rwanda",
    "business automation Rwanda",
    "software engineer Kigali",
  ],
  authors: [{ name: NAME }],
  creator: NAME,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: NAME,
    title: `${NAME} — ${ROLE}`,
    description,
    locale: "en_RW",
  },
  twitter: { card: "summary_large_image", title: `${NAME} — ${ROLE}`, description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#EFECE5",
  colorScheme: "light",
};

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
        "Web development",
        "WhatsApp Business API",
        "AI agents",
        "Business process automation",
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#service`,
      name: NAME,
      description,
      url: SITE_URL,
      provider: { "@id": `${SITE_URL}/#eddie` },
      areaServed: { "@type": "Country", name: "Rwanda" },
      address: { "@type": "PostalAddress", addressLocality: "Kigali", addressCountry: "RW" },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${newsreader.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only bg-ink px-4 py-2 text-paper focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100]"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
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
