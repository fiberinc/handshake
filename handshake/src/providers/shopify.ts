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

export const SHOPIFY_SCOPES = [
  "read_all_orders",
  "read_orders",
  "read_assigned_fulfillment_orders",
  "read_cart_transforms",
  "read_checkouts",
  "read_checkout_branding_settings",
  "read_content",
  "read_customer_merge",
  "read_customers",
  "read_customer_payment_methods",
  "read_discounts",
  "read_draft_orders",
  "read_files",
  "read_fulfillments",
  "read_gift_cards",
  "read_inventory",
  "read_legal_policies",
  "read_locales",
  "read_locations",
  "read_markets",
  "read_metaobject_definitions",
  "read_metaobjects",
  "read_marketing_events",
  "read_merchant_approval_signals",
  "read_merchant_managed_fulfillment_orders",
  "read_orders",
  "read_payment_mandate",
  "read_payment_terms",
  "read_price_rules",
  "read_products",
  "read_product_listings",
  "read_publications",
  "read_purchase_options",
  "read_reports",
  "read_resource_feedbacks",
  "read_script_tags",
  "read_shipping",
  "read_shopify_payments_disputes",
  "read_shopify_payments_payouts",
  "read_store_credit_accounts",
  "read_store_credit_account_transactions",
  "read_own_subscription_contracts",
  "read_returns",
  "read_themes",
  "read_translations",
  "read_third_party_fulfillment_orders",
  "read_users",
  "read_order_edits",
  "read_customer_events",
  "read_validations",
  "write_orders",
  "write_assigned_fulfillment_orders",
  "write_cart_transforms",
  "write_checkouts",
  "write_checkout_branding_settings",
  "write_content",
  "write_customer_merge",
  "write_customers",
  "write_discounts",
  "write_draft_orders",
  "write_files",
  "write_fulfillments",
  "write_gift_cards",
  "write_inventory",
  "write_locales",
  "write_markets",
  "write_metaobject_definitions",
  "write_metaobjects",
  "write_marketing_events",
  "write_merchant_managed_fulfillment_orders",
  "write_orders",
  "write_payment_mandate",
  "write_payment_terms",
  "write_price_rules",
  "write_products",
  "write_publications",
  "write_purchase_options",
  "write_reports",
  "write_resource_feedbacks",
  "write_script_tags",
  "write_shipping",
  "write_store_credit_account_transactions",
  "write_own_subscription_contracts",
  "write_returns",
  "write_themes",
  "write_translations",
  "write_third_party_fulfillment_orders",
  "write_order_edits",
  "write_payment_gateways",
  "write_payment_sessions",
  "write_pixels",
  "write_validations",
] as const;

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
 * @setup
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
 * };
 *
 * // ...
 * ```
 *
 * @usage
 * You must include an `extras.shop` parameter to identify the shop that you're
 * trying to take through the OAuth flow.
 *
 * The final URL might look something like this:
 *
 * ```bash
 * https://YOUR_HANDSHAKE_INSTANCE_URL/auth/shopify/redirect?
 *   state=12345
 *   &extras.shop=example.myshopify.com
 *   &callback_uri=http://YOUR_APP_URL/shopify-integration/done
 * ```
 *
 * @provider
 *
 * The `clientId` and `clientSecret` arguments to the `Shopify()` handler come
 * from your Shopify app.
 *
 * ## 1. Create a Shopify app
 *
 * You must have a Shopify app to take users through the OAuth flow. Check out this [in-depth tutorial on how authentication works in the
 * Shopify ecosystem](https://fiber.dev/blog/shopify-oauth-guide).
 *
 * Within your app, you'll find the client ID and secret:
 *
 * ![Find client ID and secret in the admin of your Shopify
 * app.](DOC_IMAGES/shopify/app-keys.png)
 *
 * ## 2. Configure the Callback URL
 *
 * Make sure your Handshake URL is allowed within your Shopify app's
 * Configuration tab:
 *
 * ![](DOC_IMAGES/shopify/app-redirect.png)
 *
 * Follow the format: `https://HANDSHAKE_URL/auth/shopify/callback`
 *
 * @troubleshoot
 *
 * ### "The redirect_uri is not whitelisted"
 *
 * If you see this, the Handshake callback URL you asked Shopify to send users
 * back to wasn't added to the list of allowed URLs in your Shopify app
 * settings.
 *
 * ![Shopify error page saying "The redirect_uri is not
 * whitelisted"](DOC_IMAGES/shopify/trouble-unauthorized-redirect.png)
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
      // In `abcd.myshopify.com`, Shopify sometimes calls the "abcd" part "shop"
      // [1] and other times "store".
      // 1. https://shopify.dev/docs/apps/auth/get-access-tokens/token-exchange#token-exchange-api
      // 2. https://shopify.dev/docs/api/admin-rest#endpoints

      if (!extras?.shop) {
        throw new InvalidRequest(
          "Shopify redirects requires an `extras.shop=?` query parameter.",
        );
      }

      // TODO validate shop value.
      if (!extras.shop.match(/^[a-zA-Z][a-zA-Z_-]*\.myshopify.com$/)) {
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

      assert(
        valuesFromHandler?.state === params.state,
        `State mismatch (${valuesFromHandler?.state} != (${params.state})).`,
      );

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
