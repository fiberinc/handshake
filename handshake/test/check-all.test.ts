import assert from "assert";
import { OAuthCallbackError } from "~/core/errors";
import { Handler, HandlerFactory } from "~/core/types";
import { TypicalOAuthArgs } from "~/providers/lib/makeOAuthFactory";
import * as allFactories from "../src/providers";

const FLAG_HOST = "flag_17439";

const PROVIDERS_THAT_RESPOND_WITH_4xx = [
  "facebook",
  "github",
  "eveonline",
  "coinbase",
  "faceit",
];

// TODO check up on these.
const PROVIDERS_THAT_RESPOND_WITH_500 = ["mapmyfitness"];

test.skip("AmazonSeller", async () => {
  await testOauthHandler(
    allFactories.AmazonSeller({
      appId: "123",
      clientId: "123",
      clientSecret: "123",
      isDraftApp: true,
    }),
  );
});

test.skip("Shopify", async () => {
  await testOauthHandler(
    allFactories.Shopify({
      clientId: "123",
      clientSecret: "123",
      scopes: ["read_all_orders"],
    }),
    {
      shop: "foobar.myshopify.com",
    },
  );
});

test.each(Object.entries(allFactories).slice(0, 250))(
  "Provider %s",
  async (name, handlerFactory) => {
    if (["AmazonSeller", "Shopify"].includes(name)) {
      // Skip providers we're already testing outside.
      return;
    }

    console.log(`Provider ${name}`);

    const handler = (handlerFactory as HandlerFactory<TypicalOAuthArgs>)({
      clientId: "729e1366-bfc5-477b-847c-b02d2e32aad0", // infisical-scan:ignore
      clientSecret: "729e1366-bfc5-477b-847c-b02d2e32aad0", // infisical-scan:ignore
      subdomain: `${FLAG_HOST}_subdomain`,
      issuer: `https://${FLAG_HOST}_issuer.com`,
    });

    if (
      handler.provider.type !== "oauth2" &&
      handler.provider.type !== "oauth1"
    ) {
      console.log(handler.provider);
      throw Error(`Don't know how to test non-oauth provider yet.`);
    }

    try {
      await testOauthHandler(handler);
    } catch (e) {
      console.log(`${name}: testHandler failed`, e, "NOT OK.");
      throw e;
    }
  },
);

async function testOauthHandler(handler: Handler<any>, params?: any) {
  const providerId = handler.provider.id;

  let authUrl: { url: string; persist?: Record<string, string> } | null = null;
  try {
    authUrl = await handler.getAuthorizationUrl("http://foobar.com", params);
  } catch (e: any) {
    if (e.code === "ENOTFOUND") {
      // Failed to hit servers.
      console.log(
        `${providerId}: getAuthorizationUrl failed with ENOTFOUND. OK.`,
        e.hostname,
      );
      // } else if (e.name === "OPError") {
      //   console.log("authUrl failed with OPError", e);
      //   return;
    } else {
      throw e;
    }
  }

  if (authUrl) {
    assert(authUrl.url);

    if (handler.provider.oauthConfig?.checks?.includes("pkce")) {
      assert(authUrl.url.includes("code_challenge="));
      assert(authUrl.url.includes("code_challenge_method="));
    }
  }

  let tokens: Awaited<ReturnType<typeof handler.exchange>> | null = null;
  try {
    const callbackParams: any = {
      code: "123458796",
    };
    const valuesFromHandler: any = {};

    if (handler.provider.oauthConfig?.checks?.includes("pkce")) {
      valuesFromHandler.pkceCodeVerifier = "random-verifier";
    }

    if (handler.provider.oauthConfig?.checks?.includes("state")) {
      valuesFromHandler.state = "random-state";
      callbackParams.state = "random-state";
    }

    tokens = await handler.exchange(
      new URLSearchParams(callbackParams),
      new Request("https://foobar.com/callback"),
      "https://foobar.com/callback",
      {
        valuesFromHandler,
        handshakeCallbackUrl: "https://foobar.com/callback",
        developerState: "developer-sent-random-state",
        developerCallbackUri: "https://app.saasproduct.com",
      },
    );
  } catch (e: any) {
    if (e.code === "ENOTFOUND") {
      // We've failed to hit the server. This is only OK if the server address
      // depends on a dynamic value, like a custom issuer defined by us.
      // Otherwise, it's an issue with the underlying API. (We've discovered
      // deprecated providers based on this error.)

      const hostname = e.hostname as string;
      assert(hostname);

      if (!hostname.includes(FLAG_HOST)) {
        throw Error(
          `Failed to hit non-dynamic URL attached to provider. hostname=${hostname}`,
        );
      }
      console.log(`${providerId}: exchange failed with ENOTFOUND. OK.`);
    } else if (e instanceof OAuthCallbackError) {
      // Function threw one of our errors.
      if (e.message.includes("invalid_code")) {
        // TODO Standardize errors before we can deal with this.
      }
    } else if (e.name === "OPError") {
      if (
        e.error.startsWith("expected 200 OK, got: 4") ||
        // Parse
        e.error === "Not Found" ||
        PROVIDERS_THAT_RESPOND_WITH_4xx.includes(handler.provider.id)
      ) {
        console.log(`${providerId}: threw 4xx instead of 200. Maybe OK.`);
      } else if (
        e.error.startsWith("expected 200 OK, got: 5") ||
        PROVIDERS_THAT_RESPOND_WITH_500.includes(handler.provider.id)
      ) {
        console.log(`${providerId}: threw 5xx instead of 200. Maybe OK.`);
      } else if (e.error === "invalid_grant") {
        // This is expected because our fake clientId doesn't exist in the
        // provider.
        console.log(`${providerId}: exchange failed with ${e.error}. OK.`);
      } else if (e.error === "invalid_request") {
        // This is expected because our fake clientId doesn't exist in the
        // provider.
        console.log(
          `${providerId}: exchange failed with ${e.error_description}. Maybe OK.`,
        );
      }
      // Other responses to invalid client ID:
      else if (
        e.error_description === "invalid client_id parameter" ||
        e.error.startsWith("invalid_client") ||
        e.error === "unauthorized_client" || // PayPal
        e.error_description === "Cannot parse client_id" ||
        e.error_description === "Invalid OAuth client credentials" ||
        e.error === "Missing client_id query parameter." || // From Basecamp.
        e.error.includes("Code is invalid because doesn’t match any user.") || // LoginGOV
        e.error_description === "Invalid client identifier" || // Infusionsoft
        e.error === "incorrect_client_credentials" || // Mixcloud
        e.error_description?.includes("client_id must exist") ||
        e.error_description?.includes(
          "An invalid client authentication was provided",
        ) // IBM
      ) {
        console.log(
          `${providerId}: exchange failed with "${e.error}" ("${e.error_description}"). OK.`,
        );
      } else {
        console.log("OPError e is", e);
        throw e;
      }
    } else {
      console.log("e is", e);
      throw e;
    }
  }

  if (tokens) {
    console.log("tokens", tokens);
    throw Error("Got tokens but we should never get tokens.");
  }
}
