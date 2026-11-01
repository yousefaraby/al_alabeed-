import type { ReactNode } from 'react';
import type { Lang } from '@/lib/i18n';
import { dict } from '@/lib/i18n';
import IconSprite from '../IconSprite';
import ChatWidget from './ChatWidget';
import CookieBanner from './CookieBanner';
import Footer from './Footer';
import Header from './Header';
import MotionFx from './MotionFx';
import QuoteListDrawer from './QuoteListDrawer';
import QuoteModal from './QuoteModal';
import Reveal from './Reveal';
import SearchOverlay from './SearchOverlay';
import SiteProvider from './SiteProvider';

/** Everything around the page content: header, footer, overlays, floating chat, cookie notice. */
export default function SiteChrome({ lang, children }: { lang: Lang; children: ReactNode }) {
  return (
    <SiteProvider lang={lang}>
      <a className="skip" href="#main">{dict[lang].skip}</a>
      <IconSprite lang={lang} />
      <Header />
      <main id="main">{children}</main>
      <Footer lang={lang} />
      <QuoteListDrawer />
      <SearchOverlay />
      <QuoteModal />
      <ChatWidget />
      <CookieBanner />
      <Reveal />
      <MotionFx />
    </SiteProvider>
  );
}
