import assert from "assert";
import { HandlerFactory } from "~/core/types";
import { TypicalOAuthArgs, makeHandlerFactory } from "../lib/makeHandler";

function makeOauthFactory(info: {
  id: string;
  title: string;
  oauth: 1 | 2;
  website: string;
  authorizeUrl: string;
  requestTokenUrl?: string;
  tokenUrl: string;
  scopeDelimiter?: string;
}) {
  return makeHandlerFactory({
    id: info.id,
    name: info.title,
    type: "oauth",
    website: info.website,
    version: info.oauth === 2 ? "2" : "1.1",
    authorization: {
      url: info.authorizeUrl,
    },
    token: {
      url: info.tokenUrl,
    },
  }) satisfies HandlerFactory<TypicalOAuthArgs>;
}

function makeOauthFactoryWithSubdomainArg(info: {
  id: string;
  title: string;
  oauth: 1 | 2;
  website: string;
  authorizeUrl: string;
  requestTokenUrl?: string;
  tokenUrl: string;
  scopeDelimiter?: string;
}): HandlerFactory<TypicalOAuthArgs & { subdomain: string }> {
  return (args: TypicalOAuthArgs & { subdomain: string }) => {
    assert(args.subdomain, `Provider ${info.id} requires subdomain value.`);

    return makeHandlerFactory({
      id: info.id,
      name: info.title,
      type: "oauth",
      website: info.website,
      version: info.oauth === 2 ? "2" : "1.1",
      authorization: {
        url: info.authorizeUrl.replace("[subdomain]", args.subdomain),
      },
      token: {
        url: info.tokenUrl.replace("[subdomain]", args.subdomain),
      },
    })(args);
  };
}

export const _23andMe = makeOauthFactory({
  id: "23andme",
  title: "23andMe",
  website: "https://www.23andme.com",
  authorizeUrl: "https://api.23andme.com/authorize",
  tokenUrl: "https://api.23andme.com/token",
  oauth: 2,
  scopeDelimiter: " ",
});

export const _500PX = makeOauthFactory({
  id: "500px",
  title: "500px",
  requestTokenUrl: "https://api.500px.com/v1/oauth/request_token",
  authorizeUrl: "https://api.500px.com/v1/oauth/authorize",
  website: "https://500px.com",
  tokenUrl: "https://api.500px.com/v1/oauth/access_token",
  oauth: 1,
});

export const ActOn = makeOauthFactory({
  id: "acton",
  title: "Act-On",
  authorizeUrl: "https://restapi.actonsoftware.com/authorize",
  tokenUrl: "https://restapi.actonsoftware.com/token",
  website: "https://www.act-on.com",
  oauth: 2,
});

export const AcuityScheduling = makeOauthFactory({
  id: "acuityscheduling",
  title: "Acuity Scheduling",
  authorizeUrl: "https://acuityscheduling.com/oauth2/authorize",
  tokenUrl: "https://acuityscheduling.com/oauth2/token",
  website: "https://acuityscheduling.com",
  oauth: 2,
});

export const Adobe = makeOauthFactory({
  id: "adobe",
  title: "Adobe",
  authorizeUrl: "https://ims-na1.adobelogin.com/ims/authorize/v2",
  tokenUrl: "https://ims-na1.adobelogin.com/ims/token/v3",
  website: "https://www.adobe.com",
  oauth: 2,
});

export const Aha = makeOauthFactoryWithSubdomainArg({
  id: "aha",
  title: "Aha!",
  authorizeUrl: "https://[subdomain].aha.io/oauth/authorize",
  tokenUrl: "https://[subdomain].aha.io/oauth/token",
  website: "https://www.aha.io",
  oauth: 2,
});

export const Alchemer = makeOauthFactory({
  id: "alchemer",
  title: "Alchemer",
  requestTokenUrl: "https://api.alchemer.com/head/oauth/request_token",
  authorizeUrl: "https://api.alchemer.com/head/oauth/authenticate",
  website: "https://www.alchemer.com",
  tokenUrl: "https://api.alchemer.com/head/oauth/access_token",
  oauth: 1,
});

export const Amazon = makeOauthFactory({
  id: "amazon",
  title: "Amazon",
  authorizeUrl: "https://www.amazon.com/ap/oa",
  tokenUrl: "https://api.amazon.com/auth/o2/token",
  website: "https://www.amazon.com",
  oauth: 2,
  scopeDelimiter: " ",
});

export const AngelList = makeOauthFactory({
  id: "angellist",
  title: "AngelList",
  authorizeUrl: "https://angel.co/api/oauth/authorize",
  tokenUrl: "https://angel.co/api/oauth/token",
  website: "https://angel.co",
  oauth: 2,
  scopeDelimiter: " ",
});

// export const Apple = make({
//   id: "apple",
//   title: "",
//   authorizeUrl: "https://appleid.apple.com/auth/authorize",
//   tokenUrl: "https://appleid.apple.com/auth/token",
//   website: "",
//   oauth: 2,
//   scopeDelimiter: " ",
// });

export const ArcGIS = makeOauthFactory({
  id: "arcgis",
  title: "ArcGIS",
  authorizeUrl: "https://www.arcgis.com/sharing/rest/oauth2/authorize",
  tokenUrl: "https://www.arcgis.com/sharing/rest/oauth2/token",
  website: "https://www.arcgis.com",
  oauth: 2,
});

export const Asana = makeOauthFactory({
  id: "asana",
  title: "Asana",
  authorizeUrl: "https://app.asana.com/-/oauth_authorize",
  tokenUrl: "https://app.asana.com/-/oauth_token",
  website: "https://asana.com",
  oauth: 2,
  scopeDelimiter: " ",
});

export const Assembla = makeOauthFactory({
  id: "assembla",
  title: "Assembla",
  authorizeUrl: "https://api.assembla.com/authorization",
  tokenUrl: "https://api.assembla.com/token",
  website: "https://www.assembla.com",
  oauth: 2,
});

// export const Atlassian = make({
//   id: "atlassian",
//   title: "",
//   authorizeUrl: "https://auth.atlassian.com/authorize",
//   tokenUrl: "https://auth.atlassian.com/oauth/token",
//   website: "",
//   oauth: 2,
//   scopeDelimiter: " ",
// });

// export const Auth0 = makeOauthFactoryWithSubdomainArg({
//   id: "auth0",
//   title: "",
//   authorizeUrl: "https://[subdomain].auth0.com/authorize",
//   tokenUrl: "https://[subdomain].auth0.com/oauth/token",
//   website: "",
//   oauth: 2,
//   scopeDelimiter: " ",
// });

// export const Authentiq = makeOauthFactory({
//   id: "authentiq",
//   title: "Authentiq",
//   authorizeUrl: "https://connect.authentiq.io/sign-in",
//   tokenUrl: "https://connect.authentiq.io/token",
//   website: "https://www.authentiq.com",
//   oauth: 2,
//   scopeDelimiter: " ",
// });

export const Authing = makeOauthFactoryWithSubdomainArg({
  id: "authing",
  title: "Authing",
  authorizeUrl: "https://[subdomain].authing.cn/oidc/auth",
  tokenUrl: "https://[subdomain].authing.cn/oidc/token",
  website: "https://www.authing.cn",
  oauth: 2,
  scopeDelimiter: " ",
});

export const Autodesk = makeOauthFactory({
  id: "autodesk",
  title: "Autodesk",
  authorizeUrl:
    "https://developer.api.autodesk.com/authentication/v2/authorize",
  website: "https://www.autodesk.com",
  tokenUrl: "https://developer.api.autodesk.com/authentication/v2/token",
  oauth: 2,
  scopeDelimiter: " ",
});

export const AWeber = makeOauthFactory({
  id: "aweber",
  title: "AWeber",
  authorizeUrl: "https://auth.aweber.com/oauth2/authorize",
  tokenUrl: "https://auth.aweber.com/oauth2/token",
  website: "https://www.aweber.com",
  oauth: 2,
  scopeDelimiter: " ",
});

export const Axosoft = makeOauthFactoryWithSubdomainArg({
  id: "axosoft",
  title: "Axosoft",
  authorizeUrl: "https://[subdomain].axosoft.com/auth",
  tokenUrl: "https://[subdomain].axosoft.com/api/oauth2/token",
  website: "https://www.axosoft.com",
  oauth: 2,
  scopeDelimiter: " ",
});

export const Baidu = makeOauthFactory({
  id: "baidu",
  title: "Baidu",
  authorizeUrl: "https://openapi.baidu.com/oauth/2.0/authorize",
  tokenUrl: "https://openapi.baidu.com/oauth/2.0/token",
  website: "https://www.baidu.com",
  oauth: 2,
});

export const Basecamp = makeOauthFactory({
  id: "basecamp",
  title: "Basecamp",
  authorizeUrl: "https://launchpad.37signals.com/authorization/new",
  tokenUrl: "https://launchpad.37signals.com/authorization/token",
  website: "https://basecamp.com",
  oauth: 2,
});

