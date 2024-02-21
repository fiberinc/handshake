import { serialize } from "next-mdx-remote/serialize";
import rehypePrettyCode from "rehype-pretty-code";
import providers from "../providers.json";

export interface ProviderInfo {
  id: string;
  name: string;
  logoUrl: string;
  serialized: null | any;
}

export async function getProviderInfos(): Promise<ProviderInfo[]> {
  const filteredProviders =
    process.env.NODE_ENV === "development" ? providers.slice(0, 10) : providers;

  return Promise.all(
    filteredProviders.map(async (provider): Promise<ProviderInfo> => {
      let providerText: string = provider.text ?? "";
      if (!providerText) {
        providerText = `
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
        logoUrl: `/handshake/images/logos/${provider.name.toLocaleLowerCase()}.svg`,
        serialized: await getSerializedMarkdown(providerText),
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
