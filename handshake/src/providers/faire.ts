import assert from "assert";
import crypto from "crypto";
import fetch, { Response } from "node-fetch";
import { z } from "zod";
import {
  InvalidRequest,
  OAuthCallbackError,
  UnknownProviderError,
} from "~/core/errors";
import { error } from "~/core/logger";
import { HandlerFactory } from "~/core/types";

export type FaireScope =
  | "READ_PRODUCTS" //	Fetch product information.
  | "WRITE_PRODUCTS" //	Add, update, or delete product information.
  | "READ_ORDERS" //	Fetch order information.
  | "WRITE_ORDERS" //	Add, update, or delete order information.
  | "READ_BRAND" //	Fetch brand information.
  | "READ_RETAILER" //	Fetch retailer information.
  | "READ_INVENTORIES" //	Fetch inventory information.
  | "WRITE_INVENTORIES" //	Add, update, or delete inventory information.
  | "READ_SHIPMENTS"; //	Fetch shipments information.

interface Args {
  clientId: string;
  clientSecret: string;
  scopes: FaireScope[];
}

export interface FaireCredential {
  accessToken: string;
  scopes: FaireScope[];
}

const CallbackParamsStruct = z
  .object({
    state: z.string(),
    authorization_code: z.string(),
  })
  .strict();

type CallbackParams = z.infer<typeof CallbackParamsStruct>;

/**
 * Connect to your customers' [Faire](https://faire.com) accounts.
 *
 * ## Usage
 *
 * Provide the following arguments:
 *
 * ```ts title="app/options.ts"
 * import { HandshakeOptions, Faire } from "handshake";
 *
 * const options: HandshakeOptions = {
 *   handles: [
 *     Faire({
 *       clientId: process.env.FAIRE_CLIENT_ID!, // string
 *       clientSecret: process.env.FAIRE_CLIENT_SECRET!, // string
 *       scopes: ["READ_BRAND"], // FaireScope[]
 *     }),
 *   ],
 *   // ...
 * };
 * ```
 *
 * Note that Faire uses the "Application ID" and "Secret ID" as the client ID
 * and client secret in the OAuth flow.
 *
 * ## Setup
 *
 * [Documentation](https://faire.github.io/external-api-v2-docs/#using-oauth)
 *
 * [Support article](https://www.faire.com/support/articles/4409994540571)
 *
 * ![faire-credentials](DOC_IMAGES/faire-creds.png)
 */
export const Faire: HandlerFactory<Args> = (args) => {
  assert(args.clientId, "clientId is empty or missing");
  assert(args.clientSecret, "clientSecret is empty or missing");

  return {
    id: "faire",
    name: "Faire",
    provider: {
      id: "faire",
      name: "Faire",
      type: "oauth2",
      website: "https://faire.com",
    },
    async getAuthorizationUrl(callbackHandlerUrl) {
      const authUrl = new URL(`https://faire.com/oauth2/authorize`);
      authUrl.searchParams.set("applicationId", args.clientId);
      authUrl.searchParams.set("redirectUrl", callbackHandlerUrl);
      for (const scope of args.scopes) {
        authUrl.searchParams.append("scope", scope);
      }

      const state = crypto.randomBytes(16).toString("hex");
      authUrl.searchParams.set("state", state);

      return { url: authUrl.toString(), persist: { state } };
    },
    async exchange(
      searchParams,
      _,
      __,
      { valuesFromHandler, handshakeCallbackUrl },
    ) {
      let params: CallbackParams;
      try {
        params = CallbackParamsStruct.parse(
          Object.fromEntries(searchParams.entries()),
        );
      } catch (e) {
        error(e);
        throw new InvalidRequest(`Unexpected query parameter shape.`);
      }

      if (valuesFromHandler?.state !== params.state) {
        error(
          `State mismatch (${valuesFromHandler?.state} != (${params.state})).`,
        );
      }

      // assert(
      //   valuesFromHandler?.state === params.state,
      //   `State mismatch (${valuesFromHandler?.state} != (${params.state})).`,
      // );

      const accessToken = await exchangeToken(
        args,
        params.authorization_code,
        handshakeCallbackUrl,
      );

      return {
        tokens: {
          accessToken,
          scopes: args.scopes,
        },
      };
    },
  };
};

async function exchangeToken(
  args: Args,
  authorizationCode: string,
  previousRedirectUrl: string,
) {
  const body = {
    application_token: args.clientId,
    application_secret: args.clientSecret,
    grant_type: "AUTHORIZATION_CODE",
    scope: args.scopes,
    authorization_code: authorizationCode,
    redirect_url: previousRedirectUrl,
  };

  let res: Response;
  try {
    res = await fetch(`https://www.faire.com/api/external-api-oauth2/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  } catch (e: any) {
    throw new UnknownProviderError(`Faire FETCH failed ${e.message}`);
  }

  const json = await res.json();

  if (!res.ok) {
    error("Faire exchange failed", { json });
    const context = {
      json,
      body: {
        ...body,
        application_secret: "hidden",
      },
    };

    if (json.message?.includes("Permissions in the request are not matching")) {
      // https://datatracker.ietf.org/doc/html/rfc6749#section-5.2
      throw new OAuthCallbackError(
        "invalid_grant",
        `Faire error: ${json.message}`,
        context,
      );
    }
    // if (json.message?.includes("Permissions in the request are not matching")) {
    //   // https://datatracker.ietf.org/doc/html/rfc6749#section-5.2
    //   throw new OAuthCallbackError(
    //     "invalid_grant",
    //     "Token is expired.",
    //     context,
    //   );
    // }
    if (json.message?.includes("Authorization code is expired")) {
      // https://datatracker.ietf.org/doc/html/rfc6749#section-5.2
      throw new OAuthCallbackError("invalid_scope", json.message, context);
    }

    throw new OAuthCallbackError(
      "invalid_request",
      json.message
        ? `Unexpected Faire error: ${json.message}`
        : "Unexpected Faire error.",
      context,
    );
  }

  return json.access_token;
}
