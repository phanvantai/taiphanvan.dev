"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

import { withLocale, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

export function Nav() {
  const pathname = usePathname();
  const locale = useLocale() as Locale;
  const t = useTranslations("Site.nav");

  return (
    <nav className="site-nav hidden items-center gap-1 text-sm md:flex">
      {siteConfig.nav.map((item, i) => {
        const href = withLocale(locale, item.href);
        const key = item.href.slice(1) as "work" | "blog" | "tools";
        const isActive = pathname === href || pathname.startsWith(`${href}/`);
        return (
          <Link
            key={item.href}
            href={href}
            data-active={isActive}
            data-index={String(i + 1).padStart(2, "0")}
            className={cn(
              "site-nav-link rounded-md px-2.5 py-1.5 transition-colors",
              isActive
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
            )}
          >
            {t(key)}
          </Link>
        );
      })}
    </nav>
  );
}
