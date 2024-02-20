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
  scopes?: string[];
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
      async getAuthorizationUrl(callbackHandlerUrl) {
        // Handle OAuth v1.x
        if (providerInfo.version?.startsWith("1.")) {
          throw new TypeError("Not implemented");
        }

        // We'll return whatever is set here to the parent.
        const persist: Record<string, string> = {};

        const client = await getOpenIdClient(
          providerInfo,
          args.clientId,
          args.clientSecret,
          callbackHandlerUrl,
        );

        const params: AuthorizationParameters = {};

        const paramsFromProviderInfo =
          typeof providerInfo.authorization === "string"
            ? Object.fromEntries(
                new URL(providerInfo.authorization).searchParams,
              )
            : providerInfo.authorization?.params;
        for (const key in paramsFromProviderInfo) {
          params[key] = paramsFromProviderInfo[key] as string;
        }

        if (args.scopes) {
          params.scope = args.scopes.join(" ");
        }

        // Generate a code verifier if the provider requires it.
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

        return {
          tokens,
        };
      },
    };
  };
}

// This is from next-auth@5. Will we need it later or is the current use of
// `wellKnown` all we need?
//
// async function getUrlFromIssuer(issuer: string) { let issuerUrl: URL; try {
//   issuerUrl = new URL(issuer); } catch (e) { throw new TypeError( "The
//   'issuer' provided in the provider config contains an invalid URL.",
//     );
//   }
//   const discoveryResponse = await oauth4.discoveryRequest(issuerUrl); const
//   as = await oauth4.processDiscoveryResponse( issuerUrl, discoveryResponse,
//   );
//   if (!as.authorization_endpoint) { throw new TypeError( "Authorization
//     server did not provide an authorization endpoint.",
//     );
//   }
//   return new URL(as.authorization_endpoint);
// }
