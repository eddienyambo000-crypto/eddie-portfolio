import type { NextConfig } from "next";

/*
 * Every page is static. The only script that isn't Next's own is the JSON-LD
 * block, so 'unsafe-inline' is limited to what the framework needs to hydrate.
 */
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
          },
        ],
      },
    ];
  },
  // the previous version of the site had these pages; send old links somewhere useful
  async redirects() {
    return [
      { source: "/work", destination: "/#work", permanent: true },
      { source: "/services", destination: "/#what-i-do", permanent: true },
      { source: "/about", destination: "/#story", permanent: true },
      { source: "/system", destination: "/#work", permanent: true },
      { source: "/admin", destination: "/", permanent: true },
      { source: "/share", destination: "/contact", permanent: true },
      { source: "/work/stepin-coaching", destination: "/#work", permanent: true },
      { source: "/work/hotel-eza", destination: "/#work", permanent: true },
      { source: "/work/oreste-utensils", destination: "/work/oreste", permanent: true },
      { source: "/work/farmgate-rwanda", destination: "/work/farmgate", permanent: true },
    ];
  },
};

export default nextConfig;
