import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client"],
    // @ts-expect-error - This is a valid Next.js config for Vercel tracing but might be missing from types
    outputFileTracingIncludes: {
      "/api/**/*": ["./dev.db", "./prisma/**/*"],
      "/**/*": ["./dev.db", "./prisma/**/*"],
    },
  },
};

export default nextConfig;
