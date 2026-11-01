import Link from 'next/link';
import { dict, href, type Lang } from '@/lib/i18n';
import Icon from '../Icon';

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
            {['fb', 'ig', 'tiktok'].map((k, i) => <a href="#" aria-label={f.social[i]} key={k}><Icon id={k} hidden={false} /></a>)}
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
          <p>{f.built} <Icon id="ext" hidden={false} /></p>
        </div>
      </div>
    </footer>
  );
}
