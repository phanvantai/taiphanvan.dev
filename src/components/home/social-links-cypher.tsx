import Link from "next/link";
import { GlobeIcon } from "lucide-react";

import { siteConfig } from "@/lib/site-config";

const HANDLE: Record<keyof typeof siteConfig.social, { label: string; freq: string }> = {
  github: { label: "GITHUB", freq: "CH 31.7" },
  twitter: { label: "TWITTER / X", freq: "CH 28.4" },
  linkedin: { label: "LINKEDIN", freq: "CH 19.2" },
  facebook: { label: "FACEBOOK", freq: "CH 12.1" },
};

export function SocialLinksCypher() {
  const entries = Object.entries(siteConfig.social).filter(([, url]) => url.length > 0) as [
    keyof typeof siteConfig.social,
    string,
  ][];

  return (
    <section className="cy-noise relative overflow-hidden">
      <div className="cy-aurora" aria-hidden />

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-24 sm:px-10 sm:py-28">
        <div className="cy-scope cy-scope-pink grid gap-10 p-8 sm:grid-cols-[1.2fr_1fr] sm:p-12">
          <div className="space-y-5">
            <p className="cy-mono cy-pink text-[10.5px] tracking-[0.22em] uppercase">
              ◤ TRANSMISSION // OPEN.CHANNEL
            </p>
            <h2 className="cy-display text-foreground text-4xl leading-tight sm:text-6xl">
              SAY HI<span className="cy-amber">.</span>
              <br />
              <span className="cy-glitch text-3xl sm:text-4xl" data-text="// END OF LINE">
                <span className="cy-pink">{"// END OF LINE"}</span>
              </span>
            </h2>
            <p className="text-foreground/85 max-w-xl text-base leading-relaxed sm:text-lg">
              Drop a line nếu bro muốn chat về indie SaaS, AI, hay mobile dev. Mình open cho cà phê
              online &amp; ý tưởng quái dị. Encryption: optional · trust:{" "}
              <span className="cy-amber">earned</span>.
            </p>
            <div className="cy-mono flex flex-wrap gap-2 pt-1">
              <span className="cy-tag cy-tag-cyan">PROTO · HTTPS/TLS</span>
              <span className="cy-tag cy-tag-pink">JOI · LINKED</span>
              <span className="cy-tag">UTC+7 · SAIGON</span>
            </div>
          </div>

          <div>
            <p className="cy-mono cy-amber mb-4 text-[10.5px] tracking-[0.22em] uppercase">
              ◢ FREQ // FIND ME AT
            </p>
            {entries.length === 0 ? (
              <p className="text-muted-foreground inline-flex items-center gap-1.5 font-mono text-xs">
                <GlobeIcon className="size-3" /> social link đang cập nhật
              </p>
            ) : (
              <ul className="space-y-2">
                {entries.map(([key, href], i) => {
                  const meta = HANDLE[key];
                  return (
                    <li key={key}>
                      <Link
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        className="border-foreground/20 cy-mono group flex items-center justify-between gap-3 border px-4 py-3 transition-colors hover:border-[var(--cy-amber)] hover:bg-[oklch(from_var(--cy-amber)_l_c_h_/_0.06)]"
                      >
                        <span className="flex items-baseline gap-3">
                          <span className="cy-pink text-[10px] tracking-widest tabular-nums">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="text-foreground text-sm font-medium tracking-widest uppercase">
                            {meta.label}
                          </span>
                        </span>
                        <span className="flex items-baseline gap-3">
                          <span className="cy-cyan text-[10px] tracking-widest uppercase">
                            {meta.freq}
                          </span>
                          <span
                            className="cy-amber transition-transform group-hover:translate-x-0.5"
                            aria-hidden
                          >
                            →
                          </span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>

        <p className="cy-mono cy-amber/70 mt-6 text-center text-[10px] tracking-[0.3em] uppercase">
          ◤ end transmission · {new Date().getUTCFullYear()} · K-V0.1.4
        </p>
      </div>
    </section>
  );
}
