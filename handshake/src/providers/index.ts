import Atlassian from "@auth/core/providers/atlassian";
import GitHub from "@auth/core/providers/github";
import Google from "@auth/core/providers/google";
import { makeOAuthProviderFromNextAuth } from "./makeProviderFromNextAuthConfig";

export * from "./amazon-seller";
// export * from "./google";
export * from "./shopify";

export { GoogleProviderId } from "./google";

// https://next-auth.js.org/providers/
export const AtlassianProvider = makeOAuthProviderFromNextAuth(Atlassian);

export const GitHubProvider = makeOAuthProviderFromNextAuth(GitHub);

export const GoogleProvider = makeOAuthProviderFromNextAuth(Google);
