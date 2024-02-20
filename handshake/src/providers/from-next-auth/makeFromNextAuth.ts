import { OAuthConfig, OAuthUserConfig } from "next-auth/providers";
import { Provider } from "../lib/Provider";
import {
  OAuthProvider,
  ProviderFactory,
  TypicalOAuthConfig,
} from "../oauth/OAuthProvider";
import { OAuthProviderInfo } from "../oauth/types";

// The type of the factories that next-auth exposes for each provider (eg.
// GitHub, Keycloak, etc.)
type NextAuthProviderFactory = (
  options: OAuthUserConfig<any>,
) => OAuthConfig<any>;

/**
 * Crate a provider from a `next-auth` provider factory.
 */
export function makeFromNextAuth<Config extends TypicalOAuthConfig>(
  nextAuthProviderFactory: NextAuthProviderFactory,
  overrideOptions?: Partial<OAuthProviderInfo>,
): ProviderFactory<Config> {
  return (args: Config): Provider<any> => {
    // Where args is something like { clientId, clientSecret }. The NextAuth
    // factory may do nothing special with it other than inline it into the info
    // object. But it can also use it to modify other attributes in
    // unpredictable ways. That's why we must pass the real config here, even if
    // we'll delete the top-level values right after.
    const info = nextAuthProviderFactory(args);

    delete info.clientId;
    delete info.clientSecret;

    return OAuthProvider({
      ...info,
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
