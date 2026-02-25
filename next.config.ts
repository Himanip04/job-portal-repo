import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 output: "export",
  basePath: "/job-portal-repo",
  assetPrefix: "/job-portal-repo/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
