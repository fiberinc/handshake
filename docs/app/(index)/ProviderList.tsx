import { serialize } from "next-mdx-remote/serialize";
import rehypePrettyCode from "rehype-pretty-code";
import { MdxRender } from "~/ui/MdxRender";
import providers from "../../providers.json";

export async function ProviderList() {
  const infos = await getProviderInfos();

  const els = infos.map((info) => {
    return (
      <div key={info.name}>
        <h1 className="text-3xl font-medium">{info.name}</h1>
        {info.serialized && <MdxRender {...info.serialized}></MdxRender>}
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
      return {
        // ...provider,
        name: provider.name,
        serialized: provider.text
          ? await getSerializedMarkdown(provider.text)
          : null,
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
