import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { MdxContent } from "@/components/mdx/mdx-content";
import { getPage } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const page = getPage("now");
  if (!page) return { title: "Now" };
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: "/now" },
  };
}

export default function NowPage() {
  const page = getPage("now");
  if (!page) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <header className="border-border/40 mb-10 space-y-2 border-b pb-8">
        <p className="text-muted-foreground font-mono text-xs">/now</p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{page.title}</h1>
        {page.description && (
          <p className="text-muted-foreground text-pretty">{page.description}</p>
        )}
        {page.updated && (
          <p className="text-muted-foreground font-mono text-[11px]">
            Last updated: {formatDate(page.updated)}
          </p>
        )}
      </header>

      <div className="prose prose-neutral dark:prose-invert prose-headings:tracking-tight prose-pre:p-0 max-w-none">
        <MdxContent source={page.content} />
      </div>
    </article>
  );
}
