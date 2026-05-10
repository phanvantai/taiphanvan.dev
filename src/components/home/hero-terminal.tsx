import Link from "next/link";

import { siteConfig } from "@/lib/site-config";

const ASCII_LOGO = String.raw`  _____      _   _____  _    _    _    _   _
 |_   _|    /_\ |_   _|| |_ | |  / \  | \ | |
   | |     / _ \  | |  |  _||  _/ _ \ | .  |
   |_|    /_/ \_\ |_|  |_|  |_|/_/ \_\|_|\_|
`;

const FACTS = [
  { k: "stack", v: "next.js 15 / supabase / prisma / mdx" },
  { k: "focus", v: "examino — b2b saas english exam platform" },
  { k: "background", v: "swiftui/ios → web (next.js)" },
  { k: "location", v: "saigon, vn — utc+7" },
  { k: "status", v: "shipping daily" },
] as const;

export function HeroTerminal() {
  const host = siteConfig.url.replace(/^https?:\/\//, "");
  const year = new Date().getFullYear();

  return (
    <section className="border-border tm-scanlines border-b">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
        {/* Window chrome */}
        <div className="border-foreground/40 bg-card/40 tm-frame tm-frame-corner relative rounded-sm border">
          {/* Title bar */}
          <div className="border-foreground/30 flex items-center justify-between border-b px-3 py-1.5 text-[11px]">
            <div className="flex items-center gap-1.5">
              <span className="bg-destructive size-2.5 rounded-full" aria-hidden />
              <span className="size-2.5 rounded-full bg-yellow-500/80" aria-hidden />
              <span className="bg-accent size-2.5 rounded-full" aria-hidden />
            </div>
            <span className="text-muted-foreground">tai@{host} — zsh — 100x32</span>
            <span className="text-muted-foreground tabular-nums">{year}</span>
          </div>

          {/* Body */}
          <div className="space-y-4 px-4 py-6 text-sm leading-relaxed sm:px-6 sm:py-8">
            <pre
              className="text-accent overflow-x-auto text-[10px] leading-tight sm:text-xs"
              aria-hidden
            >
              {ASCII_LOGO}
            </pre>

            <div>
              <p className="tm-prompt text-foreground">whoami</p>
              <p className="text-muted-foreground pl-3">tai · engineer · vietnam</p>
            </div>

            <div>
              <p className="tm-prompt text-foreground">cat ./about.txt</p>
              <p className="text-foreground pl-3">
                Hi, mình là <span className="text-accent">Tai</span>. Engineer ở Việt Nam, build sản
                phẩm cá nhân + B2B nhỏ. Hiện đang focus{" "}
                <Link
                  href="/work/examino"
                  className="text-accent underline-offset-4 hover:underline"
                >
                  Examino
                </Link>{" "}
                — B2B SaaS English exam platform cho thị trường Việt. Trước đây mobile
                (SwiftUI/iOS), giờ chuyển dần sang web với Next.js.
              </p>
            </div>

            <div>
              <p className="tm-prompt text-foreground">env | grep -i tai</p>
              <ul className="space-y-0.5 pl-3">
                {FACTS.map((f) => (
                  <li key={f.k} className="grid grid-cols-[6.5rem_1fr] gap-2">
                    <span className="text-accent">{f.k.toUpperCase()}</span>
                    <span className="text-muted-foreground">= {f.v}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="tm-prompt text-foreground">ls -1 ./paths</p>
              <ul className="space-y-1 pl-3">
                <li>
                  <Link
                    href="/blog"
                    className="hover:text-accent text-foreground underline-offset-4 hover:underline"
                  >
                    drwxr-xr-x · ./blog/
                  </Link>
                </li>
                <li>
                  <Link
                    href="/work"
                    className="hover:text-accent text-foreground underline-offset-4 hover:underline"
                  >
                    drwxr-xr-x · ./work/
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="hover:text-accent text-foreground underline-offset-4 hover:underline"
                  >
                    -rw-r--r-- · ./about.md
                  </Link>
                </li>
              </ul>
            </div>

            <p className="tm-prompt tm-cursor text-foreground" aria-label="Prompt" />
          </div>
        </div>
      </div>
    </section>
  );
}