// export const Battlenet = makeOauthFactoryWithSubdomainArg({
//   id: "battlenet",
//   title: "",
//   authorizeUrl: "https://[subdomain].battle.net/oauth/authorize",
//   tokenUrl: "https://[subdomain].battle.net/oauth/token",
//   website: "",
//   oauth: 2,
//   scopeDelimiter: " ",
// });

export const Beatport = makeOauthFactory({
  id: "beatport",
  title: "Beatport",
  requestTokenUrl:
    "https://oauth-api.beatport.com/identity/1/oauth/request-token",
  authorizeUrl: "https://oauth-api.beatport.com/identity/1/oauth/authorize",
  website: "https://www.beatport.com",
  tokenUrl: "https://oauth-api.beatport.com/identity/1/oauth/access-token",
  oauth: 1,
});

export const Bitbucket = makeOauthFactory({
  id: "bitbucket",
  title: "Bitbucket",
  authorizeUrl: "https://bitbucket.org/site/oauth2/authorize",
  tokenUrl: "https://bitbucket.org/site/oauth2/access_token",
  website: "https://bitbucket.org",
  oauth: 2,
  scopeDelimiter: " ",
});

export const Bitly = makeOauthFactory({
  id: "bitly",
  title: "Bitly",
  authorizeUrl: "https://bitly.com/oauth/authorize",
  tokenUrl: "https://api-ssl.bitly.com/oauth/access_token",
  website: "https://bitly.com",
  oauth: 2,
});

// export const Box = make({
//   id: "box",
//   title: "",
//   authorizeUrl: "https://api.box.com/oauth2/authorize",
//   tokenUrl: "https://api.box.com/oauth2/token",
//   website: "",
//   oauth: 2,
//   scopeDelimiter: " ",
// });

export const Buffer = makeOauthFactory({
  id: "buffer",
  title: "Buffer",
  authorizeUrl: "https://bufferapp.com/oauth2/authorize",
  tokenUrl: "https://api.bufferapp.com/1/oauth2/token.json",
  website: "https://bufferapp.com",
  oauth: 2,
});

export const CampaignMonitor = makeOauthFactory({
  id: "campaignmonitor",
  title: "Campaign Monitor",
  authorizeUrl: "https://api.createsend.com/oauth",
  tokenUrl: "https://api.createsend.com/oauth/token",
  website: "https://www.campaignmonitor.com",
  oauth: 2,
});

export const CAS = makeOauthFactoryWithSubdomainArg({
  id: "cas",
  title: "CAS",
  authorizeUrl: "https://[subdomain]/oidc/authorize",
  tokenUrl: "https://[subdomain]/oidc/token",
  website: "https://www.apereo.org/projects/cas",
  oauth: 2,
});

// Dead.
// export const Cheddar = makeOauthFactory({
//   id: "cheddar",
//   title: "Cheddar",
//   authorizeUrl: "https://api.cheddarapp.com/oauth/authorize",
//   tokenUrl: "https://api.cheddarapp.com/oauth/token",
//   website: "https://cheddarapp.com",
//   oauth: 2,
// });

export const Clio = makeOauthFactory({
  id: "clio",
  title: "Clio",
  authorizeUrl: "https://app.clio.com/oauth/authorize",
  tokenUrl: "https://app.clio.com/oauth/token",
  website: "https://www.clio.com",
  oauth: 2,
});

// export const Cognito = makeOauthFactoryWithSubdomainArg({
//   id: "cognito",
//   title: "",
//   authorizeUrl: "https://[subdomain]/oauth2/authorize",
//   tokenUrl: "https://[subdomain]/oauth2/token",
//   website: "",
//   oauth: 2,
//   scopeDelimiter: " ",
// });

// export const Coinbase = make({
//   id: "coinbase",
//   title: "",
//   authorizeUrl: "https://www.coinbase.com/oauth/authorize",
//   tokenUrl: "https://www.coinbase.com/oauth/token",
//   website: "",
//   oauth: 2,
//   scopeDelimiter: " ",
// });

export const Concur = makeOauthFactoryWithSubdomainArg({
  id: "concur",
  title: "Concur",
  authorizeUrl:
    "https://[subdomain].api.concursolutions.com/oauth2/v0/authorize",
  website: "https://www.concur.com",
  tokenUrl: "https://[subdomain].api.concursolutions.com/oauth2/v0/token",
  oauth: 2,
});

export const ConstantContact = makeOauthFactory({
  id: "constantcontact",
  title: "Constant Contact",
  authorizeUrl:
    "https://oauth2.constantcontact.com/oauth2/oauth/siteowner/authorize",
  website: "https://www.constantcontact.com",
  tokenUrl: "https://oauth2.constantcontact.com/oauth2/oauth/token",
  oauth: 2,
});

export const Coursera = makeOauthFactory({
  id: "coursera",
  title: "Coursera",
  authorizeUrl: "https://accounts.coursera.org/oauth2/v1/auth",
  tokenUrl: "https://accounts.coursera.org/oauth2/v1/token",
  website: "https://www.coursera.org",
  oauth: 2,
  scopeDelimiter: " ",
});

export const CrossID = makeOauthFactoryWithSubdomainArg({
  id: "crossid",
  title: "CrossID",
  authorizeUrl: "https://[subdomain].crossid.io/oauth2/auth",
  tokenUrl: "https://[subdomain].crossid.io/oauth2/token",
  website: "https://www.crossid.io",
  oauth: 2,
  scopeDelimiter: " ",
});

export const Dailymotion = makeOauthFactory({
  id: "dailymotion",
  title: "Dailymotion",
  authorizeUrl: "https://www.dailymotion.com/oauth/authorize",
  tokenUrl: "https://api.dailymotion.com/oauth/token",
  website: "https://www.dailymotion.com",
  oauth: 2,
});

export const Deezer = makeOauthFactory({
  id: "deezer",
  title: "Deezer",
  authorizeUrl: "https://connect.deezer.com/oauth/auth.php",
  tokenUrl: "https://connect.deezer.com/oauth/access_token.php",
  website: "https://www.deezer.com",
  oauth: 2,
});

export const Delivery = makeOauthFactory({
  id: "delivery",
  title: "Delivery",
  authorizeUrl: "https://api.delivery.com/third_party/authorize",
  tokenUrl: "https://api.delivery.com/third_party/access_token",
  website: "https://www.delivery.com",
  oauth: 2,
});

export const Deputy = makeOauthFactory({
  id: "deputy",
  title: "Deputy",
  authorizeUrl: "https://once.deputy.com/my/oauth/login",
  tokenUrl: "https://once.deputy.com/my/oauth/access_token",
  website: "https://www.deputy.com",
  oauth: 2,
});

export const DeviantArt = makeOauthFactory({
  id: "deviantart",
  title: "DeviantArt",
  authorizeUrl: "https://www.deviantart.com/oauth2/authorize",
  tokenUrl: "https://www.deviantart.com/oauth2/token",
  website: "https://www.deviantart.com",
  oauth: 2,
  scopeDelimiter: " ",
});

export const DigitalOcean = makeOauthFactory({
  id: "digitalocean",
  title: "DigitalOcean",
  authorizeUrl: "https://cloud.digitalocean.com/v1/oauth/authorize",
  tokenUrl: "https://cloud.digitalocean.com/v1/oauth/token",
  website: "https://www.digitalocean.com",
  oauth: 2,
  scopeDelimiter: " ",
});

export const Discogs = makeOauthFactory({
  id: "discogs",
  title: "Discogs",
  requestTokenUrl: "https://api.discogs.com/oauth/request_token",
  authorizeUrl: "https://discogs.com/oauth/authorize",
  website: "https://www.discogs.com",
  tokenUrl: "https://api.discogs.com/oauth/access_token",
  oauth: 1,
});

// export const Discord = make({
//   id: "discord",
//   title: "",
//   authorizeUrl: "https://discord.com/api/oauth2/authorize",
//   tokenUrl: "https://discord.com/api/oauth2/token",
//   website: "",
//   oauth: 2,
//   scopeDelimiter: " ",
// });

export const Disqus = makeOauthFactory({
  id: "disqus",
  title: "Disqus",
  authorizeUrl: "https://disqus.com/api/oauth/2.0/authorize/",
  tokenUrl: "https://disqus.com/api/oauth/2.0/access_token/",
  website: "https://www.disqus.com",
  oauth: 2,
});

export const Docusign = makeOauthFactory({
  id: "docusign",
  title: "DocuSign",
  authorizeUrl: "https://account.docusign.com/oauth/auth",
  tokenUrl: "https://account.docusign.com/oauth/token",
  website: "https://www.docusign.com",
  oauth: 2,
});

export const Dribbble = makeOauthFactory({
  id: "dribbble",
  title: "Dribbble",
  authorizeUrl: "https://dribbble.com/oauth/authorize",
  tokenUrl: "https://dribbble.com/oauth/token",
  website: "https://www.dribbble.com",
  oauth: 2,
  scopeDelimiter: " ",
});

