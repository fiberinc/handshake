import { serialize } from "next-mdx-remote/serialize";
import rehypePrettyCode from "rehype-pretty-code";
import providers from "../providers.json";
import { BASE_URL } from "./routes";

export interface ProviderInfo {
  id: string;
  title: string;
  serialized: null | any;
  hasLogo?: boolean;
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
Connect to your customers&apos; ${provider.title} accounts.

\`\`\`ts title="app/options.ts"
import { ${provider.name}, HandshakeOptions } from "handshake";

const config: HandshakeOptions = {
  handlers: [
    ${provider.name}({
      clientId: string,
      clientSecret: string,
    });
  ],
}

// ...
\`\`\`

Adapted from [next-auth](https://github.com/nextauthjs/next-auth).`;
      }

      return {
        id: provider.id,
        title: provider.title,
        darkLogoUrl: provider.logo
          ? `${BASE_URL}/images/logos/${provider.logo}`
          : null,
        // logoUrl: provider.logo
        //   ? // ? `${BASE_URL}/images/logos/${provider.logo.replace(".svg", "-dark.svg")}`
        //     `${BASE_URL}/images/logos/${provider.logo}`
        //   : null,
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
