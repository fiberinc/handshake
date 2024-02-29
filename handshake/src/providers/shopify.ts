import assert from "assert";
import crypto from "crypto";
import { Forbidden } from "http-errors";
import querystring from "querystring";
import { z } from "zod";
import {
  InvalidRequest,
  OAuthCallbackError,
  UnknownProviderError,
} from "~/core/errors";
import { error, info } from "~/core/logger";
import { HandlerFactory } from "~/core/types";
import { SHOPIFY_SCOPES } from "./shopify-scopes";

export const PROVIDER_ID = "shopify";

const SHOPIFY_API_VERSION = "2024-01";

export type ShopifyScope = (typeof SHOPIFY_SCOPES)[number];

interface SessionShopData {
  id: number;
  name: string;
  email: string;
  domain: string;
  ownerName: string; // We map this from shop_owner.
  country: string | null;
  city: string | null;
}

const querySchema = z
  .object({
    state: z.string(),
    shop: z.string().min(1),
    hmac: z.string(),
    code: z.string(),
    host: z.string(),
    timestamp: z.string(),
  })
  // The HMAC depends on every query param, so if we miss any our validation
  // will fail unexpectedly.
  .strict();

type CallbackParams = z.infer<typeof querySchema>;

interface Args {
  clientId: string;
  clientSecret: string;
  scopes: ShopifyScope[];
}

export interface ShopifyCredential {
  shop: string;
  accessToken: string;
  scopes: string[];
}

/**
 * ## Usage
 *
 * Provide the following arguments:
 *
 * ```ts title="app/options.ts"
 * import { HandshakeOptions, Shopify } from "handshake";
 *
 * const options: HandshakeOptions = {
 *   handles: [
 *     Shopify({
 *       clientId: process.env.SHOPIFY_CLIENT_ID!,
 *       clientSecret: process.env.SHOPIFY_CLIENT_SECRET!,
 *       scopes: ["read_orders", "read_products"],
 *     }),
 *   ],
 *   // ...
 * };
 * ```
 *
 * ## Redirection
 *
 * Include an `extras.shop` parameter when redirecting users to Handshake:
 *
 * ```ts
 * https://HANDSHAKE_HOST/auth/shopify/redirect?
 *   state=12345
 *   &extras.shop=hahvaleu.myshopify.com
 *   &callback_uri=http://YOUR_APP_HOST/shopifySyncSuccess
 * ```
 *
 * ## Configure the Callback URL
 *
 * Make sure your Handshake URL is allowed within your Shopify app's
 * Configuration tab:
 *
 * ![](/handshake/images/providers/shopify-redirect.png)
 *
 * Follow the format: `https://HANDSHAKE_URL/auth/shopify/callback`
 */
export const Shopify: HandlerFactory<Args, ShopifyCredential> = ({
  id,
  ...args
}) => {
  const handlerId = id ?? PROVIDER_ID;

  assert(args.scopes, "scopes is empty or missing");
  assert(args.clientId, "clientId is empty or missing");
  assert(args.clientSecret, "clientSecret is empty or missing");

  return {
    id: handlerId,
    provider: {
      id: "shopify",
      name: "Shopify",
      type: "oauth2",
      website: "https://shopify.com",
    },
    getAuthorizationUrl(callbackHandlerUrl, extras: { shop?: string }) {
      if (!extras?.shop) {
        throw new InvalidRequest(
          "Shopify redirects requires an extra `shop` query parameter.",
        );
      }

      // TODO validate shop value.
      if (!extras.shop.match(/^[a-zA-Z_-]*\.myshopify.com$/)) {
        throw Error("Invalid shop value.");
      }

      const authUrl = new URL(`https://${extras.shop}/admin/oauth/authorize`);
      authUrl.searchParams.set("client_id", args.clientId!);
      authUrl.searchParams.set("scope", args.scopes.join(","));
      authUrl.searchParams.set("redirect_uri", callbackHandlerUrl);

      const state = crypto.randomBytes(16).toString("hex");
      authUrl.searchParams.set("state", state);

      return { url: authUrl.toString(), persist: { state } };
    },
    async exchange(searchParams, _, __, { valuesFromHandler }) {
      let params: CallbackParams;
      try {
        params = querySchema.parse(Object.fromEntries(searchParams.entries()));
      } catch (e) {
        error(e);
        throw new InvalidRequest(`Unexpected query parameter shape.`);
      }

      assert(valuesFromHandler?.state === params.state, "State mismatch.");

      try {
        const isValidHmac = verifyHmac(params, args.clientSecret);
        if (!isValidHmac) {
          throw new Forbidden("Invalid HMAC signature.");
        }
      } catch (e: any) {
        throw new InvalidRequest(e, "HMAC validation failed.");
      }

      const accessTokenQuery = querystring.stringify({
        code: params.code,
        client_id: args.clientId,
        client_secret: args.clientSecret,
      });

      let accessToken: string;
      let scopes: string[];
      try {
        const objs = await exchangeAccessTokenAndReadStoreData(
          params.shop,
          accessTokenQuery,
        );

        accessToken = objs.accessToken;
        scopes = objs.scopes;
      } catch (e) {
        if (!(e instanceof Error)) {
          throw new TypeError("Not an Error");
        }

        console.trace();
        error("shopify: getAccessTokenAndShopInfo failed", e);

        if (e instanceof OAuthCallbackError) {
          throw e;
        }

        throw new UnknownProviderError(`shopify: exchange failed ${e.message}`);
      }

      return {
        tokens: {
          accessToken,
          shop: params.shop,
          scopes,
        },
      };
    },
  };
};

