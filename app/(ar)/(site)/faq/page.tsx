import type { Metadata } from 'next';
import FaqExplorer from '@/components/faq/FaqExplorer';
import CtaBand from '@/components/sections/CtaBand';

export const metadata: Metadata = { title: 'الأسئلة الشائعة' };

export default function FaqPage() {
  return (
    <>
      <FaqExplorer lang="ar" />
      {/* ================= CTA band ================= */}
      <CtaBand lang="ar" title="لسه عندك سؤال؟" text="فريقنا يرد عليك على واتساب ويرشح لك الموديل المناسب لبابك." />
    </>
  );
}
