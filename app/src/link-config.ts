import assert from "assert";
import {
  AmazonSellerProvider,
  AmazonSellerProviderId,
  DEFAULT_SHOPIFY_SCOPES,
  GoogleProvider,
  GoogleProviderId,
  LinkConfig,
  ShopifyProvider,
  ShopifyProviderId,
} from "fiber-link";

const WEBSITE_URL = process.env.WEBSITE_URL || "";
assert(WEBSITE_URL);

export const linkOptions = LinkConfig({
  project: {
    id: "app",
    title: "My App Name",
    logo: "/images/projects/logo.svg",
    supportEmail: "team@project.dev",
  },
  redirectUris: [WEBSITE_URL],
  providers: [
    ShopifyProvider({
      clientId: "",
      clientSecret: "",
      scopes: DEFAULT_SHOPIFY_SCOPES,
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
      requiredScopes: ["https://www.googleapis.com/auth/gmail.readonly"],
    }),
  ],
  async onSuccess(providerId, credential, { account_id }) {
    let fiberCredential;
    let customExternalId = null;
    if (providerId === ShopifyProviderId) {
    } else if (providerId === GoogleProviderId) {
      fiberCredential = { ...(credential as any) };
    } else if (providerId === AmazonSellerProviderId) {
      if (!account_id) {
        throw Error(`AmazonSeller needs 'account_id' query param`);
      }
      // Use the `account_id` parameter that we received from the client
      // application to set the account's "external id" in Fiber.
      customExternalId = account_id;
      // Send an AmazonSp credential the way Fiber expects it.
      fiberCredential = {
        refreshToken: (credential as any).refreshToken,
        sellerId: account_id,
      };
    } else {
      throw Error(`unexpected provider ${providerId}`);
    }

    console.log("fiberCredential", fiberCredential);

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
