import chalk from "chalk";
import { BadRequest, HttpError, InternalServerError } from "http-errors";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { InternalOptions } from "../LinkOptions";
import { getSessionValueToSave } from "../cookies";
import { Provider } from "../providers/lib/Provider";
import { getNextHost } from "./handle-callback";

export async function handleRedirect(
  options: InternalOptions,
  projectId: string,
  provider: Provider,
  req: NextRequest,
  _: NextResponse,
) {
  if (req.method !== "GET") {
    return new Response(`Expected method GET, not ${req.method}.`, {
      status: 400,
    });
  }

  const extras = getExtras(req);

  // The URI inside this handshake deployment that the provider should send
  // users back to.
  const handshakeCallbackUrl =
    getNextHost(req) + `/api/${projectId}/${provider.id}/callback`;

  console.log("callbackHandlerUrl", handshakeCallbackUrl);

  let cookiesToSave: Record<string, string> | null = null;
  let url: string;
  try {
    const result = await provider.getAuthorizationUrl(
      handshakeCallbackUrl,
      extras,
    );
    url = result.url;

    if (result.persist && Object.keys(result.persist).length > 0) {
      cookiesToSave = result.persist;
    }
  } catch (e: any) {
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

    // Unexpected errors.
    console.warn("provider.getAuthorizationUrl error", e);
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
  console.log("Will save into cookie", cookieValue);

  // If the provider, while generating authorization URL, asks us to save some values, we do it here.
  if (cookiesToSave) {
    console.log("Will save to cookies =>", cookiesToSave);
    cookieValue.valuesFromProvider = cookiesToSave;
  }

  const cookieStore = cookies();
  cookieStore.set(options.sessionCookie, JSON.stringify(cookieValue), {
    path: "/",
    maxAge: 60 * 2,
  });

  console.log(chalk.green(`Sending user to ${url}`));

  redirect(url.toString());
}

function getExtras(req: NextRequest): Record<string, string> {
  const searchParams = new URL(req.url).searchParams;

  const extras: any = {};
  for (const [key, value] of searchParams.entries()) {
    if (key.startsWith("extras.")) {
      extras[key.replace("extras.", "")] = value;
    }
  }
  return extras;
}
