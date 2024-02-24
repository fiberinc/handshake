import { HandlerFactory } from "~/core/Handler";
import { TypicalOAuthArgs, makeHandlerFactory } from "../lib/makeHandler";

function makeOauthFactory(info: {
  id: string;
  title: string;
  oauth: 1 | 2;
  website: string;
  noLogo?: boolean;
  authorize_url: string;
  request_url?: string;
  access_url: string;
  scope_delimiter?: string;
}) {
  return makeHandlerFactory({
    id: info.id,
    name: info.title,
    type: "oauth",
    website: info.website,
    version: info.oauth === 2 ? "2" : "1.1",
    authorization: {
      url: info.authorize_url,
    },
    token: {
      url: info.access_url,
    },
  }) satisfies HandlerFactory<TypicalOAuthArgs>;
}

export const _23andMe = makeOauthFactory({
  id: "23andme",
  title: "23andMe",
  website: "https://www.23andme.com",
  authorize_url: "https://api.23andme.com/authorize",
  access_url: "https://api.23andme.com/token",
  oauth: 2,
  scope_delimiter: " ",
});

export const _500PX = makeOauthFactory({
  id: "500px",
  title: "500px",
  request_url: "https://api.500px.com/v1/oauth/request_token",
  authorize_url: "https://api.500px.com/v1/oauth/authorize",
  website: "https://500px.com",
  access_url: "https://api.500px.com/v1/oauth/access_token",
  oauth: 1,
});

export const ActOn = makeOauthFactory({
  id: "acton",
  noLogo: true,
  title: "Act-On",
  authorize_url: "https://restapi.actonsoftware.com/authorize",
  access_url: "https://restapi.actonsoftware.com/token",
  website: "https://www.act-on.com",
  oauth: 2,
});

export const AcuityScheduling = makeOauthFactory({
  id: "acuityscheduling",
  noLogo: true,
  title: "Acuity Scheduling",
  authorize_url: "https://acuityscheduling.com/oauth2/authorize",
  access_url: "https://acuityscheduling.com/oauth2/token",
  website: "https://acuityscheduling.com",
  oauth: 2,
});

export const Adobe = makeOauthFactory({
  id: "adobe",
  title: "Adobe",
  authorize_url: "https://ims-na1.adobelogin.com/ims/authorize/v2",
  access_url: "https://ims-na1.adobelogin.com/ims/token/v3",
  website: "https://www.adobe.com",
  oauth: 2,
});

export const Aha = makeOauthFactory({
  id: "aha",
  title: "Aha!",
  authorize_url: "https://[subdomain].aha.io/oauth/authorize",
  access_url: "https://[subdomain].aha.io/oauth/token",
  website: "https://www.aha.io",
  oauth: 2,
});

export const Alchemer = makeOauthFactory({
  id: "alchemer",
  noLogo: true,
  title: "Alchemer",
  request_url: "https://api.alchemer.com/head/oauth/request_token",
  authorize_url: "https://api.alchemer.com/head/oauth/authenticate",
  website: "https://www.alchemer.com",
  access_url: "https://api.alchemer.com/head/oauth/access_token",
  oauth: 1,
});

export const Amazon = makeOauthFactory({
  id: "amazon",
  title: "Amazon",
  authorize_url: "https://www.amazon.com/ap/oa",
  access_url: "https://api.amazon.com/auth/o2/token",
  website: "https://www.amazon.com",
  oauth: 2,
  scope_delimiter: " ",
});

export const AngelList = makeOauthFactory({
  id: "angellist",
  title: "AngelList",
  authorize_url: "https://angel.co/api/oauth/authorize",
  access_url: "https://angel.co/api/oauth/token",
  website: "https://angel.co",
  oauth: 2,
  scope_delimiter: " ",
});

// export const Apple = make({
//   id: "apple",
//   title: "",
//   authorize_url: "https://appleid.apple.com/auth/authorize",
//   access_url: "https://appleid.apple.com/auth/token",
//   website: "",
//   oauth: 2,
//   scope_delimiter: " ",
// });

export const ArcGIS = makeOauthFactory({
  id: "arcgis",
  title: "ArcGIS",
  authorize_url: "https://www.arcgis.com/sharing/rest/oauth2/authorize",
  access_url: "https://www.arcgis.com/sharing/rest/oauth2/token",
  website: "https://www.arcgis.com",
  oauth: 2,
});

export const Asana = makeOauthFactory({
  id: "asana",
  title: "Asana",
  authorize_url: "https://app.asana.com/-/oauth_authorize",
  access_url: "https://app.asana.com/-/oauth_token",
  website: "https://asana.com",
  oauth: 2,
  scope_delimiter: " ",
});

export const Assembla = makeOauthFactory({
  id: "assembla",
  noLogo: true,
  title: "Assembla",
  authorize_url: "https://api.assembla.com/authorization",
  access_url: "https://api.assembla.com/token",
  website: "https://www.assembla.com",
  oauth: 2,
});

// export const Atlassian = make({
//   id: "atlassian",
//   title: "",
//   authorize_url: "https://auth.atlassian.com/authorize",
//   access_url: "https://auth.atlassian.com/oauth/token",
//   website: "",
//   oauth: 2,
//   scope_delimiter: " ",
// });

// export const Auth0 = make({
//   id: "auth0",
//   title: "",
//   authorize_url: "https://[subdomain].auth0.com/authorize",
//   access_url: "https://[subdomain].auth0.com/oauth/token",
//   website: "",
//   oauth: 2,
//   scope_delimiter: " ",
// });

export const Authentiq = makeOauthFactory({
  id: "authentiq",
  noLogo: true,
  title: "Authentiq",
  authorize_url: "https://connect.authentiq.io/sign-in",
  access_url: "https://connect.authentiq.io/token",
  website: "https://www.authentiq.com",
  oauth: 2,
  scope_delimiter: " ",
});

export const Authing = makeOauthFactory({
  id: "authing",
  noLogo: true,
  title: "Authing",
  authorize_url: "https://[subdomain].authing.cn/oidc/auth",
  access_url: "https://[subdomain].authing.cn/oidc/token",
  website: "https://www.authing.cn",
  oauth: 2,
  scope_delimiter: " ",
});

export const Autodesk = makeOauthFactory({
  id: "autodesk",
  title: "Autodesk",
  authorize_url:
    "https://developer.api.autodesk.com/authentication/v2/authorize",
  website: "https://www.autodesk.com",
  access_url: "https://developer.api.autodesk.com/authentication/v2/token",
  oauth: 2,
  scope_delimiter: " ",
});

export const AWeber = makeOauthFactory({
  id: "aweber",
  noLogo: true,
  title: "AWeber",
  authorize_url: "https://auth.aweber.com/oauth2/authorize",
  access_url: "https://auth.aweber.com/oauth2/token",
  website: "https://www.aweber.com",
  oauth: 2,
  scope_delimiter: " ",
});
export const Axosoft = makeOauthFactory({
  id: "axosoft",
  noLogo: true,
  title: "Axosoft",
  authorize_url: "https://[subdomain].axosoft.com/auth",
  access_url: "https://[subdomain].axosoft.com/api/oauth2/token",
  website: "https://www.axosoft.com",
  oauth: 2,
  scope_delimiter: " ",
});

export const Baidu = makeOauthFactory({
  id: "baidu",
  title: "Baidu",
  authorize_url: "https://openapi.baidu.com/oauth/2.0/authorize",
  access_url: "https://openapi.baidu.com/oauth/2.0/token",
  website: "https://www.baidu.com",
  oauth: 2,
});

export const Basecamp = makeOauthFactory({
  id: "basecamp",
  title: "Basecamp",
  authorize_url: "https://launchpad.37signals.com/authorization/new",
  access_url: "https://launchpad.37signals.com/authorization/token",
  website: "https://basecamp.com",
  oauth: 2,
});

// export const Battlenet = make({
//   id: "battlenet",
//   title: "",
//   authorize_url: "https://[subdomain].battle.net/oauth/authorize",
//   access_url: "https://[subdomain].battle.net/oauth/token",
//   website: "",
//   oauth: 2,
//   scope_delimiter: " ",
// });

export const Beatport = makeOauthFactory({
  id: "beatport",
  title: "Beatport",
  request_url: "https://oauth-api.beatport.com/identity/1/oauth/request-token",
  authorize_url: "https://oauth-api.beatport.com/identity/1/oauth/authorize",
  website: "https://www.beatport.com",
  access_url: "https://oauth-api.beatport.com/identity/1/oauth/access-token",
  oauth: 1,
});

