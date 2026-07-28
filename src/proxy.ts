import { NextResponse, type NextRequest } from "next/server";

import { defaultLocale, withLocale } from "@/i18n/routing";

export function proxy(req: NextRequest) {
  return NextResponse.redirect(new URL(withLocale(defaultLocale, "/"), req.url));
}

export const config = {
  matcher: ["/"],
};
