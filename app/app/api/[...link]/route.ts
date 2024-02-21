import assert from "assert";
import {
  AmazonSeller,
  GitHub,
  Google,
  HandshakeOptions,
  Hubspot,
  NextHandshake,
  Shopify,
} from "handshake";

const REDIRECT_URL = process.env.REDIRECT_URL || "";
assert(REDIRECT_URL, "Specify a URL at REDIRECT_URL.");

export const options: HandshakeOptions = {
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
      appId: "asdf",
      clientId: "asdf",
      clientSecret: "asdf",
      isDraftApp: true,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      // requiredScopes: ["https://www.googleapis.com/auth/gmail.readonly"],
    }),
  ],
  async onSuccess(credentials, handlerId) {
    // This

    return {
      // external_id: externalId,
    };
  },
};

export const { GET, POST } = NextHandshake(options);
