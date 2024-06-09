/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "www.svgrepo.com",
        pathname: "**/*.svg",
        protocol: "https",
      },
      {
        hostname: "res.cloudinary.com",
        pathname: "**/*",
        protocol: "http",
      },
    ],
  },
};

export default nextConfig;
