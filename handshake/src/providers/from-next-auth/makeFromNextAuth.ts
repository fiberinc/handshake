import assert from "assert";
import { Account, Profile, TokenSet } from "next-auth";
import { OAuthConfig, OAuthUserConfig } from "next-auth/providers";
import * as oauth4 from "oauth4webapi";
import { InvalidCheck, OAuthCallbackError } from "~/errors";
import { Provider } from "../lib/Provider";

export type TypicalOAuthConfig = {
  clientId: string;
  clientSecret: string;
};

// The type of the factories that next-auth exposes for each provider (eg.
// GitHub, Keycloak, etc.)
type NextAuthProviderFactory = (
  options: OAuthUserConfig<any>,
) => OAuthConfig<any>;

/**
 * Turn a `next-auth` provider factory into a Handshake provider factory.
 */
export function makeFromNextAuth<Config extends TypicalOAuthConfig>(
  nextAuthProviderFactory: NextAuthProviderFactory,
): (config: Config) => Provider<Config> {
  return (config: Config): Provider<Config> => {
    const inner = nextAuthProviderFactory({
      clientId: config.clientId,
      clientSecret: config.clientSecret,
    });

    return {
      ...inner,
      id: inner.id,
      type: inner.id,
      config: config,
      validateQueryParams(params, req) {
        return {};
      },
      async getAuthorizationUrl(callbackHandlerUrl) {
        // Handle OAuth v1.x
        // if (inner.version?.startsWith("1.")) {
        //   const client = oAuth1Client(options);
        //   const tokens = (await client.getOAuthRequestToken(params)) as any;
        //   const url = `${inner.authorization?.url}?${new URLSearchParams({
        //     oauth_token: tokens.oauth_token,
        //     oauth_token_secret: tokens.oauth_token_secret,
        //     ...tokens.params,
        //   })}`;
        //   oAuth1TokenStore.set(tokens.oauth_token, tokens.oauth_token_secret);
        //   logger.debug("GET_AUTHORIZATION_URL", { url, provider: inner });
        //   return { redirect: url };
        // }
        // const client = await openidClient(options);
        //
        // const authorizationParams: AuthorizationParameters = params;
        // const cookies: Cookie[] = [];
        //
        // await checks.state.create(options, cookies, authorizationParams);
        // await checks.pkce.create(options, cookies, authorizationParams);
        // await checks.nonce.create(options, cookies, authorizationParams);
        //
        // const url = client.authorizationUrl(authorizationParams);
        //
        // logger.debug("GET_AUTHORIZATION_URL", {
        //   url,
        //   cookies,
        //   provider: inner,
        // });
        // return { redirect: url, cookies };

        // We'll return whatever is set here to the parent.
        const cookies: Record<string, string> = {};

        // In next-auth, this is handled by
        // next-auth/packages/core/src/lib/actions/signin/authorization-url.ts

        let url: URL;
        if (
          typeof inner.authorization === "object" &&
          inner.authorization.url
        ) {
          try {
            url = new URL(inner.authorization.url);
          } catch (e) {
            throw new TypeError(
              `Provider ${inner.id} has invalid authorization.url value.`,
            );
          }
        } else {
          url = await getUrlFromIssuer(inner.issuer!);
        }

        // Replace
        url.searchParams.set("response_type", "code");
        // @felipap: from next-auth: clientId can technically be undefined,
        // should we check this in assert.ts or rely on the Authorization Server
        // to do it?
        url.searchParams.set("client_id", config.clientId);
        url.searchParams.set("redirect_uri", callbackHandlerUrl);
        // Incorporate from `authorization.params`:
        if (
          inner.authorization &&
          typeof inner.authorization === "object" &&
          inner.authorization.params
        ) {
          for (const key in inner.authorization.params ?? {}) {
            url.searchParams.set(
              key,
              inner.authorization.params[key] as string,
            );
          }
        }

        // Handle OAuth v1.x
        if (inner.version?.startsWith("1.")) {
          throw new TypeError("Not implemented");
          // const client = oAuth1Client(options);
          // const tokens = (await client.getOAuthRequestToken(params)) as any;
          // const url = `${provider.authorization?.url}?${new URLSearchParams({
          //   oauth_token: tokens.oauth_token,
          //   oauth_token_secret: tokens.oauth_token_secret,
          //   ...tokens.params,
          // })}`;
          // oAuth1TokenStore.set(tokens.oauth_token, tokens.oauth_token_secret);
          // logger.debug("GET_AUTHORIZATION_URL", { url, provider });
          // return { redirect: url };
        }

        if (inner.checks?.includes("pkce")) {
          // @felipap: Study and implement later.
          throw new TypeError("Not implemented");
          // const code_verifier = generators.codeVerifier()
          // const value = generators.codeChallenge(code_verifier)
          // resParams.code_challenge = value
          // resParams.code_challenge_method = PKCE_CODE_CHALLENGE_METHOD

          // const maxAge =
          //   options.cookies.pkceCodeVerifier.options.maxAge ?? PKCE_MAX_AGE

          // cookies.push(
          //   await signCookie("pkceCodeVerifier", code_verifier, maxAge, options)
          // )
        }

        // Generate a nonce if the provider requires it.
        if (inner.checks?.includes("nonce")) {
          const value = oauth4.generateRandomNonce();
          url.searchParams.set("nonce", value);
          cookies.nonce = value;
        }

        // Generate a state if the provider requires it.
        if (inner.checks?.includes("state")) {
          const value = oauth4.generateRandomState();
          url.searchParams.set("state", value);
          cookies.state = value;
        }

        // @felipap: for later
        // if (inner.type === "oidc" && !url.searchParams.has("scope")) {
        //   url.searchParams.set("scope", "openid profile email");
        // }

        return { url: url.toString(), cookies };
      },

      async exchange(searchParams, req, callbackHandlerUrl, session) {
        let authServer: oauth4.AuthorizationServer;

        if (inner.version?.startsWith("1.")) {
          throw Error("Not implemented");
        }

        const { userinfo, token } = inner;
        // const userinfo = nextAuthProvider.userinfo as
        //   | string
        //   | UserinfoEndpointHandler;
        // const token = nextAuthProvider.token as string | TokenEndpointHandler;

        // Falls back to authjs.dev if the user only passed params
        // if (!token?.url && !userinfo?.url) {

        // @ts-ignore
        if (!token?.url && !userinfo?.url) {
          // We assume that issuer is always defined as this has been asserted earlier
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          const issuer = new URL(inner.issuer!);
          const discoveryResponse = await oauth4.discoveryRequest(issuer);
          const discoveredAs = await oauth4.processDiscoveryResponse(
            issuer,
            discoveryResponse,
          );

          if (!discoveredAs.token_endpoint)
            throw new TypeError(
              "TODO: Authorization server did not provide a token endpoint.",
            );

          if (!discoveredAs.userinfo_endpoint)
            throw new TypeError(
              "TODO: Authorization server did not provide a userinfo endpoint.",
            );

          authServer = discoveredAs;
        } else {
          assert("nextAuthProvider.issuer", inner.issuer);
          console.log("token?.url.toString", token, userinfo);

          authServer = {
            issuer: inner.issuer!, // TODO: review fallback issuer
            token_endpoint: token?.url.toString(),
            userinfo_endpoint: userinfo?.url.toString(),
          };
        }

        assert(inner.clientId, "clientId");

        const client: oauth4.Client = {
          client_id: inner.clientId,
          client_secret: inner.clientSecret,
          ...inner.client,
        };

        if (inner.checks?.includes("state")) {
          throw Error("Not implemented");
        }

        // https://github.com/panva/oauth4webapi/blob/main/docs/functions/validateAuthResponse.md
        const codeGrantParams = oauth4.validateAuthResponse(
          authServer,
          client,
          new URLSearchParams(searchParams),
          // nextAuthProvider.checks?.includes("state") ? "" :
          oauth4.skipStateCheck,
        );

        /** https://www.rfc-editor.org/rfc/rfc6749#section-4.1.2.1 */
        if (oauth4.isOAuth2Error(codeGrantParams)) {
          const cause = {
            providerId: inner.id,
            ...codeGrantParams,
          };
          console.log("OAuthCallbackError", cause);
          throw new OAuthCallbackError(
            "OAuth Provider returned an error",
            // cause,
          );
        }

        let codeVerifier: string | null = null;
        if (inner.checks?.includes("pkce")) {
          if (!session.codeVerifier) {
            throw new InvalidCheck(
              "PKCE code_verifier value could not be parsed.",
            );
          }
          codeVerifier = session.codeVerifier;
        }
        // await checks.pkce.getCodeVerifierFromCookie(
        //   cookies,
        //   resCookies,
        //   options,
        // );

        let codeGrantResponse = await oauth4.authorizationCodeGrantRequest(
          authServer,
          client,
          codeGrantParams,
          callbackHandlerUrl,
          codeVerifier ?? "auth", // TODO: review fallback code verifier
        );

        if (inner.token?.conform) {
          codeGrantResponse =
            (await inner.token.conform(codeGrantResponse.clone())) ??
            codeGrantResponse;
        }

        let challenges: oauth4.WWWAuthenticateChallenge[] | undefined;
        if (
          (challenges =
            oauth4.parseWwwAuthenticateChallenges(codeGrantResponse))
        ) {
          for (const challenge of challenges) {
            console.log("challenge", challenge);
          }
          throw new Error("TODO: Handle www-authenticate challenges as needed");
        }

        let profile: Profile = {};
        let tokens: TokenSet & Pick<Account, "expires_at">;

        if (inner.type === "oidc") {
          let nonce: string | null = null;
          if (inner.checks?.includes("nonce")) {
            if (session.nonce) {
              nonce = session.nonce;
            } else {
              throw new InvalidCheck("Nonce cookie was missing.");
            }
          }

          const result = await oauth4.processAuthorizationCodeOpenIDResponse(
            authServer,
            client,
            codeGrantResponse,
            nonce ?? oauth4.expectNoNonce,
          );

          if (oauth4.isOAuth2Error(result)) {
            console.log("error", result);
            throw new Error("TODO: Handle OIDC response body error");
          }

          profile = oauth4.getValidatedIdTokenClaims(result);
          tokens = result;
        } else {
          tokens = await oauth4.processAuthorizationCodeOAuth2Response(
            authServer,
            client,
            codeGrantResponse,
          );
          if (oauth4.isOAuth2Error(tokens as any)) {
            console.log("error", tokens);
            throw new Error("TODO: Handle OAuth 2.0 response body error");
          }

          if (typeof userinfo === "object" && userinfo.request) {
            const _profile = await userinfo.request({
              tokens,
              provider: inner,
              // client: nextAuthProvider,
            });
            if (_profile instanceof Object) {
              profile = _profile;
            }
          } else if (userinfo?.url) {
            const userinfoResponse = await oauth4.userInfoRequest(
              authServer,
              client,
              (tokens as any).access_token,
            );
            profile = await userinfoResponse.json();
          } else {
            throw new TypeError("No userinfo endpoint configured");
          }
        }

        if (tokens.expires_in) {
          tokens.expires_at =
            Math.floor(Date.now() / 1000) + Number(tokens.expires_in);
        }

        return {
          profile,
          nextAuthProvider: inner,
          tokens,
        };
      },
      metadata: {
        title: inner.name,
        logo: inner.style!.logo,
      },
    };
  };
}

async function getUrlFromIssuer(issuer: string) {
  const issuerUrl = new URL(issuer!);
  const discoveryResponse = await oauth4.discoveryRequest(issuerUrl);
  const as = await oauth4.processDiscoveryResponse(
    issuerUrl,
    discoveryResponse,
  );
  if (!as.authorization_endpoint) {
    throw new TypeError(
      "Authorization server did not provide an authorization endpoint.",
    );
  }
  return new URL(as.authorization_endpoint);
}
