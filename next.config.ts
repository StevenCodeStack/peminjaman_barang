import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.unsplash.com", // All subdomains
        port: "",
        pathname: "/**", // All paths
      },
    ],
  },
};

export default nextConfig;
