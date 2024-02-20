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
  redirectUris: [REDIRECT_URL],
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
  async onSuccess(providerId: string, credential: any) {
    console.log("credential", credential);

    // let fiberCredential;
    // let customExternalId = null;
    // if (providerId === ShopifyProviderId) {
    // } else if (providerId === GoogleProviderId) {
    //   fiberCredential = { ...(credential as any) };
    // } else if (providerId === AmazonSellerProviderId) {
    //   if (!account_id) {
    //     throw Error(`AmazonSeller needs 'account_id' query param`);
    //   }
    //   // Use the `account_id` parameter that we received from the client
    //   // application to set the account's "external id" in Fiber.
    //   customExternalId = account_id;
    //   // Send an AmazonSp credential the way Fiber expects it.
    //   fiberCredential = {
    //     refreshToken: (credential as any).refreshToken,
    //     sellerId: account_id,
    //   };
    // } else {
    //   throw Error(`unexpected provider ${providerId}`);
    // }

    // console.log("fiberCredential", fiberCredential);

    // // Map the provider ID to the name of the source on Fiber that we want to
    // // register this account into.
    // const FIBER_SOURCES = {
    // 	[AmazonSellerProviderId]: 'amazon',
    // };

    // let externalId: string;
    // try {
    // 	({ externalId } = await registerFiberAccount(
    // 		'',
    // 		'',
    // 		customExternalId,
    // 		(FIBER_SOURCES as any)[providerId],
    // 		fiberCredential
    // 	));
    // } catch (e: any) {
    // 	Sentry.captureException(e);
    // 	throw Error(`Failed to register Fiber account: ${e.message}`);
    // }

    return {
      // external_id: externalId,
    };
  },
});
