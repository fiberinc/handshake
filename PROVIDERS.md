# Supported Providers

Can't find a provider here? Open a [GitHub Issue](https://github.com/fiberinc/handshake/issues) to let us know!

- [Supported Providers](#supported-providers)
  - [Amazon](#amazon)
  - [Apple](#apple)
  - [Atlassian](#atlassian)
  - [Auth0](#auth0)
  - [Authentik](#authentik)
  - [AzureAdB2c](#azureadb2c)
  - [AzureAd](#azuread)
  - [Battlenet](#battlenet)
  - [Box](#box)
  - [BoxyhqSaml](#boxyhqsaml)
  - [Bungie](#bungie)
  - [Cognito](#cognito)
  - [Coinbase](#coinbase)
  - [Discord](#discord)
  - [Dropbox](#dropbox)
  - [DuendeIdentityServer6 =](#duendeidentityserver6-)
  - [Eveonline](#eveonline)
  - [Facebook](#facebook)
  - [Faceit](#faceit)
  - [FortyTwo](#fortytwo)
  - [Foursquare](#foursquare)
  - [Freshbooks](#freshbooks)
  - [Fusionauth](#fusionauth)
  - [GitHub](#github)
  - [Gitlab](#gitlab)
  - [Google](#google)
  - [Hubspot](#hubspot)
    - [Configure the Callback URL](#configure-the-callback-url)
  - [IdentityServer4](#identityserver4)
  - [Instagram](#instagram)
  - [Kakao](#kakao)
  - [Keycloak](#keycloak)
  - [Line](#line)
  - [Linkedin](#linkedin)
  - [Mailchimp](#mailchimp)
  - [Mailru](#mailru)
  - [Medium](#medium)
  - [Naver](#naver)
  - [Netlify](#netlify)
  - [Okta](#okta)
  - [Onelogin](#onelogin)
  - [Osso](#osso)
  - [Osu](#osu)
  - [Passage](#passage)
  - [Patreon](#patreon)
  - [Pinterest](#pinterest)
  - [Pipedrive](#pipedrive)
  - [Reddit](#reddit)
  - [Salesforce](#salesforce)
  - [Shopify](#shopify)
    - [Configure the Callback URL](#configure-the-callback-url-1)
  - [Slack](#slack)
  - [Spotify](#spotify)
  - [Strava](#strava)
  - [Todoist](#todoist)
  - [Trakt](#trakt)
  - [Twitch](#twitch)
  - [Twitter](#twitter)
  - [UnitedEffects](#unitedeffects)
  - [Vk](#vk)
  - [Wikimedia](#wikimedia)
  - [Wordpress](#wordpress)
  - [WorkOS](#workos)
  - [Yandex](#yandex)
  - [Zitadel](#zitadel)
  - [Zoho](#zoho)
  - [Zoom](#zoom)

## Amazon

```ts
// Inside app/handshake.ts

import { Amazon } from "handshake";

Amazon({
  appId: "",
  clientId: "",
  clientSecret: "",
  isDraftApp: true,
});
```

## Apple

```ts
// Inside app/handshake.ts

import { Apple } from "handshake";

Apple({
  clientId: "",
  clientSecret: "",
});
```

Adapted from [next-auth](https://github.com/nextauthjs/next-auth).

## Atlassian

```ts
// Inside app/handshake.ts

import { Atlassian } from "handshake";

Atlassian({
  clientId: "",
  clientSecret: "",
});
```

Adapted from [next-auth](https://github.com/nextauthjs/next-auth).

## Auth0

```ts
// Inside app/handshake.ts

import { Auth0 } from "handshake";

Auth0({
  clientId: "",
  clientSecret: "",
});
```

Adapted from [next-auth](https://github.com/nextauthjs/next-auth).

## Authentik

```ts
// Inside app/handshake.ts

import { Authentik } from "handshake";

Authentik({
  clientId: "",
  clientSecret: "",
});
```

Adapted from [next-auth](https://github.com/nextauthjs/next-auth).

## AzureAdB2c

```ts
// Inside app/handshake.ts

import { AzureAdB2c } from "handshake";

AzureAdB2c({
  clientId: "",
  clientSecret: "",
});
```

Adapted from [next-auth](https://github.com/nextauthjs/next-auth).

## AzureAd

```ts
// Inside app/handshake.ts

import { AzureAd } from "handshake";

AzureAd({
  clientId: "",
  clientSecret: "",
});
```

Adapted from [next-auth](https://github.com/nextauthjs/next-auth).

## Battlenet

```ts
// Inside app/handshake.ts

import { Battlenet } from "handshake";

Battlenet({
  clientId: "",
  clientSecret: "",
});
```

Adapted from [next-auth](https://github.com/nextauthjs/next-auth).

## Box

```ts
// Inside app/handshake.ts

import { Box } from "handshake";

Box({
  clientId: "",
  clientSecret: "",
});
```

Adapted from [next-auth](https://github.com/nextauthjs/next-auth).

## BoxyhqSaml

```ts
// Inside app/handshake.ts

import { BoxyhqSaml } from "handshake";

BoxyhqSaml({
  clientId: "",
  clientSecret: "",
});
```

Adapted from [next-auth](https://github.com/nextauthjs/next-auth).

## Bungie

```ts
// Inside app/handshake.ts

import { Bungie } from "handshake";

Bungie({
  clientId: "",
  clientSecret: "",
});
```

Adapted from [next-auth](https://github.com/nextauthjs/next-auth).

## Cognito

```ts
// Inside app/handshake.ts

import { Cognito } from "handshake";

Cognito({
  clientId: "",
  clientSecret: "",
});
```

Adapted from [next-auth](https://github.com/nextauthjs/next-auth).

## Coinbase

```ts
// Inside app/handshake.ts

import { Coinbase } from "handshake";

Coinbase({
  clientId: "",
  clientSecret: "",
});
```

Adapted from [next-auth](https://github.com/nextauthjs/next-auth).

## Discord

```ts
// Inside app/handshake.ts

import { Discord } from "handshake";

Discord({
  clientId: "",
  clientSecret: "",
});
```

Adapted from [next-auth](https://github.com/nextauthjs/next-auth).

## Dropbox

```ts
// Inside app/handshake.ts

import { Dropbox } from "handshake";

Dropbox({
  clientId: "",
  clientSecret: "",
});
```

Adapted from [next-auth](https://github.com/nextauthjs/next-auth).

## DuendeIdentityServer6 =

```ts
DuendeIdentityServer6 = {};
```

## Eveonline

```ts
// Inside app/handshake.ts

import { Eveonline } from "handshake";

Eveonline({
  clientId: "",
  clientSecret: "",
});
```

Adapted from [next-auth](https://github.com/nextauthjs/next-auth).

## Facebook

```ts
// Inside app/handshake.ts

import { Facebook } from "handshake";

Facebook({
  clientId: "",
  clientSecret: "",
});
```

Adapted from [next-auth](https://github.com/nextauthjs/next-auth).

## Faceit

```ts
// Inside app/handshake.ts

import { Faceit } from "handshake";

Faceit({
  clientId: "",
  clientSecret: "",
});
```

Adapted from [next-auth](https://github.com/nextauthjs/next-auth).

## FortyTwo

```ts
// Inside app/handshake.ts

import { FFortyTwo } from "handshake";

FortyTwo({
  clientId: "",
  clientSecret: "",
});
```

Adapted from [next-auth](https://github.com/nextauthjs/next-auth).

## Foursquare

```ts
// Inside app/handshake.ts

import { Foursquare } from "handshake";

Foursquare({
  clientId: "",
  clientSecret: "",
});
```

Adapted from [next-auth](https://github.com/nextauthjs/next-auth).

## Freshbooks

```ts
// Inside app/handshake.ts

import { Freshbooks } from "handshake";

Freshbooks({
  clientId: "",
  clientSecret: "",
});
```

Adapted from [next-auth](https://github.com/nextauthjs/next-auth).

## Fusionauth

```ts
// Inside app/handshake.ts

import { Fusionauth } from "handshake";

Fusionauth({
  clientId: "",
  clientSecret: "",
});
```

Adapted from [next-auth](https://github.com/nextauthjs/next-auth).

## GitHub

```ts
// Inside app/handshake.ts

import { GitHub } from "handshake";

GitHub({
  clientId: "",
  clientSecret: "",
});
```

Adapted from [next-auth](https://github.com/nextauthjs/next-auth).

## Gitlab

```ts
// Inside app/handshake.ts

import { Gitlab } from "handshake";

Gitlab({
  clientId: "",
  clientSecret: "",
});
```

Adapted from [next-auth](https://github.com/nextauthjs/next-auth).

## Google

```ts
// Inside app/handshake.ts

import { Google } from "handshake";

Google({
  clientId: "",
  clientSecret: "",
});
```

Adapted from [next-auth](https://github.com/nextauthjs/next-auth).

## Hubspot

```ts
// Inside app/handshake.ts

import { Hubspot } from "handshake";

Hubspot({
  clientId: "",
  clientSecret: "",
  scopes: [
    "oauth",
    Adapted from [next-auth](https://github.com/nextauthjs/next-auth).
    "e-commerce",
    "crm.schemas.contacts.read",
    "crm.objects.contacts.read",
  ],
});
```

### Configure the Callback URL

Make sure your Handshake URL is allowed within your Hubspot app's Auth tab:

![](/docs/public/images/providers-hubspot-redirect.png)

Follow the format: `https://HANDSHAKE_URL/api/auth/hubspot/callback`

## IdentityServer4

```ts
// Inside app/handshake.ts

import { IdentityServer4 } from "handshake";

IdentityServer4({
  clientId: "",
  clientSecret: "",
});
```

Adapted from [next-auth](https://github.com/nextauthjs/next-auth).

## Instagram

```ts
// Inside app/handshake.ts

import { Instagram } from "handshake";

Instagram({
  clientId: "",
  clientSecret: "",
});
```

Adapted from [next-auth](https://github.com/nextauthjs/next-auth).

## Kakao

```ts
// Inside app/handshake.ts

import { Kakao } from "handshake";

Kakao({
  clientId: "",
  clientSecret: "",
});
```

Adapted from [next-auth](https://github.com/nextauthjs/next-auth).

## Keycloak

```ts
// Inside app/handshake.ts

import { Keycloak } from "handshake";

Keycloak({
  clientId: "",
  clientSecret: "",
});
```

Adapted from [next-auth](https://github.com/nextauthjs/next-auth).

## Line

```ts
// Inside app/handshake.ts

import { Line } from "handshake";

Line({
  clientId: "",
  clientSecret: "",
});
```

Adapted from [next-auth](https://github.com/nextauthjs/next-auth).

## Linkedin

```ts
// Inside app/handshake.ts

import { Linkedin } from "handshake";

Linkedin({
  clientId: "",
  clientSecret: "",
});
```

Adapted from [next-auth](https://github.com/nextauthjs/next-auth).

## Mailchimp

```ts
// Inside app/handshake.ts

import { Mailchimp } from "handshake";

Mailchimp({
  clientId: "",
  clientSecret: "",
});
```

Adapted from [next-auth](https://github.com/nextauthjs/next-auth).

## Mailru

```ts
// Inside app/handshake.ts

import { Mailru } from "handshake";

Mailru({
  clientId: "",
  clientSecret: "",
});
```

Adapted from [next-auth](https://github.com/nextauthjs/next-auth).

## Medium

```ts
// Inside app/handshake.ts

import { Medium } from "handshake";

Medium({
  clientId: "",
  clientSecret: "",
});
```

Adapted from [next-auth](https://github.com/nextauthjs/next-auth).

## Naver

```ts
// Inside app/handshake.ts

import { Naver } from "handshake";

Naver({
  clientId: "",
  clientSecret: "",
});
```

Adapted from [next-auth](https://github.com/nextauthjs/next-auth).

## Netlify

```ts
// Inside app/handshake.ts

import { Netlify } from "handshake";

Netlify({
  clientId: "",
  clientSecret: "",
});
```

Adapted from [next-auth](https://github.com/nextauthjs/next-auth).

## Okta

```ts
// Inside app/handshake.ts

import { Okta } from "handshake";

Okta({
  clientId: "",
  clientSecret: "",
});
```

Adapted from [next-auth](https://github.com/nextauthjs/next-auth).

## Onelogin

```ts
// Inside app/handshake.ts

import { Onelogin } from "handshake";

Onelogin({
  clientId: "",
  clientSecret: "",
});
```

Adapted from [next-auth](https://github.com/nextauthjs/next-auth).

## Osso

```ts
// Inside app/handshake.ts

import { Osso } from "handshake";

Osso({
  clientId: "",
  clientSecret: "",
});
```

Adapted from [next-auth](https://github.com/nextauthjs/next-auth).

## Osu

```ts
// Inside app/handshake.ts

import { Osu } from "handshake";

Osu({
  clientId: "",
  clientSecret: "",
});
```

Adapted from [next-auth](https://github.com/nextauthjs/next-auth).

## Passage

```ts
// Inside app/handshake.ts

import { Passage } from "handshake";

Passage({
  clientId: "",
  clientSecret: "",
});
```

Adapted from [next-auth](https://github.com/nextauthjs/next-auth).

## Patreon

```ts
// Inside app/handshake.ts

import { Patreon } from "handshake";

Patreon({
  clientId: "",
  clientSecret: "",
});
```

Adapted from [next-auth](https://github.com/nextauthjs/next-auth).

## Pinterest

```ts
// Inside app/handshake.ts

import { Pinterest } from "handshake";

Pinterest({
  clientId: "",
  clientSecret: "",
});
```

Adapted from [next-auth](https://github.com/nextauthjs/next-auth).

## Pipedrive

```ts
// Inside app/handshake.ts

import { Pipedrive } from "handshake";

Pipedrive({
  clientId: "",
  clientSecret: "",
});
```

Adapted from [next-auth](https://github.com/nextauthjs/next-auth).

## Reddit

```ts
// Inside app/handshake.ts

import { Reddit } from "handshake";

Reddit({
  clientId: "",
  clientSecret: "",
});
```

Adapted from [next-auth](https://github.com/nextauthjs/next-auth).

## Salesforce

```ts
// Inside app/handshake.ts

import { Salesforce } from "handshake";

Salesforce({
  clientId: "",
  clientSecret: "",
});
```

Adapted from [next-auth](https://github.com/nextauthjs/next-auth).

## Shopify

```ts
// Inside app/handshake.ts

import { Shopify } from "handshake";

Shopify({
  clientId: "",
  clientSecret: "",
  scopes: ["read_orders", "read_products"],
});
```

### Configure the Callback URL

Make sure your Handshake URL is allowed within your Shopify app's Configuration tab:

![](/docs/public/images/providers-shopify-redirect.png)

Follow the format: `https://HANDSHAKE_URL/api/auth/shopify/callback`

## Slack

```ts
// Inside app/handshake.ts

import { Slack } from "handshake";

Slack({
  clientId: "",
  clientSecret: "",
});
```

Adapted from [next-auth](https://github.com/nextauthjs/next-auth).

## Spotify

```ts
// Inside app/handshake.ts

import { Spotify } from "handshake";

Spotify({
  clientId: "",
  clientSecret: "",
});
```

Adapted from [next-auth](https://github.com/nextauthjs/next-auth).

## Strava

```ts
// Inside app/handshake.ts

import { Strava } from "handshake";

Strava({
  clientId: "",
  clientSecret: "",
});
```

Adapted from [next-auth](https://github.com/nextauthjs/next-auth).

## Todoist

```ts
// Inside app/handshake.ts

import { Todoist } from "handshake";

Todoist({
  clientId: "",
  clientSecret: "",
});
```

Adapted from [next-auth](https://github.com/nextauthjs/next-auth).

## Trakt

```ts
// Inside app/handshake.ts

import { Trakt } from "handshake";

Trakt({
  clientId: "",
  clientSecret: "",
});
```

Adapted from [next-auth](https://github.com/nextauthjs/next-auth).

## Twitch

```ts
// Inside app/handshake.ts

import { Twitch } from "handshake";

Twitch({
  clientId: "",
  clientSecret: "",
});
```

Adapted from [next-auth](https://github.com/nextauthjs/next-auth).

## Twitter

```ts
// Inside app/handshake.ts

import { Twitter } from "handshake";

Twitter({
  clientId: "",
  clientSecret: "",
});
```

Adapted from [next-auth](https://github.com/nextauthjs/next-auth).

## UnitedEffects

```ts
// Inside app/handshake.ts

import { UnitedEffects } from "handshake";

UnitedEffects({
  clientId: "",
  clientSecret: "",
});
```

Adapted from [next-auth](https://github.com/nextauthjs/next-auth).

## Vk

```ts
// Inside app/handshake.ts

import { Vk } from "handshake";

Vk({
  clientId: "",
  clientSecret: "",
});
```

Adapted from [next-auth](https://github.com/nextauthjs/next-auth).

## Wikimedia

```ts
// Inside app/handshake.ts

import { Wikimedia } from "handshake";

Wikimedia({
  clientId: "",
  clientSecret: "",
});
```

Adapted from [next-auth](https://github.com/nextauthjs/next-auth).

## Wordpress

```ts
// Inside app/handshake.ts

import { Wordpress } from "handshake";

Wordpress({
  clientId: "",
  clientSecret: "",
});
```

Adapted from [next-auth](https://github.com/nextauthjs/next-auth).

## WorkOS

```ts
// Inside app/handshake.ts

import { Workos } from "handshake";

Workos({
  clientId: "",
  clientSecret: "",
});
```

Adapted from [next-auth](https://github.com/nextauthjs/next-auth).

## Yandex

```ts
// Inside app/handshake.ts

import { Yandex } from "handshake";

Yandex({
  clientId: "",
  clientSecret: "",
});
```

Adapted from [next-auth](https://github.com/nextauthjs/next-auth).

## Zitadel

```ts
// Inside app/handshake.ts

import { Zitadel } from "handshake";

Zitadel({
  clientId: "",
  clientSecret: "",
});
```

Adapted from [next-auth](https://github.com/nextauthjs/next-auth).

## Zoho

```ts
// Inside app/handshake.ts

import { Zoho } from "handshake";

Zoho({
  clientId: "",
  clientSecret: "",
});
```

Adapted from [next-auth](https://github.com/nextauthjs/next-auth).

## Zoom

```ts
// Inside app/handshake.ts

import { Zoom } from "handshake";

Zoom({
  clientId: "",
  clientSecret: "",
});
```

Adapted from [next-auth](https://github.com/nextauthjs/next-auth).
