import assert from "assert";
import { HandlerFactory } from "~/core/types";
import { OAuthProvider } from "../lib/OAuthProvider";
import { TypicalOAuthArgs, makeOauthFactory } from "../lib/makeHandler";

function makeOauthFactoryWithSubdomainArg(
  info: OAuthProvider,
): HandlerFactory<TypicalOAuthArgs & { subdomain: string }> {
  return (args: TypicalOAuthArgs & { subdomain: string }) => {
    assert(args.subdomain, `Provider ${info.id} requires subdomain value.`);

    return makeOauthFactory({
      ...info,
      authorization: {
        url: info.authorization!.url!.replace("[subdomain]", args.subdomain),
      },
      token: info.token
        ? {
            url: info.token!.url!.replace("[subdomain]", args.subdomain),
          }
        : undefined,
    })(args);
  };
}

export const _23andMe = makeOauthFactory({
  id: "23andme",
  name: "23andMe",
  website: "https://www.23andme.com",
  authorization: {
    url: "https://api.23andme.com/authorize",
  },
  token: { url: "https://api.23andme.com/token" },
  version: "2",
});

export const _500PX = makeOauthFactory({
  id: "500px",
  name: "500px",
  requestTokenUrl: "https://api.500px.com/v1/oauth/request_token",
  authorization: {
    url: "https://api.500px.com/v1/oauth/authorize",
  },
  website: "https://500px.com",
  token: { url: "https://api.500px.com/v1/oauth/access_token" },
  version: "1",
});

export const ActOn = makeOauthFactory({
  id: "acton",
  name: "Act-On",
  authorization: {
    url: "https://restapi.actonsoftware.com/authorize",
  },
  token: { url: "https://restapi.actonsoftware.com/token" },
  website: "https://www.act-on.com",
  version: "2",
});

export const AcuityScheduling = makeOauthFactory({
  id: "acuityscheduling",
  name: "Acuity Scheduling",
  authorization: {
    url: "https://acuityscheduling.com/oauth2/authorize",
  },
  token: { url: "https://acuityscheduling.com/oauth2/token" },
  website: "https://acuityscheduling.com",
  version: "2",
});

export const Adobe = makeOauthFactory({
  id: "adobe",
  name: "Adobe",
  authorization: {
    url: "https://ims-na1.adobelogin.com/ims/authorize/v2",
  },
  token: { url: "https://ims-na1.adobelogin.com/ims/token/v3" },
  website: "https://www.adobe.com",
  version: "2",
});

export const Aha = makeOauthFactoryWithSubdomainArg({
  id: "aha",
  name: "Aha!",
  authorization: {
    url: "https://[subdomain].aha.io/oauth/authorize",
  },
  token: { url: "https://[subdomain].aha.io/oauth/token" },
  website: "https://www.aha.io",
  version: "2",
});

export const Alchemer = makeOauthFactory({
  id: "alchemer",
  name: "Alchemer",
  requestTokenUrl: "https://api.alchemer.com/head/oauth/request_token",
  authorization: {
    url: "https://api.alchemer.com/head/oauth/authenticate",
  },
  website: "https://www.alchemer.com",
  token: { url: "https://api.alchemer.com/head/oauth/access_token" },
  version: "1",
});

export const Amazon = makeOauthFactory({
  id: "amazon",
  name: "Amazon",
  authorization: {
    url: "https://www.amazon.com/ap/oa",
  },
  token: { url: "https://api.amazon.com/auth/o2/token" },
  website: "https://www.amazon.com",
  version: "2",
});

export const AngelList = makeOauthFactory({
  id: "angellist",
  name: "AngelList",
  authorization: {
    url: "https://angel.co/api/oauth/authorize",
  },
  token: { url: "https://angel.co/api/oauth/token" },
  website: "https://angel.co",
  version: "2",
});

// export const Apple = make({
//   id: "apple",
//   name: "",
//   authorization: {
// url: "https://appleid.apple.com/auth/authorize",
// },
//   tokenUrl: "https://appleid.apple.com/auth/token",
//   website: "",
//   version: "2",
//
// });

export const ArcGIS = makeOauthFactory({
  id: "arcgis",
  name: "ArcGIS",
  authorization: {
    url: "https://www.arcgis.com/sharing/rest/oauth2/authorize",
  },
  token: { url: "https://www.arcgis.com/sharing/rest/oauth2/token" },
  website: "https://www.arcgis.com",
  version: "2",
});

export const Asana = makeOauthFactory({
  id: "asana",
  name: "Asana",
  authorization: {
    url: "https://app.asana.com/-/oauth_authorize",
  },
  token: { url: "https://app.asana.com/-/oauth_token" },
  website: "https://asana.com",
  version: "2",
});

export const Assembla = makeOauthFactory({
  id: "assembla",
  name: "Assembla",
  authorization: {
    url: "https://api.assembla.com/authorization",
  },
  token: { url: "https://api.assembla.com/token" },
  website: "https://www.assembla.com",
  version: "2",
});

// export const Atlassian = make({
//   id: "atlassian",
//   name: "",
//   authorization: {
// url: "https://auth.atlassian.com/authorize",
// },
//   tokenUrl: "https://auth.atlassian.com/oauth/token",
//   website: "",
//   version: "2",
//
// });

// export const Auth0 = makeOauthFactoryWithSubdomainArg({
//   id: "auth0",
//   name: "",
//   authorization: {
// url: "https://[subdomain].auth0.com/authorize",
// },
//   tokenUrl: "https://[subdomain].auth0.com/oauth/token",
//   website: "",
//   version: "2",
//
// });

// export const Authentiq = makeOauthFactory({
//   id: "authentiq",
//   name: "Authentiq",
//   authorization: {
// url: "https://connect.authentiq.io/sign-in",
// },
//   tokenUrl: "https://connect.authentiq.io/token",
//   website: "https://www.authentiq.com",
//   version: "2",
//
// });

export const Authing = makeOauthFactoryWithSubdomainArg({
  id: "authing",
  name: "Authing",
  authorization: {
    url: "https://[subdomain].authing.cn/oidc/auth",
  },
  token: { url: "https://[subdomain].authing.cn/oidc/token" },
  website: "https://www.authing.cn",
  version: "2",
});

export const Autodesk = makeOauthFactory({
  id: "autodesk",
  name: "Autodesk",
  authorization: {
    url: "https://developer.api.autodesk.com/authentication/v2/authorize",
  },
  website: "https://www.autodesk.com",
  token: { url: "https://developer.api.autodesk.com/authentication/v2/token" },
  version: "2",
});

export const AWeber = makeOauthFactory({
  id: "aweber",
  name: "AWeber",
  authorization: {
    url: "https://auth.aweber.com/oauth2/authorize",
  },
  token: { url: "https://auth.aweber.com/oauth2/token" },
  website: "https://www.aweber.com",
  version: "2",
});

export const Axosoft = makeOauthFactoryWithSubdomainArg({
  id: "axosoft",
  name: "Axosoft",
  authorization: {
    url: "https://[subdomain].axosoft.com/auth",
  },
  token: { url: "https://[subdomain].axosoft.com/api/oauth2/token" },
  website: "https://www.axosoft.com",
  version: "2",
});

export const Baidu = makeOauthFactory({
  id: "baidu",
  name: "Baidu",
  authorization: {
    url: "https://openapi.baidu.com/oauth/2.0/authorize",
  },
  token: { url: "https://openapi.baidu.com/oauth/2.0/token" },
  website: "https://www.baidu.com",
  version: "2",
});

export const Basecamp = makeOauthFactory({
  id: "basecamp",
  name: "Basecamp",
  authorization: {
    url: "https://launchpad.37signals.com/authorization/new",
  },
  token: { url: "https://launchpad.37signals.com/authorization/token" },
  website: "https://basecamp.com",
  version: "2",
});

// export const Battlenet = makeOauthFactoryWithSubdomainArg({
//   id: "battlenet",
//   name: "",
//   authorization: {
// url: "https://[subdomain].battle.net/oauth/authorize",
// },
//   tokenUrl: "https://[subdomain].battle.net/oauth/token",
//   website: "",
//   version: "2",
//
// });

export const Beatport = makeOauthFactory({
  id: "beatport",
  name: "Beatport",
  requestTokenUrl:
    "https://oauth-api.beatport.com/identity/1/oauth/request-token",
  authorization: {
    url: "https://oauth-api.beatport.com/identity/1/oauth/authorize",
  },
  website: "https://www.beatport.com",
  token: {
    url: "https://oauth-api.beatport.com/identity/1/oauth/access-token",
  },
  version: "1",
});

export const Bitbucket = makeOauthFactory({
  id: "bitbucket",
  name: "Bitbucket",
  authorization: {
    url: "https://bitbucket.org/site/oauth2/authorize",
  },
  token: { url: "https://bitbucket.org/site/oauth2/access_token" },
  website: "https://bitbucket.org",
  version: "2",
});

