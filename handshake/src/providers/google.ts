import assert from "assert";
import { HandlerFactory } from "~/core/types";
import { makeOAuthFactory } from "./lib/oauth-factory";

type GoogleScope = any;

interface Args {
  clientId: string;
  clientSecret: string;
  scopes: GoogleScope[];
}

/**
 * Connect to your customers' [Google](https://google.com) accounts.
 *
 * ## Usage
 *
 * Provide the following arguments:
 *
 * ```ts title="app/options.ts"
 * import { HandshakeOptions, Google } from "handshake";
 *
 * const options: HandshakeOptions = {
 *   handles: [
 *     Google({
 *       clientId: process.env.GOOGLE_CLIENT_ID!, // string
 *       clientSecret: process.env.GOOGLE_CLIENT_SECRET!, // string
 *       scopes: ["account:read"], // GoogleScope[]
 *     }),
 *   ],
 *   // ...
 * };
 * ```
 *
 * ## Setup
 *
 * [Documentation](https://developer.monday.com/apps/docs/oauth)
 */
export const Google: HandlerFactory<Args> = (args) => {
  // assert(args.scopes, "scopes is empty or missing");
  assert(args.clientId, "clientId is empty or missing");
  assert(args.clientSecret, "clientSecret is empty or missing");

  return makeOAuthFactory({
    id: "google",
    name: "Google",
    website: "https://google.com",
    authorization: {
      params: {
        // Needed to show `refresh_token` in the response.
        // https://stackoverflow.com/a/10857806
        access_type: "offline",
      },
    },
    wellKnown: "https://accounts.google.com/.well-known/openid-configuration",
    idToken: true,
    checks: ["pkce", "state"],
  })(args);
};
