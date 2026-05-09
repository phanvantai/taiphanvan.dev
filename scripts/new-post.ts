/**
 * Scaffold a new blog post under content/blog/.
 *
 * Usage:
 *   pnpm new-post "Tên bài viết tiếng Việt"
 *   pnpm new-post "Tiêu đề" --tags=nextjs,claude
 *   pnpm new-post "Draft đang viết" --draft
 *
 * Generates content/blog/YYYY-MM-DD-<slug>.mdx with prefilled frontmatter.
 */

import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const args = process.argv.slice(2);
const positional: string[] = [];
const flags: Record<string, string | true> = {};

for (const a of args) {
  if (a.startsWith("--")) {
    const eq = a.indexOf("=");
    if (eq > 0) flags[a.slice(2, eq)] = a.slice(eq + 1);
    else flags[a.slice(2)] = true;
  } else {
    positional.push(a);
  }
}

const title = positional.join(" ").trim();
if (!title) {
  console.error('Usage: pnpm new-post "Tên bài viết" [--tags=a,b] [--draft]');
  process.exit(1);
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
const slug = slugify(title);
const filename = `${today}-${slug}.mdx`;

const tagsRaw = typeof flags.tags === "string" ? flags.tags : "";
const tags = tagsRaw
  .split(",")
  .map((t) => t.trim())
  .filter(Boolean);

const published = flags.draft ? "false" : "true";
const tagsYaml = tags.length > 0 ? `[${tags.map((t) => `"${t}"`).join(", ")}]` : "[]";

const body = `---
title: "${title.replace(/"/g, '\\"')}"
description: "TODO: 1-2 câu mô tả ngắn cho list page + meta description."
date: "${today}"
tags: ${tagsYaml}
published: ${published}
featured: false
---

TODO: viết bài.

## Section 1

Nội dung...
`;

const blogDir = join(process.cwd(), "content", "blog");
if (!existsSync(blogDir)) mkdirSync(blogDir, { recursive: true });

const target = join(blogDir, filename);
if (existsSync(target)) {
  console.error(`✗ Đã có file: ${target}`);
  process.exit(1);
}

writeFileSync(target, body, "utf8");
console.log(`✓ Created content/blog/${filename}`);
console.log(`  Open it in your editor and start writing.`);