export const Bitly = makeOauthFactory({
  id: "bitly",
  name: "Bitly",
  authorization: {
    url: "https://bitly.com/oauth/authorize",
  },
  token: { url: "https://api-ssl.bitly.com/oauth/access_token" },
  website: "https://bitly.com",
  version: "2",
});

// export const Box = make({
//   id: "box",
//   name: "",
//   authorization: {
// url: "https://api.box.com/oauth2/authorize",
// },
//   tokenUrl: "https://api.box.com/oauth2/token",
//   website: "",
//   version: "2",
//
// });

export const Buffer = makeOauthFactory({
  id: "buffer",
  name: "Buffer",
  authorization: {
    url: "https://bufferapp.com/oauth2/authorize",
  },
  token: { url: "https://api.bufferapp.com/1/oauth2/token.json" },
  website: "https://bufferapp.com",
  version: "2",
});

export const CampaignMonitor = makeOauthFactory({
  id: "campaignmonitor",
  name: "Campaign Monitor",
  authorization: {
    url: "https://api.createsend.com/oauth",
  },
  token: { url: "https://api.createsend.com/oauth/token" },
  website: "https://www.campaignmonitor.com",
  version: "2",
});

export const CAS = makeOauthFactoryWithSubdomainArg({
  id: "cas",
  name: "CAS",
  authorization: {
    url: "https://[subdomain]/oidc/authorize",
  },
  token: { url: "https://[subdomain]/oidc/token" },
  website: "https://www.apereo.org/projects/cas",
  version: "2",
});

// Dead.
// export const Cheddar = makeOauthFactory({
//   id: "cheddar",
//   name: "Cheddar",
//   authorization: {
// url: "https://api.cheddarapp.com/oauth/authorize",
// },
//   tokenUrl: "https://api.cheddarapp.com/oauth/token",
//   website: "https://cheddarapp.com",
//   version: "2",
// });

export const Clio = makeOauthFactory({
  id: "clio",
  name: "Clio",
  authorization: {
    url: "https://app.clio.com/oauth/authorize",
  },
  token: { url: "https://app.clio.com/oauth/token" },
  website: "https://www.clio.com",
  version: "2",
});

// export const Cognito = makeOauthFactoryWithSubdomainArg({
//   id: "cognito",
//   name: "",
//   authorization: {
// url: "https://[subdomain]/oauth2/authorize",
// },
//   tokenUrl: "https://[subdomain]/oauth2/token",
//   website: "",
//   version: "2",
//
// });

// export const Coinbase = make({
//   id: "coinbase",
//   name: "",
//   authorization: {
// url: "https://www.coinbase.com/oauth/authorize",
// },
//   tokenUrl: "https://www.coinbase.com/oauth/token",
//   website: "",
//   version: "2",
//
// });

export const Concur = makeOauthFactoryWithSubdomainArg({
  id: "concur",
  name: "Concur",
  authorization: {
    url: "https://[subdomain].api.concursolutions.com/oauth2/v0/authorize",
  },
  website: "https://www.concur.com",
  token: { url: "https://[subdomain].api.concursolutions.com/oauth2/v0/token" },
  version: "2",
});

export const ConstantContact = makeOauthFactory({
  id: "constantcontact",
  name: "Constant Contact",
  authorization: {
    url: "https://oauth2.constantcontact.com/oauth2/oauth/siteowner/authorize",
  },
  website: "https://www.constantcontact.com",
  token: { url: "https://oauth2.constantcontact.com/oauth2/oauth/token" },
  version: "2",
});

export const Coursera = makeOauthFactory({
  id: "coursera",
  name: "Coursera",
  authorization: {
    url: "https://accounts.coursera.org/oauth2/v1/auth",
  },
  token: { url: "https://accounts.coursera.org/oauth2/v1/token" },
  website: "https://www.coursera.org",
  version: "2",
});

export const CrossID = makeOauthFactoryWithSubdomainArg({
  id: "crossid",
  name: "CrossID",
  authorization: {
    url: "https://[subdomain].crossid.io/oauth2/auth",
  },
  token: { url: "https://[subdomain].crossid.io/oauth2/token" },
  website: "https://www.crossid.io",
  version: "2",
});

export const Dailymotion = makeOauthFactory({
  id: "dailymotion",
  name: "Dailymotion",
  authorization: {
    url: "https://www.dailymotion.com/oauth/authorize",
  },
  token: { url: "https://api.dailymotion.com/oauth/token" },
  website: "https://www.dailymotion.com",
  version: "2",
});

export const Deezer = makeOauthFactory({
  id: "deezer",
  name: "Deezer",
  authorization: {
    url: "https://connect.deezer.com/oauth/auth.php",
  },
  token: { url: "https://connect.deezer.com/oauth/access_token.php" },
  website: "https://www.deezer.com",
  version: "2",
});

export const Delivery = makeOauthFactory({
  id: "delivery",
  name: "Delivery",
  authorization: {
    url: "https://api.delivery.com/third_party/authorize",
  },
  token: { url: "https://api.delivery.com/third_party/access_token" },
  website: "https://www.delivery.com",
  version: "2",
});

export const Deputy = makeOauthFactory({
  id: "deputy",
  name: "Deputy",
  authorization: {
    url: "https://once.deputy.com/my/oauth/login",
  },
  token: { url: "https://once.deputy.com/my/oauth/access_token" },
  website: "https://www.deputy.com",
  version: "2",
});

export const DeviantArt = makeOauthFactory({
  id: "deviantart",
  name: "DeviantArt",
  authorization: {
    url: "https://www.deviantart.com/oauth2/authorize",
  },
  token: { url: "https://www.deviantart.com/oauth2/token" },
  website: "https://www.deviantart.com",
  version: "2",
});

export const DigitalOcean = makeOauthFactory({
  id: "digitalocean",
  name: "DigitalOcean",
  authorization: {
    url: "https://cloud.digitalocean.com/v1/oauth/authorize",
  },
  token: { url: "https://cloud.digitalocean.com/v1/oauth/token" },
  website: "https://www.digitalocean.com",
  version: "2",
});

export const Discogs = makeOauthFactory({
  id: "discogs",
  name: "Discogs",
  requestTokenUrl: "https://api.discogs.com/oauth/request_token",
  authorization: {
    url: "https://discogs.com/oauth/authorize",
  },
  website: "https://www.discogs.com",
  token: { url: "https://api.discogs.com/oauth/access_token" },
  version: "1",
});

// export const Discord = make({
//   id: "discord",
//   name: "",
//   authorization: {
// url: "https://discord.com/api/oauth2/authorize",
// },
//   tokenUrl: "https://discord.com/api/oauth2/token",
//   website: "",
//   version: "2",
//
// });

export const Disqus = makeOauthFactory({
  id: "disqus",
  name: "Disqus",
  authorization: {
    url: "https://disqus.com/api/oauth/2.0/authorize/",
  },
  token: { url: "https://disqus.com/api/oauth/2.0/access_token/" },
  website: "https://www.disqus.com",
  version: "2",
});

export const Docusign = makeOauthFactory({
  id: "docusign",
  name: "DocuSign",
  authorization: {
    url: "https://account.docusign.com/oauth/auth",
  },
  token: { url: "https://account.docusign.com/oauth/token" },
  website: "https://www.docusign.com",
  version: "2",
});

export const Dribbble = makeOauthFactory({
  id: "dribbble",
  name: "Dribbble",
  authorization: {
    url: "https://dribbble.com/oauth/authorize",
  },
  token: { url: "https://dribbble.com/oauth/token" },
  website: "https://www.dribbble.com",
  version: "2",
});

// export const Dropbox = make({
//   id: "dropbox",
//   name: "",
//   authorization: {
// url: "https://www.dropbox.com/oauth2/authorize",
// },
//   tokenUrl: "https://api.dropboxapi.com/oauth2/token",
//   website: "",
//   version: "2",
// });

export const Ebay = makeOauthFactory({
  id: "ebay",
  name: "eBay",
  authorization: {
    url: "https://signin.ebay.com/authorize",
  },
  token: { url: "https://api.ebay.com/identity/v1/oauth2/token" },
  website: "https://www.ebay.com",
  version: "2",
});

export const Echosign = makeOauthFactory({
  id: "echosign",
  name: "Adobe Sign",
  authorization: {
    url: "https://secure.echosign.com/public/oauth",
  },
  token: { url: "https://secure.echosign.com/oauth/token" },
  website: "https://acrobat.adobe.com/us/en/sign.html",
  version: "2",
});

export const Ecwid = makeOauthFactory({
  id: "ecwid",
  name: "Ecwid",
  authorization: {
    url: "https://my.ecwid.com/api/oauth/authorize",
  },
  token: { url: "https://my.ecwid.com/api/oauth/token" },
  website: "https://www.ecwid.com",
  version: "2",
});

