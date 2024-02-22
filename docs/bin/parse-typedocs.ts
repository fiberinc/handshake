// Parses provider typedocs and values from the handshake library and places it
// in a cleaner object inside `docs/providers.json`.

import assert from "assert";
import chalk from "chalk";
import fs from "fs";
import * as handshake from "../../handshake";
import docsJson from "./providers-typedoc.json";

const providersWithoutLogos = [
  "authentik",
  "zoho",
  "42-school",
  "dropbox",
  "strava",
  "naver",
  "duende-identity-server6.svg",
  "coinbase",
  "netlify",
  "pipedrive",
  "medium",
  "wordpress",
  "eveonline",
  "kakao",
  "fusionauth",
  "osu",
  "osso",
  "zitadel",
  "pinterest",
  "four",
  "reddit",
  "salesforce",
  "zoom",
];

function extractClasses(docs: any) {
  const result: {
    id: string;
    name: string;
    title: string;
    logo: string;
    docs: string;
  }[] = [];

  // Traverse the JSON structure to find and format class documentation
  // This is a simplified example; you'll need to adapt it to your JSON structure
  docs.children.forEach((item: any) => {
    try {
      // Sanity checks to make sure we understand what's going on.
      if (item.variant !== "declaration") {
        throw Error("unexpected");
      }
      if (item.sources.length !== 1) {
        throw Error("unexpected");
      }
      if (
        item.sources[0].fileName.match(/providers\/[-_a-zA-Z]+.ts/) === null &&
        item.sources[0].fileName.match(
          /providers\/from-next-auth\/[-_a-zA-Z]+.ts/,
        ) === null
      ) {
        console.log(
          chalk.dim(`ignoring ${item.name} inside ${item.sources[0].fileName}`),
        );
        return;
      }
      if (item.signatures.length !== 1) {
        throw Error("unexpected");
      }

      // const from = require('')[itemName]

      const fromHandshake = handshake[item.name]({}).provider;
      const providerId = fromHandshake.id;
      assert(providerId);

      // console.log("metadata", metadata);

      let logo = fromHandshake.metadata.logo?.replace("/", "");

      if (providersWithoutLogos.indexOf(providerId) !== -1) {
        logo = `${providerId}.svg`;
        // } else if (!logo) {
        //   logo = providerId.toLowerCase() + ".svg";
      }

      if (!logo) {
        console.log("provider has no logo", providerId);
      }

      let title = fromHandshake.metadata.title;
      if (providerId === "twitter") {
        title = "Twitter";
      }

      result.push({
        id: providerId,
        name: item.name,
        title,
        logo,
        docs:
          item.signatures[0].comment?.summary
            .map(({ text }: any) => {
              return text;
            })
            .join("\n") ?? null,
      });
    } catch (e) {
      console.log("failed for item", item);
      throw e;
    }
  });

  return result;
}

const providerInfos = extractClasses(docsJson);

console.log("Extracted data about", providerInfos.length, "providers");
// assert(providerInfos.length === 65, "Sanity check. Update this counter.");

// Write to CLASSES.md
fs.writeFileSync(
  __dirname + "/../providers.json",
  JSON.stringify(providerInfos, null, 2),
);
