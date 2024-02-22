// Parses provider information from the handshake library and places it in a
// clean object inside `docs/providers.json`.

import assert from "assert";
import chalk from "chalk";
import fs from "fs";
import * as handshake from "../../handshake";
import docsJson from "./providers-typedoc.json";

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

      console.log("asdf", item.name, item.signatures[0].comment);

      // const from = require('')[itemName]

      const fromHandshake = handshake[item.name]({}).provider;
      const providerId = fromHandshake.id;
      assert(providerId);

      // console.log("metadata", metadata);

      let logo = fromHandshake.metadata.logo?.replace("/", "");
      if (providerId === "authentik") {
        logo = "authentik.svg";
      } else if (providerId === "zoho") {
        logo = "zoho.svg";
      } else if (providerId === "dropbox") {
        logo = "dropbox.svg";
      } else if (providerId === "strava") {
        logo = "strava.svg";
      } else if (providerId === "naver") {
        logo = "naver.svg";
      } else if (providerId === "coinbase") {
        logo = "coinbase.svg";
      } else if (providerId === "netlify") {
        logo = "netlify.svg";
      } else if (providerId === "medium") {
        logo = "medium.svg";
      } else if (providerId === "wordpress") {
        logo = "wordpress.svg";
      } else if (providerId === "kakao") {
        logo = "kakao.svg";
      } else if (providerId === "fusionauth") {
        logo = "fusionauth.svg";

        // } else if (providerId === "bungie") {
        //   logo = "bungie.svg";
      } else if (providerId === "pinterest") {
        logo = "pinterest.svg";
      } else if (providerId === "four") {
        logo = "four.svg";
      } else if (providerId === "reddit") {
        logo = "reddit.svg";
      } else if (providerId === "zoom") {
        logo = "zoom.svg";
        // } else if (!logo) {
        //   logo = providerId.toLowerCase() + ".svg";
      }

      if (!logo) {
        console.log("provider has no logo", providerId);
      }

      result.push({
        id: providerId,
        name: item.name,
        title: fromHandshake.metadata.title,
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
assert(providerInfos.length === 65, "Sanity check. Update this counter.");

// Write to CLASSES.md
fs.writeFileSync(
  __dirname + "/../providers.json",
  JSON.stringify(providerInfos, null, 2),
);
