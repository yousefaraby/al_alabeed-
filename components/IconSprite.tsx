import type { Lang } from '@/lib/i18n';

/** Icon sprite shared by every page (<use href="#i-…" />). Arrows point the reading direction. */
export default function IconSprite({ lang }: { lang: Lang }) {
  const rtl = lang === 'ar';
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        {rtl ? (
          <symbol id="i-arrow" viewBox="0 0 24 24">
            <path d="M19 12H5M11 6l-6 6 6 6" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
          </symbol>
        ) : (
          <symbol id="i-arrow" viewBox="0 0 24 24">
            <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
          </symbol>
        )}
        <symbol id="i-search" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.9" />
          <path d="m20 20-4.2-4.2" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
        </symbol>
        <symbol id="i-list" viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="5" y="4" width="14" height="17" rx="2" />
            <path d="M9 4V3h6v1M9 10h6M9 14h6M9 18h3" />
          </g>
        </symbol>
        <symbol id="i-plus" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" /></symbol>
        <symbol id="i-check" viewBox="0 0 24 24">
          <path d="m5 12.5 4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </symbol>
        <symbol id="i-compare" viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinejoin="round">
            <rect x="4" y="5" width="6" height="14" rx="1" />
            <rect x="14" y="5" width="6" height="14" rx="1" />
          </g>
        </symbol>
        <symbol id="i-key" viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="7.5" cy="15.5" r="4.5" />
            <path d="m10.7 12.3 9.3-9.3M17 6l3 3M14.5 8.5l2 2" />
          </g>
        </symbol>
        <symbol id="i-card" viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="M7 15h4" />
            <path d="M15 9.5a3 3 0 0 1 0 4M17.5 8a5.5 5.5 0 0 1 0 7" />
          </g>
        </symbol>
        <symbol id="i-pin" viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="3" width="16" height="18" rx="2" />
            <path d="M8 7h.01M12 7h.01M16 7h.01M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01" />
          </g>
        </symbol>
        <symbol id="i-finger" viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 11v3a8 8 0 0 1-1.5 4.7" />
            <path d="M8.5 7.6A4.5 4.5 0 0 1 16.5 10v2.5a12 12 0 0 1-.8 4.4" />
            <path d="M7.5 11v1.5a6 6 0 0 1-1.3 3.7" />
            <path d="M5 7.5A8 8 0 0 1 19.5 9" />
            <path d="M20 12.5v.5" />
            <path d="M14 20.5c.6-1.4 1-3 1-4.5" />
          </g>
        </symbol>
        <symbol id="i-face" viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 8V6a2 2 0 0 1 2-2h2M16 4h2a2 2 0 0 1 2 2v2M20 16v2a2 2 0 0 1-2 2h-2M8 20H6a2 2 0 0 1-2-2v-2" />
            <path d="M9 10h.01M15 10h.01" />
            <path d="M9.5 15a3.5 3.5 0 0 0 5 0" />
          </g>
        </symbol>
        <symbol id="i-wa" viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3.5 20.5 5 16a8.5 8.5 0 1 1 3.2 3.1z" />
            <path d="M9 8.5c0 3.6 2.9 6.5 6.5 6.5l1-1.6-2.2-1-1 .9a4.5 4.5 0 0 1-2.6-2.6l.9-1-1-2.2z" />
          </g>
        </symbol>
        <symbol id="i-fb" viewBox="0 0 24 24">
          <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2.5H7.5v4H10V21h4v-6.5h3l.5-4H14V8.6c0-.3.3-.6.6-.6z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        </symbol>
        <symbol id="i-ig" viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="4" y="4" width="16" height="16" rx="4.5" />
            <circle cx="12" cy="12" r="3.6" />
            <circle cx="16.9" cy="7.1" r=".6" fill="currentColor" />
          </g>
        </symbol>
        <symbol id="i-hotel" viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 21V4h16v17" />
            <path d="M2 21h20" />
            <path d="M8 8h2M14 8h2M8 12h2M14 12h2" />
            <path d="M10 21v-4h4v4" />
          </g>
        </symbol>
        <symbol id="i-boat" viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 15h18l-2.5 4.5h-13z" />
            <path d="M5.5 15v-3.5h13V15" />
            <path d="M8 11.5V8h8v3.5" />
            <path d="M11 8V5h2v3" />
            <path d="M2 21.5c1.7 0 1.7-1 3.3-1s1.7 1 3.4 1 1.7-1 3.3-1 1.7 1 3.4 1 1.6-1 3.3-1" />
          </g>
        </symbol>
        <symbol id="i-menu" viewBox="0 0 24 24">
          <path d="M4 7h16M4 12h16M4 17h16" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
        </symbol>
        <symbol id="i-close" viewBox="0 0 24 24">
          <path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
        </symbol>
        <symbol id="i-star" viewBox="0 0 24 24">
          <path d="m12 2.8 2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4-4.7-4.4 6.4-.8z" fill="currentColor" />
        </symbol>
        <symbol id="i-stack" viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="m12 3 9 4.5-9 4.5-9-4.5z" />
            <path d="m3 12 9 4.5 9-4.5" />
            <path d="m3 16.5 9 4.5 9-4.5" />
          </g>
        </symbol>
        <symbol id="i-bed" viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 19V6" />
            <path d="M3 15h18v4" />
            <path d="M21 15v-3a3 3 0 0 0-3-3h-7v6" />
            <circle cx="7" cy="11.5" r="1.8" />
          </g>
        </symbol>
        <symbol id="i-palette" viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3a9 9 0 1 0 0 18c1.1 0 1.8-.8 1.8-1.8 0-.5-.2-.9-.5-1.3-.3-.3-.5-.8-.5-1.2 0-1 .8-1.8 1.8-1.8H17a4 4 0 0 0 4-4C21 6.6 17 3 12 3z" />
            <circle cx="7.5" cy="11" r="1" />
            <circle cx="10" cy="7" r="1" />
            <circle cx="14.5" cy="7" r="1" />
          </g>
        </symbol>
        <symbol id="i-acc" viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 3.5h4v2.2a1.8 1.8 0 1 0 3.3 1V5.5H20.5V10h-1.2a1.8 1.8 0 1 0 0 3.6h1.2v6.9H14v-1.4a1.8 1.8 0 1 0-3.6 0v1.4H3.5V14h1.4a1.8 1.8 0 1 0 0-3.6H3.5V5.5H10z" />
          </g>
        </symbol>
        <symbol id="i-tools" viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.7 6.3a4 4 0 0 0-5.4 5.2L3.5 17.3a1.8 1.8 0 0 0 2.5 2.5l5.8-5.8a4 4 0 0 0 5.2-5.4l-2.5 2.5-2.3-.6-.6-2.3z" />
          </g>
        </symbol>
        {rtl ? (
          <symbol id="i-swipe" viewBox="0 0 24 24">
            <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M9 8l-4 4 4 4" /></g>
          </symbol>
        ) : (
          <symbol id="i-swipe" viewBox="0 0 24 24">
            <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M15 8l4 4-4 4" /></g>
          </symbol>
        )}
        <symbol id="i-chev" viewBox="0 0 24 24">
          <path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
        </symbol>
        <symbol id="i-home" viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 11 12 4l9 7" />
            <path d="M5 9.5V20h14V9.5" />
            <path d="M10 20v-6h4v6" />
          </g>
        </symbol>
        <symbol id="i-brief" viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="7" width="18" height="13" rx="2" />
            <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18" />
          </g>
        </symbol>
        <symbol id="i-apt" viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 21V5l9-2v18" />
            <path d="M13 9h7v12" />
            <path d="M2 21h20" />
            <path d="M7.5 8h2M7.5 12h2M7.5 16h2M16 13h1.5M16 17h1.5" />
          </g>
        </symbol>
        <symbol id="i-lock" viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="5" y="10.5" width="14" height="10" rx="2" />
            <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
            <path d="M12 14.5v2" />
          </g>
        </symbol>
        <symbol id="i-safe" viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="15" rx="2" />
            <circle cx="10" cy="11.5" r="3" />
            <path d="M16.5 9v5M6 19v2M18 19v2" />
          </g>
        </symbol>
        <symbol id="i-bolt" viewBox="0 0 24 24">
          <path d="M13 2 4.5 13.5H11L10 22l8.5-11.5H12z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        </symbol>
        <symbol id="i-info" viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></g>
        </symbol>
        <symbol id="i-mail" viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
          </g>
        </symbol>
        <symbol id="i-send" viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 3 10 14" />
            <path d="m21 3-6.5 18-4.5-7-7-4.5z" />
          </g>
        </symbol>
        <symbol id="i-phone" viewBox="0 0 24 24">
          <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        </symbol>
        <symbol id="i-trash" viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 7h16M10 11v6M14 11v6" />
            <path d="M6 7l1 13h10l1-13M9 7V4h6v3" />
          </g>
        </symbol>
        <symbol id="i-quote" viewBox="0 0 24 24">
          <path d="M10 7H6a2 2 0 0 0-2 2v4h4v1a3 3 0 0 1-3 3v2a5 5 0 0 0 5-5zm10 0h-4a2 2 0 0 0-2 2v4h4v1a3 3 0 0 1-3 3v2a5 5 0 0 0 5-5z" fill="currentColor" />
        </symbol>
        <symbol id="i-tiktok" viewBox="0 0 24 24">
          <path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5M14 3c.4 2.6 2.3 4.5 5 4.8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </symbol>
        <symbol id="i-ext" viewBox="0 0 24 24">
          <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
        </symbol>
        <symbol id="i-sliders" viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M4 7h10M18 7h2M4 17h4M12 17h8" />
            <circle cx="16" cy="7" r="2" />
            <circle cx="10" cy="17" r="2" />
          </g>
        </symbol>
        <symbol id="i-shield" viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.4 7.5 9.5 4.3-1.1 7.5-4.9 7.5-9.5V6z" />
            <path d="m9 12 2 2 4-4" />
          </g>
        </symbol>
        <symbol id="i-bell" viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z" />
            <path d="M10 20.5a2 2 0 0 0 4 0" />
            <path d="M3 9.5a9 9 0 0 1 2.5-5M21 9.5a9 9 0 0 0-2.5-5" />
          </g>
        </symbol>
        <symbol id="i-drag" viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 12a8 8 0 1 1-2.3-5.6" />
            <path d="M20 4v4h-4" />
          </g>
        </symbol>
        <symbol id="i-shield-spark" viewBox="3 0 25 25">
          <g fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 4 4.5 7v5.5c0 4.6 3.2 8.4 7.5 9.5 4.3-1.1 7.5-4.9 7.5-9.5V7z" />
            <path d="m9 13 2 2 4-4" />
          </g>
          <g fill="none" stroke="#FAAB08" strokeWidth="1.8" strokeLinecap="round">
            <path d="M22.5 7.5 25 5.5" />
            <path d="M20.5 4.5 21.5 1.5" />
            <path d="M24.5 11h3" />
          </g>
        </symbol>
        <symbol id="i-globe" viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9.5" />
            <path d="M12 2.5a14 14 0 0 0 0 19 14 14 0 0 0 0-19Z" />
            <path d="M2.5 12h19" />
            <path d="M3.8 7.5h16.4" />
            <path d="M3.8 16.5h16.4" />
          </g>
        </symbol>
        <symbol id="i-handshake" viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="m11 17 2 2a1 1 0 1 0 3-3" />
            <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
            <path d="m21 3 1 11h-2" />
            <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
            <path d="M3 4h8" />
          </g>
        </symbol>
      </defs>
    </svg>
  );
}
