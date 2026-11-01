import type { Metadata } from 'next';
import NotFound from '@/components/sys/NotFound';

export { metadata } from '../not-found';

/** Exported as error-404.html so Apache can serve it for unknown URLs (see public/.htaccess) */
export default function Error404Page() {
  return <NotFound lang="en" />;
}
