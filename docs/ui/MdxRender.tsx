"use client";

// TODO move to @next/mdx https://nextjs.org/docs/app/building-your-application/configuring/mdx

import styled from "@emotion/styled";
import { MDXRemote, MDXRemoteProps } from "next-mdx-remote";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export const MARKDOWN_COMPONENTS = {
  DocsLink(props: ComponentProps<"a">) {
    return <a {...props}>Link to the documentation &rarr;</a>;
  },
  Callout({ children }: ComponentProps<"div"> & { variant: "info" }) {
    return (
      <div className={twMerge("rounded-sm border p-4 text-[.95rem]")}>
        {children}
      </div>
    );
  },
  // CodeBlock({chidren}: ComponentProps<'a'>) {
  //   return <codeblock>{children}</codeblock>
  // },
};

const a = `
  line-height: 1.7;

  p {
    font-size: 1rem;
  }

  a {
    text-decoration: underline;
    text-decoration-style: dashed;
  }

  strong {
    font-weight: 600;
  }

  a {
    text-underline-offset: 4px;
  }

  li {
    list-style-type: '–    ';
    /* padding-left: 20px; */
    list-style-position: inside;
  }

  blockquote,
  iframe,
  .twitter-tweet,
  & > p,
  & > ul {
    margin-bottom: 0.8em !important;
  }

  code {
    border-radius: 4px;
    background-color: var(--border-primary);
    padding: 2px 4px;
    font-size: 0.9rem;
  }
`;

export const MDXWrapper = styled.div`
  ${a}
`;

export const MDXFullTextWrapper = styled(MDXWrapper)`
  ${a}

  display: flex;
  flex-direction: column;

  blockquote,
  iframe,
  .twitter-tweet,
  & > p,
  & > ul {
    margin-bottom: 1.5em !important;
  }

  .twitter-tweet {
    align-self: center;
  }

  hr {
    border: none;
    border-bottom: 3px solid #aaaaaa22;
    margin: 2em 0;
  }

  iframe {
    margin: 0 auto;
  }

  h1,
  h2,
  h3,
  h4 {
    color: black;
    -webkit-font-smoothing: auto !important;
  }

  @media (prefers-color-scheme: dark) {
    h1,
    h2,
    h3,
    h4 {
      color: white;
    }
  }

  h1 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  h2 {
    font-size: 1.3rem;
    font-weight: 500;
    margin-bottom: 0.8rem;
  }

  h3 {
    font-size: 1rem;
    font-weight: 600;
  }

  blockquote {
    border-left: 4px solid #f3f4f6;
    padding-left: 1rem;
  }
`;

export function MdxRender<TScope, TFrontmatter>(
  props: MDXRemoteProps<TScope, TFrontmatter>,
) {
  return (
    <MDXFullTextWrapper className="[&_strong]:text-black dark:[&_strong]:text-white">
      <MDXRemote {...props} components={MARKDOWN_COMPONENTS} />
    </MDXFullTextWrapper>
  );
}
