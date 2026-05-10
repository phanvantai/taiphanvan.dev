import Link from "next/link";
import { GlobeIcon } from "lucide-react";

import { siteConfig } from "@/lib/site-config";

const HANDLE: Record<keyof typeof siteConfig.social, string> = {
  github: "github",
  twitter: "twitter",
  linkedin: "linkedin",
  facebook: "facebook",
};

export function SocialLinksTerminal() {
  const entries = Object.entries(siteConfig.social).filter(([, url]) => url.length > 0) as [
    keyof typeof siteConfig.social,
    string,
  ][];

  return (
    <section className="border-border tm-scanlines border-t">
      <div className="mx-auto max-w-4xl space-y-4 px-4 py-12 sm:px-6 sm:py-16">
        <p className="text-muted-foreground text-xs">
          <span className="text-accent">$</span> finger tai
        </p>
        <h2 className="text-xl tracking-tight">
          contact/<span className="text-accent">*</span>
        </h2>
        <p className="text-foreground max-w-prose text-sm leading-relaxed">
          <span className="text-accent">&gt;</span> Drop a line nếu bro muốn chat về indie SaaS, AI,
          hay mobile dev. Mình online mấy giờ làm việc UTC+7.
        </p>

        <div className="border-foreground/30 bg-card/40 mt-4 border p-3 text-sm">
          {entries.length === 0 ? (
            <p className="text-muted-foreground inline-flex items-center gap-1.5 text-xs">
              <GlobeIcon className="size-3" /> social link đang cập nhật
            </p>
          ) : (
            <ul className="space-y-1">
              {entries.map(([key, href], i) => (
                <li key={key} className="grid grid-cols-[2.5rem_6rem_1fr] gap-2">
                  <span className="text-accent tabular-nums">
                    {String(i + 1).padStart(2, "0")}.
                  </span>
                  <span className="text-muted-foreground">{HANDLE[key]}</span>
                  <Link
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-foreground hover:text-accent truncate underline-offset-4 hover:underline"
                  >
                    {href.replace(/^https?:\/\//, "")}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <p className="text-muted-foreground/70 text-[11px]">
          <span className="text-accent">$</span> exit · session ended ·{" "}
          <span className="tm-cursor" aria-hidden />
        </p>
      </div>
    </section>
  );
}
