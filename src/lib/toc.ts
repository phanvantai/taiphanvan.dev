import GithubSlugger from "github-slugger";

export interface TocEntry {
  depth: number;
  text: string;
  slug: string;
}

const HEADING_RE = /^(#{2,3})\s+(.+)$/gm;
// Strip inline markdown: links, code, emphasis, strong
const INLINE_RE = /\[([^\]]+)\]\([^)]+\)|`([^`]+)`|\*\*([^*]+)\*\*|\*([^*]+)\*|_([^_]+)_/g;

function stripInline(text: string): string {
  return text.replace(INLINE_RE, (_, link, code, strong, em, em2) => {
    return link ?? code ?? strong ?? em ?? em2 ?? "";
  });
}

export function extractToc(markdown: string): TocEntry[] {
  // Skip headings inside fenced code blocks.
  const sanitized = markdown.replace(/```[\s\S]*?```/g, "");

  const slugger = new GithubSlugger();
  const entries: TocEntry[] = [];

  for (const match of sanitized.matchAll(HEADING_RE)) {
    const hashes = match[1] ?? "";
    const raw = match[2] ?? "";
    const depth = hashes.length;
    const text = stripInline(raw).trim();
    if (!text) continue;
    entries.push({ depth, text, slug: slugger.slug(text) });
  }

  return entries;
}
