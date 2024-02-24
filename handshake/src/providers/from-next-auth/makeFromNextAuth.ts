import { OAuthConfig, OAuthUserConfig } from "next-auth/providers";
import { Handler, HandlerFactory } from "~/core/Handler";
import { OAuthProvider } from "../lib/OAuthProvider";
import { TypicalOAuthArgs, makeHandlerFactory } from "../lib/makeHandler";

// The type of the factories that next-auth exposes for each provider (eg.
// GitHub, Keycloak, etc.)
type NextAuthProviderFactory = (
  options: OAuthUserConfig<any>,
) => OAuthConfig<any>;

/**
 * Crate a provider from a `next-auth` provider factory.
 */
export function makeFromNextAuth<Args extends TypicalOAuthArgs>(
  nextAuthProviderFactory: NextAuthProviderFactory,
  overrideOptions?: Partial<OAuthProvider>,
): HandlerFactory<Args> {
  return (args: Args): Handler => {
    // Where args is something like { clientId, clientSecret }. The NextAuth
    // factory may do nothing special with it other than inline it into the info
    // object. But it can also use it to modify other attributes in
    // unpredictable ways. That's why we must pass the real config here, even if
    // we'll delete the top-level values right after.
    const info = nextAuthProviderFactory(args);

    delete info.clientId;
    delete info.clientSecret;

    return makeHandlerFactory({
      ...info,
      id: info.id,
      metadata: {
        title: info.name,
        logo: info.style?.logo,
      },
      authorization:
        typeof info.authorization === "string"
          ? {
              url: info.authorization,
            }
          : info.authorization,
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
