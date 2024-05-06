import assert from "assert";
import crypto from "crypto";
import { z } from "zod";
import { InvalidRequest } from "~/core/errors";
import { debug } from "~/core/logger";
import { HandlerFactory } from "~/core/types";

export interface Args {
  appId: string;
  clientId: string;
  clientSecret: string;
  isDraftApp: boolean;
}

export interface Credential {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
}

export const PROVIDER_ID = "amazon-seller";

/**
 * @title Amazon Seller Central
 * @reference https://developer-docs.amazon.com/sp-api/docs/website-authorization-workflow
 *
 * @setup
 * ```ts title="app/options.ts"
 * import { HandshakeOptions, Amazon } from "handshake";
 *
 * const options: HandshakeOptions = {
 *   handles: [
 *     Amazon({
 *       appId: string,
 *       clientId: string,
 *       clientSecret: string,
 *       isDraftApp: true | false,
 *     });
 *   ],
 *   // ...
 * };
 * ```
 *
 * @troubleshoot
 *
 * Need to "set up your “Authorize” buttons so that selling partners are
 * redirected to the Seller Central (for sellers) or Vendor Central (for
 * vendors) sign-in page for their own region."
 *
 * ### No localhost redirect
 *
 * Amazon does not allow setting localhost as a `redirect_uri`. You may want to
 * use Ngrok or another service to provide a publicly addressable URL.
 *
 * [https://github.com/amzn/selling-partner-api-docs/issues/26](https://github.com/amzn/selling-partner-api-docs/issues/26)
 *
 * ### Error Code: MD5101
 *
 * This means unauthorized redirect URI. localhost URIs are allowed.
 *
 * ### Developer Central – "You do not have permissions to view this page"
 *
 * FYI. Only the primary user of the Seller Central account is able to create
 * and modify apps via the "Developer Central" page.
 *
 * [https://github.com/amzn/selling-partner-api-docs/issues/2191](https://github.com/amzn/selling-partner-api-docs/issues/2191)
 *
 * ### Not setup for OAuth
 *
 * ![Error shows up when OAuth hasn't been enabled for application](DOC_IMAGES/amazon/not-setup-oauth.png)
 */
export const AmazonSeller: HandlerFactory<Args, Credential> = ({
  id,
  ...config
}) => {
  return {
    id: id ?? PROVIDER_ID,
    config,
    provider: {
      id: PROVIDER_ID,
      name: "Amazon Seller Central",
      type: "other",
      website: "https://sellercentral.amazon.com/",
    },
    getAuthorizationUrl(callbackHandlerUrl: string) {
      const { appId, isDraftApp } = config;
      assert(appId, "AmazonConfig.appId is not set");

      const authUrl = new URL(
        "https://sellercentral.amazon.com/apps/authorize/consent",
      );

      authUrl.searchParams.append("application_id", appId);

      // TODO deal with "Important: Because OAuth information is passed via URL
      // query parameters, we highly recommended that you do the following: 1)
      // Ensure that the state token is short-lived and verifiably unique to your
      // user, and 2) Set the Referrer-Policy: no-referrer HTTP header, which
      // prevents leaking sensitive information to websites that your website
      // links to. For more information about cross-site request forgery and
      // calculating a state parameter, see Cross-site Request Forgery in the
      // Login with Amazon documentation."
      const nonce = crypto.randomBytes(16).toString("hex");
      authUrl.searchParams.append("state", nonce);

      // "If you include the version=beta parameter, the workflow authorizes an
      // application in Draft state."
      if (isDraftApp) {
        authUrl.searchParams.append("version", "beta");
      }

      authUrl.searchParams.append("redirect_uri", callbackHandlerUrl);

      return { url: authUrl.toString() };
    },
    async exchange(searchParams) {
      const params = z
        .object({
          spapi_oauth_code: z.string(),
          state: z.string(),
          selling_partner_id: z.string(),
          // mws_auth_token: z.string(),
        })
        .parse(Object.fromEntries(searchParams.entries()));

      // 	projectAlias: string,
      // 	clientId: string,
      // 	clientSecret: string,
      // 	oAuthCode: string
      // ) {

      // Docs at
      // https://developer-docs.amazon.com/sp-api/docs/website-authorization-workflow#step-4-your-application-exchanges-the-lwa-authorization-code-for-a-lwa-refresh-token
      const body = {
        grant_type: "authorization_code",
        code: params.spapi_oauth_code,
        client_id: config.clientId,
        client_secret: config.clientSecret,
      };

      const res = await fetch("https://api.amazon.com/auth/o2/token", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(body),
      });

      const json = await res.json();
      debug("json returned from Amazon", body, json);

      if (json.error) {
        if (json.error === "invalid_request") {
          throw new InvalidRequest(json);
        }
        throw json;
      }

      return {
        tokens: {
          accessToken: "" + json.access_token,
          refreshToken: "" + json.refresh_token,
          expiresAt:
            "" + new Date(Date.now() + (json.expires_in as number) * 1000),
        },
      };
    },
  };
};
