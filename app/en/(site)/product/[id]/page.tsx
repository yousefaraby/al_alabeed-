import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import ProductView from '@/components/product/ProductView';
import CtaBand from '@/components/sections/CtaBand';
import FaqTeaser from '@/components/sections/FaqTeaser';
import { byId, catalog } from '@/lib/catalog';
import { pageMetadata, productDescription, productImages, productKeywords, productLd } from '@/lib/seo';

type Props = { params: Promise<{ id: string }> };

export const generateStaticParams = () => catalog('en').map((p) => ({ id: p.id }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = byId('en', (await params).id);
  if (!p) return { title: 'Product details', robots: { index: false, follow: true } };
  return pageMetadata({
    lang: 'en',
    path: `/product/${p.id}`,
    title: p.title,
    description: productDescription(p, 'en'),
    keywords: productKeywords(p, 'en'),
    images: productImages(p, 'en'),
  });
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const p = byId('en', id);
  return (
    <>
      {p && <JsonLd data={productLd(p, 'en')} />}
      <ProductView lang="en" id={id} summary={p ? productDescription(p, 'en', false) : undefined} key={id} />
      {/* ================= FAQ ================= */}
      <FaqTeaser lang="en" />
      {/* ================= CTA band ================= */}
      <CtaBand lang="en" />
    </>
  );
}
