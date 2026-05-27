import { NextResponse, type NextRequest } from "next/server";

import { defaultLocale, isLocale, withLocale } from "@/i18n/routing";
import { TRACKER_COOKIE_NAME, verifySession } from "@/lib/auth";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === "/") {
    return NextResponse.redirect(new URL(withLocale(defaultLocale, "/"), req.url));
  }

  const parts = pathname.split("/");
  const locale = isLocale(parts[1]) ? parts[1] : defaultLocale;
  const unprefixedPathname = isLocale(parts[1]) ? `/${parts.slice(2).join("/")}` : pathname;

  // Allow login page + login API
  if (unprefixedPathname === "/tools/tracker/login" || pathname === "/api/tracker/login") {
    return NextResponse.next();
  }

  const secret = process.env.TRACKER_COOKIE_SECRET;
  if (!secret) {
    // Misconfiguration → block access (fail closed)
    const url = req.nextUrl.clone();
    url.pathname = withLocale(locale, "/tools/tracker/login");
    url.searchParams.set("error", "config");
    return NextResponse.redirect(url);
  }

  const cookie = req.cookies.get(TRACKER_COOKIE_NAME)?.value;
  const ok = await verifySession(cookie, secret);
  if (ok) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = withLocale(locale, "/tools/tracker/login");
  if (unprefixedPathname !== "/tools/tracker") {
    url.searchParams.set("from", pathname);
  }
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/", "/:locale/tools/tracker/:path*", "/api/tracker/:path*"],
};
