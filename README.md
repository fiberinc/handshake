<br />

<p align="center">
  <img src="https://media1.giphy.com/media/750o1RprTNj8ldkwak/200.gif?cid=5a38a5a2julf1ukb89781yu88pth7ol9sm22s52gc88gc0hs&ep=v1_gifs_search&rid=300.gif&ct=g" width="300"/>

  <h1 align="center">Handshake</h1>

  <p align="center">
    Self-hosted solution for OAuth authentication against 60+ APIs.
  </p>

  <p align="center" style="align: center;">
    <img src="https://img.shields.io/badge/TypeScript-blue" alt="TypeScript" />
    <img src="https://img.shields.io/badge/MIT-License" alt="MIT License" />
  </p>
</p>

<br />

## Introduction

Handshake is a Next.js app that handles OAuth flow against 60+ third-party apps
and APIs. We use parts of `next-auth` under the hood to extend our coverage of
providers.

See the [full list of providers][1]

### Features

- Fully self-hostable and highly extensible. Add, modify, and remove third-party
  apps providers without running into a wall.

## How it works

Suppose you want to access your users' Salesforce data. You will need to your
users for a Salesforce access token to communicate with the Salesforce API on
their behalf. Handshake can help with you.

To acquire Salesforce credentials for a user, redirect them to:

```ts
https://YOUR_HANDSHAKE_URL/api/auth/salesforce/redirect
  ?state=123456&
  &callback_uri=https://app.example.com/integrations
```

Where `YOUR_HANDSHAKE_URL` is something like `https://handshake.example.com` or
wherever you want to host this app.

Handshake will then handle all the OAuth dance with Salesforce on your behalf.
We will redirect the user to a Salesforce page where they can authorize your app
to access their data. Salesforce will then redirect the user back to
`YOUR_HANDSHAKE_URL`, from where we will redirect the user back to you.

## Setup

Clone the project to your machine:

```bash
git clone https://github.com/fiberinc/handshake.git
```

Install dependencies:

```bash
cd handshake
pnpm i
```

Build the project:

```bash
pnpm build
```

### Set environment variables

Duplicate the `.env.example` file within the app folder:

```bash
cp app/.env.example app/.env
```

In the new file, replace the values for `REDIRECT_URL` and `SESSION_SECRET`.

### Configure your providers

Modify the `app/api/[...handshake]/routes.ts` file to include the providers you want to use:

```ts
const options: HandshakeOptions = {
  // Register the providers you want to use, entering the
  // required credentials for each of them.
  handlers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      scopes: ["https://www.googleapis.com/auth/gmail.readonly"],
    }),
  ],
  // Tell Handshake which URLs it can redirect users back to. This is a
  // security measure to prevent malicious redirects.
  allowedRedirectUris: [process.env.REDIRECT_URL],
  // Set a unique secret to sign session cookies.
  secret: process.env.SESSION_SECRET!,
};
```

Make sure to place sensitive information in your `.env` file.

You can now run your app:

```bash
cd app
pnpm dev
```

If you navigate to `localhost:3000`, you should see a list of all the configured
providers:

![](/docs/public/images/readme-landing.png)

## Deploy

Deploy the app to Vercel by running, from the root folder:

```bash
vercel deploy
```

You must deploy the project from the root folder, even though the Next.js app
folder lives within `app/`. The Next.js code needs the `handshake/` folder,
which otherwise won't be available.

### Fix project root and framework preset in Vercel

Once your project exists within Vercel, go to **Settings > General** and set the
"Root Directory" to `app`. This will tell Vercel to look for the actual Next.js
code in the right folder.

![](/docs/public/images/readme-vercel-setings-root.png)

In the same page, make sure that "Framework Preset" setting is set to "Next.js".

![](/docs/public/images/readme-vercel-setings-next.png)

### Upload environment variables to Vercel

Set `SESSION_SECRET`, `REDIRECT_URL` and any other secrets you're using by going
to **Settings > Environment Variables**, or directly [via the Vercel
CLI](https://vercel.com/docs/cli/env).

## FAQ

### Can you add support for X provider?

Yes! Please open an issue or reach out to us at
[team@fiber.dev](mailto:team@fiber.dev).

### How is this different from next-auth or passport?

Libraries like [next-auth](https://github.com/nextauthjs/next-auth) and
[passport](https://github.com/jaredhanson/passport) help you sign users into
your app using their third-party identities. You use them to implement the "Sign
In With Google" or "Sign In With Github" buttons.

In contrast, Handshake help you acquire access tokens to your users' accounts in
other apps. It's authorization instead of authentication. Handshake actually
uses `next-auth`'s large catalog of OAuth provider information under the hood.

## Contributing

Thank you for considering contributing to Handshake! If you believe you found a bug, [open an issue](https://github.com/fiberinc/handshake/issues). To add new features or make improvements to the code, create a [pull request](https://github.com/fiberinc/handshake/pulls).

## License

MIT

[1]: https://fiber.dev/handshake
