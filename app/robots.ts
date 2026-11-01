import type { MetadataRoute } from 'next';
import { SITE_URL, abs } from '@/lib/seo';

/** /robots.txt */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/offline', '/en/offline'] }],
    sitemap: abs('/sitemap.xml'),
    host: SITE_URL,
  };
}
