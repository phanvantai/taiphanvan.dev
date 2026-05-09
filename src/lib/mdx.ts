import "server-only";

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, basename } from "node:path";
import { cache } from "react";

import matter from "gray-matter";
import readingTimeFn from "reading-time";

import type { Post, PostFrontmatter, PostListItem } from "@/types/post";
import type { Work, WorkFrontmatter, WorkListItem } from "@/types/work";

const CONTENT_ROOT = join(process.cwd(), "content");
const BLOG_DIR = join(CONTENT_ROOT, "blog");
const WORK_DIR = join(CONTENT_ROOT, "work");
const PAGES_DIR = join(CONTENT_ROOT, "pages");

// ============================================================
// Shared helpers
// ============================================================

function readMdxFile(absPath: string): { data: Record<string, unknown>; content: string } {
  const raw = readFileSync(absPath, "utf8");
  const { data, content } = matter(raw);
  return { data: data as Record<string, unknown>, content };
}

function listMdxFiles(dir: string): string[] {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));
}

function slugFromFile(filename: string): string {
  // Blog filenames look like 2026-05-07-hello-world.mdx — strip date prefix.
  const base = basename(filename).replace(/\.mdx?$/, "");
  return base.replace(/^\d{4}-\d{2}-\d{2}-/, "");
}

function stripContent<T extends { content: string }>(item: T): Omit<T, "content"> {
  const { content: _content, ...rest } = item;
  void _content;
  return rest;
}

// ============================================================
// Blog
// ============================================================

function parsePost(filename: string): Post | null {
  const { data, content } = readMdxFile(join(BLOG_DIR, filename));
  const fm = data as Partial<PostFrontmatter>;

  if (!fm.title || !fm.date || !fm.description) {
    console.warn(`[mdx] post ${filename} missing required frontmatter — skipping`);
    return null;
  }

  const minutes = Math.max(1, Math.round(readingTimeFn(content).minutes));

  return {
    slug: slugFromFile(filename),
    title: fm.title,
    description: fm.description,
    date: fm.date,
    tags: fm.tags ?? [],
    published: fm.published ?? false,
    featured: fm.featured ?? false,
    cover: fm.cover,
    content,
    readingTime: minutes,
  };
}

export const getAllPosts = cache((): PostListItem[] => {
  const files = listMdxFiles(BLOG_DIR);
  const posts: Post[] = [];
  for (const f of files) {
    const p = parsePost(f);
    if (p && p.published) posts.push(p);
  }
  posts.sort((a, b) => (a.date < b.date ? 1 : -1));
  return posts.map(stripContent);
});

export const getPostBySlug = cache((slug: string): Post | null => {
  const files = listMdxFiles(BLOG_DIR);
  for (const f of files) {
    if (slugFromFile(f) === slug) {
      const p = parsePost(f);
      if (p && p.published) return p;
    }
  }
  return null;
});

export const getAllTags = cache((): { tag: string; count: number }[] => {
  const counts = new Map<string, number>();
  for (const post of getAllPosts()) {
    for (const tag of post.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return Array.from(counts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
});

export const getRelatedPosts = cache((slug: string, limit = 3): PostListItem[] => {
  const current = getPostBySlug(slug);
  if (!current) return [];
  const tagSet = new Set(current.tags);
  return getAllPosts()
    .filter((p) => p.slug !== slug)
    .map((p) => ({
      post: p,
      score: p.tags.filter((t) => tagSet.has(t)).length,
    }))
    .sort((a, b) => b.score - a.score || (a.post.date < b.post.date ? 1 : -1))
    .filter((entry) => entry.score > 0)
    .slice(0, limit)
    .map((entry) => entry.post);
});

// ============================================================
// Work
// ============================================================

function parseWork(filename: string): Work | null {
  const { data, content } = readMdxFile(join(WORK_DIR, filename));
  const fm = data as Partial<WorkFrontmatter>;

  if (!fm.title || !fm.slug || !fm.tagline || !fm.period || !fm.status || !fm.role) {
    console.warn(`[mdx] work ${filename} missing required frontmatter — skipping`);
    return null;
  }

  return {
    title: fm.title,
    slug: fm.slug,
    tagline: fm.tagline,
    period: fm.period,
    status: fm.status,
    stack: fm.stack ?? [],
    role: fm.role,
    links: fm.links,
    cover: fm.cover,
    order: fm.order ?? 999,
    featured: fm.featured ?? false,
    content,
  };
}

export const getAllWork = cache((): WorkListItem[] => {
  const files = listMdxFiles(WORK_DIR);
  const items: Work[] = [];
  for (const f of files) {
    const w = parseWork(f);
    if (w) items.push(w);
  }
  items.sort((a, b) => a.order - b.order);
  return items.map(stripContent);
});

export const getWorkBySlug = cache((slug: string): Work | null => {
  const files = listMdxFiles(WORK_DIR);
  for (const f of files) {
    const w = parseWork(f);
    if (w && w.slug === slug) return w;
  }
  return null;
});

export const getFeaturedWork = cache((): WorkListItem[] => {
  return getAllWork().filter((w) => w.featured);
});

// ============================================================
// Static pages (about, now, …)
// ============================================================

export interface PageDoc {
  title: string;
  description?: string;
  updated?: string;
  content: string;
}

export const getPage = cache((name: "about" | "now"): PageDoc | null => {
  const file = join(PAGES_DIR, `${name}.mdx`);
  if (!existsSync(file)) return null;
  const { data, content } = readMdxFile(file);
  const fm = data as Partial<PageDoc>;
  if (!fm.title) return null;
  return {
    title: fm.title,
    description: fm.description,
    updated: fm.updated,
    content,
  };
});