// export const Dropbox = make({
//   id: "dropbox",
//   title: "",
//   authorizeUrl: "https://www.dropbox.com/oauth2/authorize",
//   tokenUrl: "https://api.dropboxapi.com/oauth2/token",
//   website: "",
//   oauth: 2,
// });

export const Ebay = makeOauthFactory({
  id: "ebay",
  title: "eBay",
  authorizeUrl: "https://signin.ebay.com/authorize",
  tokenUrl: "https://api.ebay.com/identity/v1/oauth2/token",
  website: "https://www.ebay.com",
  oauth: 2,
  scopeDelimiter: " ",
});

export const Echosign = makeOauthFactory({
  id: "echosign",
  title: "Adobe Sign",
  authorizeUrl: "https://secure.echosign.com/public/oauth",
  tokenUrl: "https://secure.echosign.com/oauth/token",
  website: "https://acrobat.adobe.com/us/en/sign.html",
  oauth: 2,
  scopeDelimiter: " ",
});

export const Ecwid = makeOauthFactory({
  id: "ecwid",
  title: "Ecwid",
  authorizeUrl: "https://my.ecwid.com/api/oauth/authorize",
  tokenUrl: "https://my.ecwid.com/api/oauth/token",
  website: "https://www.ecwid.com",
  oauth: 2,
  scopeDelimiter: " ",
});

// Dead.
// export const Edmodo = makeOauthFactory({
//   id: "edmodo",
//   title: "Edmodo",
//   authorizeUrl: "https://api.edmodo.com/oauth/authorize",
//   tokenUrl: "https://api.edmodo.com/oauth/token",
//   website: "https://www.edmodo.com",
//   oauth: 2,
//   scopeDelimiter: " ",
// });

export const Egnyte = makeOauthFactoryWithSubdomainArg({
  id: "egnyte",
  title: "Egnyte",
  authorizeUrl: "https://[subdomain].egnyte.com/puboauth/token",
  tokenUrl: "https://[subdomain].egnyte.com/puboauth/token",
  website: "https://www.egnyte.com",
  oauth: 2,
  scopeDelimiter: " ",
});

export const Etsy = makeOauthFactory({
  id: "etsy",
  title: "Etsy",
  requestTokenUrl: "https://openapi.etsy.com/v2/oauth/request_token",
  authorizeUrl: "https://www.etsy.com/oauth/signin",
  website: "https://www.etsy.com",
  tokenUrl: "https://openapi.etsy.com/v2/oauth/access_token",
  oauth: 1,
  scopeDelimiter: " ",
});

export const Eventbrite = makeOauthFactory({
  id: "eventbrite",
  title: "Eventbrite",
  authorizeUrl: "https://www.eventbrite.com/oauth/authorize",
  tokenUrl: "https://www.eventbrite.com/oauth/token",
  website: "https://www.eventbrite.com",
  oauth: 2,
});

export const Evernote = makeOauthFactory({
  id: "evernote",
  title: "Evernote",
  requestTokenUrl: "https://www.evernote.com/oauth",
  authorizeUrl: "https://www.evernote.com/OAuth.action",
  website: "https://www.evernote.com",
  tokenUrl: "https://www.evernote.com/oauth",
  oauth: 1,
});

export const EyeEm = makeOauthFactory({
  id: "eyeem",
  title: "EyeEm",
  authorizeUrl: "https://www.eyeem.com/oauth/authorize",
  tokenUrl: "https://api.eyeem.com/v2/oauth/token",
  website: "https://www.eyeem.com",
  oauth: 2,
});

// export const Facebook = make({
//   id: "facebook",
//   title: "",
//   authorizeUrl: "https://www.facebook.com/dialog/oauth",
//   tokenUrl: "https://graph.facebook.com/oauth/access_token",
//   website: "",
//   oauth: 2,
//   scopeDelimiter: " ",
// });

export const FamilySearch = makeOauthFactory({
  id: "familysearch",
  title: "FamilySearch",
  authorizeUrl:
    "https://ident.familysearch.org/cis-web/oauth2/v3/authorization",
  website: "https://www.familysearch.org",
  tokenUrl: "https://ident.familysearch.org/cis-web/oauth2/v3/token",
  oauth: 2,
  scopeDelimiter: " ",
});

export const Feedly = makeOauthFactory({
  id: "feedly",
  title: "Feedly",
  authorizeUrl: "https://cloud.feedly.com/v3/auth/auth",
  tokenUrl: "https://cloud.feedly.com/v3/auth/token",
  website: "https://www.feedly.com",
  oauth: 2,
});

export const Figma = makeOauthFactory({
  id: "figma",
  title: "Figma",
  authorizeUrl: "https://www.figma.com/oauth",
  tokenUrl: "https://www.figma.com/api/oauth/token",
  website: "https://www.figma.com",
  oauth: 2,
});

export const Fitbit = makeOauthFactory({
  id: "fitbit",
  title: "Fitbit",
  authorizeUrl: "https://www.fitbit.com/oauth2/authorize",
  tokenUrl: "https://api.fitbit.com/oauth2/token",
  website: "https://www.fitbit.com",
  oauth: 2,
  scopeDelimiter: " ",
});

export const Flickr = makeOauthFactory({
  id: "flickr",
  title: "Flickr",
  requestTokenUrl: "https://www.flickr.com/services/oauth/request_token",
  authorizeUrl: "https://www.flickr.com/services/oauth/authorize",
  website: "https://www.flickr.com",
  tokenUrl: "https://www.flickr.com/services/oauth/access_token",
  oauth: 1,
});

export const Formstack = makeOauthFactory({
  id: "formstack",
  title: "Formstack",
  authorizeUrl: "https://www.formstack.com/api/v2/oauth2/authorize",
  tokenUrl: "https://www.formstack.com/api/v2/oauth2/token",
  website: "https://www.formstack.com",
  oauth: 2,
});

// export const Foursquare = make({
//   id: "foursquare",
//   title: "",
//   authorizeUrl: "https://foursquare.com/oauth2/authenticate",
//   tokenUrl: "https://foursquare.com/oauth2/access_token",
//   website: "",
//   oauth: 2,
// });

export const FreeAgent = makeOauthFactory({
  id: "freeagent",
  title: "FreeAgent",
  authorizeUrl: "https://api.freeagent.com/v2/approve_app",
  tokenUrl: "https://api.freeagent.com/v2/token_endpoint",
  website: "https://www.freeagent.com",
  oauth: 2,
});

export const Freelancer = makeOauthFactory({
  id: "freelancer",
  title: "Freelancer",
  authorizeUrl: "https://accounts.freelancer.com/oauth/authorize",
  tokenUrl: "https://accounts.freelancer.com/oauth/token",
  website: "https://www.freelancer.com",
  oauth: 2,
  scopeDelimiter: " ",
});

// export const Freshbooks = makeOauthFactoryWithSubdomainArg({
//   id: "freshbooks",
//   title: "",
//   request_url: "https://[subdomain].freshbooks.com/oauth/oauth_request.php",
//   authorizeUrl: "https://[subdomain].freshbooks.com/oauth/oauth_authorize.php",
//   website: "",
//   tokenUrl: "https://[subdomain].freshbooks.com/oauth/oauth_access.php",
//   oauth: 1,
// });

// export const Fusionauth = makeOauthFactoryWithSubdomainArg({
//   id: "fusionauth",
//   title: "",
//   authorizeUrl: "https://[subdomain]/oauth2/authorize",
//   tokenUrl: "https://[subdomain]/oauth2/token",
//   website: "",
//   oauth: 2,
//   scopeDelimiter: " ",
// });

export const Garmin = makeOauthFactory({
  id: "garmin",
  title: "Garmin",
  requestTokenUrl:
    "https://connectapi.garmin.com/oauth-service/oauth/request_token",
  website: "https://connect.garmin.com",
  authorizeUrl: "https://connect.garmin.com/oauthConfirm",
  tokenUrl: "https://connectapi.garmin.com/oauth-service/oauth/access_token",
  oauth: 1,
});

export const Geeklist = makeOauthFactory({
  id: "geeklist",
  title: "Geeklist",
  requestTokenUrl: "https://api.geekli.st/v1/oauth/request_token",
  authorizeUrl: "https://geekli.st/oauth/authorize",
  website: "https://geekli.st",
  tokenUrl: "https://api.geekli.st/v1/oauth/access_token",
  oauth: 1,
});

export const Genius = makeOauthFactory({
  id: "genius",
  title: "Genius",
  authorizeUrl: "https://api.genius.com/oauth/authorize",
  tokenUrl: "https://api.genius.com/oauth/token",
  website: "https://genius.com",
  oauth: 2,
  scopeDelimiter: " ",
});

// FIXME
export const Getbase = makeOauthFactory({
  id: "getbase",
  title: "Getbase",
  authorizeUrl: "https://api.getbase.com/oauth2/authorize",
  tokenUrl: "https://api.getbase.com/oauth2/token",
  website: "https://www.getbase.com/sell/",
  oauth: 2,
  scopeDelimiter: " ",
});

