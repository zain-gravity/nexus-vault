import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  images: {
    domains: [],
  },
  // Suppress Mongoose-related webpack warnings in Next.js
  webpack: (config) => {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };
    return config;
  },
  turbopack: {},
};

export default nextConfig;