// Dead.
// export const Edmodo = makeOauthFactory({
//   id: "edmodo",
//   name: "Edmodo",
//   authorization: {
// url: "https://api.edmodo.com/oauth/authorize",
// },
//   tokenUrl: "https://api.edmodo.com/oauth/token",
//   website: "https://www.edmodo.com",
//   version: "2",
//
// });

export const Egnyte = makeOauthFactoryWithSubdomainArg({
  id: "egnyte",
  name: "Egnyte",
  authorization: {
    url: "https://[subdomain].egnyte.com/puboauth/token",
  },
  token: { url: "https://[subdomain].egnyte.com/puboauth/token" },
  website: "https://www.egnyte.com",
  version: "2",
});

export const Etsy = makeOauthFactory({
  id: "etsy",
  name: "Etsy",
  requestTokenUrl: "https://openapi.etsy.com/v2/oauth/request_token",
  authorization: {
    url: "https://www.etsy.com/oauth/signin",
  },
  website: "https://www.etsy.com",
  token: { url: "https://openapi.etsy.com/v2/oauth/access_token" },
  version: "1",
});

export const Eventbrite = makeOauthFactory({
  id: "eventbrite",
  name: "Eventbrite",
  authorization: {
    url: "https://www.eventbrite.com/oauth/authorize",
  },
  token: { url: "https://www.eventbrite.com/oauth/token" },
  website: "https://www.eventbrite.com",
  version: "2",
});

export const Evernote = makeOauthFactory({
  id: "evernote",
  name: "Evernote",
  requestTokenUrl: "https://www.evernote.com/oauth",
  authorization: {
    url: "https://www.evernote.com/OAuth.action",
  },
  website: "https://www.evernote.com",
  token: { url: "https://www.evernote.com/oauth" },
  version: "1",
});

export const EyeEm = makeOauthFactory({
  id: "eyeem",
  name: "EyeEm",
  authorization: {
    url: "https://www.eyeem.com/oauth/authorize",
  },
  token: { url: "https://api.eyeem.com/v2/oauth/token" },
  website: "https://www.eyeem.com",
  version: "2",
});

// export const Facebook = make({
//   id: "facebook",
//   name: "",
//   authorization: {
// url: "https://www.facebook.com/dialog/oauth",
// },
//   tokenUrl: "https://graph.facebook.com/oauth/access_token",
//   website: "",
//   version: "2",
//
// });

export const FamilySearch = makeOauthFactory({
  id: "familysearch",
  name: "FamilySearch",
  authorization: {
    url: "https://ident.familysearch.org/cis-web/oauth2/v3/authorization",
  },
  website: "https://www.familysearch.org",
  token: { url: "https://ident.familysearch.org/cis-web/oauth2/v3/token" },
  version: "2",
});

export const Feedly = makeOauthFactory({
  id: "feedly",
  name: "Feedly",
  authorization: {
    url: "https://cloud.feedly.com/v3/auth/auth",
  },
  token: { url: "https://cloud.feedly.com/v3/auth/token" },
  website: "https://www.feedly.com",
  version: "2",
});

export const Figma = makeOauthFactory({
  id: "figma",
  name: "Figma",
  authorization: {
    url: "https://www.figma.com/oauth",
  },
  token: { url: "https://www.figma.com/api/oauth/token" },
  website: "https://www.figma.com",
  version: "2",
});

export const Fitbit = makeOauthFactory({
  id: "fitbit",
  name: "Fitbit",
  authorization: {
    url: "https://www.fitbit.com/oauth2/authorize",
  },
  token: { url: "https://api.fitbit.com/oauth2/token" },
  website: "https://www.fitbit.com",
  version: "2",
});

export const Flickr = makeOauthFactory({
  id: "flickr",
  name: "Flickr",
  requestTokenUrl: "https://www.flickr.com/services/oauth/request_token",
  authorization: {
    url: "https://www.flickr.com/services/oauth/authorize",
  },
  website: "https://www.flickr.com",
  token: { url: "https://www.flickr.com/services/oauth/access_token" },
  version: "1",
});

export const Formstack = makeOauthFactory({
  id: "formstack",
  name: "Formstack",
  authorization: {
    url: "https://www.formstack.com/api/v2/oauth2/authorize",
  },
  token: { url: "https://www.formstack.com/api/v2/oauth2/token" },
  website: "https://www.formstack.com",
  version: "2",
});

// export const Foursquare = make({
//   id: "foursquare",
//   name: "",
//   authorization: {
// url: "https://foursquare.com/oauth2/authenticate",
// },
//   tokenUrl: "https://foursquare.com/oauth2/access_token",
//   website: "",
//   version: "2",
// });

export const FreeAgent = makeOauthFactory({
  id: "freeagent",
  name: "FreeAgent",
  authorization: {
    url: "https://api.freeagent.com/v2/approve_app",
  },
  token: { url: "https://api.freeagent.com/v2/token_endpoint" },
  website: "https://www.freeagent.com",
  version: "2",
});

export const Freelancer = makeOauthFactory({
  id: "freelancer",
  name: "Freelancer",
  authorization: {
    url: "https://accounts.freelancer.com/oauth/authorize",
  },
  token: { url: "https://accounts.freelancer.com/oauth/token" },
  website: "https://www.freelancer.com",
  version: "2",
});

// export const Freshbooks = makeOauthFactoryWithSubdomainArg({
//   id: "freshbooks",
//   name: "",
//   request_url: "https://[subdomain].freshbooks.com/oauth/oauth_request.php",
//   authorization: {
// url: "https://[subdomain].freshbooks.com/oauth/oauth_authorize.php",
// },
//   website: "",
//   tokenUrl: "https://[subdomain].freshbooks.com/oauth/oauth_access.php",
//   version: "1",
// });

// export const Fusionauth = makeOauthFactoryWithSubdomainArg({
//   id: "fusionauth",
//   name: "",
//   authorization: {
// url: "https://[subdomain]/oauth2/authorize",
// },
//   tokenUrl: "https://[subdomain]/oauth2/token",
//   website: "",
//   version: "2",
//
// });

export const Garmin = makeOauthFactory({
  id: "garmin",
  name: "Garmin",
  requestTokenUrl:
    "https://connectapi.garmin.com/oauth-service/oauth/request_token",
  website: "https://connect.garmin.com",
  authorization: {
    url: "https://connect.garmin.com/oauthConfirm",
  },
  token: {
    url: "https://connectapi.garmin.com/oauth-service/oauth/access_token",
  },
  version: "1",
});

export const Geeklist = makeOauthFactory({
  id: "geeklist",
  name: "Geeklist",
  requestTokenUrl: "https://api.geekli.st/v1/oauth/request_token",
  authorization: {
    url: "https://geekli.st/oauth/authorize",
  },
  website: "https://geekli.st",
  token: { url: "https://api.geekli.st/v1/oauth/access_token" },
  version: "1",
});

export const Genius = makeOauthFactory({
  id: "genius",
  name: "Genius",
  authorization: {
    url: "https://api.genius.com/oauth/authorize",
  },
  token: { url: "https://api.genius.com/oauth/token" },
  website: "https://genius.com",
  version: "2",
});

// FIXME
export const Getbase = makeOauthFactory({
  id: "getbase",
  name: "Getbase",
  authorization: {
    url: "https://api.getbase.com/oauth2/authorize",
  },
  token: { url: "https://api.getbase.com/oauth2/token" },
  website: "https://www.getbase.com/sell/",
  version: "2",
});

export const Pocket = makeOauthFactory({
  id: "pocket",
  name: "Pocket",
  requestTokenUrl: "https://getpocket.com/v3/oauth/request",
  authorization: {
    url: "https://getpocket.com/auth/authorize",
  },
  website: "https://getpocket.com",
  token: { url: "https://getpocket.com/v3/oauth/authorize" },
  version: "1",
});

export const Gitbook = makeOauthFactory({
  id: "gitbook",
  name: "GitBook",
  authorization: {
    url: "https://api.gitbook.com/oauth/authorize",
  },
  token: { url: "https://api.gitbook.com/oauth/access_token" },
  website: "https://www.gitbook.com",
  version: "2",
});

// export const GitHub = makeOauthFactory({
// 	id: 'github',
// 	name: 'GitHub',
// 	authorization: {
// url: 'https://github.com/login/oauth/authorize',
// },
// 	tokenUrl: 'https://github.com/login/oauth/access_token',
// 	website: 'https://github.com',
// 	version: "2",
// });

// export const Gitlab = make({
//   id: "gitlab",
//   name: "",
//   authorization: {
// url: "https://gitlab.com/oauth/authorize",
// },
//   tokenUrl: "https://gitlab.com/oauth/token",
//   website: "",
//   version: "2",
//
// });

