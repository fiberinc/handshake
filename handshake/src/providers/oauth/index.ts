import { HandlerFactory } from "~/core/Handler";
import { makeHandlerFactory } from "../lib/makeHandler";

function makeOauthFactory(info: any) {
  return makeHandlerFactory({
    id: info.id,
    metadata: {
      title: info.title,
      logo: "info.svg",
    },
    name: info.title,
    type: "oauth",
    authorization: {
      url: info.authorize_url,
    },
    token: {
      url: info.access_url,
    },
  }) satisfies HandlerFactory<any>;
}

export const _23andme = makeOauthFactory({
  id: "23andme",
  website: "",
  title: "23andme",
  authorize_url: "https://api.23andme.com/authorize",
  access_url: "https://api.23andme.com/token",
  oauth: 2,
  scope_delimiter: " ",
});

export const _500px = makeOauthFactory({
  id: "500px",
  website: "",
  title: "500px",
  request_url: "https://api.500px.com/v1/oauth/request_token",
  authorize_url: "https://api.500px.com/v1/oauth/authorize",
  access_url: "https://api.500px.com/v1/oauth/access_token",
  oauth: 1,
});

export const Acton = makeOauthFactory({
  id: "acton",
  website: "",
  title: "Acton",
  authorize_url: "https://restapi.actonsoftware.com/authorize",
  access_url: "https://restapi.actonsoftware.com/token",
  oauth: 2,
});

export const AcuityScheduling = makeOauthFactory({
  id: "acuityscheduling",
  website: "",
  title: "Acuity Scheduling",
  authorize_url: "https://acuityscheduling.com/oauth2/authorize",
  access_url: "https://acuityscheduling.com/oauth2/token",
  oauth: 2,
});

export const Adobe = makeOauthFactory({
  id: "adobe",
  website: "",
  title: "Adobe",
  authorize_url: "https://ims-na1.adobelogin.com/ims/authorize/v2",
  access_url: "https://ims-na1.adobelogin.com/ims/token/v3",
  oauth: 2,
});

export const Aha = makeOauthFactory({
  id: "aha",
  website: "",
  title: "Aha",
  authorize_url: "https://[subdomain].aha.io/oauth/authorize",
  access_url: "https://[subdomain].aha.io/oauth/token",
  oauth: 2,
});

export const Alchemer = makeOauthFactory({
  id: "alchemer",
  website: "",
  title: "Alchemer",
  request_url: "https://api.alchemer.com/head/oauth/request_token",
  authorize_url: "https://api.alchemer.com/head/oauth/authenticate",
  access_url: "https://api.alchemer.com/head/oauth/access_token",
  oauth: 1,
});

export const Amazon = makeOauthFactory({
  id: "amazon",
  website: "",
  title: "Amazon",
  authorize_url: "https://www.amazon.com/ap/oa",
  access_url: "https://api.amazon.com/auth/o2/token",
  oauth: 2,
  scope_delimiter: " ",
});

export const Angellist = makeOauthFactory({
  id: "angellist",
  website: "",
  title: "AngelList",
  authorize_url: "https://angel.co/api/oauth/authorize",
  access_url: "https://angel.co/api/oauth/token",
  oauth: 2,
  scope_delimiter: " ",
});

// export const Apple = make({
//   id: "apple",
//   website: "",
//   title: "Apple",
//   authorize_url: "https://appleid.apple.com/auth/authorize",
//   access_url: "https://appleid.apple.com/auth/token",
//   oauth: 2,
//   scope_delimiter: " ",
// });

export const Arcgis = makeOauthFactory({
  id: "arcgis",
  website: "",
  title: "Arcgis",
  authorize_url: "https://www.arcgis.com/sharing/rest/oauth2/authorize",
  access_url: "https://www.arcgis.com/sharing/rest/oauth2/token",
  oauth: 2,
});

export const Asana = makeOauthFactory({
  id: "asana",
  website: "",
  title: "Asana",
  authorize_url: "https://app.asana.com/-/oauth_authorize",
  access_url: "https://app.asana.com/-/oauth_token",
  oauth: 2,
  scope_delimiter: " ",
});

export const Assembla = makeOauthFactory({
  id: "assembla",
  website: "",
  title: "Assembla",
  authorize_url: "https://api.assembla.com/authorization",
  access_url: "https://api.assembla.com/token",
  oauth: 2,
});

// export const Atlassian = make({
//   id: "atlassian",
//   website: "",
//   title: "Atlassian",
//   authorize_url: "https://auth.atlassian.com/authorize",
//   access_url: "https://auth.atlassian.com/oauth/token",
//   oauth: 2,
//   scope_delimiter: " ",
// });

// export const Auth0 = make({
//   id: "auth0",
//   website: "",
//   title: "Auth0",
//   authorize_url: "https://[subdomain].auth0.com/authorize",
//   access_url: "https://[subdomain].auth0.com/oauth/token",
//   oauth: 2,
//   scope_delimiter: " ",
// });

export const Authentiq = makeOauthFactory({
  id: "authentiq",
  website: "",
  title: "Authentiq",
  authorize_url: "https://connect.authentiq.io/sign-in",
  access_url: "https://connect.authentiq.io/token",
  oauth: 2,
  scope_delimiter: " ",
});

export const Authing = makeOauthFactory({
  id: "authing",
  website: "",
  title: "Authing",
  authorize_url: "https://[subdomain].authing.cn/oidc/auth",
  access_url: "https://[subdomain].authing.cn/oidc/token",
  oauth: 2,
  scope_delimiter: " ",
});

export const Autodesk = makeOauthFactory({
  id: "autodesk",
  website: "",
  title: "Autodesk",
  authorize_url:
    "https://developer.api.autodesk.com/authentication/v2/authorize",
  access_url: "https://developer.api.autodesk.com/authentication/v2/token",
  oauth: 2,
  scope_delimiter: " ",
});

export const Aweber = makeOauthFactory({
  id: "aweber",
  website: "",
  title: "Aweber",
  authorize_url: "https://auth.aweber.com/oauth2/authorize",
  access_url: "https://auth.aweber.com/oauth2/token",
  oauth: 2,
  scope_delimiter: " ",
});

export const Axosoft = makeOauthFactory({
  id: "axosoft",
  website: "",
  title: "Axosoft",
  authorize_url: "https://[subdomain].axosoft.com/auth",
  access_url: "https://[subdomain].axosoft.com/api/oauth2/token",
  oauth: 2,
  scope_delimiter: " ",
});

export const Baidu = makeOauthFactory({
  id: "baidu",
  website: "",
  title: "Baidu",
  authorize_url: "https://openapi.baidu.com/oauth/2.0/authorize",
  access_url: "https://openapi.baidu.com/oauth/2.0/token",
  oauth: 2,
});

export const Basecamp = makeOauthFactory({
  id: "basecamp",
  website: "",
  title: "Basecamp",
  authorize_url: "https://launchpad.37signals.com/authorization/new",
  access_url: "https://launchpad.37signals.com/authorization/token",
  oauth: 2,
});

// export const Battlenet = make({
//   id: "battlenet",
//   website: "",
//   title: "Battlenet",
//   authorize_url: "https://[subdomain].battle.net/oauth/authorize",
//   access_url: "https://[subdomain].battle.net/oauth/token",
//   oauth: 2,
//   scope_delimiter: " ",
// });

export const Beatport = makeOauthFactory({
  id: "beatport",
  website: "",
  title: "Beatport",
  request_url: "https://oauth-api.beatport.com/identity/1/oauth/request-token",
  authorize_url: "https://oauth-api.beatport.com/identity/1/oauth/authorize",
  access_url: "https://oauth-api.beatport.com/identity/1/oauth/access-token",
  oauth: 1,
});

export const Bitbucket = makeOauthFactory({
  id: "bitbucket",
  website: "",
  title: "Bitbucket",
  authorize_url: "https://bitbucket.org/site/oauth2/authorize",
  access_url: "https://bitbucket.org/site/oauth2/access_token",
  oauth: 2,
  scope_delimiter: " ",
});

