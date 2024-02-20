import { Provider } from "./Provider";

interface Options<Credential> {
  /**
   * A list of hosts that we are allowed to redirect users back to.
   */
  redirectUris: string[];

  /**
   * A list of casted Provider objects like
   *
   * ```ts
   * providers: [
   *  GitHubProvider({
   *    clientId: process.env.GITHUB_CLIENT_ID!,
   *    clientSecret: process.env.GITHUB_CLIENT_SECRET!,
   *  }),
   *  StripeProvider({
   *    id: "a-custom-id-for-this-provider",
   *    clientId: process.env.STRIPE_CLIENT_ID!,
   *    clientSecret: process.env.STRIPE_CLIENT_SECRET!,
   *  }),
   *  // etc
   * ]
   * ```
   */
  providers: Provider[];

  /**
   * A function called after the handshake occurs successfully.
   *
   * @param providerId - Identifies the provider that handled this handshake,
   * eg. "stripe". Normally the provider name in snake_case, or whatever you set
   * in the "id" field when you create the provider.
   * @param credential -
   * @param linkParams - Query params we received from the client.
   *
   * @returns Returns a list of params to send back to the redirect URL.
   */
  onSuccess(
    providerId: string,
    credential: Credential,
    linkParams: { account_id?: string },
  ): Promise<Record<string, string>> | undefined;

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

export interface InternalOptions<Credential = unknown>
  extends RequireKeys<Options<Credential>, "secret" | "sessionCookieName"> {
  getProvider(id: string): Provider | null;

  /**
   * Defaults to `callback_uri`.
   */
  developerCallbackUrlQueryParameter: string;

  /**
   * Expiration for the session cookie.
   */
  sessionCookieMaxSecs: number;
}

export function Handshake<Credential>(
  args: Options<Credential>,
): InternalOptions<Credential> {
  if (!args.secret) {
    throw Error("Specify a environment variable was not provided.");
  }

  return {
    ...args,
    secret: args.secret,
    developerCallbackUrlQueryParameter: "callback_uri",
    sessionCookieName: args.sessionCookieName ?? "session",
    sessionCookieMaxSecs: 60 * 2,
    getProvider(id: string): Provider | null {
      return args.providers.find((provider) => provider.id === id) ?? null;
    },
  };
}