// TODO use Matrix? https://spec.matrix.org/latest/client-server-api/
// export const Gitter = makeOauthFactory({
//   id: "gitter",
//   name: "Gitter",
//   authorization: {
// url: "https://gitter.im/login/oauth/authorize",
// },
//   tokenUrl: "https://gitter.im/login/oauth/token",
//   website: "https://gitter.im",
//   version: "2",
// });

export const Goodreads = makeOauthFactory({
  id: "goodreads",
  name: "Goodreads",
  requestTokenUrl: "https://www.goodreads.com/oauth/request_token",
  authorization: {
    url: "https://www.goodreads.com/oauth/authorize",
  },
  website: "https://www.goodreads.com",
  token: { url: "https://www.goodreads.com/oauth/access_token" },
  version: "1",
});

// export const Google = make({
//   id: "google",
//   name: "",
//   authorization: {
// url: "https://accounts.google.com/o/oauth2/v2/auth",
// },
//   tokenUrl: "https://oauth2.googleapis.com/token",
//   website: "",
//   version: "2",
//
// });

export const Groove = makeOauthFactory({
  id: "groove",
  name: "Groove",
  authorization: {
    url: "https://api.groovehq.com/oauth/authorize",
  },
  token: { url: "https://api.groovehq.com/oauth/token" },
  website: "https://www.groovehq.com",
  version: "2",
});

export const Gumroad = makeOauthFactory({
  id: "gumroad",
  name: "Gumroad",
  authorization: {
    url: "https://gumroad.com/oauth/authorize",
  },
  token: { url: "https://gumroad.com/oauth/token" },
  website: "https://gumroad.com",
  version: "2",
});

export const Harvest = makeOauthFactory({
  id: "harvest",
  name: "Harvest",
  authorization: {
    url: "https://api.harvestapp.com/oauth2/authorize",
  },
  token: { url: "https://api.harvestapp.com/oauth2/token" },
  website: "https://www.getharvest.com",
  version: "2",
});

export const HelloSign = makeOauthFactory({
  id: "hellosign",
  name: "HelloSign",
  authorization: {
    url: "https://www.hellosign.com/oauth/authorize",
  },
  token: { url: "https://www.hellosign.com/oauth/token" },
  website: "https://www.hellosign.com",
  version: "2",
});

export const Heroku = makeOauthFactory({
  id: "heroku",
  name: "Heroku",
  authorization: {
    url: "https://id.heroku.com/oauth/authorize",
  },
  token: { url: "https://id.heroku.com/oauth/token" },
  website: "https://www.heroku.com",
  version: "2",
});

export const Homeaway = makeOauthFactory({
  id: "homeaway",
  name: "HomeAway",
  authorization: {
    url: "https://ws.homeaway.com/oauth/authorize",
  },
  token: { url: "https://ws.homeaway.com/oauth/token" },
  website: "https://www.homeaway.com",
  version: "2",
});

export const Hootsuite = makeOauthFactory({
  id: "hootsuite",
  name: "Hootsuite",
  authorization: {
    url: "https://platform.hootsuite.com/oauth2/auth",
  },
  token: { url: "https://platform.hootsuite.com/oauth2/token" },
  website: "https://hootsuite.com",
  version: "2",
});

export const Huddle = makeOauthFactory({
  id: "huddle",
  name: "Huddle",
  authorization: {
    url: "https://login.huddle.net/request",
  },
  token: { url: "https://login.huddle.net/token" },
  website: "https://www.huddle.com",
  version: "2",
});

export const IBM = makeOauthFactory({
  id: "ibm",
  name: "IBM",
  authorization: {
    url: "https://login.ibm.com/oidc/endpoint/default/authorize",
  },
  token: { url: "https://login.ibm.com/oidc/endpoint/default/token" },
  website: "https://www.ibm.com",
  version: "2",
});

export const Iconfinder = makeOauthFactory({
  id: "iconfinder",
  name: "Iconfinder",
  authorization: {
    url: "https://www.iconfinder.com/api/v2/oauth2/authorize",
  },
  token: { url: "https://www.iconfinder.com/api/v2/oauth2/token" },
  website: "",
  version: "2",
});

export const IDme = makeOauthFactory({
  id: "idme",
  name: "ID.me",
  authorization: {
    url: "https://api.id.me/oauth/authorize",
  },
  token: { url: "https://api.id.me/oauth/token" },
  website: "https://www.id.me",
  version: "2",
});

export const IDoneThis = makeOauthFactory({
  id: "idonethis",
  name: "I Done This",
  authorization: {
    url: "https://idonethis.com/api/oauth2/authorize/",
  },
  token: { url: "https://idonethis.com/api/oauth2/token/" },
  website: "https://home.idonethis.com",
  version: "2",
});

export const Imgur = makeOauthFactory({
  id: "imgur",
  name: "Imgur",
  authorization: {
    url: "https://api.imgur.com/oauth2/authorize",
  },
  token: { url: "https://api.imgur.com/oauth2/token" },
  website: "https://imgur.com",
  version: "2",
});

export const Infusionsoft = makeOauthFactory({
  id: "infusionsoft",
  name: "Infusionsoft",
  authorization: {
    url: "https://signin.infusionsoft.com/app/oauth/authorize",
  },
  token: { url: "https://api.infusionsoft.com/token" },
  website: "https://www.infusionsoft.com",
  version: "2",
});

// export const Instagram = make({
//   id: "instagram",
//   name: "",
//   authorization: {
// url: "https://api.instagram.com/oauth/authorize",
// },
//   tokenUrl: "https://api.instagram.com/oauth/access_token",
//   website: "",
//   version: "2",
//
// });

export const Intuit = makeOauthFactory({
  id: "intuit",
  name: "Intuit",
  authorization: {
    url: "https://appcenter.intuit.com/connect/oauth2",
  },
  token: { url: "https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer" },
  website: "https://www.intuit.com",
  version: "2",
});

export const Jamendo = makeOauthFactory({
  id: "jamendo",
  name: "Jamendo",
  authorization: {
    url: "https://api.jamendo.com/v3.0/oauth/authorize",
  },
  token: { url: "https://api.jamendo.com/v3.0/oauth/grant" },
  website: "https://www.jamendo.com",
  version: "2",
});

// Dead
// export const Jumplead = makeOauthFactory({
//   id: "jumplead",
//   name: "Jumplead",
//   authorization: {
// url: "https://account.mooloop.com/oauth/authorize",
// },
//   tokenUrl: "https://account.mooloop.com/oauth/access_token",
//   website: "https://www.jumplead.com",
//   version: "2",
// });

// export const Kakao = make({
//   id: "kakao",
//   name: "",
//   authorization: {
// url: "https://kauth.kakao.com/oauth/authorize",
// },
//   tokenUrl: "https://kauth.kakao.com/oauth/token",
//   website: "",
//   version: "2",
// });

// export const Keycloak = makeOauthFactoryWithSubdomainArg({
//   id: "keycloak",
//   name: "",
//   authorization: {
// url: "https://[subdomain]/protocol/openid-connect/auth",
// },
//   tokenUrl: "https://[subdomain]/protocol/openid-connect/token",
//   website: "",
//   version: "2",
//
// });

// export const Line = make({
//   id: "line",
//   name: "",
//   authorization: {
// url: "https://access.line.me/oauth2/v2.1/authorize",
// },
//   tokenUrl: "https://api.line.me/oauth2/v2.1/token",
//   website: "",
//   version: "2",
//
// });

// export const Linkedin = make({
//   id: "linkedin",
//   name: "",
//   authorization: {
// url: "https://www.linkedin.com/oauth/v2/authorization",
// },
//   tokenUrl: "https://www.linkedin.com/oauth/v2/accessToken",
//   website: "",
//   version: "2",
//
// });

export const MicrosoftLive = makeOauthFactory({
  id: "live",
  name: "Microsoft Live",
  authorization: {
    url: "https://login.live.com/oauth20_authorize.srf",
  },
  token: { url: "https://login.live.com/oauth20_token.srf" },
  website: "https://live.com",
  version: "2",
});

export const LiveChat = makeOauthFactory({
  id: "livechat",
  name: "LiveChat",
  authorization: {
    url: "https://accounts.livechatinc.com/",
  },
  token: { url: "https://accounts.livechatinc.com/token" },
  website: "https://www.livechat.com",
  version: "2",
});

export const LoginGOV = makeOauthFactory({
  id: "logingov",
  name: "Login.gov",
  authorization: {
    url: "https://idp.int.identitysandbox.gov/openid_connect/authorize",
  },
  token: {
    url: "https://idp.int.identitysandbox.gov/api/openid_connect/token",
  },
  website: "https://login.gov",
  version: "2",
});

