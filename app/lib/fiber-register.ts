import * as Sentry from "@sentry/nextjs";
import { z } from "zod";

const API_HOST =
  process.env.NODE_ENV === "production"
    ? "https://api.fiber.dev"
    : "http://0.0.0.0:3001";

const SLACK_INTERNAL_SIGNUP_CHANNEL_ID = "replace";

/**
 *
 * @param project
 * @param provider
 * @param credential
 * @param accountId
 * @param stateString The value of the original `?state=` query parameter used
 * by our clients when sending users our way.
 * @returns
 */
export async function registerFiberAccount(
  fiberClientId: string,
  fiberClientSecret: string,
  accountId: string | null,
  sourceName: string,
  credential: any,
): Promise<{ externalId: string }> {
  const identifierStringForDebugging = `info=${JSON.stringify(credential)}`;

  let externalId: string;
  try {
    ({ externalId } = await postSourceAccount(
      fiberClientId,
      fiberClientSecret,
      sourceName,
      accountId,
      credential,
    ));
  } catch (err) {
    // Log the error to the function logs and Sentry.
    console.log("registerAccount failed with error", err);

    Sentry.captureMessage(
      `Failed to register account with Fiber ${identifierStringForDebugging}`,
    );
    Sentry.captureException(err);

    // await postToSlack(
    // 	`Failed to register account for ${identifierStringForDebugging}`,
    // 	SLACK_INTERNAL_SIGNUP_CHANNEL_ID
    // );

    throw err;
  }

  // await postToSlack(
  // 	`Client logged in with ${identifierStringForDebugging}`,
  // 	SLACK_INTERNAL_SIGNUP_CHANNEL_ID
  // );

  return { externalId };
}

export async function postSourceAccount(
  fiberClientId: string,
  fiberClientSecret: string,
  sourceName: string,
  externalId: string | null,
  credentials: any,
): Promise<{ externalId: string }> {
  const url = `${API_HOST}/sources/${sourceName}/accounts`;

  let res;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(
          `${fiberClientId}:${fiberClientSecret}`,
        ).toString("base64")}`,
        Accept: "application/json",
      },
      body: JSON.stringify({
        credentials,
        externalId: externalId ?? undefined,
      }),
    });
  } catch (e: any) {
    throw Error(`Failed to call API url=${url} ${e}`);
  }

  if (!res.ok) {
    let text = await res.text();
    throw Error("Register failed: " + text);
  }

  const json = await res.json();
  console.log("Register returned", json);

  let parsed;
  try {
    parsed = z
      .object({ account: z.object({ external_id: z.string() }) })
      .parse(json);
  } catch (e) {
    throw Error("Fiber API unexpected body: " + e);
  }

  return { externalId: parsed.account.external_id };
}
