import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["images.ctfassets.net", "downloads.ctfassets.net"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.ctfassets.net",
      },
    ],
  },
};

export default nextConfig;
