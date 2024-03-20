import { HandlerFactory } from "~/core/types";
import { TypicalOAuthArgs, makeOAuthFactory } from "./lib/oauth-factory";

interface Args {
  clientId: string;
  clientSecret: string;
  scopes?: string[];
}

type Credential = {
  accountId: string;
  scopes: string[];
};

/**
 * ## Usage
 *
 * Provide the following arguments:
 *
 * ```ts title="app/options.ts"
 *
 * import { Stripe } from "handshake";
 *
 * Stripe({
 *   clientId: "ca_",
 *   clientSecret: "sk_",
 *   scopes: [],
 * });
 * ```
 *
 * ### Allow your Handshake callback URL
 *
 * In your Stripe app settings.
 *
 * You can set up a localhost callback by toggling the "View test data" switch.
 *
 * ![stripe-callback-settings](DOC_IMAGES/stripe-redirect.png)
 */
export const Stripe: HandlerFactory<Args, Credential> = makeOAuthFactory<
  TypicalOAuthArgs,
  Credential
>({
  id: "stripe",
  name: "Stripe",
  website: "https://stripe.com",
  authorization: { url: "https://connect.stripe.com/oauth/authorize" },
  client: {
    token_endpoint_auth_method: "client_secret_post",
  },
  token: {
    url: "https://connect.stripe.com/oauth/token",
  },
  checks: ["state"],
});
