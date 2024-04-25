/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // swcMinify: true,
  // pageExtensions: ["ts", "tsx"],
  // compiler: { emotion: true },
  transpilePackages: ["next-mdx-remote"],
};

export default nextConfig;
