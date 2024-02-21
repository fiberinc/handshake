import assert from "assert";
import {
  AmazonSeller,
  GitHub,
  Google,
  HandshakeConfig,
  Hubspot,
  NextHandshake,
  Shopify,
} from "handshake";

const REDIRECT_URL = process.env.REDIRECT_URL || "";
assert(REDIRECT_URL, "Specify a URL at REDIRECT_URL.");

export const OPTIONS: HandshakeConfig = {
  secret: process.env.SESSION_SECRET!,
  allowedRedirectUris: [REDIRECT_URL],
  handlers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    GitHub({
      id: "github-other",
      clientId: "anotheraccount",
      clientSecret: "anothersecret",
    }),
    Hubspot({
      clientId: process.env.HUBSPOT_CLIENT_ID!,
      clientSecret: process.env.HUBSPOT_CLIENT_SECRET!,
      scopes: [
        "oauth",
        "e-commerce",
        "crm.schemas.contacts.read",
        "crm.objects.contacts.read",
      ],
    }),
    Shopify({
      clientId: process.env.SHOPIFY_CLIENT_ID!,
      clientSecret: process.env.SHOPIFY_CLIENT_SECRET!,
      scopes: ["read_orders", "read_products"],
    }),
    AmazonSeller({
      appId: process.env.AMAZON_APP_ID!,
      clientId: process.env.AMAZON_CLIENT_ID!,
      clientSecret: process.env.AMAZON_CLIENT_SECRET!,
      isDraftApp: true,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      // requiredScopes: ["https://www.googleapis.com/auth/gmail.readonly"],
    }),
  ],
  /**
   * This is where you'll handle forwarding the acquired credentials back to
   * your own app. There are three main strategies for doing this securely:
   *
   * 1. **Encrypted URL params.** Encrypt the credentials using a secret shared
   *    between Handshake and your app, and send it back by setting
   *    `forwardParams`.
   * 2. **API call.** Make an API call to your backend with the credentials.
   * 2. **Cookies.** If you're hosting Handshake on the same domain as your app,
   *    you can set by using `cookies` from `next/server`.
   *
   * @param handlerId - Identifies the provider that handled this handshake, eg:
   * 'google', 'github', 'amazon-seller' etc.
   */
  async onSuccess(credentials: unknown, handlerId) {
    return {
      forwardParams: {},
    };
  },
};

export const { GET, POST } = NextHandshake(OPTIONS);
