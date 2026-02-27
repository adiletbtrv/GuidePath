import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false, // Disables the "X-Powered-By: Next.js" header
  productionBrowserSourceMaps: false, // Prevents sourcemaps from being published, hiding code in DevTools
};

export default nextConfig;
