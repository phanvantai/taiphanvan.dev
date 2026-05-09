import Link from "next/link";
import { GlobeIcon } from "lucide-react";

import { siteConfig } from "@/lib/site-config";

const ICONS: Record<keyof typeof siteConfig.social, string> = {
  github: "GH",
  twitter: "X",
  linkedin: "in",
  facebook: "fb",
};

export function SocialLinks() {
  const entries = Object.entries(siteConfig.social).filter(([, url]) => url.length > 0) as [
    keyof typeof siteConfig.social,
    string,
  ][];

  return (
    <section className="border-border/40 border-t px-4 py-12 sm:px-6">
      <div className="mx-auto flex max-w-3xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="text-muted-foreground font-mono text-xs">/contact</p>
          <h2 className="text-lg font-semibold tracking-tight">Liên hệ</h2>
          <p className="text-muted-foreground text-sm">
            Drop a line nếu bro muốn chat về indie SaaS, AI, hay mobile dev.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {entries.length === 0 && (
            <span className="text-muted-foreground inline-flex items-center gap-1.5 font-mono text-xs">
              <GlobeIcon className="size-3" /> Social link đang cập nhật
            </span>
          )}
          {entries.map(([key, href]) => (
            <Link
              key={key}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="border-border/60 text-muted-foreground hover:border-foreground/40 hover:text-foreground inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 font-mono text-[11px] transition-colors"
            >
              <span className="text-foreground">{ICONS[key]}</span>
              {key}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