export const Lyft = makeOauthFactory({
  id: "lyft",
  name: "Lyft",
  authorization: {
    url: "https://api.lyft.com/oauth/authorize",
  },
  token: { url: "https://api.lyft.com/oauth/token" },
  website: "https://www.lyft.com",
  version: "2",
});

// export const Mailchimp = make({
//   id: "mailchimp",
//   name: "",
//   authorization: {
// url: "https://login.mailchimp.com/oauth2/authorize",
// },
//   tokenUrl: "https://login.mailchimp.com/oauth2/token",
//   website: "",
//   version: "2",
// });

export const MailUp = makeOauthFactory({
  id: "mailup",
  name: "MailUp",
  authorization: {
    url: "https://services.mailup.com/Authorization/OAuth/Authorization",
  },
  website: "https://www.mailup.com",
  token: { url: "https://services.mailup.com/Authorization/OAuth/Token" },
  version: "2",
});

export const Mailxpert = makeOauthFactory({
  id: "mailxpert",
  name: "Mailxpert",
  authorization: {
    url: "https://app.mailxpert.ch/oauth/v2/auth",
  },
  token: { url: "https://app.mailxpert.ch/oauth/v2/token" },
  website: "https://www.mailxpert.ch",
  version: "2",
});

export const MapMyFitness = makeOauthFactory({
  id: "mapmyfitness",
  name: "MapMyFitness",
  authorization: {
    url: "https://www.mapmyfitness.com/v7.1/oauth2/uacf/authorize",
  },
  token: { url: "https://api.mapmyfitness.com/v7.1/oauth2/access_token" },
  website: "https://www.mapmyfitness.com",
  version: "2",
});

export const Mastodon = makeOauthFactoryWithSubdomainArg({
  id: "mastodon",
  name: "Mastodon",
  authorization: {
    url: "https://[subdomain]/oauth/authorize",
  },
  token: { url: "https://[subdomain]/oauth/token" },
  website: "https://joinmastodon.org",
  version: "2",
});

// export const Medium = make({
//   id: "medium",
//   name: "",
//   authorization: {
// url: "https://medium.com/m/oauth/authorize",
// },
//   tokenUrl: "https://api.medium.com/v1/tokens",
//   website: "",
//   version: "2",
// });

export const Meetup = makeOauthFactory({
  id: "meetup",
  name: "Meetup",
  authorization: {
    url: "https://secure.meetup.com/oauth2/authorize",
  },
  token: { url: "https://secure.meetup.com/oauth2/access" },
  website: "https://www.meetup.com",
  version: "2",
});

export const Mendeley = makeOauthFactory({
  id: "mendeley",
  name: "Mendeley",
  authorization: {
    url: "https://api.mendeley.com/oauth/authorize",
  },
  token: { url: "https://api.mendeley.com/oauth/token" },
  website: "https://www.mendeley.com",
  version: "2",
});

export const Mention = makeOauthFactory({
  id: "mention",
  name: "Mention",
  authorization: {
    url: "https://web.mention.com/authorize",
  },
  token: { url: "https://web.mention.net/oauth/v2/token" },
  website: "https://mention.com",
  version: "2",
});

export const Microsoft = makeOauthFactory({
  id: "microsoft",
  name: "Microsoft",
  authorization: {
    url: "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
  },
  website: "https://www.microsoft.com",
  token: { url: "https://login.microsoftonline.com/common/oauth2/v2.0/token" },
  version: "2",
});

export const Mixcloud = makeOauthFactory({
  id: "mixcloud",
  name: "Mixcloud",
  authorization: {
    url: "https://www.mixcloud.com/oauth/authorize",
  },
  token: { url: "https://www.mixcloud.com/oauth/access_token" },
  website: "https://www.mixcloud.com",
  version: "2",
});

export const Moxtra = makeOauthFactory({
  id: "moxtra",
  name: "Moxtra",
  authorization: {
    url: "https://api.moxtra.com/oauth/authorize",
  },
  token: { url: "https://api.moxtra.com/oauth/token" },
  website: "https://www.moxtra.com",
  version: "2",
});

export const MYOB = makeOauthFactory({
  id: "myob",
  name: "MYOB",
  authorization: {
    url: "https://secure.myob.com/oauth2/account/authorize",
  },
  token: { url: "https://secure.myob.com/oauth2/v1/authorize" },
  website: "https://www.myob.com",
  version: "2",
});

// export const Naver = make({
//   id: "naver",
//   name: "",
//   authorization: {
// url: "https://nid.naver.com/oauth2.0/authorize",
// },
//   tokenUrl: "https://nid.naver.com/oauth2.0/token",
//   website: "",
//   version: "2",
// });

export const Nest = makeOauthFactory({
  id: "nest",
  name: "Nest",
  authorization: {
    url: "https://home.nest.com/login/oauth2",
  },
  token: { url: "https://api.home.nest.com/oauth2/access_token" },
  website: "https://www.nest.com",
  version: "2",
});

// export const Netlify = make({
//   id: "netlify",
//   name: "",
//   authorization: {
// url: "https://app.netlify.com/authorize",
// },
//   tokenUrl: "https://api.netlify.com/oauth/token",
//   website: "",
//   version: "2",
// });

export const NokoTime = makeOauthFactory({
  id: "nokotime",
  name: "NokoTime",
  authorization: {
    url: "https://secure.nokotime.com/oauth/2/authorize",
  },
  token: { url: "https://secure.nokotime.com/oauth/2/access_token" },
  website: "https://www.nokotime.com",
  version: "2",
});

export const Notion = makeOauthFactory({
  id: "notion",
  name: "Notion",
  authorization: {
    url: "https://api.notion.com/v1/oauth/authorize",
  },
  token: { url: "https://api.notion.com/v1/oauth/token" },
  website: "https://www.notion.so",
  version: "2",
});

export const Nylas = makeOauthFactory({
  id: "nylas",
  name: "Nylas",
  authorization: {
    url: "https://api.nylas.com/oauth/authorize",
  },
  token: { url: "https://api.nylas.com/oauth/token" },
  website: "https://www.nylas.com",
  version: "2",
});

// export const Okta = makeOauthFactoryWithSubdomainArg({
//   id: "okta",
//   name: "",
//   authorization: {
// url: "https://[subdomain].okta.com/oauth2/v1/authorize",
// },
//   tokenUrl: "https://[subdomain].okta.com/oauth2/v1/token",
//   website: "",
//   version: "2",
//
// });

// export const Onelogin = makeOauthFactoryWithSubdomainArg({
//   id: "onelogin",
//   name: "",
//   authorization: {
// url: "https://[subdomain].onelogin.com/oidc/auth",
// },
//   tokenUrl: "https://[subdomain].onelogin.com/oidc/token",
//   website: "",
//   version: "2",
//
// });

// export const OpenStreetMap = makeOauthFactory({
//   id: "openstreetmap",
//   name: "OpenStreetMap",
//   requestTokenUrl: "https://www.openstreetmap.org/oauth/request_token",
//   authorization: {
// url: "https://www.openstreetmap.org/oauth/authorize",
// },
//   website: "https://www.openstreetmap.org",
//   tokenUrl: "https://www.openstreetmap.org/oauth/access_token",
//   version: "1",
// });

export const OpenStreetMap2 = makeOauthFactory({
  id: "openstreetmap2",
  name: "OpenStreetMap",
  authorization: {
    url: "https://www.openstreetmap.org/oauth2/authorize",
  },
  token: { url: "https://www.openstreetmap.org/oauth2/token" },
  website: "https://www.openstreetmap.org",
  version: "2",
});

export const Optimizely = makeOauthFactory({
  id: "optimizely",
  name: "Optimizely",
  authorization: {
    url: "https://app.optimizely.com/oauth2/authorize",
  },
  token: { url: "https://app.optimizely.com/oauth2/token" },
  website: "https://www.optimizely.com",
  version: "2",
});

// export const Osu = make({
//   id: "osu",
//   name: "",
//   authorization: {
// url: "https://osu.ppy.sh/oauth/authorize",
// },
//   tokenUrl: "https://osu.ppy.sh/oauth/token",
//   website: "",
//   version: "2",
//
// });

// export const Patreon = make({
//   id: "patreon",
//   name: "",
//   authorization: {
// url: "https://www.patreon.com/oauth2/authorize",
// },
//   tokenUrl: "https://www.patreon.com/api/oauth2/token",
//   website: "",
//   version: "2",
//
// });

export const PayPal = makeOauthFactory({
  id: "paypal",
  name: "PayPal",
  authorization: {
    url: "https://www.paypal.com/webapps/auth/protocol/openidconnect/v1/authorize",
  },
  website: "https://www.paypal.com",
  token: {
    url: "https://api.paypal.com/v1/identity/openidconnect/tokenservice",
  },
  version: "2",
});

