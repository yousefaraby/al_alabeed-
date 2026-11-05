import { existsSync } from 'node:fs';
import { join } from 'node:path';
import type { Metadata } from 'next';
import { COLOR_IMGS, M, SW, USES, USE_LABEL, catalog, colorImg, photoAlt, type Finish, type Product } from './catalog';
import { href, type Lang } from './i18n';

/**
 * Public address of the site, used for canonical URLs, the sitemap and structured data.
 * Set NEXT_PUBLIC_SITE_URL (e.g. https://www.example.com) in the hosting environment.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
  (process.env.NODE_ENV === 'production' ? 'https://alabed-digitallock.com' : 'http://localhost:3000')
).replace(/\/$/, '');

/** Absolute URL. Page paths get a trailing slash to match the export (trailingSlash: true); files, #ids and queries are left as they are. */
export const abs = (path: string) => SITE_URL + (/[#?]|\.[a-z0-9]+$|\/$/i.test(path) ? path : `${path}/`);

export const BRAND: Record<Lang, string> = { ar: 'العابد ديجيتال لوك', en: 'Alabed Digital Lock' };
/** Home page title and the default description used where a page has none */
export const DEFAULTS: Record<Lang, { title: string; description: string }> = {
  ar: { title: 'العابد ديجيتال لوك | حلول أمان متكاملة', description: 'أقفال ذكية وخزن غرف وباور سيفر للفنادق والمنازل والمكاتب من العابد ديجيتال لوك.' },
  en: { title: 'Alabed Digital Lock | Complete security solutions', description: 'Smart locks, in-room safes and power savers for hotels, homes and offices from Alabed Digital Lock.' },
};
const LOCALE: Record<Lang, string> = { ar: 'ar_EG', en: 'en_US' };
const OTHER: Record<Lang, Lang> = { ar: 'en', en: 'ar' };

/* ---------- Keywords ---------- */

/** Brand + category terms people search for in Egypt, on every page */
export const SITE_KEYWORDS: Record<Lang, string[]> = {
  ar: [
    'العابد ديجيتال لوك', 'العابد للأقفال', 'أقفال ذكية', 'أقفال ذكية في مصر', 'أقفال إلكترونية', 'كوالين إلكترونية', 'كالون ذكي',
    'أقفال فنادق', 'قفل فندقي', 'قفل فندقي RFID', 'قفل بطاقة', 'قفل بصمة', 'قفل بصمة للباب', 'قفل ذكي بالوجه', 'قفل باب ذكي',
    'خزنة فندقية', 'خزن غرف فنادق', 'خزنة إلكترونية', 'باور سيفر', 'مفتاح توفير الطاقة', 'سويتش كارت للفنادق',
    'وكيل Goodum في مصر', 'أقفال ذكية القاهرة', 'سعر قفل ذكي',
    // the brand as people type it
    'العابد', 'العابد لوك', 'العابد ديجيتال', 'شركة العابد', 'العابد للاقفال', 'العابد للأقفال الذكية', 'ALABED',
    // everyday Egyptian wording and spellings without hamza
    'اقفال ذكية', 'اقفال فنادق', 'اقفال الكترونية', 'قفل الكتروني', 'كالون فندقي', 'كوالين فنادق', 'كالون بصمة', 'كالون الكتروني',
    'قفل باب بالبصمة', 'قفل باب بالكارت', 'كارت فندق', 'كروت فنادق', 'قفل كارت فندقي', 'خزنة فندق', 'خزنه فندقيه', 'خزنة ديجيتال',
    'باور سيفر فندقي', 'سويتش كارت', 'مفتاح الكارت للغرف', 'اقفال ذكية مصر', 'اسعار الاقفال الذكية',
    // doorbells
    'خزنة QNN', 'خزنة بكارت', 'خزنة كارت NFC', 'خزنة فندقية بالكارت',
    'جرس فندقي', 'جرس باب الغرفة', 'جرس فنادق', 'جرس كهربائي للفنادق', 'لوحة عدم الإزعاج', 'لوحة رقم الغرفة', 'جرس عدم الازعاج', 'جرس ديجيتال',
  ],
  en: [
    'Alabed Digital Lock', 'Alabed locks', 'smart locks Egypt', 'smart door lock', 'electronic door lock', 'hotel door locks',
    'RFID hotel lock', 'hotel key card lock', 'fingerprint door lock', 'face recognition door lock', 'keyless door lock',
    'hotel room safe', 'hotel safe Egypt', 'electronic safe', 'power saver switch', 'hotel energy saving switch', 'key card power switch',
    'Goodum distributor Egypt', 'smart lock Cairo', 'smart lock price Egypt',
    'Alabed', 'Al Abed', 'Alabed Egypt', 'hotel lock Egypt', 'hotel card lock', 'hotel safe box', 'digital door lock Egypt',
    'QNN safe', 'NFC card safe', 'hotel safe with card',
    'hotel doorbell', 'hotel room doorbell', 'DND doorbell', 'do not disturb panel', 'digital room number sign', 'doorbell system Egypt',
  ],
};

/** Extra keywords per page (merged with SITE_KEYWORDS) */
export const PAGE_KEYWORDS: Record<string, Record<Lang, string[]>> = {
  '/': { ar: ['حلول أمان متكاملة', 'أقفال للفنادق والمنازل والمكاتب'], en: ['complete security solutions', 'locks for hotels, homes and offices'] },
  '/shop': {
    ar: ['متجر أقفال ذكية', 'أسعار الأقفال الذكية', 'كتالوج أقفال فنادق', 'أقفال RFID', 'أقفال أوتوماتيكية', 'ملحقات أقفال الفنادق', 'جهاز برمجة كروت', 'أجراس الغرف'],
    en: ['smart lock shop', 'smart lock prices', 'hotel lock catalog', 'RFID locks', 'automatic smart locks', 'hotel lock accessories', 'RFID card encoder', 'hotel doorbells'],
  },
  '/about': { ar: ['من نحن', '25 سنة خبرة أقفال إلكترونية', 'الوكيل المعتمد Goodum'], en: ['about Alabed', '25 years electronic locks', 'authorized Goodum distributor'] },
  '/faq': { ar: ['أسئلة الأقفال الذكية', 'تركيب قفل ذكي', 'ضمان الأقفال'], en: ['smart lock FAQ', 'smart lock installation', 'lock warranty'] },
  '/contact': { ar: ['تواصل معنا', 'عرض سعر أقفال', 'أقفال واتساب'], en: ['contact Alabed', 'lock quote', 'smart lock quote Egypt'] },
};

/** Arabic as it is often typed: no hamza on alef, ة as ه, ى as ي ("أقفال إلكترونية" -> "اقفال الكترونيه") */
const plainArabic = (s: string) => s.replace(/[أإآ]/g, 'ا').replace(/ة(?=\s|$)/g, 'ه').replace(/ى(?=\s|$)/g, 'ي');

/** Keywords for one product: its name, model, category, unlock methods, finishes and where it fits */
export function productKeywords(p: Product, lang: Lang): string[] {
  const k = new Set<string>([p.title, p.cat, p.badge]);
  if (p.model) {
    k.add(p.model);
    // models are locks unless the product says otherwise (e.g. a safe)
    const word = p.kind === 'lock' ? null : p.badge;
    if (lang === 'ar') (word ? [word, `سعر ${word}`] : ['قفل', 'سعر قفل', 'قفل ذكي']).forEach((w) => k.add(`${w} ${p.model}`));
    else (word ? [`${p.model} ${word.toLowerCase()}`, `${p.model} price Egypt`] : [`${p.model} lock`, `${p.model} smart lock`, `${p.model} price Egypt`]).forEach((w) => k.add(w));
  } else {
    k.add(lang === 'ar' ? `سعر ${p.title}` : `${p.title} price Egypt`);
  }
  p.m.forEach((m) => k.add(lang === 'ar' ? `قفل ${M[m].ar}` : `${M[m].en.toLowerCase()} lock`));
  p.sw.forEach((f) => k.add(lang === 'ar' ? `${p.badge} ${SW[f][1].ar}` : `${SW[f][1].en.toLowerCase()} ${p.badge.toLowerCase()}`));
  p.uses.forEach((u) => k.add(lang === 'ar' ? `${p.badge} ${USES[u].ar}` : `${p.badge.toLowerCase()} for ${USE_LABEL[u].en.toLowerCase()}`));
  if (lang === 'ar' && p.model && p.kind === 'lock') ['كالون', 'سعر كالون'].forEach((w) => k.add(`${w} ${p.model}`));
  k.add(BRAND[lang]);
  if (lang === 'ar') { k.add('العابد'); [...k].forEach((w) => k.add(plainArabic(w))); }
  return [...k];
}

/* ---------- Product images ---------- */

const PUBLIC = join(process.cwd(), 'public');
const exists = (path: string) => existsSync(join(PUBLIC, path));
const EXTRA: Record<string, string[]> = { me2043: ['/assets/products/me-2043uzh-2.webp', '/assets/products/me-2043uzh-2.jpg'] };

export interface ProductImage { url: string; alt: string; finish?: Finish }

/** Every photo of a product: main photo (webp + jpg), extra angles and one per finish */
export function productImages(p: Product, lang: Lang): ProductImage[] {
  const list: ProductImage[] = [];
  const add = (url: string, alt: string, finish?: Finish) => { if (exists(url) && !list.some((i) => i.url === url)) list.push({ url, alt, finish }); };
  add(`/assets/products/${p.img}.jpg`, photoAlt(p, lang));
  add(`/assets/products/${p.img}.webp`, photoAlt(p, lang));
  (EXTRA[p.id] || []).forEach((u) => add(u, photoAlt(p, lang)));
  (COLOR_IMGS[p.id] || []).filter((f) => p.sw.includes(f)).forEach((f) => add(colorImg(p.id, f), photoAlt(p, lang, f), f));
  return list;
}

/* ---------- Page metadata ---------- */

interface PageSeo {
  lang: Lang;
  /** path without the language prefix, e.g. "/shop" or "/product/k81" */
  path: string;
  title?: string;
  description?: string;
  keywords?: string[];
  images?: ProductImage[];
}

/** Title, description, keywords, canonical + hreflang alternates, Open Graph and Twitter card for one page */
export function pageMetadata({ lang, path, title, description, keywords = [], images }: PageSeo): Metadata {
  const url = href(lang, path);
  const kw = [...new Set([...keywords, ...(PAGE_KEYWORDS[path]?.[lang] ?? []), ...SITE_KEYWORDS[lang]])];
  const shareTitle = title ? `${title} | ${BRAND[lang]}` : DEFAULTS[lang].title;
  const shareDesc = description ?? DEFAULTS[lang].description;
  const og = (images ?? [{ url: '/assets/og-image.png', alt: BRAND[lang] }]).map((i) => ({ url: i.url, alt: i.alt }));
  return {
    ...(title ? { title } : {}),
    ...(description ? { description } : {}),
    keywords: kw,
    alternates: {
      canonical: url,
      languages: { ar: href('ar', path), en: href('en', path), 'x-default': href('ar', path) },
    },
    openGraph: {
      type: 'website',
      siteName: BRAND[lang],
      locale: LOCALE[lang],
      alternateLocale: LOCALE[OTHER[lang]],
      url,
      title: shareTitle,
      description: shareDesc,
      images: og,
    },
    twitter: {
      card: 'summary_large_image',
      title: shareTitle,
      description: shareDesc,
      images: og.map((i) => i.url),
    },
  };
}

/** Site-wide defaults for a root layout */
export function rootMetadata(lang: Lang): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: DEFAULTS[lang].title, template: `%s | ${BRAND[lang]}` },
    description: DEFAULTS[lang].description,
    applicationName: BRAND[lang],
    keywords: SITE_KEYWORDS[lang],
    authors: [{ name: BRAND[lang] }],
    creator: BRAND[lang],
    publisher: BRAND[lang],
    category: lang === 'ar' ? 'أقفال ذكية وأنظمة أمان' : 'Smart locks and security',
    formatDetection: { telephone: false },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
    verification: VERIFICATION,
    // the logo Google shows beside the site in search results (square, on navy so it stays visible on white)
    icons: {
      icon: [{ url: '/favicon.ico', sizes: '48x48' }, { url: '/icon-192.png', sizes: '192x192', type: 'image/png' }, { url: '/icon-512.png', sizes: '512x512', type: 'image/png' }],
      apple: '/apple-touch-icon.png',
    },
  };
}

