// Code here is from https://github.com/bluebeel/nextjs-shopify-auth, modified
// to change the environmental keys it looks for.

import assert from "assert";
import crypto from "crypto";
import { Forbidden } from "http-errors";
import querystring from "querystring";
import { z } from "zod";
import { HandlerFactory } from "~/core/Handler";
import { InvalidRequest } from "~/core/errors";

interface SessionShopData {
  id: number;
  name: string;
  email: string;
  domain: string;
  ownerName: string; // We map this from shop_owner.
  country: string | null;
  city: string | null;
}

const querySchema = z.object({
  state: z.string(),
  shop: z.string(),
  code: z.string(),
});

type CallbackParams = z.infer<typeof querySchema>;

interface Args {
  clientId: string;
  clientSecret: string;
  scopes: string[];
}

export const PROVIDER_ID = "shopify";

type Credential = {
  myShopifyDomain: string;
  accessToken: string;
  scopes: string[];
};

/**
 *
 *
```ts
// Inside app/handshake.ts

import { Shopify } from "handshake";

Shopify({
  clientId: "",
  clientSecret: "",
  scopes: ["read_orders", "read_products"],
});
```

### Configure the Callback URL

Make sure your Handshake URL is allowed within your Shopify app's Configuration tab:

![](/docs/public/images/providers-shopify-redirect.png)

Follow the format: `https://HANDSHAKE_URL/api/auth/shopify/callback`
 */
export const Shopify: HandlerFactory<Args, Credential> = ({ id, ...args }) => {
  const providerId = id ?? PROVIDER_ID;

  const scopes = args?.scopes || DEFAULT_SHOPIFY_SCOPES;

  return {
    id: providerId,
    provider: {
      id: "shopify",
      metadata: {
        title: "Shopify",
        logo: "/images/providers/shopify.svg",
      },
    },
    getAuthorizationUrl(callbackHandlerUrl, extras) {
      if (!extras?.shop) {
        throw Error("Shop value missing from query string.");
      }

      const authUrl = new URL(`https://${extras.shop}/admin/oauth/authorize`);
      authUrl.searchParams.set("client_id", args.clientId!);
      authUrl.searchParams.set("scope", scopes.join(","));
      authUrl.searchParams.set("redirect_uri", callbackHandlerUrl);

      // Do we need to set a nonce? What's the risk if we don't?
      const nonce = crypto.randomBytes(16).toString("hex");
      authUrl.searchParams.set("state", nonce);

      return { url: authUrl.toString() };
    },
    async exchange(searchParams, req) {
      const params = querySchema.parse(
        Object.fromEntries(searchParams.entries()),
      );

      // const params = Object.fromEntries(searchParams) as CallbackParams;

      let accessToken: string;
      let myShopifyDomain: string;
      let scopes: string[];
      try {
        const objs = await getAccessTokenAndShopInfo(
          req,
          params,
          args.clientId!,
          args.clientSecret!,
        );
        accessToken = objs.accessToken;
        myShopifyDomain = objs.myShopifyDomain;
        scopes = objs.scopes;
      } catch (e) {
        // if (e instanceof HttpError) {
        // 	throw e
        // }
        1 + 1;

        // TODO handle
        throw e;
      }

      const shop = await getShopifyShopInformation(
        myShopifyDomain,
        accessToken,
      );

      return {
        tokens: {
          accessToken,
          myShopifyDomain,
          scopes,
        },
      };
    },
  };
};
export type NonceValidator = (args: {
  nonce: string | undefined;
  req: Request;
  shopName: string;
}) => Promise<boolean>;

export async function getAccessTokenAndShopInfo(
  req: Request,
  searchParams: CallbackParams,
  shopifyClientId: string,
  shopifyClientSecret: string,
  options?: { validateNonce: NonceValidator },
) {
  // verifyHmac is supposed to use the entire query params of the redirected
  // URL, but Next.js modifies that object to add `projectAlias` and others.
  const { ...queryMinusNextjs } = searchParams;
  const valid = verifyHmac(queryMinusNextjs, shopifyClientSecret);
  const shopName = (searchParams.shop as string) ?? "";
  assert(shopName);

  if (!valid) {
    throw new Forbidden("Invalid Signature.");
  }

  const validateNonce = options && options.validateNonce;
  const validNonce = validateNonce
    ? await validateNonce({
        nonce: searchParams.state as string | undefined,
        req,
        shopName,
      })
    : true;
  if (!validNonce) {
    throw new Forbidden("Invalid Nonce.");
  }

  const accessTokenQuery = querystring.stringify({
    code: searchParams.code,
    client_id: shopifyClientId,
    client_secret: shopifyClientSecret,
  });

  const { accessToken, scopes } = await exchangeAccessTokenAndReadStoreData(
    shopName,
    accessTokenQuery,
  );

  return { accessToken, myShopifyDomain: shopName, scopes };
}

export const SHOPIFY_API_VERSION = "2022-07";

export async function exchangeAccessTokenAndReadStoreData(
  myShopifyDomain: string,
  accessTokenQuery: string,
): Promise<{ accessToken: string; scopes: string[] }> {
  const res = await fetch(
    `https://${myShopifyDomain}/admin/oauth/access_token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Content-Length": Buffer.byteLength(accessTokenQuery).toString(),
        Accept: "application/json",
      },
      body: accessTokenQuery,
    },
  );

  const json = await res.json();

  if (json.error) {
    if (json.error === "invalid_request") {
      throw new InvalidRequest(json);
    }
    throw json;
  }

  return {
    accessToken: json.access_token,
    scopes: json.scopes,
  };
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

/**
 * Use the shopify API SECRET to verify that this request truly came from
 * Shopify.
 */
function verifyHmac(query: any, shopifyApiSecretKey: string) {
  assert(shopifyApiSecretKey);

  const { hmac, signature, ...map } = query;

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

const DEFAULT_SHOPIFY_SCOPES = [
  "read_themes",
  "read_orders",
  // 'read_all_orders', // Will need extra permissions for this.
  "read_assigned_fulfillment_orders",
  "read_checkouts",
  "read_content",
  "read_customers",
  "read_discounts",
  "read_draft_orders",
  "read_fulfillments",
  "read_locales",
  "read_locations",
  "read_price_rules",
  "read_products",
  "read_product_listings",
  "read_shopify_payments_payouts",
  "write_customers",
  "write_fulfillments",
  "write_orders",
];
