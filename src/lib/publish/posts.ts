import "server-only";

import matter from "gray-matter";

import { defaultLocale, withLocale, type Locale } from "@/i18n/routing";
import { siteConfig } from "@/lib/site-config";
import { slugify } from "@/lib/slugify";

import { PublishError, deleteFile, listFiles, readFile, writeFile } from "./github";

/**
 * Blog publishing for callers that know nothing about this repo: they send a
 * title and plain Markdown, and this module owns slugs, dates, file names and
 * frontmatter. Posts are saved as `.md` so they are compiled as Markdown, not
 * MDX — stray `<` or `{` in prose can never break the build.
 */

const MAX_CONTENT_CHARS = 200_000;
const DESCRIPTION_CHARS = 160;
const POST_FILE = /^(\d{4}-\d{2}-\d{2})-(.+)\.(mdx?)$/;

export interface PostSummary {
  slug: string;
  locale: Locale;
  title: string;
  description: string;
  date: string;
  tags: string[];
  draft: boolean;
  url: string;
}

export interface PostDetail extends PostSummary {
  content: string;
  /** Posts written by hand as MDX: metadata is editable, content is not. */
  contentEditable: boolean;
}

interface PostFile {
  name: string;
  date: string;
  slug: string;
  ext: "md" | "mdx";
}

function blogDir(locale: Locale): string {
  return `content/${locale}/blog`;
}

function postUrl(locale: Locale, slug: string): string {
  return `${siteConfig.url}${withLocale(locale, `/blog/${slug}`)}`;
}

function parseFileName(name: string): PostFile | null {
  const m = POST_FILE.exec(name);
  if (!m) return null;
  return { name, date: m[1] ?? "", slug: m[2] ?? "", ext: m[3] === "md" ? "md" : "mdx" };
}

async function listPostFiles(locale: Locale): Promise<PostFile[]> {
  const names = await listFiles(blogDir(locale));
  return names
    .map(parseFileName)
    .filter((f): f is PostFile => f !== null)
    .sort((a, b) => (a.name < b.name ? 1 : -1));
}

async function findPostFile(locale: Locale, slug: string): Promise<PostFile> {
  const file = (await listPostFiles(locale)).find((f) => f.slug === slug);
  if (!file) {
    throw new PublishError(
      `No ${locale} post with slug "${slug}". Call list_posts to see the existing slugs.`,
    );
  }
  return file;
}

/** Today's date in Vietnam, where the author lives and "today" is judged. */
function today(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Ho_Chi_Minh" }).format(new Date());
}

function checkDate(date: string): string {
  const parsed = new Date(`${date}T00:00:00Z`);
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
    Number.isNaN(parsed.getTime()) ||
    parsed.toISOString().slice(0, 10) !== date
  ) {
    throw new PublishError(`"${date}" is not a valid date. Use YYYY-MM-DD.`);
  }
  return date;
}

function cleanTitle(title: string): string {
  const cleaned = title.replace(/\s+/g, " ").trim();
  if (!cleaned) throw new PublishError("The title is empty.");
  return cleaned;
}

function cleanTags(tags: string[]): string[] {
  return [...new Set(tags.map(slugify).filter(Boolean))];
}

