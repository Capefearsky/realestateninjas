import LeadForm from '@/components/LeadForm';
import { QUESTIONS } from '@/lib/questions';
import { hlBase } from '@/lib/base';

const MOVES = [
  ['Estates & inherited homes', 'Executors and heirs get one coordinator for the contents and the sale.'],
  ['Downsizing', 'Moving somewhere smaller: help sorting what goes, what’s sold and what’s donated.'],
  ['Relocation', 'Already moved? The empty-out and the sale get handled while you’re somewhere else.'],
  ['Divorce', 'A neutral, organized process for clearing and selling shared property.'],
  ['Full-house cleanouts', 'Decades of belongings, packed garages and attics, handled discreetly.'],
  ['As-is & dated homes', 'Sell without repairs, or fix only what raises the price.'],
];
const FAQ = [
  ['Do I have to empty the house first?', 'No. Most homes are still full. Clearing the contents is part of the plan.'],
  ['The estate is still in probate. Can we start?', 'Usually you can plan and prepare now and time the sale with the executor’s authority. Your estate attorney has the final word.'],
  ['I live out of state. Do I need to be there?', 'Usually not. Walk-throughs, updates and most closings can be done remotely.'],
  ['Who does the estate sale, cleanout or cash offer?', 'Independent partner companies that contract with you directly. You choose whether to use them, and any fee we receive is disclosed to you in writing first.'],
  ['What areas do you cover?', 'North Carolina and South Carolina, from the Outer Banks and Wilmington to Myrtle Beach, Charleston and Hilton Head, plus the Triangle, Charlotte and the mountains.'],
  ['What does it cost to talk to you?', 'Nothing. The first call and the plan are free, with no obligation.'],
];

export default async function HlHome() {
  const base = await hlBase();
  return (
    <main>
      <section className="hero" id="start">
        <div className="wrap">
          <div>
            <div className="eyebrow">Estates · Downsizing · Relocations · North & South Carolina</div>
            <h1>Clear out the contents. Sell the house. One call.</h1>
            <p>When a home has to be emptied and sold, after a loss, a move or a change in life, we coordinate the whole thing: the belongings, the cleanout and the sale.</p>
            <ul className="checks">
              <li>Cash offer or full-market listing: you choose</li>
              <li>Estate sale, donation and haul-away through trusted partners</li>
              <li>Works for out-of-town heirs and executors</li>
            </ul>
          </div>
          <LeadForm brand="hl" base={base} questions={QUESTIONS.hl} siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''} title="Request a free call back" />
        </div>
      </section>

      <section className="s moves">
        <div className="wrap">
          <h2>Built for the hard moves</h2>
          <p>Most people liquidate a home once or twice in their life, usually at the worst possible time.</p>
          <div className="grid">{MOVES.map(([h, p]) => <div className="tile" key={h}><h3>{h}</h3><p>{p}</p></div>)}</div>
        </div>
      </section>

      <section className="s white" id="how">
        <div className="wrap">
          <h2>How it works</h2>
          <ol className="steps">
            <li><span className="num">01</span><h3>A first call</h3><p>We review the required agency disclosure with you, then learn about the home, your deadline and what matters to the family.</p></li>
            <li><span className="num">02</span><h3>One written plan</h3><p>Side-by-side options for a cash offer and a market listing, plus a plan for the contents.</p></li>
            <li><span className="num">03</span><h3>It gets handled</h3><p>Estate sale, donations, haul-away, cleaning and closing, with updates you can follow from anywhere.</p></li>
          </ol>
        </div>
      </section>

      <section className="s" id="options" style={{ background: 'var(--tan)' }}>
        <div className="wrap">
          <h2 style={{ color: 'var(--brown)' }}>Two ways to sell. Your call.</h2>
          <div className="options">
            <div className="optcard dark"><span className="tag">Fastest</span><h3>Cash offer</h3><ul className="checks"><li>Close on your timeline</li><li>Sold as-is, contents and all</li><li>Offers come from independent cash-buyer partners</li></ul></div>
            <div className="optcard"><span className="tag">Highest price</span><h3>Prepare & list</h3><ul className="checks"><li>Contents sold or cleared first</li><li>Only the repairs that raise the price</li><li>Listed by a licensed broker</li></ul></div>
          </div>
        </div>
      </section>

      <section className="s white" id="faq">
        <div className="wrap" style={{ maxWidth: 820 }}>
          <h2>Questions families ask</h2>
          {FAQ.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}
        </div>
      </section>
    </main>
  );
}
