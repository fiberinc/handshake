# How to document

The [handshake-docs](https://github.com/fiberinc/handshake-docs) repo contains
our documentation website in Next.js. It uses typedocs to parse the docustrings
of each provider and format them into a cute page. Each provider docustring is
expected to follow the format:

### @options

How to use the provider class inside the `app/options.ts` file. Do not start
your section with a title — it will be filled in by the frontend component.

Example:

````ts
/**
 * @options
 *
 * ```ts title="app/options.ts"
 * import { HandshakeOptions, Salesforce } from "handshake";
 *
 * const options: HandshakeOptions = {
 *   handles: [
 *     Salesforce({
 *       clientId: string,
 *       clientSecret: string,
 *       scopes: string[],
 *       issuer?: string,
 *     }),
 *   ],
 *   // ...
 * };
 *
 * More instructions here about the options.
 */
export const Salesforce: HandlerFactory<Args> = (args) => {
````

## @redirect

Tell users about special parameters required for redirection.

````ts
/**
 * @redirect
 * For Shopify, you must include an `extras.shop` parameter to identify the shop
 * that you're trying to take through the OAuth flow. The final URL might look
 * something like this:
 *
 * ```bash
 * https://YOUR_HANDSHAKE_INSTANCE_URL/auth/shopify/redirect?
 *   state=12345
 *   &extras.shop=example.myshopify.com
 *   &callback_uri=http://YOUR_APP_URL/shopify-integration/done # example
 * ```
 */
export const Shopify: HandlerFactory<Args> = (args) => {
````

## @providersetup

Instructions about configuring your developer app in the source API eg. how
to set the appropriate callback URLs. Example:

```ts
/**
 * @providersetup
 *
 *
 */
export const Salesforce: HandlerFactory<Args> = (args) => {
```

## @troubleshoot

Instructions about configuring your developer app in the source API eg. how
to set the appropriate callback URLs. Example:

```ts
/**
 * @troubleshoot
 *
 * ### Not getting refresh token
 *
 * Make sure you have the `refresh_token` scope in the `scopes` array. Make sure
 * it's also in the `Connected App` settings in Salesforce.
 */
export const Salesforce: HandlerFactory<Args> = (args) => {
```