export const Bitly = makeOauthFactory({
  id: "bitly",
  website: "",
  title: "Bitly",
  authorize_url: "https://bitly.com/oauth/authorize",
  access_url: "https://api-ssl.bitly.com/oauth/access_token",
  oauth: 2,
});

// export const Box = make({
//   id: "box",
//   website: "",
//   title: "Box",
//   authorize_url: "https://api.box.com/oauth2/authorize",
//   access_url: "https://api.box.com/oauth2/token",
//   oauth: 2,
//   scope_delimiter: " ",
// });

export const Buffer = makeOauthFactory({
  id: "buffer",
  website: "",
  title: "Buffer",
  authorize_url: "https://bufferapp.com/oauth2/authorize",
  access_url: "https://api.bufferapp.com/1/oauth2/token.json",
  oauth: 2,
});

export const Campaignmonitor = makeOauthFactory({
  id: "campaignmonitor",
  website: "",
  title: "Campaignmonitor",
  authorize_url: "https://api.createsend.com/oauth",
  access_url: "https://api.createsend.com/oauth/token",
  oauth: 2,
});

export const Cas = makeOauthFactory({
  id: "cas",
  website: "",
  title: "Cas",
  authorize_url: "https://[subdomain]/oidc/authorize",
  access_url: "https://[subdomain]/oidc/token",
  oauth: 2,
});

export const Cheddar = makeOauthFactory({
  id: "cheddar",
  website: "",
  title: "Cheddar",
  authorize_url: "https://api.cheddarapp.com/oauth/authorize",
  access_url: "https://api.cheddarapp.com/oauth/token",
  oauth: 2,
});

export const Clio = makeOauthFactory({
  id: "clio",
  website: "",
  title: "Clio",
  authorize_url: "https://app.clio.com/oauth/authorize",
  access_url: "https://app.clio.com/oauth/token",
  oauth: 2,
});

// export const Cognito = make({
//   id: "cognito",
//   website: "",
//   title: "Cognito",
//   authorize_url: "https://[subdomain]/oauth2/authorize",
//   access_url: "https://[subdomain]/oauth2/token",
//   oauth: 2,
//   scope_delimiter: " ",
// });

// export const Coinbase = make({
//   id: "coinbase",
//   website: "",
//   title: "Coinbase",
//   authorize_url: "https://www.coinbase.com/oauth/authorize",
//   access_url: "https://www.coinbase.com/oauth/token",
//   oauth: 2,
//   scope_delimiter: " ",
// });

export const Concur = makeOauthFactory({
  id: "concur",
  website: "",
  title: "Concur",
  authorize_url:
    "https://[subdomain].api.concursolutions.com/oauth2/v0/authorize",
  access_url: "https://[subdomain].api.concursolutions.com/oauth2/v0/token",
  oauth: 2,
});

export const Constantcontact = makeOauthFactory({
  id: "constantcontact",
  website: "",
  title: "Constantcontact",
  authorize_url:
    "https://oauth2.constantcontact.com/oauth2/oauth/siteowner/authorize",
  access_url: "https://oauth2.constantcontact.com/oauth2/oauth/token",
  oauth: 2,
});

export const Coursera = makeOauthFactory({
  id: "coursera",
  website: "",
  title: "Coursera",
  authorize_url: "https://accounts.coursera.org/oauth2/v1/auth",
  access_url: "https://accounts.coursera.org/oauth2/v1/token",
  oauth: 2,
  scope_delimiter: " ",
});

export const Crossid = makeOauthFactory({
  id: "crossid",
  website: "",
  title: "Crossid",
  authorize_url: "https://[subdomain].crossid.io/oauth2/auth",
  access_url: "https://[subdomain].crossid.io/oauth2/token",
  oauth: 2,
  scope_delimiter: " ",
});

export const Dailymotion = makeOauthFactory({
  id: "dailymotion",
  website: "",
  title: "Dailymotion",
  authorize_url: "https://www.dailymotion.com/oauth/authorize",
  access_url: "https://api.dailymotion.com/oauth/token",
  oauth: 2,
});

export const Deezer = makeOauthFactory({
  id: "deezer",
  website: "",
  title: "Deezer",
  authorize_url: "https://connect.deezer.com/oauth/auth.php",
  access_url: "https://connect.deezer.com/oauth/access_token.php",
  oauth: 2,
});

export const Delivery = makeOauthFactory({
  id: "delivery",
  website: "",
  title: "Delivery",
  authorize_url: "https://api.delivery.com/third_party/authorize",
  access_url: "https://api.delivery.com/third_party/access_token",
  oauth: 2,
});

export const Deputy = makeOauthFactory({
  id: "deputy",
  website: "",
  title: "Deputy",
  authorize_url: "https://once.deputy.com/my/oauth/login",
  access_url: "https://once.deputy.com/my/oauth/access_token",
  oauth: 2,
});

export const Deviantart = makeOauthFactory({
  id: "deviantart",
  website: "",
  title: "Deviantart",
  authorize_url: "https://www.deviantart.com/oauth2/authorize",
  access_url: "https://www.deviantart.com/oauth2/token",
  oauth: 2,
  scope_delimiter: " ",
});

export const Digitalocean = makeOauthFactory({
  id: "digitalocean",
  website: "",
  title: "Digitalocean",
  authorize_url: "https://cloud.digitalocean.com/v1/oauth/authorize",
  access_url: "https://cloud.digitalocean.com/v1/oauth/token",
  oauth: 2,
  scope_delimiter: " ",
});

export const Discogs = makeOauthFactory({
  id: "discogs",
  website: "",
  title: "Discogs",
  request_url: "https://api.discogs.com/oauth/request_token",
  authorize_url: "https://discogs.com/oauth/authorize",
  access_url: "https://api.discogs.com/oauth/access_token",
  oauth: 1,
});

// export const Discord = make({
//   id: "discord",
//   website: "",
//   title: "Discord",
//   authorize_url: "https://discord.com/api/oauth2/authorize",
//   access_url: "https://discord.com/api/oauth2/token",
//   oauth: 2,
//   scope_delimiter: " ",
// });

export const Disqus = makeOauthFactory({
  id: "disqus",
  website: "",
  title: "Disqus",
  authorize_url: "https://disqus.com/api/oauth/2.0/authorize/",
  access_url: "https://disqus.com/api/oauth/2.0/access_token/",
  oauth: 2,
});

export const Docusign = makeOauthFactory({
  id: "docusign",
  website: "",
  title: "Docusign",
  authorize_url: "https://account.docusign.com/oauth/auth",
  access_url: "https://account.docusign.com/oauth/token",
  oauth: 2,
});

export const Dribbble = makeOauthFactory({
  id: "dribbble",
  website: "",
  title: "Dribbble",
  authorize_url: "https://dribbble.com/oauth/authorize",
  access_url: "https://dribbble.com/oauth/token",
  oauth: 2,
  scope_delimiter: " ",
});

// export const Dropbox = make({
//   id: "dropbox",
//   website: "",
//   title: "Dropbox",
//   authorize_url: "https://www.dropbox.com/oauth2/authorize",
//   access_url: "https://api.dropboxapi.com/oauth2/token",
//   oauth: 2,
// });

export const Ebay = makeOauthFactory({
  id: "ebay",
  website: "",
  title: "Ebay",
  authorize_url: "https://signin.ebay.com/authorize",
  access_url: "https://api.ebay.com/identity/v1/oauth2/token",
  oauth: 2,
  scope_delimiter: " ",
});

export const Echosign = makeOauthFactory({
  id: "echosign",
  website: "",
  title: "Echosign",
  authorize_url: "https://secure.echosign.com/public/oauth",
  access_url: "https://secure.echosign.com/oauth/token",
  oauth: 2,
  scope_delimiter: " ",
});

export const Ecwid = makeOauthFactory({
  id: "ecwid",
  website: "",
  title: "Ecwid",
  authorize_url: "https://my.ecwid.com/api/oauth/authorize",
  access_url: "https://my.ecwid.com/api/oauth/token",
  oauth: 2,
  scope_delimiter: " ",
});

