import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";

import { getUIStyle, type UIStyle } from "@/lib/ui-style";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const fontData = readFileSync(join(process.cwd(), "public/fonts/DepartureMono-Regular.otf"));

interface AppleDesign {
  background: string;
  primary: string;
  secondary?: string;
  variant: "cypher" | "terminal" | "brutalist" | "minimal";
}

const DESIGNS: Record<UIStyle, AppleDesign> = {
  "cypher-2049": {
    background: "#1a1308",
    primary: "#FFB347",
    secondary: "#FF5A8A",
    variant: "cypher",
  },
  terminal: {
    background: "#0a1410",
    primary: "#7CF2A3",
    variant: "terminal",
  },
  "neo-brutalist": {
    background: "#FFD84D",
    primary: "#0F0F0F",
    variant: "brutalist",
  },
  minimalist: {
    background: "#FAFAFA",
    primary: "#0A0A0A",
    secondary: "#5B6CFF",
    variant: "minimal",
  },
};

function renderArtwork(d: AppleDesign) {
  if (d.variant === "cypher") {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: d.background,
          fontFamily: "Departure Mono",
          position: "relative",
        }}
      >
        {/* Scope corners */}
        <div
          style={{
            position: "absolute",
            top: 14,
            left: 14,
            width: 18,
            height: 18,
            borderTop: `3px solid ${d.secondary}`,
            borderLeft: `3px solid ${d.secondary}`,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 14,
            right: 14,
            width: 18,
            height: 18,
            borderBottom: `3px solid ${d.secondary}`,
            borderRight: `3px solid ${d.secondary}`,
          }}
        />
        {/* Top ID strip */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            color: d.primary,
            fontSize: 14,
            letterSpacing: 4,
            paddingTop: 30,
          }}
        >
          K-V0.1.4
        </div>
        {/* Main glyph */}
        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            fontSize: 92,
            paddingBottom: 6,
          }}
        >
          <div style={{ color: d.primary }}>tài</div>
          <div style={{ color: d.secondary }}>.</div>
        </div>
        {/* Bottom freq strip */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            color: d.secondary,
            fontSize: 12,
            letterSpacing: 3,
            paddingBottom: 22,
          }}
        >
          [ CH 31.7 ]
        </div>
      </div>
    );
  }

  if (d.variant === "terminal") {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: d.background,
          color: d.primary,
          fontFamily: "Departure Mono",
          fontSize: 78,
        }}
      >
        <div style={{ display: "flex", paddingBottom: 6 }}>
          <div>&gt; tai</div>
          <div>_</div>
        </div>
      </div>
    );
  }

  if (d.variant === "minimal") {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: d.background,
          color: d.primary,
          fontFamily: "Departure Mono",
          boxSizing: "border-box",
          border: "1px solid #E5E5E5",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 18,
            left: 22,
            display: "flex",
            color: "#737373",
            fontSize: 11,
            letterSpacing: 3,
          }}
        >
          TAIPHANVAN.DEV
        </div>
        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            fontSize: 102,
            paddingBottom: 8,
            fontWeight: 500,
            letterSpacing: -4,
          }}
        >
          <div>tai</div>
          <div style={{ color: d.secondary }}>.</div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 18,
            right: 22,
            display: "flex",
            color: "#737373",
            fontSize: 11,
            letterSpacing: 3,
          }}
        >
          MMXXVI
        </div>
      </div>
    );
  }

  // brutalist
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: d.background,
        color: d.primary,
        fontFamily: "Departure Mono",
        fontSize: 96,
        boxSizing: "border-box",
        border: "10px solid #0F0F0F",
        fontWeight: 700,
      }}
    >
      <div style={{ paddingBottom: 8, letterSpacing: -2 }}>TAI.</div>
    </div>
  );
}

export default function AppleIcon() {
  const d = DESIGNS[getUIStyle()];

  return new ImageResponse(renderArtwork(d), {
    ...size,
    fonts: [
      {
        name: "Departure Mono",
        data: fontData,
        style: "normal",
        weight: 400,
      },
    ],
  });
}
