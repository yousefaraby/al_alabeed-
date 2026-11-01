import type { Metadata } from 'next';
import Offline from '@/components/sys/Offline';

export const metadata: Metadata = { title: { absolute: 'غير متصل | العابد ديجيتال لوك' }, robots: { index: false } };

export default function OfflinePage() {
  return <Offline lang="ar" />;
}