export const Edmodo = makeOauthFactory({
  id: "edmodo",
  website: "",
  title: "Edmodo",
  authorize_url: "https://api.edmodo.com/oauth/authorize",
  access_url: "https://api.edmodo.com/oauth/token",
  oauth: 2,
  scope_delimiter: " ",
});

export const Egnyte = makeOauthFactory({
  id: "egnyte",
  website: "",
  title: "Egnyte",
  authorize_url: "https://[subdomain].egnyte.com/puboauth/token",
  access_url: "https://[subdomain].egnyte.com/puboauth/token",
  oauth: 2,
  scope_delimiter: " ",
});

export const Etsy = makeOauthFactory({
  id: "etsy",
  website: "",
  title: "Etsy",
  request_url: "https://openapi.etsy.com/v2/oauth/request_token",
  authorize_url: "https://www.etsy.com/oauth/signin",
  access_url: "https://openapi.etsy.com/v2/oauth/access_token",
  oauth: 1,
  scope_delimiter: " ",
});

export const Eventbrite = makeOauthFactory({
  id: "eventbrite",
  website: "",
  title: "Eventbrite",
  authorize_url: "https://www.eventbrite.com/oauth/authorize",
  access_url: "https://www.eventbrite.com/oauth/token",
  oauth: 2,
});

export const Evernote = makeOauthFactory({
  id: "evernote",
  website: "",
  title: "Evernote",
  request_url: "https://www.evernote.com/oauth",
  authorize_url: "https://www.evernote.com/OAuth.action",
  access_url: "https://www.evernote.com/oauth",
  oauth: 1,
});

export const Eyeem = makeOauthFactory({
  id: "eyeem",
  website: "",
  title: "Eyeem",
  authorize_url: "https://www.eyeem.com/oauth/authorize",
  access_url: "https://api.eyeem.com/v2/oauth/token",
  oauth: 2,
});

// export const Facebook = make({
//   id: "facebook",
//   website: "",
//   title: "Facebook",
//   authorize_url: "https://www.facebook.com/dialog/oauth",
//   access_url: "https://graph.facebook.com/oauth/access_token",
//   oauth: 2,
// });

export const Familysearch = makeOauthFactory({
  id: "familysearch",
  website: "",
  title: "Familysearch",
  authorize_url:
    "https://ident.familysearch.org/cis-web/oauth2/v3/authorization",
  access_url: "https://ident.familysearch.org/cis-web/oauth2/v3/token",
  oauth: 2,
  scope_delimiter: " ",
});

export const Feedly = makeOauthFactory({
  id: "feedly",
  website: "",
  title: "Feedly",
  authorize_url: "https://cloud.feedly.com/v3/auth/auth",
  access_url: "https://cloud.feedly.com/v3/auth/token",
  oauth: 2,
});

export const Figma = makeOauthFactory({
  id: "figma",
  website: "",
  title: "Figma",
  authorize_url: "https://www.figma.com/oauth",
  access_url: "https://www.figma.com/api/oauth/token",
  oauth: 2,
});

export const Fitbit = makeOauthFactory({
  id: "fitbit",
  website: "",
  title: "Fitbit",
  authorize_url: "https://www.fitbit.com/oauth2/authorize",
  access_url: "https://api.fitbit.com/oauth2/token",
  oauth: 2,
  scope_delimiter: " ",
});

export const Flickr = makeOauthFactory({
  id: "flickr",
  website: "",
  title: "Flickr",
  request_url: "https://www.flickr.com/services/oauth/request_token",
  authorize_url: "https://www.flickr.com/services/oauth/authorize",
  access_url: "https://www.flickr.com/services/oauth/access_token",
  oauth: 1,
});

export const Formstack = makeOauthFactory({
  id: "formstack",
  website: "",
  title: "Formstack",
  authorize_url: "https://www.formstack.com/api/v2/oauth2/authorize",
  access_url: "https://www.formstack.com/api/v2/oauth2/token",
  oauth: 2,
});

// export const Foursquare = make({
//   id: "foursquare",
//   website: "",
//   title: "Foursquare",
//   authorize_url: "https://foursquare.com/oauth2/authenticate",
//   access_url: "https://foursquare.com/oauth2/access_token",
//   oauth: 2,
// });

export const Freeagent = makeOauthFactory({
  id: "freeagent",
  website: "",
  title: "Freeagent",
  authorize_url: "https://api.freeagent.com/v2/approve_app",
  access_url: "https://api.freeagent.com/v2/token_endpoint",
  oauth: 2,
});

export const Freelancer = makeOauthFactory({
  id: "freelancer",
  website: "",
  title: "Freelancer",
  authorize_url: "https://accounts.freelancer.com/oauth/authorize",
  access_url: "https://accounts.freelancer.com/oauth/token",
  oauth: 2,
  scope_delimiter: " ",
});

// export const Freshbooks = make({
//   id: "freshbooks",
//   website: "",
//   title: "Freshbooks",
//   request_url: "https://[subdomain].freshbooks.com/oauth/oauth_request.php",
//   authorize_url: "https://[subdomain].freshbooks.com/oauth/oauth_authorize.php",
//   access_url: "https://[subdomain].freshbooks.com/oauth/oauth_access.php",
//   oauth: 1,
// });

// export const Fusionauth = make({
//   id: "fusionauth",
//   website: "",
//   title: "Fusionauth",
//   authorize_url: "https://[subdomain]/oauth2/authorize",
//   access_url: "https://[subdomain]/oauth2/token",
//   oauth: 2,
//   scope_delimiter: " ",
// });

export const Garmin = makeOauthFactory({
  id: "garmin",
  website: "",
  title: "Garmin",
  request_url:
    "https://connectapi.garmin.com/oauth-service/oauth/request_token",
  authorize_url: "https://connect.garmin.com/oauthConfirm",
  access_url: "https://connectapi.garmin.com/oauth-service/oauth/access_token",
  oauth: 1,
});

export const Geeklist = makeOauthFactory({
  id: "geeklist",
  website: "",
  title: "Geeklist",
  request_url: "https://api.geekli.st/v1/oauth/request_token",
  authorize_url: "https://geekli.st/oauth/authorize",
  access_url: "https://api.geekli.st/v1/oauth/access_token",
  oauth: 1,
});

export const Genius = makeOauthFactory({
  id: "genius",
  website: "",
  title: "Genius",
  authorize_url: "https://api.genius.com/oauth/authorize",
  access_url: "https://api.genius.com/oauth/token",
  oauth: 2,
  scope_delimiter: " ",
});

export const Getbase = makeOauthFactory({
  id: "getbase",
  website: "",
  title: "Getbase",
  authorize_url: "https://api.getbase.com/oauth2/authorize",
  access_url: "https://api.getbase.com/oauth2/token",
  oauth: 2,
  scope_delimiter: " ",
});

export const Getpocket = makeOauthFactory({
  id: "getpocket",
  website: "",
  title: "Getpocket",
  request_url: "https://getpocket.com/v3/oauth/request",
  authorize_url: "https://getpocket.com/auth/authorize",
  access_url: "https://getpocket.com/v3/oauth/authorize",
  oauth: 1,
});

export const Gitbook = makeOauthFactory({
  id: "gitbook",
  website: "",
  title: "Gitbook",
  authorize_url: "https://api.gitbook.com/oauth/authorize",
  access_url: "https://api.gitbook.com/oauth/access_token",
  oauth: 2,
});

export const Github = makeOauthFactory({
  id: "github",
  website: "",
  title: "Github",
  authorize_url: "https://github.com/login/oauth/authorize",
  access_url: "https://github.com/login/oauth/access_token",
  oauth: 2,
});

// export const Gitlab = make({
//   id: "gitlab",
//   website: "",
//   title: "Gitlab",
//   authorize_url: "https://gitlab.com/oauth/authorize",
//   access_url: "https://gitlab.com/oauth/token",
//   oauth: 2,
//   scope_delimiter: " ",
// });

