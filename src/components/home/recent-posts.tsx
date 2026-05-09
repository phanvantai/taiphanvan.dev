import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { PostCard } from "@/components/blog/post-card";
import { getAllPosts } from "@/lib/mdx";

export function RecentPosts() {
  const posts = getAllPosts().slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <header className="mb-2 flex items-end justify-between gap-4">
        <div className="space-y-1">
          <p className="text-muted-foreground font-mono text-xs">/blog</p>
          <h2 className="text-2xl font-semibold tracking-tight">Recent posts</h2>
        </div>
        <Link
          href="/blog"
          className="group text-muted-foreground hover:text-foreground inline-flex items-center gap-1 font-mono text-xs transition-colors"
        >
          All posts
          <ArrowRightIcon className="size-3 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </header>

      <div className="divide-border/40 -my-6 divide-y">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
