import '@/styles/ninjas.css';
import Analytics from '@/components/Analytics';
import { BRANDS, BROKER_NAME } from '@/lib/brands';

const IMG = '/img';
const b = BRANDS.ninjas;

export const metadata = {
  title: 'Real Estate Ninjas | Get Matched With a North Carolina Agent Who Gets You',
  description:
    'Buying or selling a home in North Carolina? Take a 2-minute questionnaire and Real Estate Ninjas will match you with one licensed local agent who fits your area and the way you live. Free, no obligation.',
  icons: { icon: '/favicon.png', apple: `${IMG}/apple-touch-icon.png` },
  openGraph: { title: 'Real Estate Ninjas | An Agent Who Gets You', images: [`${IMG}/og-image.jpg`], siteName: 'Real Estate Ninjas' },
};

export default function NinjasLayout({ children }) {
  return (
    <div className="ren">
      <Analytics id={b.gaId} />
      <header className="top">
        <div className="wrap">
          <a href="/"><img className="logo" src={`${IMG}/logo.webp`} alt="Real Estate Ninjas" width="518" height="127" /></a>
          <nav aria-label="Main">
            <a href="/#process">How it works</a>
            <a href="/#why">Why us</a>
            <a href="/#areas">Areas</a>
            <a href="/#faq">FAQ</a>
            <a className="cta" href="/#start">Get matched</a>
          </nav>
        </div>
        <img className="edge" src={`${IMG}/header-edge.webp`} alt="" aria-hidden="true" width="1600" height="93" />
      </header>
      {children}
      <footer>
        <div className="wrap">
          <div>
            <b>Real Estate Ninjas</b>
            <br />
            {b.firmLine} · Broker: {BROKER_NAME} · Wilmington, NC
          </div>
          <div style={{ maxWidth: 520 }}>
            Real Estate Ninjas refers buyers and sellers to independently licensed agents and is paid a referral fee by the
            agent’s brokerage at closing. Equal Housing Opportunity.
          </div>
          <div>
            <a href="/privacy">Privacy policy</a>
            <br />© 2026 Real Estate Ninjas
          </div>
        </div>
      </footer>
    </div>
  );
}
