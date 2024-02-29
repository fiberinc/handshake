import assert from "assert";
import { HandlerFactory } from "~/core/types";
import { makeOauthFactory } from "./lib/makeHandler";

interface Args {
  clientId: string;
  clientSecret: string;
  // TODO typify
  scopes: string[];
  issuer?: string;
}

/**
 * ## Usage
 *
 * Provide the following arguments:
 *
 * ```ts title="app/options.ts"
 * import { HandshakeOptions, Salesforce } from "handshake";
 *
 * const options: HandshakeOptions = {
 *   handles: [
 *     Salesforce({
 *       clientId: string,
 *       clientSecret: string,
 *       scopes: string,
 *       issuer?: string,
 *     }),
 *   ],
 *   // ...
 * };
 * ```
 *
 */
export const Salesforce: HandlerFactory<Args> = (args) => {
  assert(args.scopes, "scopes is empty or missing");
  assert(args.clientId, "clientId is empty or missing");
  assert(args.clientSecret, "clientSecret is empty or missing");

  const { issuer = "https://login.salesforce.com" } = args;

  return makeOauthFactory({
    id: "salesforce",
    website: "https://salesforce.com",
    name: "Salesforce",
    authorization: {
      url: `${issuer}/services/oauth2/authorize?display=page`,
    },
    token: {
      url: `${issuer}/services/oauth2/token`,
    },
    userinfo: {
      url: `${issuer}/services/oauth2/userinfo`,
    },
    checks: ["pkce", "state"],
  })(args);
};
