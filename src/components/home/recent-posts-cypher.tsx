import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";

import { getAllPosts } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";

export function RecentPostsCypher() {
  const posts = getAllPosts().slice(0, 4);
  if (posts.length === 0) return null;

  return (
    <section className="relative mx-auto max-w-6xl px-4 py-20 sm:px-10 sm:py-24">
      <header className="mb-10">
        <p className="cy-rule cy-mono text-[10.5px] tracking-[0.22em] uppercase">
          <span>◤ MEMORY.ARCHIVE // RECALL</span>
        </p>
        <div className="mt-6 flex items-end justify-between gap-4">
          <h2 className="cy-display text-foreground text-3xl sm:text-5xl">
            <span className="cy-pink">REPLAY</span> ENTRIES
            <span className="cy-amber">/</span>
          </h2>
          <Link
            href="/blog"
            className="cy-mono cy-pink border-foreground/30 inline-flex items-center gap-1.5 border px-3 py-1.5 text-[10.5px] tracking-[0.22em] uppercase transition-colors hover:border-[var(--cy-pink)]"
          >
            decode all <ArrowUpRightIcon className="size-3.5" />
          </Link>
        </div>
      </header>

      <ol className="grid gap-5 sm:grid-cols-2">
        {posts.map((post, i) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="cy-card group flex h-full flex-col gap-3 p-6"
            >
              <div className="cy-mono flex items-baseline justify-between gap-3 text-[10px] tracking-[0.22em] uppercase">
                <span className="cy-id">MEM-{String(i + 1).padStart(3, "0")}</span>
                <time dateTime={post.date} className="cy-cyan tabular-nums">
                  {formatDate(post.date)} · {post.readingTime}m
                </time>
              </div>

              <h3 className="cy-display text-foreground text-xl leading-snug text-balance sm:text-2xl">
                {post.title}
              </h3>

              {post.description && (
                <p className="text-foreground/80 line-clamp-3 text-sm leading-relaxed">
                  <span className="cy-amber cy-mono mr-1.5 text-[10px] tracking-widest uppercase">
                    ▸ play
                  </span>
                  {post.description}
                </p>
              )}

              <div className="border-foreground/15 mt-auto flex flex-wrap items-center gap-2 border-t pt-3">
                {post.tags.slice(0, 4).map((t) => (
                  <span key={t} className="cy-tag">
                    #{t}
                  </span>
                ))}
                <ArrowUpRightIcon className="cy-amber ml-auto size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
