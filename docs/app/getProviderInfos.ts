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
        hasLogo: PROVIDERS_WITH_LOGOS.includes(provider.id),
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

export const PROVIDERS_WITH_LOGOS =
  "23andme 42-school 500px adobe aha amazon-seller amazon angellist apple asana asgardeo atlassian auth0 authentik autodesk azure-ad-b2c azure-ad azure baidu basecamp battlenet beatport beyondidentity bitbucket bitly box buffer campaignmonitor cas cognito coinbase coursera copy coursera dailymotion deezer descope deviantart digitalocean discogs discord discus disqus docusign dribbble dropbox duende-identity-server6 ebay etsy eventbrite copy eventbrite eveonline evernote eyeem facebook faceit feedly figma fitbit flickr formstack foursquare freelancer freshbooks fusionauth garmin genius gitbook github gitlab gitter goodreads google groove gumroad copy gumroad harvest heroku homeaway hootsuite hubspot ibm iconfinder imgur instagram intuit kakao keycloak line linkedin live livechat logingov lyft mailchimp mattermost medium meetup mendeley mention microsoft mixcloud monday myob naver nest netlify notion nylas okta openstreetmap optimizely osso osu passage patreon paypal pinterest pipedrive plurk pocket podio procore producthunt pushbullet ravelry reddit salesforce shopify skyrock slack slice smugmug snapchat snowflake soundcloud spotify square stackexchange storyblok strava stripe surveymonkey thingiverse tiktok todoist trakt trello trustpilot tumblr twitch twitter typeform uber unbounce underarmour unsplash untappd upwork copy upwork uservoice venmo vercel vimeo visualstudio vk wechat copy wechat weibo wikimedia wordpress workos wrike xero xing yahoo yammer yandex zendesk copy zendesk zoho zoom".split(
    " ",
  );

// REMOVED because they're ugly: viadeo runkeeper zitadel arcgis egnyte
