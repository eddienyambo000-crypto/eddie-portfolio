import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://eddie-portfolio-gamma.vercel.app"),
  title: "Eddie Nyambo — Automated Business Systems That Run Themselves | Kigali",
  description:
    "I install automated customer-getting systems — websites, WhatsApp AI agents, follow-up & operations — that run your business 24/7 without you. Kigali, Rwanda.",
  openGraph: {
    title: "Eddie Nyambo — Automated Business Engines",
    description:
      "I install systems that capture customers, follow up, book them and run your operations 24/7 — so your business makes money without you.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#FAF7F1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
