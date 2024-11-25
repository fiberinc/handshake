import assert from "assert";
import { HandlerFactory } from "~/core/types";
import { makeOAuthFactory } from "./lib/oauth-factory";

// Microsoft Entra (Azure AD) OAuth Scopes
type EntraScope =
  | "openid"
  | "email"
  | "profile"
  | "offline_access"
  | "https://graph.microsoft.com/User.Read"
  | "https://graph.microsoft.com/User.ReadWrite"
  | "https://graph.microsoft.com/Files.Read"
  | "https://graph.microsoft.com/Files.ReadWrite"
  | "https://graph.microsoft.com/Calendars.Read"
  | "https://graph.microsoft.com/Calendars.ReadWrite"
  | "https://graph.microsoft.com/Mail.Read"
  | "https://graph.microsoft.com/Mail.Send";

interface Args {
  clientId: string;
  clientSecret: string;
  scopes: EntraScope[];
  tenantId?: string; // Optional: "common", "organizations", or specific tenant ID
}

/**
 * https://learn.microsoft.com/en-us/entra/identity-platform/scopes-oidc
 *
 * @reference https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-auth-code-flow
 * @options
 * ```ts title="app/options.ts"
 * import { Entra } from "handshake";
 *
 * Entra({
 *   clientId: string,
 *   clientSecret: string,
 *   scopes: [
 *     "openid",
 *     "https://graph.microsoft.com/User.Read",
 *     "https://graph.microsoft.com/Mail.Send",
 *   ],
 * });
 * ```
 *
 * @providersetup
 *
 * ## Configure the Redirect URI
 *
 * Ensure your app is configured in the Azure portal under `Authentication` with
 * the following redirect URI:
 *
 * `https://YOUR_APP_URL/auth/entra/callback`
 *
 * @troubleshoot
 * ### "invalid_grant" error
 *
 * Ensure that the scopes provided match those configured for the app in Azure.
 * Additionally, confirm the `tenantId` is set correctly if targeting a specific
 * organization.
 */
export const MicrosoftEntra: HandlerFactory<Args> = (args) => {
  assert(args.clientId, "clientId is empty or missing");
  assert(args.clientSecret, "clientSecret is empty or missing");
  assert(args.scopes && args.scopes.length > 0, "scopes is empty or missing");

  // Default to multi-tenant if no tenantId is provided
  const tenantId = args.tenantId || "common";

  return makeOAuthFactory({
    id: "microsoft-entra-id",
    name: "Microsoft Entra ID",
    website: "https://entra.microsoft.com",
    authorization: {
      url: `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/authorize`,
    },
    token: {
      url: `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
    },
    checks: ["state"],
    client: {
      // Entra supports multiple methods; use client_secret_post for simplicity
      token_endpoint_auth_method: "client_secret_post",
    },
  })(args);
};
