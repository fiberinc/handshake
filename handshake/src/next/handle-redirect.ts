import { BadRequest, HttpError, InternalServerError } from "http-errors";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { ExtendedConfig } from "~/core/HandshakeOptions";
import { debug, error, info } from "~/core/logger";
import { SessionValue, getSessionValueToSave } from "~/core/session";
import { Handler } from "~/core/types";
import { getNextHost, isValidDeveloperCallbackUri } from "./handle-callback";

export async function handleRedirect(
  options: ExtendedConfig,
  tenantId: string,
  handler: Handler,
  req: NextRequest,
): Promise<Response> {
  if (req.method !== "GET") {
    return new Response(`Expected method GET, not ${req.method}.`, {
      status: 400,
    });
  }

  const extras = getExtras(req);

  // The URI inside this handshake deployment that the provider should send
  // users back to.
  const handshakeCallbackUrl =
    getNextHost(req) + `/${tenantId}/${handler.id}/callback`;

  let cookiesToSave: Record<string, string> | null = null;
  let url: string;
  try {
    const result = await handler.getAuthorizationUrl(
      handshakeCallbackUrl,
      extras,
    );
    url = result.url;

    if (result.persist && Object.keys(result.persist).length > 0) {
      cookiesToSave = result.persist;
    }
  } catch (e: unknown) {
    if (!(e instanceof Error)) {
      throw new TypeError("Not an error");
    }
    // Convert any HttpError thrown by the handler into a JSON response with the
    // error message. This is useful to simplify program logic.
    if (e instanceof HttpError) {
      return Response.json(
        { message: e.message },
        {
          status: e.statusCode,
        },
      );
    }

    error("handler.getAuthorizationUrl failed", e);
    // Sentry.captureException(e);
    throw new BadRequest("Error: " + e.message);
  }

  try {
    new URL(url);
  } catch (e) {
    throw new InternalServerError(
      `Provider ${handler.id} returned invalid authorization URL: '${url}'`,
    );
  }

  if (!url) {
    throw new BadRequest(
      `Provider ${handler.id} error: no authorization URL returned.`,
    );
  }

  // Check that the callback URI to send users back to is allowed. If the
  // exchange fails, we might want to send users back to this
  const isValid = isValidDeveloperCallbackUri(handshakeCallbackUrl, options);
  if (!isValid) {
    // FIXME this could be a React page.

    return new Response(
      `Callback URI ${handshakeCallbackUrl} is not whitelisted in the Handshake settings.`,
      {
        status: 400,
      },
    );
  }

  const partialSession = getSessionValueToSave(
    options,
    req,
    handshakeCallbackUrl,
  );

  const session: SessionValue = {
    ...partialSession,
    // If the provider, while generating authorization URL, asks us to save some
    // values, we do it here by overriding `valuesFromHandler`.
    valuesFromHandler: cookiesToSave ?? {},
  };

  debug("Will save session into cookie", session);

  const cookieStore = cookies();
  cookieStore.set(options.sessionCookieName, JSON.stringify(session), {
    path: "/",
    maxAge: options.sessionCookieMaxSecs,
  });

  info(`Sending user to ${url}`);

  redirect(url.toString());
}

function getExtras(req: NextRequest): Record<string, string> {
  const searchParams = new URL(req.url).searchParams;

  const extras: Record<string, string> = {};
  for (const [key, value] of searchParams.entries()) {
    if (key.startsWith("extras.")) {
      extras[key.replace("extras.", "")] = value;
    }
  }
  return extras;
}
