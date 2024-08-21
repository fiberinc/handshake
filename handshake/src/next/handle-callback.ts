import chalk from "chalk";
import { HttpError } from "http-errors";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { errors as OpenIdClientErrors } from "openid-client";
import { ExtendedConfig } from "~/core/HandshakeOptions";
import { OAuthCallbackError, UnknownProviderError } from "~/core/errors";
import { debug, error, info } from "~/core/logger";
import { parseSessionFromStringValue } from "~/core/session";
import { Handler } from "~/core/types";

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
      `Session cookie not found ("${options.sessionCookieName}"). You may have taken too long to authorize or you arrived from a bad link.`,
      {
        status: 400,
      },
    );
  }

  // TODO verify with session secret.
  const session = parseSessionFromStringValue(savedCookie.value);
  debug("Found session stored in cookie.", session);

  // Clear session cookie.
  cookies().set(options.sessionCookieName, "", { expires: new Date(0) });
  debug("Set to clear session cookie.");

  // Check that the callback URI to send users back to is allowed. If the
  // exchange fails, we might want to send users back to this
  const isValid = isValidDeveloperCallbackUri(
    session.developerCallbackUri,
    options,
  );
  if (!isValid) {
    // FIXME this could be a React page.

    return new Response(
      `Callback URI ${session.developerCallbackUri} is not whitelisted in the Handshake settings.`,
      {
        status: 400,
      },
    );
  }

  debug(`Redirection URL is ${session.developerCallbackUri}.`);

  // Exchange search parameters for account credentials.
  let tokens: unknown;
  try {
    const result = await handler.exchange(
      new URL(req.url).searchParams,
      req,
      session.handshakeCallbackUrl,
      session,
    );
    tokens = result.tokens;
  } catch (e: unknown) {
    if (!(e instanceof Error)) {
      throw new TypeError("Not an error");
    }

    const url = new URL(session.developerCallbackUri);
    url.searchParams.set("state", session.developerState);

    error("handler.exchange failed", e);

    if (e instanceof OAuthCallbackError) {
      // Forward known OAuth errors to the caller.
      url.searchParams.set("error", e.error);
      url.searchParams.set("error_description", e.errorDescription);
    }
    // Convert any HttpError thrown by the handler into a JSON response with the
    // error message. This is useful to simplify program logic.
    else if (e instanceof HttpError) {
      error("provider.exchange threw http error. this is not ok.", e);
      return Response.json({ message: e.message }, { status: e.statusCode });
    }
    // An OAuth handler bubbled up an openid-client error, which is not OK. This
    // is a sanity check.
    else if (
      e instanceof OpenIdClientErrors.OPError ||
      e instanceof OpenIdClientErrors.RPError
    ) {
      error("OpenIdClient bubbled up an error. This must be fixed.", e);
      url.searchParams.set("error", "unknown_provider_error");
    } else if (e instanceof UnknownProviderError) {
      url.searchParams.set("error", "unknown_provider_error");
      url.searchParams.set(
        "error_description",
        `Provider failed with unexpected error: ${e.message}. If you believe this is a mistake, please open an issue at https://github.com/fiberinc/handshake/issues.`,
      );
    } else {
      info("handler.exchange error is unexpected");

      console.trace();
      const { error, error_description } = e as any;

      url.searchParams.set("error", error ?? "unknown_error");
      if (error_description) {
        url.searchParams.set(
          "error_description",
          error_description ?? "unknown_error",
        );
      }
    }

    info(`Redirecting user to ${url.href}`);
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

    const result = await options.onSuccess(tokens, handler.id, linkParams);
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

  const allowedRedirectHosts = options.allowedRedirectHosts.map(
    (uri) => new URL(uri),
  );

  for (const allowedUri of allowedRedirectHosts) {
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
