import { Client } from "@notionhq/client";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import assert from "assert";
import { serialize } from "next-mdx-remote/serialize";
import { NotionToMarkdown } from "notion-to-md";
import { mdxOptions } from "./loaders";
import { Guide, GuideReference } from "./types";

const notionClient = new Client({
  auth: process.env.NOTION_ACCESS_TOKEN,
});

const notionDatabaseId = process.env.NOTION_DATABASE_ID || "";
// assert(notionDatabaseId, "NOTION_DATABASE_ID");

export async function getNotionPost(
  slug: string,
  includeMarkdown = false,
): Promise<Guide | null> {
  const res = await notionClient.databases.query({
    database_id: notionDatabaseId,
    filter: {
      and: [
        {
          property: "slug",
          rich_text: {
            equals: slug,
          },
        },
        {
          property: "visible",
          checkbox: {
            equals: true,
          },
        },
      ],
    },
  });

  if (res.results.length === 0) {
    console.warn(`No post found with slug '${slug}'`);
    return null;
  }

  const post = res.results[0] as PageObjectResponse;

  const partialGuide = postPropertiesToGuide(post);
  if (!partialGuide) {
    throw Error("Incomplete post can't be visualized.");
  }

  let markdown = "";
  if (includeMarkdown) {
    const n2m = new NotionToMarkdown({ notionClient });
    const mdblocks = await n2m.pageToMarkdown(post.id);
    markdown = n2m.toMarkdownString(mdblocks).parent;
    console.log("md", markdown);
  }

  return {
    ...partialGuide,
    serialized: await serialize(markdown, mdxOptions),
    frontmatter: {},
    slug,
  };
}

function postPropertiesToGuide(
  post: PageObjectResponse,
): GuideReference | null {
  const propTitle = post.properties.title as any;
  assert(propTitle, "expected property 'title'");
  const title = propTitle.title[0]?.plain_text;
  if (!title) {
    console.warn("Found post without title.");
    return null;
  }

  const propVisible = post.properties.visible as any;
  assert(propVisible, "expected property 'visible'");
  if (!propVisible) {
    console.warn("Found post with visible=false.");
    return null;
  }

  const propSubtitle = post.properties.subtitle as any;
  assert(propSubtitle, "expected property 'subtitle'");
  const subtitle = propSubtitle.rich_text[0]?.plain_text || "";

  const propSlug = post.properties.slug as any;
  assert(propSlug, "expected property 'slug'");
  const slug = propSlug.rich_text[0]?.plain_text;
  if (!slug) {
    console.warn("Found post without slug.");
    return null;
  }

  return {
    title,
    subtitle,
    slug,
  };
}

export async function getNotionPosts(): Promise<GuideReference[]> {
  const res = await notionClient.databases.query({
    database_id: notionDatabaseId,
    filter: {
      property: "visible",
      checkbox: {
        equals: true,
      },
    },
  });

  console.log("All posts from Notion:", res);

  const result: GuideReference[] = [];

  const posts = res.results as PageObjectResponse[];
  for (const post of posts) {
    if (!("slug" in post.properties)) {
      throw Error("Database needs a slug property.");
    }

    // const mdString = n2m.toMarkdownString(mdblocks);
    // const filename = `${POSTS_DIR}/${slug}.mdx`;

    const partialGuide = postPropertiesToGuide(post);
    if (!partialGuide) {
      console.warn("Skipping post.");
      continue;
    }

    result.push(partialGuide);
  }

  return result;
}