export const Pocket = makeOauthFactory({
  id: "pocket",
  title: "Pocket",
  requestTokenUrl: "https://getpocket.com/v3/oauth/request",
  authorizeUrl: "https://getpocket.com/auth/authorize",
  website: "https://getpocket.com",
  tokenUrl: "https://getpocket.com/v3/oauth/authorize",
  oauth: 1,
});

export const Gitbook = makeOauthFactory({
  id: "gitbook",
  title: "GitBook",
  authorizeUrl: "https://api.gitbook.com/oauth/authorize",
  tokenUrl: "https://api.gitbook.com/oauth/access_token",
  website: "https://www.gitbook.com",
  oauth: 2,
});

// export const GitHub = makeOauthFactory({
// 	id: 'github',
// 	title: 'GitHub',
// 	authorizeUrl: 'https://github.com/login/oauth/authorize',
// 	tokenUrl: 'https://github.com/login/oauth/access_token',
// 	website: 'https://github.com',
// 	oauth: 2,
// });

// export const Gitlab = make({
//   id: "gitlab",
//   title: "",
//   authorizeUrl: "https://gitlab.com/oauth/authorize",
//   tokenUrl: "https://gitlab.com/oauth/token",
//   website: "",
//   oauth: 2,
//   scopeDelimiter: " ",
// });

// TODO use Matrix? https://spec.matrix.org/latest/client-server-api/
// export const Gitter = makeOauthFactory({
//   id: "gitter",
//   title: "Gitter",
//   authorizeUrl: "https://gitter.im/login/oauth/authorize",
//   tokenUrl: "https://gitter.im/login/oauth/token",
//   website: "https://gitter.im",
//   oauth: 2,
// });

export const Goodreads = makeOauthFactory({
  id: "goodreads",
  title: "Goodreads",
  requestTokenUrl: "https://www.goodreads.com/oauth/request_token",
  authorizeUrl: "https://www.goodreads.com/oauth/authorize",
  website: "https://www.goodreads.com",
  tokenUrl: "https://www.goodreads.com/oauth/access_token",
  oauth: 1,
});

// export const Google = make({
//   id: "google",
//   title: "",
//   authorizeUrl: "https://accounts.google.com/o/oauth2/v2/auth",
//   tokenUrl: "https://oauth2.googleapis.com/token",
//   website: "",
//   oauth: 2,
//   scopeDelimiter: " ",
// });

export const Groove = makeOauthFactory({
  id: "groove",
  title: "Groove",
  authorizeUrl: "https://api.groovehq.com/oauth/authorize",
  tokenUrl: "https://api.groovehq.com/oauth/token",
  website: "https://www.groovehq.com",
  oauth: 2,
});

export const Gumroad = makeOauthFactory({
  id: "gumroad",
  title: "Gumroad",
  authorizeUrl: "https://gumroad.com/oauth/authorize",
  tokenUrl: "https://gumroad.com/oauth/token",
  website: "https://gumroad.com",
  oauth: 2,
  scopeDelimiter: " ",
});

export const Harvest = makeOauthFactory({
  id: "harvest",
  title: "Harvest",
  authorizeUrl: "https://api.harvestapp.com/oauth2/authorize",
  tokenUrl: "https://api.harvestapp.com/oauth2/token",
  website: "https://www.getharvest.com",
  oauth: 2,
});

export const HelloSign = makeOauthFactory({
  id: "hellosign",
  title: "HelloSign",
  authorizeUrl: "https://www.hellosign.com/oauth/authorize",
  tokenUrl: "https://www.hellosign.com/oauth/token",
  website: "https://www.hellosign.com",
  oauth: 2,
});

export const Heroku = makeOauthFactory({
  id: "heroku",
  title: "Heroku",
  authorizeUrl: "https://id.heroku.com/oauth/authorize",
  tokenUrl: "https://id.heroku.com/oauth/token",
  website: "https://www.heroku.com",
  oauth: 2,
});

export const Homeaway = makeOauthFactory({
  id: "homeaway",
  title: "HomeAway",
  authorizeUrl: "https://ws.homeaway.com/oauth/authorize",
  tokenUrl: "https://ws.homeaway.com/oauth/token",
  website: "https://www.homeaway.com",
  oauth: 2,
});

export const Hootsuite = makeOauthFactory({
  id: "hootsuite",
  title: "Hootsuite",
  authorizeUrl: "https://platform.hootsuite.com/oauth2/auth",
  tokenUrl: "https://platform.hootsuite.com/oauth2/token",
  website: "https://hootsuite.com",
  oauth: 2,
});

export const Huddle = makeOauthFactory({
  id: "huddle",
  title: "Huddle",
  authorizeUrl: "https://login.huddle.net/request",
  tokenUrl: "https://login.huddle.net/token",
  website: "https://www.huddle.com",
  oauth: 2,
});

export const IBM = makeOauthFactory({
  id: "ibm",
  title: "IBM",
  authorizeUrl: "https://login.ibm.com/oidc/endpoint/default/authorize",
  tokenUrl: "https://login.ibm.com/oidc/endpoint/default/token",
  website: "https://www.ibm.com",
  oauth: 2,
});

export const Iconfinder = makeOauthFactory({
  id: "iconfinder",
  title: "Iconfinder",
  authorizeUrl: "https://www.iconfinder.com/api/v2/oauth2/authorize",
  tokenUrl: "https://www.iconfinder.com/api/v2/oauth2/token",
  website: "",
  oauth: 2,
});

export const IDme = makeOauthFactory({
  id: "idme",
  title: "ID.me",
  authorizeUrl: "https://api.id.me/oauth/authorize",
  tokenUrl: "https://api.id.me/oauth/token",
  website: "https://www.id.me",
  oauth: 2,
});

export const IDoneThis = makeOauthFactory({
  id: "idonethis",
  title: "I Done This",
  authorizeUrl: "https://idonethis.com/api/oauth2/authorize/",
  tokenUrl: "https://idonethis.com/api/oauth2/token/",
  website: "https://home.idonethis.com",
  oauth: 2,
});

export const Imgur = makeOauthFactory({
  id: "imgur",
  title: "Imgur",
  authorizeUrl: "https://api.imgur.com/oauth2/authorize",
  tokenUrl: "https://api.imgur.com/oauth2/token",
  website: "https://imgur.com",
  oauth: 2,
});

export const Infusionsoft = makeOauthFactory({
  id: "infusionsoft",
  title: "Infusionsoft",
  authorizeUrl: "https://signin.infusionsoft.com/app/oauth/authorize",
  tokenUrl: "https://api.infusionsoft.com/token",
  website: "https://www.infusionsoft.com",
  oauth: 2,
});

// export const Instagram = make({
//   id: "instagram",
//   title: "",
//   authorizeUrl: "https://api.instagram.com/oauth/authorize",
//   tokenUrl: "https://api.instagram.com/oauth/access_token",
//   website: "",
//   oauth: 2,
//   scopeDelimiter: " ",
// });

export const Intuit = makeOauthFactory({
  id: "intuit",
  title: "Intuit",
  authorizeUrl: "https://appcenter.intuit.com/connect/oauth2",
  tokenUrl: "https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer",
  website: "https://www.intuit.com",
  oauth: 2,
  scopeDelimiter: " ",
});

export const Jamendo = makeOauthFactory({
  id: "jamendo",
  title: "Jamendo",
  authorizeUrl: "https://api.jamendo.com/v3.0/oauth/authorize",
  tokenUrl: "https://api.jamendo.com/v3.0/oauth/grant",
  website: "https://www.jamendo.com",
  oauth: 2,
});

// Dead
// export const Jumplead = makeOauthFactory({
//   id: "jumplead",
//   title: "Jumplead",
//   authorizeUrl: "https://account.mooloop.com/oauth/authorize",
//   tokenUrl: "https://account.mooloop.com/oauth/access_token",
//   website: "https://www.jumplead.com",
//   oauth: 2,
// });

// export const Kakao = make({
//   id: "kakao",
//   title: "",
//   authorizeUrl: "https://kauth.kakao.com/oauth/authorize",
//   tokenUrl: "https://kauth.kakao.com/oauth/token",
//   website: "",
//   oauth: 2,
// });

// export const Keycloak = makeOauthFactoryWithSubdomainArg({
//   id: "keycloak",
//   title: "",
//   authorizeUrl: "https://[subdomain]/protocol/openid-connect/auth",
//   tokenUrl: "https://[subdomain]/protocol/openid-connect/token",
//   website: "",
//   oauth: 2,
//   scopeDelimiter: " ",
// });

// export const Line = make({
//   id: "line",
//   title: "",
//   authorizeUrl: "https://access.line.me/oauth2/v2.1/authorize",
//   tokenUrl: "https://api.line.me/oauth2/v2.1/token",
//   website: "",
//   oauth: 2,
//   scopeDelimiter: " ",
// });

// export const Linkedin = make({
//   id: "linkedin",
//   title: "",
//   authorizeUrl: "https://www.linkedin.com/oauth/v2/authorization",
//   tokenUrl: "https://www.linkedin.com/oauth/v2/accessToken",
//   website: "",
//   oauth: 2,
//   scopeDelimiter: " ",
// });

