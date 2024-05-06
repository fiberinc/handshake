<br />

<p align="left">
  <img src="https://handshake.cool/images/github-banner.png" width="100%"/>

  <h1 align="left">Handshake</h1>

  <p align="left">
    Self-hosted app that handles OAuth against 200+ APIs.
  </p>

  <p align="left" style="align: left;">
    <img src="https://img.shields.io/badge/TypeScript-blue" alt="TypeScript" />
    <img src="https://img.shields.io/badge/MIT-License" alt="MIT License" />
    <a href="https://github.com/fiberinc/handshake/actions/workflows/ci.yml">
      <img src="https://github.com/fiberinc/handshake/actions/workflows/ci.yml/badge.svg" alt="CI status" style="max-width: 100%;">
    </a>
  </p>
</p>

<br />

- [About](#about)
- [How it works](#how-it-works)
- [Setup](#setup)
  - [Set environment variables](#set-environment-variables)
  - [Configure your providers](#configure-your-providers)
- [Deploy](#deploy)
  - [Fix project root and framework preset in Vercel](#fix-project-root-and-framework-preset-in-vercel)
  - [Upload environment variables to Vercel](#upload-environment-variables-to-vercel)
- [FAQ](#faq)
  - [Can you add support for X provider?](#can-you-add-support-for-x-provider)
  - [How is this different from next-auth or passport?](#how-is-this-different-from-next-auth-or-passport)
- [Contributing](#contributing)
- [License](#license)

<br />

## About

Handshake helps you get OAuth tokens to your users' accounts in over 200 apps
and services. It's an open-source Next.js app that you can easily configure and
deploy.

See the [full list of providers][1].

## How it works

Suppose you want to access your users' Salesforce data. You will need to your
users for a Salesforce access token to communicate with the Salesforce API on
their behalf. Handshake can help with you.

To acquire Salesforce credentials for a user, redirect them to:

```ts
https://YOUR_HANDSHAKE_URL/auth/salesforce/redirect
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

In the new file, replace the values for `ALLOWED_REDIRECT_HOST` and `SESSION_SECRET`.

### Configure your providers

Modify the `app/options.ts` file to include the providers you want to use:

```ts
import { HandshakeOptions, GitHub } from "handshake";

const options: HandshakeOptions = {
  // Register the providers you want to use, entering the
  // required credentials for each of them.
  handlers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      scopes: ["repo"],
    }),
  ],
  // Tell Handshake which hosts it can redirect users back to. This is a
  // security measure to prevent malicious redirects.
  allowedRedirectHosts: [process.env.ALLOWED_REDIRECT_HOST],
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

![](/docs/public/images/readme-landing-2.png)

## Deploy

Deploy the app to Vercel by running, from the root folder:

```bash
vercel deploy
```

You must call `vercel deploy` **from the root folder**, even though the Next.js
app folder lives within `app/`. The app code needs the `handshake/` folder,
which otherwise won't be available.

<img src="https://handshake.cool/images/vercel-deploy.gif" width="400" />

The command may tell you "No framework detected" instead of detecting Next.js as
your framework. Steps to fix this are outlined below.

### Fix project root and framework preset in Vercel

Once your project exists within Vercel, go to **Settings > General**.

First, set "Framework Preset" setting to "Next.js".

![](/docs/public/images/readme-vercel-setings-next.png)

Then, set the "Root Directory" to `app`. This will tell Vercel to look for the
actual Next.js code in the right folder.

![](/docs/public/images/readme-vercel-setings-root.png)

### Upload environment variables to Vercel

Set `SESSION_SECRET`, `ALLOWED_REDIRECT_HOST` and any other secrets you're using by going
to **Settings > Environment Variables**, or directly [via the Vercel
CLI](https://vercel.com/docs/cli/env).

## FAQ

### Can you add support for X provider?

Yes! Please open an issue or reach out to us at
[team@fiber.dev](mailto:team@fiber.dev).

### How is this different from next-auth or passport?

Libraries like [next-auth](https://github.com/nextauthjs/next-auth) and
[passport](https://github.com/jaredhanson/passport) help you sign users into
your app using their third-party identities. You implement buttons
that say "Sign In With Google" or "Sign In With Github".

In contrast, Handshake help you acquire access tokens to your users' accounts in
other apps. It's authorization instead of authentication. Handshake actually
uses `next-auth`'s large catalog of OAuth provider information under the hood.

## Contributing

Thank you for considering contributing to Handshake! If you believe you found a bug, [open an issue](https://github.com/fiberinc/handshake/issues). To add new features or make improvements to the code, create a [pull request](https://github.com/fiberinc/handshake/pulls).

## License

MIT

[1]: https://handshake.cool/providers
