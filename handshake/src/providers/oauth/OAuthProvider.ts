import * as oauth4 from "oauth4webapi";
import {
  AuthorizationParameters,
  CallbackParamsType,
  OAuthCallbackChecks,
  OpenIDCallbackChecks,
  TokenSet,
  generators,
} from "openid-client";
import { SessionValue } from "~/cookies";
import { InvalidCheck } from "~/errors";
import { Provider } from "../lib/Provider";
import { getOpenIdClient } from "./client";
import { OAuthProviderInfo } from "./types";

export type ProviderFactory<Config extends TypicalOAuthConfig> = (
  config: Config,
) => Provider<Config>;

export type TypicalOAuthConfig = {
  clientId: string;
  clientSecret: string;
};

/**
 */
export function OAuthProvider<Config extends TypicalOAuthConfig>(
  providerInfo: OAuthProviderInfo,
): ProviderFactory<Config> {
  return (args: Config): Provider<Config> => {
    return {
      ...providerInfo,
      id: providerInfo.id,
      type: providerInfo.id,
      config: args,
      metadata: {
        title: providerInfo.name,
      },
      validateQueryParams(params, req) {
        return {};
      },

      async getAuthorizationUrl(callbackHandlerUrl, session) {
        // Handle OAuth v1.x
        if (providerInfo.version?.startsWith("1.")) {
          throw new TypeError("Not implemented");
        }

        // We'll return whatever is set here to the parent.
        const persist: Record<string, string> = {};

        // In next-auth, this is handled by
        // next-auth/packages/next-auth/src/core/lib/oauth/authorization-url.ts

        const client = await getOpenIdClient(
          providerInfo,
          args.clientId,
          args.clientSecret,
          callbackHandlerUrl,
        );

        const params: AuthorizationParameters = {};

        const paramsFromTheUrl =
          typeof providerInfo.authorization === "string"
            ? Object.fromEntries(
                new URL(providerInfo.authorization).searchParams,
              )
            : providerInfo.authorization?.params;
        for (const key in paramsFromTheUrl) {
          params[key] = paramsFromTheUrl[key] as string;
        }

        // let url: URL;
        // if (providerInfo.authorization) {
        //  url = new URL(providerInfo.authorization);
        // } else {
        //   console.log("providerInfo.issuer", providerInfo.issuer);
        //   url = await getUrlFromIssuer(providerInfo.issuer!);
        // }

        // Replace
        params.response_type = "code";
        // @felipap: from next-auth: clientId can technically be undefined,
        // should we check this in assert.ts or rely on the Authorization Server
        // to do it?
        params.client_id = args.clientId;
        params.redirect_uri = callbackHandlerUrl;
        // Incorporate from `authorization.params`:
        if (
          providerInfo.authorization &&
          typeof providerInfo.authorization === "object" &&
          providerInfo.authorization.params
        ) {
          for (const key in providerInfo.authorization.params ?? {}) {
            params[key] = providerInfo.authorization.params[key] as string;
          }
        }

        if (providerInfo.checks?.includes("pkce")) {
          const code_verifier = generators.codeVerifier();
          const value = generators.codeChallenge(code_verifier);
          params.code_challenge = value;
          params.code_challenge_method = "S256";
          persist.pkceCodeVerifier = code_verifier;
        }

        // Generate a nonce if the provider requires it.
        if (providerInfo.checks?.includes("nonce")) {
          const value = oauth4.generateRandomNonce();
          params.nonce = value;
          persist.nonce = value;
        }

        // Generate a state if the provider requires it.
        if (providerInfo.checks?.includes("state")) {
          const value = oauth4.generateRandomState();
          params.state = value;
          persist.state = value;
        }

        // @felipap: for later
        // if (inner.type === "oidc" && !params.has("scope")) {
        //   params.scope = "openid profile email"
        // }

        const url = client.authorizationUrl(params);

        return { url: url.toString(), persist };
      },

      // next-auth/packages/next-auth/src/core/lib/oauth/callback.ts
      async exchange(
        searchParams,
        req,
        callbackHandlerUrl,
        session: SessionValue,
      ) {
        if (providerInfo.version?.startsWith("1.")) {
          throw Error("Not implemented");
        }

        const client = await getOpenIdClient(
          providerInfo,
          args.clientId,
          args.clientSecret,
          callbackHandlerUrl,
        );

        // "Represents a set of tokens retrieved from either authorization
        // callback or successful token endpoint grant call."
        let tokens: TokenSet;

        // @felipap: In next-auth, this is a pipe instead of an ampersand.
        const checks: OpenIDCallbackChecks & OAuthCallbackChecks = {};

        // Run checks.
        if (providerInfo.checks?.includes("nonce")) {
          if (session.valuesFromProvider?.nonce) {
            checks.nonce = session.valuesFromProvider.nonce;
          } else {
            throw new InvalidCheck("Nonce value not saved.");
          }
        }
        if (providerInfo.checks?.includes("state")) {
          if (session.valuesFromProvider?.state) {
            checks.state = session.valuesFromProvider.state;
          } else {
            throw new InvalidCheck("State value not saved.");
          }
        }
        if (providerInfo.checks?.includes("pkce")) {
          if (session.valuesFromProvider?.pkceCodeVerifier) {
            checks.code_verifier = session.valuesFromProvider.pkceCodeVerifier;
          } else {
            throw new InvalidCheck("pkceCodeVerifier value not saved.");
          }
        }

        const params: CallbackParamsType = {
          ...client.callbackParams({
            // Looks like only the search parameters are relevant for this URL.
            url: `http://n?${searchParams.toString()}`,
            // TODO: Ask to allow object to be passed upstream:
            // https://github.com/panva/node-openid-client/blob/3ae206dfc78c02134aa87a07f693052c637cab84/types/index.d.ts#L439
            // @ts-expect-error
            body: req.body,
            method: req.method,
          }),
          ...providerInfo.token?.params,
        };

        if (providerInfo.token?.request) {
          throw new Error("Not needed yet");
        } else if (providerInfo.idToken) {
          console.log("will work it", callbackHandlerUrl, params, checks);
          tokens = await client.callback(callbackHandlerUrl, params, checks);
        } else {
          // This seems to fail silently, which is shit.
          tokens = await client.oauthCallback(
            callbackHandlerUrl,
            params,
            checks,
          );
        }

        console.log("tokens", tokens);

        // // @ts-ignore
        // if (!token?.url && !userinfo?.url) {
        //   // We assume that issuer is always defined as this has been asserted earlier
        //   // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        //   const issuer = new URL(providerInfo.issuer!);
        //   const discoveryResponse = await oauth4.discoveryRequest(issuer);
        //   const discoveredAs = await oauth4.processDiscoveryResponse(
        //     issuer,
        //     discoveryResponse,
        //   );

        //   if (!discoveredAs.token_endpoint)
        //     throw new TypeError(
        //       "TODO: Authorization server did not provide a token endpoint.",
        //     );

        //   if (!discoveredAs.userinfo_endpoint)
        //     throw new TypeError(
        //       "TODO: Authorization server did not provide a userinfo endpoint.",
        //     );

        //   authServer = discoveredAs;
        // } else {
        //   assert("nextAuthProvider.issuer", providerInfo.issuer);
        //   console.log("token?.url.toString", token, userinfo);

        //   authServer = {
        //     issuer: providerInfo.issuer!, // TODO: review fallback issuer
        //     token_endpoint: token?.url.toString(),
        //     userinfo_endpoint: userinfo?.url.toString(),
        //   };
        // }

        // assert(providerInfo.clientId, "clientId");

        // const client: oauth4.Client = {
        //   client_id: providerInfo.clientId,
        //   client_secret: providerInfo.clientSecret,
        //   ...providerInfo.client,
        // };

        // if (providerInfo.checks?.includes("state")) {
        //   throw Error("Not implemented");
        // }

        // // https://github.com/panva/oauth4webapi/blob/main/docs/functions/validateAuthResponse.md
        // const codeGrantParams = oauth4.validateAuthResponse(
        //   authServer,
        //   client,
        //   new URLSearchParams(searchParams),
        //   // nextAuthProvider.checks?.includes("state") ? "" :
        //   oauth4.skipStateCheck,
        // );

        // /** https://www.rfc-editor.org/rfc/rfc6749#section-4.1.2.1 */
        // if (oauth4.isOAuth2Error(codeGrantParams)) {
        //   const cause = {
        //     providerId: providerInfo.id,
        //     ...codeGrantParams,
        //   };
        //   console.log("OAuthCallbackError", cause);
        //   throw new OAuthCallbackError(
        //     "OAuth Provider returned an error",
        //     // cause,
        //   );
        // }

        // let codeVerifier: string | null = null;
        // if (providerInfo.checks?.includes("pkce")) {
        //   if (!session.codeVerifier) {
        //     throw new InvalidCheck(
        //       "PKCE code_verifier value could not be parsed.",
        //     );
        //   }
        //   codeVerifier = session.codeVerifier;
        // }
        // // await checks.pkce.getCodeVerifierFromCookie(
        // //   cookies,
        // //   resCookies,
        // //   options,
        // // );

        // let codeGrantResponse = await oauth4.authorizationCodeGrantRequest(
        //   authServer,
        //   client,
        //   codeGrantParams,
        //   callbackHandlerUrl,
        //   codeVerifier ?? "auth", // TODO: review fallback code verifier
        // );

        // if (providerInfo.token?.conform) {
        //   codeGrantResponse =
        //     (await providerInfo.token.conform(codeGrantResponse.clone())) ??
        //     codeGrantResponse;
        // }

        // let challenges: oauth4.WWWAuthenticateChallenge[] | undefined;
        // if (
        //   (challenges =
        //     oauth4.parseWwwAuthenticateChallenges(codeGrantResponse))
        // ) {
        //   for (const challenge of challenges) {
        //     console.log("challenge", challenge);
        //   }
        //   throw new Error("TODO: Handle www-authenticate challenges as needed");
        // }

        // let profile: Profile = {};
        // let tokens: TokenSet & Pick<Account, "expires_at">;

        // if (providerInfo.type === "oidc") {
        //   let nonce: string | null = null;
        //   if (providerInfo.checks?.includes("nonce")) {
        //     if (session.nonce) {
        //       nonce = session.nonce;
        //     } else {
        //       throw new InvalidCheck("Nonce cookie was missing.");
        //     }
        //   }

        //   const result = await oauth4.processAuthorizationCodeOpenIDResponse(
        //     authServer,
        //     client,
        //     codeGrantResponse,
        //     nonce ?? oauth4.expectNoNonce,
        //   );

        //   if (oauth4.isOAuth2Error(result)) {
        //     console.log("error", result);
        //     throw new Error("TODO: Handle OIDC response body error");
        //   }

        //   profile = oauth4.getValidatedIdTokenClaims(result);
        //   tokens = result;
        // } else {
        //   tokens = await oauth4.processAuthorizationCodeOAuth2Response(
        //     authServer,
        //     client,
        //     codeGrantResponse,
        //   );
        //   if (oauth4.isOAuth2Error(tokens as any)) {
        //     console.log("error", tokens);
        //     throw new Error("TODO: Handle OAuth 2.0 response body error");
        //   }

        //   if (typeof userinfo === "object" && userinfo.request) {
        //     const _profile = await userinfo.request({
        //       tokens,
        //       provider: providerInfo,
        //       // client: nextAuthProvider,
        //     });
        //     if (_profile instanceof Object) {
        //       profile = _profile;
        //     }
        //   } else if (userinfo?.url) {
        //     const userinfoResponse = await oauth4.userInfoRequest(
        //       authServer,
        //       client,
        //       (tokens as any).access_token,
        //     );
        //     profile = await userinfoResponse.json();
        //   } else {
        //     throw new TypeError("No userinfo endpoint configured");
        //   }
        // }

        // if (tokens.expires_in) {
        //   tokens.expires_at =
        //     Math.floor(Date.now() / 1000) + Number(tokens.expires_in);
        // }

        return {
          tokens,
        };
      },
    };
  };
}

async function getUrlFromIssuer(issuer: string) {
  let issuerUrl: URL;
  try {
    issuerUrl = new URL(issuer);
  } catch (e) {
    throw new TypeError(
      "The 'issuer' provided in the provider config contains an invalid URL.",
    );
  }
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
