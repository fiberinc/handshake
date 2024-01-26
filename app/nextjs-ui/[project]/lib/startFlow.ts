// @ts-nocheck

import * as Sentry from "@sentry/nextjs";
import toast from "react-hot-toast";

// Begin the OAuth flow for a user of the passed-in shop.
export async function startProviderAuthFlow(
  projectId: string,
  providerId: string,
  providerType: string,
  params: { state?: string; accountId?: string; redirectUri?: string },
  extras: any = {},
) {
  console.log("params", params);

  const url = new URL(
    `/api/${projectId}/${providerId}/get-redirect`,
    // @ts-ignore
    location,
  );

  if (params.redirectUri) {
    url.searchParams.set("redirect_uri", params.redirectUri);
  }
  if (params.state) {
    url.searchParams.set("state", params.state);
  }
  if (params.accountId) {
    url.searchParams.set("account_id", params.accountId);
  }
  if (extras) {
    url.searchParams.set("extras", JSON.stringify(extras));
  }

  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
    },
  });

  const genericError = `Failed to talk to ${capitalize(
    providerType,
  )}. Our team has been notified.`;

  let body;
  try {
    body = await response.json();
  } catch (e) {
    console.log("e", e);
    Sentry.captureException(e);
    toast.error(genericError);
    return;
  }

  if (response.status !== 200) {
    toast.error(body.message || genericError);
    return;
  }

  toast(`Taking you to ${capitalize(providerType)}...`);
  console.log(`authUri is`, body.authUri);

  if (body.authUri) {
    if (window.parent) {
      window.parent.location.href = body.authUri;
    } else {
      window.location.href = body.authUri;
    }
  }
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
