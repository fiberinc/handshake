import { HttpError } from "http-errors";
import { NextRequest, NextResponse } from "next/server";
import { HandshakeOptions } from "../LinkOptions";
import { handleCallback } from "./handle-callback";
import { handleRedirect } from "./handle-redirect";

// https://nextjs.org/docs/app/building-your-application/routing/route-handlers
export function NextLink(options: HandshakeOptions) {
  const handler = async (req: NextRequest, res: NextResponse) => {
    console.log("bro what!");

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
    console.log("action is", action);

    // FIXME refactor
    const matches = pathname.match("^/api/([^/]+)/([^/]+)/")!;
    const projectId = matches[1];
    const providerId = matches[2];
    if (!providerId) {
      return Response.json({ error: "provider id not found" }, { status: 400 });
    }
    const provider = options.getProvider(providerId);
    if (!provider) {
      return Response.json({ error: "provider id not found" }, { status: 400 });
    }

    try {
      if (action === "redirect") {
        return await handleRedirect(options, projectId, provider, req, res);
      } else if (action === "callback") {
        return await handleCallback(options, projectId, provider, req, res);
      }
    } catch (e) {
      if (e instanceof HttpError) {
        if (req.headers.get("accept")?.includes("application/json")) {
          return Response.json({ error: e.message }, { status: e.statusCode });
        } else {
          return new Response(`Error: ${e.message}`, { status: e.statusCode });
        }
      }
      throw e;
    }
  };

  return {
    GET: handler,
    POST: handler,
  };
}