export const Bitbucket = makeOauthFactory({
  id: "bitbucket",
  title: "Bitbucket",
  authorize_url: "https://bitbucket.org/site/oauth2/authorize",
  access_url: "https://bitbucket.org/site/oauth2/access_token",
  website: "https://bitbucket.org",
  oauth: 2,
  scope_delimiter: " ",
});

export const Bitly = makeOauthFactory({
  id: "bitly",
  title: "Bitly",
  authorize_url: "https://bitly.com/oauth/authorize",
  access_url: "https://api-ssl.bitly.com/oauth/access_token",
  website: "https://bitly.com",
  oauth: 2,
});

// export const Box = make({
//   id: "box",
//   title: "",
//   authorize_url: "https://api.box.com/oauth2/authorize",
//   access_url: "https://api.box.com/oauth2/token",
//   website: "",
//   oauth: 2,
//   scope_delimiter: " ",
// });

export const Buffer = makeOauthFactory({
  id: "buffer",
  title: "Buffer",
  authorize_url: "https://bufferapp.com/oauth2/authorize",
  access_url: "https://api.bufferapp.com/1/oauth2/token.json",
  website: "https://bufferapp.com",
  oauth: 2,
});

export const CampaignMonitor = makeOauthFactory({
  id: "campaignmonitor",
  title: "Campaign Monitor",
  authorize_url: "https://api.createsend.com/oauth",
  access_url: "https://api.createsend.com/oauth/token",
  website: "https://www.campaignmonitor.com",
  oauth: 2,
});

export const CAS = makeOauthFactory({
  id: "cas",
  title: "CAS",
  authorize_url: "https://[subdomain]/oidc/authorize",
  access_url: "https://[subdomain]/oidc/token",
  website: "https://www.apereo.org/projects/cas",
  oauth: 2,
});

export const Cheddar = makeOauthFactory({
  id: "cheddar",
  noLogo: true,
  title: "Cheddar",
  authorize_url: "https://api.cheddarapp.com/oauth/authorize",
  access_url: "https://api.cheddarapp.com/oauth/token",
  website: "https://cheddarapp.com",
  oauth: 2,
});

export const Clio = makeOauthFactory({
  id: "clio",
  noLogo: true,
  title: "Clio",
  authorize_url: "https://app.clio.com/oauth/authorize",
  access_url: "https://app.clio.com/oauth/token",
  website: "https://www.clio.com",
  oauth: 2,
});

// export const Cognito = make({
//   id: "cognito",
//   title: "",
//   authorize_url: "https://[subdomain]/oauth2/authorize",
//   access_url: "https://[subdomain]/oauth2/token",
//   website: "",
//   oauth: 2,
//   scope_delimiter: " ",
// });

// export const Coinbase = make({
//   id: "coinbase",
//   title: "",
//   authorize_url: "https://www.coinbase.com/oauth/authorize",
//   access_url: "https://www.coinbase.com/oauth/token",
//   website: "",
//   oauth: 2,
//   scope_delimiter: " ",
// });

export const Concur = makeOauthFactory({
  id: "concur",
  noLogo: true,
  title: "Concur",
  authorize_url:
    "https://[subdomain].api.concursolutions.com/oauth2/v0/authorize",
  website: "https://www.concur.com",
  access_url: "https://[subdomain].api.concursolutions.com/oauth2/v0/token",
  oauth: 2,
});

export const ConstantContact = makeOauthFactory({
  id: "constantcontact",
  noLogo: true,
  title: "Constant Contact",
  authorize_url:
    "https://oauth2.constantcontact.com/oauth2/oauth/siteowner/authorize",
  website: "https://www.constantcontact.com",
  access_url: "https://oauth2.constantcontact.com/oauth2/oauth/token",
  oauth: 2,
});

export const Coursera = makeOauthFactory({
  id: "coursera",
  title: "Coursera",
  authorize_url: "https://accounts.coursera.org/oauth2/v1/auth",
  access_url: "https://accounts.coursera.org/oauth2/v1/token",
  website: "https://www.coursera.org",
  oauth: 2,
  scope_delimiter: " ",
});

export const CrossID = makeOauthFactory({
  id: "crossid",
  noLogo: true,
  title: "CrossID",
  authorize_url: "https://[subdomain].crossid.io/oauth2/auth",
  access_url: "https://[subdomain].crossid.io/oauth2/token",
  website: "https://www.crossid.io",
  oauth: 2,
  scope_delimiter: " ",
});

export const Dailymotion = makeOauthFactory({
  id: "dailymotion",
  title: "Dailymotion",
  authorize_url: "https://www.dailymotion.com/oauth/authorize",
  access_url: "https://api.dailymotion.com/oauth/token",
  website: "https://www.dailymotion.com",
  oauth: 2,
});

export const Deezer = makeOauthFactory({
  id: "deezer",
  title: "Deezer",
  authorize_url: "https://connect.deezer.com/oauth/auth.php",
  access_url: "https://connect.deezer.com/oauth/access_token.php",
  website: "https://www.deezer.com",
  oauth: 2,
});

export const Delivery = makeOauthFactory({
  id: "delivery",
  noLogo: true,
  title: "Delivery",
  authorize_url: "https://api.delivery.com/third_party/authorize",
  access_url: "https://api.delivery.com/third_party/access_token",
  website: "https://www.delivery.com",
  oauth: 2,
});

export const Deputy = makeOauthFactory({
  id: "deputy",
  noLogo: true,
  title: "Deputy",
  authorize_url: "https://once.deputy.com/my/oauth/login",
  access_url: "https://once.deputy.com/my/oauth/access_token",
  website: "https://www.deputy.com",
  oauth: 2,
});

export const DeviantArt = makeOauthFactory({
  id: "deviantart",
  title: "DeviantArt",
  authorize_url: "https://www.deviantart.com/oauth2/authorize",
  access_url: "https://www.deviantart.com/oauth2/token",
  website: "https://www.deviantart.com",
  oauth: 2,
  scope_delimiter: " ",
});

export const DigitalOcean = makeOauthFactory({
  id: "digitalocean",
  title: "DigitalOcean",
  authorize_url: "https://cloud.digitalocean.com/v1/oauth/authorize",
  access_url: "https://cloud.digitalocean.com/v1/oauth/token",
  website: "https://www.digitalocean.com",
  oauth: 2,
  scope_delimiter: " ",
});

export const Discogs = makeOauthFactory({
  id: "discogs",
  title: "Discogs",
  request_url: "https://api.discogs.com/oauth/request_token",
  authorize_url: "https://discogs.com/oauth/authorize",
  website: "https://www.discogs.com",
  access_url: "https://api.discogs.com/oauth/access_token",
  oauth: 1,
});

// export const Discord = make({
//   id: "discord",
//   title: "",
//   authorize_url: "https://discord.com/api/oauth2/authorize",
//   access_url: "https://discord.com/api/oauth2/token",
//   website: "",
//   oauth: 2,
//   scope_delimiter: " ",
// });

export const Disqus = makeOauthFactory({
  id: "disqus",
  title: "Disqus",
  authorize_url: "https://disqus.com/api/oauth/2.0/authorize/",
  access_url: "https://disqus.com/api/oauth/2.0/access_token/",
  website: "https://www.disqus.com",
  oauth: 2,
});

export const Docusign = makeOauthFactory({
  id: "docusign",
  title: "DocuSign",
  authorize_url: "https://account.docusign.com/oauth/auth",
  access_url: "https://account.docusign.com/oauth/token",
  website: "https://www.docusign.com",
  oauth: 2,
});

export const Dribbble = makeOauthFactory({
  id: "dribbble",
  title: "Dribbble",
  authorize_url: "https://dribbble.com/oauth/authorize",
  access_url: "https://dribbble.com/oauth/token",
  website: "https://www.dribbble.com",
  oauth: 2,
  scope_delimiter: " ",
});

// export const Dropbox = make({
//   id: "dropbox",
//   title: "",
//   authorize_url: "https://www.dropbox.com/oauth2/authorize",
//   access_url: "https://api.dropboxapi.com/oauth2/token",
//   website: "",
//   oauth: 2,
// });

export const Ebay = makeOauthFactory({
  id: "ebay",
  title: "eBay",
  authorize_url: "https://signin.ebay.com/authorize",
  access_url: "https://api.ebay.com/identity/v1/oauth2/token",
  website: "https://www.ebay.com",
  oauth: 2,
  scope_delimiter: " ",
});

export const Echosign = makeOauthFactory({
  id: "echosign",
  noLogo: true,
  title: "Adobe Sign",
  authorize_url: "https://secure.echosign.com/public/oauth",
  access_url: "https://secure.echosign.com/oauth/token",
  website: "https://acrobat.adobe.com/us/en/sign.html",
  oauth: 2,
  scope_delimiter: " ",
});

