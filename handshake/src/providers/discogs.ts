import assert from "assert";
import crypto from "crypto";
import { z } from "zod";
import {
  InvalidRequest,
  OAuthCallbackError,
  UnknownProviderError,
} from "~/core/errors";
import { debug, error } from "~/core/logger";
import { HandlerFactory } from "~/core/types";

interface Args {
  consumerKey: string;
  consumerSecret: string;
}

/**
 * Connect to your customers' [Discogs](https://discogs.com) accounts.
 *
 * @options
 * ```ts title="app/options.ts"
 * import { Discogs } from "handshake";
 *
 * Discogs({
 *   consumerKey: string,
 *   consumerSecret: string,
 * });
 * ```
 *
 * @providersetup
 *
 * @troubleshoot
 */
export const Discogs: HandlerFactory<Args> = (args) => {
  assert(args.consumerKey, "consumerKey is empty or missing");
  assert(args.consumerSecret, "consumerSecret is empty or missing");

  // https://www.discogs.com/developers#page:authentication,header:authentication-oauth-flow

  return {
    id: "discogs" ?? args.id,
    provider: {
      id: "discogs",
      name: "Discogs",
      type: "oauth1",
      documentationUrl:
        "https://www.discogs.com/developers#page:authentication,header:authentication-oauth-flow",
      website: "https://discogs.com",
      // oauthConfig: provider,
    },
    async getAuthorizationUrl(callbackHandlerUrl) {
      const nonce = crypto.randomBytes(16).toString("hex");

      const { requestToken, requestTokenSecret, callbackConfirmed } =
        await createRequestToken(
          args.consumerKey,
          args.consumerSecret,
          callbackHandlerUrl,
          nonce,
        );

      if (!callbackConfirmed) {
        // TODO handle
      }

      console.log(
        "requestToken",
        requestToken,
        requestTokenSecret,
        callbackConfirmed,
      );

      const authUrl = `https://discogs.com/oauth/authorize?oauth_token=${requestToken}`;
      return {
        url: authUrl.toString(),
        persist: { nonce, requestTokenSecret },
      };
    },

    async exchange(
      searchParams,
      _,
      __,
      { valuesFromHandler: { nonce, requestTokenSecret } },
    ) {
      const querySchema = z
        .object({
          oauth_token: z.string(),
          oauth_verifier: z.string(),
        })
        .strict();

      type CallbackParams = z.infer<typeof querySchema>;

      let params: CallbackParams;
      try {
        params = querySchema.parse(Object.fromEntries(searchParams.entries()));
      } catch (e) {
        error(e);
        throw new InvalidRequest(`Unexpected query parameter shape.`);
      }

      const { token, secret } = await requestAccessToken(
        args.consumerKey,
        args.consumerSecret,
        requestTokenSecret,
        params.oauth_token,
        params.oauth_verifier,
        nonce,
      );

      return {
        tokens: {
          token: token,
          secret: secret,
        },
      };
    },
  };
};

/**
 * @throws {UnknownProviderError}
 * @throws {OAuthCallbackError}
 */
