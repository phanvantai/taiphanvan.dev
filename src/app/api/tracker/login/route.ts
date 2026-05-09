import { NextResponse } from "next/server";
import { z } from "zod";

import {
  TRACKER_COOKIE_NAME,
  TRACKER_SESSION_DAYS,
  constantTimeEqual,
  createSession,
  getEnvOrThrow,
} from "@/lib/auth";

export const runtime = "edge";

const loginSchema = z.object({
  password: z.string().min(1, "Password không được trống").max(200),
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Bad input" }, { status: 400 });
  }

  const expected = getEnvOrThrow("TRACKER_PASSWORD");
  if (!constantTimeEqual(parsed.data.password, expected)) {
    return NextResponse.json({ ok: false, error: "Sai password" }, { status: 401 });
  }

  const secret = getEnvOrThrow("TRACKER_COOKIE_SECRET");
  const session = await createSession(secret);

  const res = NextResponse.json({ ok: true });
  res.cookies.set(TRACKER_COOKIE_NAME, session.value, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: TRACKER_SESSION_DAYS * 86400,
    expires: session.expiresAt,
  });
  return res;
}
