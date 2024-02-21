import { BadRequest, HttpError } from "http-errors";
import { NextRequest } from "next/server";
import { HandshakeConfig, getFullHandshakeOptions } from "..";
import { handleCallback } from "./handle-callback";
import { handleRedirect } from "./handle-redirect";

function getInfoFromUrl(url: string) {
  // FIXME refactor
  const pathname = new URL(url).pathname;
  let action: "redirect" | "callback";
  if (pathname.match("^/([^/]+)/([^/]+)/redirect")) {
    action = "redirect";
  } else if (pathname.match("^/([^/]+)/([^/]+)/callback")) {
    action = "callback";
  } else {
    console.log("pathname", pathname);
    throw new BadRequest("Unexpected URL action.");
  }

  // FIXME refactor
  const matches = pathname.match("^/auth/([^/]+)/([^/]+)/")!;
  const tenantId = matches[1];

  const handlerId = matches[2];
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
export function NextHandshake(userOptions: HandshakeConfig) {
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
    GET: handleCaughtHttpErrors(nextHandler),
    POST: handleCaughtHttpErrors(nextHandler),

    // Expose the final options to the user.
    // options,
  };
}

function validateHandlers(userOptions: HandshakeConfig) {
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

function handleCaughtHttpErrors(
  handler: (req: NextRequest) => Promise<Response>,
) {
  return async (req: NextRequest) => {
    let response: Response;
    try {
      response = await handler(req);
    } catch (e) {
      if (e instanceof HttpError) {
        if (req.headers.get("accept")?.includes("application/json")) {
          return Response.json({ error: e.message }, { status: e.statusCode });
        } else {
          const message = e.message.replace(/^Error: /g, "");
          return new Response(`Error: ${message}`, {
            status: e.statusCode,
          });
        }
      }
      throw e;
    }

    // if (!response) {
    //   // Might we want to handle something like this?
    // }

    return response;
  };
}
