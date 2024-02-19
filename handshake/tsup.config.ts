// https://tsup.egoist.dev/#typescript--javascript

import { defineConfig, Options } from "tsup";

export default defineConfig((options: Options) => ({
  entry: ["src/**/*.ts"],
  format: ["esm"],
  dts: true,
  sourcemap: true,
  // minify: true,
  external: ["react"],
  ...options,
}));
