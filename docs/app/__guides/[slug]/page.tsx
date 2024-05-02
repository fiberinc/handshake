import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { constructMetadata } from "~/app/construct-metadata";
import { PostRender } from "./PostRender";
import { getBlogMdxs } from "./loaders";
import { getNotionPost } from "./notion";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getNotionPost(params.slug);

  if (!post) {
    throw Error(`Can't fetch metadata for post ${params.slug}`);
  }

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []
  return constructMetadata({
    title: `${post.title} – Handshake Blog`,
    description: post.subtitle,
    image: post.imageUrl,
  });
}

export default async function Page({ params }: Props) {
  const post = await getNotionPost(params.slug, true);
  if (!post) {
    return notFound();
  }

  return (
    <div className="m-auto max-w-[700px]">
      <nav className="mb-10">
        <Link
          href="/guides"
          className="text-link cursor-pointer opacity-80 transition-all hover:opacity-100"
        >
          &larr; Go back
        </Link>
      </nav>
      <header className="mb-10 flex max-w-[700px] flex-col items-center justify-between gap-10">
        {/* <div
          className="h-[250px] w-full overflow-hidden rounded-2xl bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url("${post.imageUrl}")`,
          }}
        /> */}

        <div className="flex w-full flex-col gap-5">
          <h1 className="text-contrast text-4xl font-semibold">{post.title}</h1>
          {post.subtitle && (
            <h2 className="text-contrast text-xl">{post.subtitle}</h2>
          )}
          <div className="flex hidden flex-col gap-3 text-sm">
            <p className="inline-flex items-center gap-3">
              {/* By <AuthorAvatars ids={post.authorIds} /> */}
            </p>
            {/* <p className="text-sm">Updated {dayjs(new Date("2024-01-28"))}</p> */}
          </div>
        </div>
      </header>
      <div className="">
        <PostRender {...post.serialized} />
      </div>
    </div>
  );
}

// There are no posts other than the ones we specify.
export const dynamicParams = false;

export const generateStaticParams = async (): Promise<Props["params"][]> => {
  const posts = await getBlogMdxs();

  return posts.map((post) => ({
    slug: post.slug,
  }));
};
