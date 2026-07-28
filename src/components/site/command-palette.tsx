"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  ArrowRightIcon,
  FileTextIcon,
  HomeIcon,
  LaptopIcon,
  MoonIcon,
  SunIcon,
  WrenchIcon,
} from "lucide-react";

import { useTheme } from "@/components/site/theme-provider";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { siteConfig } from "@/lib/site-config";
import { withLocale, type Locale } from "@/i18n/routing";

export const COMMAND_PALETTE_OPEN_EVENT = "command-palette:open";

interface PostHit {
  slug: string;
  title: string;
  description: string;
  tags: string[];
}

interface Props {
  posts: PostHit[];
}

const NAV_ICONS: Record<string, typeof HomeIcon> = {
  "/": HomeIcon,
  "/work": WrenchIcon,
  "/blog": FileTextIcon,
  "/about": HomeIcon,
  "/now": HomeIcon,
};

export function CommandPalette({ posts }: Props) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { setTheme } = useTheme();
  const locale = useLocale() as Locale;
  const t = useTranslations("Site.command");
  const tNav = useTranslations("Site.nav");

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    }
    function onCustom() {
      setOpen(true);
    }
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener(COMMAND_PALETTE_OPEN_EVENT, onCustom);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener(COMMAND_PALETTE_OPEN_EVENT, onCustom);
    };
  }, []);

  function go(href: string) {
    setOpen(false);
    router.push(withLocale(locale, href));
  }

  function pickTheme(theme: "light" | "dark" | "system") {
    setOpen(false);
    setTheme(theme);
  }

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder={t("placeholder")} />
      <CommandList>
        <CommandEmpty>{t("empty")}</CommandEmpty>

        <CommandGroup heading={t("pages")}>
          {siteConfig.nav.map((item) => {
            const Icon = NAV_ICONS[item.href] ?? ArrowRightIcon;
            const key = item.href.slice(1) as "work" | "blog";
            return (
              <CommandItem
                key={item.href}
                value={`page ${tNav(key)} ${item.href}`}
                onSelect={() => go(item.href)}
              >
                <Icon />
                {tNav(key)}
                <CommandShortcut>{withLocale(locale, item.href)}</CommandShortcut>
              </CommandItem>
            );
          })}
        </CommandGroup>

        {posts.length > 0 && (
          <>
            <CommandSeparator />
            <CommandGroup heading={t("blogPosts")}>
              {posts.map((post) => (
                <CommandItem
                  key={post.slug}
                  value={`post ${post.title} ${post.tags.join(" ")} ${post.description}`}
                  onSelect={() => go(`/blog/${post.slug}`)}
                >
                  <FileTextIcon />
                  <div className="flex flex-1 flex-col">
                    <span>{post.title}</span>
                    {post.tags.length > 0 && (
                      <span className="text-muted-foreground font-mono text-[10px]">
                        {post.tags.map((t) => `#${t}`).join(" ")}
                      </span>
                    )}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        )}

        <CommandSeparator />
        <CommandGroup heading={t("theme")}>
          <CommandItem value="theme light" onSelect={() => pickTheme("light")}>
            <SunIcon />
            {t("light")}
          </CommandItem>
          <CommandItem value="theme dark" onSelect={() => pickTheme("dark")}>
            <MoonIcon />
            {t("dark")}
          </CommandItem>
          <CommandItem value="theme system" onSelect={() => pickTheme("system")}>
            <LaptopIcon />
            {t("system")}
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
