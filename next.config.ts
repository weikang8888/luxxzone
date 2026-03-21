import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "luxxzone-352910020234-ap-southeast-1-an.s3.ap-southeast-1.amazonaws.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
