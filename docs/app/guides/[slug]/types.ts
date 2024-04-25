import { SerializeOptions } from "next-mdx-remote/dist/types";
import path from "path";
import rehypePrettyCode from "rehype-pretty-code";

export const BLOG_POST_DIR = path.join(process.cwd(), "app/guides/content");

export interface Guide {
  slug: string;
  title: string;
  subtitle?: string;
  imageUrl?: string;
  frontmatter: any;
  serialized: any;
}

export const mdxOptions: SerializeOptions = {
  parseFrontmatter: true,
  mdxOptions: {
    rehypePlugins: [
      [
        // @ts-ignore
        rehypePrettyCode,
        {
          theme: "github-dark-dimmed",
        },
      ],
    ],
  },
};