/** Ownership tags for Google Search Console and Bing Webmaster Tools, from the hosting environment */
const VERIFICATION: Metadata['verification'] = {
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } : {}),
  ...(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ? { other: { 'msvalidate.01': process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION } } : {}),
};

/* ---------- Structured data (schema.org JSON-LD) ---------- */

export function organizationLd(lang: Lang) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': abs('/#organization'),
        name: BRAND[lang],
        alternateName: [BRAND[OTHER[lang]], 'ALABED Digital Lock'],
        url: abs(href(lang)),
        logo: { '@type': 'ImageObject', url: abs('/assets/logo/alabed-logo-square.png'), width: 600, height: 600, caption: BRAND[lang] },
        image: [abs('/assets/logo/alabed-logo-square.png'), abs('/assets/hero-lock.jpg')],
        email: 'al.abedlook@gmail.com',
        telephone: '+201020450649',
        areaServed: { '@type': 'Country', name: 'Egypt' },
        description: lang === 'ar'
          ? 'أقفال ذكية وخزن غرف وباور سيفر للفنادق والمنازل والمكاتب. الوكيل الوحيد المعتمد لشركة Goodum في مصر.'
          : 'Smart locks, in-room safes and power savers for hotels, homes and offices. Sole authorized distributor of Goodum in Egypt.',
        contactPoint: [
          { '@type': 'ContactPoint', telephone: '+201020450649', contactType: 'sales', areaServed: 'EG', availableLanguage: ['Arabic', 'English'] },
          { '@type': 'ContactPoint', telephone: '+201004610860', contactType: 'customer service', areaServed: 'EG', availableLanguage: ['Arabic', 'English'] },
        ],
      },
      {
        '@type': 'WebSite',
        '@id': abs(`${href(lang)}#website`),
        url: abs(href(lang)),
        name: BRAND[lang],
        // the site name Google shows above the result instead of the bare domain
        alternateName: [BRAND[OTHER[lang]], 'العابد', 'ALABED', 'alabed-digitallock.com'],
        inLanguage: lang,
        publisher: { '@id': abs('/#organization') },
        potentialAction: {
          '@type': 'SearchAction',
          target: { '@type': 'EntryPoint', urlTemplate: abs(href(lang, '/shop')) + '?q={search_term_string}' },
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  };
}