export const Gitter = makeOauthFactory({
  id: "gitter",
  website: "",
  title: "Gitter",
  authorize_url: "https://gitter.im/login/oauth/authorize",
  access_url: "https://gitter.im/login/oauth/token",
  oauth: 2,
});

export const Goodreads = makeOauthFactory({
  id: "goodreads",
  website: "",
  title: "Goodreads",
  request_url: "https://www.goodreads.com/oauth/request_token",
  authorize_url: "https://www.goodreads.com/oauth/authorize",
  access_url: "https://www.goodreads.com/oauth/access_token",
  oauth: 1,
});

// export const Google = make({
//   id: "google",
//   website: "",
//   title: "Google",
//   authorize_url: "https://accounts.google.com/o/oauth2/v2/auth",
//   access_url: "https://oauth2.googleapis.com/token",
//   oauth: 2,
//   scope_delimiter: " ",
// });

export const Groove = makeOauthFactory({
  id: "groove",
  website: "",
  title: "Groove",
  authorize_url: "https://api.groovehq.com/oauth/authorize",
  access_url: "https://api.groovehq.com/oauth/token",
  oauth: 2,
});

export const Gumroad = makeOauthFactory({
  id: "gumroad",
  website: "",
  title: "Gumroad",
  authorize_url: "https://gumroad.com/oauth/authorize",
  access_url: "https://gumroad.com/oauth/token",
  oauth: 2,
  scope_delimiter: " ",
});

export const Harvest = makeOauthFactory({
  id: "harvest",
  website: "",
  title: "Harvest",
  authorize_url: "https://api.harvestapp.com/oauth2/authorize",
  access_url: "https://api.harvestapp.com/oauth2/token",
  oauth: 2,
});

export const Hellosign = makeOauthFactory({
  id: "hellosign",
  website: "",
  title: "Hellosign",
  authorize_url: "https://www.hellosign.com/oauth/authorize",
  access_url: "https://www.hellosign.com/oauth/token",
  oauth: 2,
});

export const Heroku = makeOauthFactory({
  id: "heroku",
  website: "",
  title: "Heroku",
  authorize_url: "https://id.heroku.com/oauth/authorize",
  access_url: "https://id.heroku.com/oauth/token",
  oauth: 2,
});

export const Homeaway = makeOauthFactory({
  id: "homeaway",
  website: "",
  title: "Homeaway",
  authorize_url: "https://ws.homeaway.com/oauth/authorize",
  access_url: "https://ws.homeaway.com/oauth/token",
  oauth: 2,
});

export const Hootsuite = makeOauthFactory({
  id: "hootsuite",
  website: "",
  title: "Hootsuite",
  authorize_url: "https://platform.hootsuite.com/oauth2/auth",
  access_url: "https://platform.hootsuite.com/oauth2/token",
  oauth: 2,
});

export const Huddle = makeOauthFactory({
  id: "huddle",
  website: "",
  title: "Huddle",
  authorize_url: "https://login.huddle.net/request",
  access_url: "https://login.huddle.net/token",
  oauth: 2,
});

export const Ibm = makeOauthFactory({
  id: "ibm",
  website: "",
  title: "Ibm",
  authorize_url: "https://login.ibm.com/oidc/endpoint/default/authorize",
  access_url: "https://login.ibm.com/oidc/endpoint/default/token",
  oauth: 2,
});

export const Iconfinder = makeOauthFactory({
  id: "iconfinder",
  website: "",
  title: "Iconfinder",
  authorize_url: "https://www.iconfinder.com/api/v2/oauth2/authorize",
  access_url: "https://www.iconfinder.com/api/v2/oauth2/token",
  oauth: 2,
});

export const Idme = makeOauthFactory({
  id: "idme",
  website: "",
  title: "Idme",
  authorize_url: "https://api.id.me/oauth/authorize",
  access_url: "https://api.id.me/oauth/token",
  oauth: 2,
});

export const Idonethis = makeOauthFactory({
  id: "idonethis",
  website: "",
  title: "Idonethis",
  authorize_url: "https://idonethis.com/api/oauth2/authorize/",
  access_url: "https://idonethis.com/api/oauth2/token/",
  oauth: 2,
});

export const Imgur = makeOauthFactory({
  id: "imgur",
  website: "",
  title: "Imgur",
  authorize_url: "https://api.imgur.com/oauth2/authorize",
  access_url: "https://api.imgur.com/oauth2/token",
  oauth: 2,
});

export const Infusionsoft = makeOauthFactory({
  id: "infusionsoft",
  website: "",
  title: "Infusionsoft",
  authorize_url: "https://signin.infusionsoft.com/app/oauth/authorize",
  access_url: "https://api.infusionsoft.com/token",
  oauth: 2,
});

// export const Instagram = make({
//   id: "instagram",
//   website: "",
//   title: "Instagram",
//   authorize_url: "https://api.instagram.com/oauth/authorize",
//   access_url: "https://api.instagram.com/oauth/access_token",
//   oauth: 2,
//   scope_delimiter: " ",
// });

export const Intuit = makeOauthFactory({
  id: "intuit",
  website: "",
  title: "Intuit",
  authorize_url: "https://appcenter.intuit.com/connect/oauth2",
  access_url: "https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer",
  oauth: 2,
  scope_delimiter: " ",
});

export const Jamendo = makeOauthFactory({
  id: "jamendo",
  website: "",
  title: "Jamendo",
  authorize_url: "https://api.jamendo.com/v3.0/oauth/authorize",
  access_url: "https://api.jamendo.com/v3.0/oauth/grant",
  oauth: 2,
});

export const Jumplead = makeOauthFactory({
  id: "jumplead",
  website: "",
  title: "Jumplead",
  authorize_url: "https://account.mooloop.com/oauth/authorize",
  access_url: "https://account.mooloop.com/oauth/access_token",
  oauth: 2,
});

// export const Kakao = make({
//   id: "kakao",
//   website: "",
//   title: "Kakao",
//   authorize_url: "https://kauth.kakao.com/oauth/authorize",
//   access_url: "https://kauth.kakao.com/oauth/token",
//   oauth: 2,
// });

// export const Keycloak = make({
//   id: "keycloak",
//   website: "",
//   title: "Keycloak",
//   authorize_url: "https://[subdomain]/protocol/openid-connect/auth",
//   access_url: "https://[subdomain]/protocol/openid-connect/token",
//   oauth: 2,
//   scope_delimiter: " ",
// });

// export const Line = make({
//   id: "line",
//   website: "",
//   title: "Line",
//   authorize_url: "https://access.line.me/oauth2/v2.1/authorize",
//   access_url: "https://api.line.me/oauth2/v2.1/token",
//   oauth: 2,
//   scope_delimiter: " ",
// });

// export const Linkedin = make({
//   id: "linkedin",
//   website: "",
//   title: "Linkedin",
//   authorize_url: "https://www.linkedin.com/oauth/v2/authorization",
//   access_url: "https://www.linkedin.com/oauth/v2/accessToken",
//   oauth: 2,
//   scope_delimiter: " ",
// });

export const Live = makeOauthFactory({
  id: "live",
  website: "",
  title: "Live",
  authorize_url: "https://login.live.com/oauth20_authorize.srf",
  access_url: "https://login.live.com/oauth20_token.srf",
  oauth: 2,
});

export const Livechat = makeOauthFactory({
  id: "livechat",
  website: "",
  title: "Livechat",
  authorize_url: "https://accounts.livechatinc.com/",
  access_url: "https://accounts.livechatinc.com/token",
  oauth: 2,
});

export const Logingov = makeOauthFactory({
  id: "logingov",
  website: "",
  title: "Logingov",
  authorize_url: "https://idp.int.identitysandbox.gov/openid_connect/authorize",
  access_url: "https://idp.int.identitysandbox.gov/api/openid_connect/token",
  oauth: 2,
  scope_delimiter: " ",
});

