import Link from "next/link";
import { ArrowUpRightIcon, GlobeIcon } from "lucide-react";

import { siteConfig } from "@/lib/site-config";

const HANDLE: Record<keyof typeof siteConfig.social, string> = {
  github: "GitHub",
  twitter: "Twitter / X",
  linkedin: "LinkedIn",
  facebook: "Facebook",
};

export function SocialLinksMinimalist() {
  const entries = Object.entries(siteConfig.social).filter(([, url]) => url.length > 0) as [
    keyof typeof siteConfig.social,
    string,
  ][];

  return (
    <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28">
      <div className="grid gap-12 sm:grid-cols-[1fr_auto] sm:gap-16">
        <div className="space-y-5">
          <p className="mn-eyebrow mn-dot">Contact</p>
          <h2 className="mn-display text-foreground text-4xl sm:text-5xl">
            Say hi<span className="mn-accent">.</span>
          </h2>
          <p className="text-muted-foreground max-w-xl text-base leading-relaxed sm:text-lg">
            Drop a line nếu bro muốn chat về tech, AI, sản phẩm — hay bất cứ topic nào trong các bài
            viết. Mình luôn open cho cà phê online &amp; ý tưởng quái dị.
          </p>
        </div>

        <div className="sm:min-w-[18rem]">
          <p className="mn-eyebrow">Find me at</p>
          {entries.length === 0 ? (
            <p className="text-muted-foreground mt-4 inline-flex items-center gap-1.5 text-sm">
              <GlobeIcon className="size-3.5" /> social link đang cập nhật
            </p>
          ) : (
            <ul className="divide-border mt-4 divide-y">
              {entries.map(([key, href]) => (
                <li key={key}>
                  <Link
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="group text-muted-foreground hover:text-foreground flex items-center justify-between gap-3 py-3 transition-colors"
                  >
                    <span className="text-base font-medium">{HANDLE[key]}</span>
                    <ArrowUpRightIcon className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
