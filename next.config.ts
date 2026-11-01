import type { NextConfig } from 'next';

/** Old static URLs (*.html) keep working. */
const pages = ['about', 'shop', 'faq', 'contact', 'offline'];

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/en/index.html', destination: '/en', permanent: true },
      ...pages.flatMap((p) => [
        { source: `/${p}.html`, destination: `/${p}`, permanent: true },
        { source: `/en/${p}.html`, destination: `/en/${p}`, permanent: true },
      ]),
      { source: '/product.html', has: [{ type: 'query', key: 'id', value: '(?<id>[a-z0-9]+)' }], destination: '/product/:id', permanent: true },
      { source: '/en/product.html', has: [{ type: 'query', key: 'id', value: '(?<id>[a-z0-9]+)' }], destination: '/en/product/:id', permanent: true },
    ];
  },
};

export default nextConfig;
