import { OAuthConfig, OAuthUserConfig } from "next-auth/providers";
import { AuthorizationParameters } from "openid-client";
import { Handler, HandlerFactory } from "~/core/types";
import { OAuthProvider } from "../lib/OAuthProvider";
import { TypicalOAuthArgs, makeOAuthFactory } from "../lib/oauth-factory";

type FixedNextAuthOAuthConfig = OAuthConfig<any> & {
  // Providers like Freshbooks contain authorization URL.
  authorizationUrl?: string;
};

// The type of the factories that next-auth exposes for each provider (eg.
// GitHub, Keycloak, etc.)
type NextAuthProviderFactory<Args> = (
  options: OAuthUserConfig<any> & Args,
) => FixedNextAuthOAuthConfig;

/**
 * Crate a provider from a `next-auth` provider factory.
 */
export function makeFromNextAuth<Args = unknown>(
  nextAuthProviderFactory: NextAuthProviderFactory<Args>,
  overrideOptions?: Partial<OAuthProvider>,
): HandlerFactory<Args & TypicalOAuthArgs> {
  return (args: Args & TypicalOAuthArgs): Handler => {
    // Where args is something like { clientId, clientSecret }. The NextAuth
    // factory may do nothing special with it other than inline it into the info
    // object. But it can also use it to modify other attributes in
    // unpredictable ways. That's why we must pass the real config here, even if
    // we'll delete the top-level values right after.
    const info = nextAuthProviderFactory(args);

    delete info.clientId;
    delete info.clientSecret;

    let authorization:
      | {
          url: string;
          params?: AuthorizationParameters;
          request?: any; // EndpointRequest<any, any, AuthorizationParameters>
        }
      | undefined = undefined;
    if (info.wellKnown) {
      // No need for an authorization URL.
    } else if (info.authorizationUrl) {
      authorization = { url: info.authorizationUrl };
    } else if (typeof info.authorization === "string") {
      authorization = { url: info.authorization };
    } else if (info.authorization?.url) {
      authorization = {
        url: info.authorization.url,
        params: info.authorization.params,
        request: info.authorization.request,
      };
    }

    let checks;

    return makeOAuthFactory({
      ...info,
      id: info.id,
      name: info.name,
      website: "",
      authorization,
      checks,
      token:
        typeof info.token === "string"
          ? {
              url: info.token,
            }
          : info.token,
      userinfo:
        typeof info.userinfo === "string"
          ? {
              url: info.userinfo,
            }
          : info.userinfo,
      ...overrideOptions,
    })(args);
  };
}