export const Ecwid = makeOauthFactory({
  id: "ecwid",
  noLogo: true,
  title: "Ecwid",
  authorize_url: "https://my.ecwid.com/api/oauth/authorize",
  access_url: "https://my.ecwid.com/api/oauth/token",
  website: "https://www.ecwid.com",
  oauth: 2,
  scope_delimiter: " ",
});

export const Edmodo = makeOauthFactory({
  id: "edmodo",
  noLogo: true,
  title: "Edmodo",
  authorize_url: "https://api.edmodo.com/oauth/authorize",
  access_url: "https://api.edmodo.com/oauth/token",
  website: "https://www.edmodo.com",
  oauth: 2,
  scope_delimiter: " ",
});

export const Egnyte = makeOauthFactory({
  id: "egnyte",
  title: "Egnyte",
  authorize_url: "https://[subdomain].egnyte.com/puboauth/token",
  access_url: "https://[subdomain].egnyte.com/puboauth/token",
  website: "https://www.egnyte.com",
  oauth: 2,
  scope_delimiter: " ",
});

export const Etsy = makeOauthFactory({
  id: "etsy",
  title: "Etsy",
  request_url: "https://openapi.etsy.com/v2/oauth/request_token",
  authorize_url: "https://www.etsy.com/oauth/signin",
  website: "https://www.etsy.com",
  access_url: "https://openapi.etsy.com/v2/oauth/access_token",
  oauth: 1,
  scope_delimiter: " ",
});

export const Eventbrite = makeOauthFactory({
  id: "eventbrite",
  title: "Eventbrite",
  authorize_url: "https://www.eventbrite.com/oauth/authorize",
  access_url: "https://www.eventbrite.com/oauth/token",
  website: "https://www.eventbrite.com",
  oauth: 2,
});

export const Evernote = makeOauthFactory({
  id: "evernote",
  title: "Evernote",
  request_url: "https://www.evernote.com/oauth",
  authorize_url: "https://www.evernote.com/OAuth.action",
  website: "https://www.evernote.com",
  access_url: "https://www.evernote.com/oauth",
  oauth: 1,
});

export const EyeEm = makeOauthFactory({
  id: "eyeem",
  title: "EyeEm",
  authorize_url: "https://www.eyeem.com/oauth/authorize",
  access_url: "https://api.eyeem.com/v2/oauth/token",
  website: "https://www.eyeem.com",
  oauth: 2,
});

// export const Facebook = make({
//   id: "facebook",
//   title: "",
//   authorize_url: "https://www.facebook.com/dialog/oauth",
//   access_url: "https://graph.facebook.com/oauth/access_token",
//   website: "",
//   oauth: 2,
//   scope_delimiter: " ",
// });

export const FamilySearch = makeOauthFactory({
  id: "familysearch",
  noLogo: true,
  title: "FamilySearch",
  authorize_url:
    "https://ident.familysearch.org/cis-web/oauth2/v3/authorization",
  website: "https://www.familysearch.org",
  access_url: "https://ident.familysearch.org/cis-web/oauth2/v3/token",
  oauth: 2,
  scope_delimiter: " ",
});

export const Feedly = makeOauthFactory({
  id: "feedly",
  title: "Feedly",
  authorize_url: "https://cloud.feedly.com/v3/auth/auth",
  access_url: "https://cloud.feedly.com/v3/auth/token",
  website: "https://www.feedly.com",
  oauth: 2,
});

export const Figma = makeOauthFactory({
  id: "figma",
  title: "Figma",
  authorize_url: "https://www.figma.com/oauth",
  access_url: "https://www.figma.com/api/oauth/token",
  website: "https://www.figma.com",
  oauth: 2,
});

export const Fitbit = makeOauthFactory({
  id: "fitbit",
  title: "Fitbit",
  authorize_url: "https://www.fitbit.com/oauth2/authorize",
  access_url: "https://api.fitbit.com/oauth2/token",
  website: "https://www.fitbit.com",
  oauth: 2,
  scope_delimiter: " ",
});

export const Flickr = makeOauthFactory({
  id: "flickr",
  title: "Flickr",
  request_url: "https://www.flickr.com/services/oauth/request_token",
  authorize_url: "https://www.flickr.com/services/oauth/authorize",
  website: "https://www.flickr.com",
  access_url: "https://www.flickr.com/services/oauth/access_token",
  oauth: 1,
});

export const Formstack = makeOauthFactory({
  id: "formstack",
  title: "Formstack",
  authorize_url: "https://www.formstack.com/api/v2/oauth2/authorize",
  access_url: "https://www.formstack.com/api/v2/oauth2/token",
  website: "https://www.formstack.com",
  oauth: 2,
});

// export const Foursquare = make({
//   id: "foursquare",
//   title: "",
//   authorize_url: "https://foursquare.com/oauth2/authenticate",
//   access_url: "https://foursquare.com/oauth2/access_token",
//   website: "",
//   oauth: 2,
// });

export const FreeAgent = makeOauthFactory({
  id: "freeagent",
  noLogo: true,
  title: "FreeAgent",
  authorize_url: "https://api.freeagent.com/v2/approve_app",
  access_url: "https://api.freeagent.com/v2/token_endpoint",
  website: "https://www.freeagent.com",
  oauth: 2,
});

export const Freelancer = makeOauthFactory({
  id: "freelancer",
  title: "Freelancer",
  authorize_url: "https://accounts.freelancer.com/oauth/authorize",
  access_url: "https://accounts.freelancer.com/oauth/token",
  website: "https://www.freelancer.com",
  oauth: 2,
  scope_delimiter: " ",
});

// export const Freshbooks = make({
//   id: "freshbooks",
//   title: "",
//   request_url: "https://[subdomain].freshbooks.com/oauth/oauth_request.php",
//   authorize_url: "https://[subdomain].freshbooks.com/oauth/oauth_authorize.php",
//   website: "",
//   access_url: "https://[subdomain].freshbooks.com/oauth/oauth_access.php",
//   oauth: 1,
// });

// export const Fusionauth = make({
//   id: "fusionauth",
//   title: "",
//   authorize_url: "https://[subdomain]/oauth2/authorize",
//   access_url: "https://[subdomain]/oauth2/token",
//   website: "",
//   oauth: 2,
//   scope_delimiter: " ",
// });

export const Garmin = makeOauthFactory({
  id: "garmin",
  title: "Garmin",
  request_url:
    "https://connectapi.garmin.com/oauth-service/oauth/request_token",
  website: "https://connect.garmin.com",
  authorize_url: "https://connect.garmin.com/oauthConfirm",
  access_url: "https://connectapi.garmin.com/oauth-service/oauth/access_token",
  oauth: 1,
});

export const Geeklist = makeOauthFactory({
  id: "geeklist",
  noLogo: true,
  title: "Geeklist",
  request_url: "https://api.geekli.st/v1/oauth/request_token",
  authorize_url: "https://geekli.st/oauth/authorize",
  website: "https://geekli.st",
  access_url: "https://api.geekli.st/v1/oauth/access_token",
  oauth: 1,
});

export const Genius = makeOauthFactory({
  id: "genius",
  title: "Genius",
  authorize_url: "https://api.genius.com/oauth/authorize",
  access_url: "https://api.genius.com/oauth/token",
  website: "https://genius.com",
  oauth: 2,
  scope_delimiter: " ",
});

// FIXME
export const Getbase = makeOauthFactory({
  id: "getbase",
  noLogo: true,
  title: "Getbase",
  authorize_url: "https://api.getbase.com/oauth2/authorize",
  access_url: "https://api.getbase.com/oauth2/token",
  website: "https://www.getbase.com/sell/",
  oauth: 2,
  scope_delimiter: " ",
});

export const Pocket = makeOauthFactory({
  id: "pocket",
  title: "Pocket",
  request_url: "https://getpocket.com/v3/oauth/request",
  authorize_url: "https://getpocket.com/auth/authorize",
  website: "https://getpocket.com",
  access_url: "https://getpocket.com/v3/oauth/authorize",
  oauth: 1,
});

export const Gitbook = makeOauthFactory({
  id: "gitbook",
  title: "GitBook",
  authorize_url: "https://api.gitbook.com/oauth/authorize",
  access_url: "https://api.gitbook.com/oauth/access_token",
  website: "https://www.gitbook.com",
  oauth: 2,
});

// export const GitHub = makeOauthFactory({
// 	id: 'github',
// 	title: 'GitHub',
// 	authorize_url: 'https://github.com/login/oauth/authorize',
// 	access_url: 'https://github.com/login/oauth/access_token',
// 	website: 'https://github.com',
// 	oauth: 2,
// });

