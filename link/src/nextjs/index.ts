import { NextApiRequest, NextApiResponse } from "next";
import { LinkOptions } from "../LinkOptions";
import { handleCallback, handleRedirect } from "./handlers";

export function NextLink(options: LinkOptions) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    // FIXME
    let action: "redirect" | "callback";
    if (req.url!.match("^/api/([^/]+)/([^/]+)/redirect")) {
      action = "redirect";
    } else if (req.url!.match("^/api/([^/]+)/([^/]+)/callback")) {
      action = "callback";
    } else {
      res.status(400).send({
        error: "Unexpected URL action.",
      });
      return;
    }

    // FIXME
    const matches = req.url!.match("^/api/([^/]+)/([^/]+)/")!;
    const projectId = matches[1];
    const providerId = matches[2];

    if (!providerId) {
      return res.status(400).json({ error: "provider id not found" });
    }

    const provider = options.getProvider(providerId);
    if (!provider) {
      return res.json({
        error: "provider not found",
      });
    }

    if (action === "redirect") {
      return await handleRedirect(options, projectId, provider, req, res);
    } else if (action === "callback") {
      return await handleCallback(options, projectId, provider, req, res);
    }
  };
}
