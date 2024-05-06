import { JsonObject } from "type-fest";

// const REPO_URL = "https://github.com/fiberinc/handshake";

/**
 * Errors that inherit from this class are considered "known errors" and improve
 * issue handling and identification.
 *
 * READ https://github.com/TritonDataCenter/node-verror
 */
export abstract class KnownError<
  Extras extends JsonObject = never,
> extends Error {
  abstract override name: string;
  originalError?: Error;
  extras?: Extras;

  // https://github.com/TritonDataCenter/node-verror
  constructor(
    messageOrError: string | Error,
    message?: string | null,
    extras?: Extras,
  ) {
    super();

    if (messageOrError instanceof Error) {
      this.originalError = messageOrError;
      this.message = `${message || "Failed in function b"}; Original error: ${
        messageOrError.message
      }`;
    } else {
      this.message = messageOrError;
    }

    if (extras) {
      this.extras = JSON.parse(JSON.stringify(extras));
    }

    if (this.originalError) {
      this.stack = `${this.stack}\n---\nOriginal error stack:\n${this.originalError.stack}`;
    }

    Error.captureStackTrace(this, this.constructor);
  }
}

// https://datatracker.ietf.org/doc/html/rfc6749#section-5.2
export class OAuthCallbackError extends Error {
  name = "OAuthCallbackError";

  constructor(
    public error:
      | "invalid_client"
      | "invalid_grant"
      | "invalid_request"
      | "invalid_scope",
    public errorDescription: string,
    public extras?: any,
  ) {
    const message = `${error} (${errorDescription}).`;

    super(message);
  }
}

/**
 * Used when we can't parse what we received from the provider.
 */
export class UnknownProviderError extends Error {
  name = "UnknownProviderError";

  constructor(message: string) {
    super(message);
  }
}

// FIXME
export class InvalidCheck extends KnownError {
  name = "InvalidCheck";

  // constructor(message: string) {
  //   super(message);
  //   this.message += `${this.message ? ". " : ""}Read more at ${REPO_URL}`;
  // }
}

export class InvalidRequest extends KnownError {
  name = "OAuthCallbackError";

  // toString() {
  //   return "InvalidRequest bro";
  // }
}
