import chalk from "chalk";
import { HttpError } from "http-errors";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { Handler } from "~/core/Handler";
import { ExtendedConfig } from "~/core/HandshakeOptions";
import { debug, error, info } from "~/core/logger";
import { parseSessionFromStringValue } from "~/core/session";

export async function handleCallback(
  options: ExtendedConfig,
  tenantId: string,
  handler: Handler,
  req: NextRequest,
): Promise<Response> {
  if (req.method !== "GET") {
    return new Response(
      `Error: This action with HTTP ${req.method} is not supported.`,
      { status: 400 },
    );
  }

  info(chalk.green("Received user at callback"), req.nextUrl.searchParams);

  // Get session valued we saved in a cookie.
  const cookieStore = cookies();
  const savedCookie = cookieStore.get(options.sessionCookieName);
  if (!savedCookie) {
    return new Response(
      `Session cookie not found ("${options.sessionCookieName}"). Authentication might have taken too long or you arrived from a bad link.`,
      {
        status: 400,
      },
    );
  }

  const session = parseSessionFromStringValue(savedCookie.value);
  debug("Found session stored in cookie.", session);

  // TODO QUESTION should we clear the cookie here?

  // Check that the callback URI to send users back to is allowed. If the
  // exchange fails, we might want to send users back to this
  const isValid = isValidDeveloperCallbackUri(
    session.developerCallbackUri,
    options,
  );
  if (!isValid) {
    // FIXME this could be a React page.

    return new Response(
      `Callback URI ${session.developerCallbackUri} is not allowed by settings.`,
      {
        status: 400,
      },
    );
  }
  info(
    `Will redirect users back to ${session.developerCallbackUri} if successful`,
  );

  // Exchange search parameters for account credentials.
  let credentials;
  try {
    credentials = await handler.exchange(
      new URL(req.url).searchParams,
      req,
      session.handshakeCallbackUrl,
      session,
    );
  } catch (e: unknown) {
    if (!(e instanceof Error)) {
      throw new TypeError("Not an error");
    }

    error("Failed to exchange credentials", e);

    // Convert any HttpError thrown by the handler into a JSON response with the
    // error message. This is useful to simplify program logic.
    if (e instanceof HttpError) {
      error("provider.exchange threw http error", e);
      return Response.json({ message: e.message }, { status: e.statusCode });
    }

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
  let forwardParams;
  try {
    const accountId = session.accountId;
    const linkParams: { account_id?: string } = {};
    if (accountId) {
      linkParams.account_id = accountId;
    }

    const result = await options.onSuccess(credentials, handler.id, linkParams);
    forwardParams = result?.forwardParams;
  } catch (err: unknown) {
    if (!(err instanceof Error)) {
      throw new TypeError("Not an error");
    }

    error("Failed to call onSuccess", err);

    // Sentry.captureException(err);
    const url = new URL(session.developerCallbackUri);
    url.searchParams.set("state", session.developerState);
    url.searchParams.set("error", `${err.message ? ": " + err.message : ""}.`);
    redirect(url.href);
  }

  const url = new URL(session.developerCallbackUri);
  url.searchParams.set("state", session.developerState);

  // Add the `successParams` we received from `onSuccess` to the URL.
  if (forwardParams) {
    for (const [key, value] of Object.entries(forwardParams)) {
      if (url.searchParams.has(key)) {
        throw new Error(`onSuccess handler returned a reserved param: ${key}`);
      }
      url.searchParams.set(key, value);
    }
  }

  debug("Will clear session cookie.");
  cookies().set(options.sessionCookieName, "", { expires: new Date(0) });

  info(`Redirecting user to ${url.href}`);
  redirect(url.href);
}

/**
 * Checks that the callback URI is valid and allowed by the project's settings.
 */
export function isValidDeveloperCallbackUri(
  value: string,
  options: ExtendedConfig,
): boolean {
  // If a callback cookie is set, use it. Make sure it agrees with one of the
  // registered URIs. If it doesn't, or if there's no cookie, just use the
  // first registered URI.
  const url = new URL(value);

  const allowedRedirectUris = options.allowedRedirectUris.map(
    (uri) => new URL(uri),
  );

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
  const protocol = `http${host.includes("localhost") ? "" : "s"}://`;
  return `${protocol}${host}`;
}
