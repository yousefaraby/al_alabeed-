import type { Metadata } from 'next';
import Offline from '@/components/sys/Offline';

export const metadata: Metadata = { title: { absolute: 'You’re offline | Alabed Digital Lock' }, robots: { index: false } };

export default function OfflinePage() {
  return <Offline lang="en" />;
}