export const MicrosoftLive = makeOauthFactory({
  id: "live",
  title: "Microsoft Live",
  authorizeUrl: "https://login.live.com/oauth20_authorize.srf",
  tokenUrl: "https://login.live.com/oauth20_token.srf",
  website: "https://live.com",
  oauth: 2,
});

export const LiveChat = makeOauthFactory({
  id: "livechat",
  title: "LiveChat",
  authorizeUrl: "https://accounts.livechatinc.com/",
  tokenUrl: "https://accounts.livechatinc.com/token",
  website: "https://www.livechat.com",
  oauth: 2,
});

export const LoginGOV = makeOauthFactory({
  id: "logingov",
  title: "Login.gov",
  authorizeUrl: "https://idp.int.identitysandbox.gov/openid_connect/authorize",
  tokenUrl: "https://idp.int.identitysandbox.gov/api/openid_connect/token",
  website: "https://login.gov",
  oauth: 2,
  scopeDelimiter: " ",
});

export const Lyft = makeOauthFactory({
  id: "lyft",
  title: "Lyft",
  authorizeUrl: "https://api.lyft.com/oauth/authorize",
  tokenUrl: "https://api.lyft.com/oauth/token",
  website: "https://www.lyft.com",
  oauth: 2,
  scopeDelimiter: " ",
});

// export const Mailchimp = make({
//   id: "mailchimp",
//   title: "",
//   authorizeUrl: "https://login.mailchimp.com/oauth2/authorize",
//   tokenUrl: "https://login.mailchimp.com/oauth2/token",
//   website: "",
//   oauth: 2,
// });

export const MailUp = makeOauthFactory({
  id: "mailup",
  title: "MailUp",
  authorizeUrl: "https://services.mailup.com/Authorization/OAuth/Authorization",
  website: "https://www.mailup.com",
  tokenUrl: "https://services.mailup.com/Authorization/OAuth/Token",
  oauth: 2,
});

export const Mailxpert = makeOauthFactory({
  id: "mailxpert",
  title: "Mailxpert",
  authorizeUrl: "https://app.mailxpert.ch/oauth/v2/auth",
  tokenUrl: "https://app.mailxpert.ch/oauth/v2/token",
  website: "https://www.mailxpert.ch",
  oauth: 2,
});

export const MapMyFitness = makeOauthFactory({
  id: "mapmyfitness",
  title: "MapMyFitness",
  authorizeUrl: "https://www.mapmyfitness.com/v7.1/oauth2/uacf/authorize",
  tokenUrl: "https://api.mapmyfitness.com/v7.1/oauth2/access_token",
  website: "https://www.mapmyfitness.com",
  oauth: 2,
});

export const Mastodon = makeOauthFactoryWithSubdomainArg({
  id: "mastodon",
  title: "Mastodon",
  authorizeUrl: "https://[subdomain]/oauth/authorize",
  tokenUrl: "https://[subdomain]/oauth/token",
  website: "https://joinmastodon.org",
  oauth: 2,
  scopeDelimiter: " ",
});

// export const Medium = make({
//   id: "medium",
//   title: "",
//   authorizeUrl: "https://medium.com/m/oauth/authorize",
//   tokenUrl: "https://api.medium.com/v1/tokens",
//   website: "",
//   oauth: 2,
// });

export const Meetup = makeOauthFactory({
  id: "meetup",
  title: "Meetup",
  authorizeUrl: "https://secure.meetup.com/oauth2/authorize",
  tokenUrl: "https://secure.meetup.com/oauth2/access",
  website: "https://www.meetup.com",
  oauth: 2,
  scopeDelimiter: " ",
});

export const Mendeley = makeOauthFactory({
  id: "mendeley",
  title: "Mendeley",
  authorizeUrl: "https://api.mendeley.com/oauth/authorize",
  tokenUrl: "https://api.mendeley.com/oauth/token",
  website: "https://www.mendeley.com",
  oauth: 2,
});

export const Mention = makeOauthFactory({
  id: "mention",
  title: "Mention",
  authorizeUrl: "https://web.mention.com/authorize",
  tokenUrl: "https://web.mention.net/oauth/v2/token",
  website: "https://mention.com",
  oauth: 2,
});

export const Microsoft = makeOauthFactory({
  id: "microsoft",
  title: "Microsoft",
  authorizeUrl:
    "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
  website: "https://www.microsoft.com",
  tokenUrl: "https://login.microsoftonline.com/common/oauth2/v2.0/token",
  oauth: 2,
  scopeDelimiter: " ",
});

export const Mixcloud = makeOauthFactory({
  id: "mixcloud",
  title: "Mixcloud",
  authorizeUrl: "https://www.mixcloud.com/oauth/authorize",
  tokenUrl: "https://www.mixcloud.com/oauth/access_token",
  website: "https://www.mixcloud.com",
  oauth: 2,
});

export const Moxtra = makeOauthFactory({
  id: "moxtra",
  title: "Moxtra",
  authorizeUrl: "https://api.moxtra.com/oauth/authorize",
  tokenUrl: "https://api.moxtra.com/oauth/token",
  website: "https://www.moxtra.com",
  oauth: 2,
  scopeDelimiter: " ",
});

export const MYOB = makeOauthFactory({
  id: "myob",
  title: "MYOB",
  authorizeUrl: "https://secure.myob.com/oauth2/account/authorize",
  tokenUrl: "https://secure.myob.com/oauth2/v1/authorize",
  website: "https://www.myob.com",
  oauth: 2,
});

// export const Naver = make({
//   id: "naver",
//   title: "",
//   authorizeUrl: "https://nid.naver.com/oauth2.0/authorize",
//   tokenUrl: "https://nid.naver.com/oauth2.0/token",
//   website: "",
//   oauth: 2,
// });

export const Nest = makeOauthFactory({
  id: "nest",
  title: "Nest",
  authorizeUrl: "https://home.nest.com/login/oauth2",
  tokenUrl: "https://api.home.nest.com/oauth2/access_token",
  website: "https://www.nest.com",
  oauth: 2,
});

// export const Netlify = make({
//   id: "netlify",
//   title: "",
//   authorizeUrl: "https://app.netlify.com/authorize",
//   tokenUrl: "https://api.netlify.com/oauth/token",
//   website: "",
//   oauth: 2,
// });

export const NokoTime = makeOauthFactory({
  id: "nokotime",
  title: "NokoTime",
  authorizeUrl: "https://secure.nokotime.com/oauth/2/authorize",
  tokenUrl: "https://secure.nokotime.com/oauth/2/access_token",
  website: "https://www.nokotime.com",
  oauth: 2,
});

export const Notion = makeOauthFactory({
  id: "notion",
  title: "Notion",
  authorizeUrl: "https://api.notion.com/v1/oauth/authorize",
  tokenUrl: "https://api.notion.com/v1/oauth/token",
  website: "https://www.notion.so",
  oauth: 2,
});

export const Nylas = makeOauthFactory({
  id: "nylas",
  title: "Nylas",
  authorizeUrl: "https://api.nylas.com/oauth/authorize",
  tokenUrl: "https://api.nylas.com/oauth/token",
  website: "https://www.nylas.com",
  oauth: 2,
});

// export const Okta = makeOauthFactoryWithSubdomainArg({
//   id: "okta",
//   title: "",
//   authorizeUrl: "https://[subdomain].okta.com/oauth2/v1/authorize",
//   tokenUrl: "https://[subdomain].okta.com/oauth2/v1/token",
//   website: "",
//   oauth: 2,
//   scopeDelimiter: " ",
// });

// export const Onelogin = makeOauthFactoryWithSubdomainArg({
//   id: "onelogin",
//   title: "",
//   authorizeUrl: "https://[subdomain].onelogin.com/oidc/auth",
//   tokenUrl: "https://[subdomain].onelogin.com/oidc/token",
//   website: "",
//   oauth: 2,
//   scopeDelimiter: " ",
// });

// export const OpenStreetMap = makeOauthFactory({
//   id: "openstreetmap",
//   title: "OpenStreetMap",
//   requestTokenUrl: "https://www.openstreetmap.org/oauth/request_token",
//   authorizeUrl: "https://www.openstreetmap.org/oauth/authorize",
//   website: "https://www.openstreetmap.org",
//   tokenUrl: "https://www.openstreetmap.org/oauth/access_token",
//   oauth: 1,
// });

export const OpenStreetMap2 = makeOauthFactory({
  id: "openstreetmap2",
  title: "OpenStreetMap",
  authorizeUrl: "https://www.openstreetmap.org/oauth2/authorize",
  tokenUrl: "https://www.openstreetmap.org/oauth2/token",
  website: "https://www.openstreetmap.org",
  oauth: 2,
  scopeDelimiter: " ",
});

