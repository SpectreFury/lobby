/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "grandiose-stoat-141.convex.cloud",
        port: "",
        pathname: "/api/storage/**",
      },
    ],
  },
};

export default nextConfig;
