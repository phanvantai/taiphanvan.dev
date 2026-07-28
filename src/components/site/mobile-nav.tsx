"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";
import { withLocale, type Locale } from "@/i18n/routing";

export function MobileNav() {
  const pathname = usePathname();
  const locale = useLocale() as Locale;
  const t = useTranslations("Site.nav");

  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button variant="ghost" size="icon-sm" aria-label="Mở menu" className="md:hidden" />
        }
      >
        <MenuIcon />
      </SheetTrigger>
      <SheetContent side="right" className="w-72 p-0">
        <SheetHeader className="border-border/60 border-b">
          <SheetTitle className="site-logo font-mono text-sm">taiphanvan.dev</SheetTitle>
        </SheetHeader>
        <nav className="site-nav flex flex-col gap-1 p-3">
          {siteConfig.nav.map((item, i) => {
            const href = withLocale(locale, item.href);
            const key = item.href.slice(1) as "work" | "blog";
            const isActive = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <SheetClose
                key={item.href}
                nativeButton={false}
                render={
                  <Link
                    href={href}
                    data-active={isActive}
                    data-index={String(i + 1).padStart(2, "0")}
                    className={cn(
                      "site-nav-link rounded-md px-3 py-2.5 text-base transition-colors",
                      isActive
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                    )}
                  >
                    {t(key)}
                  </Link>
                }
              />
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
