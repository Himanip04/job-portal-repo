import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: isProd ? "/job-portal-repo" : "",
  assetPrefix: isProd ? "/job-portal-repo/" : "",
};

export default nextConfig;
