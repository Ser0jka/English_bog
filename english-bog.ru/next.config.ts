import type { NextConfig } from "next";

const oneYearImmutable = [
  {
    key: "Cache-Control",
    value: "public, max-age=31536000, immutable",
  },
];

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: oneYearImmutable,
      },
      {
        source: "/reviews/:path*",
        headers: oneYearImmutable,
      },
      {
        source: "/videos/:path*",
        headers: oneYearImmutable,
      },
      {
        source: "/favicon/:path*",
        headers: oneYearImmutable,
      },
    ];
  },
};

export default nextConfig;
