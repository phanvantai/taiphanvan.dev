import Link from "next/link";

import { CommandPaletteTrigger } from "@/components/site/command-palette-trigger";
import { LanguageSwitcher } from "@/components/site/language-switcher";
import { MobileNav } from "@/components/site/mobile-nav";
import { Nav } from "@/components/site/nav";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { withLocale, type Locale } from "@/i18n/routing";
import { getLocale } from "next-intl/server";

export async function Header() {
  const locale = (await getLocale()) as Locale;

  return (
    <header className="site-header border-border/60 bg-background/80 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40 w-full border-b backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link href={withLocale(locale, "/")} className="site-logo text-sm font-semibold">
          taiphanvan.dev
        </Link>
        <div className="site-nav-actions flex items-center gap-1">
          <Nav />
          <span
            className="site-nav-divider bg-border mx-1 hidden h-5 w-px md:inline-block"
            aria-hidden
          />
          <CommandPaletteTrigger />
          <LanguageSwitcher />
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