// export const Gitlab = make({
//   id: "gitlab",
//   title: "",
//   authorize_url: "https://gitlab.com/oauth/authorize",
//   access_url: "https://gitlab.com/oauth/token",
//   website: "",
//   oauth: 2,
//   scope_delimiter: " ",
// });

export const Gitter = makeOauthFactory({
  id: "gitter",
  title: "Gitter",
  authorize_url: "https://gitter.im/login/oauth/authorize",
  access_url: "https://gitter.im/login/oauth/token",
  website: "https://gitter.im",
  oauth: 2,
});

export const Goodreads = makeOauthFactory({
  id: "goodreads",
  title: "Goodreads",
  request_url: "https://www.goodreads.com/oauth/request_token",
  authorize_url: "https://www.goodreads.com/oauth/authorize",
  website: "https://www.goodreads.com",
  access_url: "https://www.goodreads.com/oauth/access_token",
  oauth: 1,
});

// export const Google = make({
//   id: "google",
//   title: "",
//   authorize_url: "https://accounts.google.com/o/oauth2/v2/auth",
//   access_url: "https://oauth2.googleapis.com/token",
//   website: "",
//   oauth: 2,
//   scope_delimiter: " ",
// });

export const Groove = makeOauthFactory({
  id: "groove",
  title: "Groove",
  authorize_url: "https://api.groovehq.com/oauth/authorize",
  access_url: "https://api.groovehq.com/oauth/token",
  website: "https://www.groovehq.com",
  oauth: 2,
});

export const Gumroad = makeOauthFactory({
  id: "gumroad",
  title: "Gumroad",
  authorize_url: "https://gumroad.com/oauth/authorize",
  access_url: "https://gumroad.com/oauth/token",
  website: "https://gumroad.com",
  oauth: 2,
  scope_delimiter: " ",
});

export const Harvest = makeOauthFactory({
  id: "harvest",
  title: "Harvest",
  authorize_url: "https://api.harvestapp.com/oauth2/authorize",
  access_url: "https://api.harvestapp.com/oauth2/token",
  website: "https://www.getharvest.com",
  oauth: 2,
});

export const HelloSign = makeOauthFactory({
  id: "hellosign",
  noLogo: true,
  title: "HelloSign",
  authorize_url: "https://www.hellosign.com/oauth/authorize",
  access_url: "https://www.hellosign.com/oauth/token",
  website: "https://www.hellosign.com",
  oauth: 2,
});

export const Heroku = makeOauthFactory({
  id: "heroku",
  title: "Heroku",
  authorize_url: "https://id.heroku.com/oauth/authorize",
  access_url: "https://id.heroku.com/oauth/token",
  website: "https://www.heroku.com",
  oauth: 2,
});

export const Homeaway = makeOauthFactory({
  id: "homeaway",
  title: "HomeAway",
  authorize_url: "https://ws.homeaway.com/oauth/authorize",
  access_url: "https://ws.homeaway.com/oauth/token",
  website: "https://www.homeaway.com",
  oauth: 2,
});

export const Hootsuite = makeOauthFactory({
  id: "hootsuite",
  title: "Hootsuite",
  authorize_url: "https://platform.hootsuite.com/oauth2/auth",
  access_url: "https://platform.hootsuite.com/oauth2/token",
  website: "https://hootsuite.com",
  oauth: 2,
});

export const Huddle = makeOauthFactory({
  id: "huddle",
  noLogo: true,
  title: "Huddle",
  authorize_url: "https://login.huddle.net/request",
  access_url: "https://login.huddle.net/token",
  website: "https://www.huddle.com",
  oauth: 2,
});

export const IBM = makeOauthFactory({
  id: "ibm",
  title: "IBM",
  authorize_url: "https://login.ibm.com/oidc/endpoint/default/authorize",
  access_url: "https://login.ibm.com/oidc/endpoint/default/token",
  website: "https://www.ibm.com",
  oauth: 2,
});

export const Iconfinder = makeOauthFactory({
  id: "iconfinder",
  title: "Iconfinder",
  authorize_url: "https://www.iconfinder.com/api/v2/oauth2/authorize",
  access_url: "https://www.iconfinder.com/api/v2/oauth2/token",
  website: "",
  oauth: 2,
});

export const IDme = makeOauthFactory({
  id: "idme",
  noLogo: true,
  title: "ID.me",
  authorize_url: "https://api.id.me/oauth/authorize",
  access_url: "https://api.id.me/oauth/token",
  website: "https://www.id.me",
  oauth: 2,
});

export const IDoneThis = makeOauthFactory({
  id: "idonethis",
  noLogo: true,
  title: "I Done This",
  authorize_url: "https://idonethis.com/api/oauth2/authorize/",
  access_url: "https://idonethis.com/api/oauth2/token/",
  website: "https://home.idonethis.com",
  oauth: 2,
});

export const Imgur = makeOauthFactory({
  id: "imgur",
  title: "Imgur",
  authorize_url: "https://api.imgur.com/oauth2/authorize",
  access_url: "https://api.imgur.com/oauth2/token",
  website: "https://imgur.com",
  oauth: 2,
});

export const Infusionsoft = makeOauthFactory({
  id: "infusionsoft",
  noLogo: true,
  title: "Infusionsoft",
  authorize_url: "https://signin.infusionsoft.com/app/oauth/authorize",
  access_url: "https://api.infusionsoft.com/token",
  website: "https://www.infusionsoft.com",
  oauth: 2,
});

// export const Instagram = make({
//   id: "instagram",
//   title: "",
//   authorize_url: "https://api.instagram.com/oauth/authorize",
//   access_url: "https://api.instagram.com/oauth/access_token",
//   website: "",
//   oauth: 2,
//   scope_delimiter: " ",
// });

export const Intuit = makeOauthFactory({
  id: "intuit",
  title: "Intuit",
  authorize_url: "https://appcenter.intuit.com/connect/oauth2",
  access_url: "https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer",
  website: "https://www.intuit.com",
  oauth: 2,
  scope_delimiter: " ",
});

export const Jamendo = makeOauthFactory({
  id: "jamendo",
  noLogo: true,
  title: "Jamendo",
  authorize_url: "https://api.jamendo.com/v3.0/oauth/authorize",
  access_url: "https://api.jamendo.com/v3.0/oauth/grant",
  website: "https://www.jamendo.com",
  oauth: 2,
});

export const Jumplead = makeOauthFactory({
  id: "jumplead",
  noLogo: true,
  title: "Jumplead",
  authorize_url: "https://account.mooloop.com/oauth/authorize",
  access_url: "https://account.mooloop.com/oauth/access_token",
  website: "https://www.jumplead.com",
  oauth: 2,
});

// export const Kakao = make({
//   id: "kakao",
//   title: "",
//   authorize_url: "https://kauth.kakao.com/oauth/authorize",
//   access_url: "https://kauth.kakao.com/oauth/token",
//   website: "",
//   oauth: 2,
// });

// export const Keycloak = make({
//   id: "keycloak",
//   title: "",
//   authorize_url: "https://[subdomain]/protocol/openid-connect/auth",
//   access_url: "https://[subdomain]/protocol/openid-connect/token",
//   website: "",
//   oauth: 2,
//   scope_delimiter: " ",
// });

// export const Line = make({
//   id: "line",
//   title: "",
//   authorize_url: "https://access.line.me/oauth2/v2.1/authorize",
//   access_url: "https://api.line.me/oauth2/v2.1/token",
//   website: "",
//   oauth: 2,
//   scope_delimiter: " ",
// });

// export const Linkedin = make({
//   id: "linkedin",
//   title: "",
//   authorize_url: "https://www.linkedin.com/oauth/v2/authorization",
//   access_url: "https://www.linkedin.com/oauth/v2/accessToken",
//   website: "",
//   oauth: 2,
//   scope_delimiter: " ",
// });

export const MicrosoftLive = makeOauthFactory({
  id: "live",
  title: "Microsoft Live",
  authorize_url: "https://login.live.com/oauth20_authorize.srf",
  access_url: "https://login.live.com/oauth20_token.srf",
  website: "https://live.com",
  oauth: 2,
});

export const LiveChat = makeOauthFactory({
  id: "livechat",
  title: "LiveChat",
  authorize_url: "https://accounts.livechatinc.com/",
  access_url: "https://accounts.livechatinc.com/token",
  website: "https://www.livechat.com",
  oauth: 2,
});

export const LoginGOV = makeOauthFactory({
  id: "logingov",
  title: "Login.gov",
  authorize_url: "https://idp.int.identitysandbox.gov/openid_connect/authorize",
  access_url: "https://idp.int.identitysandbox.gov/api/openid_connect/token",
  website: "https://login.gov",
  oauth: 2,
  scope_delimiter: " ",
});

