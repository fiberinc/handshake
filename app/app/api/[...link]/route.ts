import assert from "assert";
import {
  AmazonSellerProvider,
  GitHubProvider,
  GoogleProvider,
  Handshake,
  HubspotProvider,
  NextHandshake,
  ShopifyProvider,
} from "handshake";

const REDIRECT_URL = process.env.REDIRECT_URL || "";
assert(REDIRECT_URL, "Specify a URL at REDIRECT_URL.");

export const options = Handshake({
  secret: process.env.SESSION_SECRET!,
  allowedRedirectUris: [REDIRECT_URL],
  handlers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    GitHubProvider({
      id: "github-other",
      clientId: "anotheraccount",
      clientSecret: "anothersecret",
    }),
    HubspotProvider({
      clientId: process.env.HUBSPOT_CLIENT_ID!,
      clientSecret: process.env.HUBSPOT_CLIENT_SECRET!,
      scopes: [
        "oauth",
        "e-commerce",
        "crm.schemas.contacts.read",
        "crm.objects.contacts.read",
      ],
    }),
    ShopifyProvider({
      clientId: process.env.SHOPIFY_CLIENT_ID!,
      clientSecret: process.env.SHOPIFY_CLIENT_SECRET!,
      scopes: ["read_orders", "read_products"],
    }),
    AmazonSellerProvider({
      appId: "asdf",
      clientId: "asdf",
      clientSecret: "asdf",
      isDraftApp: true,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      // requiredScopes: ["https://www.googleapis.com/auth/gmail.readonly"],
    }),
  ],
  async onSuccess(credential, handlerId) {
    // This

    return {
      // external_id: externalId,
    };
  },
});

export const { GET, POST } = NextHandshake(options);
