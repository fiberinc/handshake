// @ts-check

const standards = new Set([
  "Headers",
  "Request",
  "Response",
  "URL",
  "URLSearchParams",
])

/** @param {import("typedoc").Application} app */
module.exports.load = (app) => {
  // When a standard API is referenced, link to the MDN page for it.
  app.converter.addUnknownSymbolResolver((reference) => {
    const name = reference.symbolReference?.path?.[0].path ?? ""
    if (reference.moduleSource !== "typescript" || !standards.has(name)) {
      return undefined
    }
    return `https://developer.mozilla.org/en-US/docs/Web/API/${name}`
  })
}
