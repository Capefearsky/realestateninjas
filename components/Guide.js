import { BRANDS, BROKER_NAME, isLive } from '@/lib/brands';
import { AUTHOR } from '@/lib/guides';

// One guide page. Sections: { h, p: [], list: [], tip } ; tip = a note for Tony shown only in draft.
export default function Guide({ g, base, cta }) {
  const b = BRANDS[g.brand];
  const url = `https://${b.domain}/guides/${g.slug}`;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: g.title,
    description: g.description,
    dateModified: g.updated,
    mainEntityOfPage: url,
    author: { '@type': 'Person', name: BROKER_NAME, description: AUTHOR.short },
    publisher: { '@type': 'Organization', name: b.name, url: `https://${b.domain}` },
  };
  return (
    <main className="doc guide">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      {!isLive() && <p className="draftnote">DRAFT: only you can see this page. It goes public when the site launches.</p>}
      <p className="crumbs"><a href={`${base}/guides`}>Guides</a> › {g.area}</p>
      <h1>{g.title}</h1>
      <p className="lede">{g.lede}</p>
      <p className="byline">By {AUTHOR.name} · {AUTHOR.short} · Updated {g.updatedText}</p>
      {g.sections.map((s) => (
        <section key={s.h}>
          <h2>{s.h}</h2>
          {(s.p || []).map((t, i) => <p key={i}>{t}</p>)}
          {s.list && <ul>{s.list.map((t, i) => <li key={i}>{t}</li>)}</ul>}
          {s.tip && !isLive() && <p className="draftnote">Tony: {s.tip}</p>}
        </section>
      ))}
      {g.sources && (
        <section>
          <h2>Sources</h2>
          <ul>{g.sources.map(([t, u]) => <li key={u}><a href={u} target="_blank" rel="noopener noreferrer">{t}</a></li>)}</ul>
        </section>
      )}
      {g.disclaimer && <p className="fine">{g.disclaimer}</p>}
      <div className="guidecta">
        <h2>{cta.h}</h2>
        <p>{cta.p}</p>
        <a className={g.brand === 'hl' ? 'btn' : 'btnlink'} href={`${base}/#start`}>{cta.btn}</a>
      </div>
    </main>
  );
}