export function productLd(p: Product, lang: Lang) {
  const url = abs(href(lang, `/product/${p.id}`));
  const all = productImages(p, lang);
  // one copy of each photo (prefer the JPG when both formats exist)
  const images = all.filter((i) => !i.url.endsWith('.webp') || !all.some((j) => j.url === i.url.replace(/\.webp$/, '.jpg')));
  const otherTitle = catalog(OTHER[lang]).find((o) => o.id === p.id)?.title;
  const alternateName = [otherTitle, p.model, p.model && `${BRAND[lang]} ${p.model}`].filter((n): n is string => !!n && n !== p.title);
  const org = { '@id': abs('/#organization') };
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Product',
        '@id': `${url}#product`,
        name: p.title,
        ...(alternateName.length ? { alternateName } : {}),
        url,
        // every photo as an ImageObject, so image search gets its caption, finish and owner
        image: images.map((i, n) => ({
          '@type': 'ImageObject',
          contentUrl: abs(i.url),
          url: abs(i.url),
          name: i.alt,
          caption: i.alt,
          description: i.finish ? `${p.title} - ${SW[i.finish][1][lang]}` : p.title,
          inLanguage: lang,
          representativeOfPage: n === 0,
          creditText: BRAND[lang],
          creator: org,
          copyrightHolder: org,
          copyrightNotice: `© ${BRAND[lang]}`,
          acquireLicensePage: abs(href(lang, '/contact')),
        })),
        description: productDescription(p, lang),
        sku: p.id.toUpperCase(),
        ...(p.model ? { mpn: p.model, model: p.model } : {}),
        brand: { '@type': 'Brand', name: BRAND[lang] },
        category: p.cat,
        ...(p.sw.length ? { color: p.sw.map((f) => SW[f][1][lang]).join(', ') } : {}),
        keywords: productKeywords(p, lang).join(', '),
        inLanguage: lang,
        seller: org,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: lang === 'ar' ? 'الرئيسية' : 'Home', item: abs(href(lang)) },
          { '@type': 'ListItem', position: 2, name: lang === 'ar' ? 'المتجر' : 'Shop', item: abs(href(lang, '/shop')) },
          { '@type': 'ListItem', position: 3, name: p.title, item: url },
        ],
      },
    ],
  };
}

