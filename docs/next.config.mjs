/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: "/handshake",
  // async redirects() {
  //   return [
  //     {
  //       source: "/",
  //       destination: "/handshake",
  //       permanent: false,
  //     },
  //   ];
  // },
};

export default nextConfig;
