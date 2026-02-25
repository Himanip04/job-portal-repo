import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: "/job-portal-repo",
  assetPrefix: "/job-portal-repo",
};

export default nextConfig;
