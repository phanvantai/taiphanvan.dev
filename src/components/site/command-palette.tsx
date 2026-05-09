"use client";

import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
  ArrowRightIcon,
  FileTextIcon,
  HomeIcon,
  LaptopIcon,
  MoonIcon,
  SunIcon,
  WrenchIcon,
} from "lucide-react";

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
  "/tools": WrenchIcon,
  "/about": HomeIcon,
  "/now": HomeIcon,
};

export function CommandPalette({ posts }: Props) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { setTheme } = useTheme();

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
    router.push(href);
  }

  function pickTheme(theme: "light" | "dark" | "system") {
    setOpen(false);
    setTheme(theme);
  }

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search bài, navigate, đổi theme..." />
      <CommandList>
        <CommandEmpty>Không tìm thấy gì.</CommandEmpty>

        <CommandGroup heading="Pages">
          {siteConfig.nav.map((item) => {
            const Icon = NAV_ICONS[item.href] ?? ArrowRightIcon;
            return (
              <CommandItem
                key={item.href}
                value={`page ${item.label} ${item.href}`}
                onSelect={() => go(item.href)}
              >
                <Icon />
                {item.label}
                <CommandShortcut>{item.href}</CommandShortcut>
              </CommandItem>
            );
          })}
          <CommandItem value="page tracker /tools/tracker" onSelect={() => go("/tools/tracker")}>
            <WrenchIcon />
            Side Project Tracker
            <CommandShortcut>/tools/tracker</CommandShortcut>
          </CommandItem>
        </CommandGroup>

        {posts.length > 0 && (
          <>
            <CommandSeparator />
            <CommandGroup heading="Blog posts">
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
        <CommandGroup heading="Theme">
          <CommandItem value="theme light" onSelect={() => pickTheme("light")}>
            <SunIcon />
            Light
          </CommandItem>
          <CommandItem value="theme dark" onSelect={() => pickTheme("dark")}>
            <MoonIcon />
            Dark
          </CommandItem>
          <CommandItem value="theme system" onSelect={() => pickTheme("system")}>
            <LaptopIcon />
            System
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
