import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

import { siteConfig } from "@/lib/site-config";

export const runtime = "edge";

const TYPE_LABEL: Record<string, string> = {
  blog: "Blog",
  work: "Work",
  page: "Page",
};

function clamp(text: string, max: number): string {
  if (text.length <= max) return text;
  return text.slice(0, max - 1).trimEnd() + "…";
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const titleParam = searchParams.get("title")?.trim() ?? siteConfig.name;
  const subtitleParam = searchParams.get("subtitle")?.trim() ?? siteConfig.description;
  const typeParam = (searchParams.get("type") ?? "page").toLowerCase();

  const title = clamp(titleParam, 110);
  const subtitle = clamp(subtitleParam, 160);
  const typeLabel = TYPE_LABEL[typeParam] ?? "Page";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "72px 80px",
        background: "linear-gradient(135deg, #0A0A0A 0%, #0F0E1F 40%, #1B1233 70%, #2A1A45 100%)",
        color: "#E5E5E5",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Top: type badge + site label */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "8px 18px",
            border: "1px solid rgba(165, 148, 249, 0.4)",
            borderRadius: 999,
            background: "rgba(99, 102, 241, 0.12)",
            color: "#A594F9",
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: 1.5,
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: 999,
              background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
            }}
          />
          {typeLabel}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            color: "#A1A1AA",
            fontFamily: "ui-monospace, SFMono-Regular, monospace",
            fontSize: 22,
          }}
        >
          <div style={{ width: 8, height: 8, borderRadius: 999, background: "#E5E5E5" }} />
          taiphanvan.dev
        </div>
      </div>

      {/* Middle: title + subtitle */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          flex: 1,
          gap: 24,
          paddingTop: 40,
        }}
      >
        <div
          style={{
            fontSize: title.length > 70 ? 64 : 80,
            fontWeight: 700,
            letterSpacing: -2,
            lineHeight: 1.05,
            color: "#FAFAFA",
            display: "flex",
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#A1A1AA",
            lineHeight: 1.4,
            maxWidth: 1000,
            display: "flex",
          }}
        >
          {subtitle}
        </div>
      </div>

      {/* Bottom: author */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 32,
          borderTop: "1px solid rgba(255,255,255,0.08)",
          color: "#A1A1AA",
          fontSize: 24,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 999,
              background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: 20,
              letterSpacing: 1,
            }}
          >
            T
          </div>
          <span style={{ color: "#FAFAFA", fontWeight: 600 }}>{siteConfig.author.name}</span>
        </div>
        <span style={{ fontFamily: "ui-monospace, SFMono-Regular, monospace" }}>{"// 2026"}</span>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      headers: {
        "Cache-Control": "public, immutable, no-transform, max-age=31536000",
      },
    },
  );
}
