import assert from "assert";
import { HandlerFactory } from "~/core/types";
import { makeOAuthFactory } from "./lib/oauth-factory";

type MondayScope =
  | "me:read"
  | "boards:read"
  | "boards:write"
  | "workspaces:read"
  | "workspaces:write"
  | "users:read"
  | "users:write"
  | "account:read"
  | "notifications:write"
  | "updates:read"
  | "updates:write"
  | "assets:read"
  | "tags:read"
  | "teams:read"
  | "webhooks:write"
  | "docs:read"
  | "docs:write";

interface Args {
  clientId: string;
  clientSecret: string;
  scopes: MondayScope[];
}

/**
 * Connect to your customers' [Monday](https://monday.com) accounts.
 *
 * ## Usage
 *
 * Provide the following arguments:
 *
 * ```ts title="app/options.ts"
 * import { HandshakeOptions, Monday } from "handshake";
 *
 * const options: HandshakeOptions = {
 *   handles: [
 *     Monday({
 *       clientId: process.env.MONDAY_CLIENT_ID!, // string
 *       clientSecret: process.env.MONDAY_CLIENT_SECRET!, // string
 *       scopes: ["account:read"], // MondayScope[]
 *     }),
 *   ],
 *   // ...
 * };
 * ```
 *
 * ## Setup
 *
 * [Documentation](https://developer.monday.com/apps/docs/oauth)
 *
 * ![monday-credentials](DOC_IMAGES/monday-creds.png)
 * ![monday-credentials](DOC_IMAGES/monday-allow-redirect.png)
 *
 * ## Troubleshooting
 *
 * ### "invalid_scope: Invalid scope param"
 *
 * You configured Handshake to request a scope that you didn't enable in your
 * app's settings.
 */
export const Monday: HandlerFactory<Args> = (args) => {
  // assert(args.scopes, "scopes is empty or missing");
  assert(args.clientId, "clientId is empty or missing");
  assert(args.clientSecret, "clientSecret is empty or missing");

  return makeOAuthFactory({
    id: "monday",
    name: "Monday",
    website: "https://monday.com",
    authorization: {
      url: "https://auth.monday.com/oauth2/authorize",
    },
    token: {
      url: "https://auth.monday.com/oauth2/token",
    },
    checks: ["state"],
    client: {
      // Monday needs to see client_id in the body of the token call.
      token_endpoint_auth_method: "client_secret_post",
    },
  })(args);
};
