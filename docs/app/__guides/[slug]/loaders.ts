import fs from "fs";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import path from "path";
import rehypePrettyCode from "rehype-pretty-code";
import { z } from "zod";
import { getNotionPosts } from "./notion";
import { BLOG_POST_DIR, Guide, GuideReference } from "./types";

export const isTruthy = <T>(n?: T | null): n is T => Boolean(n);

export async function getGuides(): Promise<GuideReference[]> {
  return await getBlogMdxs();
}

export function sortByDate(posts: { published_at: string }[]) {
  return posts.sort(function (a, b) {
    return (
      new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
    );
  });
}

export function parseArticleMetadata({
  frontmatter,
}: MDXRemoteSerializeResult): Omit<
  Guide,
  "slug" | "serialized" | "frontmatter" | "readingTimeMinutes"
> {
  const parsed = z
    .object({
      title: z.string(),
      subtitle: z.string().optional(),
      feature_image: z.string().optional(),
    })
    .parse(frontmatter);

  return {
    title: parsed.title,
    subtitle: parsed.subtitle,
    imageUrl: parsed.feature_image,
  };
}

/**
 *
 * To find the slug, we remove date and extension from the filename. Ie
 * '20240106_slug.mdx' -> 'slug'. We don't use the date in the filename for
 * anything. Only the frontmatter metadata is used to termine `published_at`.
 *
 * @returns An array of serialized markdown files in the /blog directory, with
 * some metadata.
 *
 * FIXME this is getting called once per page. There must be a way to do this.
 */
export async function getBlogMdxs(): Promise<GuideReference[]> {
  return await getNotionPosts();

  const filesInFolder = fs.readdirSync(BLOG_POST_DIR);

  const slugToPath: Record<string, string> = {};
  for (const fileName of filesInFolder) {
    if (path.extname(fileName) !== ".mdx") {
      continue;
    }

    const absPath = path.join(BLOG_POST_DIR, fileName);
    if (!fs.existsSync(absPath)) {
      // Wait wtf is this for?
      console.log(`File at ${absPath} does not exist.`);
      continue;
    }

    const slug = fileName.replace(".mdx", "").replace(/^\d{8}[_-]/, "");
    // console.log('slug', slug)

    if (slugToPath[slug]) {
      throw Error(`Same slug used twice: ${slug}`);
    }

    slugToPath[slug] = absPath;
  }

  // console.log('Found blog posts:', Object.keys(slugToPath).join(',  '))

  const posts: Guide[] = [];
  for (const [slug, absPath] of Object.entries(slugToPath)) {
    const contents = fs.readFileSync(absPath, "utf8");
    if (!contents) {
      throw Error(`No post contents for ${slug}`);
    }

    const serialized = await serialize(contents, mdxOptions);

    if (serialized.frontmatter.hidden) {
      // console.log('Skipping hidden article')
      continue;
    }

    let parsed;
    try {
      parsed = parseArticleMetadata(serialized);
    } catch (e: any) {
      throw Error(`Failed to parse file: ${absPath}, error: ${e.message}`);
    }

    posts.push({
      ...parsed,
      slug,
      frontmatter: serialized.frontmatter,
      serialized: serialized as MDXRemoteSerializeResult,
    });
  }

  return posts;
}

export async function getPost(slug: string): Promise<Guide | null> {
  const filesNames = fs.readdirSync(BLOG_POST_DIR);
  const fileName = filesNames.find((n) => {
    return n.replace(/^\d{8}[-_]/, "") === slug + ".mdx";
  });
  // console.log('filename', filesNames, fileName)
  if (!fileName) {
    return null;
  }
  const filepath = path.join(BLOG_POST_DIR, fileName);
  if (!fs.existsSync(filepath)) {
    throw Error("very much");
  }
  const contents = fs.readFileSync(filepath, "utf8");
  const serialized = await serialize(contents, mdxOptions);
  return {
    ...parseArticleMetadata(serialized),
    slug,
    frontmatter: serialized.frontmatter,
    serialized,
  };
}

export const mdxOptions: any = {
  // SerializeOptions
  parseFrontmatter: true,
  mdxOptions: {
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          theme: "github-dark-dimmed",
        },
      ],
    ],
  },
};
