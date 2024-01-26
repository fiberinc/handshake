import cookie, { serialize } from "cookie";
import { BadRequest } from "http-errors";
import { NextApiRequest, NextApiResponse } from "next";

// ATTENTION I'm scared of using these static cookie names here because they may
// cause conflicts between different concurrent linking attempts. Example: a
// user starts the flow for tool A at https://link.fiber.dev/A/providerA, then
// starts https://link.fiber.dev/B/providerB, then ends the flow for tool A and
// gets redirected to the redirect_uri for tool B.

const CALLBACK_PARAM = "redirect_uri";
const CALLBACK_COOKIE = "final_redirect_uri";

const ACCOUNT_ID_PARAM = "account_id";
const ACCOUNT_ID_COOKIE = "account_id";

const STATE_PARAM = "state";
const STATE_COOKIE = "state";

/**
 * Saved the `CALLBACK_PARAM` query parameter into a cookie, so we can retrieve
 * it later within the callback handler.
 */
export function saveCallbackIntoCookie(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const value = req.query[CALLBACK_PARAM] as string | undefined;

  // If callback_uri is not passed, that's OK, we'll just use the project
  // default.
  if (!value) {
    console.warn(`No ${CALLBACK_PARAM} param passed. Won't save cookie.`);
    clearCookie(res, CALLBACK_COOKIE);
    return;
  }

  console.log(`Will save ${CALLBACK_PARAM} into cookie.`);

  // Sanity-check the URI is valid.
  if (!value.match(/^https:\/\/.+/)) {
    throw new BadRequest(`Invalid ${CALLBACK_PARAM}.`);
  }

  res.setHeader(
    "Set-Cookie",
    serialize(CALLBACK_COOKIE, value, {
      path: "/",
      maxAge: 60 * 2,
    }),
  );
}

/**
 * Saved the `STATE_PARAM` query parameter into a cookie, so we can retrieve it
 * later within the callback handler.
 */
export function saveStateIntoCookie(req: NextApiRequest, res: NextApiResponse) {
  const value = req.query[STATE_PARAM] as string | undefined;

  // If callback_uri is not passed, that's OK, we'll just use the project
  // default.
  if (!value) {
    console.warn(`No ${STATE_PARAM} param passed. Won't save cookie.`);
    clearCookie(res, STATE_COOKIE);
    return;
  }

  console.log(`Will save ${STATE_PARAM} into cookie.`);

  appendCookieHeader(
    res,
    serialize(STATE_COOKIE, value, {
      path: "/",
      maxAge: 60 * 2,
    }),
  );
}

/**
 * Saved the `ACCOUNT_ID_PARAM` query parameter into a cookie, so we can
 * retrieve it later within the callback handler.
 */
export function saveAccountIdIntoCookie(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const value = req.query[ACCOUNT_ID_PARAM] as string | undefined;

  // If callback_uri is not passed, that's OK, we'll just use the project
  // default.
  if (!value) {
    console.warn(`No ${ACCOUNT_ID_PARAM} param passed. Won't save cookie.`);
    clearCookie(res, ACCOUNT_ID_COOKIE);
    return;
  }

  console.log(`Will save ${ACCOUNT_ID_PARAM} into cookie.`);

  appendCookieHeader(
    res,
    serialize(ACCOUNT_ID_COOKIE, value, {
      path: "/",
      maxAge: 60 * 2,
    }),
  );
}

export function popCallbackUriCookie(
  req: NextApiRequest,
  res: NextApiResponse,
): URL | null {
  const cookieValue = req.cookies[CALLBACK_COOKIE];
  if (!cookieValue) {
    return null;
  }

  clearCookie(res, CALLBACK_COOKIE);

  try {
    return new URL(cookieValue);
  } catch (e) {
    console.warn("Invalid callback_uri saved", cookieValue);
    return null;
  }
}

export function popStateCookie(
  req: NextApiRequest,
  res: NextApiResponse,
): string | null {
  const parsed = cookie.parse(req.headers.cookie ?? "");
  const value = parsed?.[STATE_COOKIE] ?? null;
  if (!value) {
    return null;
  }
  clearCookie(res, STATE_COOKIE);
  return value;
}

export function popAccountIdCookie(
  req: NextApiRequest,
  res: NextApiResponse,
): string | null {
  const parsed = cookie.parse(req.headers.cookie ?? "");
  console.log("parsed", parsed);

  const value = parsed?.[ACCOUNT_ID_COOKIE] ?? null;
  if (!value) {
    return null;
  }
  clearCookie(res, ACCOUNT_ID_COOKIE);
  return value;
}

export function clearCookie(res: NextApiResponse, name: string) {
  appendCookieHeader(
    res,
    serialize(name, "_TO_DELETE_", {
      path: "/",
      expires: new Date(0),
    }),
  );
}

function appendCookieHeader(res: NextApiResponse, newCookie: string) {
  const oldValue = res.getHeader("Set-Cookie") as string | string[] | undefined;

  const newValue = Array.isArray(oldValue)
    ? [...oldValue, newCookie]
    : [oldValue, newCookie];

  res.setHeader("Set-Cookie", newValue as string | string[]);
}
