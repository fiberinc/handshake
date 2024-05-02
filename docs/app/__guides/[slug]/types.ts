import path from "path";

export const BLOG_POST_DIR = path.join(process.cwd(), "app/guides/content");

export interface GuideReference {
  slug: string;
  title: string;
  subtitle?: string;
  imageUrl?: string;
}

export interface Guide extends GuideReference {
  frontmatter: any;
  serialized: any;
}