/** Normalize line endings and drop a leading H1 — the page renders the title itself. */
function cleanContent(content: string): string {
  const body = content
    .replace(/\r\n?/g, "\n")
    .trim()
    .replace(/^#[ \t]+[^\n]*\n*/, "")
    .trim();
  if (!body) throw new PublishError("The post content is empty.");
  if (body.length > MAX_CONTENT_CHARS) {
    throw new PublishError(`The post is too long (limit: ${MAX_CONTENT_CHARS} characters).`);
  }
  return body;
}

/** First prose paragraph as plain text, for list pages and meta description. */
function describe(content: string): string {
  const withoutCode = content.replace(/```[\s\S]*?```/g, "");
  const paragraph =
    withoutCode
      .split(/\n{2,}/)
      .map((p) => p.trim())
      .find((p) => p && !/^(#{1,6}\s|[-*+]\s|\d+\.\s|>|\||!\[|---)/.test(p)) ?? "";
  const text = paragraph
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[*_`~]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= DESCRIPTION_CHARS) return text;
  const cut = text.slice(0, DESCRIPTION_CHARS);
  return `${cut.slice(0, Math.max(cut.lastIndexOf(" "), DESCRIPTION_CHARS / 2)).trimEnd()}…`;
}

interface Frontmatter {
  title: string;
  description: string;
  date: string;
  tags: string[];
  published: boolean;
  featured: boolean;
  [key: string]: unknown;
}

function serialize(frontmatter: Frontmatter, content: string): string {
  return matter.stringify(`\n${content.trim()}\n`, frontmatter);
}

function parse(text: string, file: PostFile): { frontmatter: Frontmatter; content: string } {
  const { data, content } = matter(text);
  const date = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : data.date;
  return {
    frontmatter: {
      ...data,
      title: typeof data.title === "string" ? data.title : file.slug,
      description: typeof data.description === "string" ? data.description : "",
      date: typeof date === "string" ? date : file.date,
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      published: data.published === true,
      featured: data.featured === true,
    },
    content: content.trim(),
  };
}

function summarize(locale: Locale, slug: string, fm: Frontmatter): PostSummary {
  return {
    slug,
    locale,
    title: fm.title,
    description: fm.description,
    date: fm.date,
    tags: fm.tags,
    draft: !fm.published,
    url: postUrl(locale, slug),
  };
}

// ============================================================
// Operations
// ============================================================

export interface PublishInput {
  title: string;
  content: string;
  description?: string;
  tags?: string[];
  slug?: string;
  date?: string;
  locale?: Locale;
  draft?: boolean;
}

export async function publishPost(input: PublishInput): Promise<PostSummary> {
  const locale = input.locale ?? defaultLocale;
  const title = cleanTitle(input.title);
  const content = cleanContent(input.content);
  const slug = slugify(input.slug ?? title);
  if (!slug) {
    throw new PublishError(
      "Could not derive a URL slug from the title. Pass `slug` with latin letters, digits and hyphens.",
    );
  }
  const date = checkDate(input.date ?? today());

  const existing = (await listPostFiles(locale)).find((f) => f.slug === slug);
  if (existing) {
    throw new PublishError(
      `A ${locale} post with slug "${slug}" already exists (${postUrl(locale, slug)}). ` +
        "Use update_post to change it, or pass a different `slug` to publish a separate post.",
    );
  }

  const frontmatter: Frontmatter = {
    title,
    description: input.description?.replace(/\s+/g, " ").trim() || describe(content) || title,
    date,
    tags: cleanTags(input.tags ?? []),
    published: !input.draft,
    featured: false,
  };

  await writeFile(
    `${blogDir(locale)}/${date}-${slug}.md`,
    serialize(frontmatter, content),
    `content: add "${title}"`,
  );
  return summarize(locale, slug, frontmatter);
}

export interface UpdateInput {
  slug: string;
  locale?: Locale;
  title?: string;
  content?: string;
  description?: string;
  tags?: string[];
  draft?: boolean;
}

export async function updatePost(input: UpdateInput): Promise<PostSummary> {
  const locale = input.locale ?? defaultLocale;
  const file = await findPostFile(locale, input.slug);
  const path = `${blogDir(locale)}/${file.name}`;
  const current = await readFile(path);
  if (!current) throw new PublishError(`Post "${input.slug}" disappeared while updating it.`);

  if (input.content !== undefined && file.ext === "mdx") {
    throw new PublishError(
      `"${input.slug}" was written by hand as MDX, so its content cannot be replaced here. ` +
        "Its title, description, tags and draft status can still be updated.",
    );
  }

  const { frontmatter, content } = parse(current.text, file);
  const next: Frontmatter = {
    ...frontmatter,
    ...(input.title !== undefined ? { title: cleanTitle(input.title) } : {}),
    ...(input.description !== undefined
      ? { description: input.description.replace(/\s+/g, " ").trim() }
      : {}),
    ...(input.tags !== undefined ? { tags: cleanTags(input.tags) } : {}),
    ...(input.draft !== undefined ? { published: !input.draft } : {}),
  };
  const body = input.content !== undefined ? cleanContent(input.content) : content;

  await writeFile(path, serialize(next, body), `content: update "${next.title}"`, current.sha);
  return summarize(locale, file.slug, next);
}

export async function getPost(slug: string, locale: Locale = defaultLocale): Promise<PostDetail> {
  const file = await findPostFile(locale, slug);
  const current = await readFile(`${blogDir(locale)}/${file.name}`);
  if (!current) throw new PublishError(`Post "${slug}" could not be read.`);
  const { frontmatter, content } = parse(current.text, file);
  return {
    ...summarize(locale, file.slug, frontmatter),
    content,
    contentEditable: file.ext === "md",
  };
}

export interface PostList {
  total: number;
  posts: PostSummary[];
}

/** Newest posts first, drafts included. */
export async function listPosts(locale: Locale = defaultLocale, limit = 20): Promise<PostList> {
  const files = await listPostFiles(locale);
  const posts = await Promise.all(
    files.slice(0, limit).map(async (file) => {
      const current = await readFile(`${blogDir(locale)}/${file.name}`);
      const { frontmatter } = parse(current?.text ?? "", file);
      return summarize(locale, file.slug, frontmatter);
    }),
  );
  return { total: files.length, posts };
}

export async function deletePost(
  slug: string,
  locale: Locale = defaultLocale,
): Promise<{ slug: string; locale: Locale; title: string }> {
  const file = await findPostFile(locale, slug);
  const path = `${blogDir(locale)}/${file.name}`;
  const current = await readFile(path);
  if (!current) throw new PublishError(`Post "${slug}" is already gone.`);
  const { frontmatter } = parse(current.text, file);
  await deleteFile(path, current.sha, `content: remove "${frontmatter.title}"`);
  return { slug: file.slug, locale, title: frontmatter.title };
}
