import type { Metadata } from "next";

import { PostCard } from "@/components/blog/post-card";
import { TagFilter } from "@/components/blog/tag-filter";
import { getAllPosts, getAllTags } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Blog",
  description: "Note kỹ thuật + indie maker. Viết bằng tiếng Việt.",
};

export const revalidate = 3600;

interface SearchParams {
  searchParams: Promise<{ tag?: string }>;
}

export default async function BlogPage({ searchParams }: SearchParams) {
  const sp = await searchParams;
  const activeTag = typeof sp.tag === "string" ? sp.tag : undefined;

  const allPosts = getAllPosts();
  const allTags = getAllTags();
  const posts = activeTag ? allPosts.filter((p) => p.tags.includes(activeTag)) : allPosts;
  const lastUpdate = allPosts[0]?.date;

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <header className="mb-8 space-y-3">
        <p className="site-eyebrow text-muted-foreground font-mono text-xs">/blog</p>
        <h1 className="site-page-title text-3xl font-semibold tracking-tight sm:text-4xl">Blog</h1>
        <p className="text-muted-foreground">
          Note kỹ thuật + chuyện indie. Viết khi rảnh, đọc khi rảnh hơn.
        </p>
      </header>

      <div className="site-stats text-muted-foreground border-border/60 mb-8 flex flex-wrap items-center gap-x-4 gap-y-1 border-y py-2 font-mono text-[11px]">
        <span>
          <span className="site-stats-label">archive</span> · {allPosts.length} entries
        </span>
        {lastUpdate && (
          <>
            <span aria-hidden>·</span>
            <span>
              <span className="site-stats-label">last</span>{" "}
              <time dateTime={lastUpdate}>{lastUpdate}</time>
            </span>
          </>
        )}
        {activeTag && (
          <>
            <span aria-hidden>·</span>
            <span>
              <span className="site-stats-label">filter</span> #{activeTag}
            </span>
          </>
        )}
      </div>

      <div className="mb-10">
        <TagFilter tags={allTags} activeTag={activeTag} />
      </div>

      {posts.length === 0 ? (
        <p className="border-border/60 text-muted-foreground rounded-lg border border-dashed px-6 py-12 text-center text-sm">
          Tag này chưa có bài. Mai mốt nhé bro.
        </p>
      ) : (
        <div className="site-list divide-border/40 -my-6 divide-y">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </section>
  );
}