export const Lyft = makeOauthFactory({
  id: "lyft",
  title: "Lyft",
  authorize_url: "https://api.lyft.com/oauth/authorize",
  access_url: "https://api.lyft.com/oauth/token",
  website: "https://www.lyft.com",
  oauth: 2,
  scope_delimiter: " ",
});

// export const Mailchimp = make({
//   id: "mailchimp",
//   title: "",
//   authorize_url: "https://login.mailchimp.com/oauth2/authorize",
//   access_url: "https://login.mailchimp.com/oauth2/token",
//   website: "",
//   oauth: 2,
// });

export const MailUp = makeOauthFactory({
  id: "mailup",
  noLogo: true,
  title: "MailUp",
  authorize_url:
    "https://services.mailup.com/Authorization/OAuth/Authorization",
  website: "https://www.mailup.com",
  access_url: "https://services.mailup.com/Authorization/OAuth/Token",
  oauth: 2,
});

export const Mailxpert = makeOauthFactory({
  id: "mailxpert",
  noLogo: true,
  title: "Mailxpert",
  authorize_url: "https://app.mailxpert.ch/oauth/v2/auth",
  access_url: "https://app.mailxpert.ch/oauth/v2/token",
  website: "https://www.mailxpert.ch",
  oauth: 2,
});

export const MapMyFitness = makeOauthFactory({
  id: "mapmyfitness",
  noLogo: true,
  title: "MapMyFitness",
  authorize_url: "https://www.mapmyfitness.com/v7.1/oauth2/uacf/authorize",
  access_url: "https://api.mapmyfitness.com/v7.1/oauth2/access_token",
  website: "https://www.mapmyfitness.com",
  oauth: 2,
});

export const Mastodon = makeOauthFactory({
  id: "mastodon",
  noLogo: true,
  title: "Mastodon",
  authorize_url: "https://[subdomain]/oauth/authorize",
  access_url: "https://[subdomain]/oauth/token",
  website: "https://joinmastodon.org",
  oauth: 2,
  scope_delimiter: " ",
});

// export const Medium = make({
//   id: "medium",
//   title: "",
//   authorize_url: "https://medium.com/m/oauth/authorize",
//   access_url: "https://api.medium.com/v1/tokens",
//   website: "",
//   oauth: 2,
// });

export const Meetup = makeOauthFactory({
  id: "meetup",
  title: "Meetup",
  authorize_url: "https://secure.meetup.com/oauth2/authorize",
  access_url: "https://secure.meetup.com/oauth2/access",
  website: "https://www.meetup.com",
  oauth: 2,
  scope_delimiter: " ",
});

export const Mendeley = makeOauthFactory({
  id: "mendeley",
  title: "Mendeley",
  authorize_url: "https://api.mendeley.com/oauth/authorize",
  access_url: "https://api.mendeley.com/oauth/token",
  website: "https://www.mendeley.com",
  oauth: 2,
});

export const Mention = makeOauthFactory({
  id: "mention",
  title: "Mention",
  authorize_url: "https://web.mention.com/authorize",
  access_url: "https://web.mention.net/oauth/v2/token",
  website: "https://mention.com",
  oauth: 2,
});

export const Microsoft = makeOauthFactory({
  id: "microsoft",
  title: "Microsoft",
  authorize_url:
    "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
  website: "https://www.microsoft.com",
  access_url: "https://login.microsoftonline.com/common/oauth2/v2.0/token",
  oauth: 2,
  scope_delimiter: " ",
});

export const Mixcloud = makeOauthFactory({
  id: "mixcloud",
  title: "Mixcloud",
  authorize_url: "https://www.mixcloud.com/oauth/authorize",
  access_url: "https://www.mixcloud.com/oauth/access_token",
  website: "https://www.mixcloud.com",
  oauth: 2,
});

export const Moxtra = makeOauthFactory({
  id: "moxtra",
  noLogo: true,
  title: "Moxtra",
  authorize_url: "https://api.moxtra.com/oauth/authorize",
  access_url: "https://api.moxtra.com/oauth/token",
  website: "https://www.moxtra.com",
  oauth: 2,
  scope_delimiter: " ",
});

export const MYOB = makeOauthFactory({
  id: "myob",
  title: "MYOB",
  authorize_url: "https://secure.myob.com/oauth2/account/authorize",
  access_url: "https://secure.myob.com/oauth2/v1/authorize",
  website: "https://www.myob.com",
  oauth: 2,
});

// export const Naver = make({
//   id: "naver",
//   title: "",
//   authorize_url: "https://nid.naver.com/oauth2.0/authorize",
//   access_url: "https://nid.naver.com/oauth2.0/token",
//   website: "",
//   oauth: 2,
// });

export const Nest = makeOauthFactory({
  id: "nest",
  title: "Nest",
  authorize_url: "https://home.nest.com/login/oauth2",
  access_url: "https://api.home.nest.com/oauth2/access_token",
  website: "https://www.nest.com",
  oauth: 2,
});

// export const Netlify = make({
//   id: "netlify",
//   title: "",
//   authorize_url: "https://app.netlify.com/authorize",
//   access_url: "https://api.netlify.com/oauth/token",
//   website: "",
//   oauth: 2,
// });

export const NokoTime = makeOauthFactory({
  id: "nokotime",
  noLogo: true,
  title: "NokoTime",
  authorize_url: "https://secure.nokotime.com/oauth/2/authorize",
  access_url: "https://secure.nokotime.com/oauth/2/access_token",
  website: "https://www.nokotime.com",
  oauth: 2,
});

export const Notion = makeOauthFactory({
  id: "notion",
  title: "Notion",
  authorize_url: "https://api.notion.com/v1/oauth/authorize",
  access_url: "https://api.notion.com/v1/oauth/token",
  website: "https://www.notion.so",
  oauth: 2,
});

export const Nylas = makeOauthFactory({
  id: "nylas",
  title: "Nylas",
  authorize_url: "https://api.nylas.com/oauth/authorize",
  access_url: "https://api.nylas.com/oauth/token",
  website: "https://www.nylas.com",
  oauth: 2,
});

// export const Okta = make({
//   id: "okta",
//   title: "",
//   authorize_url: "https://[subdomain].okta.com/oauth2/v1/authorize",
//   access_url: "https://[subdomain].okta.com/oauth2/v1/token",
//   website: "",
//   oauth: 2,
//   scope_delimiter: " ",
// });

// export const Onelogin = make({
//   id: "onelogin",
//   title: "",
//   authorize_url: "https://[subdomain].onelogin.com/oidc/auth",
//   access_url: "https://[subdomain].onelogin.com/oidc/token",
//   website: "",
//   oauth: 2,
//   scope_delimiter: " ",
// });

export const OpenStreetMap = makeOauthFactory({
  id: "openstreetmap",
  title: "OpenStreetMap",
  request_url: "https://www.openstreetmap.org/oauth/request_token",
  authorize_url: "https://www.openstreetmap.org/oauth/authorize",
  website: "https://www.openstreetmap.org",
  access_url: "https://www.openstreetmap.org/oauth/access_token",
  oauth: 1,
});

export const OpenStreetMap2 = makeOauthFactory({
  id: "openstreetmap2",
  noLogo: true,
  title: "OpenStreetMap",
  authorize_url: "https://www.openstreetmap.org/oauth2/authorize",
  access_url: "https://www.openstreetmap.org/oauth2/token",
  website: "https://www.openstreetmap.org",
  oauth: 2,
  scope_delimiter: " ",
});

export const Optimizely = makeOauthFactory({
  id: "optimizely",
  title: "Optimizely",
  authorize_url: "https://app.optimizely.com/oauth2/authorize",
  access_url: "https://app.optimizely.com/oauth2/token",
  website: "https://www.optimizely.com",
  oauth: 2,
});

// export const Osu = make({
//   id: "osu",
//   title: "",
//   authorize_url: "https://osu.ppy.sh/oauth/authorize",
//   access_url: "https://osu.ppy.sh/oauth/token",
//   website: "",
//   oauth: 2,
//   scope_delimiter: " ",
// });

// export const Patreon = make({
//   id: "patreon",
//   title: "",
//   authorize_url: "https://www.patreon.com/oauth2/authorize",
//   access_url: "https://www.patreon.com/api/oauth2/token",
//   website: "",
//   oauth: 2,
//   scope_delimiter: " ",
// });

