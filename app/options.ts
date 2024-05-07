import assert from "assert";
import { HandshakeOptions } from "handshake";

const ALLOWED_REDIRECT_HOST = process.env.ALLOWED_REDIRECT_HOST || "";
assert(ALLOWED_REDIRECT_HOST, "Specify a value for ALLOWED_REDIRECT_HOST.");

export const options: HandshakeOptions = {
  secret: process.env.SESSION_SECRET!,
  allowedRedirectHosts: [ALLOWED_REDIRECT_HOST],
  handlers: [
    // TODO add your handlers here...
    //
    // Shopify({
    //   clientId: process.env.SHOPIFY_CLIENT_ID!,
    //   clientSecret: process.env.SHOPIFY_CLIENT_SECRET!,
    //   scopes: ["read_orders"],
    // }),
  ],
  /**
   * This is where you'll handle forwarding the acquired credentials back to
   * your own app. There are three main strategies for doing this securely:
   *
   * - **1. Query string** Send the credentials back as a URL parameter by
   *   setting `forwardParams`. You should probably symmetrically encrypt the
   *   parameter by sharing a secret between this Handshake instance and your
   *   backend.
   *
   * - **2. API call** Make an API call to your backend and send the
   *   credentials.
   *
   * - **3. Cookie** If you're hosting Handshake on the same domain as your app,
   *   you can set cookies using `cookies()` (from `next/server`) and read them
   *   in the callback.
   *
   * @param tokens - Credentials received from the provider.
   * @param handlerId - Identifies the provider that handled this handshake, eg:
   * 'google', 'github', 'amazon-seller' etc.
   */
  async onSuccess(tokens, handlerId) {
    // TODO: Do something with the tokens.
    console.log(`Received tokens for ${handlerId}`, tokens);

    // // Example of (1):
    // const jsonToken = JSON.stringify(tokens.tokens);
    //
    // // You'll want to use `crypto.createCipheriv` instead.
    // const cipher = crypto.createCipher(
    //   "aes256",
    //   "a-secret-shared-with-your-backend",
    // );
    // const encrypted =
    //   cipher.update(jsonToken, "utf8", "hex") + cipher.final("hex");
    //
    // return {
    //   forwardParams: {
    //     encryptedTokens: encrypted,
    //   },
    // };

    return {
      forwardParams: {},
    };
  },
};
