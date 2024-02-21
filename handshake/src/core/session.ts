import { BadRequest } from "http-errors";
import { z } from "zod";
import { ExtendedConfig } from "./HandshakeConfig";

// ATTENTION I'm scared of using these static cookie names here because they may
// cause conflicts between different concurrent linking attempts. Example: a
// user starts the flow for tool A at https://link.fiber.dev/A/providerA, then
// starts https://link.fiber.dev/B/providerB, then ends the flow for tool A and
// gets redirected to the redirect_uri for tool B.

const ACCOUNT_ID_PARAM = "account_id";

export const SessionValueStruct = z.object({
  // The URI to send users back to once the OAuth is completed.

  // QUESTION Should we make this optional?
  developerCallbackUri: z.string(),
  // A unique identifier we receive from the developer when they send users to
  // us. Once the OAuth flow completes, we send users back to the developer (at
  // a url specified by `callbackUri`) along with this state.
  developerState: z.string(),
  // Similar to state, but used for storing an "account ID" value. This is
  // technically a worse alternative to the developer using `state` and keeping
  // a local map of "state" => "account ID". We might change this in the future.
  accountId: z.string().optional(),
  // This is the URL we tell the provider to send users back to, once they
  // authorize the app. We save this because certain OAuth flows require this
  // URL on the other side, to exchange the code for the access tokens.
  handshakeCallbackUrl: z.string(),

  // Provider-specific data like { state: string, nonce: string, codeVerifier:
  // string } etc.
  valuesFromProvider: z.record(z.string()).optional(),
});

export type SessionValue = z.infer<typeof SessionValueStruct>;

// export class Session {
//   constructor(value: any) {
//     const result = SessionValueStruct.safeParse(value);
//     if (!result.success) {
//       throw new Error("Invalid session value: " + result.error);
//     }

//     this.value = result.data;
//   }

//   value: SessionValue;
// }

/**
 *
 */
export function getSessionValueToSave(
  options: ExtendedConfig,
  req: Request,
  handshakeCallbackUrl: string,
): SessionValue {
  const searchParams = new URL(req.url).searchParams;

  // 1.
  // Get callback URI (mandatory).
  const callbackUri = searchParams.get(
    options.developerCallbackUrlQueryParameter,
  );
  // If callback_uri is not passed, that's OK, we'll just use the project
  // default.
  if (!callbackUri) {
    console.warn(
      `No ${options.developerCallbackUrlQueryParameter} param passed. Won't save cookie.`,
    );
    throw new BadRequest(
      `Expected ${options.developerCallbackUrlQueryParameter} parameter.`,
    );
  }
  // Sanity-check the URI is valid.
  if (!callbackUri.match(/^https?:\/\/.+/)) {
    throw new BadRequest(
      `Value for ${options.developerCallbackUrlQueryParameter} isn't a valid URI: ${callbackUri}.`,
    );
  }

  // 2.
  // Get account id, if present.
  const accountId = searchParams.get(ACCOUNT_ID_PARAM) ?? undefined;

  // 3.
  // Get state parameter.
  const state = searchParams.get("state");
  if (!state) {
    throw new BadRequest(`Expected state parameter`);
  }

  return {
    developerCallbackUri: callbackUri,
    accountId,
    developerState: state,
    handshakeCallbackUrl,
  };
}

export function parseSessionFromStringValue(value: string): SessionValue {
  let parsed: any;
  try {
    parsed = JSON.parse(value);
  } catch (e) {
    console.warn("Session string value:", value);
    throw new BadRequest("Session string does not contain valid JSON.");
  }

  const result = SessionValueStruct.safeParse(parsed);
  if (!result.success) {
    console.warn("Session string value:", value);
    throw new BadRequest("Session string has unexpected format.");
  }

  return result.data;
}
