# Alabed Digital Lock — website (Next.js)

The Alabed site rebuilt on **Next.js 16 (App Router) + React 19 + TypeScript**, with the same design, copy, assets and behaviour as the original static HTML site (kept in `legacy-html/` for reference).

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Routes

| Arabic (RTL)        | English (LTR)          | Notes |
|---------------------|------------------------|-------|
| `/`                 | `/en`                  | Home |
| `/shop`             | `/en/shop`             | Filters live in the URL: `?kind=`, `?use=`, `?type=`, `?q=`, `?focus=<id>` |
| `/product/[id]`     | `/en/product/[id]`     | Statically generated per product; `?color=<finish>` picks the finish |
| `/about`, `/faq`, `/contact`, `/offline` | same under `/en` | FAQ supports `#<category>` and `?q=` |

Old URLs (`/about.html`, `/product.html?id=k81`, …) redirect permanently (see `next.config.ts`).
Unknown URLs render the 404 page; runtime errors render the 500 page.

## Structure

```
app/
  (ar)/layout.tsx        root layout for Arabic: <html lang="ar" dir="rtl">
  (ar)/(site)/…          pages that share the header/footer/overlays
  (ar)/not-found.tsx, error.tsx, offline/   standalone system pages
  en/…                   same tree for English
  styles/
    base.css             styles shared by both languages (from the original <style> blocks)
    rtl.css / ltr.css    page sections + English mirroring
    sys.css              404 / 500 / offline pages
components/
  site/                  header, footer, quote list, quote form, search, chat, cookies, provider
  home/ about/ shop/ product/ faq/ contact/   page-specific interactive pieces
  sys/                   system pages
lib/
  catalog.ts             products, partners, labels (ar + en) — single source of truth
  faq.ts                 FAQ questions
  i18n.ts                shared UI strings
public/assets/           images, logo and fonts (unchanged)
```

The quote list is kept in `localStorage` (`alabed-quote-list`), and quote requests open WhatsApp or email with the message pre-filled — there is still no backend.

## SEO

Set the public domain before deploying (see `.env.example`):

```bash
NEXT_PUBLIC_SITE_URL=https://www.your-domain.com
```

Everything SEO-related lives in `lib/seo.ts`:

- **Keywords**: site-wide Arabic and English search terms (`SITE_KEYWORDS`), extra terms per page (`PAGE_KEYWORDS`) and per product (`productKeywords`, built from the model, category, unlock methods, finishes and uses).
- **Every page** has a title, description, keywords, a canonical URL, `hreflang` links between Arabic and English, and Open Graph / Twitter cards.
- **Every product** gets its own description, keywords, all of its photos (main photo, extra angles and one per finish) as share images, and `Product` + `BreadcrumbList` structured data.
- **`/sitemap.xml`** lists every page and product in both languages with their alternates, and every product photo as an image-sitemap entry. **`/robots.txt`** points to it.
- Structured data also covers the company (`Organization`, `WebSite` with site search), the shop (`ItemList`) and the FAQ (`FAQPage`).

After deploying, submit `https://<your-domain>/sitemap.xml` in Google Search Console.
