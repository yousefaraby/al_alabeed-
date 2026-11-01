import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import ProductView from '@/components/product/ProductView';
import CtaBand from '@/components/sections/CtaBand';
import FaqTeaser from '@/components/sections/FaqTeaser';
import { byId, catalog } from '@/lib/catalog';
import { pageMetadata, productDescription, productImages, productKeywords, productLd } from '@/lib/seo';

type Props = { params: Promise<{ id: string }> };

export const generateStaticParams = () => catalog('ar').map((p) => ({ id: p.id }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = byId('ar', (await params).id);
  if (!p) return { title: 'تفاصيل المنتج', robots: { index: false, follow: true } };
  return pageMetadata({
    lang: 'ar',
    path: `/product/${p.id}`,
    title: p.title,
    description: productDescription(p, 'ar'),
    keywords: productKeywords(p, 'ar'),
    images: productImages(p, 'ar'),
  });
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const p = byId('ar', id);
  return (
    <>
      {p && <JsonLd data={productLd(p, 'ar')} />}
      <ProductView lang="ar" id={id} summary={p ? productDescription(p, 'ar', false) : undefined} key={id} />
      {/* ================= FAQ ================= */}
      <FaqTeaser lang="ar" />
      {/* ================= CTA band ================= */}
      <CtaBand lang="ar" />
    </>
  );
}
