import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingIncludes: {
    "/api/tutor": ["./content/tutor/**/*"],
  },
};

export default nextConfig;
