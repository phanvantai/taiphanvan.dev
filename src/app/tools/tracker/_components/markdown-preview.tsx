"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Props {
  source: string;
}

export function MarkdownPreview({ source }: Props) {
  if (!source.trim()) {
    return (
      <p className="text-muted-foreground/70 font-mono text-xs italic">
        Chưa có notes. Hỗ trợ markdown.
      </p>
    );
  }
  return (
    <div className="prose prose-sm prose-neutral dark:prose-invert max-w-none [&>:first-child]:mt-0 [&>:last-child]:mb-0">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{source}</ReactMarkdown>
    </div>
  );
}
