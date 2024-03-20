import assert from "assert";
import { HandlerFactory } from "~/core/types";
import { makeOAuthFactory } from "./lib/oauth-factory";

export type SalesforceScope =
  | "cdp_query_api"
  | "pardot_api"
  | "cdp_profile_api"
  | "chatter_api"
  | "cdp_ingest_api"
  | "eclair_api"
  | "wave_api"
  | "api"
  | "custom_permissions"
  | "id"
  | "profile"
  | "email"
  | "address"
  | "phone"
  | "lightning"
  | "content"
  | "openid"
  | "full"
  | "refresh_token"
  | "offline_access"
  | "visualforce"
  | "web"
  | "chatbot_api"
  | "user_registration_api"
  | "forgot_password"
  | "cdp_api"
  | "sfap_api"
  | "interaction_api"
  | "cdp_segment_api"
  | "cdp_identityresolution_api"
  | "cdp_calculated_insight_api"
  | "einstein_gpt_api"
  | "pwdless_login_api";

interface Args {
  clientId: string;
  clientSecret: string;
  scopes: SalesforceScope[];
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
 *       scopes: string[],
 *       issuer?: string,
 *     }),
 *   ],
 *   // ...
 * };
 * ```
 *
 * [Scope documentation](https://help.salesforce.com/s/articleView?id=sf.remoteaccess_oauth_tokens_scopes.htm&type=5)
 *
 */
export const Salesforce: HandlerFactory<Args> = (args) => {
  // assert(args.scopes, "scopes is empty or missing");
  assert(args.clientId, "clientId is empty or missing");
  assert(args.clientSecret, "clientSecret is empty or missing");

  const { issuer = "https://login.salesforce.com" } = args;

  return makeOAuthFactory({
    id: "salesforce",
    website: "https://salesforce.com",
    name: "Salesforce",
    wellKnown: `${issuer}/.well-known/openid-configuration`,
    issuer,
    checks: ["pkce"],
    idToken: true,
  })(args);
};
