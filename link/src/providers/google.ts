import assert from "assert";
import crypto from "crypto";
import { NextApiRequest } from "next";
import { z } from "zod";
import {
  InvalidRequest,
  NextApiRequestWithQuery,
  Provider,
} from "./lib/Provider";

export const GoogleCredentialSchema = z.object({
  email: z.string(),
  accessToken: z.string(),
  refreshToken: z.string(),
  scopes: z.optional(z.array(z.string())),
  expiresAt: z.date(),
});

export type GoogleCredential = z.infer<typeof GoogleCredentialSchema>;

const WEBSITE_URL = process.env.WEBSITE_URL ?? "";
assert(WEBSITE_URL, "WEBSITE_URL is not set");

const querySchema = z.object({
  code: z.string(),
});

type CallbackParams = z.infer<typeof querySchema>;

export interface GoogleConfig {
  clientId: string;
  clientSecret: string;
  requiredScopes: string[];
}

type FindAName<T> = T & { id?: string };

export const GoogleProviderId = "google";

export function GoogleProvider({
  id,
  ...config
}: FindAName<GoogleConfig>): Provider<
  GoogleConfig,
  CallbackParams,
  GoogleCredential
> {
  const providerId = id ?? GoogleProviderId;

  return {
    id: providerId,
    type: "google",
    metadata: {
      title: "google",
      logo: "",
    },
    config,
    getAuthorizationUrl(callbackHandlerUrl: string): URL {
      const nonce = crypto.randomBytes(16).toString("hex");
      const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
      authUrl.searchParams.append(
        "scope",
        Array.from(
          new Set([...config.requiredScopes, "openid", "email", "profile"]),
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
      authUrl.searchParams.append("client_id", config.clientId);
      return authUrl;
    },
    parseQueryParams(req: NextApiRequest) {
      return querySchema.parse(req.query);
    },
    async exchange(
      req: NextApiRequestWithQuery<CallbackParams>,
      callbackHandlerUrl: string,
    ) {
      // console.log("req.url", req.url);
      console.log("callbackHandlerUrl FUCK THIS 444", callbackHandlerUrl);
      console.log("req.headers.origin", req.headers.origin);

      const { accessToken, refreshToken, expiresAt, email, scopes } =
        await exchangeGoogleAccessTokenAndReadStoreData(
          callbackHandlerUrl,
          config.clientId,
          config.clientSecret,
          req.query.code,
        );

      return {
        accessToken,
        refreshToken,
        expiresAt,
        email,
        scopes,
      };
    },
  };
}

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

  console.log("json", json, {
    body,
  });

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
  let json;
  try {
    const res = await fetch(
      `https://www.googleapis.com/gmail/v1/users/me/profile?access_token=${accessToken}`,
    );
    json = await res.json();
  } catch (e) {
    throw e;
  }

  return { email: json.emailAddress };
}
