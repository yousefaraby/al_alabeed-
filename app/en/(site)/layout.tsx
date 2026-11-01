import type { ReactNode } from 'react';
import SiteChrome from '@/components/site/SiteChrome';

export default function SiteLayout({ children }: { children: ReactNode }) {
  return <SiteChrome lang="en">{children}</SiteChrome>;
}
