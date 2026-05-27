"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

import { locales, switchLocalePath, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
  const activeLocale = useLocale() as Locale;
  const pathname = usePathname();
  const t = useTranslations("Site.language");

  return (
    <div
      aria-label={t("label")}
      className="border-border/60 hidden items-center overflow-hidden rounded-md border font-mono text-[10px] md:flex"
    >
      {locales.map((locale) => (
        <Link
          key={locale}
          href={switchLocalePath(pathname, locale)}
          aria-current={locale === activeLocale ? "true" : undefined}
          className={cn(
            "px-2 py-1 transition-colors",
            locale === activeLocale
              ? "bg-foreground text-background"
              : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
          )}
        >
          {t(locale)}
        </Link>
      ))}
    </div>
  );
}
