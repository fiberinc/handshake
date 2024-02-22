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

export const StyleWrapper = styled.div`
  line-height: 1.7;
  display: flex;
  flex-direction: column;
  font-size: 17px;
  font-weight: 400;
  color: rgb(var(--text-contrast));

  a {
    text-decoration: underline;
    // text-decoration-style: dashed;
    text-underline-offset: 6px;
    color: var(--color-link);
  }

  strong {
    font-weight: 600;
  }

  li {
    list-style-type: "–    ";
    /* padding-left: 20px; */
    list-style-position: inside;
  }

  *:not(pre) > code {
    color: rgb(var(--text-contrast));
    border: 1px solid rgba(var(--text-contrast) / 0.4);
    border-radius: 4px;
    font-size: 0.9rem;
    padding: 3px 5px;
  }

  pre > code {
    overflow-x: scroll;
    border-radius: 4px;
    /* background-color: var(--border-primary); */
    padding: 20px;
    font-size: 0.86rem;
    background: rgb(var(--color-foreground));
    tab-size: 300px;
  }

  blockquote,
  iframe,
  .twitter-tweet,
  & > p,
  & > ul,
  & > ol {
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
    -webkit-font-smoothing: auto !important;
  }

  h1 {
    font-size: 1.5em;
    margin-bottom: 1em;
  }

  h2 {
    font-size: 1.3em;
    font-weight: 500;
    margin-bottom: 0.8em;
  }

  h3 {
    font-size: 1em;
    font-weight: 500;
    margin-bottom: 0.5em;
  }

  blockquote {
    border-left: 4px solid #f3f4f6;
    padding-left: 1em;
  }

  /* SHOW LINE NUMBERS */

  code {
    counter-reset: line;
  }

  code > [data-line]::before {
    counter-increment: line;
    content: counter(line);

    /* Other styling */
    display: inline-block;
    width: 1rem;
    margin-right: 1rem;
    text-align: right;
    color: gray;
  }

  code[data-line-numbers-max-digits="2"] > [data-line]::before {
    width: 2rem;
  }

  code[data-line-numbers-max-digits="3"] > [data-line]::before {
    width: 3rem;
  }

  img {
    border: 1px solid var(--border-primary);
  }

  /* SHOW TAB TITLE */

  figure[data-rehype-pretty-code-figure] {
    border-radius: 5px;
    overflow: hidden;
    margin-bottom: 30px;

    figcaption {
      border-top-right-radius: 5px;
      border-top-left-radius: 5px;
      background: var(--background-primary);
      font-size: 13px;
      display: flex;
      height: 40px;
      align-items: center;
      font-family: monospace;
      justify-content: center;
      color: rgb(var(--text-contrast));
      background: rgb(var(--bg-foreground));
      border: 1px solid var(--border-primary);
    }
  }
`;

export function MdxRender<TScope, TFrontmatter>(
  props: MDXRemoteProps<TScope, TFrontmatter>,
) {
  return (
    <StyleWrapper className="[&_strong]:text-black dark:[&_strong]:text-white">
      <MDXRemote {...props} components={MARKDOWN_COMPONENTS} />
    </StyleWrapper>
  );
}