// What is this!?
//
// export const Phantauth = makeOauthFactory({
//   id: "phantauth",
//   name: "Phantauth",
//   authorization: {
// url: "https://phantauth.net/auth/authorize",
// },
//   tokenUrl: "https://phantauth.net/auth/token",
//   website: "https://www.phantauth.net",
//   version: "2",
//
// });

// export const Pinterest = make({
//   id: "pinterest",
//   name: "",
//   authorization: {
// url: "https://api.pinterest.com/oauth/",
// },
//   tokenUrl: "https://api.pinterest.com/v1/oauth/token",
//   website: "",
//   version: "2",
// });

export const Plurk = makeOauthFactory({
  id: "plurk",
  name: "Plurk",
  requestTokenUrl: "https://www.plurk.com/OAuth/request_token",
  authorization: {
    url: "https://www.plurk.com/OAuth/authorize",
  },
  website: "https://www.plurk.com",
  token: { url: "https://www.plurk.com/OAuth/access_token" },
  version: "1",
});

export const Podio = makeOauthFactory({
  id: "podio",
  name: "Podio",
  authorization: {
    url: "https://podio.com/oauth/authorize",
  },
  token: { url: "https://podio.com/oauth/token" },
  website: "https://www.podio.com",
  version: "2",
});

export const Procore = makeOauthFactory({
  id: "procore",
  name: "Procore",
  authorization: {
    url: "https://login.procore.com/oauth/authorize",
  },
  token: { url: "https://login.procore.com/oauth/token" },
  website: "https://www.procore.com",
  version: "2",
});

export const ProductHunt = makeOauthFactory({
  id: "producthunt",
  name: "Product Hunt",
  authorization: {
    url: "https://api.producthunt.com/v1/oauth/authorize",
  },
  token: { url: "https://api.producthunt.com/v1/oauth/token" },
  website: "https://www.producthunt.com",
  version: "2",
});

// export const Projectplace = makeOauthFactory({
//   id: "projectplace",
//   name: "Projectplace",
//   requestTokenUrl: "https://api.projectplace.com/initiate",
//   authorization: {
// url: "https://api.projectplace.com/authorize",
// },
//   website: "https://www.projectplace.com",
//   tokenUrl: "https://api.projectplace.com/token",
//   version: "1",
// });

export const Projectplace = makeOauthFactory({
  id: "projectplace",
  name: "Projectplace",
  authorization: {
    url: "https://api.projectplace.com/oauth2/authorize",
  },
  token: { url: "https://api.projectplace.com/oauth2/access_token" },
  website: "https://www.projectplace.com",
  version: "2",
});

export const Pushbullet = makeOauthFactory({
  id: "pushbullet",
  name: "Pushbullet",
  authorization: {
    url: "https://www.pushbullet.com/authorize",
  },
  token: { url: "https://api.pushbullet.com/oauth2/token" },
  website: "https://pushbullet.com",
  version: "2",
});

export const Qq = makeOauthFactory({
  id: "qq",
  name: "Qq",
  authorization: {
    url: "https://graph.qq.com/oauth2.0/authorize",
  },
  token: { url: "https://graph.qq.com/oauth2.0/token" },
  website: "https://qq.com",
  version: "2",
});

export const Ravelry = makeOauthFactory({
  id: "ravelry",
  name: "Ravelry",
  requestTokenUrl: "https://www.ravelry.com/oauth/request_token",
  authorization: {
    url: "https://www.ravelry.com/oauth/authorize",
  },
  website: "https://ravelry.com",
  token: { url: "https://www.ravelry.com/oauth/access_token" },
  version: "1",
});

export const Redbooth = makeOauthFactory({
  id: "redbooth",
  name: "Redbooth",
  authorization: {
    url: "https://redbooth.com/oauth2/authorize",
  },
  token: { url: "https://redbooth.com/oauth2/token" },
  website: "https://redbooth.com",
  version: "2",
});

// export const Reddit = make({
//   id: "reddit",
//   name: "",
//   authorization: {
// url: "https://ssl.reddit.com/api/v1/authorize",
// },
//   tokenUrl: "https://ssl.reddit.com/api/v1/access_token",
//   website: "",
//   version: "2",
// });

export const Runkeeper = makeOauthFactory({
  id: "runkeeper",
  name: "Runkeeper",
  authorization: {
    url: "https://runkeeper.com/apps/authorize",
  },
  token: { url: "https://runkeeper.com/apps/token" },
  website: "https://runkeeper.com",
  version: "2",
});

// export const Salesforce = make({
//   id: "salesforce",
//   name: "",
//   authorization: {
// url: "https://login.salesforce.com/services/oauth2/authorize",
// },
//   tokenUrl: "https://login.salesforce.com/services/oauth2/token",
//   website: "",
//   version: "2",
//
// });

export const Sellsy = makeOauthFactory({
  id: "sellsy",
  name: "Sellsy",
  website: "https://sellsy.com",
  documentationUrl: "https://api.sellsy.com/doc/v2/#section/Authentication",
  version: "2",
  authorization: {
    url: "https://login.sellsy.com/oauth2/authorization",
  },
  token: {
    url: "https://login.sellsy.com/oauth2/access-tokens",
  },
  checks: ["pkce"],
});

export const Shoeboxed = makeOauthFactory({
  id: "shoeboxed",
  name: "Shoeboxed",
  authorization: {
    url: "https://id.shoeboxed.com/oauth/authorize",
  },
  token: { url: "https://id.shoeboxed.com/oauth/token" },
  website: "https://shoeboxed.com",
  version: "2",
});

export const Shopify = makeOauthFactoryWithSubdomainArg({
  id: "shopify",
  name: "Shopify",
  authorization: {
    url: "https://[subdomain].myshopify.com/admin/oauth/authorize",
  },
  token: { url: "https://[subdomain].myshopify.com/admin/oauth/access_token" },
  website: "https://shopify.com",
  version: "2",
});

export const Skyrock = makeOauthFactory({
  id: "skyrock",
  name: "Skyrock",
  requestTokenUrl: "https://api.skyrock.com/v2/oauth/initiate",
  authorization: {
    url: "https://api.skyrock.com/v2/oauth/authorize",
  },
  website: "https://skyrock.com",
  token: { url: "https://api.skyrock.com/v2/oauth/token" },
  version: "1",
});

// export const Slack = make({
//   id: "slack",
//   name: "",
//   authorization: {
// url: "https://slack.com/oauth/authorize",
// },
//   tokenUrl: "https://slack.com/api/oauth.access",
//   website: "",
//   version: "2",
// });

// Dead.
// export const Slice = makeOauthFactory({
//   id: "slice",
//   name: "Slice",
//   authorization: {
// url: "https://api.slice.com/oauth/authorize",
// },
//   tokenUrl: "https://api.slice.com/oauth/token",
//   website: "https://slice.com",
//   version: "2",
// });

export const Smartsheet = makeOauthFactory({
  id: "smartsheet",
  name: "Smartsheet",
  authorization: {
    url: "https://app.smartsheet.com/b/authorize",
  },
  token: { url: "https://api.smartsheet.com/2.0/token" },
  website: "https://smartsheet.com",
  version: "2",
});

// https://api.smugmug.com/api/v2/doc/tutorial/authorization.html
export const Smugmug = makeOauthFactory({
  id: "smugmug",
  name: "Smugmug",
  requestTokenUrl:
    "https://api.smugmug.com/services/oauth/1.0a/getRequestToken",
  authorization: {
    url: "https://api.smugmug.com/services/oauth/1.0a/authorize",
  },
  website: "https://smugmug.com",
  token: { url: "https://api.smugmug.com/services/oauth/1.0a/getAccessToken" },
  version: "1",
});

export const Snapchat = makeOauthFactory({
  id: "snapchat",
  name: "Snapchat",
  authorization: {
    url: "https://accounts.snapchat.com/accounts/oauth2/auth",
  },
  token: { url: "https://accounts.snapchat.com/accounts/oauth2/token" },
  website: "https://snapchat.com",
  version: "2",
});

export const Snowflake = makeOauthFactoryWithSubdomainArg({
  id: "snowflake",
  name: "Snowflake",
  authorization: {
    url: "https://[subdomain].snowflakecomputing.com/oauth/authorize",
  },
  token: {
    url: "https://[subdomain].snowflakecomputing.com/oauth/token-request",
  },
  website: "https://www.snowflake.com",
  version: "2",
});

export const SocialPilot = makeOauthFactory({
  id: "socialpilot",
  name: "SocialPilot",
  authorization: {
    url: "https://panel.socialpilot.co/oauth",
  },
  token: { url: "https://panel.socialpilot.co/oauth/accesstoken" },
  website: "https://www.socialpilot.co",
  version: "2",
});

export const Socrata = makeOauthFactoryWithSubdomainArg({
  id: "socrata",
  name: "Socrata",
  authorization: {
    url: "https://[subdomain]/oauth/authorize",
  },
  token: { url: "https://[subdomain]/oauth/access_token" },
  website: "https://www.socrata.com",
  version: "2",
});

