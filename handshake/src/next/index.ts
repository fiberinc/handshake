import { HttpError } from "http-errors";
import { NextRequest } from "next/server";
import { HandshakeOptions, getFullHandshakeOptions } from "..";
import { handleCallback } from "./handle-callback";
import { handleRedirect } from "./handle-redirect";

// https://nextjs.org/docs/app/building-your-application/routing/route-handlers
export function NextHandshake(userOptions: HandshakeOptions) {
  validateHandlers(userOptions);

  const options = getFullHandshakeOptions(userOptions);

  const nextHandler = async (req: NextRequest) => {
    // FIXME refactor
    const pathname = new URL(req.url).pathname;
    let action: "redirect" | "callback";
    if (pathname.match("^/api/([^/]+)/([^/]+)/redirect")) {
      action = "redirect";
    } else if (pathname.match("^/api/([^/]+)/([^/]+)/callback")) {
      action = "callback";
    } else {
      console.log("pathname", pathname);
      return Response.json(
        { error: "Unexpected URL action." },
        { status: 400 },
      );
    }

    // FIXME refactor
    const matches = pathname.match("^/api/([^/]+)/([^/]+)/")!;
    const projectId = matches[1];

    const handlerId = matches[2];
    if (!handlerId) {
      return Response.json(
        { error: "handler with id not found" },
        { status: 400 },
      );
    }
    const handler = options.getHandler(handlerId);
    if (!handler) {
      return Response.json(
        { error: "handler with id not found" },
        { status: 400 },
      );
    }

    try {
      if (action === "redirect") {
        return await handleRedirect(options, projectId, handler, req);
      } else if (action === "callback") {
        return await handleCallback(options, projectId, handler, req);
      }
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
  };

  return {
    GET: nextHandler,
    POST: nextHandler,

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
