import { NextResponse, type NextRequest } from "next/server";

import { TRACKER_COOKIE_NAME, verifySession } from "@/lib/auth";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow login page + login API
  if (pathname === "/tools/tracker/login" || pathname === "/api/tracker/login") {
    return NextResponse.next();
  }

  const secret = process.env.TRACKER_COOKIE_SECRET;
  if (!secret) {
    // Misconfiguration → block access (fail closed)
    const url = req.nextUrl.clone();
    url.pathname = "/tools/tracker/login";
    url.searchParams.set("error", "config");
    return NextResponse.redirect(url);
  }

  const cookie = req.cookies.get(TRACKER_COOKIE_NAME)?.value;
  const ok = await verifySession(cookie, secret);
  if (ok) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = "/tools/tracker/login";
  if (pathname !== "/tools/tracker") {
    url.searchParams.set("from", pathname);
  }
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/tools/tracker/:path*", "/api/tracker/:path*"],
};
