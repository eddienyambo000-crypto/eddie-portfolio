import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { NAME } from "@/lib/site";

export const alt = `${NAME}, full-stack developer and AI engineer in Kigali`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** The card that shows up when the link is shared on WhatsApp, LinkedIn or X. */
export default async function OpenGraphImage() {
  const asset = (p: string) => readFile(join(process.cwd(), "assets", p));
  // the site's own typeface; the renderer reads WOFF/TTF, not the WOFF2 the pages use
  const [portrait, regular, bold] = await Promise.all([
    asset("og-portrait.png"),
    asset("fonts/schibsted-grotesk-latin-400.woff"),
    asset("fonts/schibsted-grotesk-latin-700.woff"),
  ]);
  const src = `data:image/png;base64,${portrait.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#F7F5F0",
          color: "#1E1517",
          fontFamily: "Schibsted Grotesk",
          padding: "64px 0 0 72px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", width: 600, paddingBottom: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 22, color: "#5E5254" }}>
            <div style={{ width: 12, height: 12, borderRadius: 12, background: "#6D1A2A" }} />
            Kigali, Rwanda
          </div>
          <div style={{ marginTop: 34, fontSize: 96, fontWeight: 700, letterSpacing: -3.5, lineHeight: 1 }}>
            {NAME}
          </div>
          <div style={{ marginTop: 22, fontSize: 34, lineHeight: 1.3, color: "#5E5254" }}>
            Full-stack developer, AI engineer, designer. I build software businesses run on.
          </div>
          <div style={{ marginTop: "auto", display: "flex" }}>
            <div
              style={{
                display: "flex",
                background: "#6D1A2A",
                color: "#BDE6D1",
                fontSize: 24,
                fontWeight: 700,
                padding: "14px 26px",
                borderRadius: 999,
              }}
            >
              Six products live in production
            </div>
          </div>
        </div>
        <div style={{ position: "relative", display: "flex", flex: 1, alignItems: "flex-end" }}>
          <div
            style={{
              position: "absolute",
              left: 40,
              right: 0,
              bottom: 0,
              height: 400,
              background: "#BDE6D1",
              borderTopLeftRadius: 32,
            }}
          />
          <img src={src} width={540} height={463} style={{ position: "relative", marginLeft: 20 }} alt="" />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Schibsted Grotesk", data: regular, weight: 400, style: "normal" },
        { name: "Schibsted Grotesk", data: bold, weight: 700, style: "normal" },
      ],
    }
  );
}