export const Optimizely = makeOauthFactory({
  id: "optimizely",
  title: "Optimizely",
  authorizeUrl: "https://app.optimizely.com/oauth2/authorize",
  tokenUrl: "https://app.optimizely.com/oauth2/token",
  website: "https://www.optimizely.com",
  oauth: 2,
});

// export const Osu = make({
//   id: "osu",
//   title: "",
//   authorizeUrl: "https://osu.ppy.sh/oauth/authorize",
//   tokenUrl: "https://osu.ppy.sh/oauth/token",
//   website: "",
//   oauth: 2,
//   scopeDelimiter: " ",
// });

// export const Patreon = make({
//   id: "patreon",
//   title: "",
//   authorizeUrl: "https://www.patreon.com/oauth2/authorize",
//   tokenUrl: "https://www.patreon.com/api/oauth2/token",
//   website: "",
//   oauth: 2,
//   scopeDelimiter: " ",
// });

export const PayPal = makeOauthFactory({
  id: "paypal",
  title: "PayPal",
  authorizeUrl:
    "https://www.paypal.com/webapps/auth/protocol/openidconnect/v1/authorize",
  website: "https://www.paypal.com",
  tokenUrl: "https://api.paypal.com/v1/identity/openidconnect/tokenservice",
  oauth: 2,
  scopeDelimiter: " ",
});

// What is this!?
//
// export const Phantauth = makeOauthFactory({
//   id: "phantauth",
//   title: "Phantauth",
//   authorizeUrl: "https://phantauth.net/auth/authorize",
//   tokenUrl: "https://phantauth.net/auth/token",
//   website: "https://www.phantauth.net",
//   oauth: 2,
//   scopeDelimiter: " ",
// });

// export const Pinterest = make({
//   id: "pinterest",
//   title: "",
//   authorizeUrl: "https://api.pinterest.com/oauth/",
//   tokenUrl: "https://api.pinterest.com/v1/oauth/token",
//   website: "",
//   oauth: 2,
// });

export const Plurk = makeOauthFactory({
  id: "plurk",
  title: "Plurk",
  requestTokenUrl: "https://www.plurk.com/OAuth/request_token",
  authorizeUrl: "https://www.plurk.com/OAuth/authorize",
  website: "https://www.plurk.com",
  tokenUrl: "https://www.plurk.com/OAuth/access_token",
  oauth: 1,
});

export const Podio = makeOauthFactory({
  id: "podio",
  title: "Podio",
  authorizeUrl: "https://podio.com/oauth/authorize",
  tokenUrl: "https://podio.com/oauth/token",
  website: "https://www.podio.com",
  oauth: 2,
});

export const Procore = makeOauthFactory({
  id: "procore",
  title: "Procore",
  authorizeUrl: "https://login.procore.com/oauth/authorize",
  tokenUrl: "https://login.procore.com/oauth/token",
  website: "https://www.procore.com",
  oauth: 2,
});

export const ProductHunt = makeOauthFactory({
  id: "producthunt",
  title: "Product Hunt",
  authorizeUrl: "https://api.producthunt.com/v1/oauth/authorize",
  tokenUrl: "https://api.producthunt.com/v1/oauth/token",
  website: "https://www.producthunt.com",
  oauth: 2,
  scopeDelimiter: " ",
});

// export const Projectplace = makeOauthFactory({
//   id: "projectplace",
//   title: "Projectplace",
//   requestTokenUrl: "https://api.projectplace.com/initiate",
//   authorizeUrl: "https://api.projectplace.com/authorize",
//   website: "https://www.projectplace.com",
//   tokenUrl: "https://api.projectplace.com/token",
//   oauth: 1,
// });

export const Projectplace = makeOauthFactory({
  id: "projectplace",
  title: "Projectplace",
  authorizeUrl: "https://api.projectplace.com/oauth2/authorize",
  tokenUrl: "https://api.projectplace.com/oauth2/access_token",
  website: "https://www.projectplace.com",
  oauth: 2,
});

export const Pushbullet = makeOauthFactory({
  id: "pushbullet",
  title: "Pushbullet",
  authorizeUrl: "https://www.pushbullet.com/authorize",
  tokenUrl: "https://api.pushbullet.com/oauth2/token",
  website: "https://pushbullet.com",
  oauth: 2,
});

export const Qq = makeOauthFactory({
  id: "qq",
  title: "Qq",
  authorizeUrl: "https://graph.qq.com/oauth2.0/authorize",
  tokenUrl: "https://graph.qq.com/oauth2.0/token",
  website: "https://qq.com",
  oauth: 2,
});

export const Ravelry = makeOauthFactory({
  id: "ravelry",
  title: "Ravelry",
  requestTokenUrl: "https://www.ravelry.com/oauth/request_token",
  authorizeUrl: "https://www.ravelry.com/oauth/authorize",
  website: "https://ravelry.com",
  tokenUrl: "https://www.ravelry.com/oauth/access_token",
  oauth: 1,
  scopeDelimiter: " ",
});

export const Redbooth = makeOauthFactory({
  id: "redbooth",
  title: "Redbooth",
  authorizeUrl: "https://redbooth.com/oauth2/authorize",
  tokenUrl: "https://redbooth.com/oauth2/token",
  website: "https://redbooth.com",
  oauth: 2,
});

// export const Reddit = make({
//   id: "reddit",
//   title: "",
//   authorizeUrl: "https://ssl.reddit.com/api/v1/authorize",
//   tokenUrl: "https://ssl.reddit.com/api/v1/access_token",
//   website: "",
//   oauth: 2,
// });

export const Runkeeper = makeOauthFactory({
  id: "runkeeper",
  title: "Runkeeper",
  authorizeUrl: "https://runkeeper.com/apps/authorize",
  tokenUrl: "https://runkeeper.com/apps/token",
  website: "https://runkeeper.com",
  oauth: 2,
});

// export const Salesforce = make({
//   id: "salesforce",
//   title: "",
//   authorizeUrl: "https://login.salesforce.com/services/oauth2/authorize",
//   tokenUrl: "https://login.salesforce.com/services/oauth2/token",
//   website: "",
//   oauth: 2,
//   scopeDelimiter: " ",
// });

export const Sellsy = makeHandlerFactory({
  id: "sellsy",
  name: "Sellsy",
  type: "oauth",
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
  title: "Shoeboxed",
  authorizeUrl: "https://id.shoeboxed.com/oauth/authorize",
  tokenUrl: "https://id.shoeboxed.com/oauth/token",
  website: "https://shoeboxed.com",
  oauth: 2,
});

export const Shopify = makeOauthFactoryWithSubdomainArg({
  id: "shopify",
  title: "Shopify",
  authorizeUrl: "https://[subdomain].myshopify.com/admin/oauth/authorize",
  tokenUrl: "https://[subdomain].myshopify.com/admin/oauth/access_token",
  website: "https://shopify.com",
  oauth: 2,
});

export const Skyrock = makeOauthFactory({
  id: "skyrock",
  title: "Skyrock",
  requestTokenUrl: "https://api.skyrock.com/v2/oauth/initiate",
  authorizeUrl: "https://api.skyrock.com/v2/oauth/authorize",
  website: "https://skyrock.com",
  tokenUrl: "https://api.skyrock.com/v2/oauth/token",
  oauth: 1,
});

// export const Slack = make({
//   id: "slack",
//   title: "",
//   authorizeUrl: "https://slack.com/oauth/authorize",
//   tokenUrl: "https://slack.com/api/oauth.access",
//   website: "",
//   oauth: 2,
// });

// Dead.
// export const Slice = makeOauthFactory({
//   id: "slice",
//   title: "Slice",
//   authorizeUrl: "https://api.slice.com/oauth/authorize",
//   tokenUrl: "https://api.slice.com/oauth/token",
//   website: "https://slice.com",
//   oauth: 2,
// });

export const Smartsheet = makeOauthFactory({
  id: "smartsheet",
  title: "Smartsheet",
  authorizeUrl: "https://app.smartsheet.com/b/authorize",
  tokenUrl: "https://api.smartsheet.com/2.0/token",
  website: "https://smartsheet.com",
  oauth: 2,
  scopeDelimiter: " ",
});

// https://api.smugmug.com/api/v2/doc/tutorial/authorization.html
export const Smugmug = makeOauthFactory({
  id: "smugmug",
  title: "Smugmug",
  requestTokenUrl:
    "https://api.smugmug.com/services/oauth/1.0a/getRequestToken",
  authorizeUrl: "https://api.smugmug.com/services/oauth/1.0a/authorize",
  website: "https://smugmug.com",
  tokenUrl: "https://api.smugmug.com/services/oauth/1.0a/getAccessToken",
  oauth: 1,
});

export const Snapchat = makeOauthFactory({
  id: "snapchat",
  title: "Snapchat",
  authorizeUrl: "https://accounts.snapchat.com/accounts/oauth2/auth",
  tokenUrl: "https://accounts.snapchat.com/accounts/oauth2/token",
  website: "https://snapchat.com",
  oauth: 2,
  scopeDelimiter: " ",
});

