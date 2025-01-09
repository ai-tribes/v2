/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    // Enable modern features
    typedRoutes: true,
  }
};

module.exports = nextConfig; 