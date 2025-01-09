import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    // Enable modern features
    typedRoutes: true,
  }
};

export default nextConfig;
