import assert from "assert";
import crypto from "crypto";
import { z } from "zod";
import { InvalidRequest } from "~/core/errors";
import { HandlerFactory } from "~/core/types";

export interface Credential {
  email: string;
  accessToken: string;
  refreshToken: string;
  scopes?: string[];
  expiresAt: Date;
}

const QueryParamStruct = z.object({
  code: z.string(),
});

type CallbackParams = z.infer<typeof QueryParamStruct>;

export interface Args {
  clientId: string;
  clientSecret: string;
  scopes: string[];
}

export const PROVIDER_ID = "google";

export const Google: HandlerFactory<Args, Credential> = ({ id, ...args }) => {
  return {
    id: id ?? PROVIDER_ID,
    type: "google",
    provider: {
      id: PROVIDER_ID,
      name: "google",
      type: "oauth2",
      website: "https://google.com",
    },
    getAuthorizationUrl(callbackHandlerUrl: string) {
      const nonce = crypto.randomBytes(16).toString("hex");
      const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
      authUrl.searchParams.append(
        "scope",
        Array.from(
          new Set([...args.scopes, "openid", "email", "profile"]),
        ).join(" "),
      );
      // README this is apparently necessary in order to get the refresh token for
      // an already-user, when the first request didn't set access_type=offline. https://stackoverflow.com/a/10857806
      authUrl.searchParams.append("prompt", "consent");
      authUrl.searchParams.append("access_type", "offline");
      authUrl.searchParams.append("include_granted_scopes", "true");
      authUrl.searchParams.append("response_type", "code");
      authUrl.searchParams.append("state", nonce);
      authUrl.searchParams.append("redirect_uri", callbackHandlerUrl);
      authUrl.searchParams.append("client_id", args.clientId);
      return { url: authUrl.toString() };
    },
    validateQueryParams(params: URLSearchParams) {
      return QueryParamStruct.parse(Object.fromEntries(params.entries()));
    },
    async exchange(searchParams, req, callbackHandlerUrl) {
      const params = Object.fromEntries(searchParams) as CallbackParams;

      const { accessToken, refreshToken, expiresAt, email, scopes } =
        await exchangeGoogleAccessTokenAndReadStoreData(
          callbackHandlerUrl,
          args.clientId,
          args.clientSecret,
          params.code,
        );

      return {
        tokens: {
          accessToken,
          refreshToken,
          expiresAt,
          email,
          scopes,
        } satisfies Credential,
      };
    },
  };
};

/**
 *
 * @param redirectUri - Same as the value we included as `redirect_uri` when
 * sending the user to Google to obtain the code.
 * @param clientId
 * @param clientSecret
 * @param code
 * @returns
 */
export async function exchangeGoogleAccessTokenAndReadStoreData(
  redirectUri: string,
  clientId: string,
  clientSecret: string,
  code: string,
) {
  assert(clientId);
  assert(clientSecret);
  assert(code);

  // Documentation at
  // https://developers.google.com/identity/protocols/oauth2/web-server#creatingclient
  const body = {
    grant_type: "authorization_code",
    code,
    access_type: "offline",
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: redirectUri,
    // Add this scope to the rest of the scopes already granted for this app.
    include_granted_scopes: "true",
  };

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(body),
  });

  const json = await res.json();

  if (json.error) {
    if (json.error === "invalid_request") {
      throw new InvalidRequest(json);
    }
    throw json;
  }

  const { email } = await getGmailProfileInfo(json.access_token);

  return {
    accessToken: json.access_token,
    refreshToken: json.refresh_token,
    expiresAt: new Date(Date.now() + (json.expires_in as number) * 1000),
    scopes: [json.scope],
    email,
  };
}

export async function getGmailProfileInfo(accessToken: string) {
  // TODO try-catch?
  const res = await fetch(
    `https://www.googleapis.com/gmail/v1/users/me/profile?access_token=${accessToken}`,
  );
  const json = await res.json();

  return { email: json.emailAddress };
}
