import type { MetadataRoute } from 'next';
import { SITE_URL, abs } from '@/lib/seo';

// generated once at build time (the site is a static export)
export const dynamic = 'force-static';

/** /robots.txt */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/offline', '/en/offline'] }],
    sitemap: abs('/sitemap.xml'),
    host: SITE_URL,
  };
}
