import type { Metadata } from "next";

import { WorkCard } from "@/components/work/work-card";
import { getAllWork } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Work",
  description: "Portfolio: side projects + sản phẩm Tai đã build / đang build.",
};

export const revalidate = 3600;

export default function WorkPage() {
  const work = getAllWork();

  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <header className="mb-10 space-y-3">
        <p className="site-eyebrow text-muted-foreground font-mono text-xs">/work</p>
        <h1 className="site-page-title text-3xl font-semibold tracking-tight sm:text-4xl">Work</h1>
        <p className="text-muted-foreground">
          Mấy thứ Tai đang ngồi build. Có cái xong, có cái còn dở dang. {work.length} project.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {work.map((w) => (
          <WorkCard key={w.slug} work={w} />
        ))}
      </div>
    </section>
  );
}