export const Lyft = makeOauthFactory({
  id: "lyft",
  website: "",
  title: "Lyft",
  authorize_url: "https://api.lyft.com/oauth/authorize",
  access_url: "https://api.lyft.com/oauth/token",
  oauth: 2,
  scope_delimiter: " ",
});

// export const Mailchimp = make({
//   id: "mailchimp",
//   website: "",
//   title: "Mailchimp",
//   authorize_url: "https://login.mailchimp.com/oauth2/authorize",
//   access_url: "https://login.mailchimp.com/oauth2/token",
//   oauth: 2,
// });

export const Mailup = makeOauthFactory({
  id: "mailup",
  website: "",
  title: "Mailup",
  authorize_url:
    "https://services.mailup.com/Authorization/OAuth/Authorization",
  access_url: "https://services.mailup.com/Authorization/OAuth/Token",
  oauth: 2,
});

export const Mailxpert = makeOauthFactory({
  id: "mailxpert",
  website: "",
  title: "Mailxpert",
  authorize_url: "https://app.mailxpert.ch/oauth/v2/auth",
  access_url: "https://app.mailxpert.ch/oauth/v2/token",
  oauth: 2,
});

export const Mapmyfitness = makeOauthFactory({
  id: "mapmyfitness",
  website: "",
  title: "Mapmyfitness",
  authorize_url: "https://www.mapmyfitness.com/v7.1/oauth2/uacf/authorize",
  access_url: "https://api.mapmyfitness.com/v7.1/oauth2/access_token",
  oauth: 2,
});

export const Mastodon = makeOauthFactory({
  id: "mastodon",
  website: "",
  title: "Mastodon",
  authorize_url: "https://[subdomain]/oauth/authorize",
  access_url: "https://[subdomain]/oauth/token",
  oauth: 2,
  scope_delimiter: " ",
});

// export const Medium = make({
//   id: "medium",
//   website: "",
//   title: "Medium",
//   authorize_url: "https://medium.com/m/oauth/authorize",
//   access_url: "https://api.medium.com/v1/tokens",
//   oauth: 2,
// });

export const Meetup = makeOauthFactory({
  id: "meetup",
  website: "",
  title: "Meetup",
  authorize_url: "https://secure.meetup.com/oauth2/authorize",
  access_url: "https://secure.meetup.com/oauth2/access",
  oauth: 2,
  scope_delimiter: " ",
});

export const Mendeley = makeOauthFactory({
  id: "mendeley",
  website: "",
  title: "Mendeley",
  authorize_url: "https://api.mendeley.com/oauth/authorize",
  access_url: "https://api.mendeley.com/oauth/token",
  oauth: 2,
});

export const Mention = makeOauthFactory({
  id: "mention",
  website: "",
  title: "Mention",
  authorize_url: "https://web.mention.com/authorize",
  access_url: "https://web.mention.net/oauth/v2/token",
  oauth: 2,
});

export const Microsoft = makeOauthFactory({
  id: "microsoft",
  website: "",
  title: "Microsoft",
  authorize_url:
    "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
  access_url: "https://login.microsoftonline.com/common/oauth2/v2.0/token",
  oauth: 2,
  scope_delimiter: " ",
});

export const Mixcloud = makeOauthFactory({
  id: "mixcloud",
  website: "",
  title: "Mixcloud",
  authorize_url: "https://www.mixcloud.com/oauth/authorize",
  access_url: "https://www.mixcloud.com/oauth/access_token",
  oauth: 2,
});

export const Moxtra = makeOauthFactory({
  id: "moxtra",
  website: "",
  title: "Moxtra",
  authorize_url: "https://api.moxtra.com/oauth/authorize",
  access_url: "https://api.moxtra.com/oauth/token",
  oauth: 2,
  scope_delimiter: " ",
});

export const Myob = makeOauthFactory({
  id: "myob",
  website: "",
  title: "Myob",
  authorize_url: "https://secure.myob.com/oauth2/account/authorize",
  access_url: "https://secure.myob.com/oauth2/v1/authorize",
  oauth: 2,
});

// export const Naver = make({
//   id: "naver",
//   website: "",
//   title: "Naver",
//   authorize_url: "https://nid.naver.com/oauth2.0/authorize",
//   access_url: "https://nid.naver.com/oauth2.0/token",
//   oauth: 2,
// });

export const Nest = makeOauthFactory({
  id: "nest",
  website: "",
  title: "Nest",
  authorize_url: "https://home.nest.com/login/oauth2",
  access_url: "https://api.home.nest.com/oauth2/access_token",
  oauth: 2,
});

// export const Netlify = make({
//   id: "netlify",
//   website: "",
//   title: "Netlify",
//   authorize_url: "https://app.netlify.com/authorize",
//   access_url: "https://api.netlify.com/oauth/token",
//   oauth: 2,
// });

export const Nokotime = makeOauthFactory({
  id: "nokotime",
  website: "",
  title: "Nokotime",
  authorize_url: "https://secure.nokotime.com/oauth/2/authorize",
  access_url: "https://secure.nokotime.com/oauth/2/access_token",
  oauth: 2,
});

export const Notion = makeOauthFactory({
  id: "notion",
  website: "",
  title: "Notion",
  authorize_url: "https://api.notion.com/v1/oauth/authorize",
  access_url: "https://api.notion.com/v1/oauth/token",
  oauth: 2,
});

export const Nylas = makeOauthFactory({
  id: "nylas",
  website: "",
  title: "Nylas",
  authorize_url: "https://api.nylas.com/oauth/authorize",
  access_url: "https://api.nylas.com/oauth/token",
  oauth: 2,
});

// export const Okta = make({
//   id: "okta",
//   website: "",
//   title: "Okta",
//   authorize_url: "https://[subdomain].okta.com/oauth2/v1/authorize",
//   access_url: "https://[subdomain].okta.com/oauth2/v1/token",
//   oauth: 2,
//   scope_delimiter: " ",
// });

// export const Onelogin = make({
//   id: "onelogin",
//   website: "",
//   title: "Onelogin",
//   authorize_url: "https://[subdomain].onelogin.com/oidc/auth",
//   access_url: "https://[subdomain].onelogin.com/oidc/token",
//   oauth: 2,
//   scope_delimiter: " ",
// });

export const Openstreetmap = makeOauthFactory({
  id: "openstreetmap",
  website: "",
  title: "Openstreetmap",
  request_url: "https://www.openstreetmap.org/oauth/request_token",
  authorize_url: "https://www.openstreetmap.org/oauth/authorize",
  access_url: "https://www.openstreetmap.org/oauth/access_token",
  oauth: 1,
});

export const Openstreetmap2 = makeOauthFactory({
  id: "openstreetmap2",
  website: "",
  title: "Openstreetmap2",
  authorize_url: "https://www.openstreetmap.org/oauth2/authorize",
  access_url: "https://www.openstreetmap.org/oauth2/token",
  oauth: 2,
  scope_delimiter: " ",
});

export const Optimizely = makeOauthFactory({
  id: "optimizely",
  website: "",
  title: "Optimizely",
  authorize_url: "https://app.optimizely.com/oauth2/authorize",
  access_url: "https://app.optimizely.com/oauth2/token",
  oauth: 2,
});

// export const Osu = make({
//   id: "osu",
//   website: "",
//   title: "Osu",
//   authorize_url: "https://osu.ppy.sh/oauth/authorize",
//   access_url: "https://osu.ppy.sh/oauth/token",
//   oauth: 2,
//   scope_delimiter: " ",
// });

// export const Patreon = make({
//   id: "patreon",
//   website: "",
//   title: "Patreon",
//   authorize_url: "https://www.patreon.com/oauth2/authorize",
//   access_url: "https://www.patreon.com/api/oauth2/token",
//   oauth: 2,
//   scope_delimiter: " ",
// });

export const Paypal = makeOauthFactory({
  id: "paypal",
  website: "",
  title: "Paypal",
  authorize_url:
    "https://www.paypal.com/webapps/auth/protocol/openidconnect/v1/authorize",
  access_url: "https://api.paypal.com/v1/identity/openidconnect/tokenservice",
  oauth: 2,
  scope_delimiter: " ",
});

