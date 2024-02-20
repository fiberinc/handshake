import { makeFromNextAuth } from "./makeFromNextAuth";

const F42chool = require("next-auth/providers/42-school").default;
export const F42choolProvider = makeFromNextAuth(F42chool);

const Apple = require("next-auth/providers/apple").default;
export const AppleProvider = makeFromNextAuth(Apple);

const Atlassian = require("next-auth/providers/atlassian").default;
export const AtlassianProvider = makeFromNextAuth(Atlassian);

const Auth0 = require("next-auth/providers/auth0").default;
export const Auth0Provider = makeFromNextAuth(Auth0);

const Authentik = require("next-auth/providers/authentik").default;
export const AuthentikProvider = makeFromNextAuth(Authentik);

const AzureAdB2c = require("next-auth/providers/azure-ad-b2c").default;
export const AzureAdB2cProvider = makeFromNextAuth(AzureAdB2c);

const AzureAd = require("next-auth/providers/azure-ad").default;
export const AzureAdProvider = makeFromNextAuth(AzureAd);

const Battlenet = require("next-auth/providers/battlenet").default;
export const BattlenetProvider = makeFromNextAuth(Battlenet);

const Box = require("next-auth/providers/box").default;
export const BoxProvider = makeFromNextAuth(Box);

const BoxyhqSaml = require("next-auth/providers/boxyhq-saml").default;
export const BoxyhqSamlProvider = makeFromNextAuth(BoxyhqSaml);

const Bungie = require("next-auth/providers/bungie").default;
export const BungieProvider = makeFromNextAuth(Bungie);

const Cognito = require("next-auth/providers/cognito").default;
export const CognitoProvider = makeFromNextAuth(Cognito);

const Coinbase = require("next-auth/providers/coinbase").default;
export const CoinbaseProvider = makeFromNextAuth(Coinbase);

const Discord = require("next-auth/providers/discord").default;
export const DiscordProvider = makeFromNextAuth(Discord);

const Dropbox = require("next-auth/providers/dropbox").default;
export const DropboxProvider = makeFromNextAuth(Dropbox);

const DuendeIdentityServer6 =
  require("next-auth/providers/duende-identity-server6").default;
export const DuendeIdentityServer6Provider = makeFromNextAuth(
  DuendeIdentityServer6,
);

const Eveonline = require("next-auth/providers/eveonline").default;
export const EveonlineProvider = makeFromNextAuth(Eveonline);

const Facebook = require("next-auth/providers/facebook").default;
export const FacebookProvider = makeFromNextAuth(Facebook);

const Faceit = require("next-auth/providers/faceit").default;
export const FaceitProvider = makeFromNextAuth(Faceit);

const Foursquare = require("next-auth/providers/foursquare").default;
export const FoursquareProvider = makeFromNextAuth(Foursquare);

const Freshbooks = require("next-auth/providers/freshbooks").default;
export const FreshbooksProvider = makeFromNextAuth(Freshbooks);

const Fusionauth = require("next-auth/providers/fusionauth").default;
export const FusionauthProvider = makeFromNextAuth(Fusionauth);

const GitHub = require("next-auth/providers/github").default;
export const GitHubProvider = makeFromNextAuth(GitHub);

const Gitlab = require("next-auth/providers/gitlab").default;
export const GitlabProvider = makeFromNextAuth(Gitlab);

const Google = require("next-auth/providers/google").default;
export const GoogleProvider = makeFromNextAuth(Google);

const Hubspot = require("next-auth/providers/hubspot").default;
export const HubspotProvider = makeFromNextAuth(Hubspot);

const IdentityServer4 = require("next-auth/providers/identity-server4").default;
export const IdentityServer4Provider = makeFromNextAuth(IdentityServer4);

const Instagram = require("next-auth/providers/instagram").default;
export const InstagramProvider = makeFromNextAuth(Instagram);

const Kakao = require("next-auth/providers/kakao").default;
export const KakaoProvider = makeFromNextAuth(Kakao);

const Keycloak = require("next-auth/providers/keycloak").default;
export const KeycloakProvider = makeFromNextAuth(Keycloak);

