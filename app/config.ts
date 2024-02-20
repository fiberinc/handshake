import assert from "assert";
import {
  AmazonSellerProvider,
  GitHubProvider,
  GoogleProvider,
  Handshake,
  HubspotProvider,
  ShopifyProvider,
} from "fiber-handshake";

const REDIRECT_URL = process.env.REDIRECT_URL || "";
assert(REDIRECT_URL, "Specify a URL at REDIRECT_URL.");

export const config = Handshake({
  secret: process.env.SESSION_SECRET!,
  allowedRedirectUris: [REDIRECT_URL],
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
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
  async onSuccess(providerId: string, credential) {
    console.log("credential", credential);

    return {
      // external_id: externalId,
    };
  },
});