export const Phantauth = makeOauthFactory({
  id: "phantauth",
  website: "",
  title: "Phantauth",
  authorize_url: "https://phantauth.net/auth/authorize",
  access_url: "https://phantauth.net/auth/token",
  oauth: 2,
  scope_delimiter: " ",
});

// export const Pinterest = make({
//   id: "pinterest",
//   website: "",
//   title: "Pinterest",
//   authorize_url: "https://api.pinterest.com/oauth/",
//   access_url: "https://api.pinterest.com/v1/oauth/token",
//   oauth: 2,
// });

export const Plurk = makeOauthFactory({
  id: "plurk",
  website: "",
  title: "Plurk",
  request_url: "https://www.plurk.com/OAuth/request_token",
  authorize_url: "https://www.plurk.com/OAuth/authorize",
  access_url: "https://www.plurk.com/OAuth/access_token",
  oauth: 1,
});

export const Podio = makeOauthFactory({
  id: "podio",
  website: "",
  title: "Podio",
  authorize_url: "https://podio.com/oauth/authorize",
  access_url: "https://podio.com/oauth/token",
  oauth: 2,
});

export const Procore = makeOauthFactory({
  id: "procore",
  website: "",
  title: "Procore",
  authorize_url: "https://login.procore.com/oauth/authorize",
  access_url: "https://login.procore.com/oauth/token",
  oauth: 2,
});

export const Producthunt = makeOauthFactory({
  id: "producthunt",
  website: "",
  title: "Producthunt",
  authorize_url: "https://api.producthunt.com/v1/oauth/authorize",
  access_url: "https://api.producthunt.com/v1/oauth/token",
  oauth: 2,
  scope_delimiter: " ",
});

export const Projectplace = makeOauthFactory({
  id: "projectplace",
  website: "",
  title: "Projectplace",
  request_url: "https://api.projectplace.com/initiate",
  authorize_url: "https://api.projectplace.com/authorize",
  access_url: "https://api.projectplace.com/token",
  oauth: 1,
});

export const Projectplace2 = makeOauthFactory({
  id: "projectplace2",
  website: "",
  title: "Projectplace2",
  authorize_url: "https://api.projectplace.com/oauth2/authorize",
  access_url: "https://api.projectplace.com/oauth2/access_token",
  oauth: 2,
});

export const Pushbullet = makeOauthFactory({
  id: "pushbullet",
  website: "",
  title: "Pushbullet",
  authorize_url: "https://www.pushbullet.com/authorize",
  access_url: "https://api.pushbullet.com/oauth2/token",
  oauth: 2,
});

export const Qq = makeOauthFactory({
  id: "qq",
  website: "",
  title: "Qq",
  authorize_url: "https://graph.qq.com/oauth2.0/authorize",
  access_url: "https://graph.qq.com/oauth2.0/token",
  oauth: 2,
});

export const Ravelry = makeOauthFactory({
  id: "ravelry",
  website: "",
  title: "Ravelry",
  request_url: "https://www.ravelry.com/oauth/request_token",
  authorize_url: "https://www.ravelry.com/oauth/authorize",
  access_url: "https://www.ravelry.com/oauth/access_token",
  oauth: 1,
  scope_delimiter: " ",
});

export const Redbooth = makeOauthFactory({
  id: "redbooth",
  website: "",
  title: "Redbooth",
  authorize_url: "https://redbooth.com/oauth2/authorize",
  access_url: "https://redbooth.com/oauth2/token",
  oauth: 2,
});

// export const Reddit = make({
//   id: "reddit",
//   website: "",
//   title: "Reddit",
//   authorize_url: "https://ssl.reddit.com/api/v1/authorize",
//   access_url: "https://ssl.reddit.com/api/v1/access_token",
//   oauth: 2,
// });

export const Runkeeper = makeOauthFactory({
  id: "runkeeper",
  website: "",
  title: "Runkeeper",
  authorize_url: "https://runkeeper.com/apps/authorize",
  access_url: "https://runkeeper.com/apps/token",
  oauth: 2,
});

// export const Salesforce = make({
//   id: "salesforce",
//   website: "",
//   title: "Salesforce",
//   authorize_url: "https://login.salesforce.com/services/oauth2/authorize",
//   access_url: "https://login.salesforce.com/services/oauth2/token",
//   oauth: 2,
//   scope_delimiter: " ",
// });

export const Sellsy = makeOauthFactory({
  id: "sellsy",
  website: "",
  title: "Sellsy",
  request_url: "https://apifeed.sellsy.com/0/request_token",
  authorize_url: "https://apifeed.sellsy.com/0/login.php",
  access_url: "https://apifeed.sellsy.com/0/oauth/access_token",
  oauth: 1,
});

export const Shoeboxed = makeOauthFactory({
  id: "shoeboxed",
  website: "",
  title: "Shoeboxed",
  authorize_url: "https://id.shoeboxed.com/oauth/authorize",
  access_url: "https://id.shoeboxed.com/oauth/token",
  oauth: 2,
});

export const Shopify = makeOauthFactory({
  id: "shopify",
  website: "",
  title: "Shopify",
  authorize_url: "https://[subdomain].myshopify.com/admin/oauth/authorize",
  access_url: "https://[subdomain].myshopify.com/admin/oauth/access_token",
  oauth: 2,
});

export const Skyrock = makeOauthFactory({
  id: "skyrock",
  website: "",
  title: "Skyrock",
  request_url: "https://api.skyrock.com/v2/oauth/initiate",
  authorize_url: "https://api.skyrock.com/v2/oauth/authorize",
  access_url: "https://api.skyrock.com/v2/oauth/token",
  oauth: 1,
});

// export const Slack = make({
//   id: "slack",
//   website: "",
//   title: "Slack",
//   authorize_url: "https://slack.com/oauth/authorize",
//   access_url: "https://slack.com/api/oauth.access",
//   oauth: 2,
// });

export const Slice = makeOauthFactory({
  id: "slice",
  website: "",
  title: "Slice",
  authorize_url: "https://api.slice.com/oauth/authorize",
  access_url: "https://api.slice.com/oauth/token",
  oauth: 2,
});

export const Smartsheet = makeOauthFactory({
  id: "smartsheet",
  website: "",
  title: "Smartsheet",
  authorize_url: "https://app.smartsheet.com/b/authorize",
  access_url: "https://api.smartsheet.com/2.0/token",
  oauth: 2,
  scope_delimiter: " ",
});

export const Smugmug = makeOauthFactory({
  id: "smugmug",
  website: "",
  title: "Smugmug",
  request_url: "https://api.smugmug.com/services/oauth/1.0a/getRequestToken",
  authorize_url: "https://api.smugmug.com/services/oauth/1.0a/authorize",
  access_url: "https://api.smugmug.com/services/oauth/1.0a/getAccessToken",
  oauth: 1,
});

export const Snapchat = makeOauthFactory({
  id: "snapchat",
  website: "",
  title: "Snapchat",
  authorize_url: "https://accounts.snapchat.com/accounts/oauth2/auth",
  access_url: "https://accounts.snapchat.com/accounts/oauth2/token",
  oauth: 2,
  scope_delimiter: " ",
});

export const Snowflake = makeOauthFactory({
  id: "snowflake",
  website: "",
  title: "Snowflake",
  authorize_url: "https://[subdomain].snowflakecomputing.com/oauth/authorize",
  access_url: "https://[subdomain].snowflakecomputing.com/oauth/token-request",
  oauth: 2,
  scope_delimiter: " ",
});

export const Socialpilot = makeOauthFactory({
  id: "socialpilot",
  website: "",
  title: "Socialpilot",
  authorize_url: "https://panel.socialpilot.co/oauth",
  access_url: "https://panel.socialpilot.co/oauth/accesstoken",
  oauth: 2,
});

export const Socrata = makeOauthFactory({
  id: "socrata",
  website: "",
  title: "Socrata",
  authorize_url: "https://[subdomain]/oauth/authorize",
  access_url: "https://[subdomain]/oauth/access_token",
  oauth: 2,
});

