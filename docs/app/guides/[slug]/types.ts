import path from "path";

export const BLOG_POST_DIR = path.join(process.cwd(), "app/guides/content");

export interface Guide {
  slug: string;
  title: string;
  subtitle?: string;
  imageUrl?: string;
  frontmatter: any;
  serialized: any;
}
