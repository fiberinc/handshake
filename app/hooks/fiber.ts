import { z } from "zod";

const FIBER_SOURCES = {
  "amazon-seller": "amazon",
};

// let fiberCredential;
// let customExternalId = null;
// if (providerId === ShopifyProviderId) {
// } else if (providerId === GoogleProviderId) {
//   fiberCredential = { ...(credential as any) };
// } else if (providerId === AmazonSellerProviderId) {
//   if (!account_id) {
//     throw Error(`AmazonSeller needs 'account_id' query param`);
//   }
//   // Use the `account_id` parameter that we received from the client
//   // application to set the account's "external id" in Fiber.
//   customExternalId = account_id;
//   // Send an AmazonSp credential the way Fiber expects it.
//   fiberCredential = {
//     refreshToken: (credential as any).refreshToken,
//     sellerId: account_id,
//   };
// } else {
//   throw Error(`unexpected provider ${providerId}`);
// }

// console.log("fiberCredential", fiberCredential);

// // Map the provider ID to the name of the source on Fiber that we want to
// // register this account into.
// const FIBER_SOURCES = {
// 	[AmazonSellerProviderId]: 'amazon',
// };

// let externalId: string;
// try {
// 	({ externalId } = await registerFiberAccount(
// 		'',
// 		'',
// 		customExternalId,
// 		(FIBER_SOURCES as any)[providerId],
// 		fiberCredential
// 	));
// } catch (e: any) {
// 	Sentry.captureException(e);
// 	throw Error(`Failed to register Fiber account: ${e.message}`);
// }

const API_HOST = "https://api.fiber.dev";

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
    console.log("registerAccount failed with error", err);

    // import * as Sentry from "@sentry/nextjs";
    // Sentry.captureMessage(
    //   `Failed to register account with Fiber ${identifierStringForDebugging}`,
    // );
    // Sentry.captureException(err);

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