export const Soundcloud = makeOauthFactory({
  id: "soundcloud",
  website: "",
  title: "Soundcloud",
  authorize_url: "https://soundcloud.com/connect",
  access_url: "https://api.soundcloud.com/oauth2/token",
  oauth: 2,
});

// export const Spotify = make({
//   id: "spotify",
//   website: "",
//   title: "Spotify",
//   authorize_url: "https://accounts.spotify.com/authorize",
//   access_url: "https://accounts.spotify.com/api/token",
//   oauth: 2,
//   scope_delimiter: " ",
// });

export const Square = makeOauthFactory({
  id: "square",
  website: "",
  title: "Square",
  authorize_url: "https://connect.squareup.com/oauth2/authorize",
  access_url: "https://connect.squareup.com/oauth2/token",
  oauth: 2,
  scope_delimiter: " ",
});

export const Stackexchange = makeOauthFactory({
  id: "stackexchange",
  website: "",
  title: "Stackexchange",
  authorize_url: "https://stackexchange.com/oauth",
  access_url: "https://stackexchange.com/oauth/access_token",
  oauth: 2,
});

export const Stocktwits = makeOauthFactory({
  id: "stocktwits",
  website: "",
  title: "Stocktwits",
  authorize_url: "https://api.stocktwits.com/api/2/oauth/authorize",
  access_url: "https://api.stocktwits.com/api/2/oauth/token",
  oauth: 2,
});

export const Stormz = makeOauthFactory({
  id: "stormz",
  website: "",
  title: "Stormz",
  authorize_url: "https://stormz.me/oauth/authorize",
  access_url: "https://stormz.me/oauth/token",
  oauth: 2,
  scope_delimiter: " ",
});

export const Storyblok = makeOauthFactory({
  id: "storyblok",
  website: "",
  title: "Storyblok",
  authorize_url: "https://app.storyblok.com/oauth/authorize",
  access_url: "https://app.storyblok.com/oauth/token",
  oauth: 2,
  scope_delimiter: " ",
});

// export const Strava = make({
//   id: "strava",
//   website: "",
//   title: "Strava",
//   authorize_url: "https://www.strava.com/oauth/authorize",
//   access_url: "https://www.strava.com/oauth/token",
//   oauth: 2,
// });

export const Stripe = makeOauthFactory({
  id: "stripe",
  website: "",
  title: "Stripe",
  authorize_url: "https://connect.stripe.com/oauth/authorize",
  access_url: "https://connect.stripe.com/oauth/token",
  oauth: 2,
});

export const Surveymonkey = makeOauthFactory({
  id: "surveymonkey",
  website: "",
  title: "Surveymonkey",
  authorize_url: "https://api.surveymonkey.com/oauth/authorize",
  access_url: "https://api.surveymonkey.net/oauth/token",
  oauth: 2,
});

export const Surveysparrow = makeOauthFactory({
  id: "surveysparrow",
  website: "",
  title: "Surveysparrow",
  authorize_url: "https://app.surveysparrow.com/o/oauth/auth",
  access_url: "https://app.surveysparrow.com/o/oauth/token",
  oauth: 2,
});

export const Thingiverse = makeOauthFactory({
  id: "thingiverse",
  website: "",
  title: "Thingiverse",
  authorize_url: "https://www.thingiverse.com/login/oauth/authorize",
  access_url: "https://www.thingiverse.com/login/oauth/access_token",
  oauth: 2,
});

export const Ticketbud = makeOauthFactory({
  id: "ticketbud",
  website: "",
  title: "Ticketbud",
  authorize_url: "https://api.ticketbud.com/oauth/authorize",
  access_url: "https://api.ticketbud.com/oauth/token",
  oauth: 2,
});

export const Tiktok = makeOauthFactory({
  id: "tiktok",
  website: "",
  title: "Tiktok",
  authorize_url: "https://open-api.tiktok.com/platform/oauth/connect/",
  access_url: "https://open-api.tiktok.com/oauth/access_token/",
  oauth: 2,
});

export const Timelyapp = makeOauthFactory({
  id: "timelyapp",
  website: "",
  title: "Timelyapp",
  authorize_url: "https://api.timelyapp.com/1.1/oauth/authorize",
  access_url: "https://api.timelyapp.com/1.1/oauth/token",
  oauth: 2,
});

// export const Todoist = make({
//   id: "todoist",
//   website: "",
//   title: "Todoist",
//   authorize_url: "https://todoist.com/oauth/authorize",
//   access_url: "https://todoist.com/oauth/access_token",
//   oauth: 2,
// });

// export const Trakt = make({
//   id: "trakt",
//   website: "",
//   title: "Trakt",
//   authorize_url: "https://api-v2launch.trakt.tv/oauth/authorize",
//   access_url: "https://api-v2launch.trakt.tv/oauth/token",
//   oauth: 2,
// });

export const Traxo = makeOauthFactory({
  id: "traxo",
  website: "",
  title: "Traxo",
  authorize_url: "https://www.traxo.com/oauth/authenticate",
  access_url: "https://www.traxo.com/oauth/token",
  oauth: 2,
});

export const Trello = makeOauthFactory({
  id: "trello",
  website: "",
  title: "Trello",
  request_url: "https://trello.com/1/OAuthGetRequestToken",
  authorize_url: "https://trello.com/1/OAuthAuthorizeToken",
  access_url: "https://trello.com/1/OAuthGetAccessToken",
  oauth: 1,
});

export const Tripit = makeOauthFactory({
  id: "tripit",
  website: "",
  title: "Tripit",
  request_url: "https://api.tripit.com/oauth/request_token",
  authorize_url: "https://www.tripit.com/oauth/authorize",
  access_url: "https://api.tripit.com/oauth/access_token",
  oauth: 1,
});

export const Trustpilot = makeOauthFactory({
  id: "trustpilot",
  website: "",
  title: "Trustpilot",
  authorize_url: "https://authenticate.trustpilot.com",
  access_url:
    "https://api.trustpilot.com/v1/oauth/oauth-business-users-for-applications/accesstoken",
  oauth: 2,
});

export const Tumblr = makeOauthFactory({
  id: "tumblr",
  website: "",
  title: "Tumblr",
  request_url: "https://www.tumblr.com/oauth/request_token",
  authorize_url: "https://www.tumblr.com/oauth/authorize",
  access_url: "https://www.tumblr.com/oauth/access_token",
  oauth: 1,
});

// export const Twitch = make({
//   id: "twitch",
//   website: "",
//   title: "Twitch",
//   authorize_url: "https://id.twitch.tv/oauth2/authorize",
//   access_url: "https://id.twitch.tv/oauth2/token",
//   oauth: 2,
//   scope_delimiter: " ",
// });

// export const Twitter = make({
//   id: "twitter",
//   website: "",
//   title: "Twitter",
//   request_url: "https://api.twitter.com/oauth/request_token",
//   authorize_url: "https://api.twitter.com/oauth/authenticate",
//   access_url: "https://api.twitter.com/oauth/access_token",
//   oauth: 1,
// });

export const Twitter = makeOauthFactory({
  id: "twitter",
  website: "",
  title: "Twitter2",
  authorize_url: "https://twitter.com/i/oauth2/authorize",
  access_url: "https://api.twitter.com/2/oauth2/token",
  oauth: 2,
  scope_delimiter: " ",
});

export const Typeform = makeOauthFactory({
  id: "typeform",
  website: "",
  title: "Typeform",
  authorize_url: "https://api.typeform.com/oauth/authorize",
  access_url: "https://api.typeform.com/oauth/token",
  oauth: 2,
  scope_delimiter: " ",
});

export const Uber = makeOauthFactory({
  id: "uber",
  website: "",
  title: "Uber",
  authorize_url: "https://login.uber.com/oauth/authorize",
  access_url: "https://login.uber.com/oauth/token",
  oauth: 2,
});

