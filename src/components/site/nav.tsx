"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="site-nav hidden items-center gap-1 text-sm md:flex">
      {siteConfig.nav.map((item, i) => {
        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            data-active={isActive}
            data-index={String(i + 1).padStart(2, "0")}
            className={cn(
              "site-nav-link rounded-md px-2.5 py-1.5 transition-colors",
              isActive
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