const Line = require("next-auth/providers/line").default;
export const LineProvider = makeFromNextAuth(Line);

const Linkedin = require("next-auth/providers/linkedin").default;
export const LinkedinProvider = makeFromNextAuth(Linkedin);

const Mailchimp = require("next-auth/providers/mailchimp").default;
export const MailchimpProvider = makeFromNextAuth(Mailchimp);

const Mailru = require("next-auth/providers/mailru").default;
export const MailruProvider = makeFromNextAuth(Mailru);

const Medium = require("next-auth/providers/medium").default;
export const MediumProvider = makeFromNextAuth(Medium);

const Naver = require("next-auth/providers/naver").default;
export const NaverProvider = makeFromNextAuth(Naver);

const Netlify = require("next-auth/providers/netlify").default;
export const NetlifyProvider = makeFromNextAuth(Netlify);

const Okta = require("next-auth/providers/okta").default;
export const OktaProvider = makeFromNextAuth(Okta);

const Onelogin = require("next-auth/providers/onelogin").default;
export const OneloginProvider = makeFromNextAuth(Onelogin);

const Osso = require("next-auth/providers/osso").default;
export const OssoProvider = makeFromNextAuth(Osso);

const Osu = require("next-auth/providers/osu").default;
export const OsuProvider = makeFromNextAuth(Osu);

const Passage = require("next-auth/providers/passage").default;
export const PassageProvider = makeFromNextAuth(Passage);

const Patreon = require("next-auth/providers/patreon").default;
export const PatreonProvider = makeFromNextAuth(Patreon);

const Pinterest = require("next-auth/providers/pinterest").default;
export const PinterestProvider = makeFromNextAuth(Pinterest);

const Pipedrive = require("next-auth/providers/pipedrive").default;
export const PipedriveProvider = makeFromNextAuth(Pipedrive);

const Reddit = require("next-auth/providers/reddit").default;
export const RedditProvider = makeFromNextAuth(Reddit);

const Salesforce = require("next-auth/providers/salesforce").default;
export const SalesforceProvider = makeFromNextAuth(Salesforce);

const Slack = require("next-auth/providers/slack").default;
export const SlackProvider = makeFromNextAuth(Slack);

const Spotify = require("next-auth/providers/spotify").default;
export const SpotifyProvider = makeFromNextAuth(Spotify);

const Strava = require("next-auth/providers/strava").default;
export const StravaProvider = makeFromNextAuth(Strava);

const Todoist = require("next-auth/providers/todoist").default;
export const TodoistProvider = makeFromNextAuth(Todoist);

const Trakt = require("next-auth/providers/trakt").default;
export const TraktProvider = makeFromNextAuth(Trakt);

const Twitch = require("next-auth/providers/twitch").default;
export const TwitchProvider = makeFromNextAuth(Twitch);

const Twitter = require("next-auth/providers/twitter").default;
export const TwitterProvider = makeFromNextAuth(Twitter);

const UnitedEffects = require("next-auth/providers/united-effects").default;
export const UnitedEffectsProvider = makeFromNextAuth(UnitedEffects);

const Vk = require("next-auth/providers/vk").default;
export const VkProvider = makeFromNextAuth(Vk);

const Wikimedia = require("next-auth/providers/wikimedia").default;
export const WikimediaProvider = makeFromNextAuth(Wikimedia);

const Wordpress = require("next-auth/providers/wordpress").default;
export const WordpressProvider = makeFromNextAuth(Wordpress);

const Workos = require("next-auth/providers/workos").default;
export const WorkosProvider = makeFromNextAuth(Workos);

const Yandex = require("next-auth/providers/yandex").default;
export const YandexProvider = makeFromNextAuth(Yandex);

const Zitadel = require("next-auth/providers/zitadel").default;
export const ZitadelProvider = makeFromNextAuth(Zitadel);

const Zoho = require("next-auth/providers/zoho").default;
export const ZohoProvider = makeFromNextAuth(Zoho);

const Zoom = require("next-auth/providers/zoom").default;
export const ZoomProvider = makeFromNextAuth(Zoom);
