import { ImageResponse } from "next/og";
import { CITY, NAME, ROLE } from "@/lib/site";

export const alt = `${NAME} — ${ROLE}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** The card that appears when the link is pasted into WhatsApp. */
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
          background: "#EFECE5",
          color: "#1D2725",
          padding: 72,
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22 }}>
          <span style={{ letterSpacing: 4, textTransform: "uppercase" }}>{NAME}</span>
          <span style={{ letterSpacing: 4, textTransform: "uppercase", color: "#A9ADA1" }}>
            Index
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 960 }}>
          <div style={{ fontSize: 68, lineHeight: 1.08, letterSpacing: -1.5 }}>
            I build the systems your business needs
          </div>
          <div
            style={{
              fontSize: 68,
              lineHeight: 1.08,
              letterSpacing: -1.5,
              fontStyle: "italic",
              color: "#D34F2D",
            }}
          >
            when you&apos;re not there.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 18,
            fontSize: 22,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: "#45504D",
          }}
        >
          <span>{ROLE}</span>
          <span style={{ color: "#A9ADA1" }}>/</span>
          <span>{CITY}</span>
        </div>
      </div>
    ),
    size
  );
}
