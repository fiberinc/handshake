import assert from "assert";
import { HandlerFactory } from "~/core/types";
import { makeOAuthFactory } from "./lib/oauth-factory";

type BigCommerceScope = string;

interface Args {
  clientId: string;
  clientSecret: string;
  scopes: BigCommerceScope[];
}

/**
 * Connect to your customers' [BigCommerce](https://bigcommerce.com) accounts.
 *
 * ## Usage
 *
 * Provide the following arguments:
 *
 * ```ts title="app/options.ts"
 * import { HandshakeOptions, BigCommerce } from "handshake";
 *
 * const options: HandshakeOptions = {
 *   handles: [
 *     BigCommerce({
 *       clientId: process.env.MONDAY_CLIENT_ID!, // string
 *       clientSecret: process.env.MONDAY_CLIENT_SECRET!, // string
 *       scopes: ["account:read"], // BigCommerceScope[]
 *     }),
 *   ],
 *   // ...
 * };
 * ```
 *
 * ## Setup
 *
 * ## Troubleshooting
 *
 */
export const BigCommerce: HandlerFactory<Args> = (args) => {
  assert(args.clientId, "clientId is empty or missing");
  assert(args.clientSecret, "clientSecret is empty or missing");

  // https://developer.bigcommerce.com/docs/integrations/apps/guide/auth
  return makeOAuthFactory({
    id: "bigcommerce",
    name: "BigCommerce",
    website: "https://bigcommerce.com",
    authorization: {
      url: "https://auth.bigcommerce.com/oauth2/authorize",
    },
    token: {
      url: "https://auth.bigcommerce.com/oauth2/token",
    },
    checks: ["state"],
    client: {
      // BigCommerce needs to see client_id in the body of the token call.
      token_endpoint_auth_method: "client_secret_post",
    },
  })(args);
};
