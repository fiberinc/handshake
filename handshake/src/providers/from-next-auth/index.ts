/* eslint-disable @typescript-eslint/no-var-requires */

// The following providers accept ad hoc arguments, so we hard-code their types:
// - azure-ad-b2c
// - azure-ad
// - battlenet
// - fusionauth
// - united-effects

import { makeFromNextAuth } from "./makeFromNextAuth";

const FortyTwoNextAuth = require("next-auth/providers/42-school").default;
export const FortyTwo = makeFromNextAuth(FortyTwoNextAuth);

const AppleNextAuth = require("next-auth/providers/apple").default;
export const Apple = makeFromNextAuth(AppleNextAuth);

const AtlassianNextAuth = require("next-auth/providers/atlassian").default;
export const Atlassian = makeFromNextAuth(AtlassianNextAuth);

const Auth0NextAuth = require("next-auth/providers/auth0").default;
export const Auth0 = makeFromNextAuth(Auth0NextAuth);

// Disabling until someone asks for it.
// const AuthentikNextAuth = require("next-auth/providers/authentik").default;
// export const Authentik = makeFromNextAuth(AuthentikNextAuth);

import AzureAdB2cNextAuth from "next-auth/providers/azure-ad-b2c";
export const AzureAdB2C = makeFromNextAuth<{
  primaryUserFlow?: string;
  tenantId?: string;
}>(AzureAdB2cNextAuth);

const AzureAdNextAuth = require("next-auth/providers/azure-ad").default;
export const AzureAd = makeFromNextAuth<{
  /**
   * https://docs.microsoft.com/en-us/graph/api/profilephoto-get?view=graph-rest-1.0#examples
   * @default 48
   */
  profilePhotoSize?: 48 | 64 | 96 | 120 | 240 | 360 | 432 | 504 | 648;
  /** @default "common" */
  tenantId?: string;
}>(AzureAdNextAuth);

import BattlenetNextAuth, {
  BattleNetIssuer,
} from "next-auth/providers/battlenet";
export const Battlenet = makeFromNextAuth<{ issuer: BattleNetIssuer }>(
  BattlenetNextAuth,
);

const BoxNextAuth = require("next-auth/providers/box").default;
export const Box = makeFromNextAuth(BoxNextAuth);

// const BoxyhqSamlNextAuth = require("next-auth/providers/boxyhq-saml").default;
// export const BoxyhqSaml = makeFromNextAuth(BoxyhqSamlNextAuth);

const BungieNextAuth = require("next-auth/providers/bungie").default;
export const Bungie = makeFromNextAuth(BungieNextAuth);

const CognitoNextAuth = require("next-auth/providers/cognito").default;
export const Cognito = makeFromNextAuth(CognitoNextAuth);

const CoinbaseNextAuth = require("next-auth/providers/coinbase").default;
export const Coinbase = makeFromNextAuth(CoinbaseNextAuth);

const DiscordNextAuth = require("next-auth/providers/discord").default;
export const Discord = makeFromNextAuth(DiscordNextAuth);

const DropboxNextAuth = require("next-auth/providers/dropbox").default;
export const Dropbox = makeFromNextAuth(DropboxNextAuth);

// const DuendeIdentityServer6NextAuth =
//   require("next-auth/providers/duende-identity-server6").default;
// export const DuendeIdentityServer6 = makeFromNextAuth(
//   DuendeIdentityServer6NextAuth,
// );

const EveonlineNextAuth = require("next-auth/providers/eveonline").default;
export const Eveonline = makeFromNextAuth(EveonlineNextAuth);

const FacebookNextAuth = require("next-auth/providers/facebook").default;
export const Facebook = makeFromNextAuth(FacebookNextAuth);

const FaceitNextAuth = require("next-auth/providers/faceit").default;
export const Faceit = makeFromNextAuth(FaceitNextAuth);

const FoursquareNextAuth = require("next-auth/providers/foursquare").default;
export const Foursquare = makeFromNextAuth(FoursquareNextAuth);

const FreshbooksNextAuth = require("next-auth/providers/freshbooks").default;
export const Freshbooks = makeFromNextAuth(FreshbooksNextAuth);

const FusionauthNextAuth = require("next-auth/providers/fusionauth").default;
export const Fusionauth = makeFromNextAuth<{
  // tenantId only needed if there is more than one tenant configured on the server
  tenantId?: string;
}>(FusionauthNextAuth);

const GitHubNextAuth = require("next-auth/providers/github").default;
export const GitHub = makeFromNextAuth(GitHubNextAuth);

const GitlabNextAuth = require("next-auth/providers/gitlab").default;
export const Gitlab = makeFromNextAuth(GitlabNextAuth);

// const GoogleNextAuth = require("next-auth/providers/google").default;
// export const Google = makeFromNextAuth(GoogleNextAuth);

const HubspotNextAuth = require("next-auth/providers/hubspot").default;
/**
 *
 * ## Usage
 *
 * Provide the following arguments:
 *
 * ```ts
 * // Inside app/options.ts
 *
 * import { Hubspot } from "handshake";
 *
 * Hubspot({
 *   clientId: string,
 *   clientSecret: string,
 *   scopes: [
 *     "e-commerce",
 *     "crm.schemas.contacts.read",
 *     "crm.objects.contacts.read",
 *   ],
 * });
 * ```
 *
 * ### Configure the Callback URL
 *
 * Make sure your Handshake URL is allowed within your Hubspot app's Auth tab:
 *
 * ![hubspot-redirect-settings](DOC_IMAGES/hubspot-redirect.png)
 *
 * Follow the format: `https://HANDSHAKE_URL/auth/hubspot/callback`
 */
