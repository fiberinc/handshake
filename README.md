<br />

<p align="center">
  <img src="https://media1.giphy.com/media/750o1RprTNj8ldkwak/200.gif?cid=5a38a5a2julf1ukb89781yu88pth7ol9sm22s52gc88gc0hs&ep=v1_gifs_search&rid=300.gif&ct=g" width="300"/>

  <h1 align="center">OAuth Link</h1>

  <p align="center">
    Self-hosted solution for authentication against third-party APIs.
  </p>

  <p align="center" style="align: center;">
    <img src="https://img.shields.io/badge/TypeScript-blue" alt="TypeScript" />
    <img src="https://img.shields.io/badge/MIT-License" alt="MIT License" />
  </p>
</p>

<br />

## Introduction

Link (name TBD) is a self-hosted Next.js app that handles OAuth with popular
tools and APIs. We are built over
[next-auth](https://github.com/nextauthjs/next-auth), which lets us support
authentication with 60+ providers out of the box.

## How it works

This repo is a Next.js app that you can self host using Vercel.

### Configuration

Modify the `config.ts` file with your credentials.

```js
export nextOptions = NextLink({
  providers: [
    GoogleProvider({
      clientId: "",
      clientSecret: "",
      redirectUri: "",
      accessToken: true,
      refreshToken: true,
    }),
  ],
});
```

### Use

Once deployed, send your users to the `/api/foo/redirect`, adding the following parameters:

| Name         | Description                                           | Observation |
| ------------ | ----------------------------------------------------- | ----------- |
| redirect_uri | Where to send users back to after success or failure. | Required    |
| state        |                                                       | Required    |

Example:

`https://EXAMPLE/api/redirect?redirect_uri=http1231234&account_id=123456&state=85657&`

In case of success, users will be redirected back to you with the following parameters:

| Name         | Description                                                           | Observation |
| ------------ | --------------------------------------------------------------------- | ----------- |
| authorized   | `true` if the authorization went well, `false` if something happened. | Required    |
| access_token | Authorization token.                                                  | Required    |
| state        | The state parameter. You can use this to associate.                   | Required    |

## Deploying

`vercel deploy`

Go to [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## FAQ

## Contributing

## License

MIT
