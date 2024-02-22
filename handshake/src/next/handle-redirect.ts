import { BadRequest, HttpError, InternalServerError } from "http-errors";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { Handler } from "~/core/Handler";
import { ExtendedConfig } from "~/core/HandshakeOptions";
import { debug, error, info } from "~/core/logger";
import { getSessionValueToSave } from "~/core/session";
import { getNextHost } from "./handle-callback";

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
    getNextHost(req) + `/api/${tenantId}/${handler.id}/callback`;

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
    throw new InternalServerError(`Provider returned an invalid URL: '${url}'`);
  }

  if (!url) {
    throw new BadRequest("Provider error: no authorization URL returned.");
  }

  const cookieValue = getSessionValueToSave(options, req, handshakeCallbackUrl);

  // If the provider, while generating authorization URL, asks us to save some values, we do it here.
  if (cookiesToSave) {
    cookieValue.valuesFromProvider = cookiesToSave;
  }

  debug("Will save session into cookie", cookieValue);

  const cookieStore = cookies();
  cookieStore.set(options.sessionCookieName, JSON.stringify(cookieValue), {
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
