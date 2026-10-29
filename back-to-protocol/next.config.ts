import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
