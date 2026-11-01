import type { Metadata } from 'next';
import ProductView from '@/components/product/ProductView';
import CtaBand from '@/components/sections/CtaBand';
import FaqTeaser from '@/components/sections/FaqTeaser';
import { byId, catalog } from '@/lib/catalog';

type Props = { params: Promise<{ id: string }> };

export const generateStaticParams = () => catalog('en').map((p) => ({ id: p.id }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = byId('en', (await params).id);
  return p ? { title: p.title, description: `${p.title} - ${p.cat}` } : { title: 'Product details' };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  return (
    <>
      <ProductView lang="en" id={id} key={id} />
      {/* ================= FAQ ================= */}
      <FaqTeaser lang="en" />
      {/* ================= CTA band ================= */}
      <CtaBand lang="en" />
    </>
  );
}