async function createRequestToken(
  consumerKey: string,
  consumerSecret: string,
  callbackHandlerUrl: string,
  nonce: string,
): Promise<{
  requestToken: string;
  requestTokenSecret: string;
  callbackConfirmed: boolean;
}> {
  const url = new URL(`https://api.discogs.com/oauth/request_token`);

  // https://www.discogs.com/developers#header-2.-send-a-get-request-to-the-discogs-request-token-url
  url.searchParams.set("oauth_nonce", nonce);
  url.searchParams.set("oauth_consumer_key", consumerKey);
  // ATTENTION notice the required ampersand at the end.
  url.searchParams.set("oauth_signature", consumerSecret + "&");
  url.searchParams.set("oauth_signature_method", "PLAINTEXT");
  url.searchParams.set("oauth_timestamp", "" + Date.now());
  url.searchParams.set("oauth_callback", callbackHandlerUrl);

  let res;
  try {
    res = await fetch(url, {
      method: "GET",
      headers: {
        "User-Agent": "handshake/1.0",
      },
    });
  } catch (e) {
    throw new UnknownProviderError(`FETCH url=${url}: ${e}`);
  }

  if (!res.ok) {
    const text = await res.text();
    error(`Discogs returned status=${res.status} url=${url} text=${text}`);
    // TODO expand expected errors.

    if (text.includes("Invalid consumer.")) {
      throw new OAuthCallbackError("invalid_client", `Wrong consumer secret.`);
    }

    // Never return the error to the user. Discogs may include the consumer
    // secret in the response. 😱😱
    if (text.includes("Expected signature base string.")) {
      throw new OAuthCallbackError("invalid_client", `Wrong consumer secret.`);
    }

    throw new UnknownProviderError(
      `Unexpected error from Discogs: status=${res.status} url=${url} text=${text}`,
    );
  }

  const text = await res.text();
  debug("Received from Discogs", text);
  const json = Object.fromEntries(new URLSearchParams(text));

  let parsed;
  try {
    parsed = z
      .object({
        oauth_token: z.string(),
        oauth_token_secret: z.string(),
        oauth_callback_confirmed: z.enum(["true", "false"]),
      })
      .parse(json);
  } catch (e) {
    error("Failed to parse response from Discogs", text);
    throw new UnknownProviderError(
      `Failed to parse response from Discogs e: ${e}`,
    );
  }

  return {
    requestToken: parsed.oauth_token,
    requestTokenSecret: parsed.oauth_token_secret,
    callbackConfirmed: parsed.oauth_callback_confirmed === "true",
  };
}

async function requestAccessToken(
  consumerKey: string,
  consumerSecret: string,
  tokenSecret: string,
  oauthToken: string,
  verifier: string,
  nonce: string,
) {
  const url = `https://api.discogs.com/oauth/access_token`;

  // https://www.discogs.com/developers#page:authentication,header:authentication-oauth-flow
  let res;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: {
        "User-Agent": "handshake/1.0",
        Authorization: "OAuth",
      },
      body: new URLSearchParams({
        oauth_nonce: nonce,
        oauth_token: oauthToken,
        oauth_consumer_key: consumerKey,
        oauth_signature: consumerSecret + "&" + tokenSecret,
        oauth_signature_method: "PLAINTEXT",
        oauth_timestamp: "" + Date.now(),
        oauth_verifier: verifier,
      }),
    });
  } catch (e) {
    throw new UnknownProviderError(`FETCH url=${url}: ${e}`);
  }

  if (!res.ok) {
    const text = await res.text();
    error(`Discogs returned status=${res.status} url=${url} text=${text}`);
    // TODO expand expected errors.

    if (text.includes("Invalid consumer.")) {
      throw new OAuthCallbackError("invalid_client", `Wrong consumer secret.`);
    }

    // Discogs may include the consumer secret in the response. 😱😱 Don't
    // expose it to the user.
    if (text.includes("Expected signature base string.")) {
      throw new OAuthCallbackError("invalid_client", `Wrong consumer secret.`);
    }

    throw new UnknownProviderError(
      `Unexpected error from Discogs: status=${res.status} url=${url} text=${text}`,
    );
  }

  const text = await res.text();
  debug("Received from Discogs", text);
  const json = Object.fromEntries(new URLSearchParams(text));

  let parsed;
  try {
    parsed = z
      .object({
        oauth_token: z.string(),
        oauth_token_secret: z.string(),
      })
      .parse(json);
  } catch (e) {
    error("Failed to parse response from Discogs", text);
    throw new UnknownProviderError(
      `Failed to parse response from Discogs e: ${e}`,
    );
  }

  return {
    token: parsed.oauth_token,
    secret: parsed.oauth_token_secret,
  };
}
