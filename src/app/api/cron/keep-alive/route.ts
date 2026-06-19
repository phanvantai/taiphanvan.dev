import { NextResponse } from "next/server";

import { constantTimeEqual } from "@/lib/auth";
import { db } from "@/lib/db";

// Prisma pg adapter opens TCP sockets → must run on Node, not Edge.
export const runtime = "nodejs";
// Never statically cache: this must hit Postgres on every request.
export const dynamic = "force-dynamic";

/**
 * Supabase free-tier keep-alive.
 *
 * Supabase pauses a free project after 7 days of zero DB activity. A scheduled
 * GitHub Action (.github/workflows/keep-alive.yml) curls this route, which runs
 * a trivial real query through the app's Prisma client to reset that timer.
 *
 * Protected by CRON_SECRET via `Authorization: Bearer <secret>`. If CRON_SECRET
 * is set and the header doesn't match, the request is rejected.
 */
export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const header = req.headers.get("authorization") ?? "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : "";
    if (!constantTimeEqual(token, secret)) {
      return NextResponse.json({ ok: false }, { status: 401 });
    }
  }

  try {
    await db.$queryRaw`SELECT 1`;
    return NextResponse.json({ ok: true, ts: new Date().toISOString() });
  } catch {
    return NextResponse.json({ ok: false, error: "db" }, { status: 500 });
  }
}