export const SoundCloud = makeOauthFactory({
  id: "soundcloud",
  name: "SoundCloud",
  authorization: {
    url: "https://soundcloud.com/connect",
  },
  token: { url: "https://api.soundcloud.com/oauth2/token" },
  website: "https://soundcloud.com",
  version: "2",
});

// export const Spotify = make({
//   id: "spotify",
//   name: "",
//   authorization: {
// url: "https://accounts.spotify.com/authorize",
// },
//   tokenUrl: "https://accounts.spotify.com/api/token",
//   website: "",
//   version: "2",
//
// });

export const Square = makeOauthFactory({
  id: "square",
  name: "Square",
  authorization: {
    url: "https://connect.squareup.com/oauth2/authorize",
  },
  token: { url: "https://connect.squareup.com/oauth2/token" },
  website: "https://squareup.com",
  version: "2",
});

export const StackExchange = makeOauthFactory({
  id: "stackexchange",
  name: "Stack Exchange",
  authorization: {
    url: "https://stackexchange.com/oauth",
  },
  token: { url: "https://stackexchange.com/oauth/access_token" },
  website: "https://stackexchange.com",
  version: "2",
});

export const Stocktwits = makeOauthFactory({
  id: "stocktwits",
  name: "Stocktwits",
  authorization: {
    url: "https://api.stocktwits.com/api/2/oauth/authorize",
  },
  token: { url: "https://api.stocktwits.com/api/2/oauth/token" },
  website: "https://stocktwits.com",
  version: "2",
});

export const Stormz = makeOauthFactory({
  id: "stormz",
  name: "Stormz",
  authorization: {
    url: "https://stormz.me/oauth/authorize",
  },
  token: { url: "https://stormz.me/oauth/token" },
  website: "https://stormz.me",
  version: "2",
});

export const Storyblok = makeOauthFactory({
  id: "storyblok",
  name: "Storyblok",
  authorization: {
    url: "https://app.storyblok.com/oauth/authorize",
  },
  token: { url: "https://app.storyblok.com/oauth/token" },
  website: "https://www.storyblok.com",
  version: "2",
});

// export const Strava = make({
//   id: "strava",
//   name: "",
//   authorization: {
// url: "https://www.strava.com/oauth/authorize",
// },
//   tokenUrl: "https://www.strava.com/oauth/token",
//   website: "",
//   version: "2",
// });

export const Stripe = makeOauthFactory({
  id: "stripe",
  name: "Stripe",
  authorization: {
    url: "https://connect.stripe.com/oauth/authorize",
  },
  token: { url: "https://connect.stripe.com/oauth/token" },
  website: "https://stripe.com",
  version: "2",
});

export const SurveyMonkey = makeOauthFactory({
  id: "surveymonkey",
  name: "SurveyMonkey",
  authorization: {
    url: "https://api.surveymonkey.com/oauth/authorize",
  },
  token: { url: "https://api.surveymonkey.net/oauth/token" },
  website: "https://www.surveymonkey.com",
  version: "2",
});

export const SurveysParrow = makeOauthFactory({
  id: "surveysparrow",
  name: "SurveySparrow",
  authorization: {
    url: "https://app.surveysparrow.com/o/oauth/auth",
  },
  token: { url: "https://app.surveysparrow.com/o/oauth/token" },
  website: "https://surveysparrow.com",
  version: "2",
});

export const Thingiverse = makeOauthFactory({
  id: "thingiverse",
  name: "Thingiverse",
  authorization: {
    url: "https://www.thingiverse.com/login/oauth/authorize",
  },
  token: { url: "https://www.thingiverse.com/login/oauth/access_token" },
  website: "https://www.thingiverse.com",
  version: "2",
});

export const Ticketbud = makeOauthFactory({
  id: "ticketbud",
  name: "Ticketbud",
  authorization: {
    url: "https://api.ticketbud.com/oauth/authorize",
  },
  token: { url: "https://api.ticketbud.com/oauth/token" },
  website: "https://www.ticketbud.com",
  version: "2",
});

export const TikTok = makeOauthFactory({
  id: "tiktok",
  name: "TikTok",
  authorization: {
    url: "https://open-api.tiktok.com/platform/oauth/connect/",
  },
  token: { url: "https://open-api.tiktok.com/oauth/access_token/" },
  website: "https://www.tiktok.com",
  version: "2",
});

export const Timely = makeOauthFactory({
  id: "timely",
  name: "Timely",
  authorization: {
    url: "https://api.timelyapp.com/1.1/oauth/authorize",
  },
  token: { url: "https://api.timelyapp.com/1.1/oauth/token" },
  website: "https://www.timelyapp.com",
  version: "2",
});

// export const Todoist = make({
//   id: "todoist",
//   name: "",
//   authorization: {
// url: "https://todoist.com/oauth/authorize",
// },
//   tokenUrl: "https://todoist.com/oauth/access_token",
//   website: "",
//   version: "2",
// });

// export const Trakt = make({
//   id: "trakt",
//   name: "",
//   authorization: {
// url: "https://api-v2launch.trakt.tv/oauth/authorize",
// },
//   tokenUrl: "https://api-v2launch.trakt.tv/oauth/token",
//   website: "",
//   version: "2",
// });

export const Traxo = makeOauthFactory({
  id: "traxo",
  name: "Traxo",
  authorization: {
    url: "https://www.traxo.com/oauth/authenticate",
  },
  token: { url: "https://www.traxo.com/oauth/token" },
  website: "https://www.traxo.com",
  version: "2",
});

export const Trello = makeOauthFactory({
  id: "trello",
  name: "Trello",
  requestTokenUrl: "https://trello.com/1/OAuthGetRequestToken",
  authorization: {
    url: "https://trello.com/1/OAuthAuthorizeToken",
  },
  website: "https://trello.com",
  token: { url: "https://trello.com/1/OAuthGetAccessToken" },
  version: "1",
});

export const TripIt = makeOauthFactory({
  id: "tripit",
  name: "TripIt",
  requestTokenUrl: "https://api.tripit.com/oauth/request_token",
  authorization: {
    url: "https://www.tripit.com/oauth/authorize",
  },
  website: "https://www.tripit.com",
  token: { url: "https://api.tripit.com/oauth/access_token" },
  version: "1",
});

export const Trustpilot = makeOauthFactory({
  id: "trustpilot",
  name: "Trustpilot",
  authorization: {
    url: "https://authenticate.trustpilot.com",
  },
  token: {
    url: "https://api.trustpilot.com/v1/oauth/oauth-business-users-for-applications/accesstoken",
  },
  website: "https://www.trustpilot.com",
  version: "2",
});

export const Tumblr = makeOauthFactory({
  id: "tumblr",
  name: "Tumblr",
  website: "https://tumblr.com",
  version: "2",
  authorization: {
    url: "https://www.tumblr.com/oauth2/authorize",
  },
  token: {
    url: "https://www.tumblr.com/v2/oauth2/token",
  },
  // checks: ["pkce"],
});

// export const Twitch = make({
//   id: "twitch",
//   name: "",
//   authorization: {
// url: "https://id.twitch.tv/oauth2/authorize",
// },
//   tokenUrl: "https://id.twitch.tv/oauth2/token",
//   website: "",
//   version: "2",
//
// });

// export const Twitter = make({
//   id: "twitter",
//   name: "",
//   request_url: "https://api.twitter.com/oauth/request_token",
//   authorization: {
// url: "https://api.twitter.com/oauth/authenticate",
// },
//   website: "",
//   tokenUrl: "https://api.twitter.com/oauth/access_token",
//   version: "1",
// });

export const Twitter = makeOauthFactory({
  id: "twitter",
  name: "Twitter",
  website: "https://twitter.com",
  version: "2",
  authorization: {
    url: "https://twitter.com/i/oauth2/authorize",
  },
  token: {
    url: "https://api.twitter.com/2/oauth2/token",
  },
  checks: ["pkce"],
});

export const Typeform = makeOauthFactory({
  id: "typeform",
  name: "Typeform",
  authorization: {
    url: "https://api.typeform.com/oauth/authorize",
  },
  token: { url: "https://api.typeform.com/oauth/token" },
  website: "https://www.typeform.com",
  version: "2",
});

export const Uber = makeOauthFactory({
  id: "uber",
  name: "Uber",
  authorization: {
    url: "https://login.uber.com/oauth/authorize",
  },
  token: { url: "https://login.uber.com/oauth/token" },
  website: "https://www.uber.com",
  version: "2",
});

export const Unbounce = makeOauthFactory({
  id: "unbounce",
  name: "Unbounce",
  authorization: {
    url: "https://api.unbounce.com/oauth/authorize",
  },
  token: { url: "https://api.unbounce.com/oauth/token" },
  website: "https://www.unbounce.com",
  version: "2",
});

