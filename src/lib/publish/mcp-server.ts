import "server-only";

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";

import { locales } from "@/i18n/routing";
import { siteConfig } from "@/lib/site-config";

import { PublishError } from "./github";
import { deletePost, getPost, listPosts, publishPost, updatePost } from "./posts";

/**
 * MCP server for writing to the blog. Everything a caller needs to know is in
 * the instructions and tool descriptions below — callers never see this repo.
 */

const INSTRUCTIONS = `Publishing tools for the blog at ${siteConfig.url}.

Writing a post:
- Send plain Markdown: headings (start at ##), lists, links, tables, blockquotes, fenced code blocks with a language. No HTML, no JSX, no frontmatter.
- Put code, HTML tags and anything in angle brackets inside backticks or a code block; raw HTML is dropped.
- Do not repeat the title as a heading at the top; the site renders the title itself.
- Images: only Markdown images pointing at a public https URL.
- The blog is written in Vietnamese by default (locale "vi"). Use locale "en" only for an English version, with the same slug as the Vietnamese post.
- The slug, date and URL are generated for you. Call list_posts first if the topic may already be covered.

A published post goes live about two minutes after the tool returns. Use draft: true to save a post without showing it on the site.`;

const DEPLOY_NOTE = "The site rebuilds automatically; the change is live in about two minutes.";

const locale = z.enum(locales).optional().describe('Language of the post: "vi" (default) or "en".');
const slug = z.string().min(1).describe("The post's slug, as returned by list_posts.");

function ok(data: object): CallToolResult {
  return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
}

/** Run a tool body, turning failures into an error the calling model can act on. */
async function run(body: () => Promise<object>): Promise<CallToolResult> {
  try {
    return ok(await body());
  } catch (error) {
    if (!(error instanceof PublishError)) console.error("[publish] unexpected error", error);
    const text =
      error instanceof PublishError
        ? error.message
        : "Unexpected server error; nothing was changed.";
    return { content: [{ type: "text", text }], isError: true };
  }
}

export function createPublishServer(): McpServer {
  const server = new McpServer(
    { name: "taiphanvan-blog", version: "1.0.0" },
    { instructions: INSTRUCTIONS },
  );

  server.registerTool(
    "publish_post",
    {
      title: "Publish a blog post",
      description:
        "Publish a new blog post from a title and plain Markdown. Returns the post's URL. Fails if a post with the same slug already exists — use update_post for that.",
      inputSchema: {
        title: z.string().min(1).max(200).describe("Post title, plain text."),
        content: z
          .string()
          .min(1)
          .describe(
            "Post body in plain Markdown. No frontmatter, no HTML, and no top-level title heading.",
          ),
        description: z
          .string()
          .max(300)
          .optional()
          .describe(
            "One or two sentences shown in the post list and search results. Defaults to the first paragraph.",
          ),
        tags: z
          .array(z.string())
          .max(8)
          .optional()
          .describe('Topic tags, e.g. ["ai", "machine-learning"]. Reuse tags from list_posts.'),
        slug: z
          .string()
          .optional()
          .describe("URL slug. Defaults to one derived from the title; rarely needed."),
        date: z.string().optional().describe("Publication date, YYYY-MM-DD. Defaults to today."),
        locale,
        draft: z
          .boolean()
          .optional()
          .describe("true saves the post without showing it on the site. Default false."),
      },
      annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: true },
    },
    (input) =>
      run(async () => {
        const post = await publishPost(input);
        return { ...post, note: post.draft ? "Saved as a draft; not visible." : DEPLOY_NOTE };
      }),
  );

  server.registerTool(
    "update_post",
    {
      title: "Update a blog post",
      description:
        "Change an existing post. Only the fields you pass are changed; `content` replaces the whole body. The URL never changes. Set draft: true to hide a post, draft: false to publish a draft.",
      inputSchema: {
        slug,
        locale,
        title: z.string().min(1).max(200).optional().describe("New title."),
        content: z.string().min(1).optional().describe("New full body in plain Markdown."),
        description: z.string().max(300).optional().describe("New description."),
        tags: z.array(z.string()).max(8).optional().describe("New full list of tags."),
        draft: z.boolean().optional().describe("true hides the post, false publishes it."),
      },
      annotations: { readOnlyHint: false, destructiveHint: true, openWorldHint: true },
    },
    (input) => run(async () => ({ ...(await updatePost(input)), note: DEPLOY_NOTE })),
  );

  server.registerTool(
    "list_posts",
    {
      title: "List blog posts",
      description:
        "List existing posts, newest first, drafts included: slug, title, description, date, tags, URL. Use it to avoid duplicate topics and to find a slug.",
      inputSchema: {
        locale,
        limit: z
          .number()
          .int()
          .min(1)
          .max(50)
          .optional()
          .describe("How many posts to return (default 20, max 50)."),
      },
      annotations: { readOnlyHint: true, openWorldHint: true },
    },
    (input) => run(() => listPosts(input.locale, input.limit)),
  );

  server.registerTool(
    "get_post",
    {
      title: "Read a blog post",
      description: "Read one post's metadata and full Markdown body, e.g. before editing it.",
      inputSchema: { slug, locale },
      annotations: { readOnlyHint: true, openWorldHint: true },
    },
    (input) => run(() => getPost(input.slug, input.locale)),
  );

  server.registerTool(
    "delete_post",
    {
      title: "Delete a blog post",
      description:
        "Permanently remove a post from the site. Only do this when the user explicitly asks to delete; to hide a post, use update_post with draft: true instead.",
      inputSchema: { slug, locale },
      annotations: { readOnlyHint: false, destructiveHint: true, openWorldHint: true },
    },
    (input) =>
      run(async () => ({
        deleted: await deletePost(input.slug, input.locale),
        note: DEPLOY_NOTE,
      })),
  );

  return server;
}
