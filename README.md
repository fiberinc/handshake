<br />

<p align="center">
  <img src="https://media1.giphy.com/media/750o1RprTNj8ldkwak/200.gif?cid=5a38a5a2julf1ukb89781yu88pth7ol9sm22s52gc88gc0hs&ep=v1_gifs_search&rid=300.gif&ct=g" width="300"/>

  <h1 align="center">Handshake</h1>

  <p align="center">
    Self-hosted solution for OAuth authentication against third-party APIs.
  </p>

  <p align="center" style="align: center;">
    <img src="https://img.shields.io/badge/TypeScript-blue" alt="TypeScript" />
    <img src="https://img.shields.io/badge/MIT-License" alt="MIT License" />
  </p>
</p>

<br />

## Introduction

Handshake is a self-hosted Next.js app that handles OAuth with popular tools and
APIs. We are built over [next-auth](https://github.com/nextauthjs/next-auth),
which lets us support authentication with 60+ providers out of the box.

This repo is a Next.js app that you can self host using Vercel.

## How it works

Suppose you want to access your users' Salesforce data. You will need to your
users for a Salesforce access token to communicate with the Salesforce API on
their behalf. Handshake can help with you.

So you decide to host Handshake at `https://handshake.example.com`.

To acquire Salesforce credentials for a user, redirect them to:

```ts
https://handshake.example.com/api/auth/stripe/redirect
  ?state=123456&
  &callback_uri=https://app.example.com/integrations
```

Handshake will then redirect the user to Salesforce, where they can authorize
your app to access their data. Salesforce will then redirect the user back to
Handshake, which will obtain the require credentials and send them back to you
at `callback_uri`.

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

Once this is done, navigate to `localhost:3000` (or wherever else your app is being served). You should now see a list of all the configured providers:

![](/docs/public/images/readme-landing.png)

## Deploying

You can deploy this app to Vercel in a few simple steps. Just follow the interactive prompts at:

```bash
vercel deploy
```

Although the app code lives inside the `app` folder, **you must deploy the root folder**. Otherwise the code in the `handshake` folder won't be available, which will cause the build to fail.

### Fix project root and framework preset in Vercel

Once your project exists within Vercel, go to Settings > General and set the "Root Directory" to `app`. This will tell Vercel to look for the actual Next.js code in the right folder.

![](/docs/public/images/readme-vercel-setings-root.png)

In the same page, also make sure that "Framework Preset" is set to Next.js.

![](/docs/public/images/readme-vercel-setings-next.png)

Go to [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## FAQ

### How is this different from next-auth or passport?

Libraries like [next-auth](https://github.com/nextauthjs/next-auth) and
[passport](https://github.com/jaredhanson/passport) help you for authenticate
users into your app using third-party providers. In contrast, Handshake helps
you **acquire** access tokens to access your users' accounts within other apps.

We actually use next-auth's large catalog of providers under the hood, which
greatly reduces our maintenance overhead.

## Contributing

Here's how you can contribute:

Open an [issue](https://github.com/fiberinc/handshake/issues) if you believe you've encountered a bug. \
Make a [pull request](https://github.com/fiberinc/handshake/pulls) to add new features/make quality-of-life improvements/fix bugs.

## License

MIT
