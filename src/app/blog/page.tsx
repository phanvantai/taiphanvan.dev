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

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <header className="mb-10 space-y-2">
        <p className="text-muted-foreground font-mono text-xs">/blog</p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Blog</h1>
        <p className="text-muted-foreground">
          Note kỹ thuật + indie maker. {allPosts.length} bài
          {activeTag && ` · đang lọc: #${activeTag}`}
        </p>
      </header>

      <div className="mb-10">
        <TagFilter tags={allTags} activeTag={activeTag} />
      </div>

      {posts.length === 0 ? (
        <p className="border-border/60 text-muted-foreground rounded-lg border border-dashed px-6 py-12 text-center text-sm">
          Chưa có bài nào với tag này.
        </p>
      ) : (
        <div className="divide-border/40 -my-6 divide-y">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </section>
  );
}
