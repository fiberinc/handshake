import assert from "assert";
import { HandshakeOptions } from "handshake";

const ALLOWED_REDIRECT_HOST = process.env.ALLOWED_REDIRECT_HOST || "";
assert(ALLOWED_REDIRECT_HOST, "Specify a value for ALLOWED_REDIRECT_HOST.");

export const options: HandshakeOptions = {
  secret: process.env.SESSION_SECRET!,
  allowedRedirectHosts: [ALLOWED_REDIRECT_HOST],
  handlers: [
    // TODO: Add your handlers here.
    //
    // GitHub({
    //   clientId: process.env.GITHUB_CLIENT_ID!,
    //   clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    //   scopes: ["repo"],
    // }),
  ],
  /**
   * This is where you'll handle forwarding the acquired credentials back to
   * your own app. There are three main strategies for doing this securely:
   *
   * 1. **URL params.** Send the credentials back as a URL parameter by setting
   *    `forwardParams`. You should probably symmetrically encrypt the parameter
   *    by sharing a secret between this Handshake instance and your backend.
   * 2. **API call.** Make an API call to your backend with the credentials.
   * 2. **Cookies.** If you're hosting Handshake on the same domain as your app,
   *    you can set by using `cookies` from `next/server`.
   *
   * @param handlerId - Identifies the provider that handled this handshake, eg:
   * 'google', 'github', 'amazon-seller' etc.
   */
  async onSuccess(credentials, handlerId) {
    // TODO: Do something with the credentials.
    console.log(`Credentials for ${handlerId} are`, credentials);

    return {
      forwardParams: {},
    };
  },
};
