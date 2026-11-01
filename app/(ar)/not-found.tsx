import type { Metadata } from 'next';
import NotFound from '@/components/sys/NotFound';

export const metadata: Metadata = { title: { absolute: 'الصفحة غير موجودة | العابد ديجيتال لوك' }, robots: { index: false } };

export default function NotFoundPage() {
  return <NotFound lang="ar" />;
}
