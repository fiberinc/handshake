// Parses provider typedocs and values from the handshake library and places it
// in a cleaner object inside `docs/providers.json`.

import assert from "assert";
import chalk from "chalk";
import fs from "fs";
import * as handshake from "../../handshake";
import docsJson from "./providers-typedoc.json";

const DOCS_IMAGES_ABS_PATH = "https://handshake.cool/images/docs";

function extractClasses(docs: any) {
  const result: {
    id: string;
    name: string;
    title: string;
    website?: string;
    isFromNextAuth: boolean;
    takesSubdomainArg: boolean;
    // logo: string;
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
        item.sources[0].fileName.match(/providers\/oauth\/[-_a-zA-Z]+.ts/) ===
          null &&
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

      if (item.name.endsWith("Scope") || item.name.endsWith("Credential")) {
        console.log(
          chalk.dim(`ignoring ${item.name} inside ${item.sources[0].fileName}`),
        );
        return;
      }

      if (item.signatures.length !== 1) {
        throw Error("unexpected");
      }

      // const from = require('')[itemName]

      const fromHandshake = handshake[item.name]({
        clientId: "asdf",
        clientSecret: "asdf",
        issuer: "asdf",
        subdomain: "asdf",
        scopes: ["asdf"],
      }).provider;
      const providerId = fromHandshake.id;
      assert(providerId);

      // console.log("metadata", metadata);

      let name = fromHandshake.name;
      if (providerId === "twitter") {
        name = "Twitter";
      }

      const website = fromHandshake.website || null;
      if (website) {
        if (!website.startsWith("https://")) {
          throw Error(`website ${website} is invalid`);
        }
      }

      result.push({
        id: providerId,
        name: item.name,
        title: name,
        website,
        isFromNextAuth:
          item.sources[0].fileName.match(/from-next-auth/) !== null,
        takesSubdomainArg: JSON.stringify(item.signatures).includes(
          "subdomain",
        ),
        // logo,
        docs:
          item.signatures[0].comment?.summary
            .map(({ text }: any) => {
              return text.replace(/\/?DOC_IMAGES/g, DOCS_IMAGES_ABS_PATH);
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
