import Link from 'next/link';
import { M, SW, imgSrc, type Product } from '@/lib/catalog';
import { dict, href, type Lang } from '@/lib/i18n';
import AddToQuote from './AddToQuote';
import Icon from './Icon';

interface Props {
  p: Product;
  lang: Lang;
  /** home cards are not links; shop and related cards link to the product page */
  variant: 'home' | 'shop' | 'related';
  index?: number;
  hidden?: boolean;
  className?: string;
}

export default function ProductCard({ p, lang, variant, index = 0, hidden, className = '' }: Props) {
  const t = dict[lang];
  const url = href(lang, `/product/${p.id}`);
  const img = <img src={imgSrc(p)} alt={p.title} loading="lazy" decoding="async" />;
  const reveal = variant !== 'related';
  return (
    <article
      className={`pcard${className}`}
      data-id={variant === 'home' ? undefined : p.id}
      data-reveal={reveal ? '' : undefined}
      style={reveal ? { '--d': index % (variant === 'home' ? 4 : 3) } : undefined}
      hidden={hidden}
    >
      {variant === 'related' ? (
        <Link className="pcard__media" href={url} aria-label={p.title}>
          {img}
          <span className="badge">{p.badge}</span>
        </Link>
      ) : (
        <div className="pcard__media">
          {variant === 'shop' ? <Link href={url} tabIndex={-1} aria-hidden="true">{img}</Link> : img}
          <span className="badge">{p.badge}</span>
        </div>
      )}
      <div className="pcard__body">
        <span className="pcard__cat">{p.cat}</span>
        <h3>{variant === 'home' ? <span>{p.title}</span> : <Link className="pcard__link" href={url}>{p.title}</Link>}</h3>
        {p.desc ? <p className="pcard__desc">{p.desc}</p> : null}
        {variant !== 'related' && p.m.length > 0 && (
          <div className="dots" aria-label={t.methodsLabel}>
            {p.m.map((k) => (
              <span className="dot" title={M[k][lang]} key={k}><Icon id={k} /><span className="sr-only">{M[k][lang]}</span></span>
            ))}
          </div>
        )}
        {variant !== 'related' && p.sw.length > 0 && (
          <div className="swatches" aria-label={t.finishesLabel}>
            {p.sw.map((k) => (
              <span className="sw" style={{ '--sw': SW[k][0] }} title={SW[k][1][lang]} key={k}><span className="sr-only">{SW[k][1][lang]}</span></span>
            ))}
          </div>
        )}
        <div className="pcard__foot"><AddToQuote id={p.id} /></div>
      </div>
    </article>
  );
}
