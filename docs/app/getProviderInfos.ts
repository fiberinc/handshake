import { serialize } from "next-mdx-remote/serialize";
import rehypePrettyCode from "rehype-pretty-code";
import providers from "../providers.json";
import { BASE_URL } from "./routes";

export interface ProviderInfo {
  id: string;
  name: string;
  title: string;
  darkLogoUrl: string | null;
  logoUrl: string | null;
  serialized: null | any;
}

export async function getProviderInfos(): Promise<ProviderInfo[]> {
  const filteredProviders =
    process.env.NODE_ENV === "development"
      ? providers.slice(0, 500)
      : providers;

  return Promise.all(
    filteredProviders.map(async (provider): Promise<ProviderInfo> => {
      let providerDocs: string = provider.docs ?? "";
      if (!providerDocs) {
        providerDocs = `
\`\`\`ts
// Inside app/api/[...handshake]/route.ts

import { ${provider.name} } from "handshake";

${provider.name}({
  clientId: "",
  clientSecret: "",
});
\`\`\`

Adapted from [next-auth](https://github.com/nextauthjs/next-auth).`;
      }

      return {
        // ...provider,
        id: provider.name.toLowerCase(),
        name: provider.name,
        title: provider.title,
        darkLogoUrl: provider.logo
          ? `${BASE_URL}/images/logos/${provider.logo}`
          : null,
        logoUrl: provider.logo
          ? `${BASE_URL}/images/logos/${provider.logo.replace(".svg", "-dark.svg")}`
          : null,
        serialized: await getSerializedMarkdown(providerDocs),
      };
    }),
  );
}

function getSerializedMarkdown(text: string) {
  return serialize(text, {
    parseFrontmatter: true,
    mdxOptions: {
      rehypePlugins: [
        [
          // @ts-ignore
          rehypePrettyCode,
          {
            theme: "github-dark-dimmed",
          },
        ],
      ],
    },
  });
}
