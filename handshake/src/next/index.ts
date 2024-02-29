import assert from "assert";
import { BadRequest, HttpError } from "http-errors";
import { isRedirectError } from "next/dist/client/components/redirect";
import { NextRequest } from "next/server";
import { debug, error } from "~/core/logger";
import { HandshakeOptions, getFullHandshakeOptions } from "..";
import { handleCallback } from "./handle-callback";
import { handleRedirect } from "./handle-redirect";

function getInfoFromUrl(url: string) {
  const pathname = new URL(url).pathname;
  const matches = pathname.match(
    "^/(api/)?([^/]+)/([^/]+)/(redirect|callback)",
  );

  if (!matches) {
    debug("pathname", pathname);
    throw new BadRequest("Unexpected URL format.");
  }

  assert(matches.length === 5, "len" + matches.length);

  const tenantId = matches[2];
  const handlerId = matches[3];
  const action = matches[4];
  assert(action === "redirect" || action === "callback");

  if (!handlerId) {
    throw new BadRequest("handler with id not found");
  }

  return {
    action,
    tenantId,
    handlerId,
  };
}

// https://nextjs.org/docs/app/building-your-application/routing/route-handlers
export function NextHandshake(userOptions: HandshakeOptions) {
  validateHandlers(userOptions);

  const options = getFullHandshakeOptions(userOptions);

  const nextHandler = async (req: NextRequest): Promise<Response> => {
    // This may throw.
    const { action, tenantId, handlerId } = getInfoFromUrl(req.url);

    const handler = options.getHandler(handlerId);
    if (!handler) {
      return Response.json(
        { error: "handler with id not found" },
        { status: 400 },
      );
    }

    if (action === "redirect") {
      return await handleRedirect(options, tenantId, handler, req);
    } else if (action === "callback") {
      return await handleCallback(options, tenantId, handler, req);
    } else {
      // TODO log?
      throw BadRequest("Unexpected action");
    }
  };

  return {
    GET: handleErrors(nextHandler),
    POST: handleErrors(nextHandler),

    // Expose the final options to the user.
    // options,
  };
}

function validateHandlers(userOptions: HandshakeOptions) {
  // Check for conflict in handler IDs.
  const idSet = new Set();
  userOptions.handlers.forEach((handler) => {
    if (idSet.has(handler.id)) {
      throw Error("Multiple handlers with id " + handler.id);
    }
    idSet.add(handler.id);
  });

  // TODO there's more we can test here.
}

function handleErrors(handler: (req: NextRequest) => Promise<Response>) {
  return async (req: NextRequest) => {
    let response: Response;
    try {
      response = await handler(req);
    } catch (e: any) {
      // Next's `redirect` throws an error which we must bubble up.
      if (isRedirectError(e)) {
        throw e;
      }

      if (e instanceof HttpError) {
        const message = `Error: ${e.message.replace(/^Error: /g, "")}`;
        const status = e.statusCode;

        if (req.headers.get("accept")?.includes("application/json")) {
          return Response.json({ error: message }, { status });
        } else {
          return new Response(message, { status });
        }
      }

      if (process.env.NODE_ENV === "development") {
        return Response.json(
          { inDevError: true, e: e.toString() },
          { status: 500 },
        );
      }

      // Return an identifier to help the developer track it down in production.
      const errorId = Math.floor(Math.random() * 10000000);
      error(`Unexpected error: ${errorId}`, e);
      return Response.json(
        { error: `An unexpected error occured (id=${errorId})` },
        { status: 500 },
      );
    }

    // if (!response) {
    //   // Might we want to handle something like this?
    // }

    return response;
  };
}
