/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Strict mode is a development-only feature that helps you identify potential
  // problems in your application. Disable it to prevent components from rendering
  // twice in development.
  // reactStrictMode: false,
  swcMinify: true,
  images: {
    // Ask me how Vercel's ownership of Next.js makes it a money-printing machine.
    unoptimized: true,
  },
};

export default nextConfig;