async function exchangeAccessTokenAndReadStoreData(
  myShopifyDomain: string,
  accessTokenQuery: string,
): Promise<{ accessToken: string; scopes: string[] }> {
  const url = `https://${myShopifyDomain}/admin/oauth/access_token`;

  let res: Response;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Content-Length": Buffer.byteLength(accessTokenQuery).toString(),
        Accept: "application/json",
      },
      body: accessTokenQuery,
    });
  } catch (e) {
    throw new UnknownProviderError(`Failed to hit API at ${url}.`);
  }

  const json = await res.json();
  if (json.error) {
    info("Shopify exchange returned errors", json.error);
    throw new OAuthCallbackError(json.error, json.error_description ?? null);
  }

  return {
    accessToken: json.access_token,
    scopes: json.scope.split(","),
  };
}

/**
 * Use the query parameters and the shopify client secret to verify that this
 * request truly came from Shopify.
 */
function verifyHmac(query: { hmac: string }, shopifyApiSecretKey: string) {
  assert(shopifyApiSecretKey, "Invalid shopify client secret");

  const { hmac, ...map } = query;
  assert(hmac, "expected hmac from query params");

  const orderedMap = Object.keys(map)
    .sort((v1, v2) => v1.localeCompare(v2))
    .reduce((sum, k) => {
      // @ts-ignore
      sum[k] = query[k];
      return sum;
    }, {});

  const message = querystring.stringify(orderedMap);

  const compute_hmac = crypto
    .createHmac("sha256", shopifyApiSecretKey)
    .update(message)
    .digest("hex");

  return safeCompare(hmac, compute_hmac);
}

function safeCompare(stringA: string, stringB: string) {
  const aLen = Buffer.byteLength(stringA);
  const bLen = Buffer.byteLength(stringB);

  if (aLen !== bLen) {
    return false;
  }

  // Turn strings into buffers with equal length
  // to avoid leaking the length
  const buffA = Buffer.alloc(aLen, 0, "utf8");
  buffA.write(stringA);
  const buffB = Buffer.alloc(bLen, 0, "utf8");
  buffB.write(stringB);

  return crypto.timingSafeEqual(buffA, buffB);
}

export async function getShopifyShopInformation(
  myShopifyDomain: string,
  accessToken: string,
): Promise<SessionShopData> {
  const res = await fetch(
    `https://${myShopifyDomain}/admin/api/${SHOPIFY_API_VERSION}/shop.json`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Shopify-Access-Token": accessToken,
      },
    },
  );

  const json = await res.json();
  if (res.status !== 200) {
    throw json;
  }

  return {
    id: json.shop.id,
    name: json.shop.name,
    email: json.shop.email,
    domain: json.shop.domain,
    ownerName: json.shop.shop_owner,
    country: json.shop.country,
    city: json.shop.city,
  };
}
