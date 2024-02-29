import type { Client } from "openid-client";
import { Issuer, custom } from "openid-client";
import { OAuthProvider } from "./OAuthProvider";

/**
 * NOTE: We can add auto discovery of the provider's endpoint
 * that requires only one endpoint to be specified by the user.
 * Check out `Issuer.discover`
 *
 * Client supporting OAuth 2.x and OIDC.
 */
export async function getOpenIdClient(
  info: OAuthProvider,
  clientId: string,
  clientSecret: string | undefined,
  callbackUrl: string,
): Promise<Client> {
  if (info.httpOptions) {
    custom.setHttpOptionsDefaults(info.httpOptions);
  }

  let issuer: Issuer;
  if (info.wellKnown) {
    issuer = await Issuer.discover(info.wellKnown);
  } else {
    issuer = new Issuer({
      issuer: info.issuer as string,
      authorization_endpoint: info.authorization?.url,
      token_endpoint: info.token?.url,
      userinfo_endpoint: info.userinfo?.url,
      jwks_uri: info.jwks_endpoint,
    });
  }

  // https://github.com/panva/node-openid-client
  const client = new issuer.Client(
    {
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uris: [callbackUrl],
      // Used by Monday to modify the value of `token_endpoint_auth_method`
      // https://github.com/panva/node-openid-client/blob/main/docs/README.md#client-authentication-methods
      // https://github.com/panva/node-openid-client?tab=readme-ov-file#authorization-code-flow
      ...info.client,
    },
    // @felipap: removed this as no providers seemed to use it.
    // info.jwks,
  );

  // allow a 10 second skew
  // See https://github.com/nextauthjs/next-auth/issues/3032
  // and https://github.com/nextauthjs/next-auth/issues/3067
  client[custom.clock_tolerance] = 10;

  return client;
}
