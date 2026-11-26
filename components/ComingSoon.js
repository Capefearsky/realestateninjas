import Analytics from '@/components/Analytics';
import { BRANDS } from '@/lib/brands';

export default function ComingSoon({ brand }) {
  const b = BRANDS[brand];
  if (brand === 'hl') {
    return (
      <div className="cs cs-hl">
        <Analytics id={b.gaId} />
        <main>
          <div className="cs-brand">Home<span>Liquidation</span>.com</div>
          <div className="cs-tag">Under construction</div>
          <h1>Coming very soon.</h1>
          <p>Something new is on the way. Check back shortly.</p>
        </main>
        <footer>© 2026 HomeLiquidation.com</footer>
      </div>
    );
  }
  return (
    <div className="cs cs-ren">
      <Analytics id={b.gaId} />
      <header>
        <div className="in"><img className="logo" src="/img/logo.webp" alt="Real Estate Ninjas" width="518" height="127" /></div>
        <img className="edge" src="/img/header-edge.webp" alt="" aria-hidden="true" width="1600" height="93" />
      </header>
      <main>
        <span className="cs-tag">Under construction</span>
        <h1>Coming very soon.</h1>
        <p>Something new is on the way. Check back shortly.</p>
      </main>
      <footer>© 2026 Real Estate Ninjas</footer>
    </div>
  );
}

const BANNER = {
  ninjas: { a: 'Coming soon', b: 'We’re hand-picking our first Ninja agents across North Carolina. Take the quiz now and you’ll be first in line for a match.', cta: 'Get on the list', href: '/#start' },
  hl: { a: 'Coming soon', b: 'We’re lining up our North Carolina partner network. Request your free call now and you’ll be first in line when we open.', cta: 'Get on the list', href: '#start' },
};

// Public banner shown at the top of every page until SITE_LIVE=true.
export function PreviewBar({ brand = 'ninjas', href }) {
  const t = BANNER[brand] || BANNER.ninjas;
  const hl = brand === 'hl';
  return (
    <div role="region" aria-label="Coming soon" style={{ position: 'sticky', top: 0, zIndex: 60, background: hl ? '#C8873A' : 'linear-gradient(90deg,#EC1C24,#FF3B3B)', color: '#fff', fontSize: 14, textAlign: 'center', padding: '9px 16px', fontFamily: 'Inter, system-ui, sans-serif', lineHeight: 1.4 }}>
      <strong style={{ textTransform: 'uppercase', letterSpacing: '.08em', marginRight: 8, background: 'rgba(0,0,0,.22)', padding: '2px 8px', borderRadius: 999, fontSize: 12 }}>{t.a}</strong>
      <span>{t.b}</span>{' '}
      <a href={href || t.href} style={{ color: '#fff', fontWeight: 700, textDecoration: 'underline', marginLeft: 4 }}>{t.cta} →</a>
    </div>
  );
}