export function catalogLd(lang: Lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: lang === 'ar' ? 'منتجات العابد ديجيتال لوك' : 'Alabed Digital Lock products',
    itemListElement: catalog(lang).map((p, i) => ({
      '@type': 'ListItem', position: i + 1, url: abs(href(lang, `/product/${p.id}`)), name: p.title, image: abs(productImages(p, lang)[0]?.url ?? ''),
    })),
  };
}

export function faqLd(items: [string, string][]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  };
}

/**
 * A product described in plain words: what it is, how it opens, finishes and where it fits.
 * Used for the search-result snippet and, without the call to action, as visible text on the product page.
 */
export function productDescription(p: Product, lang: Lang, cta = true): string {
  const list = (xs: string[]) => xs.join(lang === 'ar' ? '، ' : ', ');
  const parts = lang === 'ar'
    ? [`${p.title} من العابد ديجيتال لوك: ${p.cat}.`, p.desc && `${p.desc}.`,
      p.m.length && `طرق الفتح: ${list(p.m.map((m) => M[m].ar))}.`, p.sw.length && `التشطيبات: ${list(p.sw.map((f) => SW[f][1].ar))}.`,
      `مناسب ${p.uses.map((u) => USES[u].ar).join(' و')}.`, cta && 'اطلب عرض سعر على واتساب.']
    : [`${p.title} by Alabed Digital Lock: ${p.cat}.`, p.desc && `${p.desc}.`,
      p.m.length && `Unlock methods: ${list(p.m.map((m) => M[m].en.toLowerCase()))}.`, p.sw.length && `Finishes: ${list(p.sw.map((f) => SW[f][1].en))}.`,
      `Suitable for ${list(p.uses.map((u) => USE_LABEL[u].en.toLowerCase()))}.`, cta && 'Request a quote on WhatsApp.'];
  return parts.filter(Boolean).join(' ');
}
