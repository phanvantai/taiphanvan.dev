import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode, { type Options as PrettyCodeOptions } from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

import { Callout } from "@/components/mdx/callout";
import { MdxImage } from "@/components/mdx/mdx-image";
import { MdxLink } from "@/components/mdx/mdx-link";
import { Pre } from "@/components/mdx/pre";
import type { ContentFormat } from "@/types/post";

const prettyCodeOptions: PrettyCodeOptions = {
  theme: {
    light: "github-light",
    dark: "github-dark",
  },
  keepBackground: false,
  defaultLang: "plaintext",
};

const components: MDXRemoteProps["components"] = {
  Callout,
  Image: MdxImage,
  a: MdxLink,
  pre: Pre,
};

interface Props {
  source: string;
  /** "md" compiles the source as plain Markdown: no JSX, no expressions. */
  format?: ContentFormat;
}

export function MdxContent({ source, format = "mdx" }: Props) {
  return (
    <MDXRemote
      source={source}
      components={components}
      options={{
        mdxOptions: {
          format,
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            rehypeSlug,
            [
              rehypeAutolinkHeadings,
              {
                behavior: "append",
                properties: {
                  className: ["heading-anchor"],
                  ariaLabel: "Anchor link",
                },
                content: { type: "text", value: "#" },
              },
            ],
            [rehypePrettyCode, prettyCodeOptions],
          ],
        },
      }}
    />
  );
}
