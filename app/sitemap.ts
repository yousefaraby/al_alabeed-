import type { MetadataRoute } from 'next';
import { catalog } from '@/lib/catalog';
import { href, type Lang } from '@/lib/i18n';
import { abs, productImages } from '@/lib/seo';

const LANGS: Lang[] = ['ar', 'en'];
const PAGES: { path: string; priority: number; changeFrequency: 'weekly' | 'monthly' }[] = [
  { path: '/', priority: 1, changeFrequency: 'weekly' },
  { path: '/shop', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/about', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/faq', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.7, changeFrequency: 'monthly' },
];
const IMAGES: Record<string, string[]> = {
  '/': ['/assets/hero-lock.jpg', '/assets/products/gm8s-pro.jpg', '/assets/products/me-2043uzh-2.jpg', '/assets/products/power-saver.jpg'],
  '/shop': ['/assets/shop-hero.jpg'],
  '/about': ['/assets/about-dial.jpg'],
};

const alternates = (path: string) => ({ languages: { ar: abs(href('ar', path)), en: abs(href('en', path)), 'x-default': abs(href('ar', path)) } });

/** /sitemap.xml: every page in both languages, with hreflang alternates and every product photo */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return LANGS.flatMap((lang) => [
    ...PAGES.map(({ path, priority, changeFrequency }) => ({
      url: abs(href(lang, path)), lastModified: now, changeFrequency, priority, alternates: alternates(path),
      ...(IMAGES[path] ? { images: IMAGES[path].map(abs) } : {}),
    })),
    ...catalog(lang).map((p) => {
      const path = `/product/${p.id}`;
      return {
        url: abs(href(lang, path)), lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8, alternates: alternates(path),
        images: productImages(p, lang).map((i) => abs(i.url)),
      };
    }),
  ]);
}
