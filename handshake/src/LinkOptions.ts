import { Provider } from "./providers/lib/Provider";

interface LinkOptionsInner {
  project: {
    id: string;
    title: string;
    logo?: string;
    supportEmail?: string;
  };
  providers: Provider[];
  /**
   * A list of hosts that we are allowed to redirect users back to.
   */
  redirectUris: string[];
  /**
   * @param linkParams - Query params we received from the client.
   * @returns Returns a list of params to send back to the redirect URL.
   */
  onSuccess(
    providerId: string,
    credential: unknown,
    linkParams: { account_id?: string },
  ): Promise<Record<string, string>> | undefined;
}

export interface HandshakeOptions extends LinkOptionsInner {
  secret: string;
  getProvider(id: string): Provider | null;
  // abc
  callbackUriParam: string;
  sessionCookie: string;
}

export function Handshake(args: LinkOptionsInner): HandshakeOptions {
  return {
    secret: "1234",
    ...args,
    callbackUriParam: "callback_uri",
    // Name of the cookie where to store information such as account IDs, before
    // sending the user to the third-party service.
    sessionCookie: "session",
    getProvider(id: string): Provider | null {
      return args.providers.find((provider) => provider.id === id) ?? null;
    },
  };
}
