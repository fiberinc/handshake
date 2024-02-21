// Parses provider information from the handshake library and places it in a
// clean object inside `docs/providers.json`.

import assert from "assert";
import chalk from "chalk";
import fs from "fs";
import docsJson from "./providers-typedoc.json";

function extractClasses(docs: any) {
  const result: {
    name: string;
    text: string;
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

      result.push({
        name: item.name,
        text:
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
