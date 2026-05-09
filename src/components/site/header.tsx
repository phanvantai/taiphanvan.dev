import Link from "next/link";

import { CommandPaletteTrigger } from "@/components/site/command-palette-trigger";
import { MobileNav } from "@/components/site/mobile-nav";
import { Nav } from "@/components/site/nav";
import { ThemeToggle } from "@/components/site/theme-toggle";

export function Header() {
  return (
    <header className="border-border/60 bg-background/80 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40 w-full border-b backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-mono text-sm font-semibold">
          <span className="bg-foreground inline-block size-2 rounded-full" />
          taiphanvan.dev
        </Link>
        <div className="flex items-center gap-1">
          <Nav />
          <span className="bg-border mx-1 hidden h-5 w-px md:inline-block" aria-hidden />
          <CommandPaletteTrigger />
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
