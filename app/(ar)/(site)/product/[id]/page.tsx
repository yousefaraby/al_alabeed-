import type { Metadata } from 'next';
import ProductView from '@/components/product/ProductView';
import CtaBand from '@/components/sections/CtaBand';
import FaqTeaser from '@/components/sections/FaqTeaser';
import { byId, catalog } from '@/lib/catalog';

type Props = { params: Promise<{ id: string }> };

export const generateStaticParams = () => catalog('ar').map((p) => ({ id: p.id }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = byId('ar', (await params).id);
  return p ? { title: p.title, description: `${p.title} - ${p.cat}` } : { title: 'تفاصيل المنتج' };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  return (
    <>
      <ProductView lang="ar" id={id} key={id} />
      {/* ================= FAQ ================= */}
      <FaqTeaser lang="ar" />
      {/* ================= CTA band ================= */}
      <CtaBand lang="ar" />
    </>
  );
}
