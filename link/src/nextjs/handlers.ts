import chalk from "chalk";
import { BadRequest, HttpError } from "http-errors";
import { NextApiRequest, NextApiResponse } from "next";
import { LinkOptions } from "../LinkOptions";
import { Provider } from "../providers/lib/Provider";
import {
  popAccountIdCookie,
  popCallbackUriCookie,
  popStateCookie,
  saveAccountIdIntoCookie,
  saveCallbackIntoCookie,
  saveStateIntoCookie,
} from "./cookies";

export async function handleRedirect(
  options: LinkOptions,
  projectId: string,
  provider: Provider,
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") {
    return res
      .status(400)
      .json(`Error: This action with HTTP ${req.method} is not supported.`);
  }

  console.log("handleRedirect", req.url, req.query, req.query.extras);

  // const callbackHandlerUrl = req.url!.replace(/get-redirect$/, 'callback');

  let extras = undefined;
  if (req.query.extras) {
    try {
      extras = JSON.parse(req.query.extras as string);
    } catch (e) {
      console.log(req.query.extras.toString());
      throw BadRequest("extras is poorly formatted");
    }
  }

  console.log("handleRedirect");

  if (!req.url) {
    throw Error("wtf !req.url");
  }

  const matches = req.url!.match("^/api/([^/]+)/([^/]+)/redirect$");

  if (!matches) {
    throw Error("is not actually redirect wtf!");
  }

  console.log("matches", matches);

  const callbackHandlerUrl =
    getNextHost(req) + `/api/${projectId}/${provider.id}/callback`;

  console.log("callbackHandlerUrl", callbackHandlerUrl);

  let authUrl;
  try {
    authUrl = await provider.getAuthorizationUrl(callbackHandlerUrl, extras);
  } catch (e: any) {
    // Convert any HttpError thrown by the handler into a JSON response with the
    // error message. This is useful to simplify program logic.
    if (e instanceof HttpError) {
      res.status(e.statusCode).json({ message: e.message });
      return;
    }

    // Unexpected errors.
    console.warn("provider.getAuthorizationUrl error", e);
    // Sentry.captureException(e);
    throw new BadRequest("Error: " + e.message);
  }

  if (!authUrl) {
    throw new BadRequest("Provider error: no authorization URL returned.");
  }

  saveCallbackIntoCookie(req, res);
  saveAccountIdIntoCookie(req, res);
  saveStateIntoCookie(req, res);

  // getAuthorizationUrl();

  res.redirect(authUrl.toString());

  return res.send({ a: authUrl });
}

export async function handleCallback(
  options: LinkOptions,
  projectId: string,
  provider: Provider,
  req: NextApiRequest,
  res: NextApiResponse,
) {
  console.log(chalk.blueBright("callback page"));

  if (req.method !== "GET") {
    return res
      .status(400)
      .json(`Error: This action with HTTP ${req.method} is not supported.`);
  }

  if (provider.parseQueryParams) {
    try {
      provider.parseQueryParams(req);
    } catch (e) {
      // TODO improve
      res.status(400).json({ error: `Wrong parameters: ${e}` });
      return;
    }
  }

  // Decide which URI to redirect users back to if the token exchange is
  // successful.
  const redirectUri = getFullCallbackUri(options, req, res);
  console.log(`Will redirect users back to ${redirectUri.href}`);

  const usedCallbackUrls = getNextHost(req) + req.url!.replace(/\?.*/, "");

  // Exchange search parameters for account credentials.
  let credentials;
  try {
    credentials = await provider.exchange(req, usedCallbackUrls);
  } catch (e: any) {
    // Convert any HttpError thrown by the handler into a JSON response with the
    // error message. This is useful to simplify program logic.
    if (e instanceof HttpError) {
      res.status(e.statusCode).json({ message: e.message });
      return;
    }

    console.log("Failed to exchange credentials", e);
    // Sentry.captureException(err);
    redirectUri.searchParams.set(
      "error",
      `Failed to exchange credentials${
        e.message ? " with error " + e.message : ""
      }.`,
    );
    res.redirect(redirectUri.href);
    return;
  }

  // Call onSuccess (eg. so the caller can register account with Fiber).
  const accountId = popAccountIdCookie(req, res);

  let successParams;
  try {
    let linkParams: { account_id?: string } = {};
    if (accountId) {
      linkParams.account_id = accountId;
    }

    console.log("linkParams", linkParams);

    successParams = await options.onSuccess(
      provider.id,
      credentials,
      linkParams,
    );

    console.log("onSuccess returned", successParams);
  } catch (err: any) {
    console.log("Failed to call onSuccess", err);
    // Sentry.captureException(err);
    redirectUri.searchParams.set(
      "error",
      `Success handler failed${err.message ? ": " + err.message : ""}.`,
    );
    res.redirect(redirectUri.href);
    return;
  }

  // Add the `successParams` we received from `onSuccess` to the URL.
  if (successParams) {
    for (const [key, value] of Object.entries(successParams)) {
      if (redirectUri.searchParams.has(key)) {
        throw new Error(`onSuccess handler returned a reserved param: ${key}`);
      }
      redirectUri.searchParams.set(key, value as any);
    }
  }

  console.log(`Redirecting user to ${redirectUri.href}`);
  res.redirect(redirectUri.href);
  return;
}

export function getFullCallbackUri(
  options: LinkOptions,
  req: NextApiRequest,
  res: NextApiResponse,
): URL {
  // If a callback cookie is set, use it. Make sure it agrees with one of the
  // registered URIs. If it doesn't, or if there's no cookie, just use the
  // first registered URI.
  const cookieCallbackUri = popCallbackUriCookie(req, res);
  let redirectUri: URL;
  if (cookieCallbackUri) {
    const allowedRedirectUris = options.redirectUris.map(
      (uri: any) => new URL(uri),
    );

    let isAllowed = false;
    for (const allowedUri of allowedRedirectUris) {
      if (
        cookieCallbackUri.hostname === allowedUri.hostname &&
        // No, this is not standard, xbut it's what we do.
        cookieCallbackUri.pathname.startsWith(allowedUri.pathname)
      ) {
        isAllowed = true;
        break;
      }
    }

    if (!isAllowed) {
      throw Error(`Callback URI ${cookieCallbackUri.href} is not allowed.`);
    }
    redirectUri = cookieCallbackUri;
  } else {
    redirectUri = new URL("/done", getNextHost(req));
  }

  const state = popStateCookie(req, res);
  if (state) {
    redirectUri.searchParams.set("state", state);
  }

  return redirectUri;
}

export function getNextHost(req: NextApiRequest) {
  const host = (req.headers["x-forwarded-host"] ?? req.headers.host) as string;
  console.log("host is", host);

  const protocol = `http${host.includes("localhost") ? "" : "s"}://`;
  return `${protocol}${host}`;
}
