import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";

import { getUIStyle, type UIStyle } from "@/lib/ui-style";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

const fontData = readFileSync(join(process.cwd(), "public/fonts/DepartureMono-Regular.otf"));

interface IconDesign {
  background: string;
  primary: string;
  secondary?: string;
  glyph: "T-dot" | "T-cursor" | "T-flat";
  fontSize: number;
  paddingBottom: number;
  border?: string;
}

const DESIGNS: Record<UIStyle, IconDesign> = {
  "cypher-2049": {
    background: "#1a1308",
    primary: "#FFB347",
    secondary: "#FF5A8A",
    glyph: "T-dot",
    fontSize: 22,
    paddingBottom: 2,
  },
  terminal: {
    background: "#0a1410",
    primary: "#7CF2A3",
    glyph: "T-cursor",
    fontSize: 20,
    paddingBottom: 0,
  },
  "neo-brutalist": {
    background: "#FFD84D",
    primary: "#0F0F0F",
    glyph: "T-flat",
    fontSize: 24,
    paddingBottom: 2,
    border: "2px solid #0F0F0F",
  },
};

function renderGlyph(d: IconDesign) {
  if (d.glyph === "T-dot") {
    return (
      <div style={{ display: "flex" }}>
        <div style={{ color: d.primary }}>T</div>
        <div style={{ color: d.secondary }}>.</div>
      </div>
    );
  }
  if (d.glyph === "T-cursor") {
    return (
      <div style={{ display: "flex", color: d.primary }}>
        <div>T</div>
        <div>_</div>
      </div>
    );
  }
  return <div style={{ color: d.primary, fontWeight: 700 }}>T.</div>;
}

export default function Icon() {
  const d = DESIGNS[getUIStyle()];

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: d.background,
        fontFamily: "Departure Mono",
        fontSize: d.fontSize,
        paddingBottom: d.paddingBottom,
        ...(d.border ? { boxSizing: "border-box", border: d.border } : {}),
      }}
    >
      {renderGlyph(d)}
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "Departure Mono",
          data: fontData,
          style: "normal",
          weight: 400,
        },
      ],
    },
  );
}
