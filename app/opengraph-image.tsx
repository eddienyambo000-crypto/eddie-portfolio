import { ImageResponse } from "next/og";
import { CITY, NAME, ROLE } from "@/lib/site";

export const alt = `${NAME} — ${ROLE}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** The card that shows up when the link is pasted into WhatsApp. */
export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0A0908",
          backgroundImage:
            "radial-gradient(900px 600px at 85% -10%, rgba(240,166,75,0.22), transparent 60%)",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: "#F0A64B",
              color: "#17110a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              fontWeight: 700,
            }}
          >
            EN
          </div>
          <div style={{ color: "#F6F2EA", fontSize: 26 }}>{NAME}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ color: "#F6F2EA", fontSize: 76, lineHeight: 1.05, letterSpacing: -2 }}>
            Your business should
          </div>
          <div style={{ color: "#F0A64B", fontSize: 76, lineHeight: 1.05, letterSpacing: -2 }}>
            make money while you sleep.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            color: "#9C938A",
            fontSize: 24,
          }}
        >
          <span>{ROLE}</span>
          <span style={{ color: "#2A2522" }}>/</span>
          <span>{CITY}</span>
          <span style={{ color: "#2A2522" }}>/</span>
          <span style={{ color: "#5FD08A" }}>Live in 14 days</span>
        </div>
      </div>
    ),
    size
  );
}
