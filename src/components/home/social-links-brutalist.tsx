import Link from "next/link";
import { GlobeIcon } from "lucide-react";

import { siteConfig } from "@/lib/site-config";

const HANDLE: Record<keyof typeof siteConfig.social, string> = {
  github: "GITHUB",
  twitter: "TWITTER / X",
  linkedin: "LINKEDIN",
  facebook: "FACEBOOK",
};

export function SocialLinksBrutalist() {
  const entries = Object.entries(siteConfig.social).filter(([, url]) => url.length > 0) as [
    keyof typeof siteConfig.social,
    string,
  ][];

  return (
    <section className="border-foreground bg-accent border-t-4">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:grid-cols-[1fr_auto] sm:px-6 sm:py-20">
        <div className="space-y-5">
          <p className="border-foreground bg-background inline-block border-2 px-2 py-0.5 font-mono text-[11px] font-bold tracking-widest uppercase">
            {"// CONTACT"}
          </p>
          <h2 className="nb-display text-foreground text-5xl sm:text-7xl">
            SAY HI<span className="text-foreground">.</span>
          </h2>
          <p className="text-foreground border-foreground bg-card max-w-xl border-2 p-4 text-base leading-relaxed">
            Drop a line nếu bro muốn chat về tech, AI, sản phẩm — hay bất cứ topic nào trong các bài
            viết. Mình luôn open cho cà phê online &amp; ý tưởng quái dị.
          </p>
        </div>

        <div className="border-foreground bg-background min-w-[18rem] border-2 p-5">
          <p className="font-mono text-[10px] font-bold tracking-widest uppercase">FIND ME AT ↓</p>
          {entries.length === 0 ? (
            <p className="text-muted-foreground mt-4 inline-flex items-center gap-1.5 font-mono text-xs">
              <GlobeIcon className="size-3" /> social link đang cập nhật
            </p>
          ) : (
            <ul className="mt-4 space-y-2">
              {entries.map(([key, href], i) => (
                <li key={key}>
                  <Link
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="border-foreground hover:bg-foreground hover:text-background group flex items-center justify-between gap-3 border-2 px-3 py-2 transition-colors"
                  >
                    <span className="flex items-baseline gap-2 font-mono font-bold uppercase">
                      <span className="text-accent group-hover:text-accent-foreground text-xs tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {HANDLE[key]}
                    </span>
                    <span aria-hidden>→</span>
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
