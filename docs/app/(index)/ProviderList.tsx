import { serialize } from "next-mdx-remote/serialize";
import rehypePrettyCode from "rehype-pretty-code";
import { MdxRender } from "~/ui/MdxRender";
import providers from "../../providers.json";

export async function ProviderList() {
  const infos = await getProviderInfos();

  const els = infos.map((info) => {
    const markdown = <MdxRender {...info.serialized} />;

    return (
      <div key={info.name}>
        <h1 className="text-3xl font-medium">{info.name}</h1>
        {markdown}
      </div>
    );
  });
  return <>{els}</>;
}

async function getProviderInfos(): Promise<
  { name: string; serialized: null | any }[]
> {
  return Promise.all(
    providers.map(async (provider) => {
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
        name: provider.name,
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
