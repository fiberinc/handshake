import { HandlerFactory } from "~/core/Handler";
import { TypicalOAuthArgs, makeHandlerFactory } from "./lib/makeHandler";

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
 * ### Configure the Callback URL
 *
 * You can set up a localhost callback by toggling the "View test data" switch.
 *
 * ![](/handshake/images/providers/stripe-redirect.png)
 */
export const Stripe: HandlerFactory<Args, Credential> = makeHandlerFactory<
  TypicalOAuthArgs,
  Credential
>({
  id: "stripe",
  name: "stripe",
  type: "oauth",
  metadata: {
    title: "Stripe",
    logo: "stripe.svg",
  },
  authorization: { url: "https://connect.stripe.com/oauth/authorize" },
  client: {
    token_endpoint_auth_method: "client_secret_post",
  },
  token: {
    url: "https://connect.stripe.com/oauth/token",
  },
  checks: ["state"],
});
