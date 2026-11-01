import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { FAQ } from '@/lib/faq';
import { faqLd, pageMetadata } from '@/lib/seo';
import FaqExplorer from '@/components/faq/FaqExplorer';
import CtaBand from '@/components/sections/CtaBand';

export const metadata: Metadata = pageMetadata({
  lang: 'ar',
  path: '/faq',
  title: 'الأسئلة الشائعة',
  description: 'إجابات عن الأقفال الذكية وطرق الفتح والتشطيبات والخزن الفندقية والباور سيفر وطريقة الطلب والتركيب في مصر.',
});

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqLd(FAQ.ar.flatMap((g) => g.items))} />
      <FaqExplorer lang="ar" />
      {/* ================= CTA band ================= */}
      <CtaBand lang="ar" title="لسه عندك سؤال؟" text="فريقنا يرد عليك على واتساب ويرشح لك الموديل المناسب لبابك." />
    </>
  );
}
