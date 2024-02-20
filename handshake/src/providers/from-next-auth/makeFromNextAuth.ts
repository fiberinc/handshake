import { OAuthConfig, OAuthUserConfig } from "next-auth/providers";
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

function getOAuthProviderInfoFromNextAuthFactory(
  factory: NextAuthProviderFactory,
): OAuthProviderInfo {
  const info = factory({
    clientId: "whatever",
    clientSecret: "whatever",
  });

  return {
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
  };
}

/**
 * Turn a `next-auth` provider factory into a Handshake provider factory.
 */
export function makeFromNextAuth<Config extends TypicalOAuthConfig>(
  nextAuthProviderFactory: NextAuthProviderFactory,
): ProviderFactory<Config> {
  const providerInfo = getOAuthProviderInfoFromNextAuthFactory(
    nextAuthProviderFactory,
  );

  return OAuthProvider(providerInfo);
}
