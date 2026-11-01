import type { Metadata } from 'next';
import FaqExplorer from '@/components/faq/FaqExplorer';
import CtaBand from '@/components/sections/CtaBand';

export const metadata: Metadata = { title: 'FAQ' };

export default function FaqPage() {
  return (
    <>
      <FaqExplorer lang="en" />
      {/* ================= CTA band ================= */}
      <CtaBand lang="en" title="Still have a question?" text="Our team replies on WhatsApp with the right model for your door." />
    </>
  );
}