export const Snowflake = makeOauthFactoryWithSubdomainArg({
  id: "snowflake",
  title: "Snowflake",
  authorizeUrl: "https://[subdomain].snowflakecomputing.com/oauth/authorize",
  tokenUrl: "https://[subdomain].snowflakecomputing.com/oauth/token-request",
  website: "https://www.snowflake.com",
  oauth: 2,
  scopeDelimiter: " ",
});

export const SocialPilot = makeOauthFactory({
  id: "socialpilot",
  title: "SocialPilot",
  authorizeUrl: "https://panel.socialpilot.co/oauth",
  tokenUrl: "https://panel.socialpilot.co/oauth/accesstoken",
  website: "https://www.socialpilot.co",
  oauth: 2,
});

export const Socrata = makeOauthFactoryWithSubdomainArg({
  id: "socrata",
  title: "Socrata",
  authorizeUrl: "https://[subdomain]/oauth/authorize",
  tokenUrl: "https://[subdomain]/oauth/access_token",
  website: "https://www.socrata.com",
  oauth: 2,
});

export const SoundCloud = makeOauthFactory({
  id: "soundcloud",
  title: "SoundCloud",
  authorizeUrl: "https://soundcloud.com/connect",
  tokenUrl: "https://api.soundcloud.com/oauth2/token",
  website: "https://soundcloud.com",
  oauth: 2,
});

// export const Spotify = make({
//   id: "spotify",
//   title: "",
//   authorizeUrl: "https://accounts.spotify.com/authorize",
//   tokenUrl: "https://accounts.spotify.com/api/token",
//   website: "",
//   oauth: 2,
//   scopeDelimiter: " ",
// });

export const Square = makeOauthFactory({
  id: "square",
  title: "Square",
  authorizeUrl: "https://connect.squareup.com/oauth2/authorize",
  tokenUrl: "https://connect.squareup.com/oauth2/token",
  website: "https://squareup.com",
  oauth: 2,
  scopeDelimiter: " ",
});

export const StackExchange = makeOauthFactory({
  id: "stackexchange",
  title: "Stack Exchange",
  authorizeUrl: "https://stackexchange.com/oauth",
  tokenUrl: "https://stackexchange.com/oauth/access_token",
  website: "https://stackexchange.com",
  oauth: 2,
});

export const Stocktwits = makeOauthFactory({
  id: "stocktwits",
  title: "Stocktwits",
  authorizeUrl: "https://api.stocktwits.com/api/2/oauth/authorize",
  tokenUrl: "https://api.stocktwits.com/api/2/oauth/token",
  website: "https://stocktwits.com",
  oauth: 2,
});

export const Stormz = makeOauthFactory({
  id: "stormz",
  title: "Stormz",
  authorizeUrl: "https://stormz.me/oauth/authorize",
  tokenUrl: "https://stormz.me/oauth/token",
  website: "https://stormz.me",
  oauth: 2,
  scopeDelimiter: " ",
});

export const Storyblok = makeOauthFactory({
  id: "storyblok",
  title: "Storyblok",
  authorizeUrl: "https://app.storyblok.com/oauth/authorize",
  tokenUrl: "https://app.storyblok.com/oauth/token",
  website: "https://www.storyblok.com",
  oauth: 2,
  scopeDelimiter: " ",
});

// export const Strava = make({
//   id: "strava",
//   title: "",
//   authorizeUrl: "https://www.strava.com/oauth/authorize",
//   tokenUrl: "https://www.strava.com/oauth/token",
//   website: "",
//   oauth: 2,
// });

export const Stripe = makeOauthFactory({
  id: "stripe",
  title: "Stripe",
  authorizeUrl: "https://connect.stripe.com/oauth/authorize",
  tokenUrl: "https://connect.stripe.com/oauth/token",
  website: "https://stripe.com",
  oauth: 2,
});

export const SurveyMonkey = makeOauthFactory({
  id: "surveymonkey",
  title: "SurveyMonkey",
  authorizeUrl: "https://api.surveymonkey.com/oauth/authorize",
  tokenUrl: "https://api.surveymonkey.net/oauth/token",
  website: "https://www.surveymonkey.com",
  oauth: 2,
});

export const SurveysParrow = makeOauthFactory({
  id: "surveysparrow",
  title: "SurveySparrow",
  authorizeUrl: "https://app.surveysparrow.com/o/oauth/auth",
  tokenUrl: "https://app.surveysparrow.com/o/oauth/token",
  website: "https://surveysparrow.com",
  oauth: 2,
});

export const Thingiverse = makeOauthFactory({
  id: "thingiverse",
  title: "Thingiverse",
  authorizeUrl: "https://www.thingiverse.com/login/oauth/authorize",
  tokenUrl: "https://www.thingiverse.com/login/oauth/access_token",
  website: "https://www.thingiverse.com",
  oauth: 2,
});

export const Ticketbud = makeOauthFactory({
  id: "ticketbud",
  title: "Ticketbud",
  authorizeUrl: "https://api.ticketbud.com/oauth/authorize",
  tokenUrl: "https://api.ticketbud.com/oauth/token",
  website: "https://www.ticketbud.com",
  oauth: 2,
});

export const TikTok = makeOauthFactory({
  id: "tiktok",
  title: "TikTok",
  authorizeUrl: "https://open-api.tiktok.com/platform/oauth/connect/",
  tokenUrl: "https://open-api.tiktok.com/oauth/access_token/",
  website: "https://www.tiktok.com",
  oauth: 2,
});

export const Timely = makeOauthFactory({
  id: "timely",
  title: "Timely",
  authorizeUrl: "https://api.timelyapp.com/1.1/oauth/authorize",
  tokenUrl: "https://api.timelyapp.com/1.1/oauth/token",
  website: "https://www.timelyapp.com",
  oauth: 2,
});

// export const Todoist = make({
//   id: "todoist",
//   title: "",
//   authorizeUrl: "https://todoist.com/oauth/authorize",
//   tokenUrl: "https://todoist.com/oauth/access_token",
//   website: "",
//   oauth: 2,
// });

// export const Trakt = make({
//   id: "trakt",
//   title: "",
//   authorizeUrl: "https://api-v2launch.trakt.tv/oauth/authorize",
//   tokenUrl: "https://api-v2launch.trakt.tv/oauth/token",
//   website: "",
//   oauth: 2,
// });

export const Traxo = makeOauthFactory({
  id: "traxo",
  title: "Traxo",
  authorizeUrl: "https://www.traxo.com/oauth/authenticate",
  tokenUrl: "https://www.traxo.com/oauth/token",
  website: "https://www.traxo.com",
  oauth: 2,
});

export const Trello = makeOauthFactory({
  id: "trello",
  title: "Trello",
  requestTokenUrl: "https://trello.com/1/OAuthGetRequestToken",
  authorizeUrl: "https://trello.com/1/OAuthAuthorizeToken",
  website: "https://trello.com",
  tokenUrl: "https://trello.com/1/OAuthGetAccessToken",
  oauth: 1,
});

export const TripIt = makeOauthFactory({
  id: "tripit",
  title: "TripIt",
  requestTokenUrl: "https://api.tripit.com/oauth/request_token",
  authorizeUrl: "https://www.tripit.com/oauth/authorize",
  website: "https://www.tripit.com",
  tokenUrl: "https://api.tripit.com/oauth/access_token",
  oauth: 1,
});

export const Trustpilot = makeOauthFactory({
  id: "trustpilot",
  title: "Trustpilot",
  authorizeUrl: "https://authenticate.trustpilot.com",
  tokenUrl:
    "https://api.trustpilot.com/v1/oauth/oauth-business-users-for-applications/accesstoken",
  website: "https://www.trustpilot.com",
  oauth: 2,
});

