import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/services", destination: "/solutions", permanent: true },
      { source: "/protocol-plus", destination: "/solutions", permanent: true },
      { source: "/hardware/:path*", destination: "/solutions", permanent: true },
      { source: "/software/:path*", destination: "/solutions", permanent: true },
      {
        source: "/technology-checkup/:path*",
        destination: "/solutions",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
