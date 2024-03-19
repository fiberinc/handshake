import assert from "assert";
import { HandlerFactory } from "~/core/types";
import { makeOauthFactory } from "./lib/makeOauthFactory";

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
 *       scopes: ["account:read"]!, // FaireScope[]
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
 * ![faire-credentials](DOC_IMAGES/faire-creds.png)
 */
export const Faire: HandlerFactory<Args> = (args) => {
  assert(args.clientId, "clientId is empty or missing");
  assert(args.clientSecret, "clientSecret is empty or missing");

  return makeOauthFactory({
    id: "faire",
    name: "Faire",
    website: "https://faire.com",
    authorization: {
      url: `https://faire.com/oauth2/authorize?applicationId=${args.clientId}`,
    },
    token: {
      url: `https://www.faire.com/api/external-api-oauth2/token?applicationId=${args.clientId}`,
    },
    checks: ["state"],
  })(args);
};
