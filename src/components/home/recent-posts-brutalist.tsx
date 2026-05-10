import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";

import { getAllPosts } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";

export function RecentPostsBrutalist() {
  const posts = getAllPosts().slice(0, 4);
  if (posts.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <header className="border-foreground bg-accent text-accent-foreground mb-8 flex flex-wrap items-center justify-between gap-4 border-2 px-4 py-3">
        <h2 className="nb-display text-2xl sm:text-3xl">/JOURNAL ✸</h2>
        <Link
          href="/blog"
          className="bg-foreground text-background inline-flex items-center gap-1 border-2 border-current px-3 py-1 font-mono text-xs font-bold uppercase transition-transform hover:translate-x-[-2px]"
        >
          ALL <ArrowUpRightIcon className="size-3.5" />
        </Link>
      </header>

      <ol className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {posts.map((post, i) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="nb-card group flex h-full flex-col gap-3 p-5"
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="nb-display text-foreground/80 text-3xl tabular-nums">
                  №{String(i + 1).padStart(2, "0")}
                </span>
                <time
                  dateTime={post.date}
                  className="text-muted-foreground font-mono text-[10px] tracking-widest uppercase"
                >
                  {formatDate(post.date)} · {post.readingTime}M
                </time>
              </div>
              <h3 className="nb-display text-foreground text-xl leading-tight sm:text-2xl">
                {post.title}
              </h3>
              {post.description && (
                <p className="text-foreground/85 line-clamp-3 text-sm leading-relaxed">
                  {post.description}
                </p>
              )}
              {post.tags.length > 0 && (
                <div className="mt-auto flex flex-wrap gap-2 pt-2">
                  {post.tags.slice(0, 3).map((t) => (
                    <span key={t} className="nb-tag">
                      #{t}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
