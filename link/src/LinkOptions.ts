import { Provider } from "./providers/lib/Provider";

interface LinkOptionsInner {
  project: {
    id: string;
    title: string;
    logo: string;
    supportEmail: string;
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

export interface LinkOptions extends LinkOptionsInner {
  secret: string;
  getProvider(id: string): Provider | null;
}

export function LinkConfig(args: LinkOptionsInner): LinkOptions {
  return {
    secret: "1234",
    ...args,
    getProvider(id: string): Provider | null {
      return args.providers.find((provider) => provider.id === id) ?? null;
    },
  };
}
