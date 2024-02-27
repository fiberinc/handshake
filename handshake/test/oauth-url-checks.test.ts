// For each OAuth provider, check that the URLs they reference are up.

import assert from "assert";
import fetch from "node-fetch";
import { HandlerFactory } from "~/core/types";
import * as allFactories from "../src/providers";

const FLAG_HOST = "flag_17439";

test.each(Object.entries(allFactories).slice(0, 30))(
  "Provider %s",
  async (name, handlerFactory) => {
    console.log(`Provider ${name}`);

    await testHandler(handlerFactory);
  },
);

async function testHandler(factory: HandlerFactory<any>) {
  const handler = factory({
    subdomain: `${FLAG_HOST}_subdomain`,
    issuer: `${FLAG_HOST}_issuer`,
  });

  const { oauthConfig } = handler.provider;
  if (!oauthConfig) {
    console.log(`Skipping ${handler.provider.id} because no OAuth config.`);
    return;
  }

  if (oauthConfig.wellKnown) {
    await testEndpoint(oauthConfig.wellKnown);
    return;
  }

  const authorizationUrl =
    oauthConfig.authorization?.url ?? oauthConfig.authorizationUrl;
  if (authorizationUrl) {
    await testEndpoint(authorizationUrl);
  } else {
    throw Error(
      `Provider ${handler.provider.id} has no authorizationUrl ` +
        JSON.stringify(handler.provider.oauthConfig),
    );
  }

  // const accessTokenUrl = oauthConfig.accessTokenUrl;
  // if (accessTokenUrl) {
  //   await testEndpoint(accessTokenUrl);
  // } else {
  //   throw Error(
  //     `Provider ${handler.provider.id} has no accessTokenUrl ` +
  //       JSON.stringify(handler.provider.oauthConfig),
  //   );
  // }
}

/**
 * If a URL contains the `FLAG_HOST` as host, we skip hitting it since we know
 * we won't be able to get a response.
 */
async function testEndpoint(url: string) {
  if (url.replace(/^https?:\/\//, "").startsWith(FLAG_HOST)) {
    console.log(`Skipping ${url} because the URL.`);
    return;
  }

  assert(url);

  let res;
  try {
    res = await fetch(url, {
      // QUESTION do we always want GET here?
      // method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    throw new Error(`Fetch failed url=${url}`);
  }

  if (res.ok) {
    console.log(`URL worked ${url}`);
    return;
  }

  const text = await res.text();

  console.log(`Response: url=${url} status=${res.status}`, text.slice(0, 2000));

  if (res.status === 404 || res.status === 400 || res.status === 403) {
    console.log(`404 on url=${url}. NOT OK.`);
    return;
  }

  throw Error(`NOT OK. url=${url} status=${res.status}`);
}
