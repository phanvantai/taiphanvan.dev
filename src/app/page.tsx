import Link from "next/link";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

export default function HomePage() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-20 sm:px-6 sm:py-28">
      <div className="text-muted-foreground font-mono text-xs">{`// ${siteConfig.url}`}</div>
      <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
        Hi, mình là <span className="text-primary">Tai</span>.
      </h1>
      <p className="text-muted-foreground max-w-prose text-lg leading-relaxed text-pretty">
        {siteConfig.description} Trang web đang được build từng phase — quay lại sau nha.
      </p>
      <div className="flex flex-wrap gap-3">
        <Button size="lg" render={<Link href="/blog" />}>
          Đọc blog
        </Button>
        <Button size="lg" variant="outline" render={<Link href="/work" />}>
          Xem work
        </Button>
        <Button size="lg" variant="ghost" render={<Link href="/tools" />}>
          Tools
        </Button>
      </div>
      <p className="text-muted-foreground font-mono text-xs">
        Phase hiện tại: <span className="text-foreground">00 — Foundation</span>
      </p>
    </section>
  );
}