export const UnderArmour = makeOauthFactory({
  id: "underarmour",
  name: "Under Armour",
  authorization: {
    url: "https://www.mapmyfitness.com/v7.1/oauth2/uacf/authorize",
  },
  token: { url: "https://api.mapmyfitness.com/v7.1/oauth2/access_token" },
  website: "https://www.underarmour.com",
  version: "2",
});

// Scope delimiter for Unsplash is 2.
export const Unsplash = makeOauthFactory({
  id: "unsplash",
  name: "Unsplash",
  authorization: {
    url: "https://unsplash.com/oauth/authorize",
  },
  token: { url: "https://unsplash.com/oauth/token" },
  website: "https://unsplash.com",
  version: "2",
  // scopeDelimiter: "+",
});

export const Untappd = makeOauthFactory({
  id: "untappd",
  name: "Untappd",
  authorization: {
    url: "https://untappd.com/oauth/authenticate",
  },
  token: { url: "https://untappd.com/oauth/authorize" },
  website: "https://untappd.com",
  version: "2",
});

export const Upwork = makeOauthFactory({
  id: "upwork",
  name: "Upwork",
  requestTokenUrl: "https://www.upwork.com/api/auth/v1/oauth/token/request",
  authorization: {
    url: "https://www.upwork.com/services/api/auth",
  },
  website: "https://www.upwork.com",
  token: { url: "https://www.upwork.com/api/auth/v1/oauth/token/access" },
  version: "1",
});

export const UserVoice = makeOauthFactory({
  id: "uservoice",
  name: "UserVoice",
  requestTokenUrl: "https://outofindex.uservoice.com/oauth/request_token",
  authorization: {
    url: "https://outofindex.uservoice.com/oauth/authorize",
  },
  website: "https://www.uservoice.com",
  token: { url: "https://outofindex.uservoice.com/oauth/access_token" },
  version: "1",
});

export const Vend = makeOauthFactoryWithSubdomainArg({
  id: "vend",
  name: "Vend",
  authorization: {
    url: "https://secure.vendhq.com/connect",
  },
  token: { url: "https://[subdomain].vendhq.com/api/1.0/token" },
  website: "https://www.vendhq.com",
  version: "2",
});

export const Venmo = makeOauthFactory({
  id: "venmo",
  name: "Venmo",
  authorization: {
    url: "https://api.venmo.com/v1/oauth/authorize",
  },
  token: { url: "https://api.venmo.com/v1/oauth/access_token" },
  website: "https://venmo.com",
  version: "2",
});

export const Vercel = makeOauthFactory({
  id: "vercel",
  name: "Vercel",
  authorization: {
    url: "https://vercel.com/oauth/authorize",
  },
  token: { url: "https://api.vercel.com/v2/oauth/access_token" },
  website: "https://vercel.com",
  version: "2",
});

export const VerticalResponse = makeOauthFactory({
  id: "verticalresponse",
  name: "VerticalResponse",
  authorization: {
    url: "https://vrapi.verticalresponse.com/api/v1/oauth/authorize",
  },
  token: {
    url: "https://vrapi.verticalresponse.com/api/v1/oauth/access_token",
  },
  website: "https://www.verticalresponse.com",
  version: "2",
});

export const Viadeo = makeOauthFactory({
  id: "viadeo",
  name: "Viadeo",
  authorization: {
    url: "https://partners.viadeo.com/oauth/authorize",
  },
  token: { url: "https://partners.viadeo.com/oauth/token" },
  website: "https://www.viadeo.com",
  version: "2",
});

export const Vimeo = makeOauthFactory({
  id: "vimeo",
  name: "Vimeo",
  authorization: {
    url: "https://api.vimeo.com/oauth/authorize",
  },
  token: { url: "https://api.vimeo.com/oauth/access_token" },
  website: "https://vimeo.com",
  version: "2",
});

export const VisualStudio = makeOauthFactory({
  id: "visualstudio",
  name: "Visual Studio",
  authorization: {
    url: "https://app.vssps.visualstudio.com/oauth2/authorize",
  },
  token: { url: "https://app.vssps.visualstudio.com/oauth2/token" },
  website: "https://visualstudio.microsoft.com",
  version: "2",
});

// export const Vk = make({
//   id: "vk",
//   name: "",
//   authorization: {
// url: "https://oauth.vk.com/authorize",
// },
//   tokenUrl: "https://oauth.vk.com/access_token",
//   website: "",
//   version: "2",
// });

export const WeChat = makeOauthFactory({
  id: "wechat",
  name: "WeChat",
  authorization: {
    url: "https://open.weixin.qq.com/connect/oauth2/authorize",
  },
  token: { url: "https://api.weixin.qq.com/sns/oauth2/access_token" },
  website: "https://wechat.com",
  version: "2",
});

export const Weekdone = makeOauthFactory({
  id: "weekdone",
  name: "Weekdone",
  authorization: {
    url: "https://weekdone.com/oauth_authorize",
  },
  token: { url: "https://weekdone.com/oauth_token" },
  website: "https://weekdone.com",
  version: "2",
});

export const Weibo = makeOauthFactory({
  id: "weibo",
  name: "Weibo",
  authorization: {
    url: "https://api.weibo.com/oauth2/authorize",
  },
  token: { url: "https://api.weibo.com/oauth2/access_token" },
  website: "https://weibo.com",
  version: "2",
});

export const Withings = makeOauthFactory({
  id: "withings",
  name: "Withings",
  authorization: {
    url: "https://account.withings.com/oauth2_user/authorize2",
  },
  token: { url: "https://wbsapi.withings.net/v2/oauth2" },
  website: "https://www.withings.com",
  version: "2",
});

// export const Wordpress = make({
//   id: "wordpress",
//   name: "",
//   authorization: {
// url: "https://public-api.wordpress.com/oauth2/authorize",
// },
//   tokenUrl: "https://public-api.wordpress.com/oauth2/token",
//   website: "",
//   version: "2",
// });

// export const Workos = make({
//   id: "workos",
//   name: "",
//   authorization: {
// url: "https://api.workos.com/sso/authorize",
// },
//   tokenUrl: "https://api.workos.com/sso/token",
//   website: "",
//   version: "2",
// });

export const Wrike = makeOauthFactory({
  id: "wrike",
  name: "Wrike",
  authorization: {
    url: "https://www.wrike.com/oauth2/authorize",
  },
  token: { url: "https://www.wrike.com/oauth2/token" },
  website: "https://www.wrike.com",
  version: "2",
});

export const Xero = makeOauthFactory({
  id: "xero",
  name: "Xero",
  requestTokenUrl: "https://api.xero.com/oauth/RequestToken",
  authorization: {
    url: "https://api.xero.com/oauth/Authorize",
  },
  website: "https://www.xero.com",
  token: { url: "https://api.xero.com/oauth/AccessToken" },
  version: "1",
});

export const Xing = makeOauthFactory({
  id: "xing",
  name: "Xing",
  requestTokenUrl: "https://api.xing.com/v1/request_token",
  authorization: {
    url: "https://api.xing.com/v1/authorize",
  },
  website: "https://www.xing.com",
  token: { url: "https://api.xing.com/v1/access_token" },
  version: "1",
});

export const Yahoo = makeOauthFactory({
  id: "yahoo",
  name: "Yahoo",
  authorization: {
    url: "https://api.login.yahoo.com/oauth2/request_auth",
  },
  token: { url: "https://api.login.yahoo.com/oauth2/get_token" },
  website: "https://www.yahoo.com",
  version: "2",
});

export const Yammer = makeOauthFactory({
  id: "yammer",
  name: "Yammer",
  authorization: {
    url: "https://www.yammer.com/dialog/oauth",
  },
  token: { url: "https://www.yammer.com/oauth2/access_token.json" },
  website: "https://www.yammer.com",
  version: "2",
});

// export const Yandex = make({
//   id: "yandex",
//   name: "",
//   authorization: {
// url: "https://oauth.yandex.com/authorize",
// },
//   tokenUrl: "https://oauth.yandex.com/token",
//   website: "",
//   version: "2",
// });

export const Zendesk = makeOauthFactoryWithSubdomainArg({
  id: "zendesk",
  name: "Zendesk",
  authorization: {
    url: "https://[subdomain].zendesk.com/oauth/authorizations/new",
  },
  token: { url: "https://[subdomain].zendesk.com/oauth/tokens" },
  website: "https://www.zendesk.com",
  version: "2",
});

// export const Zoom = make({
//   id: "zoom",
//   name: "",
//   authorization: {
// url: "https://zoom.us/oauth/authorize",
// },
//   tokenUrl: "https://zoom.us/oauth/token",
//   website: "",
//   version: "2",
//
// });
