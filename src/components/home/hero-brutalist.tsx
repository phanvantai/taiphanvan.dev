import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

const TAGS = ["NEXT.JS", "INDIE SAAS", "VIỆT NAM", "B2B", "AI-NATIVE"] as const;

export function HeroBrutalist() {
  return (
    <section className="border-foreground border-b-4 px-4 py-12 sm:px-6 sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-[1.4fr_1fr] sm:gap-10">
        {/* Left: title block */}
        <div className="space-y-6">
          <p className="border-foreground bg-background inline-block border-2 px-2 py-0.5 font-mono text-[11px] font-bold tracking-widest uppercase">
            {"// personal site v01"}
          </p>

          <h1 className="nb-display text-foreground text-[clamp(3rem,9vw,7rem)]">
            HI,
            <br />
            MÌNH LÀ
            <br />
            <span className="bg-foreground text-background -ml-1 inline-block -rotate-1 px-2">
              TAI<span className="text-accent">.</span>
            </span>
          </h1>

          <p className="text-foreground border-foreground bg-card max-w-prose border-2 p-4 text-base leading-relaxed">
            Engineer ở Việt Nam. Build sản phẩm cá nhân + B2B nhỏ. Hiện đang focus{" "}
            <Link
              href="/work/examino"
              className="bg-accent text-accent-foreground border-foreground border-2 px-1 font-bold underline-offset-2 hover:underline"
            >
              Examino
            </Link>{" "}
            — B2B SaaS English exam platform cho thị trường Việt. Trước đây mobile (SwiftUI/iOS),
            giờ chuyển dần sang web với <strong>Next.js</strong>.
          </p>

          <div className="flex flex-wrap gap-3 pt-1">
            <Button
              size="lg"
              className="border-foreground bg-foreground text-background rounded-none border-2 font-bold uppercase shadow-[5px_5px_0_0_var(--accent)] transition-transform hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[7px_7px_0_0_var(--accent)]"
              render={<Link href="/blog" />}
            >
              READ BLOG <ArrowRightIcon />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-foreground bg-accent text-accent-foreground rounded-none border-2 font-bold uppercase shadow-[5px_5px_0_0_var(--foreground)] transition-transform hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[7px_7px_0_0_var(--foreground)]"
              render={<Link href="/work" />}
            >
              SEE WORK
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="border-foreground rounded-none border-2 font-bold uppercase hover:bg-transparent hover:underline"
              render={<Link href="/about" />}
            >
              ABOUT
            </Button>
          </div>
        </div>

        {/* Right: card stack */}
        <aside className="space-y-4">
          <div className="nb-card p-5">
            <p className="font-mono text-[10px] font-bold tracking-widest uppercase">
              NOW SHIPPING →
            </p>
            <p className="nb-display mt-2 text-3xl">EXAMINO</p>
            <p className="text-muted-foreground mt-2 text-sm">
              B2B SaaS English exam platform · VN market
            </p>
          </div>
          <div className="nb-card-flat p-5">
            <p className="font-mono text-[10px] font-bold tracking-widest uppercase">TAGS</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {TAGS.map((t) => (
                <span key={t} className="nb-tag">
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="border-foreground nb-stripe text-background h-10 border-2" aria-hidden />
        </aside>
      </div>
    </section>
  );
}
