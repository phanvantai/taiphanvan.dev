import "server-only";

import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkMdx from "remark-mdx";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { visit } from "unist-util-visit";

/**
 * Convert MDX source → static HTML for use in RSS feeds.
 *
 * MDX JSX nodes (e.g. <Callout>) are stripped because they require React
 * runtime; their text children are kept inline so the prose still reads.
 * For more nuanced rendering we'd need server-render the React tree, but
 * that's overkill for RSS.
 */
export async function mdxToHtml(source: string): Promise<string> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkMdx)
    .use(remarkGfm)
    .use(stripMdxJsx)
    .use(remarkRehype, { allowDangerousHtml: false })
    .use(rehypeStringify)
    .process(source);

  return String(file);
}

/**
 * Replace MDX JSX nodes (mdxJsxFlowElement / mdxJsxTextElement / mdxFlowExpression
 * / mdxTextExpression) with their text content so RSS HTML doesn't carry raw JSX.
 */
function stripMdxJsx() {
  return (tree: unknown) => {
    visit(
      tree as Parameters<typeof visit>[0],
      (node: { type: string; children?: { type: string }[]; value?: string }) => {
        const t = node.type;
        if (
          t === "mdxJsxFlowElement" ||
          t === "mdxJsxTextElement" ||
          t === "mdxFlowExpression" ||
          t === "mdxTextExpression" ||
          t === "mdxjsEsm"
        ) {
          // Replace with a paragraph that contains the inner children, or empty if none.
          const replacement = {
            type: "paragraph" as const,
            children: node.children ?? [],
          };
          Object.assign(node, replacement);
        }
      },
    );
  };
}
