import '@/styles/hl.css';
import '@/styles/comingsoon.css';
import ComingSoon, { PreviewBar } from '@/components/ComingSoon';
import { canSeeFullSite } from '@/lib/preview';
import { isLive } from '@/lib/brands';

// Checked on every visit: the public sees Coming soon, Tony (signed in) sees the full site.
export const dynamic = 'force-dynamic';
import Analytics from '@/components/Analytics';
import { BRANDS, BROKER_NAME } from '@/lib/brands';
import { hlBase } from '@/lib/base';

const b = BRANDS.hl;

const fullMeta = {
  title: 'Home Liquidation | Estate Cleanouts & Home Sales in North Carolina',
  description: 'Estates, downsizing and relocations across North Carolina: one coordinator for clearing out the contents and selling the house. Free, no-obligation call.',
  openGraph: { title: 'Home Liquidation | Clear out the contents. Sell the house. One call.', images: ['/img/e06d1f4928.jpg'] },
};

export async function generateMetadata() {
  if (await canSeeFullSite()) return fullMeta;
  return { title: 'HomeLiquidation.com | Coming Very Soon', description: 'HomeLiquidation.com is coming very soon.' };
}

export default async function HlLayout({ children }) {
  if (!(await canSeeFullSite())) return <ComingSoon brand="hl" />;
  const base = await hlBase();
  const home = base || '/';
  return (
    <div className="hlw">
      {!isLive() && <PreviewBar />}
      <Analytics id={b.gaId} />
      <header className="top">
        <div className="wrap">
          <a className="brand" href={home}>Home<span>Liquidation</span>.com</a>
          <nav aria-label="Main">
            <a href={`${base}/#how`}>How it works</a>
            <a href={`${base}/#options`}>Your options</a>
            <a href={`${base}/#faq`}>FAQ</a>
            <a className="btn" href={`${base}/#start`}>Request a call</a>
          </nav>
        </div>
      </header>
      {children}
      <footer>
        <div className="wrap">
          <span>
            <strong>{b.firmLine}</strong> · Broker: {BROKER_NAME}. Estate sales, cleanouts and cash offers are provided by
            independent partner companies; we may receive a referral fee, disclosed to you in writing. Equal Housing Opportunity.
          </span>
          <span><a href={`${base}/privacy`}>Privacy policy</a> · © 2026 HomeLiquidation.com</span>
        </div>
      </footer>
    </div>
  );
}
