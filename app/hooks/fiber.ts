import { z } from "zod";

/**
 * Maps a handler ID to the name of the source on fiber.dev, that we want to
 * register accounts to.
 */
const FIBER_SOURCES: Record<string, string> = {
  "amazon-seller": "amazon",
};

interface Args {
  /**
   * The client ID for a Fiber environment.
   */
  clientId: string;
  /**
   * The client secret for a Fiber environment.
   */
  clientSecret: string;
}

/**
 * A hook that uses the newly obtained account credentials to register a new
 * account inside a Fiber.dev source.
 *
 * Use it inside your `onSuccess` function like:
 * ```ts
 * async onSuccess(credentials: unknown, handlerId) {
 *   await FiberHook({
 *     clientId: process.env.FIBER_CLIENT_ID!,
 *     clientSecret: process.env.FIBER_CLIENT_SECRET!,
 *   })(credentials, handlerId, {});
 *
 *   // ... you can do other things here.
 * }
 * ```
 */
export function FiberHook({ clientId, clientSecret }: Args) {
  return async (credentials: unknown, handlerId: string, extras: any) => {
    const sourceName = FIBER_SOURCES[handlerId];
    if (!sourceName) {
      console.warn(
        `WARNING: Handler with id ${handlerId} not in "FIBER_SOURCES". Will skip.`,
      );
      return;
    }

    let fiberExternalId = "";

    if (handlerId === "amazon-seller") {
      const parsed = z
        .object({
          refreshToken: z.string(),
        })
        .parse(credentials);
      if (!extras.accountId) {
        throw Error(`AmazonSeller needs 'accountId' query param`);
      }

      // Use the `accountId` parameter that we received from the client
      // application to set the account's "external id" in Fiber.
      fiberExternalId = extras.accountId;
      // Send an AmazonSp credential the way Fiber expects it.
      credentials = {
        refreshToken: parsed.refreshToken,
        sellerId: extras.accountId,
      };
    }

    console.log("fiberCredential", credentials);

    let externalId: string;
    try {
      const result = await postSourceAccount(
        clientId,
        clientSecret,
        fiberExternalId,
        sourceName,
        credentials,
      );

      console.log("postSourceAccount", result);
      externalId = result.externalId;
    } catch (e: unknown) {
      if (!(e instanceof Error)) {
        throw new TypeError("Not an Error");
      }
      // Sentry.captureException(e);

      // import * as Sentry from "@sentry/nextjs";
      // Sentry.captureMessage(
      //   `Failed to register account with Fiber ${identifierStringForDebugging}`,
      // );
      // Sentry.captureException(err);

      // await postToSlack(
      // 	`Failed to register account for ${identifierStringForDebugging}`,
      // 	SLACK_INTERNAL_SIGNUP_CHANNEL_ID
      // );

      throw Error(`Failed to register Fiber account: ${e.toString()}`);
    }

    // await postToSlack(
    // 	`Client logged in with ${identifierStringForDebugging}`,
    // 	SLACK_INTERNAL_SIGNUP_CHANNEL_ID
    // );

    return { externalId };
  };
}

export async function postSourceAccount(
  fiberClientId: string,
  fiberClientSecret: string,
  sourceName: string,
  externalId: string | null,
  credentials: unknown,
): Promise<{ externalId: string }> {
  const host = process.env.FIBER_API_HOST ?? "https://api.fiber.dev";
  const url = `${host}/sources/${sourceName}/accounts`;

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
  } catch (e) {
    throw Error(`Failed to call API url=${url} ${e}`);
  }

  if (!res.ok) {
    const text = await res.text();
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
