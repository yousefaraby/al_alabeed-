import Link from 'next/link';
import { dict, href, type Lang } from '@/lib/i18n';
import Icon from '../Icon';

const SOCIAL = [
  ['fb', 'https://www.facebook.com/share/1KX2u9zruY/'],
  ['ig', 'https://www.instagram.com/al.abed_digital_lock/'],
  ['tiktok', 'https://www.tiktok.com/@alabed.digital.lo'],
];

export default function Footer({ lang }: { lang: Lang }) {
  const t = dict[lang];
  const f = t.footer;
  const company: [string, string][] = [['/', t.nav.home], ['/shop', t.nav.shop], ['/about', t.nav.about], ['/contact', t.nav.contact]];
  const list = (links: string[][]) => (
    <ul className="footer__links">
      {links.map(([p, label]) => <li key={label}><Link href={href(lang, p)}>{label}</Link></li>)}
    </ul>
  );
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <img src="/assets/logo/alabed-logo-white.webp" alt="ALABED Digital Lock" width="132" height="52" loading="lazy" />
          <p>{f.about}</p>
          <div className="social">
            {SOCIAL.map(([k, url], i) => <a href={url} target="_blank" rel="noopener" aria-label={f.social[i]} key={k}><Icon id={k} hidden={false} /></a>)}
          </div>
        </div>
        <div><h3>{f.products}</h3>{list(f.productLinks)}</div>
        <div><h3>{f.solutions}</h3>{list(f.solutionLinks)}</div>
        <div><h3>{f.company}</h3>{list(company)}</div>
        <div className="footer__cat">
          <h3>{f.choose}</h3>
          <p>{f.help}</p>
          <a className="btn btn--primary" href="https://wa.me/201004610860" target="_blank" rel="noopener">
            <Icon id="wa" hidden={false} />
            {f.contact}
          </a>
          <div className="footer__contact"><a href="mailto:al.abedlook@gmail.com">al.abedlook@gmail.com</a><a href="tel:+201020450649">+20 102 045 0649</a></div>
        </div>
      </div>
      <div className="container">
        <div className="footer__bottom">
          <p>{f.rights}</p>
          <br />
          <p><a href="https://www.instagram.com/tricorewebsolutions/" target="_blank" rel="noopener" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>{f.built} <Icon id="ext" hidden={false} /></a></p>
        </div>
      </div>
    </footer>
  );
}