export const Hubspot = makeFromNextAuth(HubspotNextAuth);

// const IdentityServer4NextAuth =
//   require("next-auth/providers/identity-server4").default;
// export const IdentityServer4 = makeFromNextAuth(IdentityServer4NextAuth);

const InstagramNextAuth = require("next-auth/providers/instagram").default;
export const Instagram = makeFromNextAuth(InstagramNextAuth);

const KakaoNextAuth = require("next-auth/providers/kakao").default;
export const Kakao = makeFromNextAuth(KakaoNextAuth);

const KeycloakNextAuth = require("next-auth/providers/keycloak").default;
export const Keycloak = makeFromNextAuth(KeycloakNextAuth);

const LineNextAuth = require("next-auth/providers/line").default;
export const Line = makeFromNextAuth(LineNextAuth);

const LinkedInNextAuth = require("next-auth/providers/linkedin").default;
export const LinkedIn = makeFromNextAuth(LinkedInNextAuth);

const MailchimpNextAuth = require("next-auth/providers/mailchimp").default;
export const Mailchimp = makeFromNextAuth(MailchimpNextAuth);

const MailruNextAuth = require("next-auth/providers/mailru").default;
export const Mailru = makeFromNextAuth(MailruNextAuth);

const MediumNextAuth = require("next-auth/providers/medium").default;
export const Medium = makeFromNextAuth(MediumNextAuth);

const NaverNextAuth = require("next-auth/providers/naver").default;
export const Naver = makeFromNextAuth(NaverNextAuth);

const NetlifyNextAuth = require("next-auth/providers/netlify").default;
export const Netlify = makeFromNextAuth(NetlifyNextAuth);

const OktaNextAuth = require("next-auth/providers/okta").default;
export const Okta = makeFromNextAuth(OktaNextAuth);

const OneloginNextAuth = require("next-auth/providers/onelogin").default;
export const Onelogin = makeFromNextAuth(OneloginNextAuth);

const OssoNextAuth = require("next-auth/providers/osso").default;
export const Osso = makeFromNextAuth(OssoNextAuth);

const OsuNextAuth = require("next-auth/providers/osu").default;
export const Osu = makeFromNextAuth(OsuNextAuth);

const PassageNextAuth = require("next-auth/providers/passage").default;
export const Passage = makeFromNextAuth(PassageNextAuth);

const PatreonNextAuth = require("next-auth/providers/patreon").default;
export const Patreon = makeFromNextAuth(PatreonNextAuth);

const PinterestNextAuth = require("next-auth/providers/pinterest").default;
export const Pinterest = makeFromNextAuth(PinterestNextAuth);

const PipedriveNextAuth = require("next-auth/providers/pipedrive").default;
export const Pipedrive = makeFromNextAuth(PipedriveNextAuth);

const RedditNextAuth = require("next-auth/providers/reddit").default;
export const Reddit = makeFromNextAuth(RedditNextAuth);

// const SalesforceNextAuth = require("next-auth/providers/salesforce").default;
// export const Salesforce = makeFromNextAuth(SalesforceNextAuth);

const SlackNextAuth = require("next-auth/providers/slack").default;
export const Slack = makeFromNextAuth(SlackNextAuth);

const SpotifyNextAuth = require("next-auth/providers/spotify").default;
export const Spotify = makeFromNextAuth(SpotifyNextAuth);

const StravaNextAuth = require("next-auth/providers/strava").default;
export const Strava = makeFromNextAuth(StravaNextAuth);

const TodoistNextAuth = require("next-auth/providers/todoist").default;
export const Todoist = makeFromNextAuth(TodoistNextAuth);

const TraktNextAuth = require("next-auth/providers/trakt").default;
export const Trakt = makeFromNextAuth(TraktNextAuth);

const TwitchNextAuth = require("next-auth/providers/twitch").default;
export const Twitch = makeFromNextAuth(TwitchNextAuth);

// const TwitterNextAuth = require("next-auth/providers/twitter").default;
// export const Twitter = makeFromNextAuth(TwitterNextAuth);

const UnitedEffectsNextAuth =
  require("next-auth/providers/united-effects").default;
export const UnitedEffects = makeFromNextAuth<{ issuer: string }>(
  UnitedEffectsNextAuth,
);

const VkNextAuth = require("next-auth/providers/vk").default;
export const Vk = makeFromNextAuth(VkNextAuth);

const WikimediaNextAuth = require("next-auth/providers/wikimedia").default;
export const Wikimedia = makeFromNextAuth(WikimediaNextAuth);

const WordpressNextAuth = require("next-auth/providers/wordpress").default;
export const Wordpress = makeFromNextAuth(WordpressNextAuth);

const WorkosNextAuth = require("next-auth/providers/workos").default;
export const WorkOS = makeFromNextAuth(WorkosNextAuth);

const YandexNextAuth = require("next-auth/providers/yandex").default;
export const Yandex = makeFromNextAuth(YandexNextAuth);

const ZitadelNextAuth = require("next-auth/providers/zitadel").default;
export const Zitadel = makeFromNextAuth(ZitadelNextAuth);

const ZohoNextAuth = require("next-auth/providers/zoho").default;
export const Zoho = makeFromNextAuth(ZohoNextAuth);

const ZoomNextAuth = require("next-auth/providers/zoom").default;
export const Zoom = makeFromNextAuth(ZoomNextAuth);