export const Unbounce = makeOauthFactory({
  id: "unbounce",
  website: "",
  title: "Unbounce",
  authorize_url: "https://api.unbounce.com/oauth/authorize",
  access_url: "https://api.unbounce.com/oauth/token",
  oauth: 2,
});

export const Underarmour = makeOauthFactory({
  id: "underarmour",
  website: "",
  title: "Underarmour",
  authorize_url: "https://www.mapmyfitness.com/v7.1/oauth2/uacf/authorize",
  access_url: "https://api.mapmyfitness.com/v7.1/oauth2/access_token",
  oauth: 2,
});

export const Unsplash = makeOauthFactory({
  id: "unsplash",
  website: "",
  title: "Unsplash",
  authorize_url: "https://unsplash.com/oauth/authorize",
  access_url: "https://unsplash.com/oauth/token",
  oauth: 2,
  scope_delimiter: "+",
});

export const Untappd = makeOauthFactory({
  id: "untappd",
  website: "",
  title: "Untappd",
  authorize_url: "https://untappd.com/oauth/authenticate",
  access_url: "https://untappd.com/oauth/authorize",
  oauth: 2,
});

export const Upwork = makeOauthFactory({
  id: "upwork",
  website: "",
  title: "Upwork",
  request_url: "https://www.upwork.com/api/auth/v1/oauth/token/request",
  authorize_url: "https://www.upwork.com/services/api/auth",
  access_url: "https://www.upwork.com/api/auth/v1/oauth/token/access",
  oauth: 1,
});

export const Uservoice = makeOauthFactory({
  id: "uservoice",
  website: "",
  title: "Uservoice",
  request_url: "https://outofindex.uservoice.com/oauth/request_token",
  authorize_url: "https://outofindex.uservoice.com/oauth/authorize",
  access_url: "https://outofindex.uservoice.com/oauth/access_token",
  oauth: 1,
});

export const Vend = makeOauthFactory({
  id: "vend",
  website: "",
  title: "Vend",
  authorize_url: "https://secure.vendhq.com/connect",
  access_url: "https://[subdomain].vendhq.com/api/1.0/token",
  oauth: 2,
});

export const Venmo = makeOauthFactory({
  id: "venmo",
  website: "",
  title: "Venmo",
  authorize_url: "https://api.venmo.com/v1/oauth/authorize",
  access_url: "https://api.venmo.com/v1/oauth/access_token",
  oauth: 2,
  scope_delimiter: " ",
});

export const Vercel = makeOauthFactory({
  id: "vercel",
  website: "",
  title: "Vercel",
  authorize_url: "https://vercel.com/oauth/authorize",
  access_url: "https://api.vercel.com/v2/oauth/access_token",
  oauth: 2,
});

export const Verticalresponse = makeOauthFactory({
  id: "verticalresponse",
  website: "",
  title: "Verticalresponse",
  authorize_url: "https://vrapi.verticalresponse.com/api/v1/oauth/authorize",
  access_url: "https://vrapi.verticalresponse.com/api/v1/oauth/access_token",
  oauth: 2,
});

export const Viadeo = makeOauthFactory({
  id: "viadeo",
  website: "",
  title: "Viadeo",
  authorize_url: "https://partners.viadeo.com/oauth/authorize",
  access_url: "https://partners.viadeo.com/oauth/token",
  oauth: 2,
});

export const Vimeo = makeOauthFactory({
  id: "vimeo",
  website: "",
  title: "Vimeo",
  authorize_url: "https://api.vimeo.com/oauth/authorize",
  access_url: "https://api.vimeo.com/oauth/access_token",
  oauth: 2,
  scope_delimiter: " ",
});

export const Visualstudio = makeOauthFactory({
  id: "visualstudio",
  website: "",
  title: "Visualstudio",
  authorize_url: "https://app.vssps.visualstudio.com/oauth2/authorize",
  access_url: "https://app.vssps.visualstudio.com/oauth2/token",
  oauth: 2,
  scope_delimiter: " ",
});

// export const Vk = make({
//   id: "vk",
//   website: "",
//   title: "Vk",
//   authorize_url: "https://oauth.vk.com/authorize",
//   access_url: "https://oauth.vk.com/access_token",
//   oauth: 2,
// });

export const Wechat = makeOauthFactory({
  id: "wechat",
  website: "",
  title: "Wechat",
  authorize_url: "https://open.weixin.qq.com/connect/oauth2/authorize",
  access_url: "https://api.weixin.qq.com/sns/oauth2/access_token",
  oauth: 2,
});

export const Weekdone = makeOauthFactory({
  id: "weekdone",
  website: "",
  title: "Weekdone",
  authorize_url: "https://weekdone.com/oauth_authorize",
  access_url: "https://weekdone.com/oauth_token",
  oauth: 2,
});

export const Weibo = makeOauthFactory({
  id: "weibo",
  website: "",
  title: "Weibo",
  authorize_url: "https://api.weibo.com/oauth2/authorize",
  access_url: "https://api.weibo.com/oauth2/access_token",
  oauth: 2,
});

export const Withings = makeOauthFactory({
  id: "withings",
  website: "",
  title: "Withings",
  authorize_url: "https://account.withings.com/oauth2_user/authorize2",
  access_url: "https://wbsapi.withings.net/v2/oauth2",
  oauth: 2,
});

// export const Wordpress = make({
//   id: "wordpress",
//   website: "",
//   title: "Wordpress",
//   authorize_url: "https://public-api.wordpress.com/oauth2/authorize",
//   access_url: "https://public-api.wordpress.com/oauth2/token",
//   oauth: 2,
// });

// export const Workos = make({
//   id: "workos",
//   website: "",
//   title: "Workos",
//   authorize_url: "https://api.workos.com/sso/authorize",
//   access_url: "https://api.workos.com/sso/token",
//   oauth: 2,
// });

export const Wrike = makeOauthFactory({
  id: "wrike",
  website: "",
  title: "Wrike",
  authorize_url: "https://www.wrike.com/oauth2/authorize",
  access_url: "https://www.wrike.com/oauth2/token",
  oauth: 2,
});

export const Xero = makeOauthFactory({
  id: "xero",
  website: "",
  title: "Xero",
  request_url: "https://api.xero.com/oauth/RequestToken",
  authorize_url: "https://api.xero.com/oauth/Authorize",
  access_url: "https://api.xero.com/oauth/AccessToken",
  oauth: 1,
});

export const Xing = makeOauthFactory({
  id: "xing",
  website: "",
  title: "Xing",
  request_url: "https://api.xing.com/v1/request_token",
  authorize_url: "https://api.xing.com/v1/authorize",
  access_url: "https://api.xing.com/v1/access_token",
  oauth: 1,
});

export const Yahoo = makeOauthFactory({
  id: "yahoo",
  website: "",
  title: "Yahoo",
  authorize_url: "https://api.login.yahoo.com/oauth2/request_auth",
  access_url: "https://api.login.yahoo.com/oauth2/get_token",
  oauth: 2,
});

export const Yammer = makeOauthFactory({
  id: "yammer",
  website: "",
  title: "Yammer",
  authorize_url: "https://www.yammer.com/dialog/oauth",
  access_url: "https://www.yammer.com/oauth2/access_token.json",
  oauth: 2,
});

// export const Yandex = make({
//   id: "yandex",
//   website: "",
//   title: "Yandex",
//   authorize_url: "https://oauth.yandex.com/authorize",
//   access_url: "https://oauth.yandex.com/token",
//   oauth: 2,
// });

export const Zendesk = makeOauthFactory({
  id: "zendesk",
  website: "",
  title: "Zendesk",
  authorize_url: "https://[subdomain].zendesk.com/oauth/authorizations/new",
  access_url: "https://[subdomain].zendesk.com/oauth/tokens",
  oauth: 2,
  scope_delimiter: " ",
});

// export const Zoom = make({
//   id: "zoom",
//   website: "",
//   title: "Zoom",
//   authorize_url: "https://zoom.us/oauth/authorize",
//   access_url: "https://zoom.us/oauth/token",
//   oauth: 2,
//   scope_delimiter: " ",
// });
