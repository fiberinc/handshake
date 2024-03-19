import { serialize } from "next-mdx-remote/serialize";
import rehypePrettyCode from "rehype-pretty-code";
import providers from "../providers.json";

export interface ProviderInfo {
  id: string;
  title: string;
  website: string | null;
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

Connect to your customers&apos; ${provider.website ? `[${provider.title}](${provider.website})` : provider.title} accounts.

## Usage

Provide the following arguments:

\`\`\`ts title="app/options.ts"
import { ${provider.name}, HandshakeOptions } from "handshake";

const config: HandshakeOptions = {
  handlers: [
    ${provider.name}({
      clientId: string,
      clientSecret: string,${provider.takesSubdomainArg ? "\n      subdomain: string," : ""}
    });
  ],
}

// ...
\`\`\`

${provider.isFromNextAuth ? "Adapted from [next-auth](https://github.com/nextauthjs/next-auth)." : ""}`;
      }

      return {
        id: provider.id,
        title: provider.title,
        website: provider.website,
        hasLogo: !PROVIDERS_WITHOUT_LOGOS.includes(provider.id),
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

export const PROVIDERS_WITHOUT_LOGOS =
  "aweber acton acuityscheduling alchemer arcgis assembla authing axosoft bungie clio concur constantcontact crossid delivery deputy echosign ecwid egnyte familysearch freeagent geeklist getbase hellosign huddle idme idonethis infusionsoft jamendo mailup mailru mailxpert mapmyfitness mastodon moxtra nokotime onelogin openstreetmap2 projectplace qq redbooth runkeeper sellsy shoeboxed smartsheet socialpilot socrata stocktwits stormz surveysparrow ticketbud timely traxo tripit united-effects vend verticalresponse viadeo weekdone withings zitadel".split(
    " ",
  );

// REMOVED because they're ugly: viadeo runkeeper zitadel arcgis egnyte
