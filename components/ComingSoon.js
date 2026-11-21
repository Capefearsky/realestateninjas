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

export function PreviewBar() {
  return (
    <div style={{ background: '#111', color: '#ffd166', fontSize: 13, textAlign: 'center', padding: '6px 12px', fontFamily: 'system-ui, sans-serif' }}>
      Preview: only you can see this page. The public sees “Coming very soon” until launch. <a href="/admin" style={{ color: '#fff' }}>Ninjas HQ</a>
    </div>
  );
}