export const PayPal = makeOauthFactory({
  id: "paypal",
  title: "PayPal",
  authorize_url:
    "https://www.paypal.com/webapps/auth/protocol/openidconnect/v1/authorize",
  website: "https://www.paypal.com",
  access_url: "https://api.paypal.com/v1/identity/openidconnect/tokenservice",
  oauth: 2,
  scope_delimiter: " ",
});

export const Phantauth = makeOauthFactory({
  id: "phantauth",
  noLogo: true,
  title: "Phantauth",
  authorize_url: "https://phantauth.net/auth/authorize",
  access_url: "https://phantauth.net/auth/token",
  website: "https://www.phantauth.net",
  oauth: 2,
  scope_delimiter: " ",
});

// export const Pinterest = make({
//   id: "pinterest",
//   title: "",
//   authorize_url: "https://api.pinterest.com/oauth/",
//   access_url: "https://api.pinterest.com/v1/oauth/token",
//   website: "",
//   oauth: 2,
// });

export const Plurk = makeOauthFactory({
  id: "plurk",
  title: "Plurk",
  request_url: "https://www.plurk.com/OAuth/request_token",
  authorize_url: "https://www.plurk.com/OAuth/authorize",
  website: "https://www.plurk.com",
  access_url: "https://www.plurk.com/OAuth/access_token",
  oauth: 1,
});

export const Podio = makeOauthFactory({
  id: "podio",
  title: "Podio",
  authorize_url: "https://podio.com/oauth/authorize",
  access_url: "https://podio.com/oauth/token",
  website: "https://www.podio.com",
  oauth: 2,
});

export const Procore = makeOauthFactory({
  id: "procore",
  title: "Procore",
  authorize_url: "https://login.procore.com/oauth/authorize",
  access_url: "https://login.procore.com/oauth/token",
  website: "https://www.procore.com",
  oauth: 2,
});

export const ProductHunt = makeOauthFactory({
  id: "producthunt",
  title: "Product Hunt",
  authorize_url: "https://api.producthunt.com/v1/oauth/authorize",
  access_url: "https://api.producthunt.com/v1/oauth/token",
  website: "https://www.producthunt.com",
  oauth: 2,
  scope_delimiter: " ",
});

export const Projectplace = makeOauthFactory({
  id: "projectplace",
  noLogo: true,
  title: "Projectplace",
  request_url: "https://api.projectplace.com/initiate",
  authorize_url: "https://api.projectplace.com/authorize",
  website: "https://www.projectplace.com",
  access_url: "https://api.projectplace.com/token",
  oauth: 1,
});

export const Projectplace2 = makeOauthFactory({
  id: "projectplace2",
  noLogo: true,
  title: "Projectplace",
  authorize_url: "https://api.projectplace.com/oauth2/authorize",
  access_url: "https://api.projectplace.com/oauth2/access_token",
  website: "https://www.projectplace.com",
  oauth: 2,
});

export const Pushbullet = makeOauthFactory({
  id: "pushbullet",
  title: "Pushbullet",
  authorize_url: "https://www.pushbullet.com/authorize",
  access_url: "https://api.pushbullet.com/oauth2/token",
  website: "https://pushbullet.com",
  oauth: 2,
});

export const Qq = makeOauthFactory({
  id: "qq",
  noLogo: true,
  title: "Qq",
  authorize_url: "https://graph.qq.com/oauth2.0/authorize",
  access_url: "https://graph.qq.com/oauth2.0/token",
  website: "https://qq.com",
  oauth: 2,
});

export const Ravelry = makeOauthFactory({
  id: "ravelry",
  title: "Ravelry",
  request_url: "https://www.ravelry.com/oauth/request_token",
  authorize_url: "https://www.ravelry.com/oauth/authorize",
  website: "https://ravelry.com",
  access_url: "https://www.ravelry.com/oauth/access_token",
  oauth: 1,
  scope_delimiter: " ",
});

export const Redbooth = makeOauthFactory({
  id: "redbooth",
  noLogo: true,
  title: "Redbooth",
  authorize_url: "https://redbooth.com/oauth2/authorize",
  access_url: "https://redbooth.com/oauth2/token",
  website: "https://redbooth.com",
  oauth: 2,
});

// export const Reddit = make({
//   id: "reddit",
//   title: "",
//   authorize_url: "https://ssl.reddit.com/api/v1/authorize",
//   access_url: "https://ssl.reddit.com/api/v1/access_token",
//   website: "",
//   oauth: 2,
// });

export const Runkeeper = makeOauthFactory({
  id: "runkeeper",
  title: "Runkeeper",
  authorize_url: "https://runkeeper.com/apps/authorize",
  access_url: "https://runkeeper.com/apps/token",
  website: "https://runkeeper.com",
  oauth: 2,
});

// export const Salesforce = make({
//   id: "salesforce",
//   title: "",
//   authorize_url: "https://login.salesforce.com/services/oauth2/authorize",
//   access_url: "https://login.salesforce.com/services/oauth2/token",
//   website: "",
//   oauth: 2,
//   scope_delimiter: " ",
// });

export const Sellsy = makeOauthFactory({
  id: "sellsy",
  noLogo: true,
  title: "Sellsy",
  request_url: "https://apifeed.sellsy.com/0/request_token",
  authorize_url: "https://apifeed.sellsy.com/0/login.php",
  website: "https://sellsy.com",
  access_url: "https://apifeed.sellsy.com/0/oauth/access_token",
  oauth: 1,
});

export const Shoeboxed = makeOauthFactory({
  id: "shoeboxed",
  noLogo: true,
  title: "Shoeboxed",
  authorize_url: "https://id.shoeboxed.com/oauth/authorize",
  access_url: "https://id.shoeboxed.com/oauth/token",
  website: "https://shoeboxed.com",
  oauth: 2,
});

export const Shopify = makeOauthFactory({
  id: "shopify",
  title: "Shopify",
  authorize_url: "https://[subdomain].myshopify.com/admin/oauth/authorize",
  access_url: "https://[subdomain].myshopify.com/admin/oauth/access_token",
  website: "https://shopify.com",
  oauth: 2,
});

export const Skyrock = makeOauthFactory({
  id: "skyrock",
  title: "Skyrock",
  request_url: "https://api.skyrock.com/v2/oauth/initiate",
  authorize_url: "https://api.skyrock.com/v2/oauth/authorize",
  website: "https://skyrock.com",
  access_url: "https://api.skyrock.com/v2/oauth/token",
  oauth: 1,
});

// export const Slack = make({
//   id: "slack",
//   title: "",
//   authorize_url: "https://slack.com/oauth/authorize",
//   access_url: "https://slack.com/api/oauth.access",
//   website: "",
//   oauth: 2,
// });

export const Slice = makeOauthFactory({
  id: "slice",
  title: "Slice",
  authorize_url: "https://api.slice.com/oauth/authorize",
  access_url: "https://api.slice.com/oauth/token",
  website: "https://slice.com",
  oauth: 2,
});

export const Smartsheet = makeOauthFactory({
  id: "smartsheet",
  noLogo: true,
  title: "Smartsheet",
  authorize_url: "https://app.smartsheet.com/b/authorize",
  access_url: "https://api.smartsheet.com/2.0/token",
  website: "https://smartsheet.com",
  oauth: 2,
  scope_delimiter: " ",
});

export const Smugmug = makeOauthFactory({
  id: "smugmug",
  title: "Smugmug",
  request_url: "https://api.smugmug.com/services/oauth/1.0a/getRequestToken",
  authorize_url: "https://api.smugmug.com/services/oauth/1.0a/authorize",
  website: "https://smugmug.com",
  access_url: "https://api.smugmug.com/services/oauth/1.0a/getAccessToken",
  oauth: 1,
});

export const Snapchat = makeOauthFactory({
  id: "snapchat",
  title: "Snapchat",
  authorize_url: "https://accounts.snapchat.com/accounts/oauth2/auth",
  access_url: "https://accounts.snapchat.com/accounts/oauth2/token",
  website: "https://snapchat.com",
  oauth: 2,
  scope_delimiter: " ",
});

export const Snowflake = makeOauthFactory({
  id: "snowflake",
  title: "Snowflake",
  authorize_url: "https://[subdomain].snowflakecomputing.com/oauth/authorize",
  access_url: "https://[subdomain].snowflakecomputing.com/oauth/token-request",
  website: "https://www.snowflake.com",
  oauth: 2,
  scope_delimiter: " ",
});

export const SocialPilot = makeOauthFactory({
  id: "socialpilot",
  noLogo: true,
  title: "SocialPilot",
  authorize_url: "https://panel.socialpilot.co/oauth",
  access_url: "https://panel.socialpilot.co/oauth/accesstoken",
  website: "https://www.socialpilot.co",
  oauth: 2,
});

