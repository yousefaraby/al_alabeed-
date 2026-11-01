import type { ReactNode } from 'react';
import JsonLd from '@/components/JsonLd';
import SiteChrome from '@/components/site/SiteChrome';
import { organizationLd } from '@/lib/seo';

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd data={organizationLd('ar')} />
      <SiteChrome lang="ar">{children}</SiteChrome>
    </>
  );
}
