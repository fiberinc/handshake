export default function Page() {
  return <div>soon</div>;
}

// import { Metadata } from 'next'
// import Link from 'next/link'
// import { notFound } from 'next/navigation'
// import { TopicBadges } from '~/app/changelog/Item'
// import { constructMetadata } from '~/shared/metadata'
// import { getBlogMdxs, getPost } from '../loader'
// import { AuthorAvatars } from './AuthorAvatars'
// import { PostRender } from './PostRender'

// interface Props {
//   params: {
//     slug: string
//   }
// }

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   const post = await getPost(params.slug)

//   if (!post) {
//     throw Error(`Can't fetch metadata for post ${params.slug}`)
//   }

//   // optionally access and extend (rather than replace) parent metadata
//   // const previousImages = (await parent).openGraph?.images || []
//   return constructMetadata({
//     title: `${post.title} – Fiber Blog`,
//     description: post.excerpt,
//     image: post.imageUrl,
//   })
// }

// export default async function Page({ params }: Props) {
//   const post = await getPost(params.slug)
//   if (!post) {
//     return notFound()
//   }

//   return (
//     <>
//       <nav className="mb-10">
//         <Link
//           href="/blog"
//           className="text-link hover:opacity-100 opacity-80 transition-all cursor-pointer"
//         >
//           &larr; Go back
//         </Link>
//       </nav>
//       <header className="flex  max-w-[700px] flex-col gap-10 justify-between items-center mb-10">
//         <div
//           className="w-full h-[250px] rounded-2xl overflow-hidden bg-center bg-no-repeat bg-cover"
//           style={{
//             backgroundImage: `url("${post.imageUrl}")`,
//           }}
//         />

//         <div className="flex flex-col gap-5 w-full">
//           <h1 className="text-4xl text-contrast font-semibold">{post.title}</h1>
//           <TopicBadges categories={post.categories} />
//           <div className="text-sm flex flex-col gap-3">
//             <p className="inline-flex gap-3 items-center">
//               By <AuthorAvatars ids={post.authorIds} />
//             </p>
//             <p className="text-sm">
//               Updated {formatDate(new Date('2024-01-28').toString())}
//             </p>
//           </div>
//         </div>
//       </header>
//       <div className="grid gap-10 lg:grid-cols-[70%_30%] grid-col-wi">
//         <PostRender {...post.serialized} />
//         <aside></aside>
//       </div>
//     </>
//   )
// }

// // There are no posts other than the ones we specify.
// export const dynamicParams = false

// export const generateStaticParams = async (): Promise<Props['params'][]> => {
//   const posts = await getBlogMdxs()

//   return posts.map((post) => ({
//     slug: post.slug,
//   }))
// }
