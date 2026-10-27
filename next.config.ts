import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/documents/:file",
        headers: [
          { key: "Content-Disposition", value: "inline" },
          { key: "X-Content-Type-Options", value: "nosniff" },
        ],
      },
      {
        source: "/documents/:file",
        has: [{ type: "query", key: "download", value: "1" }],
        // The last matching rule overrides inline without duplicating the PDF.
        headers: [{ key: "Content-Disposition", value: "attachment" }],
      },
    ];
  },
};

export default nextConfig;
