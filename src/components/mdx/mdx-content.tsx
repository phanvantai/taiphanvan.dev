import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode, { type Options as PrettyCodeOptions } from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

import { Callout } from "@/components/mdx/callout";
import { MdxImage } from "@/components/mdx/mdx-image";
import { MdxLink } from "@/components/mdx/mdx-link";
import { Pre } from "@/components/mdx/pre";

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
}

export function MdxContent({ source }: Props) {
  return (
    <MDXRemote
      source={source}
      components={components}
      options={{
        mdxOptions: {
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
