import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  // Writes every page as <route>/index.html (e.g. en/shop/index.html). Apache serves those
  // folders natively, so no rewrite rules are needed and /en, /en/shop never end in a 403.
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
