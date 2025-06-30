import type { NextConfig } from "next";
// import withExportImages from "next-export-optimize-images";

// const nextConfig: NextConfig = withExportImages({
const nextConfig: NextConfig = {
  output: process.env.NODE_ENV === "production" ? "export" : "standalone",
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "www.svgrepo.com",
        protocol: "https",
      },
      {
        hostname: "*",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
