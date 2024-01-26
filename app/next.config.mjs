import { withSentryConfig } from "@sentry/nextjs";

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
  // FIXME should this var be public!?
  authToken: process.env.NEXT_PUBLIC_SENTRY_AUTH_TOKEN,
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Strict mode is a development-only feature that helps you identify potential
  // problems in your application. Disable it to prevent components from rendering
  // twice in development.
  // reactStrictMode: false,
  swcMinify: true,
  // pageExtensions: ['page.tsx', 'page.ts'],

  images: {
    // Ask me how Vercel's ownership of Next.js makes it a money-printing machine.
    unoptimized: true,
  },

  sentry: {
    // Use `hidden-source-map` rather than `source-map` as the Webpack `devtool`
    // for client-side builds. (This will be the default starting in
    // `@sentry/nextjs` version 8.0.0.) See
    // https://webpack.js.org/configuration/devtool/ and
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/#use-hidden-source-map
    // for more information.
    hideSourceMaps: true,
  },
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
export default withSentryConfig(nextConfig, sentryWebpackPluginOptions);
