// Much of this from next-auth@4.

import {
  AuthorizationEndpointHandler,
  TokenEndpointHandler,
  UserinfoEndpointHandler,
} from "next-auth/providers";
import type { ClientMetadata, HttpOptions } from "openid-client";

type CheckType = "pkce" | "state" | "nonce";

/**
 * Modified version of next-auth's `OAuthConfigInternal`.
 */
export interface OAuthProvider {
  id: string;
  name: string;
  website: string;
  documentationUrl?: string;
  /**
   * OpenID Connect (OIDC) compliant providers can configure
   * this instead of `authorize`/`token`/`userinfo` options
   * without further configuration needed in most cases.
   * You can still use the `authorize`/`token`/`userinfo`
   * options for advanced control.
   *
   * [Authorization Server Metadata](https://datatracker.ietf.org/doc/html/rfc8414#section-3)
   */
  wellKnown?: string;
  jwks_endpoint?: string;
  /**
   * The login process will be initiated by sending the user to this URL.
   *
   * [Authorization endpoint](https://datatracker.ietf.org/doc/html/rfc6749#section-3.1)
   */
  authorization?: AuthorizationEndpointHandler;
  token?: TokenEndpointHandler;
  userinfo?: UserinfoEndpointHandler;
  version?: string;
  checks?: CheckType[];
  client?: Partial<ClientMetadata>;
  // @felipap: doesn't seem to be used by any of the current providers.
  // jwks?: { keys: JWK[] };
  // @felipap: removing this and making the object only about generic
  // provider information.
  // clientId?: string;
  // clientSecret?: string;
  /**
   * If set to `true`, the user information will be extracted
   * from the `id_token` claims, instead of
   * making a request to the `userinfo` endpoint.
   *
   * `id_token` is usually present in OpenID Connect (OIDC) compliant providers.
   *
   * [`id_token` explanation](https://www.oauth.com/oauth2-servers/openid-connect/id-tokens)
   */
  idToken?: boolean;
  // TODO: only allow for BattleNet
  region?: string;
  // TODO: only allow for some
  issuer?: string;
  /** Read more at: https://github.com/panva/node-openid-client/tree/main/docs#customizing-http-requests */
  httpOptions?: HttpOptions;

  // These are kept around for backwards compatibility with OAuth 1.x
  authorizationUrl?: string;
  accessTokenUrl?: string;
  requestTokenUrl?: string;
  profileUrl?: string;
  encoding?: string;
  allowDangerousEmailAccountLinking?: boolean;
}
