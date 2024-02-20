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

Handshake is a Next.js app that handles OAuth flow against 60+ third-party apps and APIs. We use parts of `next-auth` under the hood, to extend our coverage of providers.

## How it works

Suppose you want to access your users' Salesforce data. You will need to your
users for a Salesforce access token to communicate with the Salesforce API on
their behalf. Handshake can help with you.

To acquire Salesforce credentials for a user, redirect them to:

```ts
https://YOUR_HANDSHAKE_URL/api/auth/stripe/redirect
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

### Create `app/.env`

Duplicate the `.env.example` file within the app folder:

```bash
cp app/.env.example app/.env
```

In the new file, replace the values for `REDIRECT_URL` and `SESSION_SECRET`.

### Modify `app/config.ts`

Now we are ready to configure Handshake to use the providers you want to use.

Modify the `app/config.ts` file with your credentials:

```js
export const config = Handshake({
  secret: process.env.SESSION_SECRET!,
  redirectUris: [REDIRECT_URL],
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
});
```

Now you can run your app:

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
vercel deploy --prod
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

### How is this different from next-auth or passport?

Libraries like [next-auth](https://github.com/nextauthjs/next-auth) and
[passport](https://github.com/jaredhanson/passport) help you for authenticate
users _into your app_ through their third-party identities.

In contrast, Handshake helps you **acquire** access tokens to access your users'
accounts within other apps. We actually use `next-auth`'s large catalog of
providers under the hood, to increase our coverage.

## Contributing

Thank you for considering contributing to Handshake! If you believe you found a bug, [open an issue](https://github.com/fiberinc/handshake/issues). To add new features or make improvements to the code, create a [pull request](https://github.com/fiberinc/handshake/pulls).

## License

MIT
