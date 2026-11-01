import type { Metadata } from 'next';
import NotFound from '@/components/sys/NotFound';

export const metadata: Metadata = { title: { absolute: 'Page not found | Alabed Digital Lock' }, robots: { index: false } };

export default function NotFoundPage() {
  return <NotFound lang="en" />;
}
