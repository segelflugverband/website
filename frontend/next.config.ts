import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin();

const strapiHost = process.env.STRAPI_HOST ?? 'localhost';
const strapiPort = process.env.STRAPI_PORT ? Number(process.env.STRAPI_PORT) : 1337;

const nextConfig: NextConfig = {
  reactCompiler: true,

  images: {
    dangerouslyAllowSVG: true,
    dangerouslyAllowLocalIP: process.env.NODE_ENV !== 'production',
    remotePatterns: [
      {
        // Strapi media library (local dev)
        protocol: 'http',
        hostname: strapiHost,
        port: String(strapiPort),
        pathname: '/uploads/**',
      },
      {
        // Strapi media library (production — update hostname when deploying)
        protocol: 'https',
        hostname: strapiHost,
        pathname: '/uploads/**',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