export const Tumblr = makeHandlerFactory({
  id: "tumblr",
  name: "Tumblr",
  type: "oauth",
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
//   title: "",
//   authorizeUrl: "https://id.twitch.tv/oauth2/authorize",
//   tokenUrl: "https://id.twitch.tv/oauth2/token",
//   website: "",
//   oauth: 2,
//   scopeDelimiter: " ",
// });

// export const Twitter = make({
//   id: "twitter",
//   title: "",
//   request_url: "https://api.twitter.com/oauth/request_token",
//   authorizeUrl: "https://api.twitter.com/oauth/authenticate",
//   website: "",
//   tokenUrl: "https://api.twitter.com/oauth/access_token",
//   oauth: 1,
// });

export const Twitter = makeHandlerFactory({
  id: "twitter",
  name: "Twitter",
  type: "oauth",
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
  title: "Typeform",
  authorizeUrl: "https://api.typeform.com/oauth/authorize",
  tokenUrl: "https://api.typeform.com/oauth/token",
  website: "https://www.typeform.com",
  oauth: 2,
  scopeDelimiter: " ",
});

export const Uber = makeOauthFactory({
  id: "uber",
  title: "Uber",
  authorizeUrl: "https://login.uber.com/oauth/authorize",
  tokenUrl: "https://login.uber.com/oauth/token",
  website: "https://www.uber.com",
  oauth: 2,
});

export const Unbounce = makeOauthFactory({
  id: "unbounce",
  title: "Unbounce",
  authorizeUrl: "https://api.unbounce.com/oauth/authorize",
  tokenUrl: "https://api.unbounce.com/oauth/token",
  website: "https://www.unbounce.com",
  oauth: 2,
});

export const UnderArmour = makeOauthFactory({
  id: "underarmour",
  title: "Under Armour",
  authorizeUrl: "https://www.mapmyfitness.com/v7.1/oauth2/uacf/authorize",
  tokenUrl: "https://api.mapmyfitness.com/v7.1/oauth2/access_token",
  website: "https://www.underarmour.com",
  oauth: 2,
});

export const Unsplash = makeOauthFactory({
  id: "unsplash",
  title: "Unsplash",
  authorizeUrl: "https://unsplash.com/oauth/authorize",
  tokenUrl: "https://unsplash.com/oauth/token",
  website: "https://unsplash.com",
  oauth: 2,
  scopeDelimiter: "+",
});

export const Untappd = makeOauthFactory({
  id: "untappd",
  title: "Untappd",
  authorizeUrl: "https://untappd.com/oauth/authenticate",
  tokenUrl: "https://untappd.com/oauth/authorize",
  website: "https://untappd.com",
  oauth: 2,
});

export const Upwork = makeOauthFactory({
  id: "upwork",
  title: "Upwork",
  requestTokenUrl: "https://www.upwork.com/api/auth/v1/oauth/token/request",
  authorizeUrl: "https://www.upwork.com/services/api/auth",
  website: "https://www.upwork.com",
  tokenUrl: "https://www.upwork.com/api/auth/v1/oauth/token/access",
  oauth: 1,
});

export const UserVoice = makeOauthFactory({
  id: "uservoice",
  title: "UserVoice",
  requestTokenUrl: "https://outofindex.uservoice.com/oauth/request_token",
  authorizeUrl: "https://outofindex.uservoice.com/oauth/authorize",
  website: "https://www.uservoice.com",
  tokenUrl: "https://outofindex.uservoice.com/oauth/access_token",
  oauth: 1,
});

export const Vend = makeOauthFactoryWithSubdomainArg({
  id: "vend",
  title: "Vend",
  authorizeUrl: "https://secure.vendhq.com/connect",
  tokenUrl: "https://[subdomain].vendhq.com/api/1.0/token",
  website: "https://www.vendhq.com",
  oauth: 2,
});

export const Venmo = makeOauthFactory({
  id: "venmo",
  title: "Venmo",
  authorizeUrl: "https://api.venmo.com/v1/oauth/authorize",
  tokenUrl: "https://api.venmo.com/v1/oauth/access_token",
  website: "https://venmo.com",
  oauth: 2,
  scopeDelimiter: " ",
});

export const Vercel = makeOauthFactory({
  id: "vercel",
  title: "Vercel",
  authorizeUrl: "https://vercel.com/oauth/authorize",
  tokenUrl: "https://api.vercel.com/v2/oauth/access_token",
  website: "https://vercel.com",
  oauth: 2,
});

export const VerticalResponse = makeOauthFactory({
  id: "verticalresponse",
  title: "VerticalResponse",
  authorizeUrl: "https://vrapi.verticalresponse.com/api/v1/oauth/authorize",
  tokenUrl: "https://vrapi.verticalresponse.com/api/v1/oauth/access_token",
  website: "https://www.verticalresponse.com",
  oauth: 2,
});

export const Viadeo = makeOauthFactory({
  id: "viadeo",
  title: "Viadeo",
  authorizeUrl: "https://partners.viadeo.com/oauth/authorize",
  tokenUrl: "https://partners.viadeo.com/oauth/token",
  website: "https://www.viadeo.com",
  oauth: 2,
});

export const Vimeo = makeOauthFactory({
  id: "vimeo",
  title: "Vimeo",
  authorizeUrl: "https://api.vimeo.com/oauth/authorize",
  tokenUrl: "https://api.vimeo.com/oauth/access_token",
  website: "https://vimeo.com",
  oauth: 2,
  scopeDelimiter: " ",
});

export const VisualStudio = makeOauthFactory({
  id: "visualstudio",
  title: "Visual Studio",
  authorizeUrl: "https://app.vssps.visualstudio.com/oauth2/authorize",
  tokenUrl: "https://app.vssps.visualstudio.com/oauth2/token",
  website: "https://visualstudio.microsoft.com",
  oauth: 2,
  scopeDelimiter: " ",
});

// export const Vk = make({
//   id: "vk",
//   title: "",
//   authorizeUrl: "https://oauth.vk.com/authorize",
//   tokenUrl: "https://oauth.vk.com/access_token",
//   website: "",
//   oauth: 2,
// });

export const WeChat = makeOauthFactory({
  id: "wechat",
  title: "WeChat",
  authorizeUrl: "https://open.weixin.qq.com/connect/oauth2/authorize",
  tokenUrl: "https://api.weixin.qq.com/sns/oauth2/access_token",
  website: "https://wechat.com",
  oauth: 2,
});

export const Weekdone = makeOauthFactory({
  id: "weekdone",
  title: "Weekdone",
  authorizeUrl: "https://weekdone.com/oauth_authorize",
  tokenUrl: "https://weekdone.com/oauth_token",
  website: "https://weekdone.com",
  oauth: 2,
});

export const Weibo = makeOauthFactory({
  id: "weibo",
  title: "Weibo",
  authorizeUrl: "https://api.weibo.com/oauth2/authorize",
  tokenUrl: "https://api.weibo.com/oauth2/access_token",
  website: "https://weibo.com",
  oauth: 2,
});

export const Withings = makeOauthFactory({
  id: "withings",
  title: "Withings",
  authorizeUrl: "https://account.withings.com/oauth2_user/authorize2",
  tokenUrl: "https://wbsapi.withings.net/v2/oauth2",
  website: "https://www.withings.com",
  oauth: 2,
});

// export const Wordpress = make({
//   id: "wordpress",
//   title: "",
//   authorizeUrl: "https://public-api.wordpress.com/oauth2/authorize",
//   tokenUrl: "https://public-api.wordpress.com/oauth2/token",
//   website: "",
//   oauth: 2,
// });

// export const Workos = make({
//   id: "workos",
//   title: "",
//   authorizeUrl: "https://api.workos.com/sso/authorize",
//   tokenUrl: "https://api.workos.com/sso/token",
//   website: "",
//   oauth: 2,
// });

export const Wrike = makeOauthFactory({
  id: "wrike",
  title: "Wrike",
  authorizeUrl: "https://www.wrike.com/oauth2/authorize",
  tokenUrl: "https://www.wrike.com/oauth2/token",
  website: "https://www.wrike.com",
  oauth: 2,
});

export const Xero = makeOauthFactory({
  id: "xero",
  title: "Xero",
  requestTokenUrl: "https://api.xero.com/oauth/RequestToken",
  authorizeUrl: "https://api.xero.com/oauth/Authorize",
  website: "https://www.xero.com",
  tokenUrl: "https://api.xero.com/oauth/AccessToken",
  oauth: 1,
});

export const Xing = makeOauthFactory({
  id: "xing",
  title: "Xing",
  requestTokenUrl: "https://api.xing.com/v1/request_token",
  authorizeUrl: "https://api.xing.com/v1/authorize",
  website: "https://www.xing.com",
  tokenUrl: "https://api.xing.com/v1/access_token",
  oauth: 1,
});

export const Yahoo = makeOauthFactory({
  id: "yahoo",
  title: "Yahoo",
  authorizeUrl: "https://api.login.yahoo.com/oauth2/request_auth",
  tokenUrl: "https://api.login.yahoo.com/oauth2/get_token",
  website: "https://www.yahoo.com",
  oauth: 2,
});

export const Yammer = makeOauthFactory({
  id: "yammer",
  title: "Yammer",
  authorizeUrl: "https://www.yammer.com/dialog/oauth",
  tokenUrl: "https://www.yammer.com/oauth2/access_token.json",
  website: "https://www.yammer.com",
  oauth: 2,
});

// export const Yandex = make({
//   id: "yandex",
//   title: "",
//   authorizeUrl: "https://oauth.yandex.com/authorize",
//   tokenUrl: "https://oauth.yandex.com/token",
//   website: "",
//   oauth: 2,
// });

export const Zendesk = makeOauthFactoryWithSubdomainArg({
  id: "zendesk",
  title: "Zendesk",
  authorizeUrl: "https://[subdomain].zendesk.com/oauth/authorizations/new",
  tokenUrl: "https://[subdomain].zendesk.com/oauth/tokens",
  website: "https://www.zendesk.com",
  oauth: 2,
  scopeDelimiter: " ",
});

// export const Zoom = make({
//   id: "zoom",
//   title: "",
//   authorizeUrl: "https://zoom.us/oauth/authorize",
//   tokenUrl: "https://zoom.us/oauth/token",
//   website: "",
//   oauth: 2,
//   scopeDelimiter: " ",
// });
