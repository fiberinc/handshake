// https://rehype-pretty-code.netlify.app/#titles

"use client";

import { MDXRemote, MDXRemoteProps } from "next-mdx-remote";
import { twMerge } from "tailwind-merge";
import { MARKDOWN_COMPONENTS } from "./components";

export function PostRender<TScope, TFrontmatter>(
  props: MDXRemoteProps<TScope, TFrontmatter>,
) {
  return (
    <div
      className={twMerge(
        "block", // enable margin collapsing
        "prose markdown dark:prose-invert ",
      )}
    >
      <MDXRemote {...props} components={MARKDOWN_COMPONENTS} />
    </div>
  );
}
