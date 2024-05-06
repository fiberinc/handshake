import { Handler } from "./types";

export interface HandshakeOptions {
  /**
   * A list of hosts that we are allowed to redirect users back to.
   */
  allowedRedirectHosts: string[];

  /**
   * A list of OAuth handlers like:
   *
   * ```ts
   * handlers: [
   *  GitHub({
   *    clientId: process.env.GITHUB_CLIENT_ID!,
   *    clientSecret: process.env.GITHUB_CLIENT_SECRET!,
   *  }),
   *  Stripe({
   *    id: "a-custom-id-for-this-provider",
   *    clientId: process.env.STRIPE_CLIENT_ID!,
   *    clientSecret: process.env.STRIPE_CLIENT_SECRET!,
   *  }),
   * ]
   * ```
   */
  handlers: Handler[];

  /**
   * A function called after the handshake occurs successfully.
   *
   * @param credentials - A dictionary of values returned by the handler.
   * @param handlerId - Identifies the provider that handled this handshake,
   * eg. "stripe". Normally the provider name in snake_case, or whatever you set
   * in the "id" field when you create the provider.
   * @param linkParams - Query params we received from the client.
   *
   * @returns Returns a list of params to send back to the redirect URL.
   */
  onSuccess(
    credentials: unknown,
    handlerId: string,
    linkParams: { account_id?: string },
  ): Promise<{ forwardParams?: Record<string, string> } | undefined>;

  /**
   * The secret used to encrypt and decrypt the session cookie.
   */
  secret: string;

  /**
   * Name of the cookie were we'll store state before redirecting the user to
   * authenticate with the third-party service.
   */
  sessionCookieName?: string;
}

// WIP @feliap
//
// interface TenantOptions extends Options {
//   project?: {
//     id: string;
//     title: string;
//     logo?: string;
//     supportEmail?: string;
//   };
// }

type RequireKeys<T extends object, K extends keyof T> = Required<Pick<T, K>> &
  Omit<T, K>;

export interface ExtendedConfig
  extends RequireKeys<HandshakeOptions, "secret" | "sessionCookieName"> {
  getHandler(id: string): Handler | null;

  /**
   * Defaults to `callback_uri`.
   */
  developerCallbackUrlQueryParameter: string;

  /**
   * Expiration for the session cookie.
   */
  sessionCookieMaxSecs: number;
}

export function getFullHandshakeOptions(
  args: HandshakeOptions,
): ExtendedConfig {
  if (!args.secret) {
    throw Error("Specify a valid `secret` attribute.");
  }

  return {
    ...args,
    secret: args.secret,
    developerCallbackUrlQueryParameter: "callback_uri",
    sessionCookieName: args.sessionCookieName ?? "session",
    sessionCookieMaxSecs: 60 * 2,
    getHandler(id: string): Handler | null {
      return args.handlers.find((handler) => handler.id === id) ?? null;
    },
  };
}
