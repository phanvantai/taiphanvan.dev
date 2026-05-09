import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

export function Hero() {
  return (
    <section className="border-border/40 border-b px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-3xl space-y-6">
        <p className="text-muted-foreground font-mono text-xs">{`// ${siteConfig.url}`}</p>

        <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          Hi, mình là{" "}
          <span className="bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
            Tai
          </span>
          .
        </h1>

        <p className="text-muted-foreground max-w-prose text-lg leading-relaxed text-pretty">
          Engineer ở Việt Nam. Build sản phẩm cá nhân + B2B nhỏ. Hiện đang focus{" "}
          <Link href="/work/examino" className="text-foreground underline-offset-4 hover:underline">
            Examino
          </Link>{" "}
          — B2B SaaS English exam platform cho thị trường Việt. Trước đây mobile (SwiftUI/iOS), giờ
          chuyển dần sang web với Next.js.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Button size="lg" render={<Link href="/blog" />}>
            Đọc blog <ArrowRightIcon />
          </Button>
          <Button size="lg" variant="outline" render={<Link href="/work" />}>
            Xem work
          </Button>
          <Button size="lg" variant="ghost" render={<Link href="/about" />}>
            Về mình
          </Button>
        </div>
      </div>
    </section>
  );
}
