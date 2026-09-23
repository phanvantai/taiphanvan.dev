import { NextResponse, type NextRequest } from "next/server";

import { defaultLocale, withLocale } from "@/i18n/routing";

/**
 * Every page lives under `/{locale}`. Requests that arrive without a locale
 * prefix (`/`, `/work/examino`, an old shared link) are redirected to the
 * default locale instead of falling through to a 404.
 *
 * Static assets in `public/` share these prefixes (`/blog/<slug>/cover.webp`),
 * so anything that looks like a file is left alone.
 */
const FILE_EXTENSION = /\.[a-z0-9]+$/i;

export function proxy(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  if (FILE_EXTENSION.test(pathname)) return NextResponse.next();

  const url = new URL(withLocale(defaultLocale, pathname) + search, req.url);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/", "/(blog|work|about|now)/:path*", "/(blog|work|about|now)"],
};
