// Thanks to next-auth for some of the code here.

import { OAuthConfig, OAuthUserConfig } from "@auth/core/providers";
import assert from "assert";
import crypto from "crypto";
import * as o from "oauth4webapi";
import { Provider } from "./lib/Provider";

export type TypicalOAuthConfig = {
  clientId: string;
  clientSecret: string;
};

// https://next-auth.js.org/providers/

type NextAuthProvider<P> = (options: OAuthUserConfig<P>) => OAuthConfig<any>;

export function makeOAuthProviderFromNextAuth<
  Profile,
  Config extends TypicalOAuthConfig,
>(
  nextAuthProviderFactory: NextAuthProvider<Profile>,
): (config: Config) => Provider<Config> {
  return (config: Config): Provider<Config> => {
    const nextAuthProvider = nextAuthProviderFactory({});

    // Not sure where this logic belongs. It checks that either
    // authorization.url is defined, or issuer is defined.
    assert(
      nextAuthProvider.authorization?.url || nextAuthProvider.issuer,
      "You must define issuer if you're not specifying authorization.url.",
    );

    return {
      ...nextAuthProvider,
      id: nextAuthProvider.id,
      type: nextAuthProvider.id,
      config: config,
      validateQueryParams(params, req) {
        return {};
      },
      async getAuthorizationUrl(callbackHandlerUrl) {
        // We'll return whatever is set here to the parent.
        const cookies: Record<string, string> = {};

        // In next-auth, this is handled by
        // next-auth/packages/core/src/lib/actions/signin/authorization-url.ts

        let url: URL;
        if (nextAuthProvider.authorization?.url) {
          try {
            url = new URL(nextAuthProvider.authorization?.url);
          } catch (e) {
            throw new TypeError(
              `Provider ${nextAuthProvider.id} has invalid authorization.url value.`,
            );
          }
        } else {
          const issuer = new URL(nextAuthProvider.issuer!);
          const discoveryResponse = await o.discoveryRequest(issuer);
          const as = await o.processDiscoveryResponse(
            issuer,
            discoveryResponse,
          );
          if (!as.authorization_endpoint) {
            throw new TypeError(
              "Authorization server did not provide an authorization endpoint.",
            );
          }
          url = new URL(as.authorization_endpoint);
        }

        // Replace
        url.searchParams.set("response_type", "code");
        // @felipap: from next-auth: clientId can technically be undefined,
        // should we check this in assert.ts or rely on the Authorization Server
        // to do it?
        url.searchParams.set("client_id", config.clientId);
        url.searchParams.set("redirect_uri", callbackHandlerUrl);
        // Incorporate from `authorization.params`:
        for (const key in nextAuthProvider.authorization?.params ?? {}) {
          url.searchParams.set(key, nextAuthProvider.authorization.params[key]);
        }

        if (nextAuthProvider.checks?.includes("pkce")) {
          // @felipap: Study and implement later.
          throw new TypeError("Not implemented");
        }

        // Generate a nonce if the provider checks for it.
        if (nextAuthProvider.type === "oidc") {
          if (nextAuthProvider.checks?.includes("nonce")) {
            const nonce = crypto.randomBytes(16).toString("hex");
            url.searchParams.set("state", nonce);
            cookies.nonce = nonce;
          }
        }

        // @felipap: I copied this but I don't understand it.
        if (
          nextAuthProvider.type === "oidc" &&
          !url.searchParams.has("scope")
        ) {
          url.searchParams.set("scope", "openid profile email");
        }

        return { url: url.toString(), cookies };
      },
      async exchange(req, searchParams, callbackHandlerUrl) {
        return "";
      },
      metadata: {
        title: nextAuthProvider.name,
        logo: nextAuthProvider.style!.logo,
      },
    };
  };
}
