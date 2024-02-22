/* eslint-disable @typescript-eslint/no-unused-vars */

import assert from "assert";
import { GitHub, HandshakeOptions, NextHandshake } from "handshake";

const REDIRECT_URL = process.env.REDIRECT_URL || "";
assert(REDIRECT_URL, "Specify a URL at REDIRECT_URL.");

export const options: HandshakeOptions = {
  secret: process.env.SESSION_SECRET!,
  allowedRedirectUris: [REDIRECT_URL],
  handlers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  /**
   * This is where you'll handle forwarding the acquired credentials back to
   * your own app. There are three main strategies for doing this securely:
   *
   * 1. **Encrypted URL params.** Encrypt the credentials using a secret shared
   *    between Handshake and your app, and send it back by setting
   *    `forwardParams`.
   * 2. **API call.** Make an API call to your backend with the credentials.
   * 2. **Cookies.** If you're hosting Handshake on the same domain as your app,
   *    you can set by using `cookies` from `next/server`.
   *
   * @param handlerId - Identifies the provider that handled this handshake, eg:
   * 'google', 'github', 'amazon-seller' etc.
   */
  async onSuccess(credentials, handlerId) {
    // Do something with the credentials.
    console.log(`Credentials for ${handlerId} are`, credentials);

    return {
      forwardParams: {},
    };
  },
};

export const { GET, POST } = NextHandshake(options);
