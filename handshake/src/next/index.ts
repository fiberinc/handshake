import { HttpError } from "http-errors";
import { NextRequest } from "next/server";
import { InternalOptions } from "../core/options";
import { handleCallback } from "./handle-callback";
import { handleRedirect } from "./handle-redirect";

// https://nextjs.org/docs/app/building-your-application/routing/route-handlers
export function NextHandshake(options: InternalOptions) {
  // for (const provider of options.providers) {
  //   console.log(
  //     chalk.blue(`/api/auth/${provider.id}/redirect`),
  //     `– ${chalk.yellow("redirect")} for provider type ${provider.type}`,
  //   );
  //   console.log(
  //     chalk.blue(`/api/auth/${provider.id}/callback`),
  //     `– ${chalk.yellow("callback")} for provider type ${provider.type}`,
  //   );
  // }

  const handler = async (req: NextRequest) => {
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
        return await handleRedirect(options, projectId, provider, req);
      } else if (action === "callback") {
        return await handleCallback(options, projectId, provider, req);
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
    GET: handler,
    POST: handler,
  };
}