export const Socrata = makeOauthFactory({
  id: "socrata",
  noLogo: true,
  title: "Socrata",
  authorize_url: "https://[subdomain]/oauth/authorize",
  access_url: "https://[subdomain]/oauth/access_token",
  website: "https://www.socrata.com",
  oauth: 2,
});

export const SoundCloud = makeOauthFactory({
  id: "soundcloud",
  title: "SoundCloud",
  authorize_url: "https://soundcloud.com/connect",
  access_url: "https://api.soundcloud.com/oauth2/token",
  website: "https://soundcloud.com",
  oauth: 2,
});

// export const Spotify = make({
//   id: "spotify",
//   title: "",
//   authorize_url: "https://accounts.spotify.com/authorize",
//   access_url: "https://accounts.spotify.com/api/token",
//   website: "",
//   oauth: 2,
//   scope_delimiter: " ",
// });

export const Square = makeOauthFactory({
  id: "square",
  title: "Square",
  authorize_url: "https://connect.squareup.com/oauth2/authorize",
  access_url: "https://connect.squareup.com/oauth2/token",
  website: "https://squareup.com",
  oauth: 2,
  scope_delimiter: " ",
});

export const StackExchange = makeOauthFactory({
  id: "stackexchange",
  title: "Stack Exchange",
  authorize_url: "https://stackexchange.com/oauth",
  access_url: "https://stackexchange.com/oauth/access_token",
  website: "https://stackexchange.com",
  oauth: 2,
});

export const Stocktwits = makeOauthFactory({
  id: "stocktwits",
  noLogo: true,
  title: "Stocktwits",
  authorize_url: "https://api.stocktwits.com/api/2/oauth/authorize",
  access_url: "https://api.stocktwits.com/api/2/oauth/token",
  website: "https://stocktwits.com",
  oauth: 2,
});

export const Stormz = makeOauthFactory({
  id: "stormz",
  noLogo: true,
  title: "Stormz",
  authorize_url: "https://stormz.me/oauth/authorize",
  access_url: "https://stormz.me/oauth/token",
  website: "https://stormz.me",
  oauth: 2,
  scope_delimiter: " ",
});

export const Storyblok = makeOauthFactory({
  id: "storyblok",
  title: "Storyblok",
  authorize_url: "https://app.storyblok.com/oauth/authorize",
  access_url: "https://app.storyblok.com/oauth/token",
  website: "https://www.storyblok.com",
  oauth: 2,
  scope_delimiter: " ",
});

// export const Strava = make({
//   id: "strava",
//   title: "",
//   authorize_url: "https://www.strava.com/oauth/authorize",
//   access_url: "https://www.strava.com/oauth/token",
//   website: "",
//   oauth: 2,
// });

export const Stripe = makeOauthFactory({
  id: "stripe",
  title: "Stripe",
  authorize_url: "https://connect.stripe.com/oauth/authorize",
  access_url: "https://connect.stripe.com/oauth/token",
  website: "https://stripe.com",
  oauth: 2,
});

export const SurveyMonkey = makeOauthFactory({
  id: "surveymonkey",
  title: "SurveyMonkey",
  authorize_url: "https://api.surveymonkey.com/oauth/authorize",
  access_url: "https://api.surveymonkey.net/oauth/token",
  website: "https://www.surveymonkey.com",
  oauth: 2,
});

export const SurveysParrow = makeOauthFactory({
  id: "surveysparrow",
  noLogo: true,
  title: "SurveySparrow",
  authorize_url: "https://app.surveysparrow.com/o/oauth/auth",
  access_url: "https://app.surveysparrow.com/o/oauth/token",
  website: "https://surveysparrow.com",
  oauth: 2,
});

export const Thingiverse = makeOauthFactory({
  id: "thingiverse",
  title: "Thingiverse",
  authorize_url: "https://www.thingiverse.com/login/oauth/authorize",
  access_url: "https://www.thingiverse.com/login/oauth/access_token",
  website: "https://www.thingiverse.com",
  oauth: 2,
});

export const Ticketbud = makeOauthFactory({
  id: "ticketbud",
  noLogo: true,
  title: "Ticketbud",
  authorize_url: "https://api.ticketbud.com/oauth/authorize",
  access_url: "https://api.ticketbud.com/oauth/token",
  website: "https://www.ticketbud.com",
  oauth: 2,
});

export const TikTok = makeOauthFactory({
  id: "tiktok",
  title: "TikTok",
  authorize_url: "https://open-api.tiktok.com/platform/oauth/connect/",
  access_url: "https://open-api.tiktok.com/oauth/access_token/",
  website: "https://www.tiktok.com",
  oauth: 2,
});

export const Timely = makeOauthFactory({
  id: "timely",
  noLogo: true,
  title: "Timely",
  authorize_url: "https://api.timelyapp.com/1.1/oauth/authorize",
  access_url: "https://api.timelyapp.com/1.1/oauth/token",
  website: "https://www.timelyapp.com",
  oauth: 2,
});

// export const Todoist = make({
//   id: "todoist",
//   title: "",
//   authorize_url: "https://todoist.com/oauth/authorize",
//   access_url: "https://todoist.com/oauth/access_token",
//   website: "",
//   oauth: 2,
// });

// export const Trakt = make({
//   id: "trakt",
//   title: "",
//   authorize_url: "https://api-v2launch.trakt.tv/oauth/authorize",
//   access_url: "https://api-v2launch.trakt.tv/oauth/token",
//   website: "",
//   oauth: 2,
// });

export const Traxo = makeOauthFactory({
  id: "traxo",
  noLogo: true,
  title: "Traxo",
  authorize_url: "https://www.traxo.com/oauth/authenticate",
  access_url: "https://www.traxo.com/oauth/token",
  website: "https://www.traxo.com",
  oauth: 2,
});

export const Trello = makeOauthFactory({
  id: "trello",
  title: "Trello",
  request_url: "https://trello.com/1/OAuthGetRequestToken",
  authorize_url: "https://trello.com/1/OAuthAuthorizeToken",
  website: "https://trello.com",
  access_url: "https://trello.com/1/OAuthGetAccessToken",
  oauth: 1,
});

export const TripIt = makeOauthFactory({
  id: "tripit",
  noLogo: true,
  title: "TripIt",
  request_url: "https://api.tripit.com/oauth/request_token",
  authorize_url: "https://www.tripit.com/oauth/authorize",
  website: "https://www.tripit.com",
  access_url: "https://api.tripit.com/oauth/access_token",
  oauth: 1,
});

export const Trustpilot = makeOauthFactory({
  id: "trustpilot",
  title: "Trustpilot",
  authorize_url: "https://authenticate.trustpilot.com",
  access_url:
    "https://api.trustpilot.com/v1/oauth/oauth-business-users-for-applications/accesstoken",
  website: "https://www.trustpilot.com",
  oauth: 2,
});

export const Tumblr = makeOauthFactory({
  id: "tumblr",
  title: "Tumblr",
  request_url: "https://www.tumblr.com/oauth/request_token",
  authorize_url: "https://www.tumblr.com/oauth/authorize",
  website: "https://www.tumblr.com",
  access_url: "https://www.tumblr.com/oauth/access_token",
  oauth: 1,
});

// export const Twitch = make({
//   id: "twitch",
//   title: "",
//   authorize_url: "https://id.twitch.tv/oauth2/authorize",
//   access_url: "https://id.twitch.tv/oauth2/token",
//   website: "",
//   oauth: 2,
//   scope_delimiter: " ",
// });

// export const Twitter = make({
//   id: "twitter",
//   title: "",
//   request_url: "https://api.twitter.com/oauth/request_token",
//   authorize_url: "https://api.twitter.com/oauth/authenticate",
//   website: "",
//   access_url: "https://api.twitter.com/oauth/access_token",
//   oauth: 1,
// });

export const Twitter = makeOauthFactory({
  id: "twitter",
  title: "Twitter",
  authorize_url: "https://twitter.com/i/oauth2/authorize",
  access_url: "https://api.twitter.com/2/oauth2/token",
  website: "https://twitter.com",
  oauth: 2,
  scope_delimiter: " ",
});

export const Typeform = makeOauthFactory({
  id: "typeform",
  title: "Typeform",
  authorize_url: "https://api.typeform.com/oauth/authorize",
  access_url: "https://api.typeform.com/oauth/token",
  website: "https://www.typeform.com",
  oauth: 2,
  scope_delimiter: " ",
});

export const Uber = makeOauthFactory({
  id: "uber",
  title: "Uber",
  authorize_url: "https://login.uber.com/oauth/authorize",
  access_url: "https://login.uber.com/oauth/token",
  website: "https://www.uber.com",
  oauth: 2,
});

