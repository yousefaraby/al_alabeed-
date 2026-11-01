'use client';

import { useEffect, useRef } from 'react';
import { waLink } from '@/lib/catalog';
import { play } from '@/lib/motion';
import Icon from '../Icon';
import { useSite } from './SiteProvider';

/** Floating WhatsApp button + quick options */
export default function ChatWidget() {
  const { t, chatOpen, setChatOpen } = useSite();
  const root = useRef<HTMLDivElement>(null);
  const fab = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const panel = root.current?.querySelector('.chat-panel');
    if (chatOpen && panel) play(panel, [{ opacity: 0, transform: 'translateY(10px) scale(.96)' }, { opacity: 1, transform: 'none' }], { duration: 300, easing: 'cubic-bezier(.2,.8,.2,1)' });
    if (chatOpen) root.current?.querySelector<HTMLElement>('.chat-option')?.focus();
    const away = (e: MouseEvent) => { if (!(e.target as Element).closest('[data-chat]')) setChatOpen(false); };
    document.addEventListener('click', away);
    return () => document.removeEventListener('click', away);
  }, [chatOpen, setChatOpen]);

  return (
    <div className="chat-widget" data-chat ref={root}>
      <div className="chat-panel" id="chat-panel" role="dialog" aria-label={t.chat.label} hidden={!chatOpen}>
        <div className="chat-panel__head">
          <div><strong>{t.chat.team}</strong></div>
          <button className="x-btn" type="button" data-chat-close aria-label={t.chat.close} onClick={() => { setChatOpen(false); fab.current?.focus(); }}><Icon id="close" hidden={false} /></button>
        </div>
        <div className="chat-panel__body">
          <div className="chat-bubble">{t.chat.hello}</div>
          {t.chat.options.map(([text, label]) => (
            <a className="chat-option" target="_blank" rel="noopener" href={waLink(text)} key={text}><Icon id="wa" hidden={false} />{label}</a>
          ))}
          <a className="chat-option" href="tel:+201020450649"><Icon id="phone" hidden={false} />{t.chat.call}</a>
        </div>
      </div>
      <button className="chat-fab" type="button" data-chat-toggle aria-expanded={chatOpen} aria-controls="chat-panel" aria-label={t.chat.fab} ref={fab} onClick={() => setChatOpen(!chatOpen)}>
        <span className="pulse" aria-hidden="true" />
        <Icon id="wa" className="ic ic--wa" />
        <Icon id="close" className="ic ic--x" />
      </button>
    </div>
  );
}
