import type { Metadata } from 'next';
import ProductView from '@/components/product/ProductView';
import CtaBand from '@/components/sections/CtaBand';
import FaqTeaser from '@/components/sections/FaqTeaser';

export const metadata: Metadata = { title: 'Product details', robots: { index: false, follow: true } };

/** /product without an id: the "product not found" state */
export default function ProductIndex() {
  return (
    <>
      <ProductView lang="en" />
      <FaqTeaser lang="en" />
      <CtaBand lang="en" />
    </>
  );
}
