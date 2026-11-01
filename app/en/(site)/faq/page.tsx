import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { FAQ } from '@/lib/faq';
import { faqLd, pageMetadata } from '@/lib/seo';
import FaqExplorer from '@/components/faq/FaqExplorer';
import CtaBand from '@/components/sections/CtaBand';

export const metadata: Metadata = pageMetadata({
  lang: 'en',
  path: '/faq',
  title: 'FAQ',
  description: 'Answers about smart locks, unlock methods, finishes, hotel safes, power savers, ordering and installation in Egypt.',
});

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqLd(FAQ.en.flatMap((g) => g.items))} />
      <FaqExplorer lang="en" />
      {/* ================= CTA band ================= */}
      <CtaBand lang="en" title="Still have a question?" text="Our team replies on WhatsApp with the right model for your door." />
    </>
  );
}
