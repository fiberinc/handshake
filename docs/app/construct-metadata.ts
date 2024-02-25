// Thank you dub!

import { Metadata } from "next";

const HOME_DOMAIN = "https://handshake.cool";

export function constructMetadata({
  title = `Handshake - Easy OAuth for 200+ APIs`,
  description = `Handshake gets you access tokens to popular APIs like Google, Salesforce and Stripe. It's a Next.js self-serve app that you can configure and deploy in minutes.`,
  image = "https://handshake.cool/images/github-preview.png",
  // icons = [
  //   {
  //     rel: "apple-touch-icon",
  //     sizes: "32x32",
  //     url: "/apple-touch-icon.png",
  //   },
  //   {
  //     rel: "icon",
  //     type: "image/png",
  //     sizes: "32x32",
  //     url: "/favicon-32x32.png",
  //   },
  //   {
  //     rel: "icon",
  //     type: "image/png",
  //     sizes: "16x16",
  //     url: "/favicon-16x16.png",
  //   },
  // ],
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: Metadata["icons"];
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@feliparagao",
    },
    // icons,
    metadataBase: new URL(HOME_DOMAIN),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
