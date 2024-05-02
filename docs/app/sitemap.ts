import { MetadataRoute } from "next";
import { headers } from "next/headers";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const headersList = headers();
  const domain = headersList.get("host") as string;

  return [
    {
      url: `https://${domain}`,
      lastModified: new Date(),
    },
    {
      url: `https://${domain}/providers`,
      lastModified: new Date(),
    },
    {
      url: `https://${domain}/changelog`,
      lastModified: new Date(),
    },
    // ...(await getGuides()).map((f) => ({
    //   url: `https://${domain}/guides/${f.slug}`,
    //   lastModified: new Date(),
    // })),
  ];
}