export const Unbounce = makeOauthFactory({
  id: "unbounce",
  title: "Unbounce",
  authorize_url: "https://api.unbounce.com/oauth/authorize",
  access_url: "https://api.unbounce.com/oauth/token",
  website: "https://www.unbounce.com",
  oauth: 2,
});

export const UnderArmour = makeOauthFactory({
  id: "underarmour",
  title: "Under Armour",
  authorize_url: "https://www.mapmyfitness.com/v7.1/oauth2/uacf/authorize",
  access_url: "https://api.mapmyfitness.com/v7.1/oauth2/access_token",
  website: "https://www.underarmour.com",
  oauth: 2,
});

export const Unsplash = makeOauthFactory({
  id: "unsplash",
  title: "Unsplash",
  authorize_url: "https://unsplash.com/oauth/authorize",
  access_url: "https://unsplash.com/oauth/token",
  website: "https://unsplash.com",
  oauth: 2,
  scope_delimiter: "+",
});

export const Untappd = makeOauthFactory({
  id: "untappd",
  title: "Untappd",
  authorize_url: "https://untappd.com/oauth/authenticate",
  access_url: "https://untappd.com/oauth/authorize",
  website: "https://untappd.com",
  oauth: 2,
});

export const Upwork = makeOauthFactory({
  id: "upwork",
  title: "Upwork",
  request_url: "https://www.upwork.com/api/auth/v1/oauth/token/request",
  authorize_url: "https://www.upwork.com/services/api/auth",
  website: "https://www.upwork.com",
  access_url: "https://www.upwork.com/api/auth/v1/oauth/token/access",
  oauth: 1,
});

export const UserVoice = makeOauthFactory({
  id: "uservoice",
  title: "UserVoice",
  request_url: "https://outofindex.uservoice.com/oauth/request_token",
  authorize_url: "https://outofindex.uservoice.com/oauth/authorize",
  website: "https://www.uservoice.com",
  access_url: "https://outofindex.uservoice.com/oauth/access_token",
  oauth: 1,
});

export const Vend = makeOauthFactory({
  id: "vend",
  noLogo: true,
  title: "Vend",
  authorize_url: "https://secure.vendhq.com/connect",
  access_url: "https://[subdomain].vendhq.com/api/1.0/token",
  website: "https://www.vendhq.com",
  oauth: 2,
});

export const Venmo = makeOauthFactory({
  id: "venmo",
  title: "Venmo",
  authorize_url: "https://api.venmo.com/v1/oauth/authorize",
  access_url: "https://api.venmo.com/v1/oauth/access_token",
  website: "https://venmo.com",
  oauth: 2,
  scope_delimiter: " ",
});

export const Vercel = makeOauthFactory({
  id: "vercel",
  title: "Vercel",
  authorize_url: "https://vercel.com/oauth/authorize",
  access_url: "https://api.vercel.com/v2/oauth/access_token",
  website: "https://vercel.com",
  oauth: 2,
});

export const VerticalResponse = makeOauthFactory({
  id: "verticalresponse",
  noLogo: true,
  title: "VerticalResponse",
  authorize_url: "https://vrapi.verticalresponse.com/api/v1/oauth/authorize",
  access_url: "https://vrapi.verticalresponse.com/api/v1/oauth/access_token",
  website: "https://www.verticalresponse.com",
  oauth: 2,
});

export const Viadeo = makeOauthFactory({
  id: "viadeo",
  title: "Viadeo",
  authorize_url: "https://partners.viadeo.com/oauth/authorize",
  access_url: "https://partners.viadeo.com/oauth/token",
  website: "https://www.viadeo.com",
  oauth: 2,
});

export const Vimeo = makeOauthFactory({
  id: "vimeo",
  title: "Vimeo",
  authorize_url: "https://api.vimeo.com/oauth/authorize",
  access_url: "https://api.vimeo.com/oauth/access_token",
  website: "https://vimeo.com",
  oauth: 2,
  scope_delimiter: " ",
});

export const VisualStudio = makeOauthFactory({
  id: "visualstudio",
  title: "Visual Studio",
  authorize_url: "https://app.vssps.visualstudio.com/oauth2/authorize",
  access_url: "https://app.vssps.visualstudio.com/oauth2/token",
  website: "https://visualstudio.microsoft.com",
  oauth: 2,
  scope_delimiter: " ",
});

// export const Vk = make({
//   id: "vk",
//   title: "",
//   authorize_url: "https://oauth.vk.com/authorize",
//   access_url: "https://oauth.vk.com/access_token",
//   website: "",
//   oauth: 2,
// });

export const WeChat = makeOauthFactory({
  id: "wechat",
  title: "WeChat",
  authorize_url: "https://open.weixin.qq.com/connect/oauth2/authorize",
  access_url: "https://api.weixin.qq.com/sns/oauth2/access_token",
  website: "https://wechat.com",
  oauth: 2,
});

export const Weekdone = makeOauthFactory({
  id: "weekdone",
  noLogo: true,
  title: "Weekdone",
  authorize_url: "https://weekdone.com/oauth_authorize",
  access_url: "https://weekdone.com/oauth_token",
  website: "https://weekdone.com",
  oauth: 2,
});

export const Weibo = makeOauthFactory({
  id: "weibo",
  title: "Weibo",
  authorize_url: "https://api.weibo.com/oauth2/authorize",
  access_url: "https://api.weibo.com/oauth2/access_token",
  website: "https://weibo.com",
  oauth: 2,
});

export const Withings = makeOauthFactory({
  id: "withings",
  noLogo: true,
  title: "Withings",
  authorize_url: "https://account.withings.com/oauth2_user/authorize2",
  access_url: "https://wbsapi.withings.net/v2/oauth2",
  website: "https://www.withings.com",
  oauth: 2,
});

// export const Wordpress = make({
//   id: "wordpress",
//   title: "",
//   authorize_url: "https://public-api.wordpress.com/oauth2/authorize",
//   access_url: "https://public-api.wordpress.com/oauth2/token",
//   website: "",
//   oauth: 2,
// });

// export const Workos = make({
//   id: "workos",
//   title: "",
//   authorize_url: "https://api.workos.com/sso/authorize",
//   access_url: "https://api.workos.com/sso/token",
//   website: "",
//   oauth: 2,
// });

export const Wrike = makeOauthFactory({
  id: "wrike",
  title: "Wrike",
  authorize_url: "https://www.wrike.com/oauth2/authorize",
  access_url: "https://www.wrike.com/oauth2/token",
  website: "https://www.wrike.com",
  oauth: 2,
});

export const Xero = makeOauthFactory({
  id: "xero",
  title: "Xero",
  request_url: "https://api.xero.com/oauth/RequestToken",
  authorize_url: "https://api.xero.com/oauth/Authorize",
  website: "https://www.xero.com",
  access_url: "https://api.xero.com/oauth/AccessToken",
  oauth: 1,
});

export const Xing = makeOauthFactory({
  id: "xing",
  title: "Xing",
  request_url: "https://api.xing.com/v1/request_token",
  authorize_url: "https://api.xing.com/v1/authorize",
  website: "https://www.xing.com",
  access_url: "https://api.xing.com/v1/access_token",
  oauth: 1,
});

export const Yahoo = makeOauthFactory({
  id: "yahoo",
  title: "Yahoo",
  authorize_url: "https://api.login.yahoo.com/oauth2/request_auth",
  access_url: "https://api.login.yahoo.com/oauth2/get_token",
  website: "https://www.yahoo.com",
  oauth: 2,
});

export const Yammer = makeOauthFactory({
  id: "yammer",
  title: "Yammer",
  authorize_url: "https://www.yammer.com/dialog/oauth",
  access_url: "https://www.yammer.com/oauth2/access_token.json",
  website: "https://www.yammer.com",
  oauth: 2,
});

// export const Yandex = make({
//   id: "yandex",
//   title: "",
//   authorize_url: "https://oauth.yandex.com/authorize",
//   access_url: "https://oauth.yandex.com/token",
//   website: "",
//   oauth: 2,
// });

export const Zendesk = makeOauthFactory({
  id: "zendesk",
  title: "Zendesk",
  authorize_url: "https://[subdomain].zendesk.com/oauth/authorizations/new",
  access_url: "https://[subdomain].zendesk.com/oauth/tokens",
  website: "https://www.zendesk.com",
  oauth: 2,
  scope_delimiter: " ",
});

// export const Zoom = make({
//   id: "zoom",
//   title: "",
//   authorize_url: "https://zoom.us/oauth/authorize",
//   access_url: "https://zoom.us/oauth/token",
//   website: "",
//   oauth: 2,
//   scope_delimiter: " ",
// });
