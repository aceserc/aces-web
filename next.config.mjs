/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "www.svgrepo.com",
        pathname: "**/*.svg",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
