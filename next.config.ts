import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/RP-Hypertrophy-Hub-Visualizer",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
