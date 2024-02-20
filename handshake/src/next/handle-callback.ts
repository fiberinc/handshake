import { HttpError } from "http-errors";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { HandshakeOptions } from "../LinkOptions";
import { parseSessionFromCookieValue } from "../cookies";
import { Provider } from "../providers/lib/Provider";

export async function handleCallback(
  options: HandshakeOptions,
  projectId: string,
  provider: Provider,
  req: NextRequest,
  res: NextResponse,
) {
  if (req.method !== "GET") {
    return new Response(
      `Error: This action with HTTP ${req.method} is not supported.`,
      { status: 400 },
    );
  }

  // Validate the query params returned by the provider, if
  // `validateQueryParams` is defined.
  if (provider.validateQueryParams) {
    try {
      const searchParams = req.nextUrl.searchParams;
      provider.validateQueryParams(searchParams, req);
    } catch (e) {
      console.log("provider.parseQueryParams failed", e);

      // TODO improve
      // TODO only show in development
      return new Response(`Wrong parameters: ${e}`, { status: 400 });
    }
  }

  // Get session valued we saved in a cookie.
  const cookieStore = cookies();
  const savedCookie = cookieStore.get(options.sessionCookie);
  if (!savedCookie) {
    return new Response(
      `Session cookie not found ("${options.sessionCookie}"). Authentication might have taken too long or you arrived from a bad link.`,
      {
        status: 400,
      },
    );
  }
  const session = parseSessionFromCookieValue(savedCookie.value);
  console.log("Found session stored in cookie.", session);

  // TODO QUESTION should we clear the cookie here?

  // Check that the callback URI to send users back to is allowed. If the
  // exchange fails, we might want to send users back to this
  const isValid = isValidDeveloperCallbackUri(
    session.developerCallbackUri,
    options,
    req,
  );
  if (!isValid) {
    // FIXME this could be a React page.

    return new Response(
      "Callback uri is not valid for this project's settings.",
      {
        status: 400,
      },
    );
  }
  console.log(
    `Will redirect users back to ${session.developerCallbackUri} if successful`,
  );

  // Exchange search parameters for account credentials.
  let credentials;
  try {
    credentials = await provider.exchange(
      Object.fromEntries(new URL(req.url).searchParams.entries()),
      req,
      session.handshakeCallbackUrl,
      session,
    );
  } catch (e: any) {
    // Convert any HttpError thrown by the handler into a JSON response with the
    // error message. This is useful to simplify program logic.
    if (e instanceof HttpError) {
      console.warn("provider.exchange threw http error", e);
      return Response.json({ message: e.message }, { status: e.statusCode });
    }

    console.log("Failed to exchange credentials", e);

    const url = new URL(session.developerCallbackUri);
    url.searchParams.set("state", session.developerState);
    url.searchParams.set(
      "error",
      `Failed to exchange credentials${
        e.message ? " with error " + e.message : ""
      }.`,
    );

    redirect(url.href);
  }

  // Call onSuccess (eg. so the caller can register account with Fiber).
  let successParams;
  try {
    const accountId = session.accountId;
    let linkParams: { account_id?: string } = {};
    if (accountId) {
      linkParams.account_id = accountId;
    }

    console.log("linkParams", linkParams);

    successParams = await options.onSuccess(
      provider.id,
      credentials,
      linkParams,
    );

    console.log("onSuccess returned", successParams);
  } catch (err: any) {
    console.log("Failed to call onSuccess", err);
    // Sentry.captureException(err);
    const url = new URL(session.developerCallbackUri);
    url.searchParams.set("state", session.developerState);
    url.searchParams.set(
      "error",
      `Success handler failed${err.message ? ": " + err.message : ""}.`,
    );
    redirect(url.href);
    return;
  }

  const url = new URL(session.developerCallbackUri);
  url.searchParams.set("state", session.developerState);

  // Add the `successParams` we received from `onSuccess` to the URL.
  if (successParams) {
    for (const [key, value] of Object.entries(successParams)) {
      if (url.searchParams.has(key)) {
        throw new Error(`onSuccess handler returned a reserved param: ${key}`);
      }
      url.searchParams.set(key, value as any);
    }
  }

  console.log(`Redirecting user to ${url.href}`);
  redirect(url.href);
  return;
}

/**
 * Checks that the callback URI is valid and allowed by the project's settings.
 */
export function isValidDeveloperCallbackUri(
  value: string,
  options: HandshakeOptions,
  req: NextRequest,
): boolean {
  // If a callback cookie is set, use it. Make sure it agrees with one of the
  // registered URIs. If it doesn't, or if there's no cookie, just use the
  // first registered URI.
  const url = new URL(value);

  const allowedRedirectUris = options.redirectUris.map(
    (uri: any) => new URL(uri),
  );

  let isAllowed = false;
  for (const allowedUri of allowedRedirectUris) {
    if (
      url.hostname === allowedUri.hostname &&
      // No, this is not standard, xbut it's what we do.
      url.pathname.startsWith(allowedUri.pathname)
    ) {
      return true;
    }
  }

  return false;
}

export function getNextHost(req: NextRequest) {
  const host = (req.headers.get("x-forwarded-host") ??
    req.headers.get("host")) as string;
  console.log("host is", host);

  const protocol = `http${host.includes("localhost") ? "" : "s"}://`;
  return `${protocol}${host}`;
}
